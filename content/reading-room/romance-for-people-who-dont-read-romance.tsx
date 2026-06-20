import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "romance-novels-for-skeptics",
  title: "Romance novels for people who don't read romance",
  description:
    "Think romance isn't for you? These seven smart, funny, beautifully written novels are the perfect gateway — great stories that happen to have a love story at the center.",
  excerpt:
    "\"I don't really read romance.\" Famous last words. Seven smart, funny, genuinely great novels that make perfect gateway reads for the romance-skeptical.",
  date: "2026-06-09",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romance"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Romance is the best-selling fiction genre in the world, and yet so many
        readers say &ldquo;it&rsquo;s not for me&rdquo; before they&rsquo;ve
        really tried it. If that&rsquo;s you, here are seven gateway books —
        sharp, funny, and well-written, with a love story at the center rather
        than the whole of it.
      </p>

      <h2>1. Beach Read — Emily Henry</h2>
      <p>
        Two rival writers, one summer, plenty of banter. Henry is the modern
        on-ramp for a reason: witty, warm, and a little wise.
      </p>

      <h2>2. The Hating Game — Sally Thorne</h2>
      <p>
        The definitive enemies-to-lovers office comedy. Fast, funny, and almost
        impossible to put down.
      </p>

      <h2>3. Red, White &amp; Royal Blue — Casey McQuiston</h2>
      <p>
        A first son and a prince, a charming political rom-com with real heart.
        A gateway favorite for good reason.
      </p>

      <h2>4. The Kiss Quotient — Helen Hoang</h2>
      <p>
        Smart, steamy, and refreshingly specific, with a neurodivergent heroine.
        Proof of how much range the genre has.
      </p>

      <h2>5. Get a Life, Chloe Brown — Talia Hibbert</h2>
      <p>
        Funny, tender, and full of personality. The kind of book that makes you
        grin on the bus.
      </p>

      <h2>6. The Flatshare — Beth O&rsquo;Leary</h2>
      <p>
        Two strangers share a bed (on opposite schedules) and fall for each
        other via sticky notes. Charming and original.
      </p>

      <h2>7. Pride and Prejudice — Jane Austen</h2>
      <p>
        The blueprint for two centuries of the genre — and still one of the
        sharpest, funniest of them all.
      </p>

      <h2>Give it a try</h2>
      <p>
        Romance is perfect for trading — readers move through it fast, so it&rsquo;s
        cheap to sample widely. Browse <Link href="/shop">our shelves</Link>,
        ask the <Link href="/#next-read">Matchmaker</Link> for a pick in your
        comfort zone, and <Link href="/trade">trade them back</Link> for the next.
      </p>
    </>
  );
}
