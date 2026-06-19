import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "gifts-for-book-lovers",
  title: "Gifts for book lovers: a used-bookshop gift guide",
  description:
    "Shopping for a reader? A practical gift guide for book lovers — from store-credit gifts and surprise stacks to the accessories that actually get used.",
  excerpt:
    "Shopping for a reader who already owns a lot of books? Here's how to give a book lover something they'll genuinely love — without guessing at titles they've read.",
  date: "2026-06-12",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Buying for a reader sounds easy until you remember the risk: they may
        already own it, or have read it, or have Strong Opinions about editions.
        Here&rsquo;s how to give a book lover something they&rsquo;ll actually
        treasure.
      </p>

      <h2>The safest great gift: store credit</h2>
      <p>
        When you can&rsquo;t guess the exact title, give the hunt itself. Store
        credit lets a reader wander the shelves and choose — which, for most
        bibliophiles, is half the joy. Stop by and we&rsquo;ll sort you out; see{" "}
        <Link href="/visit">how to find us</Link>.
      </p>

      <h2>The thoughtful move: a curated surprise stack</h2>
      <p>
        Not sure what they&rsquo;d pick? Describe their taste to us at the
        counter — or run it through the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link> first — and build a
        small stack of two or three secondhand titles that fit. Personal, and
        far cheaper than buying new.
      </p>

      <h2>For the reader who has everything</h2>
      <ul>
        <li>
          <strong>A beautiful used edition</strong> of a book they already love —
          a hardcover to replace a battered paperback.
        </li>
        <li>
          <strong>A book in a genre they never try.</strong> Pair a thriller fan
          with a <Link href="/reading-room/cozy-mystery-starter-shelf">cozy mystery</Link>,
          or a literary reader with a{" "}
          <Link href="/reading-room/fantasy-books-for-beginners">gateway fantasy</Link>.
        </li>
        <li>
          <strong>The accessories that get used:</strong> a sturdy bookmark, a
          good book light, a tote for hauling their finds home.
        </li>
      </ul>

      <h2>What to skip</h2>
      <p>
        Avoid the buzziest new release unless you know for sure they haven&rsquo;t
        read it — avid readers usually have. A secondhand copy of something a
        little off the beaten path almost always lands better.
      </p>

      <p>
        Shopping from afar? You can also support the shop online via{" "}
        <Link href="/shop">our curated selection</Link>. However you give it, a
        book chosen with care is hard to beat.
      </p>
    </>
  );
}
