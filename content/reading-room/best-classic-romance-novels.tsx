import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-classic-romance-novels",
  title: "9 classic romance novels that still hold up",
  description:
    "Looking for timeless love stories? Nine classic romance novels — from Austen to du Maurier — that earn their reputation and still sweep readers away.",
  excerpt:
    "Before BookTok, there was Austen. Nine classic romance novels — swoony, sharp, and timeless — that prove the genre's roots run deep.",
  date: "2026-06-02",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Romance"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <p>
        Classics and romance are two of our best-selling sections — and they
        overlap more than people expect. Long before modern romance topped the
        charts, these novels were doing yearning, banter, and grand gestures
        beautifully. Nine that still hold up.
      </p>

      <h2>1. Pride and Prejudice — Jane Austen</h2>
      <p>The blueprint. Wit, pride, misunderstanding, and the original enemies-to-lovers slow burn.</p>

      <h2>2. Jane Eyre — Charlotte Brontë</h2>
      <p>Gothic, fierce, and deeply romantic, with a heroine who refuses to shrink.</p>

      <h2>3. Persuasion — Jane Austen</h2>
      <p>Austen&rsquo;s most quietly devastating — second chances and one of literature&rsquo;s best love letters.</p>

      <h2>4. Rebecca — Daphne du Maurier</h2>
      <p>A brooding estate, a dead first wife, and romance laced with dread. Unputdownable.</p>

      <h2>5. Wuthering Heights — Emily Brontë</h2>
      <p>Not cozy — stormy, obsessive, and wild. The original toxic-romance debate starter.</p>

      <h2>6. Outlander — Diana Gabaldon</h2>
      <p>A modern classic: time travel, history, and an epic sweeping romance across centuries.</p>

      <h2>7. The Age of Innocence — Edith Wharton</h2>
      <p>Restraint as romance — longing inside the gilded cage of old New York. Exquisite.</p>

      <h2>8. North and South — Elizabeth Gaskell</h2>
      <p>Industrial England, class friction, and a slow-burn that rewards every page.</p>

      <h2>9. Gone with the Wind — Margaret Mitchell</h2>
      <p>Sprawling, controversial, and unforgettable — an epic of love and survival.</p>

      <h2>Start the shelf</h2>
      <p>
        Classics are the heart of a used bookstore — affordable, everywhere, and
        meant to be passed on. Find these on <Link href="/shop">our shelves</Link>,
        ask the <Link href="/#next-read">Matchmaker</Link> for one that fits your
        taste, or <Link href="/trade">trade your finished reads</Link> for more.
        Prefer modern? See{" "}
        <Link href="/reading-room/romance-novels-for-skeptics">
          romance for people who don&rsquo;t read romance
        </Link>
        .
      </p>
    </>
  );
}
