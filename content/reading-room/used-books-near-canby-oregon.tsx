import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-canby-oregon",
  title: "Used books near Canby, Oregon: visit To Be Read in Milwaukie",
  description:
    "Live in Canby? To Be Read is the nearest used bookstore worth the drive, a straight run up 99E to Milwaukie. Thousands of used titles and trade-in credit.",
  excerpt:
    "Canby readers: the nearest deep, browseable used bookstore worth the drive is a straight run up 99E to Milwaukie. Here's the route and what's waiting at To Be Read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Canby keeps a small-town pace that readers love, but a deep, browseable
        used bookstore &mdash; shelves of secondhand titles to lose yourself in
        &mdash; isn&rsquo;t something every nearby town has. When the urge hits to
        dig through stacks, compare a few editions, and leave with more books than
        you planned, it&rsquo;s worth pointing the car up the highway. The nearest
        one truly worth the drive is a straight run north, in Milwaukie.
      </p>

      <h2>To Be Read &mdash; up 99E to Milwaukie</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served Clackamas County readers for 45+ years from{" "}
        <Link href="/visit">7931 SE King Rd, Ste 1 in Milwaukie</Link>. Just so
        it&rsquo;s clear: we&rsquo;re not in Canby &mdash; we&rsquo;re a real
        secondhand bookstore up the road in Milwaukie, and the drive is about as
        easy as it gets. From Canby, just follow 99E north through Oregon City and
        Gladstone, and you&rsquo;ll roll into Milwaukie before long. It&rsquo;s a
        familiar, mostly straight shot, and free parking is waiting when you
        arrive.
      </p>

      <h2>Worth the drive north</h2>
      <p>
        The reason to make the run is simple: the kind of shelf you can browse for
        an hour, at prices that let you say yes to one more. Here&rsquo;s what you
        get:
      </p>
      <ul>
        <li><strong>Thousands of used titles</strong> &mdash; fiction, classics, romantasy, mystery, sci-fi, kids&rsquo;, and nonfiction &mdash; all at used-book prices, so a full bag stays affordable.</li>
        <li><strong>Trade-in store credit</strong> for the books you&rsquo;ve finished, so the shelves keep turning over and your next haul costs less.</li>
        <li><strong>Genuine recommendations</strong> from staff who read widely and love matching a reader to the right book.</li>
        <li><strong>Free parking</strong>, so the trip ends with browsing, not circling the block.</li>
      </ul>

      <p>
        It helps to know what kind of stop this is. To Be Read isn&rsquo;t a
        grab-and-go shop; it&rsquo;s a browsing store, the sort of place where a
        quick visit quietly stretches into an hour because one good spine leads
        to the next. If shopping near Canby usually means new releases at full
        price, this is the trip that fills in the secondhand depth &mdash; older
        editions, out-of-print finds, and whole sections worth wandering.
      </p>

      <h2>Make the drive count</h2>
      <p>
        A run up 99E deserves a proper browse, so bring a box to trade and plan to
        stay a while rather than dashing in and out. Clear a shelf at home first;
        here&rsquo;s{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        so you arrive ready to swap your finished books for credit. Readers make
        the same kind of trip from across the area too &mdash; including{" "}
        <Link href="/reading-room/used-books-near-gresham-oregon">Gresham</Link> and{" "}
        <Link href="/reading-room/used-books-near-tigard-oregon">Tigard</Link>.
      </p>

      <p>
        Check our <Link href="/visit">hours and directions</Link> before you set
        out, see why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the metro make the drive</Link>,
        then browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link> so your stack is ready when you
        arrive.
      </p>
    </>
  );
}
