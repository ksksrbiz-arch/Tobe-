import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-gresham-oregon",
  title: "Used books near Gresham, Oregon: visit To Be Read in Milwaukie",
  description:
    "Live in Gresham? To Be Read is the nearest used bookstore worth the drive, west and south to Milwaukie. Trade books and browse thousands of used titles.",
  excerpt:
    "Gresham readers: the nearest deep, browseable used bookstore worth the drive sits west and south in Milwaukie. Here's the honest route and what's waiting at To Be Read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The nearest used bookstore to Gresham is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — west on Highway 26 then south on I-205 (or Foster Road), with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Gresham has a lot going for it, but a deep, browseable used bookstore
        &mdash; the kind where you lose an hour to the shelves and walk out with a
        stack &mdash; isn&rsquo;t exactly around the corner. Big-box stores carry
        this season&rsquo;s new releases at full price, and that&rsquo;s about it.
        If you&rsquo;re the sort of reader who likes to wander, compare editions,
        and stumble onto something you weren&rsquo;t looking for, it&rsquo;s worth
        driving a little for the real thing. The nearest one worth the trip sits
        west and a bit south, in Milwaukie.
      </p>

      <h2>To Be Read &mdash; west and south to Milwaukie</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served readers for 45+ years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. To be
        clear, we&rsquo;re not in Gresham &mdash; we&rsquo;re a genuine
        secondhand bookstore in Milwaukie, and well worth the drive. From most of
        Gresham the simplest route is to take Highway 26 (Powell) west, then drop
        south on I-205 toward Milwaukie; if you&rsquo;d rather skip the freeway,
        Foster Road angles you the same direction. Either way it&rsquo;s a
        manageable trip across the southeast side, and there&rsquo;s free parking
        waiting when you arrive &mdash; no circling the block, no meters.
      </p>

      <h2>Worth the drive from the east side</h2>
      <p>
        A used bookstore lives or dies by its shelves, and ours stay full and
        keep turning over. Here&rsquo;s what makes the trip pay off:
      </p>
      <ul>
        <li><strong>Thousands of used titles</strong> &mdash; fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction &mdash; all at used-book prices, so a full bag costs a fraction of new.</li>
        <li><strong>Trade-in store credit</strong> for the books you&rsquo;ve finished, so the shelves keep refreshing and your next haul costs even less.</li>
        <li><strong>Genuine recommendations</strong> from staff who read widely and love matching a reader to the right book.</li>
        <li><strong>Free parking</strong>, so the only thing you&rsquo;re hunting for is your next read.</li>
      </ul>

      <p>
        It also helps to know what kind of trip you&rsquo;re making. To Be Read
        isn&rsquo;t a quick-grab convenience shop; it&rsquo;s a browsing store,
        the sort of place where a thirty-minute stop quietly becomes an hour
        because one good spine leads to the next. If you&rsquo;ve been driving
        past chain shelves wishing for something with more depth and character,
        that&rsquo;s exactly the gap this trip fills.
      </p>

      <h2>Make the trip count</h2>
      <p>
        Coming all the way from Gresham, you&rsquo;ll want the visit to earn the
        miles &mdash; so bring a box to trade and plan to browse a while. Clear a
        shelf at home first; here&rsquo;s{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        so you arrive ready to swap and walk out with something new. While
        you&rsquo;re mapping the area, you&rsquo;re in good company: readers make
        the same kind of trip from{" "}
        <Link href="/reading-room/used-books-near-canby-oregon">Canby</Link> and{" "}
        <Link href="/reading-room/used-books-near-tigard-oregon">Tigard</Link> too.
      </p>

      <p>
        Check our <Link href="/visit">hours and directions</Link> before you set
        out, see why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the metro make the drive</Link>,
        then browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link> so your stack is ready the
        moment you walk in.
      </p>
    </>
  );
}
