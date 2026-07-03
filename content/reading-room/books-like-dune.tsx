import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-dune",
  title: "7 books like Dune for epic sci-fi and fantasy fans",
  description:
    "Loved Dune? Here are seven sweeping, world-building epics — political intrigue, strange worlds, and big ideas — to read next, with a note on each.",
  excerpt:
    "Vast worlds, scheming houses, ecology and prophecy and power. If Arrakis left you hungry for more epic scope, here are seven places to go next.",
  date: "2026-06-06",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Science fiction", "Fantasy", "Read-alikes"],
  readingMinutes: 4,
  items: [
    { name: "Hyperion", author: "Dan Simmons" },
    { name: "The Fifth Season", author: "N. K. Jemisin" },
    { name: "Foundation", author: "Isaac Asimov" },
    { name: "A Memory Called Empire", author: "Arkady Martine" },
    { name: "The Left Hand of Darkness", author: "Ursula K. Le Guin" },
    { name: "Red Rising", author: "Pierce Brown" },
    { name: "The Name of the Wind", author: "Patrick Rothfuss" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The closest read-alike to Dune here is Hyperion by Dan Simmons — a
        far-future pilgrimage epic the article calls the closest thing to
        Herbert&rsquo;s scope.
      </QuickAnswer>
      <p>
        <em>Dune</em> spoils you for scope: whole worlds with their own ecology,
        religion, and politics, and a story that plays out like myth. Here are
        seven epics that scratch the same itch.
      </p>

      <h2>1. Hyperion — Dan Simmons</h2>
      <p>
        A far-future pilgrimage told <em>Canterbury Tales</em>–style. Ambitious,
        literary, and unforgettable — the closest thing to Herbert&rsquo;s scope.
      </p>

      <h2>2. The Fifth Season — N. K. Jemisin</h2>
      <p>
        A broken world, devastating powers, and a singular structure. Fantasy
        more than sci-fi, but every bit as immersive and idea-rich.
      </p>

      <h2>3. Foundation — Isaac Asimov</h2>
      <p>
        Galactic empire, the science of predicting history, and centuries of
        sweep. The granddaddy of big-idea space epics.
      </p>

      <h2>4. A Memory Called Empire — Arkady Martine</h2>
      <p>
        Political intrigue, language, and identity inside a seductive empire.
        For the <em>Dune</em> reader who loved the court machinations.
      </p>

      <h2>5. The Left Hand of Darkness — Ursula K. Le Guin</h2>
      <p>
        A lone envoy on a strange world, deep on culture and politics. Quieter,
        but profound and beautifully built.
      </p>

      <h2>6. Red Rising — Pierce Brown</h2>
      <p>
        A color-coded caste society and a rise-from-below revolution. More
        propulsive and brutal — great if you want momentum.
      </p>

      <h2>7. The Name of the Wind — Patrick Rothfuss</h2>
      <p>
        Switching to fantasy, but the same lavish world-building and mythic
        storytelling. Gorgeous and immersive.
      </p>

      <h2>Begin the journey</h2>
      <p>
        Epics are perfect to trade — they&rsquo;re long, so swapping keeps the
        habit affordable. Browse <Link href="/shop">our shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> where to start, and{" "}
        <Link href="/trade">trade them back</Link> for the next saga. More
        sci-fi? See our{" "}
        <Link href="/reading-room/books-like-project-hail-mary">
          Project Hail Mary readalikes
        </Link>
        .
      </p>
    </>
  );
}
