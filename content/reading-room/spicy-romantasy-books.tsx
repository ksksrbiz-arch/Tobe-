import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "spicy-romantasy-books",
  title: "Spicy romantasy books: 8 high-heat reads (and how spicy they get)",
  description:
    "The spiciest romantasy books, with a rough heat level for each — from steamy to scorching. Eight high-heat picks so you know what you're getting into.",
  excerpt:
    "Want the magic and the heat dialed all the way up? Eight high-spice romantasy reads with a rough heat note on each — so the only surprise is the plot.",
  date: "2026-06-20",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Romance", "Genre guide"],
  readingMinutes: 4,
  items: [
    { name: "A Court of Mist and Fury", author: "Sarah J. Maas" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "A Touch of Darkness", author: "Scarlett St. Clair" },
    { name: "Haunting Adeline", author: "H. D. Carlton" },
    { name: "Iron Flame", author: "Rebecca Yarros" },
    { name: "Kingdom of the Wicked", author: "Kerri Maniscalco" },
    { name: "Neon Gods", author: "Katee Robert" },
    { name: "The Serpent and the Wings of Night", author: "Carissa Broadbent" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The book that earned the genre its reputation is A Court of Mist and
        Fury, a moderate three-pepper read with a swoony slow-burn payoff.
        For more heat, A Touch of Darkness and Neon Gods run four peppers.
      </QuickAnswer>
      <p>
        Some readers want fade-to-black; you want the opposite. These eight
        romantasy reads bring real heat alongside the world-building — with a
        rough spice note so you know what you&rsquo;re picking up. (Heat is
        subjective; consider this a friendly heads-up, not a rating.)
      </p>

      <h2>1. A Court of Mist and Fury — Sarah J. Maas</h2>
      <p>The book that earned the genre its reputation. 🌶️🌶️🌶️ and a swoony slow-burn payoff.</p>

      <h2>2. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>Forbidden-guard tension that delivers. 🌶️🌶️🌶️, with a propulsive plot.</p>

      <h2>3. A Touch of Darkness — Scarlett St. Clair</h2>
      <p>Hades &amp; Persephone, contemporary and very steamy. 🌶️🌶️🌶️🌶️.</p>

      <h2>4. Haunting Adeline — H. D. Carlton</h2>
      <p>Dark and intense with strong content warnings — check them first. 🌶️🌶️🌶️🌶️.</p>

      <h2>5. Iron Flame — Rebecca Yarros</h2>
      <p>The Empyrean books bring heat with the dragons. 🌶️🌶️🌶️.</p>

      <h2>6. Kingdom of the Wicked — Kerri Maniscalco</h2>
      <p>Witches, demons, and a wicked prince. 🌶️🌶️🌶️ with a gothic edge.</p>

      <h2>7. Neon Gods — Katee Robert</h2>
      <p>Greek myth reimagined in a modern city. 🌶️🌶️🌶️🌶️ — romance-forward, lighter on fantasy.</p>

      <h2>8. The Serpent and the Wings of Night — Carissa Broadbent</h2>
      <p>A vampire tournament with a slow-burn that catches fire. 🌶️🌶️🌶️.</p>

      <h2>A note on spice</h2>
      <p>
        Heat levels vary by reader and by edition, and several of these carry
        content warnings worth reading first. When in doubt, flip to the
        author&rsquo;s note or a content-warning list before you dive in.
      </p>

      <h2>Turn up the heat</h2>
      <p>
        Find these on our <Link href="/shop">shelves</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> how spicy you like it. Prefer
        the opposite? We also have a{" "}
        <Link href="/reading-room/clean-romantasy-low-spice">clean, low-spice romantasy</Link>{" "}
        guide and our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">best romantasy</Link> list.
      </p>
    </>
  );
}
