import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import { TRADE_POLICY_ROLLOVER, TRADE_POLICY_WAIT } from "@/lib/tradePolicy";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "where-to-trade-used-books-portland",
  title: "What to do with used books in the Portland area (besides recycle them)",
  description:
    "Cleaning out your shelves around Milwaukie, Clackamas, or SE Portland? Here are good options for used books — trade for credit, donate, or rehome them.",
  excerpt:
    "Boxes of books you've finished and a shelf that's overflowing? Here's a practical rundown of what to do with used books in the Portland area — trade, donate, or rehome.",
  date: "2026-06-16",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Trade-in", "Portland", "Local guide"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Around Milwaukie, Clackamas, and Southeast Portland, readable used books can be traded for store credit at To Be Read — 25% of a book&rsquo;s original list price, credit only, not cash — or donated to libraries, schools, shelters, and Little Free Libraries.
      </QuickAnswer>
      <p>
        Every reader hits the same wall eventually: the shelves are full, there&rsquo;s
        a stack on the nightstand and another on the floor, and recycling a box
        of perfectly good books feels wrong. If you&rsquo;re around Milwaukie,
        Clackamas, or Southeast Portland, here are better options.
      </p>

      <h2>Trade them for store credit</h2>
      <p>
        This is the one we know best, because it&rsquo;s what we do. Bring
        readable books to the counter and earn 25% of each accepted book&rsquo;s
        original list price in store credit toward anything in the shop. It keeps
        books circulating in
        the neighborhood and keeps your next read cheap. A couple of things worth
        knowing before you load the car: {TRADE_POLICY_WAIT} {TRADE_POLICY_ROLLOVER}{" "}
        Full details live on the{" "}
        <Link href="/trade">trade page</Link>, and a plain-English walkthrough of
        how credit is earned and spent is in our{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">
          trade-in guide
        </Link>
        . If you&rsquo;re weighing whether to take that value as credit or ask for
        cash, we compare the two in{" "}
        <Link href="/reading-room/cash-for-books-vs-store-credit">
          cash for books vs. store credit
        </Link>
        .
      </p>
      <blockquote>
        One quick note: we trade for store credit — we don&rsquo;t buy books for
        cash.
      </blockquote>
      <p>
        To make the counter visit quick, bring books clean and readable, and leave
        out the categories most shops pass on &mdash; textbooks, encyclopedias,
        magazines, and anything water- or smoke-damaged. Recent, in-print fiction
        and popular nonfiction are the easiest yes. Not sure a shop trades at all?
        Our rundown on{" "}
        <Link href="/reading-room/do-bookstores-buy-used-books">
          whether bookstores buy used books
        </Link>{" "}
        covers what to expect before you go.
      </p>

      <h2>Donate them</h2>
      <p>
        Local libraries often run &ldquo;Friends of the Library&rsquo;&rdquo; book
        sales and accept gently used donations to raise funds. Schools,
        senior centers, shelters, and little free libraries around the metro are
        usually glad to take books in good condition too. Call ahead — most have
        guidelines about what they can use. For a county-specific list of drop-off
        spots, see{" "}
        <Link href="/reading-room/where-to-sell-or-donate-books-clackamas-county">
          where to sell or donate books in Clackamas County
        </Link>
        .
      </p>

      <h2>Rehome the special ones</h2>
      <p>
        For books with sentimental or collectible value, a thoughtful handoff
        beats a donation bin: pass them to a friend, gift a favorite to someone
        you think would love it, or list rarer titles online.
      </p>

      <h2>What not to do</h2>
      <p>
        Please don&rsquo;t leave books out in the rain in a &ldquo;free&rdquo;
        box, and don&rsquo;t recycle anything still readable. Water- or
        smoke-damaged, moldy, or badly marked books really are recycling
        material — but a clean, readable book almost always has a next owner.
      </p>

      <p>
        If trading sounds like your move, here&rsquo;s{" "}
        <Link href="/visit">how to find us</Link> — 7931 SE King Rd, Unit 1, Milwaukie,
        open Monday through Saturday, 10am&ndash;5pm. Coming from the Clackamas
        Town Center area? See our{" "}
        <Link href="/reading-room/bookstore-near-clackamas-town-center">
          guide to the bookstore nearest you
        </Link>
        . And for more on why locals rate us among the{" "}
        <Link href="/reading-room/best-used-bookstore-portland-area">
          best used bookstores in the Portland area
        </Link>
        , we cover that too.
      </p>
    </>
  );
}
