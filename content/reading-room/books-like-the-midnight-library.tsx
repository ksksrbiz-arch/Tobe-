import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-the-midnight-library",
  title: "Books Like The Midnight Library: 6 Uplifting Reads to Try Next",
  description:
    "Loved The Midnight Library? Six warm, philosophical, book-club-ready novels about second chances and the lives we might have lived — picked by our staff.",
  excerpt:
    "Second chances, gentle philosophy, and a hopeful heart. Six uplifting novels to read after The Midnight Library.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Read-alikes", "Recommendations"],
  readingMinutes: 4,
  items: [
    { name: "Remarkably Bright Creatures", author: "Shelby Van Pelt" },
    { name: "The Invisible Life of Addie LaRue", author: "V. E. Schwab" },
    { name: "A Man Called Ove", author: "Fredrik Backman" },
    { name: "Before the Coffee Gets Cold", author: "Toshikazu Kawaguchi" },
    { name: "Life After Life", author: "Kate Atkinson" },
    { name: "The House in the Cerulean Sea", author: "TJ Klune" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Matt Haig&rsquo;s <em>The Midnight Library</em> asks a question that
        won&rsquo;t leave you alone: what if you could try the lives you didn&rsquo;t
        choose? It pairs that big idea with a warm, hopeful heart — the rare book
        that&rsquo;s both a comfort and a conversation. If that&rsquo;s the feeling
        you&rsquo;re after, here are six we keep recommending.
      </p>

      <h2>1. Remarkably Bright Creatures — Shelby Van Pelt</h2>
      <p>
        A grieving widow, a small-town aquarium, and a remarkably perceptive giant
        Pacific octopus. Tender, gently funny, and quietly profound about second
        acts — a book-club favorite for good reason.
      </p>

      <h2>2. The Invisible Life of Addie LaRue — V. E. Schwab</h2>
      <p>
        A young woman bargains for immortality and is cursed to be forgotten by
        everyone she meets. It shares <em>The Midnight Library</em>&rsquo;s
        philosophical pulse — what makes a life matter? — with a more romantic,
        time-spanning sweep.
      </p>

      <h2>3. A Man Called Ove — Fredrik Backman</h2>
      <p>
        A curmudgeon&rsquo;s carefully planned solitude keeps getting interrupted by
        neighbors who refuse to leave him alone. Funny, big-hearted, and ultimately
        a story about choosing to stay in the world.
      </p>

      <h2>4. Before the Coffee Gets Cold — Toshikazu Kawaguchi</h2>
      <p>
        In a Tokyo caf&eacute;, a particular seat lets you travel in time — but only
        briefly, and nothing you do will change the present. Quiet, melancholy, and
        hopeful, with the same meditation on regret and acceptance.
      </p>

      <h2>5. Life After Life — Kate Atkinson</h2>
      <p>
        Ursula Todd dies and is reborn again and again, living her twentieth century
        in countless variations. The literary heavyweight of this list and the
        closest cousin to Haig&rsquo;s &ldquo;roads not taken&rdquo; premise.
      </p>

      <h2>6. The House in the Cerulean Sea — TJ Klune</h2>
      <p>
        A by-the-book caseworker is sent to an orphanage of magical children and
        finds the life he never let himself want. Pure warmth — the literary
        equivalent of a weighted blanket.
      </p>

      <h2>Reading these with your club</h2>
      <p>
        Every one of these starts a good conversation, which makes them easy picks
        for a group. Browse <Link href="/shop">what&rsquo;s in stock</Link> at our
        Milwaukie shop, dig into our{" "}
        <Link href="/reading-room/best-book-club-books">best book-club books</Link>{" "}
        for more, or describe a favorite to the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link>. If you&rsquo;d rather
        browse in person, <Link href="/visit">come see us</Link> — free parking and
        plenty of shelves to wander.
      </p>
    </>
  );
}
