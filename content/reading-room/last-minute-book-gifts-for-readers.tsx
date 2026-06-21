import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "last-minute-book-gifts-for-readers",
  title: "Last-minute book gifts for readers (that don't feel last-minute)",
  description:
    "Need a gift today? Last-minute book-gift ideas you can grab in person at a used bookstore — thoughtful picks by reader type, plus store credit when you're truly stuck.",
  excerpt:
    "Out of time? A used bookstore is the last-minute gift hero. Here's how to walk in and walk out with something thoughtful — no shipping, no stress.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Forgot a gift? A used bookstore is your secret weapon: no shipping
        windows, no markup, and a wall of options you can hold in your hands
        today. Here&rsquo;s how to make a last-minute pick feel deeply considered.
      </p>

      <h2>Shop by the one thing you know about them</h2>
      <p>
        You don&rsquo;t need their whole reading history — just one clue. Match it
        fast with our{" "}
        <Link href="/reading-room/book-gifts-for-every-type-of-reader">gift guide by reader type</Link>:
        romantasy fan, classics buff, thriller lover, cozy reader. One detail is
        all it takes.
      </p>

      <h2>Grab a reliable crowd-pleaser</h2>
      <p>
        When in doubt, go with a beloved, widely-loved title. Our{" "}
        <Link href="/reading-room/best-book-club-books">best book club books</Link>{" "}
        and{" "}
        <Link href="/reading-room/best-beach-reads-summer">beach reads</Link>{" "}
        lists are full of safe, satisfying bets that rarely miss.
      </p>

      <h2>Make it look intentional</h2>
      <p>
        A two-book mini-bundle around a theme reads as <em>thoughtful</em>, not
        rushed — and at used-book prices it&rsquo;s still easy on the wallet. See{" "}
        <Link href="/reading-room/bookish-gifts-under-20">bookish gifts under $20</Link>{" "}
        for ready-made combos.
      </p>

      <h2>The ultimate save: store credit</h2>
      <p>
        Truly stuck? <strong>Store credit</strong> is the elegant last-minute
        gift — they pick exactly what they want, and it never goes to waste.
      </p>

      <h2>Come in today</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link> and swing by —
        we&rsquo;ll help you find something great in five minutes flat. Want a head
        start? Ask the <Link href="/#next-read">Matchmaker</Link> on your way over.
      </p>
    </>
  );
}
