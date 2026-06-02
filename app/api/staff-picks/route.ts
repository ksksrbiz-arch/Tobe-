import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public read of featured "Staff Picks". Defensive: if the featured/pick_note
// columns haven't been migrated yet, return an empty list rather than erroring
// so the homepage section simply hides itself.
export async function GET() {
  let rows: Array<Record<string, unknown>> = [];
  try {
    rows = (await sql`
      SELECT id, isbn, title, author, cover_url, list_price, pick_note, added_at
      FROM recent_arrivals
      WHERE featured = TRUE
      ORDER BY added_at DESC
      LIMIT 12
    `) as Array<Record<string, unknown>>;
  } catch {
    rows = [];
  }
  return NextResponse.json({ picks: rows });
}
