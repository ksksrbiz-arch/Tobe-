import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
const MAX_RECOMMENDATIONS = 5;
const MAX_INVENTORY_CONTEXT = 120;
const MODEL_TEMPERATURE = 0.5;

const SYSTEM_PROMPT = `You are a knowledgeable bookseller at To Be Read, a small \
independent bookshop. A reader will describe what they just finished or the \
mood they're chasing. You will also receive LIVE_SHELF titles from current \
inventory. Recommend only books from LIVE_SHELF and never invent titles. \
Use Google Search grounding to ensure each recommendation is a real published \
book. If there are no strong matches in LIVE_SHELF, return an empty \
recommendations array. For each recommendation, give a one-sentence "reason" \
tying the recommendation back to the reader's prompt. Keep descriptions \
concise (1–2 sentences). Skip preamble — return only the structured payload.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          description: { type: Type.STRING },
          reason: { type: Type.STRING },
        },
        required: ["title", "author", "description", "reason"],
        propertyOrdering: ["title", "author", "description", "reason"],
      },
    },
  },
  required: ["recommendations"],
};

interface Recommendation {
  title: string;
  author: string;
  description: string;
  reason: string;
}

interface InventoryBook {
  title: string;
  author: string;
  cover_url: string;
}

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchInventoryTitles() {
  try {
    const rows = (await sql`
      SELECT title, author, cover_url FROM recent_arrivals
      ORDER BY added_at DESC LIMIT 200
    `) as InventoryBook[];
    return rows;
  } catch {
    // DB not provisioned yet — degrade gracefully and skip cross-reference.
    return [];
  }
}

function inventoryKey(title: string, author: string) {
  return `${normalizeText(title)}::${normalizeText(author)}`;
}

function buildGroundedPrompt(readerPrompt: string, inventory: InventoryBook[]) {
  const inventoryContext = inventory
    // Keep context bounded to reduce token usage while still covering recent stock breadth.
    .slice(0, MAX_INVENTORY_CONTEXT)
    .map((book, index) => `${index + 1}. ${book.title} — ${book.author}`)
    .join("\n");
  return `Reader request:
${readerPrompt}

LIVE_SHELF:
${inventoryContext}

Rules:
- Return 3 to 5 recommendations when possible.
- Choose only books from LIVE_SHELF.
- Match title and author exactly to LIVE_SHELF entries.
- Use Google Search grounding to verify each pick is a real book.`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Recommendation service is not configured." },
      { status: 503 },
    );
  }

  let body: { prompt?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return NextResponse.json(
      { error: "Tell us a little about what you'd like to read." },
      { status: 400 },
    );
  }
  if (prompt.length > 2000) {
    return NextResponse.json(
      { error: "Please keep your description under 2000 characters." },
      { status: 400 },
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const inventory = await fetchInventoryTitles();
  if (inventory.length === 0) {
    return NextResponse.json(
      { error: "Our live shelf data is unavailable right now. Please try again shortly." },
      { status: 503 },
    );
  }

  let recommendations: Recommendation[];
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: buildGroundedPrompt(prompt, inventory),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: MODEL_TEMPERATURE,
        tools: [{ googleSearch: {} }],
      },
    });
    const text = response.text;
    if (!text) {
      return NextResponse.json(
        { error: "Couldn't generate recommendations. Try rephrasing." },
        { status: 502 },
      );
    }
    const parsed = JSON.parse(text) as { recommendations?: Recommendation[] };
    recommendations = parsed.recommendations ?? [];
    if (recommendations.length === 0) {
      return NextResponse.json(
        { error: "Couldn't generate recommendations. Try rephrasing." },
        { status: 502 },
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unexpected error.";
    return NextResponse.json(
      { error: `Recommendation service is unavailable: ${msg}` },
      { status: 502 },
    );
  }

  // Enforce shelf-only output and normalize to canonical inventory metadata.
  const inventoryByKey = new Map(inventory.map((b) => [inventoryKey(b.title, b.author), b]));
  const inventoryByTitle = new Map<string, InventoryBook[]>();
  for (const item of inventory) {
    const normalizedTitle = normalizeText(item.title);
    const existing = inventoryByTitle.get(normalizedTitle) ?? [];
    existing.push(item);
    inventoryByTitle.set(normalizedTitle, existing);
  }

  const enriched = recommendations
    .map((rec) => {
      const exactMatch = inventoryByKey.get(inventoryKey(rec.title, rec.author));
      const titleMatches = inventoryByTitle.get(normalizeText(rec.title)) ?? [];
      const match = exactMatch ?? titleMatches[0];
      if (!match) return null;

      return {
        title: match.title,
        author: match.author,
        description: rec.description,
        reason: rec.reason,
        cover_url: match.cover_url || undefined,
        in_stock: true,
        pango_url: undefined,
      };
    })
    .filter((rec): rec is NonNullable<typeof rec> => Boolean(rec))
    .slice(0, MAX_RECOMMENDATIONS);

  if (enriched.length === 0) {
    return NextResponse.json({ recommendations: [] });
  }

  return NextResponse.json({ recommendations: enriched });
}
