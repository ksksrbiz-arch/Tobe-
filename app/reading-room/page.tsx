import Link from "next/link";
import { Rss } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import ReadingRoomExplorer, { type ExplorerPost } from "@/components/ReadingRoomExplorer";
import { getAllPosts, getAllTags, tagToSlug, formatPostDate } from "@/lib/blog";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Hub-only structured data. Lives here rather than in layout.tsx so post/tag/
// collection pages don't each ship a duplicate breadcrumb trail plus a
// multi-KB Blog node enumerating all 100+ posts.
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/reading-room#blog`,
  name: "The Reading Room",
  url: `${SITE_URL}/reading-room`,
  publisher: { "@id": `${SITE_URL}/#bookstore` },
  blogPost: getAllPosts().map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    url: `${SITE_URL}/reading-room/${p.slug}`,
  })),
};

export default function ReadingRoomPage() {
  const tags = getAllTags();
  const posts: ExplorerPost[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    dateIso: post.date,
    dateLabel: formatPostDate(post.date),
    readingMinutes: post.readingMinutes,
  }));

  return (
    <main id="main">
      <JsonLd data={breadcrumbList([{ name: "The Reading Room", path: "/reading-room" }])} />
      <JsonLd data={blogJsonLd} />
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
          {/* Utility row: collections + RSS */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/reading-room/collections"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-[1.03]"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              Browse collections
            </Link>
            <a
              href="/reading-room/feed.xml"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: "#6B1C6F" }}
            >
              <Rss size={13} aria-hidden="true" />
              RSS
            </a>
          </div>

          <ReadingRoomExplorer posts={posts} tags={tags} />

          {/* Crawlable topic index — keeps every tag page linked from the hub
              for SEO/internal linking, independent of the client-side filter. */}
          <nav
            aria-label="All topics"
            className="mt-16 border-t pt-8"
            style={{ borderColor: "rgba(107,28,111,0.12)" }}
          >
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "#6B1C6F" }}
            >
              All topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/reading-room/tags/${tagToSlug(tag)}`}
                  className="rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-[1.03]"
                  style={{
                    borderColor: "rgba(107,28,111,0.15)",
                    color: "#6B1C6F",
                    background: "rgba(107,28,111,0.04)",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
