import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "short-classic-novels-under-200-pages",
  title: "9 short classic novels you can read in a sitting",
  description:
    "Want to read more classics without the doorstoppers? Nine short classic novels — most under 200 pages — that pack a full punch, with a line on each.",
  excerpt:
    "Classics don't have to mean 800 pages. Nine short, powerful classic novels — most under 200 pages — perfect for dipping a toe into the canon.",
  date: "2026-05-28",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Reading habits"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        &ldquo;I want to read more classics&rdquo; usually stalls at the sight of
        a 900-page Russian novel. Good news: some of the greatest classics are
        short. Here are nine you can finish in a sitting or two.
      </p>

      <h2>1. The Great Gatsby — F. Scott Fitzgerald</h2>
      <p>Shimmering, sad, and barely 180 pages. The Great American Novel, distilled.</p>

      <h2>2. Of Mice and Men — John Steinbeck</h2>
      <p>A perfect, heartbreaking little book you can read in an afternoon.</p>

      <h2>3. The Old Man and the Sea — Ernest Hemingway</h2>
      <p>Spare and elemental — Hemingway at his most concentrated.</p>

      <h2>4. The Stranger — Albert Camus</h2>
      <p>Cool, unsettling, and endlessly discussable. A philosophy course in 120 pages.</p>

      <h2>5. Animal Farm — George Orwell</h2>
      <p>A fable that still bites. Finish it in a sitting; think about it for weeks.</p>

      <h2>6. The Metamorphosis — Franz Kafka</h2>
      <p>A man wakes up as an insect. Strange, sad, and unforgettable — and very short.</p>

      <h2>7. Ethan Frome — Edith Wharton</h2>
      <p>A wintry New England tragedy in miniature. Quietly devastating.</p>

      <h2>8. The Awakening — Kate Chopin</h2>
      <p>A landmark of early feminist fiction, slim and startlingly modern.</p>

      <h2>9. A Christmas Carol — Charles Dickens</h2>
      <p>Dickens without the doorstopper — short, rich, and perennially worth it.</p>

      <h2>Start small, read more</h2>
      <p>
        Short classics are the perfect, low-commitment way to build the habit —
        and used bookstores are full of them. Browse{" "}
        <Link href="/shop">our shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for a pick, and{" "}
        <Link href="/trade">trade them forward</Link>. More short reads in our{" "}
        <Link href="/reading-room/short-books-to-finish-in-a-weekend">
          weekend reads guide
        </Link>
        .
      </p>
    </>
  );
}
