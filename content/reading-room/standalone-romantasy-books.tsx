import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "standalone-romantasy-books",
  title: "Standalone romantasy books: 8 reads with no series to commit to",
  description:
    "The best standalone romantasy books — a complete story in one volume, no cliffhanger, no five-book commitment. Eight self-contained picks with a note on each.",
  excerpt:
    "Not ready to start another five-book saga? Eight standalone romantasy reads that begin and end in one volume — full romance, full arc, no cliffhanger.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "An Enchantment of Ravens", author: "Margaret Rogerson" },
    { name: "Radiance", author: "Grace Draven" },
    { name: "Uprooted", author: "Naomi Novik" },
    { name: "Spinning Silver", author: "Naomi Novik" },
    { name: "The Wolf and the Woodsman", author: "Ava Reid" },
    { name: "A Deal with the Elf King", author: "Elise Kova" },
    { name: "The Bear and the Nightingale", author: "Katherine Arden" },
    { name: "Half a Soul", author: "Olivia Atwater" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Romantasy loves a sprawling series — but sometimes you want a complete
        story tonight, not a five-book commitment. These eight deliver a full
        romance and a satisfying arc inside a single cover.
      </p>

      <h2>1. An Enchantment of Ravens — Margaret Rogerson</h2>
      <p>A portrait artist and the autumn prince who can&rsquo;t feel. Gorgeous, contained, complete.</p>

      <h2>2. Radiance — Grace Draven</h2>
      <p>An arranged marriage that grows into real tenderness. Low-drama and wholly self-contained.</p>

      <h2>3. Uprooted — Naomi Novik</h2>
      <p>A village girl, a cranky wizard, and a malevolent wood. Fairy-tale magic in one volume.</p>

      <h2>4. Spinning Silver — Naomi Novik</h2>
      <p>A Rumpelstiltskin reimagining with winter kings and clever women. Standalone and stunning.</p>

      <h2>5. The Wolf and the Woodsman — Ava Reid</h2>
      <p>A pagan girl and a one-eyed soldier in a dark, folkloric world. Atmospheric and finished in one.</p>

      <h2>6. A Deal with the Elf King — Elise Kova</h2>
      <p>A sacrifice-bride and the elf king who needs her. Cozy, complete romantasy.</p>

      <h2>7. The Bear and the Nightingale — Katherine Arden (standalone-friendly)</h2>
      <p>Russian folklore and a girl who sees spirits. Reads beautifully on its own, though a trilogy awaits if you want more.</p>

      <h2>8. Half a Soul — Olivia Atwater</h2>
      <p>A Regency fantasy of manners with a faerie curse. Charming, low-spice, one and done.</p>

      <h2>One and done</h2>
      <p>
        Browse our <Link href="/shop">shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for standalone romantasy. Ready
        to commit after all? See our{" "}
        <Link href="/reading-room/romantasy-series-worth-committing-to">romantasy series worth committing to</Link>{" "}
        or the{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">best romantasy guide</Link>.
      </p>
    </>
  );
}
