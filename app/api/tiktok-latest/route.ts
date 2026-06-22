import { NextResponse } from "next/server";
import { checkRateLimit, fetchWithTimeout, getClientIp } from "@/lib/server/functionHardening";

export const runtime = "nodejs";
// Cache the parsed feed for 30 minutes so we don't refetch the RSS bridge on
// every page load; new posts surface within that window.
export const revalidate = 1800;

/**
 * Latest TikTok videos for @clackamas.book.ex.
 *
 * TikTok has no public, no-login endpoint to list a creator's newest videos,
 * so this reads an RSS feed produced by a third-party bridge (e.g. RSS.app)
 * configured via the TIKTOK_RSS_URL env var. The feed lists items newest-first;
 * we extract the TikTok video URLs in document order (which is therefore
 * newest-first), dedupe by id, and return enough for the on-site player to show
 * the latest clip(s) at the top.
 *
 * When TIKTOK_RSS_URL isn't set (or the fetch fails) we return
 * { configured: false } and the UI falls back to its built-in featured videos,
 * so the site never shows a broken state.
 */

type TikTokVideo = { videoId: string; username: string };

// Matches https://www.tiktok.com/@<username>/video/<digits> anywhere in the feed.
const VIDEO_URL_RE = /tiktok\.com\/@([A-Za-z0-9._]+)\/video\/(\d{6,25})/g;

function parseFeed(xml: string, limit: number): TikTokVideo[] {
  const seen = new Set<string>();
  const out: TikTokVideo[] = [];
  for (const m of xml.matchAll(VIDEO_URL_RE)) {
    const username = m[1];
    const videoId = m[2];
    if (seen.has(videoId)) continue;
    seen.add(videoId);
    out.push({ videoId, username });
    if (out.length >= limit) break;
  }
  return out;
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `tiktok-latest:${ip}`,
    maxRequests: 90,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and retry." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }

  const feedUrl = process.env.TIKTOK_RSS_URL;
  if (!feedUrl) {
    // Not wired up yet — the UI keeps showing its built-in featured videos.
    return NextResponse.json({ configured: false, videos: [] });
  }

  try {
    const res = await fetchWithTimeout(
      feedUrl,
      {
        headers: { Accept: "application/rss+xml, application/xml, text/xml, */*" },
        next: { revalidate: 1800 },
      },
      8000,
    );
    if (!res.ok) {
      return NextResponse.json({ configured: true, videos: [], error: "feed-unavailable" });
    }
    const xml = await res.text();
    const videos = parseFeed(xml, 6);
    return NextResponse.json({ configured: true, videos });
  } catch {
    // Network/parse hiccup — degrade to the UI fallback rather than erroring.
    return NextResponse.json({ configured: true, videos: [], error: "feed-error" });
  }
}
