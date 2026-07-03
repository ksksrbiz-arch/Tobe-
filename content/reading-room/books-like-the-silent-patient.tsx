import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "books-like-the-silent-patient",
  title: "Books Like The Silent Patient: 6 Twisty Thrillers to Read Next",
  description:
    "Loved The Silent Patient? Six psychological thrillers with unreliable narrators and gut-punch twists to read next — staff picks from our Milwaukie shop.",
  excerpt:
    "Unreliable narrators, slow-burn dread, and a final-page twist that flips the whole book. Six thrillers to read after The Silent Patient.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Read-alikes", "Recommendations"],
  readingMinutes: 4,
  items: [
    { name: "Gone Girl", author: "Gillian Flynn" },
    { name: "The Wife Between Us", author: "Greer Hendricks & Sarah Pekkanen" },
    { name: "Behind Closed Doors", author: "B. A. Paris" },
    { name: "The Woman in the Window", author: "A. J. Finn" },
    { name: "Verity", author: "Colleen Hoover" },
    { name: "The Silent Wife", author: "A. S. A. Harrison" },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Alex Michaelides built <em>The Silent Patient</em> around a single
        electrifying trick: a narrator you trust, a silence you can&rsquo;t crack,
        and a last-page twist that sends you flipping back to the start. If
        you&rsquo;re chasing that &ldquo;wait, what?&rdquo; feeling, here are six
        psychological thrillers we hand over with a knowing look.
      </p>

      <h2>1. Gone Girl — Gillian Flynn</h2>
      <p>
        The modern gold standard for the unreliable narrator and the midpoint twist
        that rewrites everything. A marriage curdles into something far worse. If you
        somehow haven&rsquo;t read it, start here.
      </p>

      <h2>2. The Wife Between Us — Greer Hendricks &amp; Sarah Pekkanen</h2>
      <p>
        A jealous ex, a soon-to-be bride, and a story that keeps pulling the rug out
        from under you. Engineered specifically for readers who think they&rsquo;ve
        guessed the ending — you haven&rsquo;t.
      </p>

      <h2>3. Behind Closed Doors — B. A. Paris</h2>
      <p>
        A marriage that looks perfect from the outside and is anything but within.
        Claustrophobic, fast, and genuinely unsettling — the kind of book you finish
        in one tense sitting.
      </p>

      <h2>4. The Woman in the Window — A. J. Finn</h2>
      <p>
        An agoraphobic woman watches her neighbors and witnesses something she
        can&rsquo;t prove. A loving homage to Hitchcock with a deeply unreliable
        narrator at its center.
      </p>

      <h2>5. Verity — Colleen Hoover</h2>
      <p>
        A struggling writer takes a job finishing an injured author&rsquo;s series and
        finds a manuscript she was never meant to read. Lurid, propulsive, and built
        around an ending readers still argue about.
      </p>

      <h2>6. The Silent Wife — A. S. A. Harrison</h2>
      <p>
        A long marriage comes apart, told in cool, alternating he-said/she-said
        chapters that tighten toward something inevitable. Quieter than the others,
        but the dread is just as deep.
      </p>

      <h2>Stock up for the next sleepless night</h2>
      <p>
        Thrillers are perfect trade-in fodder — read fast, bring them back for store
        credit, and grab the next one. Browse{" "}
        <Link href="/shop">what&rsquo;s on our shelves</Link>, raid our{" "}
        <Link href="/reading-room/best-thriller-books-to-keep-you-up">
          best thrillers to keep you up
        </Link>{" "}
        list, or tell the <Link href="/#next-read">Next Read Matchmaker</Link> what
        rattled you last. Closer to home? <Link href="/visit">Stop by</Link> our
        Milwaukie shop — free parking, no judgment about your TBR pile.
      </p>
    </>
  );
}
