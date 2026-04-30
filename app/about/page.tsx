"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Heart, BookOpen, Sparkles, Users, Quote } from "lucide-react";

const galleryItems = [
  { url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", caption: "Our shelves" },
  { url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80", caption: "Cozy reading nooks" },
  { url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", caption: "Community corner" },
  { url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80", caption: "Trade-in counter" },
  { url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80", caption: "New arrivals" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80", caption: "The reading chair" },
];

const values = [
  {
    icon: Heart,
    title: "Community first",
    text: "We're a neighborhood shop. Every face we see, every book that comes in, we treat like family.",
  },
  {
    icon: BookOpen,
    title: "Books over algorithms",
    text: "Our staff actually reads. We'd rather hand you the right book than chase trending titles.",
  },
  {
    icon: Sparkles,
    title: "Quietly modern",
    text: "Same charm, smoother experience — fresh signage, easier trades, friendlier hours.",
  },
  {
    icon: Users,
    title: "Pay it forward",
    text: "Trade credit means books keep circulating in the community, at prices anyone can afford.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <PageHero
        title="Our Story"
        subtitle="45 years of stories, one chapter at a time."
        badge="About Us"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
        scrollTargetId="about"
      />

      <StorySection />

      {/* Values */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              What guides us
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              The shelves are full. So are our <span className="underline-accent">values</span>.
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <article
                  className="h-full rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderColor: "rgba(107,28,111,0.10)", boxShadow: "0 8px 22px rgba(107,28,111,0.06)" }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(107,28,111,0.10) 0%, rgba(241,187,26,0.18) 100%)",
                    }}
                  >
                    <v.icon size={22} style={{ color: "#6B1C6F" }} />
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {v.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        className="px-4 py-24 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)" }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              Inside the shop
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              A peek between the <span className="underline-accent">shelves</span>
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {galleryItems.map((item, i) => (
              <Reveal
                key={item.caption}
                delay={i * 60}
                className={i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}
              >
                <div
                  className="group relative h-full overflow-hidden rounded-2xl shadow-md"
                  style={{ minHeight: i === 0 ? "320px" : "180px" }}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(74,19,80,0) 30%, rgba(74,19,80,0.85) 100%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Owner letter */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div
              className="relative rounded-3xl border p-8 sm:p-12"
              style={{
                background: "linear-gradient(135deg, #FDF8F0 0%, #FFFEFB 100%)",
                borderColor: "rgba(107,28,111,0.10)",
                boxShadow: "0 18px 40px rgba(107,28,111,0.10)",
              }}
            >
              <Quote
                aria-hidden="true"
                size={48}
                className="absolute -left-2 -top-2 opacity-15"
                style={{ color: "#F1BB1A" }}
              />
              <p
                className="text-lg leading-relaxed sm:text-xl"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#374151",
                  fontStyle: "italic",
                }}
              >
                When we took the keys in June 2024, the first thing customers told us was{" "}
                <strong style={{ color: "#6B1C6F", fontStyle: "normal" }}>
                  &ldquo;please don&apos;t change the soul of this place.&rdquo;
                </strong>{" "}
                We listened. We&apos;re refreshing the edges, but the heart — the slow Saturday
                browses, the staff picks, the trade-ins that keep books circling the neighborhood —
                that stays exactly the same.
              </p>
              <p className="mt-6 text-sm font-semibold" style={{ color: "#6B1C6F" }}>
                — The owners, To Be Read
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
