import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "gothic-classic-novels",
  title: "Gothic classic novels: 8 atmospheric reads for a stormy night",
  description:
    "The best gothic classic novels — crumbling houses, buried secrets, and dread that creeps. Eight atmospheric classics with a one-line note on each.",
  excerpt:
    "Crumbling estates, buried secrets, and a dread that seeps in slowly — eight gothic classics that built the genre, perfect for a stormy night and a heavy blanket.",
  date: "2026-06-17",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics"],
  readingMinutes: 4,
  items: [
    { name: "Rebecca", author: "Daphne du Maurier" },
    { name: "Jane Eyre", author: "Charlotte Brontë" },
    { name: "Wuthering Heights", author: "Emily Brontë" },
    { name: "Dracula", author: "Bram Stoker" },
    { name: "Frankenstein", author: "Mary Shelley" },
    { name: "The Picture of Dorian Gray", author: "Oscar Wilde" },
    { name: "The Turn of the Screw", author: "Henry James" },
    { name: "We Have Always Lived in the Castle", author: "Shirley Jackson" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The best starting pick for gothic classics is Rebecca by Daphne du Maurier — a new bride, a grand estate, and the dead first wife who still rules it, described here as the gold standard of the genre.
      </QuickAnswer>
      <p>
        Gothic fiction trades in atmosphere: the old house with one locked room,
        the secret that won&rsquo;t stay buried, the sense that something is
        wrong before anything happens. These eight classics wrote the rules
        everyone&rsquo;s been borrowing ever since.
      </p>

      <h2>1. Rebecca — Daphne du Maurier</h2>
      <p>A new bride, a grand estate, and the dead first wife who still rules it. The gold standard.</p>

      <h2>2. Jane Eyre — Charlotte Brontë</h2>
      <p>Governess, brooding master, and a secret in the attic. Romance and dread in equal measure.</p>

      <h2>3. Wuthering Heights — Emily Brontë</h2>
      <p>Obsessive love on the bleak Yorkshire moors. Less romance than a haunting.</p>

      <h2>4. Dracula — Bram Stoker</h2>
      <p>Told in letters and diaries, it still builds genuine, creeping menace.</p>

      <h2>5. Frankenstein — Mary Shelley</h2>
      <p>The original science-gone-wrong tragedy, and far sadder than the movies suggest.</p>

      <h2>6. The Picture of Dorian Gray — Oscar Wilde</h2>
      <p>Vanity, corruption, and a portrait that ages so its owner won&rsquo;t. Wickedly quotable.</p>

      <h2>7. The Turn of the Screw — Henry James</h2>
      <p>A governess, two strange children, and ghosts that may or may not be real. Short and unsettling.</p>

      <h2>8. We Have Always Lived in the Castle — Shirley Jackson</h2>
      <p>Mid-century but pure gothic: an isolated house, a poisoning, and an unforgettable narrator.</p>

      <h2>Light a candle</h2>
      <p>
        Find these on our <Link href="/shop">classics shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for atmospheric gothic reads.
        Want more? Browse our{" "}
        <Link href="/reading-room/classic-novels-everyone-should-read">classics everyone should read</Link>{" "}
        or{" "}
        <Link href="/reading-room/underrated-classic-novels">underrated classics</Link>.
      </p>
    </>
  );
}
