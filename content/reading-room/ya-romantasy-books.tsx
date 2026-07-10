import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "ya-romantasy-books",
  title: "YA romantasy books: 8 young-adult fantasy romances to start with",
  description:
    "The best YA romantasy books — young-adult fantasy romance with lower spice and big feelings. Eight picks for teens and crossover readers, with a note on each.",
  excerpt:
    "Fantasy worlds, first love, and lower heat — eight YA romantasy reads perfect for teen readers and grown-ups who want the swoon without the steam.",
  date: "2026-06-21",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy", "Genre guide"],
  readingMinutes: 5,
  items: [
    { name: "Shadow and Bone", author: "Leigh Bardugo" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "An Ember in the Ashes", author: "Sabaa Tahir" },
    { name: "Children of Blood and Bone", author: "Tomi Adeyemi" },
    { name: "Caraval", author: "Stephanie Garber" },
    { name: "Throne of Glass", author: "Sarah J. Maas" },
    { name: "Serpent & Dove", author: "Shelby Mahurin" },
    { name: "These Violent Delights", author: "Chloe Gong" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Shadow and Bone is the natural starting point: the Grishaverse opener
        about a soldier with a hidden power, and a modern YA staple. The Cruel
        Prince is a sharper, more addictive second pick.
      </QuickAnswer>
      <p>
        Young-adult romantasy is where a lot of readers fall in love with the
        genre: big feelings, vivid worlds, and romance that keeps the heat lower.
        Great for teens &mdash; and for adults who want the swoon without the
        spice. A note up front: within YA, darkness varies a lot, so each pick
        below flags roughly who it suits.
      </p>

      <h2>1. Shadow and Bone — Leigh Bardugo</h2>
      <p>
        The Grishaverse opener: an orphan soldier discovers a rare power and gets
        swept up by the magnetic, dangerous Darkling. A gateway into one of the
        richest YA fantasy worlds going, and low on spice.
      </p>

      <h2>2. The Cruel Prince — Holly Black</h2>
      <p>
        Mortal Jude survives a cruel fae court by out-scheming it, trading venom
        with wicked Prince Cardan. Sharp, addictive, and the enemies-to-lovers
        gateway drug for many &mdash; more of that in our{" "}
        <Link href="/reading-room/enemies-to-lovers-romantasy">
          enemies-to-lovers romantasy
        </Link>{" "}
        list.
      </p>

      <h2>3. An Ember in the Ashes — Sabaa Tahir</h2>
      <p>
        A brutal Rome-inspired empire, dual POVs, and impossible choices. More
        fantasy than romance, but the slow-burn thread and high stakes make it a
        crossover favorite. Best for older teens.
      </p>

      <h2>4. Children of Blood and Bone — Tomi Adeyemi</h2>
      <p>
        West-African-inspired magic, a fight to bring it back, and a slow burn
        that crosses enemy lines. Sweeping and emotional, with real weight behind
        the romance.
      </p>

      <h2>5. Caraval — Stephanie Garber</h2>
      <p>
        Two sisters and a magical, dangerous game where nothing is quite real.
        Whimsical and romantic with a genuinely low heat level &mdash; a good fit
        for younger teens.
      </p>

      <h2>6. Throne of Glass — Sarah J. Maas</h2>
      <p>
        An assassin competes for her freedom in a deadly royal contest. Maas&rsquo;s
        series that starts YA and grows into epic fantasy &mdash; a natural bridge
        toward her adult work. If they&rsquo;re ready for more, our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">
          romantasy starter guide
        </Link>{" "}
        points the way.
      </p>

      <h2>7. Serpent &amp; Dove — Shelby Mahurin</h2>
      <p>
        A witch and a witch-hunter forced to marry, on opposite sides of a war.
        Enemies-to-lovers with strong crossover appeal &mdash; leans older-YA on
        heat.
      </p>

      <h2>8. These Violent Delights — Chloe Gong</h2>
      <p>
        Romeo and Juliet reimagined in 1920s Shanghai, with rival gangs and a
        monster in the river. Atmospheric, romantic, and pitched at older teens.
      </p>

      <h2>A note for parents</h2>
      <p>
        YA spans a wide age range; heat and darkness vary a lot between titles. If
        you&rsquo;re buying for a younger teen, skim a content-warning list or ask
        us in-store and we&rsquo;ll point you to the right fit.
      </p>

      <h2>Start the journey</h2>
      <p>
        Find these on our <Link href="/shop">shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for YA romantasy. Want lower
        spice across the board? See our{" "}
        <Link href="/reading-room/clean-romantasy-low-spice">
          clean romantasy guide
        </Link>{" "}
        or our{" "}
        <Link href="/reading-room/fantasy-books-for-beginners">
          fantasy starter list
        </Link>
        .
      </p>
    </>
  );
}
