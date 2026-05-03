import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";

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
  const title = typeof body.title === "string" ? body.title : "";
  const author = typeof body.author === "string" ? body.author : "";
  const cover_url = typeof body.cover_url === "string" ? body.cover_url : "";
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
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add." },
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
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }
  await sql`DELETE FROM wishlists WHERE id = ${id} AND user_id = ${session.user.id}`;
  return NextResponse.json({ ok: true });
}
