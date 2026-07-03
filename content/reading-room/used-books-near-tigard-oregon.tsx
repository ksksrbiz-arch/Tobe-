import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-tigard-oregon",
  title: "Used books near Tigard, Oregon: visit To Be Read in Milwaukie",
  description:
    "Live in Tigard? To Be Read is the nearest used bookstore worth the hop, a short trip across via 217 and 99E to Milwaukie. Thousands of used titles to browse.",
  excerpt:
    "Tigard readers: the nearest deep used bookstore worth the trip is a short hop across the metro in Milwaukie. Here's the route and what's waiting at To Be Read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The nearest deep used bookstore worth the trip from Tigard is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — a short cross-town hop via Highway 217 and 99E, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Tigard sits in a busy, well-served corner of the metro, but a genuinely
        deep used bookstore &mdash; rows of secondhand titles you can browse for
        an hour &mdash; is rarer than you&rsquo;d think. Plenty of places will
        sell you this week&rsquo;s bestseller at full price; far fewer let you
        wander, dig, and turn up a forgotten favorite or a cheap copy of the
        classic you keep meaning to read. The nearest one worth the trip is a
        short hop east, in Milwaukie.
      </p>

      <h2>To Be Read &mdash; a short hop across the metro</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served readers for 45+ years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. To set
        expectations: we&rsquo;re not in Tigard &mdash; we&rsquo;re an
        honest-to-goodness secondhand bookstore in Milwaukie, and easy to reach.
        From Tigard the natural route is Highway 217 down to 99W, then over toward
        Milwaukie; many drivers find it simplest to cut across on 99E once
        they&rsquo;re past the river. It&rsquo;s a short cross-town trip rather
        than a haul, and there&rsquo;s free parking when you land.
      </p>

      <h2>Why make the hop</h2>
      <p>
        The point of crossing town is the kind of shelf you can&rsquo;t get from
        an app. Here&rsquo;s what&rsquo;s waiting:
      </p>
      <ul>
        <li><strong>Thousands of used titles</strong> &mdash; fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction &mdash; all at used-book prices, so you can fill a bag without flinching.</li>
        <li><strong>Trade-in store credit</strong> for the books you&rsquo;ve finished, so your shelves keep moving and your next stack costs less.</li>
        <li><strong>Genuine recommendations</strong> from staff who actually read and love a good match.</li>
        <li><strong>Free parking</strong>, so the only browsing you do is for books.</li>
      </ul>

      <p>
        It helps to picture the visit before you go. To Be Read isn&rsquo;t a
        grab-and-go shop; it&rsquo;s a browsing store, the kind of place where a
        quick stop turns into an hour because one interesting spine leads
        straight to the next. If the bookstores near you in Tigard lean toward
        new releases and not much else, this is the trip that fills in the
        secondhand depth &mdash; older editions, out-of-print finds, long-running
        series, and whole sections worth getting lost in for an afternoon.
      </p>

      <h2>Plan the trip</h2>
      <p>
        Since you&rsquo;re crossing the metro, make the visit count: bring a box
        to trade and give yourself time to wander the shelves rather than rushing
        a single aisle. Here&rsquo;s{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        so you arrive ready to swap your finished books for store credit. And
        you&rsquo;re far from the only one making the trip &mdash; readers come
        our way from{" "}
        <Link href="/reading-room/used-books-near-gresham-oregon">Gresham</Link> and{" "}
        <Link href="/reading-room/used-books-near-canby-oregon">Canby</Link> as well.
      </p>

      <p>
        Check our <Link href="/visit">hours and directions</Link> first, see why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the metro make the drive</Link>,
        then browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link> before you head over.
      </p>
    </>
  );
}
