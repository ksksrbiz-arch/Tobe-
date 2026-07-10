import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "romantasy-for-fantasy-readers",
  title: "Romantasy for fantasy readers: 7 picks heavy on the world-building",
  description:
    "A fantasy reader curious about romantasy? Seven romantasy books with serious world-building and plot — not just romance — to ease you in, with a note on each.",
  excerpt:
    "Love epic fantasy but side-eye the romance shelf? These seven romantasy reads bring real world-building and plot — the romance is a bonus, not the whole point.",
  date: "2026-05-25",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Genre guide"],
  readingMinutes: 5,
  items: [
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "The Bridge Kingdom", author: "Danielle L. Jensen" },
    { name: "An Ember in the Ashes", author: "Sabaa Tahir" },
    { name: "The Will of the Many", author: "James Islington" },
    { name: "Crescent City", author: "Sarah J. Maas" },
    { name: "The Jasmine Throne", author: "Tasha Suri" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        If you want one place to start, Fourth Wing is the pick: a brutal
        dragon-rider war college with real stakes and a propulsive plot,
        where the romance is a bonus rather than the point. The Cruel Prince
        is a strong second, trading dragons for cutthroat fae politics.
      </QuickAnswer>
      <p>
        If you came up on Tolkien and Sanderson, &ldquo;romantasy&rdquo; might
        sound like all kissing and no plot. Not these. The trick, for a fantasy
        reader, is starting with the books where the world would hold up even if
        you stripped the romance out — a real magic system, a map worth studying,
        stakes beyond who-ends-up-with-whom. Here are seven with the bones a
        fantasy reader wants, ordered loosely from most romance-forward to most
        fantasy-forward, so you can pick your comfort level.
      </p>

      <h2>1. Fourth Wing — Rebecca Yarros</h2>
      <p>
        A brutal dragon-rider war college where cadets die in the trials and the
        dragons choose their own riders. The plot is propulsive and the stakes are
        real — the romance is a bonus, not the engine. The obvious first step; if
        it lands, our{" "}
        <Link href="/reading-room/books-like-fourth-wing">
          books like Fourth Wing
        </Link>{" "}
        list keeps the dragons coming.
      </p>

      <h2>2. The Cruel Prince — Holly Black</h2>
      <p>
        Cutthroat fae politics, court scheming, and a mortal girl who decides to
        out-ruthless immortals. Plot-forward and sharp; the romance is the spice,
        not the meal. Sits right alongside the darker end of our{" "}
        <Link href="/reading-room/fae-romantasy-books">fae romantasy</Link> shelf.
      </p>

      <h2>3. The Bridge Kingdom — Danielle L. Jensen</h2>
      <p>
        A trained spy is married into the enemy court she&rsquo;s meant to help
        destroy — then starts to doubt which side deserves to win. Tight,
        clever plotting with a slow-burn running underneath rather than over the
        top of everything.
      </p>

      <h2>4. An Ember in the Ashes — Sabaa Tahir</h2>
      <p>
        A Rome-inspired empire at its most brutal, told in dual POVs — a soldier
        and a rebel spy — with genuinely high stakes. This is more fantasy than
        romance, and one of the best-built worlds on the list.
      </p>

      <h2>5. The Will of the Many — James Islington</h2>
      <p>
        The fantasy-forward outlier: an ingenious magic system built on ceding
        your own will up a hierarchy, a boarding-school-meets-conspiracy plot, and
        romance kept light. Pick this when you want the world-building dialed all
        the way up and the plot enormous.
      </p>

      <h2>6. Crescent City — Sarah J. Maas</h2>
      <p>
        A genuine murder-mystery engine and a sprawling, modern-feeling world
        alongside the romance — the most plot-driven of Maas&rsquo;s books and the
        best entry point for a reader who needs a case to solve, not just a couple
        to root for.
      </p>

      <h2>7. The Jasmine Throne — Tasha Suri</h2>
      <p>
        Lush, India-inspired epic fantasy with real political depth — a deposed
        princess and a maidservant with hidden power — and a sapphic romance woven
        through the rebellion rather than pasted on top. Ambitious and beautifully
        written.
      </p>

      <h2>Cross the aisle</h2>
      <p>
        Browse our <Link href="/shop">shelves</Link> or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> you want romantasy that&rsquo;s
        heavy on plot. Coming from pure fantasy? Pair this with our{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">fantasy starter guide</Link>{" "}
        or <Link href="/reading-room/books-like-dune">books like Dune</Link>.
      </p>
    </>
  );
}
