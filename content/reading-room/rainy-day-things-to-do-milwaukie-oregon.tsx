import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "rainy-day-things-to-do-milwaukie-oregon",
  title: "Rainy-day things to do in Milwaukie, Oregon",
  description:
    "It's Oregon — it's going to rain. Here's how to spend a wet day in Milwaukie: browse used books at To Be Read, find a warm corner, and stock up for the storm.",
  excerpt:
    "When the Oregon drizzle settles in, lean into it. Here's a cozy, low-key plan for a rainy day in Milwaukie — starting, naturally, with a stack of used books.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
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
        <Link href="/visit">7931 SE King Rd, Unit 1</Link> — thousands of titles,
        and a trade counter if you&rsquo;re clearing shelf space while you&rsquo;re
        at it.
      </p>

      <h2>Build a storm stash</h2>
      <p>
        Rain in the forecast all week? Stock up. A few used paperbacks across
        genres — a thriller, a cozy mystery, something comforting — means
        you&rsquo;re set no matter how long it pours. Our{" "}
        <Link href="/reading-room/cozy-mystery-starter-shelf">cozy mystery shelf</Link>{" "}
        and{" "}
        <Link href="/reading-room/literary-fiction-that-makes-you-cry">literary tearjerkers</Link>{" "}
        are perfect rainy-day fare.
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
