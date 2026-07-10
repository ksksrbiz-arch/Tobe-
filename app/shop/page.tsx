"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import QuickAnswer from "@/components/QuickAnswer";
import ShopSection from "@/components/ShopSection";
import FAQSection, { type Faq } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Star, Tag } from "lucide-react";

// Visible shop FAQ — also emits FAQPage structured data via <FAQSection>.
const shopFaqs: Faq[] = [
  {
    q: "Where can I buy your books online?",
    a: "Browse our curated online inventory on PangoBooks, and shop through Bookshop.org to support independent bookstores. Both are linked at the top of this page.",
  },
  {
    q: "Can I order online for in-store pickup?",
    a: "Right now we recommend browsing PangoBooks for our online inventory. For in-store pickup, give us a call and we'll happily set books aside for you.",
  },
  {
    q: "How does shopping Bookshop.org support the store?",
    a: "Bookshop.org shares a portion of every sale with the independent bookshops listed on it, so ordering through our storefront supports To Be Read even when you shop online.",
  },
  {
    q: "Do the online listings match what's on the shelves?",
    a: "Our in-store shelves change daily and are separate from the online listings, so if you're after a specific title it's best to call ahead or stop in.",
  },
];

// Real Open Library covers (verified to exist) keep this grid visually in step
// with the live "Just Shelved" shelf instead of faux gradient blocks.
const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

interface FeaturedBook {
  title: string;
  author: string;
  genre: string;
  price: string;
  isbn: string;
  accentFrom: string;
  accentTo: string;
}

const featuredBooks: FeaturedBook[] = [
  { title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", price: "$6", isbn: "9780525559474", accentFrom: "#6B1C6F", accentTo: "#8B2E90" },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", price: "$5", isbn: "9780399590504", accentFrom: "#1a6b1c", accentTo: "#16a34a" },
  { title: "Piranesi", author: "Susanna Clarke", genre: "Fantasy", price: "$7", isbn: "9781635575637", accentFrom: "#1e3a8a", accentTo: "#3b82f6" },
  { title: "A Gentleman in Moscow", author: "Amor Towles", genre: "Historical", price: "$8", isbn: "9780143110439", accentFrom: "#b45309", accentTo: "#F1BB1A" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", genre: "Fiction", price: "$7", isbn: "9780593321201", accentFrom: "#6B1C6F", accentTo: "#F1BB1A" },
  { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", price: "$8", isbn: "9780593135204", accentFrom: "#0f766e", accentTo: "#14b8a6" },
  { title: "Lessons in Chemistry", author: "Bonnie Garmus", genre: "Fiction", price: "$6", isbn: "9780385547345", accentFrom: "#9a3412", accentTo: "#f97316" },
  { title: "The Covenant of Water", author: "Abraham Verghese", genre: "Literary", price: "$9", isbn: "9780802162175", accentFrom: "#4c1d95", accentTo: "#7c3aed" },
];

function FeaturedCard({ book }: { book: FeaturedBook }) {
  const [coverFailed, setCoverFailed] = useState(false);
  return (
    <article
      className="card-cozy group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-transform active:scale-[0.98]"
      style={{ borderColor: "rgba(107,28,111,0.08)", boxShadow: "var(--shadow-sm)" }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden" style={{ background: "rgba(107,28,111,0.06)" }}>
        {coverFailed ? (
          // On a missing cover, fall back to the title on the book's accent gradient.
          <div
            className="flex h-full items-end p-4"
            style={{ background: `linear-gradient(135deg, ${book.accentFrom} 0%, ${book.accentTo} 100%)` }}
          >
            <p className="text-base font-bold leading-tight text-white" style={{ fontFamily: "var(--font-serif)" }}>
              {book.title}
            </p>
          </div>
        ) : (
          <Image
            src={cover(book.isbn)}
            alt={`${book.title} cover`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        )}
        <span
          className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm"
          style={{ background: "rgba(31,26,46,0.62)" }}
        >
          {book.price}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span
          className="w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: book.accentFrom + "18", color: book.accentFrom }}
        >
          {book.genre}
        </span>
        <p
          className="mt-2 line-clamp-2 text-sm font-bold leading-tight"
          style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
        >
          {book.title}
        </p>
        <p className="mt-0.5 truncate text-xs" style={{ color: "#6B7280" }}>
          by {book.author}
        </p>
      </div>
    </article>
  );
}

const genreChips = [
  "Fiction",
  "Mystery",
  "Sci-Fi & Fantasy",
  "Romance",
  "Memoir",
  "History",
  "Self-Help",
  "Cookbooks",
  "Children's",
  "YA",
  "Poetry",
  "Travel",
];

export default function ShopPage() {
  return (
    <main
      id="main"
      className="min-h-screen"
      style={{ background: "var(--background)" }}
    >
      <Navbar />
      <PageHero
        title="Shop Our Collection"
        subtitle="Browse thousands of titles online or visit us in person."
        badge="Shop"
        imageUrl="/images/shelves/store-kids-ya-shelves.jpg"
        scrollTargetId="shop"
      />

      {/* Answer-first summary before the browsing sections — the quick takeaway
          for skimmers and featured snippets. */}
      <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8" style={{ background: "var(--background)" }}>
        <Reveal className="mx-auto max-w-4xl">
          <QuickAnswer>
            We carry gently-used books across <strong>every genre</strong>{" "}&mdash; literary fiction,
            fantasy and sci-fi, mystery, romance, memoir, kids and YA — most just a few dollars each.
            The shelves rotate constantly, so browse the highlights below to see what&rsquo;s new, then{" "}
            <Link href="/visit" style={{ color: "#6B1C6F", fontWeight: 600, textDecoration: "underline" }}>
              come dig through the rest in person
            </Link>{" "}
            in Milwaukie. Cleared out your own shelves? You can{" "}
            <Link href="/trade" style={{ color: "#6B1C6F", fontWeight: 600, textDecoration: "underline" }}>
              trade them in for credit
            </Link>{" "}
            while you&rsquo;re here.
          </QuickAnswer>
        </Reveal>
      </section>

      <ShopSection />

      {/* Genre quick filters */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)" }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8 text-center">
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              <Tag size={12} />
              What we stock
            </span>
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)",
              }}
            >
              Every <span className="underline-accent">genre</span>, always rotating
            </h2>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5">
              {genreChips.map((g) => (
                <span
                  key={g}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: "white",
                    borderColor: "rgba(107,28,111,0.14)",
                    color: "#6B1C6F",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(107,28,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(241,187,26,0.10) 0%, transparent 50%), linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Star size={12} />
              New &amp; Notable
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              On the table this <span className="underline-accent">week</span>
            </h2>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
            <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "#6B7280" }}>
              Examples only — our shelves change daily, so come hunt for something you didn&apos;t expect.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featuredBooks.map((book, i) => (
              <Reveal key={book.title} delay={i * 60}>
                <FeaturedCard book={book} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={shopFaqs}
        eyebrow="Shopping FAQ"
        titleLead="Shopping"
        titleAccent="questions"
        intro="How to buy online, pick up in store, and support the shop."
        id="shop-faq"
      />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
