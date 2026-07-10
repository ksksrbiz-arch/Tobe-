import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import {
  TRADE_POLICY_PER_PERSON,
  TRADE_POLICY_PRICING,
  TRADE_POLICY_REDEMPTION,
  TRADE_POLICY_REDEMPTION_EXAMPLE,
  TRADE_POLICY_ROLLOVER,
  TRADE_POLICY_WAIT,
} from "@/lib/tradePolicy";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "how-book-trade-in-credit-works",
  title: "How book trade-in credit works at To Be Read",
  description:
    "A plain-English guide to trading used books for store credit at To Be Read in Milwaukie, OR — what we take, how credit is earned, and how it rolls over.",
  excerpt:
    "Bring books, earn store credit, take home your next read the same afternoon. Here's exactly how our trade-in works — what we accept, how credit adds up, and the rules worth knowing first.",
  date: "2026-06-19",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Trade-in", "Store credit", "How-to"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Bring in readable used books, we review them at the counter, and accepted books earn store credit to spend the same day toward your next stack — store credit only, not cash.
      </QuickAnswer>
      <p>
        One of the most common questions we hear at the counter is simply:{" "}
        <em>&ldquo;How does the trade-in thing actually work?&rdquo;</em> It&rsquo;s a fair
        question — most bookshops just sell books. At To Be Read, you can also
        bring the books you&rsquo;ve finished and turn them into credit toward your
        next stack. Here&rsquo;s the whole thing, start to finish.
      </p>

      <h2>The short version</h2>
      <p>
        Bring books in, we review them with you at the counter, and readable
        titles earn store credit you can spend the same day.{" "}
        <strong>You receive 25% of each accepted book&rsquo;s original list price
        in store credit.</strong> At the register, credit covers half of your
        total and cash or card covers the other half.
      </p>
      <blockquote>
        A quick heads-up before you load up the car: we trade for store credit —
        we do <strong>not</strong> buy books for cash.
      </blockquote>

      <h2>Step 1 — Bring your books in</h2>
      <p>{TRADE_POLICY_WAIT} So plan to browse a little while we look through your
        stack — most people use the time to start picking their next reads.</p>

      <h2>Step 2 — Earn store credit</h2>
      <p>
        Credit is straightforward: 25% of the book&rsquo;s original list price,
        for titles in readable, resale-ready shape. A few rules keep the system
        fair and the shelves healthy:
      </p>
      <ul>
        <li>{TRADE_POLICY_ROLLOVER}</li>
        <li>{TRADE_POLICY_PER_PERSON}</li>
      </ul>

      <h2>What we can and can&rsquo;t take</h2>
      <p>
        We love fiction (paperback or hardcover), most non-fiction in good
        shape, kids&rsquo; books and YA, cookbooks, poetry, and graphic novels.
        We can&rsquo;t take textbooks,
        encyclopedias, magazines, condensed editions, or anything water- or
        smoke-damaged, loose, unbound, or heavily marked.
      </p>

      <h2>Step 3 — Take home your next read</h2>
      <p>
        {TRADE_POLICY_PRICING} {TRADE_POLICY_REDEMPTION}{" "}
        {TRADE_POLICY_REDEMPTION_EXAMPLE} Spend your credit on whatever speaks
        to you and walk out with a fresh stack the same afternoon. That&rsquo;s
        the whole loop — and it&rsquo;s how a lot of our regulars keep their
        shelves moving without their book budget ever leaving the neighborhood.
      </p>

      <h2>Why credit instead of cash?</h2>
      <p>
        We&rsquo;re a small shop, and store credit is what lets us keep taking
        books in volume: the value stays on the shelves instead of leaving the
        register, so we can be generous with what we accept. For a steady reader
        that&rsquo;s the better deal anyway, since you were going to buy your next
        stack regardless. If you&rsquo;re downsizing for good and want money in
        hand instead, that&rsquo;s a real trade-off worth weighing &mdash; we lay
        it out in{" "}
        <Link href="/reading-room/cash-for-books-vs-store-credit">
          cash for books vs. store credit
        </Link>
        . And if you&rsquo;re just wondering whether shops take used books at all,
        start with{" "}
        <Link href="/reading-room/do-bookstores-buy-used-books">
          do bookstores buy used books
        </Link>
        .
      </p>

      <p>
        Want the step-by-step with photos and the full FAQ?{" "}
        <Link href="/how-it-works">See exactly how it works</Link>,{" "}
        <Link href="/trade">start a trade</Link>, or{" "}
        <Link href="/visit">plan your visit</Link> — we&rsquo;re at 7931 SE King
        Rd in Milwaukie, open Monday through Saturday, 10am&ndash;5pm. For tips
        on getting the most out of the books you bring in, see{" "}
        <Link href="/reading-room/how-to-sell-your-used-books">
          how to sell your used books (and get the most for them)
        </Link>
        , or, if you&rsquo;re weighing other options first,{" "}
        <Link href="/reading-room/where-to-trade-used-books-portland">
          where else to trade used books around Portland
        </Link>
        .
      </p>
    </>
  );
}
