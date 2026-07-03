import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-sellwood-moreland-portland",
  title: "Used Books Near Sellwood-Moreland, SE Portland | To Be Read",
  description:
    "Sellwood-Moreland readers: To Be Read is a short drive south on McLoughlin in Milwaukie. Thousands of used titles, trade-in credit, and free parking await.",
  excerpt:
    "From Sellwood-Moreland, a quick run south on McLoughlin reaches To Be Read in Milwaukie. Here's what's on the shelves and how to get there.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The nearest full-size used bookstore to Sellwood-Moreland is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — about a 10-minute drive south on McLoughlin Blvd or River Road, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        Sellwood-Moreland is one of Portland&rsquo;s most bookish
        neighborhoods &mdash; antique row, the bluff, the bridge. When you want a
        big used bookstore to wander, though, one of the nearest is just south
        over the line in Milwaukie, an easy run down McLoughlin or River Road.
      </p>

      <h2>To Be Read &mdash; a short drive south</h2>
      <p>
        <strong>To Be Read</strong> has served readers for more than 45 years
        from <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>.
        It&rsquo;s not in Sellwood-Moreland &mdash; it&rsquo;s a few minutes south
        in Milwaukie &mdash; but for SE Portland readers it&rsquo;s a close,
        easygoing trip to a shop packed with used books.
      </p>

      <h2>Honest directions from Sellwood-Moreland</h2>
      <p>
        Count on roughly 10 minutes. The most direct route is south on{" "}
        <strong>OR-99E (McLoughlin Blvd)</strong> straight into Milwaukie, then a
        turn onto SE King Road. If you&rsquo;d rather skip the highway, take{" "}
        <strong>SE River Road</strong> down through Oak Grove and cut over &mdash;
        a slower, prettier drive along the water. No bridges, no fuss, and{" "}
        <strong>free parking</strong> when you arrive.
      </p>

      <p>
        That short hop is exactly why To Be Read works for Sellwood-Moreland
        readers: you stay close to home and still get a full used bookstore to
        dig through, instead of full retail prices or a slim chain-store shelf.
        Plenty of SE Portland folks make it a regular loop &mdash; antique row,
        a coffee, then south to Milwaukie for a stack of books.
      </p>

      <h2>What&rsquo;s on the shelves</h2>
      <ul>
        <li><strong>Thousands of used titles</strong> &mdash; fiction, classics, mystery, sci-fi and fantasy, romance, kids&rsquo; books, history, and nonfiction &mdash; all at used-book prices.</li>
        <li><strong>Trade-in store credit</strong> for the books you&rsquo;re done with, so a tote from your shelves can fund the next haul.</li>
        <li><strong>Staff who read</strong> and are happy to point you to your next favorite.</li>
      </ul>

      <h2>Make the trip count</h2>
      <p>
        Box up the books you&rsquo;ve finished first &mdash;{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s how trade-in credit works</Link>{" "}
        &mdash; and check our <Link href="/visit">hours and directions</Link>{" "}
        before heading down. Curious why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the area make the drive</Link>?
        Browse the <Link href="/shop">shop</Link> or line up titles with the{" "}
        <Link href="/#next-read">Matchmaker</Link>. Nearby and curious about the
        drive from elsewhere? We&rsquo;ve mapped{" "}
        <Link href="/reading-room/used-books-near-oregon-city-oregon">Oregon City</Link>{" "}
        and{" "}
        <Link href="/reading-room/used-books-near-west-linn-oregon">West Linn</Link>{" "}
        too.
      </p>
    </>
  );
}
