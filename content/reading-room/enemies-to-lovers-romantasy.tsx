import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "enemies-to-lovers-romantasy",
  title: "Enemies-to-lovers romantasy: 8 books where the tension does the work",
  description:
    "The best enemies-to-lovers romantasy books — slow-burn rivalries, sworn-enemy heroes, and banter that crackles. Eight picks with a one-line note on each.",
  excerpt:
    "Sworn enemies, simmering banter, and a slow burn that finally catches — these eight enemies-to-lovers romantasy reads live for the tension before the fall.",
  date: "2026-06-15",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Romance", "Genre guide"],
  readingMinutes: 4,
  items: [
    { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "Serpent & Dove", author: "Shelby Mahurin" },
    { name: "The Bridge Kingdom", author: "Danielle L. Jensen" },
    { name: "A Touch of Darkness", author: "Scarlett St. Clair" },
    { name: "Crescent City", author: "Sarah J. Maas" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The genre-defining pick is A Court of Thorns and Roses by Sarah J.
        Maas — the blueprint for a generation of enemies-to-lovers romantasy,
        built on a captor-captive dynamic that thaws slowly across a fae
        court.
      </QuickAnswer>
      <p>
        Enemies-to-lovers is the trope that built romantasy. When two people who
        should be killing each other keep, well, <em>not</em> doing that, every
        glance turns into a fight and every fight turns into something else.
        Here are eight where the rivalry earns the romance.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>The blueprint for a generation: captor, captive, and a slow thaw across a fae court.</p>

      <h2>2. Fourth Wing — Rebecca Yarros</h2>
      <p>Violet and Xaden start as political enemies at a dragon-rider war college. The banter is half the appeal.</p>

      <h2>3. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>A sheltered maiden and her sworn guard — duty versus desire, dialed all the way up.</p>

      <h2>4. The Cruel Prince — Holly Black</h2>
      <p>Jude and Cardan trade contempt like currency. Sharp, scheming, and deeply satisfying.</p>

      <h2>5. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>A witch and a witch-hunter forced into marriage. Opposite sides of a war, one roof.</p>

      <h2>6. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>A warrior princess sent to spy on the husband she&rsquo;s meant to betray. Slow burn, real stakes.</p>

      <h2>7. A Touch of Darkness — Scarlett St. Clair</h2>
      <p>Hades and Persephone reimagined — a goddess of spring and the god she swears she hates.</p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>Bryce and Hunt circle each other for ages. The wait is the whole point.</p>

      <h2>Start the fight</h2>
      <p>
        Browse our <Link href="/shop">romantasy shelves</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> you want enemies-to-lovers with
        a real slow burn. Newer to the genre? Begin with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">best romantasy guide</Link>{" "}
        or{" "}
        <Link href="/reading-room/books-like-a-court-of-thorns-and-roses">books like ACOTAR</Link>.
      </p>
    </>
  );
}
