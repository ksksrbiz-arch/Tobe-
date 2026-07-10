"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import QuickAnswer from "@/components/QuickAnswer";
import StorySection from "@/components/StorySection";
import FAQSection, { type Faq } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Heart, BookOpen, Sparkles, Users, Quote } from "lucide-react";

// Visible about FAQ — also emits FAQPage structured data via <FAQSection>.
const aboutFaqs: Faq[] = [
  {
    q: "Is Clackamas Book Exchange the same store as To Be Read?",
    a: "Yes — To Be Read (TBR) is the new name for the long-running Clackamas Book Exchange. Same shop, same shelves, same trade-in counter; the new name rolls out in 2026.",
  },
  {
    q: "How long has the store been around?",
    a: "Over 45 years — the shop was founded in 1981 and has been a neighborhood fixture ever since.",
  },
  {
    q: "Where are you located?",
    a: "7931 SE King Rd, Unit 1, Portland, OR 97222, with free on-site parking. We're open Monday–Saturday, 10am–5pm.",
  },
  {
    q: "Do you only sell used books?",
    a: "We specialize in secondhand books across every genre, and you can also trade your own used books for store credit toward your next reads.",
  },
];

// Hero shot — spans the full first row
const galleryHero = {
  url: "/images/shelves/store-kids-room-overview.jpg",
  caption: "The kids' room — floor to ceiling",
  alt: "Wide view of the children's book room at To Be Read, showing wall-to-wall bookshelves, a kids' reading table, and colourful rugs",
};

// Supporting shots — 4-up grid beside / below the hero
const gallerySupporting = [
  {
    url: "/images/shelves/store-kids-window-display.jpg",
    caption: "Sunny window display",
    alt: "Picture books displayed face-out along a sunny window shelf in the children's room",
  },
  {
    url: "/images/shelves/store-kids-doorway-seuss.jpg",
    caption: "Dr. Seuss corner",
    alt: "A doorway display rack packed with Dr. Seuss titles and early reader books",
  },
  {
    url: "/images/shelves/store-kids-ya-shelves.jpg",
    caption: "Young adult wall",
    alt: "Dense shelves of young adult novels, fantasy series, and graphic novel collections",
  },
  {
    url: "/images/shelves/store-kids-middle-grade.jpg",
    caption: "Middle-grade adventures",
    alt: "Shelves packed with middle-grade chapter books sorted by series and genre",
  },
];

