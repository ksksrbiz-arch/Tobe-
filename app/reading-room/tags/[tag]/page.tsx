import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag as TagIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import {
  getAllTagSlugs,
  getTagBySlug,
  getPostsByTag,
  formatPostDate,
  tagToSlug,
} from "@/lib/blog";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) return {};

  const url = `/reading-room/tags/${tagSlug}`;
  return {
    title: `${tag} — The Reading Room`,
    description: `Reading guides and notes tagged "${tag}" from To Be Read, an independent used bookstore in Milwaukie, OR.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${tag} · The Reading Room`,
      description: `Posts tagged "${tag}" from To Be Read.`,
      url,
      type: "website",
      // No explicit images: the colocated opengraph-image.tsx / twitter-image
      // file conventions supply per-tag cards; listing the generic card here
      // made X/Twitter shares fall back to it.
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag);
  const url = `/reading-room/tags/${tagSlug}`;

  // Sibling tags that co-occur on these posts, so a visitor can pivot to a
  // related shelf without backtracking. Ranked by how often they appear
  // alongside the current tag; every slug here comes from a real post tag.
  const relatedTagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const other of post.tags) {
      if (other === tag) continue;
      relatedTagCounts.set(other, (relatedTagCounts.get(other) ?? 0) + 1);
    }
  }
  const relatedTags = [...relatedTagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([label]) => label);

  // Mirrors the CollectionPage/ItemList pattern on /reading-room/collections/[collection]
  // so tag hubs are just as legible to AI answer engines as curated collections.
  const tagJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${tag} — The Reading Room`,
    description: `Reading guides and notes tagged "${tag}" from To Be Read, an independent used bookstore in Milwaukie, OR.`,
    url: `${SITE_URL}${url}`,
    isPartOf: { "@id": `${SITE_URL}/reading-room#blog` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/reading-room/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <main id="main">
      <Navbar />
      <JsonLd
        data={breadcrumbList([
          { name: "The Reading Room", path: "/reading-room" },
          { name: tag, path: url },
        ])}
      />
      <JsonLd data={tagJsonLd} />

      <PageHero
        badge="The Reading Room"
        title={tag}
        subtitle={`Everything we've written tagged “${tag}.”`}
        imageUrl="/images/shelves/store-kids-ya-shelves.jpg"
        scrollTargetId="posts"
      />

      <section
        id="posts"
        className="px-4 py-12 sm:px-6 sm:py-20 md:py-28"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href="/reading-room"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--purple)" }}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All posts
          </Link>

          {posts.length === 0 ? (
            <Reveal>
              <div
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center"
                style={{ borderColor: "color-mix(in srgb, var(--purple) 15%, transparent)" }}
              >
                <BookOpen
                  size={36}
                  style={{ color: "color-mix(in srgb, var(--purple) 30%, transparent)" }}
                  aria-hidden="true"
                />
                <p
                  className="mt-4 text-lg font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--purple-dark)" }}
                >
                  Nothing shelved here yet
                </p>
                <p
                  className="mt-1 max-w-sm text-sm leading-6"
                  style={{ color: "var(--ink-soft)" }}
                >
                  We haven&apos;t tagged anything “{tag}” just yet. Browse the full
                  Reading Room while we fill this shelf.
                </p>
                <Link
                  href="/reading-room"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--purple)" }}
                >
                  Visit the Reading Room
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 70}>
                    <Link
                      href={`/reading-room/${post.slug}`}
                      className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
                    >
                      <h2
                        className="mb-2 text-xl font-bold leading-snug"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--purple-dark)" }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="mb-4 flex-1 text-sm leading-6"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                        <span className="flex items-center gap-3">
                          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} aria-hidden="true" />
                            {post.readingMinutes} min read
                          </span>
                        </span>
                        <span
                          className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
                          style={{ color: "var(--purple)" }}
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
          )}

          {relatedTags.length > 0 && (
            <Reveal>
              <div
                className="mt-12 border-t pt-8"
                style={{ borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
              >
                <h2
                  className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide"
                  style={{ color: "var(--purple-dark)" }}
                >
                  <TagIcon size={14} aria-hidden="true" />
                  Related tags
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {relatedTags.map((related) => (
                    <li key={related}>
                      <Link
                        href={`/reading-room/tags/${tagToSlug(related)}`}
                        className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{
                          borderColor: "color-mix(in srgb, var(--purple) 18%, transparent)",
                          background: "color-mix(in srgb, var(--purple) 5%, transparent)",
                          color: "var(--purple)",
                        }}
                      >
                        {related}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
