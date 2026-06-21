import React from "react";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  slug: "sell-your-textbooks-portland",
  title: "How to Sell Your Textbooks in Portland: An Honest Guide",
  description:
    "Where to sell textbooks in the Portland area — what used bookstores take vs. don't, plus honest alternatives like buyback sites, campus stores, and online selling.",
  excerpt:
    "Trying to offload textbooks around Portland? Here's an honest guide to what used bookstores take, what they don't, and the alternatives worth trying.",
  date: "2026-06-21",
  author: "To Be Read",
  tags: ["Trade", "Local guide"],
  readingMinutes: 4,
};

export default function Body() {
  return (
    <>
      <p>
        Textbooks are heavy, expensive, and frustrating to get rid of. If
        you&rsquo;re in the Portland area staring at a stack from last term,
        here&rsquo;s an honest rundown of your options &mdash; including a
        straight answer about what a used bookstore like ours can and
        can&rsquo;t do with them.
      </p>

      <h2>What used bookstores take &mdash; and what they don&rsquo;t</h2>
      <p>
        Let&rsquo;s be upfront: most general used bookstores, us included, are a
        tough fit for current textbooks. Editions change fast, access codes
        expire, and a chemistry text loses its market the moment a new edition
        ships. What we <em>can</em> often use are titles with lasting,
        general-reader appeal &mdash; classic literature assigned in lit courses,
        well-kept art and photography books, foundational nonfiction, and durable
        reference works. If it reads like a book people pick up for pleasure, not
        just a required course code, bring it in.
      </p>

      <h2>Alternatives worth trying first</h2>
      <ul>
        <li><strong>Campus and online buyback.</strong> Your school store and online textbook buyback programs pay the most for <em>current</em> editions, but only within their window. This is usually your best dollar return for a recent textbook.</li>
        <li><strong>Sell direct to the next student.</strong> Listing on a marketplace or a course-specific group often beats any buyback price, since you cut out the middleman.</li>
        <li><strong>Rental return.</strong> If you rented, return on time &mdash; it&rsquo;s the cheapest path of all.</li>
        <li><strong>Donate.</strong> Older editions with no buyback value can still help; libraries, charity shops, and Little Free Libraries take many of them.</li>
      </ul>

      <h2>Timing matters more than you&rsquo;d think</h2>
      <p>
        With textbooks, when you sell is almost as important as where. The window
        right after finals &mdash; before the next term&rsquo;s editions are
        announced &mdash; is when buyback prices and student demand are highest.
        Wait a semester and a textbook that would have sold for real money can
        drop to near nothing once a new edition lands or the course drops it from
        the syllabus. If you already know you won&rsquo;t reopen a book, listing
        or selling it sooner almost always beats holding onto it.
      </p>
      <p>
        It also helps to be honest about condition. Highlighting, broken spines,
        missing access codes, and loose pages cut a textbook&rsquo;s resale value
        sharply, sometimes below any buyback threshold at all. Knowing that up
        front saves you a wasted errand &mdash; and tells you which books are
        better routed straight to donation.
      </p>

      <h2>An honest bottom line</h2>
      <p>
        For a current, in-demand textbook, a buyback site or a direct sale will
        almost always beat what a used bookstore can offer &mdash; and we&rsquo;d
        rather tell you that than waste your trip. But once a textbook is out of
        edition, those buyback offers dry up, and that&rsquo;s exactly when a
        trade-in shop becomes useful for the general-interest titles mixed into
        your pile.
      </p>

      <h2>Bring the rest of your books to us</h2>
      <p>
        Clearing out a dorm or office usually means more than textbooks. For
        everything else, see{" "}
        <Link href="/reading-room/do-bookstores-buy-used-books">whether a bookstore will buy your used books</Link>,
        get a feel for{" "}
        <Link href="/reading-room/how-much-are-used-books-worth">how much used books are worth</Link>,
        and check our <Link href="/trade">trade-in details</Link>. Then{" "}
        <Link href="/visit">bring a box by the shop</Link> and turn it into your{" "}
        <Link href="/#next-read">next read</Link>.
      </p>
    </>
  );
}
