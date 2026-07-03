import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "romantasy-for-fantasy-readers",
  title: "Romantasy for fantasy readers: 7 picks heavy on the world-building",
  description:
    "A fantasy reader curious about romantasy? Seven romantasy books with serious world-building and plot — not just romance — to ease you in, with a note on each.",
  excerpt:
    "Love epic fantasy but side-eye the romance shelf? These seven romantasy reads bring real world-building and plot — the romance is a bonus, not the whole point.",
  date: "2026-05-25",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "The Bridge Kingdom", author: "Danielle L. Jensen" },
    { name: "An Ember in the Ashes", author: "Sabaa Tahir" },
    { name: "The Will of the Many", author: "James Islington" },
    { name: "Crescent City", author: "Sarah J. Maas" },
    { name: "The Jasmine Throne", author: "Tasha Suri" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        If you came up on Tolkien and Sanderson, &ldquo;romantasy&rdquo; might
        sound like all kissing and no plot. Not these. Here are seven with the
        maps, magic systems, and stakes a fantasy reader wants — the romance just
        sweetens the deal.
      </p>

      <h2>1. Fourth Wing — Rebecca Yarros</h2>
      <p>A brutal dragon-rider war college with real stakes and a propulsive plot.</p>

      <h2>2. The Cruel Prince — Holly Black</h2>
      <p>Cutthroat fae politics and scheming. Plot-forward and sharp; romance is the spice, not the meal.</p>

      <h2>3. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>Espionage, war, and a clever heroine. Tight plotting with a slow-burn underneath.</p>

      <h2>4. An Ember in the Ashes — Sabaa Tahir</h2>
      <p>Brutal empire, dual POVs, and high stakes. More fantasy than romance, and excellent.</p>

      <h2>5. The Will of the Many — James Islington (fantasy-forward)</h2>
      <p>For when you want the world-building dialed way up; romance lighter, plot enormous.</p>

      <h2>6. Crescent City — Sarah J. Maas</h2>
      <p>A genuine mystery engine and a sprawling world alongside the romance.</p>

      <h2>7. The Jasmine Throne — Tasha Suri</h2>
      <p>Lush epic fantasy with political depth and a sapphic romance woven through.</p>

      <h2>Cross the aisle</h2>
      <p>
        Browse our <Link href="/shop">shelves</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> you want romantasy that&rsquo;s
        heavy on plot. Coming from pure fantasy? Pair this with our{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">fantasy starter guide</Link>{" "}
        or <Link href="/reading-room/books-like-dune">books like Dune</Link>.
      </p>
    </>
  );
}
