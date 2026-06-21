import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "how-to-read-more-books",
  title: "How to read more books: simple habits that actually stick",
  description:
    "Want to read more books this year? Here are practical, guilt-free habits — tiny daily goals, always carrying a book, audiobooks, and permission to quit — that really work.",
  excerpt:
    "Reading more isn't about willpower — it's about friction. Here are the small, practical habits we've watched turn lapsed readers back into regulars.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading life", "Recommendations"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Almost everyone who walks into the shop says some version of the same
        thing: &ldquo;I wish I read more.&rdquo; The good news is that reading
        more has almost nothing to do with willpower and almost everything to do
        with friction. Make it easy, make it pleasant, and the pages add up
        faster than you&rsquo;d think.
      </p>

      <h2>Set a goal so small it feels silly</h2>
      <p>
        Forget &ldquo;a book a week.&rdquo; Aim for ten pages a day, or ten
        minutes before bed. A small, daily target beats a heroic, occasional one
        because it survives busy weeks. Most nights you&rsquo;ll read past ten
        pages anyway — but on the bad days, ten still counts, and the streak
        stays alive.
      </p>

      <h2>Always carry a book</h2>
      <p>
        The reading happens in the cracks: the waiting room, the bus, the ten
        minutes before a meeting starts. If a book (or your phone&rsquo;s reading
        app) is already in your bag, those minutes turn into chapters. A slim
        paperback you can stuff in a coat pocket is worth more than the gorgeous
        hardback that stays home.
      </p>

      <h2>Let audiobooks count</h2>
      <p>
        Some readers feel like listening is cheating. It isn&rsquo;t. Audiobooks
        turn dishes, commutes, and dog walks into reading time, and they&rsquo;re
        a lifeline for anyone whose eyes are tired by the end of the day. Pair a
        print book with its audio version and you can pick up the same story
        whether your hands are free or not.
      </p>

      <h2>Give yourself permission to DNF</h2>
      <p>
        Nothing stalls a reading habit like slogging through a book you
        don&rsquo;t like out of obligation. &ldquo;Did not finish&rdquo; is not a
        moral failing — it&rsquo;s good taste. If a book isn&rsquo;t working by
        page 50, set it down and reach for something that pulls you forward. The
        shelves are long and life is short.
      </p>

      <h2>Beat the slump with something easy</h2>
      <p>
        Every reader hits a stretch where nothing sticks. The cure usually
        isn&rsquo;t a worthier book — it&rsquo;s a more fun one. Break a slump
        with a fast, propulsive read: a thriller, a cozy mystery, or a{" "}
        <Link href="/reading-room/short-books-to-finish-in-a-weekend">
          short book you can finish in a weekend
        </Link>
        . One quick win reminds you why you loved reading in the first place.
      </p>

      <h2>Build a habit, not a pile of pressure</h2>
      <p>
        Stacking unread books into a tower of guilt is its own kind of slump. For
        more on keeping your stack joyful, see our guide to{" "}
        <Link href="/reading-room/build-a-reading-habit-tbr-pile">
          building a reading habit and a TBR pile worth the name
        </Link>
        . And when you&rsquo;re ready for a fresh challenge, our{" "}
        <Link href="/reading-room/reading-challenge-ideas">
          reading-challenge ideas
        </Link>{" "}
        can give the year a little structure.
      </p>

      <p>
        When your stack runs low, come{" "}
        <Link href="/visit">restock in Milwaukie</Link> or browse{" "}
        <Link href="/shop">online</Link> — and if you&rsquo;re not sure what to
        grab next, let the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link> point you somewhere
        good.
      </p>
    </>
  );
}
