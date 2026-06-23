import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-happy-valley-oregon",
  title: "Used books near Happy Valley, Oregon",
  description:
    "Live in Happy Valley or Damascus? To Be Read is a nearby used bookstore — a short drive west in Milwaukie. Trade books and browse thousands of titles at fair prices.",
  excerpt:
    "Happy Valley and Damascus readers: a deep, browseable used bookstore is closer than you think — a short drive west in Milwaukie. Here's what's waiting.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Happy Valley has grown fast, but a proper used bookstore — the kind you
        can get lost in for an hour — isn&rsquo;t on every corner. For readers out
        here, one of the area&rsquo;s best is a short drive west.
      </p>

      <h2>To Be Read — a short hop west</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served Clackamas County readers for 45+ years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. From Happy
        Valley or Damascus it&rsquo;s a quick trip down toward the river — past
        the Clackamas Town Center area — with free parking when you arrive.
      </p>

      <h2>Why it&rsquo;s worth the drive</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> — fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction — at used-book prices.</li>
        <li><strong>Trade-in credit</strong> for the books you&rsquo;ve finished, so your shelves keep moving.</li>
        <li><strong>Real recommendations</strong> from staff who actually read.</li>
      </ul>

      <h2>Plan your trip</h2>
      <p>
        Bring a box to trade —{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how credit works</Link>{" "}
        — and check our <Link href="/visit">hours and directions</Link> first.
        Already near the mall?{" "}
        <Link href="/reading-room/bookstore-near-clackamas-town-center">We&rsquo;re minutes from Clackamas Town Center</Link>.
        Line up picks with the <Link href="/#next-read">Matchmaker</Link> before you
        come.
      </p>
    </>
  );
}
