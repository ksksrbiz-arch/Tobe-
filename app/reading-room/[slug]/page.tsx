import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import BlogProse from "@/components/BlogProse";
import { getAllSlugs, getPost, formatPostDate } from "@/lib/blog";
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
      title: `${post.title} · To Be Read`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/twitter-image"],
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
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: "rgba(241,187,26,0.16)", color: "#6B1C6F" }}
                >
                  {tag}
                </span>
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
        </div>
      </article>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
