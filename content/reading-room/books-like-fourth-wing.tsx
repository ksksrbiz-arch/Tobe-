import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-fourth-wing",
  title: "8 books like Fourth Wing for your next romantasy binge",
  description:
    "Finished Fourth Wing and need more? Eight romantasy books with the same dragons, danger, and slow-burn romance — to read next, with a note on each.",
  excerpt:
    "Dragons, deadly trials, and a slow-burn that wrecks you. If Fourth Wing left you feral for more, here are eight romantasy reads to fill the gap.",
  date: "2026-06-20",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Rebecca Yarros&rsquo;s <em>Fourth Wing</em> nailed a very specific high:
        deadly stakes, a sharp heroine, banter that crackles, and a slow-burn
        that pays off. Here are eight that scratch the same itch.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>The cornerstone of modern romantasy. If you haven&rsquo;t, start now.</p>

      <h2>2. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>Forbidden romance, big twists, and the same can&rsquo;t-stop momentum.</p>

      <h2>3. Throne of Glass — Sarah J. Maas</h2>
      <p>An assassin, a competition, and a sprawling series to sink into. Trials and tension galore.</p>

      <h2>4. Zodiac Academy — Caroline Peckham &amp; Susanne Valenti</h2>
      <p>Magic-academy drama with enemies-to-lovers and serious bingeability.</p>

      <h2>5. The Serpent and the Wings of Night — Carissa Broadbent</h2>
      <p>A deadly tournament, a vampire rival, and a slow-burn made for <em>Fourth Wing</em> fans.</p>

      <h2>6. A Deal with the Elf King — Elise Kova</h2>
      <p>A human bargained to a fae king. Cozy-leaning romantasy with a satisfying arc.</p>

      <h2>7. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>Warrior princess, enemy king, espionage and sparks. Tropey in the best way.</p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>For more grown-up stakes and a mystery thread alongside the romance.</p>

      <h2>Keep the binge going</h2>
      <p>
        Romantasy is one of our best-selling sections, so the shelf turns over
        fast — <Link href="/visit">come browse in person</Link> or check{" "}
        <Link href="/shop">online</Link>, and{" "}
        <Link href="/trade">trade finished series back</Link> for the next. New to
        the genre? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        .
      </p>
    </>
  );
}
