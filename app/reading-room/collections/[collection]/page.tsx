import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { formatPostDate } from "@/lib/blog";
import { breadcrumbList, SITE_URL } from "@/lib/seo";
import {
  getCollection,
  getCollectionSlugs,
  getCollectionPosts,
} from "@/lib/collections";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getCollectionSlugs().map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};

  const url = `/reading-room/collections/${slug}`;
  return {
    title: `${collection.title} — The Reading Room`,
    description: collection.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${collection.title} · The Reading Room`,
      description: collection.description,
      url,
      type: "website",
      // No explicit images: the colocated opengraph-image.tsx file convention
      // supplies a per-collection card; listing the generic card here made
      // X/Twitter shares fall back to it.
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const posts = getCollectionPosts(slug);
  const url = `/reading-room/collections/${slug}`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.title} — The Reading Room`,
    description: collection.description,
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
          { name: "Collections", path: "/reading-room/collections" },
          { name: collection.title, path: url },
        ])}
      />
      <JsonLd data={collectionJsonLd} />

      <PageHero
        badge="The Reading Room"
        title={collection.title}
        subtitle={collection.description}
        imageUrl="/images/shelves/shelf-04-chapter-book-wall.jpg"
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
                  This collection is still being curated
                </p>
                <p
                  className="mt-1 max-w-sm text-sm leading-6"
                  style={{ color: "var(--ink-soft)" }}
                >
                  We haven&apos;t added any posts to “{collection.title}” yet. Browse
                  the other collections while we pull this one together.
                </p>
                <Link
                  href="/reading-room/collections"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--purple)" }}
                >
                  Browse all collections
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
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
