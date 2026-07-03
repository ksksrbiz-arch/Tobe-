import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "ya-romantasy-books",
  title: "YA romantasy books: 8 young-adult fantasy romances to start with",
  description:
    "The best YA romantasy books — young-adult fantasy romance with lower spice and big feelings. Eight picks for teens and crossover readers, with a note on each.",
  excerpt:
    "Fantasy worlds, first love, and lower heat — eight YA romantasy reads perfect for teen readers and grown-ups who want the swoon without the steam.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Genre guide"],
  readingMinutes: 4,
  items: [
    { name: "Shadow and Bone", author: "Leigh Bardugo" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "An Ember in the Ashes", author: "Sabaa Tahir" },
    { name: "Children of Blood and Bone", author: "Tomi Adeyemi" },
    { name: "Caraval", author: "Stephanie Garber" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "Serpent & Dove", author: "Shelby Mahurin" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Shadow and Bone is the natural starting point: the Grishaverse opener
        about a soldier with a hidden power, and a modern YA staple. The
        Cruel Prince is a sharper, more addictive second pick.
      </QuickAnswer>
      <p>
        Young-adult romantasy is where a lot of readers fall in love with the
        genre: big feelings, vivid worlds, and romance that keeps the heat lower.
        Great for teens — and for adults who want the swoon without the spice.
      </p>

      <h2>1. Shadow and Bone — Leigh Bardugo</h2>
      <p>The Grishaverse opener: a soldier with a hidden power and a brooding Darkling. A modern YA staple.</p>

      <h2>2. The Cruel Prince — Holly Black</h2>
      <p>Mortal Jude in a cruel fae court. Sharp, addictive, and the gateway drug for many.</p>

      <h2>3. An Ember in the Ashes — Sabaa Tahir</h2>
      <p>A brutal empire, dual POVs, and high stakes. More fantasy than romance, beautifully done.</p>

      <h2>4. Children of Blood and Bone — Tomi Adeyemi</h2>
      <p>West-African-inspired magic, a fight to restore it, and a slow-burn across enemy lines.</p>

      <h2>5. Caraval — Stephanie Garber</h2>
      <p>A magical, deadly game and two sisters. Whimsical and romantic with a low heat level.</p>

      <h2>6. Throne of Glass — Sarah J. Maas</h2>
      <p>An assassin competes for her freedom. Maas&rsquo;s YA series that grows into epic fantasy.</p>

      <h2>7. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>A witch and a witch-hunter forced to marry. Enemies-to-lovers with crossover appeal.</p>

      <h2>8. Half Bad / These Violent Delights crossover picks</h2>
      <p>For older teens: <em>These Violent Delights</em> by Chloe Gong — Romeo &amp; Juliet in 1920s Shanghai, with monsters.</p>

      <h2>A note for parents</h2>
      <p>
        YA spans a wide age range; heat and darkness vary a lot between titles.
        If you&rsquo;re buying for a younger teen, skim a content-warning list or
        ask us in-store and we&rsquo;ll point you to the right fit.
      </p>

      <h2>Start the journey</h2>
      <p>
        Find these on our <Link href="/shop">shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for YA romantasy. Want lower
        spice across the board? See our{" "}
        <Link href="/reading-room/clean-romantasy-low-spice">clean romantasy guide</Link>{" "}
        or our{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">fantasy starter list</Link>.
      </p>
    </>
  );
}
