// Shared Google Books lookups used by the studio photo-intake flow.
//
// The trade-desk scanner (/api/admin/shelve) looks books up by ISBN; the studio
// flow instead resolves AI-detected {title, author} guesses into canonical book
// metadata (real ISBN, cover, description, list price) so only verified online
// data is ever published to the public "Just Shelved" feed.

export interface ResolvedBook {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  description: string;
}

type GoogleBooksVolume = {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    industryIdentifiers?: { type: string; identifier: string }[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
  saleInfo?: {
    listPrice?: { amount?: number };
    retailPrice?: { amount?: number };
  };
};

function httpsCover(url: string | undefined): string {
  if (!url) return "";
  return url.replace("http://", "https://");
}

function volumeToBook(item: GoogleBooksVolume): ResolvedBook | null {
  const info = item.volumeInfo ?? {};
  const sale = item.saleInfo ?? {};
  const isbn13 = info.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier;
  const isbn10 = info.industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier;
  const isbn = isbn13 ?? isbn10;
  if (!isbn) return null;
  return {
    isbn,
    title: info.title ?? "",
    author: (info.authors ?? []).join(", "),
    cover_url: httpsCover(info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail),
    list_price: sale.retailPrice?.amount ?? sale.listPrice?.amount ?? 0,
    description: (info.description ?? "").trim(),
  };
}

async function queryGoogleBooks(q: string): Promise<GoogleBooksVolume | null> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("country", "US");
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { items?: GoogleBooksVolume[] };
  return json.items?.[0] ?? null;
}

/** Resolve an AI-detected title (+ optional author) to canonical book metadata. */
export async function lookupByTitleAuthor(
  title: string,
  author?: string,
): Promise<ResolvedBook | null> {
  const cleanTitle = title.trim();
  if (!cleanTitle) return null;
  const cleanAuthor = (author ?? "").trim();
  const q = cleanAuthor
    ? `intitle:${cleanTitle}+inauthor:${cleanAuthor}`
    : `intitle:${cleanTitle}`;
  const item = await queryGoogleBooks(q);
  if (!item) return null;
  return volumeToBook(item);
}

/** Resolve a raw ISBN to canonical book metadata (with description). */
export async function lookupByIsbn(isbn: string): Promise<ResolvedBook | null> {
  const clean = isbn.replace(/[-\s]/g, "");
  if (!/^\d{10}(\d{3})?$/.test(clean)) return null;
  const item = await queryGoogleBooks(`isbn:${clean}`);
  if (!item) return null;
  const book = volumeToBook(item);
  // Prefer the ISBN we queried with when the volume lists multiple identifiers.
  return book ? { ...book, isbn: clean } : null;
}
