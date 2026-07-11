import Link from "next/link";
import { Library, Rss } from "lucide-react";
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
          {/* Utility row: collections (primary content mode) + RSS (secondary) */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link
              href="/reading-room/collections"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              style={{ background: "color-mix(in srgb, var(--gold) 24%, transparent)", color: "var(--purple-dark)" }}
            >
              <Library size={16} aria-hidden="true" />
              Browse collections
            </Link>
            <a
              href="/reading-room/feed.xml"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity duration-[var(--dur-fast)] hover:opacity-70"
              style={{ color: "var(--muted)" }}
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
            style={{ borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
          >
            <h2
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--muted)" }}
            >
              All topics
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/reading-room/tags/${tagToSlug(tag)}`}
                  className="rounded-full px-1 text-[11px] font-medium underline-offset-2 transition-colors duration-[var(--dur-fast)] hover:underline"
                  style={{ color: "var(--ink-muted)" }}
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
