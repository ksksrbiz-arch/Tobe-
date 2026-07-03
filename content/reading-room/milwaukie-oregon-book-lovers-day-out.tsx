import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "milwaukie-oregon-book-lovers-day-out",
  title: "A book lover's day out in Milwaukie, Oregon",
  description:
    "How to spend a reader's day in Milwaukie, OR — browse used books at To Be Read, walk the Trolley Trail and riverfront, hit the Sunday farmers market, and more.",
  excerpt:
    "Just south of Portland, Milwaukie is a quietly perfect spot for a slow reader's day: used books, a riverside walk, a Sunday market, and an easy MAX ride home.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Portland", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Start a book lover&rsquo;s day in Milwaukie at To Be Read, 7931 SE King
        Rd, Unit 1 — the neighborhood&rsquo;s used bookstore for over 45 years —
        then walk off your new stack along the river at Milwaukie Bay Park and
        the Trolley Trail.
      </QuickAnswer>
      <p>
        Milwaukie sits right on the Willamette just south of Portland — close
        enough for an easy trip, calm enough to feel like a real escape. If your
        idea of a good day involves a stack of used books and not much of a
        schedule, here&rsquo;s how to spend it.
      </p>

      <h2>Start with the shelves</h2>
      <p>
        Begin at <strong>To Be Read</strong> (the longtime Clackamas Book
        Exchange) at{" "}
        <Link href="/visit">7931 SE King Rd, Unit 1</Link>. We&rsquo;ve been the
        neighborhood&rsquo;s used bookstore for over 45 years — thousands of
        titles across fiction, classics, romantasy, mystery, kids&rsquo; books
        and more. Bring a box of books you&rsquo;re done with and{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">trade them for store credit</Link>{" "}
        while you browse.
      </p>

      <h2>Walk it off by the river</h2>
      <p>
        A few minutes away, <strong>Milwaukie Bay Park</strong> and the{" "}
        <strong>Trolley Trail</strong> give you an easy, flat walk along the
        water — a perfect place to crack open whatever you just found. The trail
        runs for miles if you&rsquo;re feeling ambitious.
      </p>

      <h2>Time it with the Sunday market</h2>
      <p>
        If you come on a Sunday in season, the <strong>Milwaukie Farmers
        Market</strong> fills the downtown blocks with produce, flowers, and food
        — an easy pairing with a morning of book browsing.
      </p>

      <h2>Getting here (no car needed)</h2>
      <p>
        The <strong>MAX Orange Line</strong> connects downtown Portland to
        downtown Milwaukie, so you can make the whole trip car-free. Driving?
        There&rsquo;s free parking at the shop.
      </p>

      <h2>Plan your visit</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link>, see{" "}
        <Link href="/reading-room/used-bookstore-milwaukie-southeast-portland">why readers cross the river to shop here</Link>,
        or let the <Link href="/#next-read">Matchmaker</Link> line up your next
        read before you come.
      </p>
    </>
  );
}
