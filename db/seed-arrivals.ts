/**
 * Seeder for the "Fresh arrivals at the trade desk" feed.
 *
 * Usage:
 *   NETLIFY_DATABASE_URL=postgres://... npx tsx db/seed-arrivals.ts
 *
 * Inserts the curated arrivals from `lib/seedArrivals.ts` — the same list the
 * site renders as its always-on fallback — into the `recent_arrivals` table, so
 * the live database and the static fallback never drift apart. Every cover URL
 * in that list has a verified Open Library jacket.
 *
 * Idempotent: existing ISBNs are skipped, so re-running only inserts new titles.
 */
import { neon } from "@neondatabase/serverless";
import { seedArrivals } from "../lib/seedArrivals";

async function main() {
  const connectionString =
    process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
  if (!connectionString) {
    console.error(
      "NETLIFY_DATABASE_URL (or DATABASE_URL) must be set in the environment.",
    );
    process.exit(1);
  }
  const sql = neon(connectionString);

  // Skip any titles already shelved so re-running is safe (the table has no
  // unique constraint on isbn, so we de-dupe in the seeder).
  const existing = (await sql`SELECT isbn FROM recent_arrivals`) as { isbn: string }[];
  const seen = new Set(existing.map((r) => r.isbn));

  let inserted = 0;
  let skipped = 0;

  for (const book of seedArrivals) {
    if (seen.has(book.isbn)) {
      skipped++;
      continue;
    }
    try {
      await sql`
        INSERT INTO recent_arrivals
          (isbn, sku, title, author, co_author, series, series_number,
           category, subcategory, format, publisher, pub_year, verified,
           cover_url, list_price, added_at, notes)
        VALUES
          (${book.isbn}, ${book.sku}, ${book.title}, ${book.author},
           ${book.co_author}, ${book.series}, ${book.series_number},
           ${book.category}, ${book.subcategory}, ${book.format},
           ${book.publisher}, ${book.pub_year}, ${book.verified},
           ${book.cover_url}, ${book.list_price}, ${book.added_at}, ${book.notes})
      `;
      inserted++;
      console.log(`  ✓ ${book.title} — ${book.author}`);
    } catch (err) {
      skipped++;
      console.warn(
        `  skip — ${book.title}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
