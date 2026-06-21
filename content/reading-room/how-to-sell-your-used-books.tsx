import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "how-to-sell-your-used-books",
  title: "How to sell your used books (and get the most for them)",
  description:
    "A practical guide to selling used books — trade-in vs. cash, what stores look for, how to sort and prep your books, and how to get the best store credit.",
  excerpt:
    "Got boxes of books to clear out? Here's how selling and trading used books actually works — what stores want, how to prep them, and how to get the most value.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Trade-in", "Store credit", "How-to"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <p>
        If you&rsquo;ve got boxes of books you&rsquo;re ready to part with, you
        have more options than the recycling bin. Here&rsquo;s how selling and
        trading used books actually works — and how to walk away with the most
        value.
      </p>

      <h2>Trade-in credit vs. cash</h2>
      <p>
        Most used bookstores offer <strong>store credit</strong> at a higher rate
        than cash, because credit keeps you shopping with them. If you&rsquo;re a
        regular reader, credit is almost always the better deal — at To Be Read,
        it stretches much further than a cash offer would. If you simply need to
        clear space and never plan to return, cash (where offered) makes sense.
      </p>

      <h2>What stores look for</h2>
      <ul>
        <li><strong>Condition.</strong> Clean, unmarked copies with intact spines and covers. No water damage, mold, or heavy highlighting.</li>
        <li><strong>Demand.</strong> Recent bestsellers, popular series, classics, and evergreen nonfiction move fastest.</li>
        <li><strong>Format.</strong> Trade paperbacks and hardcovers in good shape are easiest to resell; old textbooks and ex-library copies are a harder sell.</li>
      </ul>

      <h2>Prep your books before you go</h2>
      <ol>
        <li><strong>Sort.</strong> Pull out anything damaged, musty, or written-in — those usually won&rsquo;t qualify.</li>
        <li><strong>Wipe covers.</strong> A quick dusting makes a real difference on hardcovers.</li>
        <li><strong>Box them flat.</strong> Spines down or flat, not jammed in — it speeds up the staff&rsquo;s review.</li>
        <li><strong>Leave the sets together.</strong> Complete series and matching editions are more appealing as a group.</li>
      </ol>

      <h2>Set expectations</h2>
      <p>
        No store can take everything — overstocked titles and worn copies get
        passed back, and that&rsquo;s normal. Bring a mix, don&rsquo;t take a
        &ldquo;no&rdquo; personally, and have a plan (donation box) for whatever
        comes home with you.
      </p>

      <h2>Trade with us</h2>
      <p>
        See exactly{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how our trade-in credit works</Link>,
        compare{" "}
        <Link href="/reading-room/where-to-trade-used-books-portland">where to trade used books around Portland</Link>,
        or just <Link href="/visit">bring a box by the shop</Link>. Then put your
        credit to work with the <Link href="/#next-read">Matchmaker</Link>.
      </p>
    </>
  );
}
