import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "classic-novels-everyone-should-read",
  title: "9 classic novels worth reading once in your life",
  description:
    "Want to fill in the classics? Nine timeless novels that earn their reputation — approachable, moving, and genuinely worth your time, with a line on each.",
  excerpt:
    "Not the dusty, homework kind — the classics that still hit. Nine timeless novels that earn their reputation and are genuinely worth reading once.",
  date: "2026-06-04",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics"],
  readingMinutes: 5,
  items: [
    { name: "Pride and Prejudice", author: "Jane Austen" },
    { name: "To Kill a Mockingbird", author: "Harper Lee" },
    { name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { name: "Jane Eyre", author: "Charlotte Brontë" },
    { name: "Their Eyes Were Watching God", author: "Zora Neale Hurston" },
    { name: "Frankenstein", author: "Mary Shelley" },
    { name: "The Count of Monte Cristo", author: "Alexandre Dumas" },
    { name: "Beloved", author: "Toni Morrison" },
    { name: "1984", author: "George Orwell" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The best starting point is <em>Pride and Prejudice</em> by Jane
        Austen &mdash; sharper and funnier than its reputation, with wit that
        still holds up two centuries on.
      </QuickAnswer>
      <p>
        &ldquo;Classic&rdquo; can sound like homework. But the books that last
        usually last for a reason — they&rsquo;re still funny, still moving, still
        true. Here are nine that reward the read, without the dread.
      </p>

      <h2>1. Pride and Prejudice — Jane Austen</h2>
      <p>Sharper and funnier than its reputation. The wit holds up two centuries on.</p>

      <h2>2. To Kill a Mockingbird — Harper Lee</h2>
      <p>A childhood, a courtroom, and a conscience. Still one of the most moving American novels.</p>

      <h2>3. The Great Gatsby — F. Scott Fitzgerald</h2>
      <p>Short, shimmering, and sad. The Great American Novel in under 200 pages.</p>

      <h2>4. Jane Eyre — Charlotte Brontë</h2>
      <p>Gothic, fierce, and surprisingly modern in its heroine. A proper page-turner.</p>

      <h2>5. Their Eyes Were Watching God — Zora Neale Hurston</h2>
      <p>Lyrical and alive, a landmark of American literature too often skipped. Read it.</p>

      <h2>6. Frankenstein — Mary Shelley</h2>
      <p>The original science-fiction novel, and a tragedy about ambition and neglect. Eerily current.</p>

      <h2>7. The Count of Monte Cristo — Alexandre Dumas</h2>
      <p>Revenge, escape, and reinvention — a giant page-turner that flies by. Pure story.</p>

      <h2>8. Beloved — Toni Morrison</h2>
      <p>Demanding and unforgettable. A masterpiece about memory, freedom, and love.</p>

      <h2>9. 1984 — George Orwell</h2>
      <p>The dystopia that named our anxieties. Short, chilling, endlessly quoted.</p>

      <h2>Start the shelf</h2>
      <p>
        Used bookstores are the natural home of the classics — affordable,
        everywhere, and meant to be passed on. Find one on{" "}
        <Link href="/shop">our shelves</Link>, or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> which classic fits your taste.
        Want something shorter to start? See our{" "}
        <Link href="/reading-room/short-books-to-finish-in-a-weekend">
          weekend reads
        </Link>
        .
      </p>
    </>
  );
}
