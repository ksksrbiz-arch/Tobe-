import Link from "next/link";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { getAllPosts, formatPostDate } from "@/lib/blog";

/**
 * "From the Reading Room" — surfaces the latest posts on the homepage.
 *
 * A pure Server Component (no client JS): it passes link equity and crawl
 * priority from the site's highest-authority page to the newest articles,
 * which is one of the cheapest, most effective ways to help fresh content
 * get indexed and rank.
 */
export default function ReadingRoomTeaser() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              <BookOpen size={12} />
              The Reading Room
            </span>
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              Fresh from <span className="underline-accent">the shelves</span>
            </h2>
          </div>
          <Link
            href="/reading-room"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform hover:translate-x-0.5"
            style={{ color: "#6B1C6F" }}
          >
            All posts
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/reading-room/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: "rgba(107,28,111,0.10)" }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ background: "rgba(241,187,26,0.16)", color: "#6B1C6F" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="mb-2 text-lg font-bold leading-snug"
                  style={{ fontFamily: "var(--font-serif)", color: "#4A1350" }}
                >
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-6 text-[#4B5563]">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" />
                    {post.readingMinutes} min read
                  </span>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
