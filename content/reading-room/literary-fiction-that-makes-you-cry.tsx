import React from "react";
import Link from "next/link";
import QuickAnswer from "@/components/QuickAnswer";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "literary-fiction-that-makes-you-cry",
  title: "8 literary novels that will make you cry (in the good way)",
  description:
    "Looking for a book that earns its tears? Eight literary novels — grief, love, and grace — that wreck readers in the most cathartic way, with a line on each.",
  excerpt:
    "Sometimes you want a book that earns its tears. Eight literary novels that wreck readers in the most cathartic, can't-stop-thinking-about-it way.",
  date: "2026-06-11",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Literary fiction", "Genre guide"],
  readingMinutes: 5,
  items: [
    { name: "A Little Life", author: "Hanya Yanagihara" },
    { name: "A Man Called Ove", author: "Fredrik Backman" },
    { name: "Never Let Me Go", author: "Kazuo Ishiguro" },
    { name: "The Heart's Invisible Furies", author: "John Boyne" },
    { name: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin" },
    { name: "Hamnet", author: "Maggie O'Farrell" },
    { name: "The Book Thief", author: "Markus Zusak" },
    { name: "Crying in H Mart", author: "Michelle Zauner" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        If you only pick one, start with <em>A Little Life</em> by Hanya
        Yanagihara — the heavyweight champion of devastating novels, beautiful
        and harrowing.
      </QuickAnswer>
      <p>
        There&rsquo;s a particular kind of reading mood — not sad, exactly, but
        ready to be moved. Books that go straight for the heart and leave you
        better for it. If you want a novel that earns its tears, here are eight.
      </p>

      <h2>1. A Little Life — Hanya Yanagihara</h2>
      <p>
        The heavyweight champion of devastating novels. Beautiful, harrowing, and
        not for the faint of heart — go in prepared.
      </p>

      <h2>2. A Man Called Ove — Fredrik Backman</h2>
      <p>
        A curmudgeon, a community, and a gentler kind of heartbreak. The tears
        here come with a lot of warmth.
      </p>

      <h2>3. Never Let Me Go — Kazuo Ishiguro</h2>
      <p>
        Quiet, restrained, and quietly shattering. The grief sneaks up and then
        stays for days.
      </p>

      <h2>4. The Heart&rsquo;s Invisible Furies — John Boyne</h2>
      <p>
        A sweeping Irish life story, funny and tragic by turns. You&rsquo;ll laugh
        right up until you don&rsquo;t.
      </p>

      <h2>5. Tomorrow, and Tomorrow, and Tomorrow — Gabrielle Zevin</h2>
      <p>
        Friendship, creativity, and loss, told across decades. Aches in the way
        only stories about long love (of all kinds) can.
      </p>

      <h2>6. Hamnet — Maggie O&rsquo;Farrell</h2>
      <p>
        A mother&rsquo;s grief in Shakespeare&rsquo;s England. The final chapters
        are among the most moving in recent fiction.
      </p>

      <h2>7. The Book Thief — Markus Zusak</h2>
      <p>
        Narrated by Death, set in Nazi Germany, and somehow full of light. A
        modern classic that wrecks readers of every age.
      </p>

      <h2>8. Crying in H Mart — Michelle Zauner</h2>
      <p>
        A memoir of grief, food, and a mother-daughter bond. Proof that the most
        cathartic cry can come from a true story.
      </p>

      <h2>When you&rsquo;re ready</h2>
      <p>
        A good cathartic read is best with tea and no plans. Find one on{" "}
        <Link href="/shop">our shelves</Link>, or tell the{" "}
        <Link href="/#next-read">Next Read Matchmaker</Link> the last book that
        moved you and let it find the next. When you&rsquo;ve recovered,{" "}
        <Link href="/trade">trade it forward</Link> so it can wreck someone else.
        Several of these overlap with our{" "}
        <Link href="/reading-room/best-book-club-books">
          best book club books
        </Link>{" "}
        list, if you want picks that spark discussion too.
      </p>
    </>
  );
}
