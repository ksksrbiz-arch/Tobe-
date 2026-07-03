import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "cozy-mystery-starter-shelf",
  title: "The cozy mystery starter shelf: 7 series to curl up with",
  description:
    "New to cozy mysteries? Seven beginner-friendly series — amateur sleuths, small towns, low gore, high comfort — from Agatha Christie to Richard Osman.",
  excerpt:
    "Murder, but make it comforting. Seven beginner-friendly cozy-mystery series — amateur sleuths, small towns, tea and cake, no gore — to start your collection.",
  date: "2026-06-17",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Cozy mystery", "Genre guide"],
  readingMinutes: 4,
  items: [
    { name: "The Thursday Murder Club", author: "Richard Osman" },
    { name: "Miss Marple", author: "Agatha Christie" },
    { name: "Chief Inspector Gamache", author: "Louise Penny" },
    { name: "Flavia de Luce", author: "Alan Bradley" },
    { name: "The No. 1 Ladies' Detective Agency", author: "Alexander McCall Smith" },
    { name: "Vera Wong's Unsolicited Advice for Murder", author: "Jesse Q. Sutanto" },
    { name: "Magpie Murders", author: "Anthony Horowitz" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The easiest series to start with is The Thursday Murder Club by
        Richard Osman — four retirees in an English village solve cold cases
        for fun, then stumble into a real one, and it&rsquo;s witty, warm, and
        the simplest possible on-ramp to cozy mysteries.
      </QuickAnswer>
      <p>
        The cozy mystery is a perfect contradiction: a murder you can read in the
        bath. Low on gore, high on charm — think amateur sleuths, nosy
        neighbors, a small town with too many secrets, and usually some very good
        food. Here&rsquo;s where to start.
      </p>

      <h2>1. The Thursday Murder Club — Richard Osman</h2>
      <p>
        Four retirees in an English village solve cold cases for fun, then stumble
        into a real one. Witty, warm, and wildly popular for good reason — the
        easiest possible on-ramp.
      </p>

      <h2>2. Miss Marple — Agatha Christie</h2>
      <p>
        The original cozy blueprint. An unassuming elderly woman who understands
        human nature better than any detective. Start with{" "}
        <em>The Body in the Library</em>.
      </p>

      <h2>3. Chief Inspector Gamache — Louise Penny</h2>
      <p>
        Set in the tiny Quebec village of Three Pines. A touch more literary and
        emotional than most cozies, but deeply comforting. Begin with{" "}
        <em>Still Life</em>.
      </p>

      <h2>4. Flavia de Luce — Alan Bradley</h2>
      <p>
        An eleven-year-old chemistry prodigy with a passion for poisons solves
        murders in 1950s England. Start with{" "}
        <em>The Sweetness at the Bottom of the Pie</em>.
      </p>

      <h2>5. The No. 1 Ladies&rsquo; Detective Agency — Alexander McCall Smith</h2>
      <p>
        Precious Ramotswe opens Botswana&rsquo;s first female-run detective
        agency. Gentle, humane, and more about people than puzzles.
      </p>

      <h2>6. Vera Wong&rsquo;s Unsolicited Advice for Murder — Jesse Q. Sutanto</h2>
      <p>
        A lonely tea-shop owner decides she can solve a murder better than the
        police — and adopts the suspects along the way. A newer, very funny
        standout.
      </p>

      <h2>7. Magpie Murders — Anthony Horowitz</h2>
      <p>
        A mystery nested inside a mystery, and a love letter to the whole genre.
        Best once you&rsquo;ve read a few classics and want something clever.
      </p>

      <h2>Building the shelf</h2>
      <p>
        Series are the cozy reader&rsquo;s natural habitat — which makes them
        perfect for trading. Read a few, bring them back, and{" "}
        <Link href="/trade">turn them into credit</Link> toward the next batch.
        Browse what&rsquo;s in now on <Link href="/shop">our shelves</Link>, or
        let the <Link href="/#next-read">Matchmaker</Link> point you to your next
        village full of suspects.
      </p>
    </>
  );
}
