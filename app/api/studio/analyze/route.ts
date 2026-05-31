import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { isStudioAuthed } from "@/lib/studioAuth";
import { lookupByTitleAuthor, type ResolvedBook } from "@/lib/books";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Vision can misread spines, so cap how many we resolve per photo to keep the
// request snappy and within serverless time limits.
const MAX_DETECTIONS = 18;
const LOOKUP_CONCURRENCY = 6;

const SYSTEM_PROMPT = `You are helping a used bookstore catalogue physical books \
from a photograph of a stack or shelf. Identify every distinct book whose title \
you can actually read from its spine or cover. For each book, report the title \
and, only if it is clearly legible, the author. Do NOT guess, complete, or \
invent titles or authors you cannot read — it is better to omit a book than to \
hallucinate one. Give a confidence between 0 and 1 for how sure you are of the \
title. Ignore non-book objects.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    books: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
        },
        required: ["title"],
        propertyOrdering: ["title", "author", "confidence"],
      },
    },
  },
  required: ["books"],
};

interface Detection {
  title: string;
  author?: string;
  confidence?: number;
}

export interface Candidate {
  detectedTitle: string;
  detectedAuthor: string;
  confidence: number;
  matched: boolean;
  book: ResolvedBook | null;
}

// When given a Cloudinary delivery URL with no transformation segment, request a
// bandwidth-friendly variant for analysis (full-res phone photos are wasteful to
// hand to the model). Non-Cloudinary URLs pass through untouched.
function analysisUrl(url: string): string {
  const marker = "/image/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const after = url.slice(idx + marker.length);
  const hasTransform = /^[^/]*[,_][^/]*\//.test(after);
  if (hasTransform) return url;
  return url.slice(0, idx + marker.length) + "w_1400,c_limit,q_auto,f_jpg/" + after;
}

async function fetchImageBase64(url: string): Promise<{ data: string; mimeType: string }> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Couldn't load the uploaded photo.");
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength === 0) throw new Error("The uploaded photo was empty.");
  return { data: buf.toString("base64"), mimeType: contentType.split(";")[0] };
}

function dedupeDetections(books: Detection[]): Detection[] {
  const seen = new Set<string>();
  const out: Detection[] = [];
  for (const b of books) {
    const title = (b.title ?? "").trim();
    if (!title) continue;
    const key = `${title.toLowerCase()}::${(b.author ?? "").trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ title, author: (b.author ?? "").trim(), confidence: b.confidence });
    if (out.length >= MAX_DETECTIONS) break;
  }
  return out;
}

// Resolve detections to canonical metadata with a small concurrency pool.
async function resolveAll(detections: Detection[]): Promise<Candidate[]> {
  const results: Candidate[] = new Array(detections.length);
  let cursor = 0;
  async function worker() {
    while (cursor < detections.length) {
      const i = cursor++;
      const d = detections[i];
      let book: ResolvedBook | null = null;
      try {
        book = await lookupByTitleAuthor(d.title, d.author);
      } catch {
        book = null;
      }
      results[i] = {
        detectedTitle: d.title,
        detectedAuthor: d.author ?? "",
        confidence: typeof d.confidence === "number" ? d.confidence : 0,
        matched: Boolean(book),
        book,
      };
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(LOOKUP_CONCURRENCY, detections.length) }, worker),
  );
  return results;
}

export async function POST(request: Request) {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Photo analysis isn't configured (missing GEMINI_API_KEY)." },
      { status: 503 },
    );
  }

  let body: { imageUrl?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
  if (!/^https:\/\//.test(imageUrl)) {
    return NextResponse.json({ error: "A valid uploaded photo URL is required." }, { status: 400 });
  }

  let image: { data: string; mimeType: string };
  try {
    image = await fetchImageBase64(analysisUrl(imageUrl));
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Couldn't load the photo." },
      { status: 502 },
    );
  }

  let detections: Detection[];
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: image.mimeType, data: image.data } },
            { text: "Identify the books in this photo." },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.1,
      },
    });
    const text = response.text;
    if (!text) {
      return NextResponse.json({ candidates: [], detectedCount: 0 });
    }
    const parsed = JSON.parse(text) as { books?: Detection[] };
    detections = dedupeDetections(parsed.books ?? []);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unexpected error.";
    return NextResponse.json({ error: `Photo analysis failed: ${msg}` }, { status: 502 });
  }

  if (detections.length === 0) {
    return NextResponse.json({ candidates: [], detectedCount: 0 });
  }

  const resolved = await resolveAll(detections);

  // Collapse to unique books by ISBN (a stack can show the same title twice),
  // keeping unmatched detections so Jess can see what couldn't be resolved.
  const seenIsbn = new Set<string>();
  const candidates: Candidate[] = [];
  for (const c of resolved) {
    if (c.book) {
      if (seenIsbn.has(c.book.isbn)) continue;
      seenIsbn.add(c.book.isbn);
    }
    candidates.push(c);
  }

  return NextResponse.json({ candidates, detectedCount: detections.length });
}
