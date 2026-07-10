import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "underrated-classic-novels",
  title: "8 underrated classic novels worth discovering",
  description:
    "Past the usual canon: eight underrated classic novels that deserve more readers — brilliant, moving, and overlooked — with a concrete reason to pick up each.",
  excerpt:
    "Everyone's read Gatsby. These eight underrated classics deserve the same love — brilliant, moving, and somehow still flying under the radar.",
  date: "2026-05-23",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Genre guide"],
  readingMinutes: 6,
  items: [
    { name: "Stoner", author: "John Williams" },
    { name: "The Death of Ivan Ilyich", author: "Leo Tolstoy" },
    { name: "Passing", author: "Nella Larsen" },
    { name: "The Enchanted April", author: "Elizabeth von Arnim" },
    { name: "So Long, See You Tomorrow", author: "William Maxwell" },
    { name: "The Pursuit of Love", author: "Nancy Mitford" },
    { name: "Giovanni's Room", author: "James Baldwin" },
    { name: "Cold Comfort Farm", author: "Stella Gibbons" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        <em>Stoner</em> is the standout: a quiet novel about an ordinary
        academic&rsquo;s life that turns out to be one of the most moving books
        you&rsquo;ll read. If you want something even shorter, <em>The Death of
        Ivan Ilyich</em> delivers the same gut-punch in under a hundred pages.
      </QuickAnswer>
      <p>
        Past the same dozen titles assigned in every classroom, the canon is
        full of overlooked gems &mdash; books that went out of print, or never
        got the film, or simply got crowded out. Here are eight underrated
        classics that deserve a much bigger audience, and why each one is worth
        your shelf space.
      </p>

      <h2>1. Stoner — John Williams</h2>
      <p>
        A Missouri farm boy becomes an English professor, has a hard marriage
        and a quiet career, and dies largely forgotten &mdash; and somehow it
        adds up to one of the most moving novels of the 20th century. Published
        in 1965 to near silence, it found its audience only decades later. Trust
        the slow build.
      </p>

      <h2>2. The Death of Ivan Ilyich — Leo Tolstoy</h2>
      <p>
        A successful judge falls ill and is forced, for the first time, to
        reckon with how he actually lived. It&rsquo;s short, piercing, and the
        most accessible door into Tolstoy &mdash; if the big Russians intimidate
        you, start here, then try our{" "}
        <Link href="/reading-room/russian-classic-novels-for-beginners">
          Russian classics for beginners
        </Link>
        .
      </p>

      <h2>3. Passing — Nella Larsen</h2>
      <p>
        Two light-skinned Black women reconnect in 1920s Harlem &mdash; one
        living as white, one not &mdash; in a slim, electric novel about
        identity, desire, and risk. It&rsquo;s barely 100 pages and startlingly
        modern. A key title in our{" "}
        <Link href="/reading-room/classic-novels-by-women-authors">
          classic novels by women
        </Link>
        {" "}guide.
      </p>

      <h2>4. The Enchanted April — Elizabeth von Arnim</h2>
      <p>
        Four very different Englishwomen rent an Italian castle for a month and
        are slowly restored by sun, wisteria, and distance from their lives.
        It&rsquo;s pure comfort with real feeling underneath &mdash; the reading
        equivalent of a warm afternoon. A delight.
      </p>

      <h2>5. So Long, See You Tomorrow — William Maxwell</h2>
      <p>
        An old man circles back to a murder from his Illinois boyhood and his
        own small failure of friendship around it. Under 150 pages, and every
        one of them is exact. An aching, near-perfect short novel about memory
        and regret.
      </p>

      <h2>6. The Pursuit of Love — Nancy Mitford</h2>
      <p>
        Witty, warm, and gleefully gossipy, following the romantic misadventures
        of the eccentric Radlett family between the wars. It&rsquo;s comfort
        reading with real bite. If you like its romance, try our{" "}
        <Link href="/reading-room/best-classic-romance-novels">
          classic romance novels that still hold up
        </Link>
        .
      </p>

      <h2>7. Giovanni&rsquo;s Room — James Baldwin</h2>
      <p>
        An American in 1950s Paris falls for an Italian bartender and can&rsquo;t
        bear what it means about himself. Spare, devastating, and morally
        fearless &mdash; Baldwin at his most intimate and essential. Short, but
        it stays with you for years.
      </p>

      <h2>8. Cold Comfort Farm — Stella Gibbons</h2>
      <p>
        A brisk, sensible young woman descends on her gloomy rural relatives and
        briskly sorts out their doom-laden lives. It&rsquo;s a hilarious parody
        of grim country novels &mdash; sharp, silly, and endlessly quotable.
        The perfect antidote after something heavy.
      </p>

      <h2>Discover something new-old</h2>
      <p>
        The joy of a used bookstore is stumbling on a classic you&rsquo;ve never
        heard of &mdash; the ones on this list turn up secondhand far more often
        than you&rsquo;d think. Browse <Link href="/shop">our shelves</Link>,
        ask the <Link href="/#next-read">Matchmaker</Link> for a hidden gem, and{" "}
        <Link href="/trade">trade your finished reads</Link> for the next. Want
        the short ones? See our{" "}
        <Link href="/reading-room/short-classic-novels-under-200-pages">
          short classics guide
        </Link>
        . For overlooked American titles, see our{" "}
        <Link href="/reading-room/american-classic-novels">
          guide to American classic novels
        </Link>
        .
      </p>
    </>
  );
}
