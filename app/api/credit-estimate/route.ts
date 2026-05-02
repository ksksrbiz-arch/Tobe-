import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SWAP_TIERS: ReadonlyArray<{ max: number; fee: number; label: string }> = [
  { max: 10, fee: 1, label: "$10 or under" },
  { max: 19, fee: 2, label: "$11 – $19" },
  { max: Number.POSITIVE_INFINITY, fee: 3, label: "$20 and up" },
];

const CREDIT_RATE = 0.25;

function getSwapFee(listPrice: number) {
  for (const tier of SWAP_TIERS) {
    if (listPrice <= tier.max) return { fee: tier.fee, label: tier.label };
  }
  return SWAP_TIERS[SWAP_TIERS.length - 1];
}

function normalizeIsbn(raw: string) {
  return raw.replace(/[-\s]/g, "");
}

function isValidIsbn(isbn: string) {
  return /^\d{10}(\d{3})?$/.test(isbn);
}

type GoogleBooksVolume = {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
  saleInfo?: {
    listPrice?: { amount?: number };
    retailPrice?: { amount?: number };
  };
};

export async function GET(request: Request) {
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
    const upstream = await fetch(lookupUrl, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
    });
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
  const swap = getSwapFee(listPrice);

  return NextResponse.json({
    isbn,
    title: info.title ?? "Unknown Title",
    author: (info.authors ?? []).join(", ") || "Unknown Author",
    coverUrl: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
    listPrice,
    creditRate: CREDIT_RATE,
    credit,
    swapFee: swap.fee,
    swapTierLabel: swap.label,
    netCredit: Math.max(0, Math.round((credit - swap.fee) * 100) / 100),
  });
}
