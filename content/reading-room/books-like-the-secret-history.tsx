import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "books-like-the-secret-history",
  title: "8 books like The Secret History for your next dark-academia binge",
  description:
    "Loved The Secret History? Here are eight dark-academia novels — secret societies, obsessive friendships, and beautiful dread — to read next, with a note on each.",
  excerpt:
    "Donna Tartt ruined you for normal campus novels. Here are eight dark-academia reads — secret societies, obsessive friendships, beautiful dread — to fill the hole she left.",
  date: "2026-06-19",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Dark academia", "Read-alikes"],
  readingMinutes: 6,
  items: [
    { name: "If We Were Villains", author: "M. L. Rio" },
    { name: "Babel", author: "R. F. Kuang" },
    { name: "Bunny", author: "Mona Awad" },
    { name: "Ninth House", author: "Leigh Bardugo" },
    { name: "The Maidens", author: "Alex Michaelides" },
    { name: "Catherine House", author: "Elisabeth Thomas" },
    { name: "A Lesson in Vengeance", author: "Victoria Lee" },
    { name: "Black Chalk", author: "Christopher J. Yates" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The closest read-alike is <em>If We Were Villains</em> by M. L. Rio,
        which follows seven Shakespeare students at an elite conservatory
        after one of them dies &mdash; the novel most readers reach for first
        because it matches The Secret History&rsquo;s mood so closely.
      </QuickAnswer>
      <p>
        There&rsquo;s a very specific ache that sets in after the last page of{" "}
        <em>The Secret History</em>: you want more cloistered classrooms, more
        beautiful and terrible friends, more of that creeping sense that
        knowledge has a body count. Good news &mdash; dark academia is a deep
        shelf, and if you want the full lay of the land, our guide to the{" "}
        <Link href="/reading-room/best-dark-academia-books">
          best dark academia books
        </Link>{" "}
        maps it out. Here are eight to reach for next.
      </p>

      <h2>1. If We Were Villains — M. L. Rio</h2>
      <p>
        Seven Shakespeare students at an elite conservatory; one death; a web of
        loyalty and performance so total the characters slip into iambic
        pentameter when the pressure spikes. It is the closest cousin to
        Tartt&rsquo;s novel in mood &mdash; that same intoxication with a beautiful,
        insular world &mdash; and the one most readers reach for first.
      </p>

      <h2>2. Babel — R. F. Kuang</h2>
      <p>
        Oxford, translation magic, and the violence underneath empire. Kuang keeps
        the candlelit-library atmosphere but points it outward: this is dark
        academia with a thesis, angrier and bigger in scope than most, about who
        the institution is really built to serve. Bring your feelings about
        prestige.
      </p>

      <h2>3. Bunny — Mona Awad</h2>
      <p>
        An MFA program, a clique of unbearably twee women who call each other
        &ldquo;Bunny,&rdquo; and a slow slide into surreal horror. It skewers the
        cultish belonging at the heart of <em>The Secret History</em> and then
        turns genuinely strange. Funny, unsettling, and unlike anything else here.
      </p>

      <h2>4. Ninth House — Leigh Bardugo</h2>
      <p>
        Yale&rsquo;s secret societies turn out to run on actual occult power, and
        the scholarship kid recruited to police them has already survived worse.
        Darker and more violent than Tartt, with a propulsive mystery engine &mdash;
        the pick when you want the dread plus a plot that yanks you forward.
      </p>

      <h2>5. The Maidens — Alex Michaelides</h2>
      <p>
        A Greek-tragedy-obsessed professor at Cambridge, a secret society of female
        students, and a string of murders. It is the most straightforwardly
        plot-driven title on this list &mdash; comfort food for the campus-thriller
        craving, best read fast and without too many questions.
      </p>

      <h2>6. Catherine House — Elisabeth Thomas</h2>
      <p>
        A reclusive, prestigious school cuts its students off from the outside
        world for three years and asks for total devotion &mdash; and gives
        something unnerving back. Atmospheric and quietly dreadful, it trades
        Tartt&rsquo;s murder plot for a creeping, dreamlike unease.
      </p>

      <h2>7. A Lesson in Vengeance — Victoria Lee</h2>
      <p>
        A haunted boarding school, a witchy local history, and a grieving narrator
        you can&rsquo;t quite trust. Moodier and more gothic than most, with a
        sapphic slow burn threaded through the dread &mdash; the atmosphere is the
        whole point, and it delivers.
      </p>

      <h2>8. Black Chalk — Christopher J. Yates</h2>
      <p>
        Six Oxford students invent a game of escalating dares. Years later it is
        still being played, and the stakes have turned lethal. A slow, dread-soaked
        unraveling built on the exact <em>Secret History</em> question: what will
        clever, cruel young people do to each other when no one is watching?
      </p>

      <h2>Where to find them</h2>
      <p>
        Any of these might be waiting on our used shelves right now — and if a
        title isn&rsquo;t in, ask at the counter or browse{" "}
        <Link href="/shop">our online selection</Link>. Not sure which to start
        with? Tell the <Link href="/#next-read">Next Read Matchmaker</Link> what
        you loved about <em>The Secret History</em> and let it pick. When you&rsquo;re
        done, bring them back to <Link href="/trade">trade for credit</Link>{" "}
        toward the next obsession. If it was the fantasy threads in{" "}
        <em>Babel</em> and <em>Ninth House</em> that pulled you in, our lists of{" "}
        <Link href="/reading-room/books-like-dune">books like Dune</Link> and{" "}
        <Link href="/reading-room/books-like-a-court-of-thorns-and-roses">
          books like A Court of Thorns and Roses
        </Link>{" "}
        go further in that direction.
      </p>
    </>
  );
}
