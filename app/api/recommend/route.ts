import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { sql } from "@/lib/db";
import { seedArrivals } from "@/lib/seedArrivals";
import { bookKnowledge } from "@/lib/bookKnowledge";
import { checkRateLimit, getClientIp, withTimeout } from "@/lib/server/functionHardening";

export const runtime = "nodejs";
const MIN_RECOMMENDATIONS = 3;
const MAX_RECOMMENDATIONS = 5;
const MAX_INVENTORY_CONTEXT = 120;
const MODEL_TEMPERATURE = 0.5;

const SYSTEM_PROMPT = `You are a knowledgeable bookseller at To Be Read, a small \
independent bookshop. A reader will describe what they just finished or the mood \
they're chasing. You will receive LIVE_SHELF: real titles in stock, each with a \
short description and mood tags. Recommend ONLY books from LIVE_SHELF — never \
invent titles or suggest books that aren't listed. Match on substance (mood, \
theme, read-alikes), not just keywords. If nothing on the shelf is a good fit, \
return an empty recommendations array rather than a weak guess. For each pick, \
write a warm, specific one-to-two-sentence "reason" that echoes what the reader \
asked for and names the mood or theme that makes it a fit — e.g. "You wanted \
twisty and unreliable: this one keeps you second-guessing every narrator until \
the final page." Avoid generic filler like "readers love it" or "a great read." \
Keep the "description" to the book's actual premise. Return only the structured payload.`;

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
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  category?: string;
  subcategory?: string;
  blurb?: string;
  moods?: string[];
  themes?: string[];
  readAlikes?: string[];
}

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Merge a shelf row with its curated knowledge-base entry (by ISBN).
function withKnowledge(book: Omit<InventoryBook, "blurb" | "moods" | "themes" | "readAlikes">): InventoryBook {
  const k = bookKnowledge[book.isbn];
  return { ...book, blurb: k?.blurb, moods: k?.moods, themes: k?.themes, readAlikes: k?.readAlikes };
}

// Pull the live shelf from Postgres; when the DB is unprovisioned, empty, or
// erroring, fall back to the curated static shelf so the matchmaker always has
// stock. Either way, every book is enriched with knowledge-base metadata.
async function fetchInventoryTitles(): Promise<InventoryBook[]> {
  try {
    const rows = (await sql`
      SELECT isbn, title, author, cover_url, category, subcategory FROM recent_arrivals
      ORDER BY added_at DESC LIMIT 200
    `) as Omit<InventoryBook, "blurb" | "moods" | "themes" | "readAlikes">[];
    if (rows.length > 0) return rows.map(withKnowledge);
  } catch {
    // fall through to the static shelf
  }
  return seedArrivals.map((b) =>
    withKnowledge({
      isbn: b.isbn,
      title: b.title,
      author: b.author,
      cover_url: b.cover_url,
      category: b.category,
      subcategory: b.subcategory,
    }),
  );
}

function inventoryKey(title: string, author: string) {
  return `${normalizeText(title)}::${normalizeText(author)}`;
}

function buildShelfPrompt(readerPrompt: string, inventory: InventoryBook[]) {
  const inventoryContext = inventory
    // Keep context bounded to control token use while covering the shelf breadth.
    .slice(0, MAX_INVENTORY_CONTEXT)
    .map((book, index) => {
      const tags = [...(book.moods ?? []), ...(book.themes ?? [])].slice(0, 6).join(", ");
      const desc = book.blurb ? ` :: ${book.blurb}` : "";
      const tagStr = tags ? ` [${tags}]` : "";
      return `${index + 1}. ${book.title} — ${book.author}${desc}${tagStr}`;
    })
    .join("\n");
  return `Reader request:
${readerPrompt}

LIVE_SHELF (the only books you may recommend):
${inventoryContext}

Rules:
- Return ${MIN_RECOMMENDATIONS} to ${MAX_RECOMMENDATIONS} recommendations when there are good fits.
- Choose only books from LIVE_SHELF; match title and author exactly.
- Prefer mood/theme fit over surface keyword overlap.`;
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
      contents: buildShelfPrompt(prompt, inventory),
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
// Deterministic fallback so the matchmaker works without an AI key (or if the AI
// call fails). Scores shelf titles on knowledge-base signal: mood, theme,
// read-alikes, genre, and title/author overlap with the reader's words.
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "with", "of", "for", "to", "in", "on", "my", "me",
  "we", "that", "this", "like", "love", "loved", "just", "really", "some", "lots",
  "strong", "next", "read", "reading", "book", "books", "story", "stories", "about",
  "want", "looking", "something", "anything", "more", "very", "into", "from", "but",
]);

