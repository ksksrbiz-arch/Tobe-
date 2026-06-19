import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "used-bookstore-milwaukie-southeast-portland",
  title: "Finding a used bookstore near Milwaukie & Southeast Portland",
  description:
    "Looking for a used bookstore near Milwaukie or SE Portland, OR? Here's what to expect at To Be Read — hours, location, trade-in credit, and how to make the most of a first visit.",
  excerpt:
    "New to the east side of the Portland metro and hunting for a neighborhood used bookstore? Here's how to find us in Milwaukie, what makes the shop tick, and how to plan a first visit.",
  date: "2026-06-18",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Portland"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        If you&rsquo;re searching for a used bookstore near Milwaukie or
        Southeast Portland, here&rsquo;s the short answer: you&rsquo;ll find us at{" "}
        <strong>7931 SE King Rd, Milwaukie, OR 97222</strong>, open{" "}
        <strong>Monday through Saturday, 10am&ndash;5pm</strong>. We&rsquo;re a
        neighborhood used bookshop that&rsquo;s been part of the community for
        decades — and we&rsquo;re a quick hop from Clackamas, Oak Grove,
        Gladstone, Happy Valley, and the rest of the east side.
      </p>

      <h2>What kind of shop is this?</h2>
      <p>
        We&rsquo;re a used bookstore with a trade-in twist. Browse thousands of
        secondhand titles across fiction, non-fiction, kids&rsquo; and YA,
        cookbooks, poetry, and graphic novels — and if you bring books you&rsquo;ve
        finished, you can turn them into store credit toward your next stack. (We
        trade for credit; we don&rsquo;t buy for cash.)
      </p>

      <h2>Making the most of a first visit</h2>
      <ul>
        <li>
          <strong>Come ready to browse.</strong> The shelves reward a slow
          wander — plan a little time rather than a smash-and-grab.
        </li>
        <li>
          <strong>Bring books if you have them.</strong> Readable titles in good
          shape earn credit you can spend the same afternoon.
        </li>
        <li>
          <strong>Ask at the counter.</strong> Hunting for something specific, or
          a rare title? We&rsquo;ll do our best to track it down through our
          network.
        </li>
      </ul>

      <h2>Can&rsquo;t make it in person?</h2>
      <p>
        We also keep a curated selection online, so you can support an
        independent shop from anywhere. Have a look at{" "}
        <Link href="/shop">our online shelves</Link>, or use the{" "}
        <Link href="/">Next Read Matchmaker</Link> on the homepage if you want a
        recommendation tuned to what you actually like.
      </p>

      <p>
        Ready to drop by? <Link href="/visit">Plan your visit</Link> for
        directions, parking, and what to expect when you walk in.
      </p>
    </>
  );
}
