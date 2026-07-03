import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "fae-romantasy-books",
  title: "Fae romantasy books: 8 reads for courts, bargains & dangerous princes",
  description:
    "The best fae romantasy books — scheming courts, deadly bargains, and impossibly dangerous fae princes. Eight picks with a one-line note on each.",
  excerpt:
    "Glittering courts, bargains with a catch, and fae princes you absolutely should not trust — eight romantasy reads that live in faerie, ranked for the obsessed.",
  date: "2026-06-19",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Romantasy", "Fantasy"],
  readingMinutes: 4,
  items: [
    { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    { name: "The Cruel Prince", author: "Holly Black" },
    { name: "An Enchantment of Ravens", author: "Margaret Rogerson" },
    { name: "A Promise of Fire", author: "Amanda Bouchet" },
    { name: "Radiance", author: "Grace Draven" },
    { name: "The Wicked King", author: "Holly Black" },
    { name: "The Queen of Nothing", author: "Holly Black" },
    { name: "A Deal with the Elf King", author: "Elise Kova" },
    { name: "House of Earth and Blood (Crescent City)", author: "Sarah J. Maas" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        The genre-defining fae romantasy is A Court of Thorns and Roses by
        Sarah J. Maas — the book that launched a thousand others, built
        around scheming courts, masks, and a slow-burn romance.
      </QuickAnswer>
      <p>
        Faerie is romantasy&rsquo;s natural habitat: a place of beautiful,
        ruthless courts where every favor is a bargain and every prince is a
        problem. If you want glamour with teeth, start here.
      </p>

      <h2>1. A Court of Thorns and Roses — Sarah J. Maas</h2>
      <p>The fae romantasy that launched a thousand others. Courts, masks, and a slow-burn at the center.</p>

      <h2>2. The Cruel Prince — Holly Black</h2>
      <p>Mortal Jude claws for power in a fae court that despises her. Sharp, dark, and addictive.</p>

      <h2>3. An Enchantment of Ravens — Margaret Rogerson</h2>
      <p>A standalone: a human portrait artist and the autumn prince who can&rsquo;t feel. Gorgeous and contained.</p>

      <h2>4. A Promise of Fire — Amanda Bouchet</h2>
      <p>Magic, prophecy, and a soothsayer dragged along by a warlord. Banter-forward and steamy.</p>

      <h2>5. Radiance — Grace Draven</h2>
      <p>An arranged marriage between two people who find each other &ldquo;ugly.&rdquo; Tender, original, low-drama.</p>

      <h2>6. The Hawthorne Legacy of faerie — Holly Black&rsquo;s Folk of the Air</h2>
      <p>Continue Jude&rsquo;s story through <em>The Wicked King</em> and <em>The Queen of Nothing</em> — the trilogy only gets better.</p>

      <h2>7. A Deal with the Elf King — Elise Kova</h2>
      <p>A human sacrifice-bride and the elf king who needs her. Cozy-leaning fae romantasy.</p>

      <h2>8. House of Earth and Blood (Crescent City) — Sarah J. Maas</h2>
      <p>Fae among many species in a sprawling modern-fantasy world, with a mystery driving it all.</p>

      <h2>Strike a bargain</h2>
      <p>
        Browse our <Link href="/shop">romantasy shelves</Link> or ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for fae-court romantasy. New to
        the genre? Start with our{" "}
        <Link href="/reading-room/best-romantasy-books-to-start-with">best romantasy guide</Link>{" "}
        or our{" "}
        <Link href="/reading-room/books-like-a-court-of-thorns-and-roses">books like ACOTAR</Link> list.
      </p>
    </>
  );
}
