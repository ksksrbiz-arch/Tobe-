import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-short-story-collections",
  title: "Best short story collections to read for any kind of reader",
  description:
    "Short stories perfect for busy readers and big appetites alike. Five great collections — from Interpreter of Maladies to Nine Stories — with a line on each.",
  excerpt:
    "Big payoffs in a small number of pages. Five short story collections worth keeping on the nightstand, whatever you usually read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Genre guide", "Recommendations"],
  readingMinutes: 4,
  items: [
    { name: "Interpreter of Maladies", author: "Jhumpa Lahiri" },
    { name: "Tenth of December", author: "George Saunders" },
    { name: "Her Body and Other Parties", author: "Carmen Maria Machado" },
    {
      name: "What We Talk About When We Talk About Love",
      author: "Raymond Carver",
    },
    { name: "Nine Stories", author: "J.D. Salinger" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The best short story collection to start with is Interpreter of Maladies by Jhumpa Lahiri, a Pulitzer-winning, quietly perfect debut that&rsquo;s a flawless entry point into the format.
      </QuickAnswer>
      <p>
        Short stories are perfect for the way most of us actually read — a
        complete world before bed, a finished arc on a lunch break. A great
        collection gives you the satisfaction of a novel several times over.
        Here are five we hand to readers of every stripe.
      </p>

      <h2>Interpreter of Maladies — Jhumpa Lahiri</h2>
      <p>
        Lahiri&rsquo;s Pulitzer-winning debut about Indian and
        Indian-American lives is quietly perfect. Warm, precise, and emotionally
        enormous — a flawless place to start.
      </p>

      <h2>Tenth of December — George Saunders</h2>
      <p>
        Funny, strange, and unexpectedly tender. Saunders bends reality just
        enough to break your heart; the title story alone is worth the price.
      </p>

      <h2>Her Body and Other Parties — Carmen Maria Machado</h2>
      <p>
        Genre-blurring stories that mix horror, fairy tale, and fierce feminist
        wit. Inventive and unsettling in the best way — perfect for readers who
        want to be surprised.
      </p>

      <h2>What We Talk About When We Talk About Love — Raymond Carver</h2>
      <p>
        The high-water mark of spare, minimalist American storytelling. Ordinary
        people, ordinary kitchens, and an ache that sneaks up on you. A short
        story masterclass.
      </p>

      <h2>Nine Stories — J.D. Salinger</h2>
      <p>
        The companion to <em>The Catcher in the Rye</em>, and arguably the
        better book. &ldquo;A Perfect Day for Bananafish&rdquo; is one of the
        most quietly devastating stories ever written.
      </p>

      <h2>How to read a collection</h2>
      <p>
        You don&rsquo;t have to go front to back — flip to a title that grabs
        you and dip in. That low commitment is exactly why collections make such
        great companions for a busy season or a stalled reading streak.
      </p>

      <h2>Find your next collection</h2>
      <p>
        Browse <Link href="/shop">our shelves</Link> or{" "}
        <Link href="/visit">visit us in Milwaukie</Link> to thumb through a few.
        If you only have a weekend, our{" "}
        <Link href="/reading-room/short-books-to-finish-in-a-weekend">
          short books to finish in a weekend
        </Link>{" "}
        pairs nicely, and a sharp collection is a great{" "}
        <Link href="/reading-room/best-book-club-books">book club pick</Link>{" "}
        too. Ask the <Link href="/#next-read">Matchmaker</Link> for one in your
        taste, then trade it in for credit when you&rsquo;re finished.
      </p>
    </>
  );
}
