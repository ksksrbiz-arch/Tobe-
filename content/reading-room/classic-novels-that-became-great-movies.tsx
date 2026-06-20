import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "classic-novels-that-became-great-movies",
  title: "9 classic novels that became great movies",
  description:
    "Loved the film? Read the book. Nine classic novels behind great movies — where the original is just as good (or better), with a note on each.",
  excerpt:
    "Loved the movie? The book is usually even better. Nine classic novels behind great films — a perfect on-ramp if the screen got you first.",
  date: "2026-05-24",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        The movie is often the gateway — and with these, the classic novel
        behind it is just as good or better. A perfect way in if the screen
        version hooked you first.
      </p>

      <h2>1. To Kill a Mockingbird — Harper Lee</h2>
      <p>The Gregory Peck film is a classic; the novel is essential. Start here.</p>

      <h2>2. The Godfather — Mario Puzo</h2>
      <p>Pulpier and juicier than the (perfect) films, with backstory they left out.</p>

      <h2>3. Jurassic Park — Michael Crichton</h2>
      <p>Darker and more thrilling than the movie, with extra science and scares.</p>

      <h2>4. The Shining — Stephen King</h2>
      <p>King famously disliked Kubrick&rsquo;s film — read the book and join the debate.</p>

      <h2>5. Forrest Gump — Winston Groom</h2>
      <p>Stranger and sharper than the beloved movie. A wild, satirical ride.</p>

      <h2>6. The Princess Bride — William Goldman</h2>
      <p>Even funnier on the page, with meta-commentary the film couldn&rsquo;t fit.</p>

      <h2>7. No Country for Old Men — Cormac McCarthy</h2>
      <p>Spare, brutal, and unforgettable — the Coens were faithful for good reason.</p>

      <h2>8. Gone with the Wind — Margaret Mitchell</h2>
      <p>The epic behind the epic. Sprawling, controversial, unputdownable.</p>

      <h2>9. Sense and Sensibility — Jane Austen</h2>
      <p>The Emma Thompson adaptation is wonderful; Austen&rsquo;s wit is even better.</p>

      <h2>From screen to shelf</h2>
      <p>
        Movie tie-in or original cover, these are bookstore staples — easy to
        find used. Browse <Link href="/shop">our shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for a pick, and{" "}
        <Link href="/trade">trade them forward</Link>. Want the timeless greats?
        See our{" "}
        <Link href="/reading-room/classic-novels-everyone-should-read">
          classics everyone should read
        </Link>
        .
      </p>
    </>
  );
}
