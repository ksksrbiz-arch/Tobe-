import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-a-game-of-thrones",
  title: "Books Like A Game of Thrones: 5 Epic Fantasy Reads to Try",
  description:
    "Waiting on Winds of Winter? Five epic and grimdark fantasy read-alikes, from The Name of the Wind to The First Law, for any A Game of Thrones reader.",
  excerpt:
    "Hooked on Westeros and its scheming, morally gray cast? Here are five epic and grimdark fantasy reads to fill the wait between books.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Read-alikes", "Recommendations"],
  readingMinutes: 4,
  items: [
    { name: "The Name of the Wind" },
    { name: "The Way of Kings" },
    { name: "The First Law" },
    { name: "The Poppy War" },
    { name: "The Lies of Locke Lamora" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The closest read-alike to A Game of Thrones is The First Law by Joe Abercrombie, a grimdark trilogy that shares Martin&rsquo;s cynicism, gray morality, and characters who refuse to be heroes.
      </QuickAnswer>
      <p>
        George R. R. Martin&rsquo;s <em>A Game of Thrones</em> raised the bar
        for epic fantasy: sprawling politics, morally gray characters, and a
        world where no one is safe. If you&rsquo;re deep in the wait for the next
        book and need something with the same weight and scheming, here are five
        read-alikes we recommend to Westeros fans.
      </p>

      <h2>For the gorgeous prose: The Name of the Wind</h2>
      <p>
        Patrick Rothfuss&rsquo;s <em>The Name of the Wind</em> is a different
        flavor &mdash; a single, brilliant narrator recounting his own legend
        &mdash; but the worldbuilding and lush writing make it an easy sell to
        anyone who reads fantasy for immersion. Fair warning: the series is also
        famously unfinished, so you&rsquo;ll be waiting alongside us.
      </p>

      <h2>For the doorstopper epic: The Way of Kings</h2>
      <p>
        If it was the sheer scope of Westeros you loved, Brandon
        Sanderson&rsquo;s <em>The Way of Kings</em> delivers an enormous,
        meticulously built world with warring nations, ancient magic, and a cast
        you&rsquo;ll follow for thousands of pages. The payoff-to-page ratio is
        unmatched.
      </p>

      <h2>For the grimdark edge: The First Law</h2>
      <p>
        Joe Abercrombie&rsquo;s <em>The First Law</em> trilogy is the natural
        home for readers who loved Martin&rsquo;s cynicism and gray morality.
        It&rsquo;s sharp, funny, and brutal, with characters who refuse to be
        heroes &mdash; grimdark at its very best.
      </p>

      <h2>For the brutal, ambitious heroine: The Poppy War</h2>
      <p>
        R. F. Kuang&rsquo;s <em>The Poppy War</em> opens like a school story and
        descends into harrowing, war-torn epic fantasy inspired by 20th-century
        Chinese history. It does not flinch &mdash; perfect if the darkness of
        Westeros is a feature, not a bug, for you.
      </p>

      <h2>For the heist-and-scheme thrills: The Lies of Locke Lamora</h2>
      <p>
        Scott Lynch&rsquo;s <em>The Lies of Locke Lamora</em> brings the
        political maneuvering and witty con-artist energy that made the
        Lannister chapters so addictive. A gorgeously realized canal city, an
        elaborate con, and dialogue you&rsquo;ll want to read aloud.
      </p>

      <h2>Build your next epic stack</h2>
      <p>
        These are some of the most-traded titles in our fantasy section, so
        used copies cycle through often &mdash; worth checking the shelves on
        each visit. Tell our{" "}
        <Link href="/#next-read">AI Matchmaker</Link> whether you want more
        politics, more grimdark, or more magic, and it&rsquo;ll point the way.
        Browse{" "}
        <Link href="/shop">online</Link> or{" "}
        <Link href="/visit">stop by the store in Milwaukie</Link>. New to the
        genre? Start with our{" "}
        <Link href="/reading-room/classic-fantasy-novels-everyone-should-read">
          classic fantasy novels everyone should read
        </Link>
        . Want the same political scheming on an even bigger canvas? See our
        list of{" "}
        <Link href="/reading-room/books-like-dune">books like Dune</Link>.
      </p>
    </>
  );
}
