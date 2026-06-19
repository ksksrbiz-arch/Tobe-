import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
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
} from "@/lib/blog";
import { breadcrumbList } from "@/lib/seo";

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
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", images: ["/twitter-image"] },
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

  return (
    <main id="main">
      <Navbar />
      <JsonLd
        data={breadcrumbList([
          { name: "The Reading Room", path: "/reading-room" },
          { name: tag, path: `/reading-room/tags/${tagSlug}` },
        ])}
      />

      <PageHero
        badge="The Reading Room"
        title={tag}
        subtitle={`Everything we've written tagged “${tag}.”`}
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
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
            style={{ color: "#6B1C6F" }}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All posts
          </Link>

          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 70}>
                  <Link
                    href={`/reading-room/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: "rgba(107,28,111,0.10)" }}
                  >
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
