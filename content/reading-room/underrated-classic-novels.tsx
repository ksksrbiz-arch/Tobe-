import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "underrated-classic-novels",
  title: "8 underrated classic novels worth discovering",
  description:
    "Past the usual canon: eight underrated classic novels that deserve more readers — brilliant, moving, and overlooked — with a note on each.",
  excerpt:
    "Everyone's read Gatsby. These eight underrated classics deserve the same love — brilliant, moving, and somehow still flying under the radar.",
  date: "2026-05-23",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics"],
  readingMinutes: 4,
  items: [
    { name: "Stoner", author: "John Williams" },
    { name: "The Death of Ivan Ilyich", author: "Leo Tolstoy" },
    { name: "Passing", author: "Nella Larsen" },
    { name: "The Enchanted April", author: "Elizabeth von Arnim" },
    { name: "So Long, See You Tomorrow", author: "William Maxwell" },
    { name: "The Pursuit of Love", author: "Nancy Mitford" },
    { name: "Giovanni's Room", author: "James Baldwin" },
    { name: "Cold Comfort Farm", author: "Stella Gibbons" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Past the same dozen titles assigned in every classroom, the canon is full
        of overlooked gems. Here are eight underrated classics that deserve a
        much bigger audience.
      </p>

      <h2>1. Stoner — John Williams</h2>
      <p>A quiet novel about an ordinary academic&rsquo;s life — and one of the most moving books you&rsquo;ll read.</p>

      <h2>2. The Death of Ivan Ilyich — Leo Tolstoy</h2>
      <p>Short, piercing, and profound. Tolstoy&rsquo;s most accessible masterpiece.</p>

      <h2>3. Passing — Nella Larsen</h2>
      <p>A slim, electric Harlem Renaissance novel about identity and risk. Startlingly modern.</p>

      <h2>4. The Enchanted April — Elizabeth von Arnim</h2>
      <p>Four women, an Italian castle, and pure restorative joy. A delight.</p>

      <h2>5. So Long, See You Tomorrow — William Maxwell</h2>
      <p>An aching, perfect short novel about memory and regret. Under 150 pages.</p>

      <h2>6. The Pursuit of Love — Nancy Mitford</h2>
      <p>Witty, warm, and gossipy — comfort reading with real bite.</p>

      <h2>7. Giovanni&rsquo;s Room — James Baldwin</h2>
      <p>Spare and devastating. Baldwin at his most intimate and essential.</p>

      <h2>8. Cold Comfort Farm — Stella Gibbons</h2>
      <p>A hilarious send-up of gloomy rural novels. Sharp, silly, and endlessly quotable.</p>

      <h2>Discover something new-old</h2>
      <p>
        The joy of a used bookstore is stumbling on a classic you&rsquo;ve never
        heard of. Browse <Link href="/shop">our shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for a hidden gem, and{" "}
        <Link href="/trade">trade your finished reads</Link> for the next. Want
        the short ones? See our{" "}
        <Link href="/reading-room/short-classic-novels-under-200-pages">
          short classics guide
        </Link>
        .
      </p>
    </>
  );
}
