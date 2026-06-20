import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import BlogProse from "@/components/BlogProse";
import { getAllSlugs, getPost, formatPostDate, getRelatedPosts, tagToSlug } from "@/lib/blog";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/reading-room/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      // og:image is supplied automatically by the colocated opengraph-image.tsx
      // (a per-post card with the article's title).
      title: `${post.title} · To Be Read`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ReadingRoomPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Body } = post;
  const related = getRelatedPosts(post.slug);
  const url = `${SITE_URL}/reading-room/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${SITE_URL}/#bookstore` },
    mainEntityOfPage: url,
    image: `${SITE_URL}/opengraph-image`,
    keywords: post.tags.join(", "),
  };

  return (
    <main id="main">
      <Navbar />
      <JsonLd
        data={breadcrumbList([
          { name: "The Reading Room", path: "/reading-room" },
          { name: post.title, path: `/reading-room/${post.slug}` },
        ])}
      />
      <JsonLd data={articleJsonLd} />

      <article className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32" style={{ background: "var(--background)" }}>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/reading-room"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: "#6B1C6F" }}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            The Reading Room
          </Link>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/reading-room/tags/${tagToSlug(tag)}`}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:brightness-95"
                  style={{ background: "rgba(241,187,26,0.16)", color: "#6B1C6F" }}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1
              className="text-3xl font-bold leading-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-serif)", color: "#4A1350" }}
            >
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#6B7280]">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>
          </header>

          <BlogProse>
            <Body />
          </BlogProse>

          {related.length > 0 && (
            <aside className="mt-16 border-t pt-10" style={{ borderColor: "rgba(107,28,111,0.12)" }}>
              <h2
                className="mb-6 text-xl font-bold"
                style={{ fontFamily: "var(--font-serif)", color: "#4A1350" }}
              >
                Keep reading
              </h2>
              <ul className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/reading-room/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border bg-white/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: "rgba(107,28,111,0.10)" }}
                    >
                      <h3
                        className="mb-2 text-base font-bold leading-snug"
                        style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
                      >
                        {r.title}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-6 text-[#4B5563]">
                        {r.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
