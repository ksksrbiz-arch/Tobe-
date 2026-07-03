import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-victorian-novels",
  title: "The best Victorian novels: 8 doorstoppers worth the page count",
  description:
    "The best Victorian novels — Dickens, Eliot, Hardy, the Brontës and more — with a one-line note on each and a tip on which to read first.",
  excerpt:
    "Fog, factories, fortunes lost and found — the Victorians wrote big, plotty novels built to be devoured. Eight of the best, with a note on which to open first.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics"],
  readingMinutes: 5,
  items: [
    { name: "Great Expectations", author: "Charles Dickens" },
    { name: "Jane Eyre", author: "Charlotte Brontë" },
    { name: "Middlemarch", author: "George Eliot" },
    { name: "Tess of the d'Urbervilles", author: "Thomas Hardy" },
    { name: "Bleak House", author: "Charles Dickens" },
    { name: "Wuthering Heights", author: "Emily Brontë" },
    { name: "The Tenant of Wildfell Hall", author: "Anne Brontë" },
    { name: "The Woman in White", author: "Wilkie Collins" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        The Victorians wrote serialized, plot-rich novels designed to be
        devoured chapter by chapter — which is exactly why they still read so
        well. Here are eight of the best, with a tip on where to start.
      </p>

      <h2>1. Great Expectations — Charles Dickens</h2>
      <p>An orphan, a mysterious benefactor, and Miss Havisham&rsquo;s decaying mansion. The ideal Dickens starter.</p>

      <h2>2. Jane Eyre — Charlotte Brontë</h2>
      <p>A governess with an iron will and a secret in the attic. Gothic romance at its finest.</p>

      <h2>3. Middlemarch — George Eliot</h2>
      <p>A provincial town rendered with astonishing wisdom. The crown jewel of the era.</p>

      <h2>4. Tess of the d&rsquo;Urbervilles — Thomas Hardy</h2>
      <p>A young woman ground down by fate and society. Beautiful and heartbreaking.</p>

      <h2>5. Bleak House — Charles Dickens</h2>
      <p>A never-ending lawsuit, fog, and one of literature&rsquo;s great mysteries. Ambitious and rewarding.</p>

      <h2>6. Wuthering Heights — Emily Brontë</h2>
      <p>Obsession and revenge on the moors. The wildest book of the period.</p>

      <h2>7. The Tenant of Wildfell Hall — Anne Brontë</h2>
      <p>The overlooked Brontë&rsquo;s bracingly modern novel about leaving a ruinous marriage.</p>

      <h2>8. The Woman in White — Wilkie Collins</h2>
      <p>The original sensation novel — mistaken identity, conspiracy, and pure page-turning suspense.</p>

      <h2>Where to start</h2>
      <p>
        New to the Victorians? Begin with <em>Great Expectations</em> or{" "}
        <em>The Woman in White</em> for momentum, then build up to{" "}
        <em>Middlemarch</em> and <em>Bleak House</em> once you&rsquo;re hooked.
      </p>

      <h2>Settle in</h2>
      <p>
        We keep used editions of these on our{" "}
        <Link href="/shop">classics shelves</Link> — ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> where to begin. For more, see
        our{" "}
        <Link href="/reading-room/classic-novels-by-women-authors">classic novels by women</Link>{" "}
        and{" "}
        <Link href="/reading-room/gothic-classic-novels">gothic classic novels</Link>.
      </p>
    </>
  );
}
