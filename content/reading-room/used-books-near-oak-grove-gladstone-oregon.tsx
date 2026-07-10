import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-books-near-oak-grove-gladstone-oregon",
  title: "Used books near Oak Grove & Gladstone, Oregon",
  description:
    "Live in Oak Grove, Gladstone, or Jennings Lodge? To Be Read is your closest used bookstore — minutes up SE King Rd in Milwaukie. Trade books, browse thousands.",
  excerpt:
    "If you're in Oak Grove, Gladstone, or Jennings Lodge, your nearest used bookstore is closer than you think — minutes north in Milwaukie. Here's what to know.",
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
        The nearest used bookstore to Oak Grove, Gladstone, and Jennings Lodge is To Be Read at 7931 SE King Rd, Unit 1 in Milwaukie — under 10 minutes up McLoughlin or River Road, with thousands of used titles, trade-in credit, and free parking.
      </QuickAnswer>
      <p>
        The communities along the Willamette just south of Milwaukie &mdash; Oak
        Grove, Gladstone, Jennings Lodge &mdash; don&rsquo;t all have a bookstore
        of their own. Good news: your nearest one is a short drive north, and it
        might be the closest thing on this list to a genuinely local shop
        &mdash; you&rsquo;re practically neighbors.
      </p>

      <h2>To Be Read &mdash; minutes away in Milwaukie</h2>
      <p>
        <strong>To Be Read</strong> (formerly the Clackamas Book Exchange) has
        served the area for over 45 years from{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1 in Milwaukie</Link>. From Oak
        Grove or Jennings Lodge it&rsquo;s a quick trip up OR-99E (McLoughlin
        Blvd) or the quieter, prettier SE River Road along the water; from
        Gladstone, a short hop across the river and up McLoughlin. Under 10
        minutes for most, and free parking when you arrive. It&rsquo;s an easy
        errand to fold into a McLoughlin run &mdash; and if you keep going north
        you&rsquo;re minutes from{" "}
        <Link href="/reading-room/used-books-near-sellwood-moreland-portland">Sellwood-Moreland</Link>.
      </p>

      <h2>What you&rsquo;ll find</h2>
      <p>
        Expect <strong>thousands of used titles</strong> &mdash; fiction,
        classics, romantasy, mystery, sci-fi and fantasy, kids&rsquo; books, and
        nonfiction &mdash; all at used-book prices. It&rsquo;s a browsing store,
        the kind where one interesting spine leads to the next and a quick stop
        becomes an unhurried hour, with staff who read and are happy to point you
        toward your next favorite. On a wet afternoon it&rsquo;s a fine place to
        while away an hour &mdash; here are a few more{" "}
        <Link href="/reading-room/rainy-day-things-to-do-milwaukie-oregon">rainy-day things to do in Milwaukie</Link>{" "}
        to round out the trip.
      </p>

      <h2>Bring a box to trade</h2>
      <p>
        Because you&rsquo;re so close, it&rsquo;s easy to make trading a habit.
        Bring the books you&rsquo;re done with and we&rsquo;ll look them over for{" "}
        <Link href="/trade">trade-in store credit</Link> while you browse, so your
        shelves (and wallet) stay balanced. New to it? Here&rsquo;s{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>.
      </p>

      <h2>Make the trip count</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link> first, then
        browse the <Link href="/shop">shop</Link> or line up picks with the{" "}
        <Link href="/#next-read">Matchmaker</Link>. New to us? See why{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">readers across the area make the drive</Link>,
        or if you&rsquo;re coming up 99E from farther south, we&rsquo;ve mapped
        the route from{" "}
        <Link href="/reading-room/used-books-near-oregon-city-oregon">Oregon City</Link>{" "}
        too.
      </p>
    </>
  );
}
