import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "gifts-for-romantasy-fans",
  title: "Gifts for romantasy fans: what to get the Fourth Wing obsessed",
  description:
    "Shopping for a romantasy lover? A gift guide for the Fourth Wing and ACOTAR crowd — the right books to give, series to start, and a no-risk option that never misses.",
  excerpt:
    "They've got opinions about dragons and a lot of tabbed pages. Here's how to shop for the romantasy fan in your life — the books to give and the safe bet that never misses.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Gift guide", "Recommendations", "Romantasy"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Romantasy fans are some of the easiest readers to shop for — they devour
        books and always want the next one. The trick is knowing what they&rsquo;ve
        already read. Here&rsquo;s how to land the gift.
      </p>

      <h2>If they&rsquo;re new to the genre</h2>
      <p>
        Start them on a modern cornerstone: <em>Fourth Wing</em> (Rebecca Yarros)
        or <em>A Court of Thorns and Roses</em> (Sarah J. Maas). Both are
        gateway drugs — give book one and they&rsquo;ll buy the rest themselves.
      </p>

      <h2>If they&rsquo;re already deep in</h2>
      <p>
        Branch them sideways. Pull from our{" "}
        <Link href="/reading-room/best-romantasy-books">best romantasy guide</Link>{" "}
        or our{" "}
        <Link href="/reading-room/fae-romantasy-books">fae romantasy</Link> and{" "}
        <Link href="/reading-room/romantasy-books-with-dragons">dragon romantasy</Link>{" "}
        lists for titles beyond the obvious bestsellers.
      </p>

      <h2>Match their heat preference</h2>
      <p>
        Know your reader. For the high-spice crowd, see our{" "}
        <Link href="/reading-room/spicy-romantasy-books">spicy romantasy picks</Link>;
        for a younger reader or a lower-heat gift, our{" "}
        <Link href="/reading-room/clean-romantasy-low-spice">clean, low-spice list</Link>{" "}
        keeps it safe.
      </p>

      <h2>Give a whole series</h2>
      <p>
        Used copies make it affordable to gift a <em>complete</em> set — the first
        three of a series, bundled, is a gift that lasts a month of evenings. See{" "}
        <Link href="/reading-room/romantasy-series-worth-committing-to">series worth committing to</Link>.
      </p>

      <h2>The no-risk option</h2>
      <p>
        Not sure what they&rsquo;ve read? <strong>Store credit</strong> lets them
        hunt their own shelves — the safest bet for a fast reader who owns half
        the genre already.
      </p>

      <h2>Shop the shelves</h2>
      <p>
        Come <Link href="/visit">browse with us</Link> and we&rsquo;ll build a
        romantasy stack to budget, or let the{" "}
        <Link href="/#next-read">Matchmaker</Link> suggest a title they
        haven&rsquo;t devoured yet.
      </p>
    </>
  );
}
