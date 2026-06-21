import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-west-linn-oregon",
  title: "Used Books Near West Linn, Oregon: To Be Read in Milwaukie",
  description:
    "West Linn readers: your nearest used bookstore is a quick trip across the river to Milwaukie. To Be Read has thousands of used titles, credit, free parking.",
  excerpt:
    "From West Linn, your closest used bookstore is a short hop across the river in Milwaukie. Here's what's on To Be Read's shelves and how to get there.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        West Linn sits pretty along the Willamette, but a browse-for-an-afternoon
        used bookstore isn&rsquo;t one of the things it has of its own. For West
        Linn readers, the nearest real one is a short trip across the river in
        Milwaukie &mdash; close enough to make a regular habit of it.
      </p>

      <h2>To Be Read &mdash; your closest used bookstore</h2>
      <p>
        <strong>To Be Read</strong> has been part of the area for more than 45
        years, at{" "}
        <Link href="/visit">7931 SE King Rd, Ste 1 in Milwaukie</Link>. To be
        clear, it&rsquo;s in Milwaukie, not West Linn &mdash; but it&rsquo;s a
        quick drive away, and it&rsquo;s the closest shop with the kind of
        floor-to-ceiling used-book selection that makes the trip worthwhile.
      </p>

      <h2>Honest directions from West Linn</h2>
      <p>
        Plan on about 15 to 20 minutes depending on traffic. The easiest path is
        north on <strong>OR-43 (Willamette Falls Dr / Macadam)</strong> and
        across the river, or hop on <strong>I-205 north</strong> over the
        Abernethy Bridge and follow OR-224 toward Milwaukie, then onto SE King
        Road. Yes, you cross the river either way &mdash; but it&rsquo;s a quick,
        familiar trip, and there&rsquo;s <strong>free parking</strong> waiting at
        the store.
      </p>

      <p>
        That short crossing is what makes To Be Read practical for West Linn
        readers: rather than a thin shelf at a chain store or full retail prices
        online, you get a genuine used bookstore close to home. Plenty of West
        Linn folks pair the visit with a trip into Milwaukie for shops, coffee,
        or a meal, so the books are an easy add-on rather than a special errand.
      </p>

      <h2>What&rsquo;s on the shelves</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> &mdash; fiction, classics, mystery, sci-fi and fantasy, romance, kids&rsquo; books, history, and nonfiction &mdash; all at used-book prices.</li>
        <li><strong>Trade-in store credit</strong> for the books you&rsquo;ve finished, so the ones you bring in help pay for the ones you take home.</li>
        <li><strong>Staff who read</strong> and love handing a good book to the right person.</li>
      </ul>

      <h2>Make the trip count</h2>
      <p>
        Bring a box to trade &mdash;{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how trade-in credit works</Link>{" "}
        &mdash; and check our <Link href="/visit">hours and directions</Link>{" "}
        before you set out. New to us? See why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the area make the drive</Link>,
        browse the <Link href="/shop">shop</Link>, or queue up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link>. Coming from a neighboring
        town? We&rsquo;ve mapped the route from{" "}
        <Link href="/reading-room/used-books-near-oregon-city-oregon">Oregon City</Link>{" "}
        and{" "}
        <Link href="/reading-room/used-books-near-lake-oswego-oregon">Lake Oswego</Link>{" "}
        too.
      </p>
    </>
  );
}
