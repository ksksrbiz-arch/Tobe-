import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import {
  TRADE_POLICY_WAIT,
  TRADE_POLICY_ROLLOVER,
  TRADE_POLICY_CAP,
  TRADE_POLICY_NOV1,
} from "@/lib/tradePolicy";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "how-book-trade-in-credit-works",
  title: "How book trade-in credit works at To Be Read",
  description:
    "A plain-English guide to trading used books for store credit at To Be Read in Milwaukie, OR — what we take, how credit is earned, and the fine print on the $200 cap and how credit rolls over.",
  excerpt:
    "Bring books, earn store credit, take home your next read the same afternoon. Here's exactly how our trade-in works — what we accept, how credit adds up, and the rules worth knowing first.",
  date: "2026-06-19",
  author: "To Be Read",
  tags: ["Trade-in", "Store credit", "How-to"],
  readingMinutes: 4,
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
        <strong>One credit per paperback, two per hardcover.</strong> Mix credit
        and cash however you like.
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
        Credit is straightforward: one credit per paperback, two per hardcover,
        for titles in readable, resale-ready shape. A few rules keep the system
        fair and the shelves healthy:
      </p>
      <ul>
        <li>{TRADE_POLICY_ROLLOVER}</li>
        <li>{TRADE_POLICY_CAP}</li>
        <li>{TRADE_POLICY_NOV1}</li>
      </ul>

      <h2>What we can and can&rsquo;t take</h2>
      <p>
        We love fiction (paperback or hardcover), most non-fiction in good
        shape, kids&rsquo; books and YA, cookbooks, poetry, and graphic novels.
        Recent editions earn the best credit. We can&rsquo;t take textbooks,
        encyclopedias, magazines, condensed editions, or anything water- or
        smoke-damaged, loose, unbound, or heavily marked.
      </p>

      <h2>Step 3 — Take home your next read</h2>
      <p>
        Spend your credit on whatever speaks to you, top it up with cash if you
        like, and walk out with a fresh stack the same afternoon. That&rsquo;s the
        whole loop — and it&rsquo;s how a lot of our regulars keep their shelves
        moving without their book budget ever leaving the neighborhood.
      </p>

      <p>
        Want the step-by-step with photos and the full FAQ?{" "}
        <Link href="/how-it-works">See exactly how it works</Link>, or{" "}
        <Link href="/visit">plan your visit</Link> — we&rsquo;re at 7931 SE King
        Rd in Milwaukie, open Monday through Saturday, 10am&ndash;5pm.
      </p>
    </>
  );
}
