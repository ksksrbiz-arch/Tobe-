import { NextResponse } from "next/server";
import { isStudioAuthed } from "@/lib/studioAuth";
import { lookupByTitleAuthor } from "@/lib/books";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Re-resolve a book after Jess corrects a mis-read title/author in the review
// screen. Returns canonical metadata (ISBN, cover, description) or 404.
export async function POST(request: Request) {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { title?: unknown; author?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "A title is required." }, { status: 400 });
  }

  let book;
  try {
    book = await lookupByTitleAuthor(title, author);
  } catch {
    book = null;
  }
  if (!book) {
    return NextResponse.json({ error: "No online match found for that title." }, { status: 404 });
  }
  return NextResponse.json({ book });
}
