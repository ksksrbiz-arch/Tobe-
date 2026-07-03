import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import QuickAnswer from "@/components/QuickAnswer";

export const meta: BlogMeta = {
  slug: "american-classic-novels",
  title: "American classic novels: 9 essential reads and where to start",
  description:
    "Nine essential American classic novels — from Gatsby to Beloved — with a one-line note on each and a suggestion for where to start if you're new to them.",
  excerpt:
    "The Great American Novel isn't one book — it's a shelf. Nine essential American classics, each with a note on what it's really about and why it still lands.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Reading guides", "Recommendations", "Classics", "Genre guide"],
  readingMinutes: 5,
  items: [
    { name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { name: "To Kill a Mockingbird", author: "Harper Lee" },
    { name: "Beloved", author: "Toni Morrison" },
    { name: "The Grapes of Wrath", author: "John Steinbeck" },
    { name: "The Sun Also Rises", author: "Ernest Hemingway" },
    { name: "Invisible Man", author: "Ralph Ellison" },
    { name: "East of Eden", author: "John Steinbeck" },
    { name: "Their Eyes Were Watching God", author: "Zora Neale Hurston" },
    { name: "The Catcher in the Rye", author: "J.D. Salinger" },
  ],
};

export default function Body() {
  return (
    <>
      <QuickAnswer>
        If you&rsquo;re new to American classics, start with The Great Gatsby by
        F. Scott Fitzgerald &mdash; short and dazzling &mdash; or To Kill a
        Mockingbird by Harper Lee, then work up to heavier reads like Beloved
        and Invisible Man.
      </QuickAnswer>
      <p>
        American fiction has been chasing &ldquo;the Great American Novel&rdquo;
        for over a century, and the chase produced a whole shelf of them. Here
        are nine that still earn the label — with a note on where to start.
      </p>

      <h2>1. The Great Gatsby — F. Scott Fitzgerald</h2>
      <p>Short, dazzling, and the perfect entry point. Wealth, longing, and the green light.</p>

      <h2>2. To Kill a Mockingbird — Harper Lee</h2>
      <p>A childhood in the Depression-era South and a trial that defines it. Warm and unforgettable.</p>

      <h2>3. Beloved — Toni Morrison</h2>
      <p>A searing novel of slavery and its haunting. Demanding, essential, Pulitzer-winning.</p>

      <h2>4. The Grapes of Wrath — John Steinbeck</h2>
      <p>The Dust Bowl migration west. Steinbeck&rsquo;s anger and tenderness in full force.</p>

      <h2>5. The Sun Also Rises — Ernest Hemingway</h2>
      <p>The Lost Generation adrift in Europe. Spare prose that changed how novels sound.</p>

      <h2>6. Invisible Man — Ralph Ellison</h2>
      <p>One man&rsquo;s journey through a country that refuses to see him. Brilliant and furious.</p>

      <h2>7. East of Eden — John Steinbeck</h2>
      <p>A sprawling family saga Steinbeck considered his masterpiece. Big-hearted and biblical.</p>

      <h2>8. Their Eyes Were Watching God — Zora Neale Hurston</h2>
      <p>Janie&rsquo;s search for love and selfhood in early-20th-century Florida. Lyrical and alive.</p>

      <h2>9. The Catcher in the Rye — J.D. Salinger</h2>
      <p>Holden Caulfield&rsquo;s long weekend of alienation. Still the voice of teenage disaffection.</p>

      <h2>Where to start</h2>
      <p>
        New to the list? Open with <em>Gatsby</em> (a weekend read) or{" "}
        <em>To Kill a Mockingbird</em>, then work up to <em>Beloved</em> and{" "}
        <em>Invisible Man</em> when you want something weightier.
      </p>

      <h2>Build the shelf</h2>
      <p>
        We stock affordable used editions on our{" "}
        <Link href="/shop">classics shelves</Link> — ask the{" "}
        <Link href="/#next-read">Matchmaker</Link> for a starting point. For more,
        see our{" "}
        <Link href="/reading-room/classic-novels-everyone-should-read">classics everyone should read</Link>{" "}
        and{" "}
        <Link href="/reading-room/classic-novels-that-became-great-movies">classics that became great movies</Link>.
      </p>
    </>
  );
}
