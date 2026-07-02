import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { seedArrivals } from "@/lib/seedArrivals";
import { checkRateLimit, getClientIp } from "@/lib/server/functionHardening";

export const runtime = "nodejs";
// NOTE: no segment-level `revalidate` — reading request headers (getClientIp)
// makes this handler dynamic, so that directive was inert. The CDN caching
// comes from the explicit s-maxage Cache-Control header on the response.

export async function GET(request: NextRequest) {
  // Guard the DB against traffic spikes: 120 req / min per IP.
  const ip = getClientIp(request);
  const rl = checkRateLimit({
    key: `recent-arrivals:${ip}`,
    maxRequests: 120,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests — please slow down." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

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
    // DB unavailable — fall through to seed data so the page still renders.
    dbRows = [];
  }

  const seenIsbns = new Set(dbRows.map((r) => String(r.isbn)));
  const seedRows = seedArrivals.filter((s) => !seenIsbns.has(s.isbn));

  const arrivals = [...dbRows, ...seedRows].sort((a, b) => {
    const aDate = new Date(String(a.added_at)).getTime();
    const bDate = new Date(String(b.added_at)).getTime();
    return bDate - aDate;
  });

  return NextResponse.json(
    { arrivals },
    {
      headers: {
        // Cache at CDN for 60 s; serve stale for up to 5 min while
        // revalidating in the background — stale-while-revalidate pattern.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