// Bottom row — wide adult fiction wall + accent shots
const galleryBottom = [
  {
    url: "/images/shelves/store-front-adult-fiction.jpg",
    caption: "Adult fiction — front of store",
    alt: "Wide front-of-store shelving wall filled with adult fiction, literary fiction, and bestsellers",
    wide: true,
  },
  {
    url: "/images/shelves/store-kids-chapter-wall.jpg",
    caption: "Chapter book wall",
    alt: "Tall wooden shelving section dedicated to children's chapter books organised by series",
    wide: false,
  },
  {
    url: "/images/shelves/store-kids-picture-book-window.jpg",
    caption: "New picture books",
    alt: "Colourful new-arrival picture books displayed face-out on the window shelf",
    wide: false,
  },
  {
    url: "/images/shelves/store-kids-adventure-shelves.jpg",
    caption: "Adventure & fantasy",
    alt: "Packed shelves of children's adventure and fantasy books including popular series",
    wide: false,
  },
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
        imageUrl="/images/shelves/store-kids-room-overview.jpg"
        scrollTargetId="about"
      />

      {/* Answer-first summary: who we are, in one paragraph, before the long story. */}
      <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8" style={{ background: "var(--background)" }}>
        <Reveal className="mx-auto max-w-4xl">
          <QuickAnswer>
            <strong>To Be Read</strong>{" "}is a neighborhood used bookstore in Milwaukie, Oregon — the
            shop known for 45 years as the Clackamas Book Exchange, now under new ownership and
            becoming TBR. We&rsquo;ve kept what regulars love — deep, ever-rotating shelves and
            trade-in credit — and added a lighter, more welcoming space to wander. New here?{" "}
            <Link href="/visit" style={{ color: "var(--purple)", fontWeight: 600, textDecoration: "underline" }}>
              Plan your first visit
            </Link>{" "}
            or{" "}
            <Link href="/reading-room" style={{ color: "var(--purple)", fontWeight: 600, textDecoration: "underline" }}>
              browse the Reading Room
            </Link>
            .
          </QuickAnswer>
        </Reveal>
      </section>

      <StorySection />

      {/* Values */}
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--purple) 6%, transparent) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, color-mix(in srgb, var(--gold) 8%, transparent) 0%, transparent 45%), linear-gradient(180deg, #FFFEFB 0%, var(--paper) 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)", color: "var(--purple)" }}
            >
              What guides us
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              The shelves are full. So are our <span className="underline-accent">values</span>.
            </h2>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <article
                  className="h-full rounded-2xl border bg-white p-6 card-cozy transition-transform active:scale-[0.98]"
                  style={{ borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)", boxShadow: "var(--shadow-sm)" }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, color-mix(in srgb, var(--purple) 10%, transparent) 0%, color-mix(in srgb, var(--gold) 18%, transparent) 100%)",
                    }}
                  >
                    <v.icon size={22} style={{ color: "var(--purple)" }} />
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
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
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, var(--paper) 0%, #FFFEFB 100%)" }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--purple)" }}
            >
              Sneak peek
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Walk the <span className="underline-accent">shelves</span> before you arrive
            </h2>
            <p className="mx-auto mb-3 max-w-xl text-sm leading-6" style={{ color: "var(--muted)" }}>
              Nine rooms&apos; worth of finds — kids&apos; picture books, YA, adult fiction, Dr. Seuss corner, and more.
            </p>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          {/* Row 1 — hero (full width) */}
          <Reveal>
            <div
              className="group relative mb-3 overflow-hidden rounded-2xl shadow-md sm:mb-4"
              style={{ height: "340px" }}
            >
              <Image
                src={galleryHero.url}
                alt={galleryHero.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, color-mix(in srgb, var(--purple-dark) 0%, transparent) 40%, color-mix(in srgb, var(--purple-dark) 80%, transparent) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-semibold uppercase tracking-wider">{galleryHero.caption}</p>
              </div>
            </div>
          </Reveal>

          {/* Row 2 — four supporting shots */}
          <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
            {gallerySupporting.map((item, i) => (
              <Reveal key={item.caption} delay={i * 60}>
                <div
                  className="group relative overflow-hidden rounded-2xl shadow-md"
                  style={{ height: "180px" }}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 256px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, color-mix(in srgb, var(--purple-dark) 0%, transparent) 30%, color-mix(in srgb, var(--purple-dark) 82%, transparent) 100%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Row 3 — adult fiction wide + three accent shots (3-col on md+) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {galleryBottom.map((item, i) => (
              <Reveal
                key={item.caption}
                delay={i * 60}
                className={item.wide ? "col-span-2 md:col-span-1" : ""}
              >
                <div
                  className="group relative h-full overflow-hidden rounded-2xl shadow-md"
                  style={{ minHeight: "200px" }}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 384px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, color-mix(in srgb, var(--purple-dark) 0%, transparent) 30%, color-mix(in srgb, var(--purple-dark) 82%, transparent) 100%)",
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
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, color-mix(in srgb, var(--gold) 10%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 20% 100%, color-mix(in srgb, var(--purple) 7%, transparent) 0%, transparent 50%), linear-gradient(180deg, #FFFEFB 0%, var(--paper) 60%, #F5EAFB 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div
              className="relative rounded-3xl border p-8 sm:p-12"
              style={{
                background: "linear-gradient(135deg, var(--paper) 0%, #FFFEFB 100%)",
                borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)",
                boxShadow: "0 18px 40px color-mix(in srgb, var(--purple) 10%, transparent)",
              }}
            >
              <Quote
                aria-hidden="true"
                size={48}
                className="absolute -left-2 -top-2 opacity-15"
                style={{ color: "var(--gold)" }}
              />
              <p
                className="text-lg leading-relaxed sm:text-xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#374151",
                  fontStyle: "italic",
                }}
              >
                When we took the keys in June 2024, the first thing customers told us was{" "}
                <strong style={{ color: "var(--purple)", fontStyle: "normal" }}>
                  &ldquo;please don&apos;t change the soul of this place.&rdquo;
                </strong>{" "}
                We listened. We&apos;re refreshing the edges, but the heart — the slow Saturday
                browses, the staff picks, the trade-ins that keep books circling the neighborhood —
                that stays exactly the same.
              </p>
              <p className="mt-6 text-sm font-semibold" style={{ color: "var(--purple)" }}>
                — The owners, To Be Read
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection
        faqs={aboutFaqs}
        eyebrow="About FAQ"
        titleLead="Common"
        titleAccent="questions"
        intro="A few things people often ask about the shop."
        id="about-faq"
      />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
