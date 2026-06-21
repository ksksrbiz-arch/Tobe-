import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "cozy-places-to-read-in-milwaukie-oregon",
  title: "Cozy places to read in Milwaukie, Oregon",
  description:
    "The best spots to settle in with a book in Milwaukie, OR — riverfront benches, the Trolley Trail, quiet parks, and a rainy-day reading nook at To Be Read.",
  excerpt:
    "Found a good book and need somewhere to read it? Here are the coziest spots around Milwaukie, OR — riverside benches, shady parks, and a rainy-day plan B.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Visit", "Milwaukie", "Local guide"],
  readingMinutes: 3,
};

export default function Body() {
  return (
    <>
      <p>
        Half the joy of a new book is finding the right place to read it.
        Milwaukie — right on the Willamette just south of Portland — has more
        good reading spots than its size suggests. Here are our favorites for an
        hour with a fresh paperback.
      </p>

      <h2>By the water: Milwaukie Bay Park</h2>
      <p>
        The reworked riverfront park gives you benches, lawn, and a wide view of
        the Willamette. On a clear day it&rsquo;s the best seat in town — bring a
        blanket and a thriller and lose an afternoon.
      </p>

      <h2>On the move: the Trolley Trail</h2>
      <p>
        The flat, tree-lined Trolley Trail runs for miles through Milwaukie and
        beyond. Walk until you find a quiet bench, then read until your feet
        recover. Great for audiobooks, too.
      </p>

      <h2>A quiet corner downtown</h2>
      <p>
        Downtown Milwaukie&rsquo;s Main Street is compact and calm — easy to grab
        a coffee and find a sidewalk table or a shady spot to read without the
        bustle of inner Portland.
      </p>

      <h2>Rainy day? Start at the shop</h2>
      <p>
        This is Oregon, so have a plan B. Browsing the stacks at{" "}
        <strong>To Be Read</strong> is its own slow pleasure on a wet afternoon —
        come find your next read, then take it somewhere warm. We&rsquo;re at{" "}
        <Link href="/visit">7931 SE King Rd, Ste 1</Link>.
      </p>

      <h2>Fill your bag first</h2>
      <p>
        Stock up on our <Link href="/shop">shelves</Link>, see our{" "}
        <Link href="/reading-room/milwaukie-oregon-book-lovers-day-out">book lover&rsquo;s day out in Milwaukie</Link>,
        or ask the <Link href="/#next-read">Matchmaker</Link> what to bring to the
        river.
      </p>
    </>
  );
}
