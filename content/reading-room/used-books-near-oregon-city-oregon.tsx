import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-oregon-city-oregon",
  title: "Used Books Near Oregon City, Oregon: To Be Read in Milwaukie",
  description:
    "Oregon City readers: your nearest used bookstore is a short drive up 99E to Milwaukie. To Be Read has thousands of used titles, trade credit, and free parking.",
  excerpt:
    "Live in Oregon City? Your closest used bookstore is a quick drive up 99E in Milwaukie. Here's what To Be Read keeps on the shelves — and how to get there.",
  date: "2026-06-21",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The nearest used bookstore to Oregon City is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — about a 15-minute drive up OR-99E through Gladstone and Oak Grove, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Oregon City has deep roots and plenty of readers, but it&rsquo;s short on
        a proper used bookstore &mdash; the kind where you can lose an afternoon
        among the stacks. The good news for End-of-the-Oregon-Trail folks: the
        nearest one is a genuinely short drive north in Milwaukie, and it&rsquo;s
        worth the trip.
      </p>

      <h2>To Be Read &mdash; the closest real used bookstore</h2>
      <p>
        <strong>To Be Read</strong> has served the area for more than 45 years
        from <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. It
        is not in Oregon City &mdash; it&rsquo;s a quick hop up the road in
        Milwaukie &mdash; but for Oregon City readers it&rsquo;s the closest
        bricks-and-mortar shop stacked floor to ceiling with used books.
      </p>

      <h2>Honest directions from Oregon City</h2>
      <p>
        Figure on roughly 15 minutes in normal traffic. The simplest route is
        straight up <strong>OR-99E (McLoughlin Blvd)</strong> through Gladstone
        and Oak Grove into Milwaukie, then a turn onto SE King Road. If 99E is
        backed up, hop on <strong>I-205 north</strong> to OR-224 and cut over to
        King Road. Either way it&rsquo;s a short, flat drive with no bridges to
        fuss over, and there&rsquo;s <strong>free parking</strong> at the store.
        You&rsquo;ll pass right by the{" "}
        <Link href="/reading-room/used-books-near-oak-grove-gladstone-oregon">Oak Grove and Gladstone stretch</Link>{" "}
        on the way, so if you&rsquo;ve got a friend up that way it&rsquo;s an easy
        detour to pick them up.
      </p>

      <p>
        That short distance is the whole point: instead of settling for a thin
        shelf at a big-box store or paying full price online, you get a real
        used bookstore within easy reach. Many Oregon City readers fold the visit
        into errands they&rsquo;re already running up McLoughlin, and plenty turn
        it into a proper outing &mdash; here&rsquo;s a{" "}
        <Link href="/reading-room/milwaukie-oregon-book-lovers-day-out">book lover&rsquo;s day out in Milwaukie</Link>{" "}
        to build the trip around.
      </p>

      <h2>What&rsquo;s on the shelves</h2>
      <p>
        Expect <strong>thousands of used titles</strong> &mdash; fiction,
        classics, mystery, sci-fi and fantasy, romance, kids&rsquo; books,
        history, and nonfiction &mdash; all at used-book prices. There&rsquo;s{" "}
        <strong>trade-in store credit</strong> for the books you&rsquo;re finished
        with, so a carload from your shelves can fund the next stack, and staff
        who actually read and are glad to steer you toward your next favorite.
        Not sure a secondhand shop is worth the drive? Here&rsquo;s the case for{" "}
        <Link href="/reading-room/are-used-bookstores-worth-it">why used bookstores are worth it</Link>.
      </p>

      <h2>Make the drive count</h2>
      <p>
        Box up the books you&rsquo;re done with before you head out &mdash;
        here&rsquo;s{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        &mdash; and see our <Link href="/trade">sell &amp; trade page</Link> for
        what we take. Check our{" "}
        <Link href="/visit">hours and directions</Link> first, then browse the{" "}
        <Link href="/shop">shop</Link> or line up titles with the{" "}
        <Link href="/#next-read">Matchmaker</Link>. Coming from nearby? We&rsquo;ve
        also mapped the drive from{" "}
        <Link href="/reading-room/used-books-near-west-linn-oregon">West Linn</Link>{" "}
        and{" "}
        <Link href="/reading-room/used-books-near-sellwood-moreland-portland">Sellwood-Moreland</Link>.
      </p>
    </>
  );
}
