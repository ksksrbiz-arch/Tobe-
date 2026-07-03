import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-a-court-of-thorns-and-roses",
  title: "8 books like A Court of Thorns and Roses (ACOTAR)",
  description:
    "Finished ACOTAR and need more fae, romance, and high stakes? Eight romantasy books like A Court of Thorns and Roses to read next, with a note on each.",
  excerpt:
    "Fae courts, a slow-burn that levels you, and a heroine who grows into her power. If ACOTAR left a hole in your chest, here are eight books to fill it.",
  date: "2026-05-29",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "A Deal with the Elf King", author: "Elise Kova" },
    { name: "Serpent & Dove", author: "Shelby Mahurin" },
    { name: "The Serpent and the Wings of Night", author: "Carissa Broadbent" },
    { name: "Crescent City", author: "Sarah J. Maas" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Sarah J. Maas&rsquo;s <em>A Court of Thorns and Roses</em> set the
        template for modern romantasy: fae courts, a mortal heroine coming into
        power, and a romance that rearranges your whole personality. Here are
        eight to read next.
      </p>

      <h2>1. Fourth Wing — Rebecca Yarros</h2>
      <p>Dragons, deadly trials, and crackling tension. The other titan of the genre.</p>

      <h2>2. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>Forbidden romance and twist after twist. Tailor-made for ACOTAR readers.</p>

      <h2>3. Throne of Glass — Sarah J. Maas</h2>
      <p>More Maas, more sprawl — an assassin, a competition, and a long series to live in.</p>

      <h2>4. The Cruel Prince — Holly Black</h2>
      <p>Sharper and more political fae court intrigue, with a deliciously thorny romance.</p>

      <h2>5. A Deal with the Elf King — Elise Kova</h2>
      <p>Human bargained to a fae king — the fae-romance core, in a tighter standalone.</p>

      <h2>6. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>A witch and a witch-hunter forced together. Enemies-to-lovers with real heat.</p>

      <h2>7. The Serpent and the Wings of Night — Carissa Broadbent</h2>
      <p>A deadly tournament and a rival you&rsquo;ll root for. Atmospheric and addictive.</p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>For grown-up stakes and a mystery thread alongside the romance.</p>

      <h2>Find your next court</h2>
      <p>
        Romantasy is one of our best-selling sections, so the shelf turns over
        fast — <Link href="/visit">come browse in person</Link> or shop{" "}
        <Link href="/shop">online</Link>, and{" "}
        <Link href="/trade">trade finished series back</Link> for the next. New
        here? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        , or see{" "}
        <Link href="/reading-room/books-like-fourth-wing">books like Fourth Wing</Link>.
      </p>
    </>
  );
}
