import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/seo";
import { getCollections } from "@/lib/collections";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Reading Room Collections — The Reading Room",
  description:
    "Browse The Reading Room by theme — local guides, gift guides, genre guides, read-alikes, and more from To Be Read, an independent used bookstore in Milwaukie, OR.",
  alternates: { canonical: "/reading-room/collections" },
  openGraph: {
    title: "Reading Room Collections · The Reading Room",
    description:
      "Themed collections of reading guides and notes from To Be Read in Milwaukie, OR.",
    url: "/reading-room/collections",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] },
};

export default function CollectionsIndexPage() {
  const collections = getCollections();

  return (
    <main id="main">
      <Navbar />
      <JsonLd
        data={breadcrumbList([
          { name: "The Reading Room", path: "/reading-room" },
          { name: "Collections", path: "/reading-room/collections" },
        ])}
      />

      <PageHero
        badge="The Reading Room"
        title="Collections"
        subtitle="Themed collections that group our reading guides and notes by topic."
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
        scrollTargetId="collections"
      />

      <section
        id="collections"
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
            {collections.map((collection, i) => (
              <li key={collection.slug}>
                <Reveal delay={i * 70}>
                  <Link
                    href={`/reading-room/collections/${collection.slug}`}
                    className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: "rgba(107,28,111,0.10)" }}
                  >
                    <h2
                      className="mb-2 text-xl font-bold leading-snug"
                      style={{ fontFamily: "var(--font-serif)", color: "#4A1350" }}
                    >
                      {collection.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-6 text-[#4B5563]">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span>
                        {collection.count}{" "}
                        {collection.count === 1 ? "post" : "posts"}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
                        style={{ color: "#6B1C6F" }}
                      >
                        Explore
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
