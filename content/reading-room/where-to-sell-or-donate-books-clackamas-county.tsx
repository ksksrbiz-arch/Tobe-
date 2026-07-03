import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "where-to-sell-or-donate-books-clackamas-county",
  title: "Where to sell or donate used books in Clackamas County",
  description:
    "Clearing your shelves in Clackamas County? Your options for selling, trading, or donating used books — and how trade-in credit at To Be Read in Milwaukie works.",
  excerpt:
    "Got boxes of books to clear out in Clackamas County? Here's how to sell, trade, or donate them responsibly — and turn the good ones into credit toward your next read.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Trade", "Milwaukie", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        In Clackamas County, the best options are trading good-condition books for store credit at To Be Read in Milwaukie, selling them outright through online marketplaces or buyback sites for cash, or donating the rest to local libraries, thrift stores, or Little Free Libraries.
      </QuickAnswer>
      <p>
        A move, a downsize, or just an overflowing shelf — eventually every
        reader in Clackamas County faces a stack of books that needs a new home.
        Here&rsquo;s how to clear them out without sending good books to the
        landfill.
      </p>

      <h2>Trade them for credit (our favorite)</h2>
      <p>
        If the books are in good shape, trading beats selling outright: you turn
        old reads into <strong>store credit</strong> toward new ones.{" "}
        <strong>To Be Read</strong> in Milwaukie takes trades in person —{" "}
        <Link href="/reading-room/how-book-trade-in-credit-works">here&rsquo;s exactly how our trade-in credit works</Link>,
        and what we tend to look for.
      </p>

      <h2>Sell them outright</h2>
      <p>
        Want cash instead of credit? Online marketplaces and buyback sites are an
        option, though payouts on common titles are modest. Our guide to{" "}
        <Link href="/reading-room/how-to-sell-your-used-books">selling your used books</Link>{" "}
        walks through what&rsquo;s worth the effort and what isn&rsquo;t.
      </p>

      <h2>Donate the rest</h2>
      <p>
        Books that don&rsquo;t sell or trade still have value. Local libraries
        (and their Friends-of-the-Library book sales), thrift stores, and
        Little Free Libraries around Clackamas County all welcome gently used
        books. It keeps them in circulation and out of the recycling bin.
      </p>

      <h2>A quick sorting tip</h2>
      <p>
        Before you haul everything out, make three piles: <em>trade-worthy</em>{" "}
        (clean, popular, in-demand), <em>sellable</em> (collectible or
        in-demand nonfiction), and <em>donate</em> (everything else). It saves a
        lot of back-and-forth at the counter.
      </p>

      <h2>Bring the good ones to us</h2>
      <p>
        Check our <Link href="/visit">hours and directions</Link>, then bring
        your trade pile in. While we look it over, browse the{" "}
        <Link href="/shop">shelves</Link> — or see{" "}
        <Link href="/reading-room/where-to-trade-used-books-portland">where Portland-area readers trade their books</Link>.
      </p>
    </>
  );
}
