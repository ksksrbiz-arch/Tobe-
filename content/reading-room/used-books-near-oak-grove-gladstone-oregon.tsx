import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-oak-grove-gladstone-oregon",
  title: "Used books near Oak Grove & Gladstone, Oregon",
  description:
    "Live in Oak Grove, Gladstone, or Jennings Lodge? To Be Read is your closest used bookstore — minutes up SE King Rd in Milwaukie. Trade books, browse thousands.",
  excerpt:
    "If you're in Oak Grove, Gladstone, or Jennings Lodge, your nearest used bookstore is closer than you think — minutes north in Milwaukie. Here's what to know.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        The communities along the Willamette just south of Milwaukie — Oak Grove,
        Gladstone, Jennings Lodge — don&rsquo;t all have a bookstore of their own.
        Good news: your nearest one is a short drive north, and it&rsquo;s a good
        one.
      </p>

      <h2>To Be Read — minutes away in Milwaukie</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served the area for over 45 years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. From Oak
        Grove or Jennings Lodge it&rsquo;s a quick trip up McLoughlin or River
        Road; from Gladstone, a short hop across the river. Free parking when you
        arrive.
      </p>

      <h2>What you&rsquo;ll find</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> — fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction — at used-book prices.</li>
        <li><strong>Trade-in credit</strong> for the books you&rsquo;re done with, so your shelves (and wallet) stay balanced.</li>
        <li><strong>Staff who read</strong> and are happy to point you to your next favorite.</li>
      </ul>

      <h2>Make the trip count</h2>
      <p>
        Bring a box to trade —{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how credit works</Link>{" "}
        — and check our <Link href="/visit">hours and directions</Link> first. New
        to us? See why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the area make the drive</Link>,
        or line up picks with the <Link href="/#next-read">Matchmaker</Link>.
      </p>
    </>
  );
}
