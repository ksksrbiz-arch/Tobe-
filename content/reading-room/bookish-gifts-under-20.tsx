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
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The safest bookish gift under $20 is store credit to a used bookshop — it&rsquo;s the no-risk option for a picky reader or one who already owns half the shop. If you want something to wrap, a like-new hardcover of a recent hit or a two-book themed bundle both land comfortably under $20 secondhand.
      </QuickAnswer>
      <p>
        A great book gift doesn&rsquo;t need a big budget — it needs the right
        book. At our shop in Milwaukie, $20 goes a surprisingly long way,
        because you&rsquo;re paying used prices for books that are often barely
        read. Here&rsquo;s what that twenty actually buys, and who each idea
        suits.
      </p>

      <h2>A &ldquo;like-new&rdquo; hardcover of a recent hit</h2>
      <p>
        Last year&rsquo;s bestsellers arrive used in beautiful shape — someone
        read them once and traded them in. A gently read hardcover of a buzzy
        title like <em>Remarkably Bright Creatures</em> or{" "}
        <em>Tomorrow, and Tomorrow, and Tomorrow</em> often runs well under half
        of cover price. This one&rsquo;s for the reader who follows the new
        releases: it looks like you spent more than you did, and a hardcover
        feels like a keeper. Ask us to tuck in a gift receipt so they can swap
        it if they already own it.
      </p>

      <h2>A starter stack of a series</h2>
      <p>
        The best way to hook someone is to hand them a runway. The first two or
        three books of a series — <em>Fourth Wing</em> and <em>Iron Flame</em>{" "}
        for the romantasy-curious, or the opening Louise Penny{" "}
        <em>Inspector Gamache</em> mysteries for a cozy reader — often bundle
        together under $20 used. It suits anyone who loves the feeling of not
        having to stop. For more matched-to-the-reader ideas, see our{" "}
        <Link href="/reading-room/gifts-for-romantasy-fans">gifts for romantasy fans</Link>{" "}
        and{" "}
        <Link href="/reading-room/gifts-for-mystery-and-thriller-lovers">gifts for mystery and thriller lovers</Link>.
      </p>

      <h2>A handsome classic edition</h2>
      <p>
        Used copies of <em>Pride and Prejudice</em>, <em>The Great Gatsby</em>,
        or <em>Dracula</em> make lovely, lasting gifts — clothbound and
        deckle-edge editions turn up secondhand for a fraction of new, and still
        leave room in the budget for a card. This is the pick for the reader who
        treats books as objects. Browse more in our{" "}
        <Link href="/reading-room/gifts-for-classic-literature-lovers">gifts for classic-literature lovers</Link>{" "}
        guide.
      </p>

      <h2>A themed mini-bundle</h2>
      <p>
        Pick a vibe — cozy mysteries, beach reads, sci-fi classics — and build a
        two-or-three-book bundle around it. It reads as thoughtful rather than
        rushed, and it&rsquo;s still affordable. Our{" "}
        <Link href="/reading-room/best-beach-reads-summer">beach reads</Link> and{" "}
        <Link href="/reading-room/best-classic-science-fiction-novels">classic sci-fi</Link>{" "}
        lists make easy templates to pull two titles from.
      </p>

      <h2>Store credit (the no-risk option)</h2>
      <p>
        For the reader who&rsquo;s picky or owns half the shop already, store
        credit lets them choose. It&rsquo;s the safest $20 you can spend on a
        book lover — and if they&rsquo;ve got books to clear off their own
        shelves, our{" "}
        <Link href="/trade">trade-in program</Link> can stretch that gift even
        further.
      </p>

      <h2>Come build one</h2>
      <p>
        Drop by and we&rsquo;ll help you assemble a gift to budget in a few
        minutes — see our{" "}
        <Link href="/visit">hours and directions</Link>. Need ideas by reader
        type? Use our{" "}
        <Link href="/reading-room/book-gifts-for-every-type-of-reader">gift cheat sheet</Link>{" "}
        or ask the <Link href="/#next-read">Matchmaker</Link>.
      </p>
    </>
  );
}
