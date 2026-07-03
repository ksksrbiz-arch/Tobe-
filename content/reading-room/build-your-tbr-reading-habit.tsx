import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "build-a-reading-habit-tbr-pile",
  title: "How to build a reading habit (and a TBR pile worth the name)",
  description:
    "Want to read more? Here's a practical, guilt-free approach to building a reading habit and a to-be-read pile you'll actually get through — from a bookshop named for it.",
  excerpt:
    "We named the shop after the to-be-read pile, so we have opinions. Here's a practical, guilt-free way to read more and build a TBR you'll actually finish.",
  date: "2026-06-15",
  author: "To Be Read",
  tags: ["Reading habits", "TBR"],
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The most useful habit tip is to make reading stupidly easy to start:
        keep a book where you already are, such as the nightstand or your
        bag, since ten minutes before bed beats an ambitious hour you never
        get to.
      </QuickAnswer>
      <p>
        &ldquo;To be read&rdquo; — the TBR pile — is the most hopeful and most
        guilt-inducing object a reader owns. We named the shop after it, so we
        think about it a lot. Here&rsquo;s how to build a reading habit that
        actually sticks, and a pile that feels like possibility instead of
        pressure.
      </p>

      <h2>1. Make it stupidly easy to start</h2>
      <p>
        Habits form around low friction. Keep a book where you already are — on
        the nightstand, in your bag, by the kettle. Ten minutes before bed beats
        an ambitious hour you never get to. The goal is consistency, not volume.
      </p>

      <h2>2. Give yourself permission to quit books</h2>
      <p>
        The fastest way to kill a reading habit is to get stuck slogging through
        something you don&rsquo;t like out of obligation. Life is short and the
        shelves are long. If a book isn&rsquo;t working by page 50, set it free.
      </p>

      <h2>3. Keep the TBR small and physical</h2>
      <p>
        A 200-book digital wishlist is a to-do list, not a treat. Keep a shelf of
        five to ten books you genuinely intend to read next. When you finish one,
        you&rsquo;ve earned the trip to replace it.
      </p>

      <h2>4. Follow your taste, not the bestseller list</h2>
      <p>
        Reading more is easy when you&rsquo;re reading what you actually like. If
        you&rsquo;re not sure what that is right now, describe a book you loved to
        the <Link href="/#next-read">Next Read Matchmaker</Link> and let it find
        the next one.
      </p>

      <h2>5. Let books circulate</h2>
      <p>
        A healthy TBR pile is a flow, not a hoard. Finished books don&rsquo;t have
        to gather dust — <Link href="/trade">trade them for credit</Link>, and the
        pile pays for its own replacements. That&rsquo;s the whole idea behind the
        shop: books keep moving, and reading more never has to mean spending more.
      </p>

      <p>
        When your pile gets low, <Link href="/visit">come restock</Link> or browse{" "}
        <Link href="/shop">online</Link>. The next chapter&rsquo;s waiting.
      </p>
    </>
  );
}
