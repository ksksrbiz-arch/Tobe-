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
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Romance", "Genre guide"],
  readingMinutes: 5,
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
        Maas &mdash; a captor-captive dynamic that thaws slowly across a fae
        court. For the sharpest, most venomous version of the trope, go to Holly
        Black&rsquo;s The Cruel Prince.
      </QuickAnswer>
      <p>
        Enemies-to-lovers is the trope that built romantasy. When two people who
        should be killing each other keep, well, <em>not</em> doing that, every
        glance turns into a fight and every fight turns into something else. The
        eight below range across the spectrum &mdash; captor-captive, sworn
        rivals, spy-and-target &mdash; but they all earn the romance through the
        rivalry first.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>
        The blueprint for a generation: a mortal huntress taken captive by the fae
        lord whose lands she trespassed, and a hatred that thaws by degrees. The
        template most of this list is built on &mdash; more read-alikes in our{" "}
        <Link href="/reading-room/books-like-a-court-of-thorns-and-roses">
          books like ACOTAR
        </Link>{" "}
        guide.
      </p>

      <h2>2. Fourth Wing — Rebecca Yarros</h2>
      <p>
        Violet and Xaden start as political enemies at a dragon-rider war college
        &mdash; his family killed for a rebellion hers put down &mdash; and the
        banter carries the whole slow burn. For more of that flight, see our{" "}
        <Link href="/reading-room/romantasy-books-with-dragons">
          romantasy books with dragons
        </Link>{" "}
        list.
      </p>

      <h2>3. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>
        A sheltered maiden and the guard sworn to protect her &mdash; duty against
        desire, dialed all the way up, with a twist that makes the enemies part
        cut deeper.
      </p>

      <h2>4. The Cruel Prince — Holly Black</h2>
      <p>
        Jude and Cardan trade contempt like currency in a fae court built on
        cruelty. Sharp, scheming, and the most poisonous rivalry here &mdash; the
        hate is completely believable, which is exactly why the turn lands.
      </p>

      <h2>5. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>
        A witch and a witch-hunter forced into marriage, on opposite sides of a
        holy war and under one roof. The enemies part isn&rsquo;t a pose &mdash;
        each could genuinely get the other killed.
      </p>

      <h2>6. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>
        A warrior princess is sent to spy on and betray the enemy king she&rsquo;s
        been trained to destroy &mdash; then starts to respect him. A real slow
        burn with espionage stakes underneath.
      </p>

      <h2>7. A Touch of Darkness — Scarlett St. Clair</h2>
      <p>
        Hades and Persephone reimagined: a goddess of spring and the god of the
        dead she swears she hates, locked in a wager neither will lose gracefully.
        The steamiest pick on this list.
      </p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>
        Bryce and Hunt circle each other for an entire book, all prickly banter
        and refusal to admit anything. The wait is the whole point &mdash; and the
        payoff is worth it.
      </p>

      <h2>Start the fight</h2>
      <p>
        Want the tension turned up further? Our{" "}
        <Link href="/reading-room/spicy-romantasy-books">
          spicy romantasy books
        </Link>{" "}
        guide sorts by heat. Browse our{" "}
        <Link href="/shop">romantasy shelves</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> you want enemies-to-lovers with
        a real slow burn. Newer to the genre? Begin with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          best romantasy guide
        </Link>
        .
      </p>
    </>
  );
}
