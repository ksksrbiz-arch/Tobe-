import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-romantasy-books-to-start-with",
  title: "Best romantasy books to start with (one of our best-sellers)",
  description:
    "New to romantasy — romance + fantasy? Here are the best romantasy books to start with, from A Court of Thorns and Roses to Fourth Wing, with a note on each.",
  excerpt:
    "Romantasy — romance with dragons, fae courts, and high stakes — is one of the most-loved (and best-selling) genres on our shelves. Here's where to start.",
  date: "2026-06-20",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Romance"],
  readingMinutes: 5,
  items: [
    { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "Crescent City: House of Earth and Blood", author: "Sarah J. Maas" },
    { name: "Divine Rivals", author: "Rebecca Ross" },
    { name: "The Bridge Kingdom", author: "Danielle L. Jensen" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Romantasy — romance braided through epic fantasy — is having a moment,
        and it&rsquo;s one of the genres that moves fastest off our shelves. Fae
        courts, dragon riders, enemies-to-lovers, and very high stakes. If
        you&rsquo;re ready to fall in, here&rsquo;s where to start.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>
        The gateway for a whole generation of readers. A mortal huntress, a fae
        lord, and a slow-burn that explodes. Start here, then brace for the
        sequel (<em>A Court of Mist and Fury</em>) everyone obsesses over.
      </p>

      <h2>2. Fourth Wing — Rebecca Yarros</h2>
      <p>
        Dragon-rider war college, deadly trials, and crackling tension. The book
        that put &ldquo;romantasy&rdquo; on every bestseller list. Wildly fun.
      </p>

      <h2>3. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>
        A guarded maiden, a charming guard, and a world full of secrets. Pure
        propulsive escapism with a devoted following.
      </p>

      <h2>4. The Cruel Prince — Holly Black</h2>
      <p>
        Sharper and more political — a mortal girl scheming in a treacherous fae
        court. Perfect if you like your romance with knives out.
      </p>

      <h2>5. Crescent City: House of Earth and Blood — Sarah J. Maas</h2>
      <p>
        Urban-fantasy flavored romantasy with a grown-up cast and a mystery
        engine. Bigger and a touch more mature.
      </p>

      <h2>6. Divine Rivals — Rebecca Ross</h2>
      <p>
        Rival journalists, magic typewriters, and a gentler, aching romance.
        A lovely lower-spice entry point.
      </p>

      <h2>7. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>
        A warrior princess sent to spy on (and marry) an enemy king. Tight,
        tropey, and immensely satisfying.
      </p>

      <h2>Come browse our romantasy shelf</h2>
      <p>
        Because romantasy readers tear through series fast, it&rsquo;s perfect
        for trading — finish a trilogy and{" "}
        <Link href="/trade">swap it for credit</Link> toward the next. It&rsquo;s
        one of our best-selling sections, so there&rsquo;s usually plenty in —
        come <Link href="/visit">browse in person</Link>, check{" "}
        <Link href="/shop">our online shelves</Link>, or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for your next obsession. Want
        more dragons and less romance? See our{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">
          fantasy starter guide
        </Link>
        .
      </p>
    </>
  );
}
