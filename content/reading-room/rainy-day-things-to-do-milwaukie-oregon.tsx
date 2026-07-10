import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "rainy-day-things-to-do-milwaukie-oregon",
  title: "Rainy-day things to do in Milwaukie, Oregon",
  description:
    "It's Oregon — it's going to rain. Here's how to spend a wet day in Milwaukie: browse used books at To Be Read, find a warm corner, and stock up for the storm.",
  excerpt:
    "When the Oregon drizzle settles in, lean into it. Here's a cozy, low-key plan for a rainy day in Milwaukie — starting, naturally, with a stack of used books.",
  date: "2026-06-21",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The best rainy-day plan in Milwaukie starts at To Be Read, 7931 SE
        King Rd, Unit 1 — lose an hour browsing the stacks, then grab a hot
        drink on Main Street before heading home to read.
      </QuickAnswer>
      <p>
        Let&rsquo;s be honest: this is the Pacific Northwest, and a good rainy-day
        plan is a survival skill. The best ones are slow, warm, and indoors —
        and Milwaukie is well set up for exactly that.
      </p>

      <h2>Start where it&rsquo;s dry: the bookstore</h2>
      <p>
        There&rsquo;s no better rainy-day ritual than browsing a used bookstore
        with nowhere to be. Come lose an hour in the stacks at{" "}
        <strong>To Be Read</strong>,{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1</Link> &mdash; thousands of
        titles, free parking right out front so you&rsquo;re not dashing through
        the rain, and a trade counter if you&rsquo;re clearing shelf space while
        you&rsquo;re at it. A wet afternoon is the ideal time to go slow, since
        nobody&rsquo;s in a hurry to get back outside. New here? Our{" "}
        <Link href="/reading-room/first-visit-to-be-read-bookstore-guide">
          first-visit guide
        </Link>{" "}
        covers what to expect, and here&rsquo;s{" "}
        <Link href="/trade">how the trade counter works</Link> if you&rsquo;re
        bringing books.
      </p>

      <h2>Build a storm stash</h2>
      <p>
        Rain in the forecast all week? Stock up. A few used paperbacks across
        genres &mdash; a thriller, a cozy mystery, something comforting &mdash;
        means you&rsquo;re set no matter how long it pours, and buying secondhand
        keeps a week&rsquo;s worth of reading affordable. Our{" "}
        <Link href="/reading-room/cozy-mystery-starter-shelf">cozy mystery shelf</Link>,{" "}
        <Link href="/reading-room/literary-fiction-that-makes-you-cry">literary tearjerkers</Link>, and{" "}
        <Link href="/reading-room/best-cozy-fantasy-books">cozy fantasy</Link>{" "}
        are all perfect rainy-day fare. Browse the{" "}
        <Link href="/shop">shop</Link> before you come so a stack is waiting.
      </p>

      <h2>Settle in</h2>
      <p>
        Grab a hot drink on Milwaukie&rsquo;s Main Street, then head home, light a
        lamp, and let the rain do its thing. A blanket, a fresh book, and the
        sound of an Oregon downpour is a genuinely great afternoon.
      </p>

      <h2>Plan around the weather</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link> before you head
        out, see our{" "}
        <Link href="/reading-room/cozy-places-to-read-in-milwaukie-oregon">cozy places to read in Milwaukie</Link>{" "}
        for clear-sky days, or let the{" "}
        <Link href="/#next-read">Matchmaker</Link> pick your storm read.
      </p>
    </>
  );
}
