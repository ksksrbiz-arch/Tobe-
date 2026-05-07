import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { seedArrivals } from "@/lib/seedArrivals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let dbRows: Array<Record<string, unknown>> = [];
  try {
    dbRows = (await sql`
      SELECT id, isbn, title, author, cover_url, list_price, added_at,
             co_author, series, series_number, category, subcategory,
             format, publisher, pub_year
      FROM recent_arrivals
      ORDER BY added_at DESC
      LIMIT 50
    `) as Array<Record<string, unknown>>;
  } catch {
    dbRows = [];
  }

  const seenIsbns = new Set(dbRows.map((r) => String(r.isbn)));
  const seedRows = seedArrivals.filter((s) => !seenIsbns.has(s.isbn));

  const arrivals = [...dbRows, ...seedRows].sort((a, b) => {
    const aDate = new Date(String(a.added_at)).getTime();
    const bDate = new Date(String(b.added_at)).getTime();
    return bDate - aDate;
  });

  return NextResponse.json({ arrivals });
}
