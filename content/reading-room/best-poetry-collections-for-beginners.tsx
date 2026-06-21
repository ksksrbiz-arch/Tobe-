import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "best-poetry-collections-for-beginners",
  title: "Best poetry collections for beginners: an approachable start",
  description:
    "New to poetry? Five welcoming collections — from Mary Oliver's Devotions to Billy Collins — that make a wonderful, unintimidating place to begin.",
  excerpt:
    "Poetry without the homework. Five approachable collections that make a warm, welcoming place to start reading verse.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Genre guide", "Recommendations"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        If poetry feels like a locked room from a high-school English class, good
        news: plenty of it is warm, clear, and immediate. These five collections
        ask nothing but your attention and give a lot back — a perfect place to
        begin.
      </p>

      <h2>Milk and Honey — Rupi Kaur</h2>
      <p>
        Short, direct, and intensely felt poems on love, loss, and healing. The
        book that brought a whole generation to poetry — and an easy, encouraging
        first step.
      </p>

      <h2>Devotions — Mary Oliver</h2>
      <p>
        A career-spanning selection from one of the most beloved American poets.
        Oliver&rsquo;s clear-eyed wonder at the natural world is the gentlest
        possible on-ramp to verse. Start with &ldquo;Wild Geese.&rdquo;
      </p>

      <h2>The Sun and Her Flowers — Rupi Kaur</h2>
      <p>
        Kaur&rsquo;s follow-up, organized like a blooming and wilting flower.
        Accessible and emotionally generous — a natural next step if{" "}
        <em>Milk and Honey</em> lands for you.
      </p>

      <h2>Citizen — Claudia Rankine</h2>
      <p>
        A genre-bending book-length poem on race and everyday life in America.
        Urgent, lucid, and unforgettable — proof that poetry can speak directly
        to the present moment.
      </p>

      <h2>Selected Poems — Billy Collins</h2>
      <p>
        Witty, conversational, and quietly profound, Collins is a former U.S.
        Poet Laureate who writes like he&rsquo;s talking just to you. Maybe the
        friendliest doorway in all of poetry.
      </p>

      <h2>How to read poetry</h2>
      <p>
        Read slowly, and read aloud if you can — poems are built for the ear. You
        don&rsquo;t need to &ldquo;solve&rdquo; a poem; let one or two lines stay
        with you and call that a win. A single page a day is a lovely habit.
      </p>

      <h2>Find your first collection</h2>
      <p>
        Browse <Link href="/shop">our shelves</Link> or{" "}
        <Link href="/visit">come see us in Milwaukie</Link> and we&rsquo;ll help
        you choose. Poetry makes a wonderful{" "}
        <Link href="/reading-room/gifts-for-book-lovers">
          gift for a book lover
        </Link>
        , and if you&rsquo;d rather start with prose, our{" "}
        <Link href="/reading-room/best-short-story-collections">
          short story picks
        </Link>{" "}
        are another gentle entry point. Ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for a nudge, and trade your
        collection forward for credit when you&rsquo;re ready.
      </p>
    </>
  );
}
