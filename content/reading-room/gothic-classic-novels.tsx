import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "gothic-classic-novels",
  title: "Gothic classic novels: 8 atmospheric reads for a stormy night",
  description:
    "The best gothic classic novels — crumbling houses, buried secrets, and dread that creeps. Eight atmospheric classics with a one-line note on each.",
  excerpt:
    "Crumbling estates, buried secrets, and a dread that seeps in slowly — eight gothic classics that built the genre, perfect for a stormy night and a heavy blanket.",
  date: "2026-06-17",
  updated: "2026-07-10",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Genre guide"],
  readingMinutes: 6,
  items: [
    { name: "Rebecca", author: "Daphne du Maurier" },
    { name: "Jane Eyre", author: "Charlotte Brontë" },
    { name: "Wuthering Heights", author: "Emily Brontë" },
    { name: "Dracula", author: "Bram Stoker" },
    { name: "Frankenstein", author: "Mary Shelley" },
    { name: "The Picture of Dorian Gray", author: "Oscar Wilde" },
    { name: "The Turn of the Screw", author: "Henry James" },
    { name: "We Have Always Lived in the Castle", author: "Shirley Jackson" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        Start with <em>Rebecca</em> by Daphne du Maurier — a new bride, a grand
        estate, and the dead first wife who still rules it. It&rsquo;s the gold
        standard of the genre and the easiest one to fall into on a dark evening.
      </QuickAnswer>
      <p>
        Gothic fiction runs on atmosphere: the old house with one locked room,
        the secret that won&rsquo;t stay buried, the sense that something is
        wrong before anything actually happens. The best of these books make you
        feel the damp and the dread before the plot even moves. These eight
        classics wrote the rules that every haunted-house movie and modern gothic
        thriller has been borrowing ever since.
      </p>

      <h2>1. Rebecca — Daphne du Maurier</h2>
      <p>
        A shy young bride arrives at Manderley and finds the house — and its
        housekeeper — still in thrall to the glamorous first wife who died before
        she came. Du Maurier never even gives the narrator a name, which is the
        whole trick: you&rsquo;re swallowed by Rebecca&rsquo;s memory right along
        with her. The gold standard, and a natural next step if you love the
        brooding romances in our{" "}
        <Link href="/reading-room/best-classic-romance-novels">classic romance novels</Link>{" "}
        list.
      </p>

      <h2>2. Jane Eyre — Charlotte Brontë</h2>
      <p>
        A plain, fierce governess, a brooding master, and a secret locked in the
        attic. It moves between romance and genuine dread without ever losing its
        moral spine — Jane refuses to shrink for anyone. It&rsquo;s also a proper
        Victorian doorstopper, so it doubles as a gateway into our{" "}
        <Link href="/reading-room/best-victorian-novels">best Victorian novels</Link>.
      </p>

      <h2>3. Wuthering Heights — Emily Brontë</h2>
      <p>
        Obsessive love and long revenge on the bleak Yorkshire moors, told
        through narrators who can&rsquo;t be fully trusted. This is less a romance
        than a haunting — Heathcliff and Cathy tear at each other across two
        generations, and the moor itself feels like a character.
      </p>

      <h2>4. Dracula — Bram Stoker</h2>
      <p>
        Told entirely in letters, diary entries, and newspaper clippings, it
        still builds real, creeping menace — the crumbling Transylvanian castle,
        the boxes of grave-dirt, the slow spread of something ancient into modern
        London. The scaffolding of nearly every vampire story since.
      </p>

      <h2>5. Frankenstein — Mary Shelley</h2>
      <p>
        The original science-gone-wrong tragedy, written by a teenager over a
        rainy Swiss summer, and far sadder than any movie suggests. The creature
        is articulate and abandoned, and the real horror is about responsibility.
        A cornerstone of gothic and of the sci-fi that followed — see our{" "}
        <Link href="/reading-room/best-classic-science-fiction-novels">classic science fiction novels</Link>{" "}
        for where that thread leads.
      </p>

      <h2>6. The Picture of Dorian Gray — Oscar Wilde</h2>
      <p>
        Vanity, corruption, and a portrait that ages in the attic so its owner
        never has to. Wilde is wickedly quotable on every page, but the rot
        underneath is real — a moral horror story dressed in beautiful clothes.
      </p>

      <h2>7. The Turn of the Screw — Henry James</h2>
      <p>
        A governess, two unnervingly poised children, and ghosts that may or may
        not exist outside her own head. Short, ambiguous, and deeply unsettling —
        James never lets you decide what&rsquo;s really happening, which is
        exactly the point.
      </p>

      <h2>8. We Have Always Lived in the Castle — Shirley Jackson</h2>
      <p>
        Mid-century but pure gothic: an isolated house, a family poisoning years
        past, and Merricat, one of the most unforgettable narrators in the genre.
        Jackson keeps it tense and strangely tender at once — the perfect closer
        because it shows how alive the gothic still is.
      </p>

      <h2>Light a candle</h2>
      <p>
        Gothic classics turn up constantly on used shelves, often in the kind of
        battered vintage editions that suit them. Find these on our{" "}
        <Link href="/shop">classics shelves</Link>, ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for something atmospheric to
        match your mood, or{" "}
        <Link href="/trade">trade your finished reads</Link> toward the next one.
        Want more? Browse our{" "}
        <Link href="/reading-room/classic-novels-everyone-should-read">classics everyone should read</Link>{" "}
        or the deeper cuts in our{" "}
        <Link href="/reading-room/underrated-classic-novels">underrated classics</Link>.
      </p>
    </>
  );
}
