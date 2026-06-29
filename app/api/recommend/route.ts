import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { seedArrivals } from "@/lib/seedArrivals";
import { chatJSON, getGroqApiKey } from "@/lib/server/groq";
import { searchInstantAnswer, ddgSearchUrl } from "@/lib/server/duckduckgo";
import { checkRateLimit, getClientIp } from "@/lib/server/functionHardening";
import type { Recommendation, InventoryBook } from "@/lib/api-types";

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
array. For each recommendation, give a one-sentence "reason" tying the pick \
back to the reader's prompt, and keep "description" concise (1–2 sentences). \
Respond with ONLY a JSON object of the form: \
{"recommendations":[{"title":string,"author":string,"description":string,"reason":string}]}. \
Match each title and author exactly to a LIVE_SHELF entry. Skip all preamble.`;

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Curated fallback shelf. Mirrors what /api/recent-arrivals does so the
// Matchmaker always has real, in-stock titles to recommend from — even before
// Netlify DB is provisioned or seeded. Without this, an empty `recent_arrivals`
// table makes the Matchmaker silently return nothing.
const SEED_INVENTORY: InventoryBook[] = seedArrivals.map((b) => ({
  title: b.title,
  author: b.author,
  cover_url: b.cover_url,
}));

async function fetchInventoryTitles(): Promise<InventoryBook[]> {
  let dbRows: InventoryBook[] = [];
  try {
    dbRows = (await sql`
      SELECT title, author, cover_url FROM recent_arrivals
      ORDER BY added_at DESC LIMIT 200
    `) as InventoryBook[];
  } catch {
    // DB unavailable — fall through to the curated seed shelf below.
    dbRows = [];
  }

  // Merge live rows with the curated seed, de-duplicating by title+author so
  // the same book never appears twice. Live DB rows take precedence.
  const merged: InventoryBook[] = [...dbRows];
  const seen = new Set(dbRows.map((b) => inventoryKey(b.title, b.author)));
  for (const book of SEED_INVENTORY) {
    const key = inventoryKey(book.title, book.author);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(book);
  }
  return merged;
}

function inventoryKey(title: string, author: string) {
  return `${normalizeText(title)}::${normalizeText(author)}`;
}

function buildPrompt(readerPrompt: string, inventory: InventoryBook[]) {
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
- Match title and author exactly to LIVE_SHELF entries.
- Respond with a single JSON object and nothing else.`;
}

// Ground each pick against DuckDuckGo's Instant Answer API. Best-effort: when
// DDG has a factual abstract we attach it as a "Learn more" source link and use
// it to enrich a thin LLM description. Runs in parallel and never throws.
async function groundWithDuckDuckGo(
  picks: Array<{
    title: string;
    author: string;
    description: string;
    reason: string;
    cover_url: string | undefined;
    in_stock: boolean;
  }>,
) {
  return Promise.all(
    picks.map(async (pick) => {
      const query = `${pick.title} ${pick.author} book`;
      const answer = await searchInstantAnswer(query);
      const description =
        pick.description?.trim() || answer?.abstract || "";
      return {
        ...pick,
        description,
        source_url: answer?.sourceUrl ?? ddgSearchUrl(query),
        source_name: answer?.sourceName ?? "DuckDuckGo",
      };
    }),
  );
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

  if (!getGroqApiKey()) {
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

  // Always non-empty: live DB rows merged with a curated seed shelf.
  const inventory = await fetchInventoryTitles();

  let recommendations: Recommendation[];
  try {
    const parsed = await chatJSON<{ recommendations?: Recommendation[] }>({
      system: SYSTEM_PROMPT,
      user: buildPrompt(prompt, inventory),
      temperature: MODEL_TEMPERATURE,
      timeoutMs: 15_000,
    });
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

  // Enforce inventory-only output and normalize to canonical inventory metadata.
  const inventoryByKey = new Map(inventory.map((b) => [inventoryKey(b.title, b.author), b]));
  const inventoryByTitle = new Map<string, InventoryBook[]>();
  for (const item of inventory) {
    const normalizedTitle = normalizeText(item.title);
    const existing = inventoryByTitle.get(normalizedTitle) ?? [];
    existing.push(item);
    inventoryByTitle.set(normalizedTitle, existing);
  }

  const matched = recommendations
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
      };
    })
    .filter((rec): rec is NonNullable<typeof rec> => Boolean(rec))
    .slice(0, MAX_RECOMMENDATIONS);

  if (matched.length === 0) {
    return NextResponse.json({ recommendations: [] });
  }

  // Best-effort DuckDuckGo grounding/enrichment of the in-stock matches.
  const enriched = await groundWithDuckDuckGo(matched);

  return NextResponse.json({ recommendations: enriched });
}
