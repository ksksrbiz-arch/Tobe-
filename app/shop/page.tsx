"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Star, Tag } from "lucide-react";

const featuredBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    price: "$6",
    accentFrom: "#6B1C6F",
    accentTo: "#8B2E90",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    price: "$5",
    accentFrom: "#1a6b1c",
    accentTo: "#16a34a",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    price: "$7",
    accentFrom: "#1e3a8a",
    accentTo: "#3b82f6",
  },
  {
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    genre: "Historical",
    price: "$8",
    accentFrom: "#b45309",
    accentTo: "#F1BB1A",
  },
  {
    title: "Tomorrow x3",
    author: "Gabrielle Zevin",
    genre: "Fiction",
    price: "$7",
    accentFrom: "#6B1C6F",
    accentTo: "#F1BB1A",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    price: "$8",
    accentFrom: "#0f766e",
    accentTo: "#14b8a6",
  },
  {
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    genre: "Fiction",
    price: "$6",
    accentFrom: "#9a3412",
    accentTo: "#f97316",
  },
  {
    title: "The Covenant of Water",
    author: "Abraham Verghese",
    genre: "Literary",
    price: "$9",
    accentFrom: "#4c1d95",
    accentTo: "#7c3aed",
  },
];

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
        imageUrl="https://images.unsplash.com/photo-1589998059171-988d887df646?w=1600&q=80"
        scrollTargetId="shop"
      />
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
                fontFamily: "'Playfair Display', Georgia, serif",
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
        className="px-4 py-24 sm:px-6 lg:px-8"
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
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              On the table this <span className="underline-accent">week</span>
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
            <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "#6B7280" }}>
              Examples only — our shelves change daily, so come hunt for something you didn&apos;t expect.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featuredBooks.map((book, i) => (
              <Reveal key={book.title} delay={i * 60}>
                <article
                  className="group h-full overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderColor: "rgba(107,28,111,0.08)", boxShadow: "0 8px 22px rgba(107,28,111,0.06)" }}
                >
                  {/* Faux book cover */}
                  <div
                    className="relative flex h-40 items-end justify-start p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${book.accentFrom} 0%, ${book.accentTo} 100%)`,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute right-2 top-2 h-12 w-12 rounded-full opacity-30 blur-2xl"
                      style={{ background: "white" }}
                    />
                    <p
                      className="relative text-base font-bold leading-tight text-white"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {book.title}
                    </p>
                  </div>
                  <div className="p-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: book.accentFrom + "18",
                        color: book.accentFrom,
                      }}
                    >
                      {book.genre}
                    </span>
                    <p className="mt-2.5 text-xs" style={{ color: "#6B7280" }}>
                      by {book.author}
                    </p>
                    <p
                      className="mt-3 text-lg font-bold"
                      style={{
                        color: book.accentFrom,
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {book.price}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
