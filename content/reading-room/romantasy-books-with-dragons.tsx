import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "romantasy-books-with-dragons",
  title: "Romantasy books with dragons: 8 reads for the dragon-rider fix",
  description:
    "The best romantasy books with dragons — bonded riders, sentient dragons, and high-stakes flight. Eight picks beyond Fourth Wing, with a note on each.",
  excerpt:
    "Bonded riders, snarky sentient dragons, and battles fought from the saddle — eight romantasy books that scratch the dragon-rider itch long after Fourth Wing.",
  date: "2026-06-16",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "Fourth Wing", author: "Rebecca Yarros" },
    { name: "Iron Flame", author: "Rebecca Yarros" },
    { name: "His Majesty's Dragon", author: "Naomi Novik" },
    { name: "Eragon", author: "Christopher Paolini" },
    { name: "Joust", author: "Mercedes Lackey" },
    { name: "A Promise of Fire", author: "Amanda Bouchet" },
    { name: "The Priory of the Orange Tree", author: "Samantha Shannon" },
    { name: "Talon", author: "Julie Kagawa" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Start with <em>Fourth Wing</em> by Rebecca Yarros — the book that
        started the current romantasy dragon-rider craze, set at a war college
        with a deadly bond and dragons with opinions.
      </QuickAnswer>
      <p>
        Fourth Wing put dragons back at the center of romantasy, but the
        dragon-rider fantasy is older and deeper than one series. If you want the
        bond, the flight, and the romance, here are eight to fly off with.
      </p>

      <h2>1. Fourth Wing — Rebecca Yarros</h2>
      <p>The one that started the stampede. A war college, a deadly bond, and dragons with opinions.</p>

      <h2>2. Iron Flame — Rebecca Yarros</h2>
      <p>The sequel raises the stakes and the dragon count. Read it right after book one.</p>

      <h2>3. His Majesty&rsquo;s Dragon — Naomi Novik</h2>
      <p>Napoleonic war fought with an aerial dragon corps. The Temeraire bond is pure heart.</p>

      <h2>4. Eragon — Christopher Paolini</h2>
      <p>The classic farm-boy-and-his-dragon epic. Lighter on romance, heavy on the bond.</p>

      <h2>5. Joust — Mercedes Lackey</h2>
      <p>A servant boy secretly raises his own dragon. Quieter, but the dragon-rearing detail is the draw.</p>

      <h2>6. A Promise of Fire — Amanda Bouchet</h2>
      <p>Less dragon-centric, but the magic, prophecy, and slow-burn romance hit the same notes.</p>

      <h2>7. The Priory of the Orange Tree — Samantha Shannon</h2>
      <p>Epic standalone with sea-dragons, queens, and a sapphic romance woven through.</p>

      <h2>8. Talon — Julie Kagawa</h2>
      <p>Dragons hiding in human form in the modern world. YA-leaning, with a forbidden romance.</p>

      <h2>Take to the sky</h2>
      <p>
        Find your next ride on our <Link href="/shop">shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for dragon romantasy. Loved
        Fourth Wing? Try our{" "}
        <Link href="/reading-room/books-like-fourth-wing">books like Fourth Wing</Link>{" "}
        list or{" "}
        <Link href="/reading-room/romantasy-for-fantasy-readers">romantasy for fantasy readers</Link>.
      </p>
    </>
  );
}
