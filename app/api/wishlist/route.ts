import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";
import { checkRateLimit } from "@/lib/server/functionHardening";

export const runtime = "nodejs";

function normalizeIsbn(raw: string) {
  return raw.replace(/[-\s]/g, "");
}

function isValidIsbn(isbn: string) {
  return /^\d{10}(\d{3})?$/.test(isbn);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const items = (await sql`
    SELECT id, user_id, isbn, title, author, cover_url, list_price, notified, created_at
    FROM wishlists
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  `) as Array<Record<string, unknown>>;
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const rateLimit = checkRateLimit({
    key: `wishlist-write:${session.user.id}`,
    maxRequests: 30,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many wishlist updates. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let body: { isbn?: unknown; title?: unknown; author?: unknown; cover_url?: unknown; list_price?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const isbn = normalizeIsbn(typeof body.isbn === "string" ? body.isbn : "");
  if (!isValidIsbn(isbn)) {
    return NextResponse.json({ error: "Invalid ISBN." }, { status: 400 });
  }
  const title = (typeof body.title === "string" ? body.title : "").slice(0, 500);
  const author = (typeof body.author === "string" ? body.author : "").slice(0, 500);
  const rawCover = typeof body.cover_url === "string" ? body.cover_url.slice(0, 2000) : "";
  // Covers are later fed to next/image — only keep https URLs.
  const cover_url = rawCover.startsWith("https://") ? rawCover : "";
  const list_price = typeof body.list_price === "number" ? body.list_price : null;

  if (!title) {
    return NextResponse.json({ error: "Title required." }, { status: 400 });
  }

  try {
    const inserted = (await sql`
      INSERT INTO wishlists (user_id, isbn, title, author, cover_url, list_price, notified)
      VALUES (${session.user.id}, ${isbn}, ${title}, ${author}, ${cover_url}, ${list_price}, FALSE)
      ON CONFLICT (user_id, isbn) DO UPDATE
        SET title = EXCLUDED.title, author = EXCLUDED.author,
            cover_url = EXCLUDED.cover_url, list_price = EXCLUDED.list_price
      RETURNING id, user_id, isbn, title, author, cover_url, list_price, notified, created_at
    `) as Array<Record<string, unknown>>;
    return NextResponse.json({ item: inserted[0] });
  } catch (err) {
    // Log the real error server-side; never echo driver/SQL details to clients.
    console.error("wishlist POST failed:", err);
    return NextResponse.json(
      { error: "Failed to add to wishlist. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  // The id column is a UUID; a malformed value would make Postgres throw and
  // surface as a framework 500 instead of this route's JSON error contract.
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  await sql`DELETE FROM wishlists WHERE id = ${id} AND user_id = ${session.user.id}`;
  return NextResponse.json({ ok: true });
}
