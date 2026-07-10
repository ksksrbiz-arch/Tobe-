import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "decluttering-books-what-to-do-with-them",
  title: "Decluttering Books: What to Do With the Ones You Clear Out",
  description:
    "A practical guide to decluttering your bookshelves: how to sort what you own, then trade, sell, donate, or recycle each book so nothing useful goes to waste.",
  excerpt:
    "Ready to clear your bookshelves? Here's how to sort your books and decide what to trade, sell, donate, or recycle — so nothing useful ends up in the bin.",
  date: "2026-06-21",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Trade", "Reading life"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Sort your books into four piles — keep, trade or sell, donate, or recycle — then trade or sell good-condition copies for store credit, donate readable books a store can&rsquo;t use, and recycle only the ones that are moldy, water-damaged, or falling apart.
      </QuickAnswer>
      <p>
        Overflowing shelves, stacks on the floor, boxes you never unpacked —
        every reader hits the point where the collection outgrows the space.
        Decluttering books doesn&rsquo;t mean tossing them. With a quick sort and
        a plan, almost every book can find a better home than the bin, and most
        of them can hold real value on the way out the door.
      </p>
      <p>
        The trick is to decide each book&rsquo;s destination once, then act on it.
        Most people stall because every book feels like a separate decision; a
        simple system turns hours of agonizing into an afternoon of steady
        progress. Here&rsquo;s the workflow we recommend.
      </p>

      <h2>Start by sorting</h2>
      <p>Make four piles as you go through the shelf:</p>
      <ul>
        <li><strong>Keep.</strong> Favorites, references, and anything you&rsquo;ll genuinely reread.</li>
        <li><strong>Trade or sell.</strong> Good-condition books you&rsquo;re done with.</li>
        <li><strong>Donate.</strong> Worn-but-readable copies and overstocked titles.</li>
        <li><strong>Recycle.</strong> Moldy, water-damaged, or falling-apart books beyond saving.</li>
      </ul>
      <p>
        Sorting first makes every later step faster, and it keeps you from
        second-guessing each book twice. A simple test for the &ldquo;keep&rdquo;
        pile: would you buy this book again today? If the answer is no, it
        probably belongs in one of the other three. Work one shelf at a time so
        the project feels finishable instead of overwhelming.
      </p>

      <h2>Trade or sell the good ones</h2>
      <p>
        Books in solid shape have real value. A used bookstore will give you cash
        or, better yet, store credit toward your{" "}
        <Link href="/#next-read">next read</Link>. Credit usually stretches
        further — see{" "}
        <Link href="/reading-room/cash-for-books-vs-store-credit">cash vs. store credit</Link>{" "}
        to choose, and{" "}
        <Link href="/reading-room/what-books-can-you-sell-to-a-used-bookstore">what books a used bookstore wants</Link>{" "}
        to know what will qualify.
      </p>
      <p>
        A little prep makes this pile go faster at the counter. Wipe down covers,
        pull out any bookmarks or receipts, and skip the categories most shops
        turn away anyway &mdash; textbooks, encyclopedias, condensed editions, and
        anything musty or water-stained. Recent, in-print fiction and popular
        nonfiction move best; a stack of clean, current paperbacks will almost
        always beat a box of yellowed hardcovers nobody&rsquo;s asking for. If
        you&rsquo;re not sure a given shop even takes trades, start with{" "}
        <Link href="/reading-room/do-bookstores-buy-used-books">do bookstores buy used books</Link>, and if you want the mechanics of how credit is earned and spent,{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">how trade-in credit works</Link>{" "}
        walks through it. Textbooks are their own case &mdash; see{" "}
        <Link href="/reading-room/sell-your-textbooks-portland">selling textbooks around Portland</Link>.
      </p>

      <h2>Donate what stores can&rsquo;t take</h2>
      <p>
        Readable books that don&rsquo;t fit a store&rsquo;s shelves still help
        plenty of people. Little Free Libraries, schools, shelters, and thrift
        stores all welcome gently used donations. For more local options, see{" "}
        <Link href="/reading-room/where-to-sell-or-donate-books-clackamas-county">where to sell or donate books in Clackamas County</Link>.
      </p>

      <h2>Recycle the rest</h2>
      <p>
        Only the truly unsalvageable books — moldy, soaked, or shedding pages —
        belong in recycling. Remove any plastic dust jackets first, since
        paperbacks and most hardcover pages are curbside recyclable in most areas.
      </p>

      <h2>Keep the habit, not the clutter</h2>
      <p>
        Decluttering works best as a rhythm rather than a one-time purge. Once
        your shelves have room to breathe, a quick seasonal pass keeps them that
        way: trade or donate the few books you finished and won&rsquo;t reread,
        and you&rsquo;ll never face a wall of boxes again. Pairing each trade with
        a new pick also keeps your collection fresh without growing it.
      </p>

      <h2>Ready to clear a box?</h2>
      <p>
        To Be Read in Milwaukie makes the trade-or-sell step easy. See how our{" "}
        <Link href="/trade">trade-in works</Link> and{" "}
        <Link href="/visit">bring a box by the shop</Link> — you&rsquo;ll leave
        with lighter shelves and credit toward something new.
      </p>
    </>
  );
}
