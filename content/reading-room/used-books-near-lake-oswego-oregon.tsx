import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-lake-oswego-oregon",
  title: "Used books near Lake Oswego, Oregon",
  description:
    "Live in Lake Oswego or West Linn? To Be Read is your nearby used bookstore — a short drive across the river in Milwaukie. Trade books and browse thousands of titles.",
  excerpt:
    "Lake Oswego and West Linn readers: your nearest used bookstore is a quick trip across the river in Milwaukie. Here's what's waiting at To Be Read.",
  date: "2026-06-21",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The nearest used bookstore to Lake Oswego is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — about 15 minutes across the Willamette, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Lake Oswego has plenty of charm and no shortage of readers, but a deep,
        browseable used bookstore isn&rsquo;t one of the things it keeps in town.
        You can find new releases and a tidy shelf easily enough; what&rsquo;s
        harder to find is a big secondhand shop where you can dig for an
        out-of-print copy or a whole series at used-book prices. Good news for
        readers on the west side of the river: one of the area&rsquo;s best is a
        short drive across, in Milwaukie.
      </p>

      <h2>To Be Read &mdash; just across the river</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served readers for more than 45 years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. From Lake
        Oswego it&rsquo;s a quick hop across the Willamette &mdash; the simplest
        way is over the river toward OR-99E (McLoughlin Blvd) and up into
        old-town Milwaukie, then a turn onto SE King Road. Figure on about 15
        minutes, with free parking when you get here. It&rsquo;s an easy add-on
        to a trip you&rsquo;re already making across the river &mdash; errands,
        a meal, a stop in old-town Milwaukie &mdash; rather than a special
        outing. Coming from just south? We&rsquo;ve mapped the same trip from{" "}
        <Link href="/reading-room/used-books-near-west-linn-oregon">West Linn</Link>.
      </p>

      <h2>Worth the short drive</h2>
      <p>
        Inside you&rsquo;ll find <strong>thousands of used titles</strong> &mdash;
        fiction, classics, romantasy, mystery, sci-fi and fantasy, kids&rsquo;
        books, and nonfiction &mdash; all at used-book prices, so a full bag
        won&rsquo;t sting. It&rsquo;s a browsing store, the kind where one
        interesting spine leads straight to the next and a quick stop becomes an
        unhurried hour. And the recommendations come from staff who read widely
        and love a good match. Wondering if it beats the chain shelf? Here&rsquo;s
        the honest case for{" "}
        <Link href="/reading-room/are-used-bookstores-worth-it">why used bookstores are worth it</Link>.
      </p>

      <h2>Bring a box to trade</h2>
      <p>
        The swap keeps the shelves turning over. Bring the books you&rsquo;ve
        finished and we&rsquo;ll look them over for{" "}
        <Link href="/trade">trade-in store credit</Link> while you browse. New to
        how it works? Start with{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">our guide to trade-in credit</Link>{" "}
        so you arrive ready.
      </p>

      <h2>Make the trip count</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link> first, then
        browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link>. New to us? See why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the metro make the drive</Link>,
        and if you&rsquo;d like to build a proper outing around it, here&rsquo;s a{" "}
        <Link href="/reading-room/milwaukie-oregon-book-lovers-day-out">book lover&rsquo;s day out in Milwaukie</Link>.
      </p>
    </>
  );
}
