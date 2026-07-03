import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "romantasy-series-worth-committing-to",
  title: "6 romantasy series worth committing to",
  description:
    "Ready to fall into a long romantasy series? Six binge-worthy series — from A Court of Thorns and Roses to Crescent City — worth the commitment, with a note on each.",
  excerpt:
    "Sometimes you don't want one book — you want a world to live in for weeks. Six romantasy series worth clearing your calendar for.",
  date: "2026-05-26",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    { name: "The Empyrean (Fourth Wing)", author: "Rebecca Yarros" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "Crescent City", author: "Sarah J. Maas" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "Zodiac Academy", author: "Caroline Peckham & Susanne Valenti" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        The best part of romantasy is sinking into a series and not coming up for
        air. If you want a world to live in — and a ship to go down with — for
        weeks, here are six series worth the commitment.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>Five books of fae courts and a romance that reorders your priorities. The genre&rsquo;s cornerstone.</p>

      <h2>2. The Empyrean (Fourth Wing) — Rebecca Yarros</h2>
      <p>Dragon riders, war college, and cliffhangers that will ruin your week (lovingly).</p>

      <h2>3. Throne of Glass — Sarah J. Maas</h2>
      <p>An assassin&rsquo;s sprawling, escalating saga. A big commitment with a big payoff.</p>

      <h2>4. Crescent City — Sarah J. Maas</h2>
      <p>Grown-up stakes, mystery, and romance in a richly built world. Doorstoppers worth it.</p>

      <h2>5. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>Twist-driven and addictive, with a sprawling world that keeps expanding.</p>

      <h2>6. Zodiac Academy — Caroline Peckham &amp; Susanne Valenti</h2>
      <p>Eight books of magic-academy chaos and enemies-to-lovers. Pure binge fuel.</p>

      <h2>Commit (then trade up)</h2>
      <p>
        Long series are exactly what trade-in is built for — finish a saga and{" "}
        <Link href="/trade">swap it for credit</Link> toward the next. Romantasy is
        one of our best-selling sections, so come{" "}
        <Link href="/visit">browse in person</Link> or shop{" "}
        <Link href="/shop">online</Link>. New to the genre? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        .
      </p>
    </>
  );
}
