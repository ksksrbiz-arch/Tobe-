import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, fetchWithTimeout } from "@/lib/server/functionHardening";
import type { GoogleVolume, ResolvedBook } from "@/lib/api-types";

export const runtime = "nodejs";

function pickIsbn(ids: Array<{ type?: string; identifier?: string }> | undefined): string | null {
  if (!ids) return null;
  const isbn13 = ids.find((i) => i.type === "ISBN_13")?.identifier;
  if (isbn13) return isbn13;
  const isbn10 = ids.find((i) => i.type === "ISBN_10")?.identifier;
  return isbn10 ?? null;
}

/**
 * Resolve a title + author to the best-matching edition's ISBN via Google
 * Books, so an AI Matchmaker pick (which has no ISBN) can be tracked in the
 * ISBN-keyed wishlist. Returns the first result that actually carries an ISBN.
 */
export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = checkRateLimit({
    key: `book-search:${ip}`,
    maxRequests: 20,
    windowMs: 60_000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many lookups. Please slow down." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  const url = new URL(request.url);
  const title = (url.searchParams.get("title") ?? "").trim();
  const author = (url.searchParams.get("author") ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title required." }, { status: 400 });
  }

  const terms = [`intitle:${JSON.stringify(title)}`];
  if (author) terms.push(`inauthor:${JSON.stringify(author)}`);
  const query = encodeURIComponent(terms.join("+"));
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const endpoint =
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&printType=books` +
    (apiKey ? `&key=${apiKey}` : "");

  let volumes: GoogleVolume[] = [];
  try {
    const res = await fetchWithTimeout(endpoint, { headers: { Accept: "application/json" } }, 8000);
    if (!res.ok) {
      return NextResponse.json({ error: "Book lookup is unavailable right now." }, { status: 502 });
    }
    const data = (await res.json()) as { items?: GoogleVolume[] };
    volumes = data.items ?? [];
  } catch {
    return NextResponse.json({ error: "Book lookup timed out. Try again." }, { status: 504 });
  }

  for (const volume of volumes) {
    const info = volume.volumeInfo;
    const isbn = pickIsbn(info?.industryIdentifiers);
    if (!info || !isbn) continue;
    const cover = (info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? "").replace(
      /^http:\/\//,
      "https://",
    );
    const resolved: ResolvedBook = {
      isbn,
      title: info.title ?? title,
      author: info.authors?.join(", ") ?? author,
      cover_url: cover,
      list_price: typeof volume.saleInfo?.listPrice?.amount === "number"
        ? volume.saleInfo.listPrice.amount
        : null,
    };
    return NextResponse.json({ book: resolved });
  }

  return NextResponse.json(
    { error: "No edition with an ISBN was found for that title." },
    { status: 404 },
  );
}