const GENRE_HINTS: Record<string, string[]> = {
  mystery: ["thriller", "mystery", "cozy", "suspense"],
  thriller: ["thriller", "suspense"],
  suspense: ["thriller", "suspense"],
  twisty: ["twisty", "thriller"],
  dark: ["dark"],
  romance: ["romance", "swoony", "romantic"],
  romantic: ["romance", "swoony"],
  swoony: ["swoony", "romance"],
  romantasy: ["fae", "dragons", "romance", "steamy"],
  fantasy: ["fantasy", "magic", "fae", "dragons"],
  magic: ["magic", "fantasy"],
  dragon: ["dragons"],
  dragons: ["dragons"],
  epic: ["epic", "war"],
  scifi: ["space", "science"],
  space: ["space", "science"],
  historical: ["historical", "war"],
  history: ["historical"],
  war: ["war", "wwii"],
  classic: ["classic"],
  literary: ["literary"],
  memoir: ["memoir", "nonfiction"],
  nonfiction: ["nonfiction", "self-improvement"],
  cozy: ["cozy", "heartwarming"],
  funny: ["funny", "witty"],
  emotional: ["emotional", "heartbreaking"],
  cry: ["heartbreaking", "emotional", "devastating"],
  sad: ["heartbreaking", "emotional"],
  uplifting: ["uplifting", "hopeful"],
  cozy_food: ["cozy"],
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
  if (category === "young_adult") return "YA";
  if (category.startsWith("horror")) return "horror";
  return category.split("_")[0];
}

const formatTag = (t: string) => t.replace(/[-_]/g, " ");
const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

// Compose a specific, non-repetitive reason that names the mood/theme that made
// this book a fit — so even the keyless path reads like a bookseller, not a
// template. A deterministic per-title pick keeps variety within one result set.
function buildReason(book: InventoryBook, matched: string[], genre: string, didMatch: boolean): string {
  const moods = book.moods ?? [];
  const themes = book.themes ?? [];
  const matchedMood = moods.find((m) => matched.some((t) => m.includes(t)));
  const matchedTheme = themes.find((th) => matched.some((t) => formatTag(th).includes(t)));
  const mood = matchedMood ?? moods[0] ?? genre;
  const theme = formatTag(matchedTheme ?? themes[0] ?? "a story worth sinking into");

  if (!didMatch) {
    return `A reader-favorite ${genre} title from our shelves — ${mood} and built around ${theme}.`;
  }
  const templates = [
    `If you're chasing something ${mood}, ${book.title} leans right into ${theme}.`,
    `${article(mood)[0].toUpperCase() + article(mood).slice(1)} ${mood} ${genre} read built around ${theme} — a natural fit for what you described.`,
    `For that ${mood} vibe, this one delivers ${theme}, and it's on our shelves right now.`,
    `Right in line with your request: ${mood}, with ${theme} at its heart.`,
  ];
  const idx = [...book.title].reduce((a, c) => a + c.charCodeAt(0), 0) % templates.length;
  return templates[idx];
}

function heuristicRecommend(prompt: string, inventory: InventoryBook[]): Recommendation[] {
  const tokens = tokenize(prompt);
  const hintFrags = new Set<string>();
  for (const t of tokens) for (const f of GENRE_HINTS[t] ?? []) hintFrags.add(f);

  const scored = inventory.map((book) => {
    // Weighted haystacks: tag matches (mood/theme/read-alike) count for more
    // than incidental matches in the blurb or title.
    const tagHay = normalizeText(
      [...(book.moods ?? []), ...(book.themes ?? []), ...(book.readAlikes ?? []), book.subcategory ?? ""]
        .join(" ")
        .replace(/_/g, " "),
    );
    const textHay = normalizeText(`${book.title} ${book.author} ${book.blurb ?? ""} ${(book.category ?? "").replace(/_/g, " ")}`);
    const matched: string[] = [];
    let score = 0;
    for (const t of tokens) {
      if (tagHay.includes(t)) {
        score += 4;
        matched.push(t);
      } else if (textHay.includes(t)) {
        score += 2;
        matched.push(t);
      }
    }
    for (const f of hintFrags) {
      if (tagHay.includes(f)) score += 3;
      else if (textHay.includes(f)) score += 1;
    }
    return { book, score, matched };
  });

  const positives = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  // Only top up with shelf favorites if there genuinely aren't enough fits.
  const chosen = (positives.length >= MIN_RECOMMENDATIONS ? positives : scored.sort((a, b) => b.score - a.score)).slice(
    0,
    MAX_RECOMMENDATIONS,
  );

  return chosen.map(({ book, score, matched }) => {
    const genre = genreWord(book.category);
    return {
      title: book.title,
      author: book.author,
      description: book.blurb ?? `A ${genre} title from our current shelves.`,
      reason: buildReason(book, matched, genre, score > 0),
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
  // the AI call fails or returns nothing — fall back to the keyless heuristic.
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

  // Ground every recommendation in real inventory metadata. Anything that doesn't
  // map to a shelf title is dropped, and the description is taken from the
  // knowledge base (never the model), so the matchmaker cannot surface a made-up
  // book or a fabricated synopsis.
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
        description: match.blurb ?? rec.description,
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
