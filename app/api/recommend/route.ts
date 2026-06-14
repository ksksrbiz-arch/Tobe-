import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { sql } from "@/lib/db";
import { seedArrivals } from "@/lib/seedArrivals";
import { checkRateLimit, getClientIp, withTimeout } from "@/lib/server/functionHardening";

export const runtime = "nodejs";
const MIN_RECOMMENDATIONS = 3;
const MAX_RECOMMENDATIONS = 5;
const MAX_INVENTORY_CONTEXT = 120;
const MODEL_TEMPERATURE = 0.5;

const SYSTEM_PROMPT = `You are a knowledgeable bookseller at To Be Read, a small \
independent bookshop. A reader will describe what they just finished or the \
mood they're chasing. You will also receive LIVE_SHELF titles from current \
inventory. Recommend only books from LIVE_SHELF and never invent titles. If \
there are no strong matches in LIVE_SHELF, return an empty recommendations \
array. For each recommendation, give a one-sentence "reason" tying the \
recommendation back to the reader's prompt. Keep descriptions concise (1–2 \
sentences). Skip preamble — return only the structured payload.`;

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
  category?: string;
  subcategory?: string;
}

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Pull the live shelf from Postgres; when the DB is unprovisioned, empty, or
// erroring, fall back to the curated static shelf so the matchmaker always has
// stock to recommend from (mirrors /api/recent-arrivals).
async function fetchInventoryTitles(): Promise<InventoryBook[]> {
  try {
    const rows = (await sql`
      SELECT title, author, cover_url, category, subcategory FROM recent_arrivals
      ORDER BY added_at DESC LIMIT 200
    `) as InventoryBook[];
    if (rows.length > 0) return rows;
  } catch {
    // fall through to the static shelf
  }
  return seedArrivals.map((b) => ({
    title: b.title,
    author: b.author,
    cover_url: b.cover_url,
    category: b.category,
    subcategory: b.subcategory,
  }));
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
- Return ${MIN_RECOMMENDATIONS} to ${MAX_RECOMMENDATIONS} recommendations when possible.
- Choose only books from LIVE_SHELF.
- Match title and author exactly to LIVE_SHELF entries.`;
}

// ── Gemini (free-tier gemini-2.0-flash) recommender ────────────────────────────
async function aiRecommend(
  apiKey: string,
  prompt: string,
  inventory: InventoryBook[],
): Promise<Recommendation[]> {
  const ai = new GoogleGenAI({ apiKey });
  const response = await withTimeout(
    ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: buildGroundedPrompt(prompt, inventory),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: MODEL_TEMPERATURE,
      },
    }),
    15_000,
    "Recommendation request timed out.",
  );
  const text = response.text;
  if (!text) return [];
  const parsed = JSON.parse(text) as { recommendations?: Recommendation[] };
  return parsed.recommendations ?? [];
}

// ── Keyless heuristic recommender ──────────────────────────────────────────────
// A deterministic, dependency-free fallback so the matchmaker functions even
// without an AI key (or when the AI call fails). Scores shelf titles by how well
// the reader's words and implied genre overlap each book's title/author/category.
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "with", "of", "for", "to", "in", "on", "my", "me",
  "we", "that", "this", "like", "love", "loved", "just", "really", "some", "lots",
  "strong", "next", "read", "reading", "book", "books", "story", "stories", "about",
  "want", "looking", "something", "anything", "more", "very", "into", "from",
]);

const GENRE_HINTS: Record<string, string[]> = {
  mystery: ["thriller", "mystery", "cozy", "suspense"],
  thriller: ["thriller", "suspense"],
  suspense: ["thriller", "suspense"],
  twisty: ["thriller", "suspense"],
  dark: ["thriller", "suspense"],
  romance: ["romance"],
  romantic: ["romance"],
  romantasy: ["fantasy", "romance", "romantasy"],
  fantasy: ["fantasy"],
  magic: ["fantasy"],
  dragon: ["fantasy", "romantasy"],
  dragons: ["fantasy", "romantasy"],
  epic: ["fantasy", "epic"],
  scifi: ["science"],
  space: ["science"],
  historical: ["historical"],
  history: ["historical"],
  war: ["historical", "wwii"],
  classic: ["classic"],
  literary: ["literary"],
  memoir: ["memoir", "nonfiction"],
  nonfiction: ["nonfiction"],
  cozy: ["cozy"],
  funny: ["contemporary"],
  emotional: ["book_club", "literary"],
  cry: ["book_club", "literary"],
};

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function genreWord(category?: string): string {
  if (!category) return "shelf";
  if (category.startsWith("thriller")) return "thriller";
  if (category === "literary_classic") return "classic";
  if (category === "literary_nonfiction") return "nonfiction";
  if (category.startsWith("literary")) return "literary fiction";
  if (category.startsWith("romance")) return "romance";
  if (category.startsWith("fantasy")) return "fantasy";
  if (category.startsWith("historical")) return "historical fiction";
  if (category === "science_fiction") return "science fiction";
  return category.split("_")[0];
}

function heuristicRecommend(prompt: string, inventory: InventoryBook[]): Recommendation[] {
  const tokens = tokenize(prompt);
  const hintFrags = new Set<string>();
  for (const t of tokens) for (const f of GENRE_HINTS[t] ?? []) hintFrags.add(f);

  const scored = inventory.map((book) => {
    const hay = normalizeText(
      `${book.title} ${book.author} ${(book.category ?? "").replace(/_/g, " ")} ${(book.subcategory ?? "").replace(/_/g, " ")}`,
    );
    const matchedWords: string[] = [];
    let score = 0;
    for (const t of tokens) {
      if (hay.includes(t)) {
        score += 2;
        matchedWords.push(t);
      }
    }
    for (const f of hintFrags) if (hay.includes(f)) score += 3;
    return { book, score, matchedWords };
  });

  const positives = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  // If we don't have enough genuine matches, top up with recent shelf picks.
  const chosen = (positives.length >= MIN_RECOMMENDATIONS ? positives : scored.sort((a, b) => b.score - a.score)).slice(
    0,
    MAX_RECOMMENDATIONS,
  );

  return chosen.map(({ book, matchedWords }) => {
    const genre = genreWord(book.category);
    const matchPhrase = matchedWords[0];
    return {
      title: book.title,
      author: book.author,
      description: `A ${genre} pick that's on our shelves right now.`,
      reason: matchPhrase
        ? `Picked up on "${matchPhrase}" in what you described — and it's a ${genre} read.`
        : `A reader-favorite ${genre} title to start your next stack.`,
    };
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `recommend:${ip}`,
    maxRequests: 20,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many recommendation requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
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

  const inventory = await fetchInventoryTitles();
  if (inventory.length === 0) {
    return NextResponse.json({ recommendations: [] });
  }

  // Prefer the AI matcher when a (free-tier) key is configured; otherwise — or if
  // the AI call fails or returns nothing — fall back to the keyless heuristic so
  // the tool always returns picks from our shelf.
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  let recommendations: Recommendation[] = [];
  if (apiKey) {
    try {
      recommendations = await aiRecommend(apiKey, prompt, inventory);
    } catch {
      recommendations = [];
    }
  }
  if (recommendations.length === 0) {
    recommendations = heuristicRecommend(prompt, inventory);
  }

  // Enforce inventory-only output and normalize to canonical inventory metadata.
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

  return NextResponse.json({ recommendations: enriched });
}
