// DuckDuckGo Instant Answer API — keyless, free, no rate-limit key required.
//
// We use it to ground each book recommendation: confirm the title is a real,
// published work and pull a concise factual blurb + source link. It is strictly
// best-effort — DDG often returns an empty abstract for niche titles — so every
// caller must treat a `null` result as "no extra info" rather than an error.

import { fetchWithTimeout } from "@/lib/server/functionHardening";

const ENDPOINT = "https://api.duckduckgo.com/";

export interface InstantAnswer {
  abstract: string;
  sourceUrl: string;
  sourceName: string;
}

interface DDGResponse {
  AbstractText?: string;
  AbstractURL?: string;
  AbstractSource?: string;
  Heading?: string;
  RelatedTopics?: Array<{ Text?: string; FirstURL?: string }>;
}

/**
 * Look up a query against DuckDuckGo's Instant Answer API. Returns a trimmed
 * abstract plus a source link when DDG has one, otherwise `null`. Never throws —
 * network/parse failures resolve to `null` so grounding can't break a request.
 */
export async function searchInstantAnswer(
  query: string,
  timeoutMs = 4000,
): Promise<InstantAnswer | null> {
  try {
    const url =
      `${ENDPOINT}?q=${encodeURIComponent(query)}` +
      `&format=json&no_html=1&skip_disambig=1&t=tobe-read`;
    const res = await fetchWithTimeout(url, { headers: { Accept: "application/json" } }, timeoutMs);
    if (!res.ok) return null;

    const data = (await res.json()) as DDGResponse;

    const abstract = data.AbstractText?.trim();
    if (abstract) {
      return {
        abstract,
        sourceUrl: data.AbstractURL?.trim() || ddgSearchUrl(query),
        sourceName: data.AbstractSource?.trim() || "DuckDuckGo",
      };
    }

    // No headline abstract — fall back to the first related topic, if any.
    const related = data.RelatedTopics?.find((t) => t.Text && t.FirstURL);
    if (related?.Text) {
      return {
        abstract: related.Text.trim(),
        sourceUrl: related.FirstURL?.trim() || ddgSearchUrl(query),
        sourceName: "DuckDuckGo",
      };
    }

    return null;
  } catch {
    return null;
  }
}

/** Public DuckDuckGo search-results URL — a safe "learn more" fallback link. */
export function ddgSearchUrl(query: string): string {
  return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
}
