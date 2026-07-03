import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "first-visit-to-be-read-bookstore-guide",
  title: "Your first visit to To Be Read: what to know",
  description:
    "Visiting To Be Read in Milwaukie for the first time? Here's what to expect — hours, parking, how trading works, and how to find your next read on your first trip.",
  excerpt:
    "Never been in before? Here's everything you need for a great first visit to To Be Read — where to park, how trading works, and how to leave with the perfect book.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        First-time visitors to To Be Read should expect free parking at 7931 SE King Rd, Unit 1 in Milwaukie, thousands of used books worth browsing slowly, the option to trade finished books for store credit, and staff happy to recommend your next read.
      </QuickAnswer>
      <p>
        First time stopping by? Welcome. <strong>To Be Read</strong> is a used
        bookstore in Milwaukie, OR that&rsquo;s been part of the community for
        over 45 years. Here&rsquo;s everything you need for a smooth first visit.
      </p>

      <h2>Where to find us &amp; when</h2>
      <p>
        We&rsquo;re at <Link href="/visit">7931 SE King Rd, Unit 1</Link>, with free
        parking right out front. Check our{" "}
        <Link href="/visit">current hours and directions</Link> before you head
        over — it&rsquo;s a quick trip from Portland, Clackamas, Oak Grove, and
        Lake Oswego.
      </p>

      <h2>What you&rsquo;ll find inside</h2>
      <p>
        Thousands of used books across every section — fiction, classics,
        romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction — at used-book
        prices. Take your time; browsing slowly is the whole point.
      </p>

      <h2>Bringing books to trade?</h2>
      <p>
        You can turn books you&rsquo;re done with into store credit. If
        it&rsquo;s your first time trading, read{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        first so you know what we tend to look for — then browse while we go
        through your stack.
      </p>

      <h2>Not sure what to get?</h2>
      <p>
        Just ask — we love a good recommendation. Or prime the pump before you
        arrive: tell our <Link href="/#next-read">Next Read Matchmaker</Link> what
        you last loved and walk in with a short list.
      </p>

      <h2>Make a day of it</h2>
      <p>
        Pair your visit with coffee and a riverside walk — see our{" "}
        <Link href="/reading-room/milwaukie-oregon-book-lovers-day-out">book lover&rsquo;s day out in Milwaukie</Link>{" "}
        and our{" "}
        <Link href="/reading-room/cozy-places-to-read-in-milwaukie-oregon">favorite cozy reading spots</Link>{" "}
        nearby.
      </p>
    </>
  );
}
