import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "gifts-for-book-lovers",
  title: "Gifts for book lovers: a used-bookshop gift guide",
  description:
    "Shopping for a reader? A practical gift guide for book lovers — from store-credit gifts and surprise stacks to the accessories that actually get used.",
  excerpt:
    "Shopping for a reader who already owns a lot of books? Here's how to give a book lover something they'll genuinely love — without guessing at titles they've read.",
  date: "2026-06-12",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The safest gift for a reader is store credit — it lets them wander
        the shelves and choose for themselves, which for most bibliophiles is
        half the joy anyway. If you&rsquo;d rather hand over a wrapped book,
        describe their taste at our counter in Milwaukie and we&rsquo;ll build a
        small stack with a gift receipt tucked in.
      </QuickAnswer>
      <p>
        Buying for a reader sounds easy until you remember the risk: they may
        already own it, or have read it, or have Strong Opinions about editions.
        The move is to lean into what a used bookshop does best — the hunt, the
        surprise, and the small thoughtful stack. Here&rsquo;s how to give a book
        lover something they&rsquo;ll actually treasure.
      </p>

      <h2>The safest great gift: store credit</h2>
      <p>
        When you can&rsquo;t guess the exact title, give the hunt itself. Store
        credit lets a reader wander the shelves and choose — which, for most
        bibliophiles, is half the joy. It also pairs naturally with our{" "}
        <Link href="/trade">trade-in program</Link>, so a reader clearing space
        can stack your gift on top of credit for their own finished books. Stop
        by and we&rsquo;ll sort you out; see{" "}
        <Link href="/visit">how to find us</Link>.
      </p>

      <h2>The thoughtful move: a curated surprise stack</h2>
      <p>
        Not sure what they&rsquo;d pick? Describe their taste to us at the
        counter — or run it through the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link> first — and build a
        small stack of two or three secondhand titles that fit. Three books
        chosen with a theme in mind reads as far more personal than one pricey
        new release, and it&rsquo;s usually cheaper. For a shortcut to matching
        the person, our{" "}
        <Link href="/reading-room/book-gifts-for-every-type-of-reader">gift guide by reader type</Link>{" "}
        breaks it down shelf by shelf.
      </p>

      <h2>For the reader who has everything</h2>
      <p>
        <strong>A beautiful used edition</strong> of a book they already love is
        a quiet winner — a clean hardcover to retire a battered, much-loved
        paperback. So is <strong>a book in a genre they never try</strong>: pair
        a thriller fan with a{" "}
        <Link href="/reading-room/cozy-mystery-starter-shelf">cozy mystery</Link>,
        or a literary reader with a{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">gateway fantasy</Link>.
        And don&rsquo;t forget <strong>the accessories that actually get
        used</strong> — a sturdy bookmark, a good clip-on book light, or a tote
        for hauling their finds home. For a reader with a specific obsession, our{" "}
        <Link href="/reading-room/gifts-for-fantasy-and-sci-fi-fans">gifts for fantasy and sci-fi fans</Link>{" "}
        guide goes deeper.
      </p>

      <h2>What to skip</h2>
      <p>
        Avoid the buzziest new release unless you know for sure they haven&rsquo;t
        read it — avid readers usually have. A secondhand copy of something a
        little off the beaten path almost always lands better, and if you&rsquo;re
        watching the budget, our{" "}
        <Link href="/reading-room/bookish-gifts-under-20">bookish gifts under $20</Link>{" "}
        guide is full of ideas that punch above their price.
      </p>

      <p>
        Shopping from afar? You can also support the shop online via{" "}
        <Link href="/shop">our curated selection</Link>. However you give it, a
        book chosen with care is hard to beat.
      </p>
    </>
  );
}
