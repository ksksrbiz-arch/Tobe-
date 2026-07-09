import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-project-hail-mary",
  title: "7 books like Project Hail Mary for your next sci-fi fix",
  description:
    "Loved Project Hail Mary? Here are seven science fiction novels — clever problem-solving, big ideas, and real heart — to read next, with a note on each.",
  excerpt:
    "Andy Weir's blend of nail-biting problem-solving, real science, and unexpected friendship is hard to match. Seven sci-fi novels to scratch the same itch.",
  date: "2026-06-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Science fiction", "Read-alikes"],
  readingMinutes: 4,
  items: [
    { name: "The Martian", author: "Andy Weir" },
    { name: "Children of Time", author: "Adrian Tchaikovsky" },
    { name: "The Long Way to a Small, Angry Planet", author: "Becky Chambers" },
    { name: "Recursion", author: "Blake Crouch" },
    { name: "Sea of Tranquility", author: "Emily St. John Mandel" },
    { name: "The Mote in God's Eye", author: "Niven & Pournelle" },
    { name: "Klara and the Sun", author: "Kazuo Ishiguro" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The obvious next read for Project Hail Mary fans is Andy Weir&rsquo;s
        own The Martian — a stranded botanist, a hostile planet, and the same
        duct-tape ingenuity.
      </QuickAnswer>
      <p>
        <em>Project Hail Mary</em> hits a sweet spot: a lone protagonist
        out-thinking impossible problems, real science worn lightly, and a
        surprising amount of heart. If you want that exact feeling again, start
        here.
      </p>

      <h2>1. The Martian — Andy Weir</h2>
      <p>
        The obvious first stop if you somehow haven&rsquo;t read it. One
        stranded botanist, a hostile planet, and a lot of duct-tape ingenuity.
      </p>

      <h2>2. Children of Time — Adrian Tchaikovsky</h2>
      <p>
        Big-idea sci-fi about evolution, intelligence, and a very unexpected
        civilization. Patient, brilliant, and deeply rewarding.
      </p>

      <h2>3. The Long Way to a Small, Angry Planet — Becky Chambers</h2>
      <p>
        For the warmth and found-family side of Weir. Lower stakes, higher
        coziness, an utterly likable crew.
      </p>

      <h2>4. Recursion — Blake Crouch</h2>
      <p>
        A propulsive, twisty thriller built on one mind-bending premise. Same
        page-turning momentum, more existential dread.
      </p>

      <h2>5. Sea of Tranquility — Emily St. John Mandel</h2>
      <p>
        More literary, but ideas-rich and humane — time, art, and connection.
        For when you want sci-fi that lingers.
      </p>

      <h2>6. Hail Mary&rsquo;s cousins in classic SF: The Mote in God&rsquo;s Eye — Niven &amp; Pournelle</h2>
      <p>
        First-contact problem-solving on a grand scale. A bit older, but the
        puzzle-box engineering will feel familiar.
      </p>

      <h2>7. Klara and the Sun — Kazuo Ishiguro</h2>
      <p>
        Quiet, tender science fiction told by an unforgettable narrator. The
        emotional aftertaste of <em>PHM</em>, in a very different key.
      </p>

      <h2>Find your next mission</h2>
      <p>
        Any of these might be on <Link href="/shop">our shelves</Link> right now.
        Not sure where to jump in? Tell the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link> what you loved about{" "}
        <em>Project Hail Mary</em> and let it choose — then{" "}
        <Link href="/trade">trade it back</Link> when you&rsquo;re done. For more
        big-idea reading, see our lists of{" "}
        <Link href="/reading-room/books-like-dune">books like Dune</Link> and{" "}
        <Link href="/reading-room/best-classic-science-fiction-novels">
          classic science fiction novels
        </Link>
        .
      </p>
    </>
  );
}
