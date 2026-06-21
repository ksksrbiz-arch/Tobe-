import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-beach-reads-summer",
  title: "The best beach reads: 10 summer books you'll tear through",
  description:
    "The best beach reads for summer — breezy romance, gripping thrillers, and big-hearted fiction you'll finish in a weekend. Ten page-turners with a note on each.",
  excerpt:
    "Sun, sand, and a book you can't put down. Ten beach reads — romance, thrillers, and feel-good fiction — picked for pure momentum and minimal homework.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Gift guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        A beach read has one job: pull you in and not let go. Low homework, high
        momentum, easy to pick back up after a swim. Here are ten — across
        romance, thriller, and feel-good fiction — that deliver all summer long.
      </p>

      <h2>Breezy romance</h2>
      <ul>
        <li><strong>Beach Read — Emily Henry.</strong> Two rival writers, one summer. The genre&rsquo;s reigning queen.</li>
        <li><strong>The Love Hypothesis — Ali Hazelwood.</strong> A fake-dating STEM rom-com that&rsquo;s pure serotonin.</li>
        <li><strong>Happy Place — Emily Henry.</strong> Exes faking it for one last group vacation. Bittersweet and sunny.</li>
      </ul>

      <h2>Can&rsquo;t-put-it-down thrillers</h2>
      <ul>
        <li><strong>The Housemaid — Freida McFadden.</strong> Twisty, fast, and impossible to stop.</li>
        <li><strong>The Silent Patient — Alex Michaelides.</strong> A psychological thriller with a knockout ending.</li>
        <li><strong>The Guest List — Lucy Foley.</strong> A wedding, an island, and a body. Perfect summer suspense.</li>
      </ul>

      <h2>Big-hearted fiction</h2>
      <ul>
        <li><strong>Where the Crawdads Sing — Delia Owens.</strong> Atmosphere, mystery, and a marsh you can feel.</li>
        <li><strong>Remarkably Bright Creatures — Shelby Van Pelt.</strong> Warm, funny, and quietly moving.</li>
        <li><strong>The Midnight Library — Matt Haig.</strong> A high-concept charmer you&rsquo;ll finish in a sitting.</li>
        <li><strong>Lessons in Chemistry — Bonnie Garmus.</strong> Smart, sharp, and crowd-pleasing.</li>
      </ul>

      <h2>Pack your bag</h2>
      <p>
        Used paperbacks are the ideal beach companion — cheap, light, and no
        worries if they get a little sandy. Stock up on our{" "}
        <Link href="/shop">shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for your perfect summer read,
        or browse{" "}
        <Link href="/reading-room/romance-for-people-who-dont-read-romance">romance for people who don&rsquo;t read romance</Link>.
      </p>
    </>
  );
}
