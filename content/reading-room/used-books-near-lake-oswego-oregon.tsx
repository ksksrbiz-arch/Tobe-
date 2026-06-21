import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-lake-oswego-oregon",
  title: "Used books near Lake Oswego, Oregon",
  description:
    "Live in Lake Oswego or West Linn? To Be Read is your nearby used bookstore — a short drive across the river in Milwaukie. Trade books and browse thousands of titles.",
  excerpt:
    "Lake Oswego and West Linn readers: your nearest used bookstore is a quick trip across the river in Milwaukie. Here's what's waiting at To Be Read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Lake Oswego and West Linn have plenty of charm, but a deep, browseable
        used bookstore isn&rsquo;t always around the corner. Good news for readers
        on the west side of the river: one of the area&rsquo;s best is a short
        drive away.
      </p>

      <h2>To Be Read — just across the river</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served readers for 45+ years from{" "}
        <Link href="/visit">7931 SE King Rd, Ste 1 in Milwaukie</Link>. From Lake
        Oswego it&rsquo;s a quick hop across the Willamette; from West Linn, a
        straight shot up the highway. Free parking when you get here.
      </p>

      <h2>Worth the short drive</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> — fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction — at used-book prices.</li>
        <li><strong>Trade-in credit</strong> for the books you&rsquo;ve finished, so the shelves keep turning over.</li>
        <li><strong>Genuine recommendations</strong> from staff who read widely and love a good match.</li>
      </ul>

      <h2>Make the trip count</h2>
      <p>
        Bring a box to trade —{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how credit works</Link>{" "}
        — and check our <Link href="/visit">hours and directions</Link> first. New
        to us? See why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the metro make the drive</Link>,
        or line up picks with the <Link href="/#next-read">Matchmaker</Link>.
      </p>
    </>
  );
}
