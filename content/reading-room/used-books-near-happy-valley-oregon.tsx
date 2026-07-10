import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-happy-valley-oregon",
  title: "Used books near Happy Valley, Oregon",
  description:
    "Live in Happy Valley or Damascus? To Be Read is a nearby used bookstore — a short drive west in Milwaukie. Trade books and browse thousands of titles at fair prices.",
  excerpt:
    "Happy Valley and Damascus readers: a deep, browseable used bookstore is closer than you think — a short drive west in Milwaukie. Here's what's waiting.",
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
        The nearest used bookstore to Happy Valley and Damascus is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — about 15 minutes west toward the river, past the Clackamas Town Center area, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Happy Valley has grown fast, but a proper used bookstore &mdash; the kind
        you can get lost in for an hour &mdash; hasn&rsquo;t grown up with it.
        The newer stretches of Happy Valley and Damascus lean toward big-box
        shelves and this week&rsquo;s bestsellers. For readers who want depth and
        secondhand prices, one of the area&rsquo;s best is a short drive west.
      </p>

      <h2>To Be Read &mdash; a short hop west</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served Clackamas County readers for more than 45 years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. From
        Happy Valley or Damascus, the natural route runs down toward the river
        &mdash; work your way over to OR-224 (the Milwaukie Expressway) past the
        Clackamas Town Center area, then into old-town Milwaukie &mdash; and
        it&rsquo;s roughly 15 minutes with free parking when you arrive. If
        you&rsquo;re already headed to the mall, we&rsquo;re just{" "}
        <Link href="/reading-room/bookstore-near-clackamas-town-center">minutes from Clackamas Town Center</Link>,
        so it&rsquo;s an easy add-on.
      </p>

      <h2>Why it&rsquo;s worth the drive</h2>
      <p>
        Inside you&rsquo;ll find <strong>thousands of used titles</strong> &mdash;
        fiction, classics, romantasy, mystery, sci-fi and fantasy, kids&rsquo;
        books, and nonfiction &mdash; all at used-book prices, so you can fill a
        bag without flinching. This is a browsing store: one spine leads to the
        next, and a quick stop turns into an unhurried hour. You&rsquo;ll also
        find real recommendations from staff who actually read. If you&rsquo;re
        weighing the drive, here&rsquo;s the honest case for{" "}
        <Link href="/reading-room/are-used-bookstores-worth-it">why used bookstores are worth it</Link>.
      </p>

      <h2>Trade in and take home</h2>
      <p>
        The swap is half the fun. Bring the books you&rsquo;ve finished and
        we&rsquo;ll look them over for{" "}
        <Link href="/trade">trade-in store credit</Link> while you browse, so your
        shelves keep moving and your next stack costs less. New to it? Start with{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        so you arrive ready to swap.
      </p>

      <h2>Plan your trip</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link> first, then
        browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link> before you come. First time in?
        Our{" "}
        <Link href="/reading-room/first-visit-to-be-read-bookstore-guide">first-visit guide</Link>{" "}
        tells you what to expect, and if a neighbor lives a little farther out,
        we&rsquo;ve mapped the drive from{" "}
        <Link href="/reading-room/used-books-near-oak-grove-gladstone-oregon">Oak Grove and Gladstone</Link>{" "}
        too.
      </p>
    </>
  );
}
