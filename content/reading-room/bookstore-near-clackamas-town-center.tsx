import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "bookstore-near-clackamas-town-center",
  title: "Looking for a bookstore near Clackamas Town Center?",
  description:
    "Looking for a bookstore near Clackamas Town Center? To Be Read is a beloved used bookstore minutes away in Milwaukie, OR — trade books, browse thousands of titles.",
  excerpt:
    "Shopping the Clackamas area and want real books, not just big-box shelves? To Be Read is a longtime used bookstore minutes from Clackamas Town Center.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Yes — To Be Read is a used bookstore just minutes from Clackamas Town Center at 7931 SE King Rd, Unit 1 in neighboring Milwaukie, with thousands of used titles, trade-in credit, and free parking out front.
      </QuickAnswer>
      <p>
        If you&rsquo;re out near <strong>Clackamas Town Center</strong> and want
        a real bookstore — the kind where you lose track of time in the stacks
        and walk out with something you weren&rsquo;t looking for — you&rsquo;re
        just minutes away from one.
      </p>

      <h2>Meet To Be Read</h2>
      <p>
        <strong>To Be Read</strong> (the longtime Clackamas Book Exchange) is a
        used bookstore that&rsquo;s served the area for over 45 years. We&rsquo;re
        a short drive from the Clackamas Town Center area in neighboring
        Milwaukie, at <Link href="/visit">7931 SE King Rd, Unit 1</Link>, with free
        parking out front.
      </p>

      <h2>Why make the short trip</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> across fiction, classics, romantasy, mystery, sci-fi, kids&rsquo; books, and nonfiction — at used-book prices.</li>
        <li><strong>Trade your old books for store credit</strong> and walk the shelves while we look them over.</li>
        <li><strong>Real recommendations</strong> from people who actually read, not an algorithm on an endcap.</li>
      </ul>

      <h2>Plan a quick visit</h2>
      <p>
        Check our <Link href="/visit">hours, map, and directions</Link> before you
        come, and bring any books you&rsquo;re ready to part with —{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how trade-in credit works</Link>.
      </p>

      <h2>Know what you want first</h2>
      <p>
        Browse the <Link href="/shop">shelves online</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> what you&rsquo;re in the mood
        for, and we&rsquo;ll point you to it when you arrive. New to the area? See
        our{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">guide for readers visiting from Portland</Link>.
      </p>
    </>
  );
}
