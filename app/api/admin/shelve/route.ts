import { NextResponse } from "next/server";
import {
  createServiceClient,
  getUserFromAccessToken,
  isAdminEmail,
} from "@/lib/supabase-server";

export const runtime = "nodejs";

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
    imageLinks?: { thumbnail?: string };
  };
  saleInfo?: {
    listPrice?: { amount?: number };
    retailPrice?: { amount?: number };
  };
};

async function lookupBook(isbn: string) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", `isbn:${isbn}`);
  url.searchParams.set("maxResults", "1");
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) throw new Error("Google Books lookup failed.");
  const json = (await res.json()) as { items?: GoogleBooksVolume[] };
  const item = json.items?.[0];
  if (!item) return null;
  const info = item.volumeInfo ?? {};
  const sale = item.saleInfo ?? {};
  return {
    title: info.title ?? "Unknown",
    author: (info.authors ?? []).join(", "),
    cover_url:
      info.imageLinks?.thumbnail?.replace("http://", "https://") ?? "",
    list_price: sale.retailPrice?.amount ?? sale.listPrice?.amount ?? 0,
  };
}

export async function POST(request: Request) {
  const auth = request.headers.get("authorization") ?? request.headers.get("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const user = await getUserFromAccessToken(token);
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  let body: { isbn?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const rawIsbn = typeof body.isbn === "string" ? body.isbn : "";
  const isbn = normalizeIsbn(rawIsbn);
  if (!isValidIsbn(isbn)) {
    return NextResponse.json(
      { error: "Invalid ISBN — must be 10 or 13 digits." },
      { status: 400 },
    );
  }

  let book: Awaited<ReturnType<typeof lookupBook>>;
  try {
    book = await lookupBook(isbn);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lookup failed." },
      { status: 502 },
    );
  }
  if (!book) {
    return NextResponse.json({ error: "Book not found." }, { status: 404 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("recent_arrivals")
    .insert({
      isbn,
      title: book.title,
      author: book.author,
      cover_url: book.cover_url,
      list_price: book.list_price,
      added_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ arrival: data, book });
}
