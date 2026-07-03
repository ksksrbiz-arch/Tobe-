import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "classic-fantasy-novels-everyone-should-read",
  title: "8 classic fantasy novels every fan should read",
  description:
    "Before the modern boom, these classic fantasy novels built the genre. Eight timeless reads — from Tolkien to Le Guin — every fantasy fan should know.",
  excerpt:
    "Romantasy and modern epics owe everything to these. Eight foundational classic fantasy novels every fan should read at least once.",
  date: "2026-06-01",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Fantasy", "Genre guide"],
  readingMinutes: 4,
  items: [
    { name: "The Hobbit", author: "J. R. R. Tolkien" },
    { name: "The Lord of the Rings", author: "J. R. R. Tolkien" },
    { name: "A Wizard of Earthsea", author: "Ursula K. Le Guin" },
    { name: "The Chronicles of Narnia", author: "C. S. Lewis" },
    { name: "The Princess Bride", author: "William Goldman" },
    { name: "The Once and Future King", author: "T. H. White" },
    { name: "The Last Unicorn", author: "Peter S. Beagle" },
    { name: "Dragonflight", author: "Anne McCaffrey" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The best starting point is <em>The Hobbit</em> by J. R. R. Tolkien,
        the cozy adventure that launched modern fantasy and remains the
        genre&rsquo;s easiest on-ramp.
      </QuickAnswer>
      <p>
        Today&rsquo;s romantasy and doorstopper epics stand on the shoulders of
        these. Two of our best-selling sections — classics and fantasy — meet
        right here. Eight foundational reads every fantasy fan should know.
      </p>

      <h2>1. The Hobbit — J. R. R. Tolkien</h2>
      <p>The cozy adventure that launched modern fantasy. Still the perfect on-ramp.</p>

      <h2>2. The Lord of the Rings — J. R. R. Tolkien</h2>
      <p>The genre&rsquo;s towering epic. Dense, but the foundation everything else builds on.</p>

      <h2>3. A Wizard of Earthsea — Ursula K. Le Guin</h2>
      <p>Short, wise, and essential. A young mage and the shadow he unleashes.</p>

      <h2>4. The Chronicles of Narnia — C. S. Lewis</h2>
      <p>Begin with <em>The Lion, the Witch and the Wardrobe</em>. Timeless for every age.</p>

      <h2>5. The Princess Bride — William Goldman</h2>
      <p>Funnier and sharper than the (beloved) film. Adventure, romance, and wit.</p>

      <h2>6. The Once and Future King — T. H. White</h2>
      <p>The definitive, humane retelling of King Arthur. Warm and wise.</p>

      <h2>7. The Last Unicorn — Peter S. Beagle</h2>
      <p>Lyrical, bittersweet, and unlike anything else. A quiet masterpiece.</p>

      <h2>8. Dragonflight — Anne McCaffrey</h2>
      <p>Dragons, bonding, and adventure — a clear ancestor of today&rsquo;s dragon-rider romantasy.</p>

      <h2>Build your shelf</h2>
      <p>
        These are bookstore staples — easy to find used and meant to be shared.
        Browse <Link href="/shop">our shelves</Link>, let the{" "}
        <Link href="/#next-read">Matchmaker</Link> pick your entry point, and{" "}
        <Link href="/trade">trade them forward</Link> when you&rsquo;re done. Want
        the dragons with more romance? See our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        .
      </p>
    </>
  );
}
