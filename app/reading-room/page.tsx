import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const dynamic = "force-static";

export default function ReadingRoomPage() {
  const posts = getAllPosts();

  return (
    <main id="main">
      <Navbar />

      <PageHero
        badge="The Reading Room"
        title="Notes from the shop"
        subtitle="Reading guides, trade-in tips, and bookish dispatches from the shelves of To Be Read."
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
        scrollTargetId="posts"
      />

      <section
        id="posts"
        className="px-4 py-12 sm:px-6 sm:py-20 md:py-28"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-5xl">
          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 70}>
                  <Link
                    href={`/reading-room/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: "rgba(107,28,111,0.10)" }}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                          style={{ background: "rgba(241,187,26,0.16)", color: "#6B1C6F" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2
                      className="mb-2 text-xl font-bold leading-snug"
                      style={{ fontFamily: "var(--font-serif)", color: "#4A1350" }}
                    >
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-6 text-[#4B5563]">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span className="flex items-center gap-3">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} aria-hidden="true" />
                          {post.readingMinutes} min read
                        </span>
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
                        style={{ color: "#6B1C6F" }}
                      >
                        Read
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
