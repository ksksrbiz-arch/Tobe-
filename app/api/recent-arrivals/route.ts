import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = (await sql`
      SELECT id, isbn, title, author, cover_url, list_price, added_at
      FROM recent_arrivals
      ORDER BY added_at DESC
      LIMIT 20
    `) as Array<Record<string, unknown>>;
    return NextResponse.json({ arrivals: rows });
  } catch {
    return NextResponse.json({ arrivals: [] });
  }
}
