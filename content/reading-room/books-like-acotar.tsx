import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-a-court-of-thorns-and-roses",
  title: "8 books like A Court of Thorns and Roses (ACOTAR)",
  description:
    "Finished ACOTAR and need more fae, romance, and high stakes? Eight romantasy books like A Court of Thorns and Roses to read next, with a note on each.",
  excerpt:
    "Fae courts, a slow-burn that levels you, and a heroine who grows into her power. If ACOTAR left a hole in your chest, here are eight books to fill it.",
  date: "2026-05-29",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Read-alikes"],
  readingMinutes: 5,
  items: [
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "From Blood and Ash", author: "Jennifer L. Armentrout" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "A Deal with the Elf King", author: "Elise Kova" },
    { name: "Serpent & Dove", author: "Shelby Mahurin" },
    { name: "The Serpent and the Wings of Night", author: "Carissa Broadbent" },
    { name: "Crescent City", author: "Sarah J. Maas" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        For ACOTAR fans, the closest read-alikes are Fourth Wing by Rebecca
        Yarros &mdash; dragons, deadly trials, and the other titan of the
        romantasy genre &mdash; and From Blood and Ash by Jennifer L. Armentrout,
        a forbidden romance tailor-made for ACOTAR readers. Want to stay in fae
        courts? Jump to Holly Black&rsquo;s The Cruel Prince.
      </QuickAnswer>
      <p>
        Sarah J. Maas&rsquo;s <em>A Court of Thorns and Roses</em> set the
        template for modern romantasy: fae courts with a knife behind every
        smile, a mortal heroine coming into power, and a romance that rearranges
        your whole personality. The eight below each pick up one thread of that
        &mdash; the dangerous fae bargain, the enemies-to-lovers charge, the
        grown-up stakes &mdash; and run with it.
      </p>

      <h2>1. Fourth Wing — Rebecca Yarros</h2>
      <p>
        The other titan of the genre. Swap fae courts for a dragon-rider war
        college and you get the same underestimated heroine, crackling banter,
        and a slow burn that finally detonates. If you loved the dragons most,
        see our{" "}
        <Link href="/reading-room/romantasy-books-with-dragons">
          romantasy books with dragons
        </Link>{" "}
        list.
      </p>

      <h2>2. From Blood and Ash — Jennifer L. Armentrout</h2>
      <p>
        A sheltered &ldquo;Maiden&rdquo; and the guard forbidden to want her, plus
        a mid-book twist that flips the whole board. It scratches the same
        forbidden-romance-and-worldbuilding itch ACOTAR does, at a faster clip.
      </p>

      <h2>3. Throne of Glass — Sarah J. Maas</h2>
      <p>
        More Maas, more sprawl: an assassin, a competition, and a series that
        grows from court intrigue into full epic fantasy. If you want to live in
        one world for months, this is the commitment.
      </p>

      <h2>4. The Cruel Prince — Holly Black</h2>
      <p>
        The sharpest fae court on this list. Mortal Jude claws for power among
        faeries who despise her, and her feud with Cardan is contempt that
        curdles into something else &mdash; the enemies-to-lovers hook, done
        meaner and smarter.
      </p>

      <h2>5. A Deal with the Elf King — Elise Kova</h2>
      <p>
        A human is bargained away to a fae king &mdash; the beating heart of
        ACOTAR&rsquo;s premise, in a tighter standalone with lower heat. Good when
        you want the fae-romance core without a multi-book commitment.
      </p>

      <h2>6. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>
        A witch and the witch-hunter she&rsquo;s forced to marry, on opposite
        sides of a holy war. Enemies-to-lovers with real heat and a
        marriage-of-inconvenience that slowly turns genuine.
      </p>

      <h2>7. The Serpent and the Wings of Night — Carissa Broadbent</h2>
      <p>
        A deadly tournament, a vampire rival you&rsquo;ll root for, and the same
        atmospheric dread ACOTAR gets right Under the Mountain. Addictive, and the
        first of a series if you want more.
      </p>

      <h2>8. Crescent City — Sarah J. Maas</h2>
      <p>
        For grown-up stakes: an adult heroine, a murder mystery threaded through
        the romance, and Maas&rsquo;s trademark slow burn stretched to its
        breaking point with Hunt.
      </p>

      <h2>Find your next court</h2>
      <p>
        If it was the fae specifically, our{" "}
        <Link href="/reading-room/fae-romantasy-books">fae romantasy books</Link>{" "}
        guide goes deeper, and our{" "}
        <Link href="/reading-room/enemies-to-lovers-romantasy">
          enemies-to-lovers romantasy
        </Link>{" "}
        list covers the tension. Romantasy is one of our best-selling sections,
        so the shelf turns over fast &mdash;{" "}
        <Link href="/visit">come browse in person</Link> or shop{" "}
        <Link href="/shop">online</Link>, and{" "}
        <Link href="/trade">trade finished series back</Link> for the next. New
        here? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>
        , or see{" "}
        <Link href="/reading-room/books-like-fourth-wing">books like Fourth Wing</Link>.
      </p>
    </>
  );
}
