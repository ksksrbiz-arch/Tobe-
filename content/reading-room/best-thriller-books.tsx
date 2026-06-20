import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-thriller-books-to-keep-you-up",
  title: "8 thriller books that will keep you up all night",
  description:
    "Looking for an unputdownable thriller? Eight twisty, propulsive page-turners — psychological suspense to crime — guaranteed to wreck your sleep schedule.",
  excerpt:
    "You know the kind: \"just one more chapter\" at 1 a.m. Eight twisty, propulsive thrillers guaranteed to wreck your sleep schedule in the best way.",
  date: "2026-06-05",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Thriller"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        A great thriller is a controlled demolition of your sleep schedule —
        short chapters, sharp turns, and a hook you can&rsquo;t escape. Here are
        eight that earn the &ldquo;couldn&rsquo;t put it down&rdquo; cliché.
      </p>

      <h2>1. Gone Girl — Gillian Flynn</h2>
      <p>The modern benchmark for the twisty marriage thriller. Still vicious, still brilliant.</p>

      <h2>2. The Silent Patient — Alex Michaelides</h2>
      <p>A psychotherapist, a mute patient, and an ending people won&rsquo;t stop talking about.</p>

      <h2>3. The Girl with the Dragon Tattoo — Stieg Larsson</h2>
      <p>A cold case, a hacker heroine, and a wintry Swedish dread. Dense and gripping.</p>

      <h2>4. I Am Pilgrim — Terry Hayes</h2>
      <p>A globe-spanning espionage epic that reads like a freight train. Long, and worth every page.</p>

      <h2>5. The Guest List — Lucy Foley</h2>
      <p>A wedding on a remote island, a body, and everyone with a motive. Atmospheric and clever.</p>

      <h2>6. Before I Go to Sleep — S. J. Watson</h2>
      <p>A woman who forgets everything each night pieces together a terrifying truth. Relentless.</p>

      <h2>7. Sharp Objects — Gillian Flynn</h2>
      <p>Small-town rot and a reporter with her own scars. Darker and more literary; deeply unsettling.</p>

      <h2>8. The Thursday Murder Club — Richard Osman</h2>
      <p>A gentler note to end on — cozy and funny, but a genuine puzzle. Perfect palate cleanser.</p>

      <h2>Stock up (and sleep later)</h2>
      <p>
        Thrillers are fast reads, which makes them ideal to trade — burn through
        a stack, then <Link href="/trade">swap them for credit</Link>. Browse{" "}
        <Link href="/shop">our shelves</Link>, or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> the last one that hooked you.
        In a cozier mood? Try our{" "}
        <Link href="/reading-room/cozy-mystery-starter-shelf">
          cozy mystery starter shelf
        </Link>
        .
      </p>
    </>
  );
}
