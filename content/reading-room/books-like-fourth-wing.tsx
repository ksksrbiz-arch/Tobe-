import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-fourth-wing",
  title: "8 books like Fourth Wing for your next romantasy binge",
  description:
    "Finished Fourth Wing and need more? Eight romantasy books with the same dragons, danger, and slow-burn romance — to read next, with a note on each.",
  excerpt:
    "Dragons, deadly trials, and a slow-burn that wrecks you. If Fourth Wing left you feral for more, here are eight romantasy reads to fill the gap.",
  date: "2026-06-20",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Read-alikes"],
  readingMinutes: 5,
  items: [
    { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "Zodiac Academy", author: "Caroline Peckham & Susanne Valenti" },
    { name: "The Serpent and the Wings of Night", author: "Carissa Broadbent" },
    { name: "A Deal with the Elf King", author: "Elise Kova" },
    { name: "The Bridge Kingdom", author: "Danielle L. Jensen" },
    { name: "Crescent City", author: "Sarah J. Maas" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        For Fourth Wing fans, the top pick is Sarah J. Maas&rsquo;s A Court of
        Thorns and Roses &mdash; the cornerstone of modern romantasy and the
        natural next read if you haven&rsquo;t already started it. Want dragons
        specifically? Go straight to Carissa Broadbent&rsquo;s deadly tournament
        in The Serpent and the Wings of Night.
      </QuickAnswer>
      <p>
        Rebecca Yarros&rsquo;s <em>Fourth Wing</em> nailed a very specific high:
        a war college where failing a test means dying, a sharp-tongued heroine
        who was never supposed to survive, banter that crackles, and a slow-burn
        with Xaden that finally pays off. The eight below each grab one of those
        levers &mdash; the deadly trial, the enemies-to-lovers charge, the bonded
        dragon &mdash; and pull it hard.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>
        The book most Fourth Wing readers reach for next. You get the same arc of
        an underestimated woman growing teeth, plus fae courts instead of a war
        college. If you want the whole map of where it leads, our{" "}
        <Link href="/reading-room/books-like-a-court-of-thorns-and-roses">
          books like ACOTAR
        </Link>{" "}
        guide has more.
      </p>

      <h2>2. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>
        A sheltered &ldquo;Maiden&rdquo; and the guard sworn to protect her:
        forbidden romance, a first-person voice that keeps you close, and a
        mid-book twist that reframes everything. The propulsion is the draw
        &mdash; it reads at the same can&rsquo;t-stop pace.
      </p>

      <h2>3. Throne of Glass — Sarah J. Maas</h2>
      <p>
        Celaena is an assassin dragged into a royal competition, so the
        life-or-death-trial structure that hooks you in Fourth Wing is baked in
        from page one. It also happens to be a sprawling series &mdash; ideal when
        you want to stay in one world for months.
      </p>

      <h2>4. Zodiac Academy — Caroline Peckham &amp; Susanne Valenti</h2>
      <p>
        Twin sisters land at a cutthroat magic academy full of heirs who want
        them gone &mdash; enemies-to-lovers with the rivalry dialed high and a
        slow burn that spans a long series. Come for the same hostile-classmate
        tension; check the spice, which runs hotter than Yarros.
      </p>

      <h2>5. The Serpent and the Wings of Night — Carissa Broadbent</h2>
      <p>
        A human competes in a vampire tournament where the other contestants are
        trying to kill her &mdash; the closest structural echo of Fourth
        Wing&rsquo;s deadly trials on this list, with a rival-turned-ally slow
        burn. Atmospheric and hard to set down.
      </p>

      <h2>6. A Deal with the Elf King — Elise Kova</h2>
      <p>
        A human woman is bargained away to a fae king and finds the marriage
        isn&rsquo;t what she feared. A tighter, gentler standalone &mdash; closer
        to our{" "}
        <Link href="/reading-room/clean-romantasy-low-spice">
          low-spice romantasy
        </Link>{" "}
        picks if the heat in Fourth Wing wasn&rsquo;t the point for you.
      </p>

      <h2>7. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>
        A warrior princess is married off to the enemy king she&rsquo;s been
        trained to betray. Espionage, a genuine slow burn, and the same
        loyalty-versus-love knot Violet keeps tripping over &mdash; the
        sworn-enemy setup does the heavy lifting.
      </p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>
        For when you want the stakes aged up: an adult heroine, a murder mystery
        threaded through the romance, and a partnership with Hunt that smolders
        for a very long time before it lands.
      </p>

      <h2>Keep the binge going</h2>
      <p>
        If it was the dragons above all, go straight to our{" "}
        <Link href="/reading-room/romantasy-books-with-dragons">
          romantasy books with dragons
        </Link>{" "}
        list; if it was the rivalry, our{" "}
        <Link href="/reading-room/enemies-to-lovers-romantasy">
          enemies-to-lovers romantasy
        </Link>{" "}
        guide is built for you. Romantasy is one of our best-selling sections, so
        the shelf turns over fast &mdash;{" "}
        <Link href="/visit">come browse in person</Link> or check{" "}
        <Link href="/shop">online</Link>, and{" "}
        <Link href="/trade">trade finished series back</Link> for the next. New to
        the genre? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        .
      </p>
    </>
  );
}
