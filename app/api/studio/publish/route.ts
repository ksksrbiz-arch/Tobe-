import { NextResponse } from "next/server";
import { isStudioAuthed } from "@/lib/studioAuth";
import { sql } from "@/lib/db";
import { notifyWishlistMatches } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BOOKS = 40;

interface PublishBook {
  isbn: string;
  title: string;
  author?: string;
  cover_url?: string;
  list_price?: number;
  description?: string;
  source_photo_url?: string;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { books?: unknown; sourcePhotoUrl?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawBooks = Array.isArray(body.books) ? (body.books as PublishBook[]) : [];
  const sourcePhotoUrl = clean(body.sourcePhotoUrl);
  if (rawBooks.length === 0) {
    return NextResponse.json({ error: "No books selected to publish." }, { status: 400 });
  }
  if (rawBooks.length > MAX_BOOKS) {
    return NextResponse.json(
      { error: `Please publish at most ${MAX_BOOKS} books at a time.` },
      { status: 400 },
    );
  }

  let published = 0;
  let resurfaced = 0;
  const errors: string[] = [];

  for (const raw of rawBooks) {
    const isbn = clean(raw.isbn).replace(/[-\s]/g, "");
    const title = clean(raw.title);
    if (!/^\d{10}(\d{3})?$/.test(isbn) || !title) {
      errors.push(`Skipped "${title || isbn || "unknown"}" — missing a valid ISBN or title.`);
      continue;
    }
    const author = clean(raw.author);
    const coverUrl = clean(raw.cover_url);
    const description = clean(raw.description);
    const photoUrl = clean(raw.source_photo_url) || sourcePhotoUrl;
    const listPrice = typeof raw.list_price === "number" && raw.list_price > 0 ? raw.list_price : 0;

    try {
      const existing = (await sql`
        SELECT id FROM recent_arrivals WHERE isbn = ${isbn} LIMIT 1
      `) as Array<{ id: string }>;

      if (existing.length > 0) {
        // Already on the shelf — bump it back to the top of the feed and refresh metadata.
        await sql`
          UPDATE recent_arrivals SET
            added_at = NOW(),
            title = ${title},
            author = ${author},
            cover_url = ${coverUrl},
            description = ${description},
            source = 'studio_photo',
            source_photo_url = ${photoUrl}
          WHERE isbn = ${isbn}
        `;
        resurfaced += 1;
        continue;
      }

      await sql`
        INSERT INTO recent_arrivals
          (isbn, title, author, cover_url, list_price, description, source, source_photo_url, added_at)
        VALUES
          (${isbn}, ${title}, ${author}, ${coverUrl}, ${listPrice}, ${description},
           'studio_photo', ${photoUrl}, NOW())
      `;
      published += 1;

      // Fire wishlist notifications for genuinely new arrivals only.
      await notifyWishlistMatches({ isbn, title, author, cover_url: coverUrl });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Failed to publish "${title}": ${msg}`);
    }
  }

  return NextResponse.json({ published, resurfaced, errors });
}
