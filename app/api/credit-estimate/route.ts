import { NextResponse } from "next/server";
import { checkRateLimit, fetchWithTimeout, getClientIp } from "@/lib/server/functionHardening";
import type { GoogleBooksVolume } from "@/lib/api-types";

export const runtime = "nodejs";

const CREDIT_RATE = 0.25;

function normalizeIsbn(raw: string) {
  return raw.replace(/[-\s]/g, "");
}

function isValidIsbn(isbn: string) {
  return /^\d{10}(\d{3})?$/.test(isbn);
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `credit-estimate:${ip}`,
    maxRequests: 60,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many lookups. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }

  const url = new URL(request.url);
  const rawIsbn = url.searchParams.get("isbn");

  if (!rawIsbn) {
    return NextResponse.json(
      { error: "Missing required `isbn` query parameter." },
      { status: 400 },
    );
  }

  const isbn = normalizeIsbn(rawIsbn);
  if (!isValidIsbn(isbn)) {
    return NextResponse.json(
      { error: "Invalid ISBN — must be 10 or 13 digits (hyphens are OK)." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const lookupUrl = new URL("https://www.googleapis.com/books/v1/volumes");
  lookupUrl.searchParams.set("q", `isbn:${isbn}`);
  lookupUrl.searchParams.set("maxResults", "1");
  if (apiKey) lookupUrl.searchParams.set("key", apiKey);

  let payload: { items?: GoogleBooksVolume[] };
  try {
    const upstream = await fetchWithTimeout(
      lookupUrl,
      {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
      },
      8000,
    );
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Google Books lookup failed." },
        { status: 502 },
      );
    }
    payload = (await upstream.json()) as { items?: GoogleBooksVolume[] };
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach Google Books." },
      { status: 502 },
    );
  }

  const item = payload.items?.[0];
  if (!item) {
    return NextResponse.json(
      { error: "No book found for that ISBN." },
      { status: 404 },
    );
  }

  const info = item.volumeInfo ?? {};
  const sale = item.saleInfo ?? {};
  const listPrice =
    sale.retailPrice?.amount ?? sale.listPrice?.amount ?? null;

  if (listPrice == null) {
    return NextResponse.json(
      {
        error:
          "Found the book, but Google Books didn't return a list price. Enter it manually.",
        title: info.title ?? null,
        author: (info.authors ?? []).join(", ") || null,
        coverUrl: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
      },
      { status: 422 },
    );
  }

  const credit = Math.round(listPrice * CREDIT_RATE * 100) / 100;

  return NextResponse.json({
    isbn,
    title: info.title ?? "Unknown Title",
    author: (info.authors ?? []).join(", ") || "Unknown Author",
    coverUrl: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
    listPrice,
    creditRate: CREDIT_RATE,
    credit,
  });
}
