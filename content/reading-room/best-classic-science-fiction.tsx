import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-classic-science-fiction-novels",
  title: "8 classic science fiction novels that still hold up",
  description:
    "Want to read the sci-fi classics? Eight foundational science fiction novels — from Dune to Le Guin — that defined the genre and still feel essential.",
  excerpt:
    "The novels that built modern sci-fi — and still feel sharp decades later. Eight classic science fiction reads every fan should know.",
  date: "2026-05-27",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Science fiction"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Classics and sci-fi are both staples of our shelves, and the genre&rsquo;s
        foundations are some of the most rewarding reading there is. Here are
        eight classic science fiction novels that defined the field and still
        feel essential.
      </p>

      <h2>1. Dune — Frank Herbert</h2>
      <p>The towering desert epic — politics, ecology, and prophecy. The genre&rsquo;s <em>Lord of the Rings</em>.</p>

      <h2>2. The Left Hand of Darkness — Ursula K. Le Guin</h2>
      <p>A lone envoy on a world without fixed gender. Profound and beautifully built.</p>

      <h2>3. Foundation — Isaac Asimov</h2>
      <p>Galactic empire and the science of predicting history. Big-idea sci-fi at its source.</p>

      <h2>4. Fahrenheit 451 — Ray Bradbury</h2>
      <p>A fireman who burns books, and a warning that keeps getting truer. Short and blazing.</p>

      <h2>5. Do Androids Dream of Electric Sheep? — Philip K. Dick</h2>
      <p>The mind-bending source of <em>Blade Runner</em>. Identity, empathy, and androids.</p>

      <h2>6. Slaughterhouse-Five — Kurt Vonnegut</h2>
      <p>War, time travel, and dark comedy. Genre-bending and unforgettable.</p>

      <h2>7. The Martian Chronicles — Ray Bradbury</h2>
      <p>Lyrical, melancholy stories of Mars. More poetry than hardware, and gorgeous.</p>

      <h2>8. Neuromancer — William Gibson</h2>
      <p>The novel that invented cyberpunk (and half our internet vocabulary). Still electric.</p>

      <h2>Explore the canon</h2>
      <p>
        Used bookstores are the best place to find vintage sci-fi — often in the
        original editions. Browse <Link href="/shop">our shelves</Link>, let the{" "}
        <Link href="/#next-read">Matchmaker</Link> pick your entry point, and{" "}
        <Link href="/trade">trade them forward</Link>. Want newer sci-fi? See{" "}
        <Link href="/reading-room/books-like-dune">books like Dune</Link> or{" "}
        <Link href="/reading-room/books-like-project-hail-mary">
          Project Hail Mary readalikes
        </Link>
        .
      </p>
    </>
  );
}
