import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "bookish-gifts-under-20",
  title: "Bookish gifts under $20 that readers actually want",
  description:
    "Thoughtful bookish gifts under $20 — used hardcovers, complete series, classic editions, and store credit. Affordable ideas readers actually love.",
  excerpt:
    "Great book gifts don't have to be expensive. Here's what $20 buys at a used bookstore — and why it goes a lot further than you'd think.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The safest bookish gift under $20 is store credit to a used bookshop — it&rsquo;s the no-risk option for a picky reader or one who already owns half the shop.
      </QuickAnswer>
      <p>
        A great book gift doesn&rsquo;t need a big budget — it needs the right
        book. At a used bookstore, $20 goes a surprisingly long way. Here&rsquo;s
        what it buys.
      </p>

      <h2>A &ldquo;like-new&rdquo; hardcover of a recent hit</h2>
      <p>
        Last year&rsquo;s bestsellers arrive used in beautiful shape. A gently
        read hardcover of a buzzy title often runs a fraction of cover price —
        the kind of gift that looks like more than you spent.
      </p>

      <h2>A starter stack of a series</h2>
      <p>
        Get someone hooked: the first two or three books of a series like{" "}
        <em>The Empyrean</em> (Fourth Wing) or a long-running mystery, bundled
        together, can land comfortably under $20 used.
      </p>

      <h2>A handsome classic edition</h2>
      <p>
        Used copies of <em>Pride and Prejudice</em>, <em>The Great Gatsby</em>,
        or <em>Dracula</em> make lovely, lasting gifts — and leave room in the
        budget for a card.
      </p>

      <h2>A themed mini-bundle</h2>
      <p>
        Pick a vibe — cozy mysteries, beach reads, sci-fi classics — and build a
        two-or-three-book bundle around it. Personal, and still affordable. Our{" "}
        <Link href="/reading-room/best-beach-reads-summer">beach reads</Link> and{" "}
        <Link href="/reading-room/best-classic-science-fiction-novels">classic sci-fi</Link>{" "}
        lists make easy templates.
      </p>

      <h2>Store credit (the no-risk option)</h2>
      <p>
        For the reader who&rsquo;s picky or owns half the shop already, store
        credit lets them choose. It&rsquo;s the safest $20 you can spend on a
        book lover.
      </p>

      <h2>Come build one</h2>
      <p>
        Drop by and we&rsquo;ll help you assemble a gift to budget — see our{" "}
        <Link href="/visit">hours and directions</Link>. Need ideas by reader
        type? Use our{" "}
        <Link href="/reading-room/book-gifts-for-every-type-of-reader">gift cheat sheet</Link>{" "}
        or ask the <Link href="/#next-read">Matchmaker</Link>.
      </p>
    </>
  );
}
