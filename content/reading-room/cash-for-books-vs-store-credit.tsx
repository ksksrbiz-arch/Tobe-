import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "cash-for-books-vs-store-credit",
  title: "Cash for Books vs. Store Credit: Which One Pays You More?",
  description:
    "Selling used books for cash or store credit? Here's how trade-in credit usually stretches further at a used bookstore, and the few times cash makes more sense.",
  excerpt:
    "Cash or store credit for your old books? Here's why trade-in credit usually goes further at a used bookstore — and when taking cash is the smarter call.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Trade", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        When you bring a box of books to a used bookstore, you&rsquo;ll usually
        face a choice: take cash, or take store credit. They are not worth the
        same amount, and the &ldquo;better&rdquo; option depends entirely on what
        you plan to do next. Here&rsquo;s how to decide.
      </p>

      <h2>Why store credit almost always pays more</h2>
      <p>
        Most used bookstores, including To Be Read, offer store credit at a
        noticeably higher rate than cash. The reason is simple: credit keeps your
        value inside the shop, so stores can afford to be more generous with it.
        A pile of books that earns a modest cash offer will typically convert to a
        meaningfully larger credit balance.
      </p>
      <p>
        If you read regularly, that math is hard to beat. You were going to buy
        your next stack of books anyway, so turning old books into credit toward
        new ones is essentially a discount on a habit you already have. Trade a
        box, walk the shelves, and your next read is partly or fully covered.
      </p>
      <p>
        Credit also compounds in a way cash never does. Each visit, the books you
        finish can fund the books you start next, so a single trade can quietly
        cover months of reading. For a steady reader, a store-credit balance
        behaves less like a coupon and more like an account you keep topping up
        with books you&rsquo;re already done with.
      </p>

      <h2>When cash actually makes sense</h2>
      <p>
        Credit is only valuable if you&rsquo;ll come back to spend it. Cash is the
        better call when:
      </p>
      <ul>
        <li>You&rsquo;re moving away and won&rsquo;t shop locally again.</li>
        <li>You&rsquo;re clearing an entire collection and don&rsquo;t want more books in the house.</li>
        <li>You specifically need the money rather than reading material.</li>
      </ul>
      <p>
        In those cases, a smaller cash payout beats a credit slip you&rsquo;ll
        never use. Be honest with yourself about whether you&rsquo;re a returning
        reader or a one-time declutterer.
      </p>
      <p>
        You don&rsquo;t have to choose all-or-nothing, either. Some sellers take
        credit for the titles they&rsquo;d happily swap for new reads and cash for
        the rest, especially when they&rsquo;re downsizing a large collection. Ask
        what the store allows; a mix is often the most practical answer when your
        box is big and your shelf space is small.
      </p>

      <h2>How to get the most either way</h2>
      <p>
        Condition and demand drive every offer, cash or credit. Clean, popular,
        in-print titles earn the most; worn or outdated ones earn little or get
        passed back. For a full walkthrough, see{" "}
        <Link href="/reading-room/how-to-sell-your-used-books">how to sell your used books</Link>{" "}
        and{" "}
        <Link href="/reading-room/what-books-can-you-sell-to-a-used-bookstore">which books a used bookstore actually wants</Link>.
      </p>

      <h2>Trade with us</h2>
      <p>
        At To Be Read in Milwaukie, we lean into generous store credit because we
        want you back on the shelves. See how our{" "}
        <Link href="/trade">trade-in works</Link>,{" "}
        <Link href="/visit">bring a box by the shop</Link>, and then put your
        credit toward your <Link href="/#next-read">next read</Link>. Still
        deciding what to do with the rest of the shelf? See our guide to{" "}
        <Link href="/reading-room/decluttering-books-what-to-do-with-them">decluttering your books</Link>.
      </p>
    </>
  );
}
