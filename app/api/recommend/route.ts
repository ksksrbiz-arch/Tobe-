import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

const RecommendationSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  reason: z.string(),
});

const ResponseSchema = z.object({
  recommendations: z.array(RecommendationSchema).min(3).max(5),
});

const SYSTEM_PROMPT = `You are a knowledgeable bookseller at To Be Read, a small \
independent bookshop. A reader will describe what they just finished or the \
mood they're chasing. Recommend 3–5 specific real books they're likely to \
love. For each, give a one-sentence "reason" tying the recommendation back \
to the reader's prompt. Keep descriptions concise (1–2 sentences). Skip \
preamble — return only the structured payload.`;

function normalizeTitle(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchInventoryTitles() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("recent_arrivals")
    .select("title, author, cover_url")
    .order("added_at", { ascending: false })
    .limit(200);
  if (error || !data) return [];
  return data as { title: string; author: string; cover_url: string }[];
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
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

  const client = new Anthropic();

  let parsed: z.infer<typeof ResponseSchema>;
  try {
    const response = await client.messages.parse({
      model: "claude-opus-4-7",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
      output_config: { format: zodOutputFormat(ResponseSchema) },
    });
    if (!response.parsed_output) {
      return NextResponse.json(
        { error: "Couldn't generate recommendations. Try rephrasing." },
        { status: 502 },
      );
    }
    parsed = response.parsed_output;
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Recommendation service is busy. Try again in a moment." },
        { status: 429 },
      );
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "Recommendation service is unavailable." },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: "Unexpected error generating recommendations." },
      { status: 500 },
    );
  }

  // Cross-reference against our shelf.
  const inventory = await fetchInventoryTitles();
  const inventoryByTitle = new Map(
    inventory.map((b) => [normalizeTitle(b.title), b]),
  );

  const recommendations = parsed.recommendations.map((rec) => {
    const match = inventoryByTitle.get(normalizeTitle(rec.title));
    return {
      title: rec.title,
      author: rec.author,
      description: rec.description,
      reason: rec.reason,
      cover_url: match?.cover_url || undefined,
      in_stock: Boolean(match),
      pango_url: match
        ? undefined
        : `https://pangobooks.com/search?q=${encodeURIComponent(
            `${rec.title} ${rec.author}`,
          )}`,
    };
  });

  return NextResponse.json({ recommendations });
}
