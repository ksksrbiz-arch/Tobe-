import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "short-books-to-finish-in-a-weekend",
  title: "9 short books you can finish in a weekend",
  description:
    "Want the satisfaction of finishing a book? Nine short novels under ~250 pages — punchy, powerful, and perfect for a weekend or a reading slump.",
  excerpt:
    "Nothing breaks a reading slump like actually finishing something. Nine short, powerful books — most under 250 pages — you can polish off in a weekend.",
  date: "2026-06-07",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Reading habits"],
  readingMinutes: 4,
  items: [
    { name: "Of Mice and Men", author: "John Steinbeck" },
    { name: "The Old Man and the Sea", author: "Ernest Hemingway" },
    { name: "Convenience Store Woman", author: "Sayaka Murata" },
    { name: "We Have Always Lived in the Castle", author: "Shirley Jackson" },
    { name: "The Stranger", author: "Albert Camus" },
    { name: "Animal Farm", author: "George Orwell" },
    { name: "Train Dreams", author: "Denis Johnson" },
    { name: "The Body", author: "Stephen King" },
    { name: "So Long, See You Tomorrow", author: "William Maxwell" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        For a single afternoon, start with Of Mice and Men: a perfect,
        devastating little novel. The Old Man and the Sea is another spare,
        elemental option if you want Hemingway at his most distilled.
      </QuickAnswer>
      <p>
        Sometimes the best cure for a reading slump is the simple satisfaction of
        finishing something. These nine short books — most under 250 pages — pack
        a full punch into a weekend&rsquo;s reading.
      </p>

      <h2>1. Of Mice and Men — John Steinbeck</h2>
      <p>A perfect, devastating little novel you can read in an afternoon.</p>

      <h2>2. The Old Man and the Sea — Ernest Hemingway</h2>
      <p>Spare, elemental, and unforgettable. Hemingway at his most distilled.</p>

      <h2>3. Convenience Store Woman — Sayaka Murata</h2>
      <p>Strange, funny, and quietly radical. A quick, singular read.</p>

      <h2>4. We Have Always Lived in the Castle — Shirley Jackson</h2>
      <p>Gothic, eerie, and delicious. The ideal one-sitting unsettler.</p>

      <h2>5. The Stranger — Albert Camus</h2>
      <p>Short, cool, and endlessly discussable. A philosophy seminar in 120 pages.</p>

      <h2>6. Animal Farm — George Orwell</h2>
      <p>A fable that still bites. You&rsquo;ll finish it in a sitting and think about it for weeks.</p>

      <h2>7. Train Dreams — Denis Johnson</h2>
      <p>A whole American life in a hundred luminous pages. Quietly perfect.</p>

      <h2>8. The Body — Stephen King</h2>
      <p>The novella behind <em>Stand By Me</em> — nostalgic, moving, and brisk.</p>

      <h2>9. Breasts and Eggs? Start smaller: So Long, See You Tomorrow — William Maxwell</h2>
      <p>A slim, aching masterpiece about memory and regret. Under 150 pages.</p>

      <h2>Beat the slump</h2>
      <p>
        Short books are perfect for trading — read three in the time one
        doorstopper would take, then <Link href="/trade">swap them for credit</Link>.
        Browse <Link href="/shop">our shelves</Link>, or tell the{" "}
        <Link href="/#next-read">Matchmaker</Link> you want something short and
        powerful. For more on beating a slump, see our{" "}
        <Link href="/reading-room/build-a-reading-habit-tbr-pile">
          guide to building a reading habit
        </Link>
        .
      </p>
    </>
  );
}
