"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import DustMotes from "@/components/DustMotes";
import {
  Award,
  BookMarked,
  BookOpen,
  Clock,
  MapPin,
  RefreshCw,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";

function SectionSkeleton({
  id,
  eyebrow,
  title,
  muted,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className="px-4 py-16 sm:px-6 lg:px-8"
      style={{ background: muted ? "#FDF8F0" : "rgba(255,255,255,0.82)" }}
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div
            className="mx-auto mb-4 h-7 w-28 rounded-full"
            style={{ background: "rgba(107,28,111,0.12)" }}
          />
          <div
            className="mx-auto h-10 w-full max-w-md rounded-2xl"
            style={{ background: "rgba(107,28,111,0.08)" }}
          />
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ background: "rgba(241,187,26,0.6)" }}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[28px] border p-6"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderColor: "rgba(107,28,111,0.08)",
                boxShadow: "0 20px 40px rgba(107,28,111,0.06)",
              }}
            >
              <div
                className="mb-5 h-12 w-12 rounded-2xl"
                style={{ background: "rgba(107,28,111,0.08)" }}
              />
              <div
                className="mb-3 h-5 rounded-full"
                style={{ background: "rgba(107,28,111,0.1)" }}
              />
              <div className="space-y-2">
                <div className="h-3 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
                <div className="h-3 w-4/5 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
                <div className="h-3 w-2/3 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm" style={{ color: "#6B7280" }}>
          {eyebrow} · {title}
        </p>
      </div>
    </section>
  );
}

function TikTokSkeleton() {
  return (
    <div
      className="w-full max-w-[605px] animate-pulse rounded-[32px] border p-5"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: "rgba(107,28,111,0.08)",
        boxShadow: "0 24px 55px rgba(107,28,111,0.08)",
      }}
    >
      <div className="mb-4 h-8 w-32 rounded-full" style={{ background: "rgba(107,28,111,0.1)" }} />
      <div
        className="h-[420px] rounded-[24px]"
        style={{ background: "linear-gradient(180deg, rgba(107,28,111,0.08), rgba(241,187,26,0.12))" }}
      />
    </div>
  );
}

const StorySection = dynamic(() => import("@/components/StorySection"), {
  loading: () => <SectionSkeleton id="about" eyebrow="Our Story" title="Opening the next chapter..." muted />,
});

const VisitSection = dynamic(() => import("@/components/VisitSection"), {
  loading: () => <SectionSkeleton id="visit" eyebrow="Visit" title="Getting the welcome desk ready..." />,
});

const TradeSection = dynamic(() => import("@/components/TradeSection"), {
  loading: () => <SectionSkeleton id="trade" eyebrow="Trade" title="Sorting a fresh stack of trades..." muted />,
});

const ShopSection = dynamic(() => import("@/components/ShopSection"), {
  loading: () => <SectionSkeleton id="shop" eyebrow="Shop" title="Curating online picks..." />,
});

const JustShelvedSection = dynamic(
  () => import("@/components/JustShelvedFeed").then((m) => ({ default: m.JustShelvedSection })),
  { loading: () => <SectionSkeleton eyebrow="Just Shelved" title="Loading live arrivals..." muted /> },
);

const NextReadSection = dynamic(
  () => import("@/components/NextReadMatchmaker").then((m) => ({ default: m.NextReadSection })),
  { loading: () => <SectionSkeleton eyebrow="AI Matchmaker" title="Warming up the recommendation engine..." /> },
);

const ConnectSection = dynamic(() => import("@/components/ConnectSection"), {
  loading: () => <SectionSkeleton id="connect" eyebrow="Connect" title="Pulling in the community shelf..." muted />,
});

const EventsSection = dynamic(() => import("@/components/EventsSection"), {
  loading: () => <SectionSkeleton eyebrow="Events" title="Marking the calendar..." />,
});

const LemmyFeatureSection = dynamic(() => import("@/components/LemmyFeatureSection"), {
  loading: () => (
    <SectionSkeleton eyebrow="Featured" title="Following Lemmy's footprints..." muted />
  ),
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <SectionSkeleton eyebrow="FAQ" title="Gathering common questions..." muted />,
});

const NewsletterCTA = dynamic(() => import("@/components/NewsletterCTA"), {
  loading: () => (
    <div className="px-4 py-20">
      <div
        className="mx-auto h-48 max-w-4xl animate-pulse rounded-[36px]"
        style={{ background: "rgba(107,28,111,0.10)" }}
      />
    </div>
  ),
});

const TikTokEmbed = dynamic(() => import("@/components/TikTokEmbed"), {
  loading: () => <TikTokSkeleton />,
});

const exploreCards = [
  {
    icon: BookOpen,
    title: "Our Story",
    tagline: "45 years of connecting readers with books they love",
    href: "#about",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    tagline: "Find us in Milwaukie, OR — Mon–Sat 10am–5pm",
    href: "#visit",
  },
  {
    icon: RefreshCw,
    title: "Trade Books",
    tagline: "Bring your books in and earn store credit",
    href: "#trade",
  },
  {
    icon: ShoppingBag,
    title: "Shop Online",
    tagline: "Browse thousands of titles on PangoBooks & Bookshop.org",
    href: "#shop",
  },
  {
    icon: Users,
    title: "Connect",
    tagline: "Follow us on TikTok, Instagram, and Facebook",
    href: "#connect",
  },
];

const stats = [
  { icon: Award, label: "45+ Years", sub: "Serving the community" },
  { icon: BookMarked, label: "Thousands", sub: "Of titles in stock" },
  { icon: RefreshCw, label: "Trade Credit", sub: "Available in-store" },
  { icon: Clock, label: "Mon–Sat", sub: "10am – 5pm" },
];

export default function Home() {
  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#6B1C6F", "#F1BB1A", "#ffffff", "#8B2E90", "#F5CC45"],
      });
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <main
      id="main"
      className="min-h-screen overflow-x-hidden animate-page-enter"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(241,187,26,0.10), transparent 28%), radial-gradient(circle at top right, rgba(107,28,111,0.10), transparent 24%), linear-gradient(180deg, #FDF8F0 0%, #FFFDF9 35%, #F8F2FF 100%)",
      }}
    >
      <Navbar />
      <HeroSection onConfetti={fireConfetti} />

      {/* Stats strip */}
      <section className="relative z-10 -mt-16 px-4 pb-10 sm:px-6 lg:px-8">
        <div
          className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]"
        >
          <Reveal>
            <div
              className="h-full rounded-[28px] border p-6 backdrop-blur"
              style={{
                background: "rgba(255,255,255,0.86)",
                borderColor: "rgba(107,28,111,0.08)",
                boxShadow: "0 24px 60px rgba(107,28,111,0.12)",
              }}
            >
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
                style={{ background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }}
              >
                A warmer welcome
              </span>
              <h2
                className="mt-4 text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                More than a quick landing page.
              </h2>
              <p className="mt-3 text-sm leading-6" style={{ color: "#4B5563" }}>
                Browse the story, plan your visit, check the trade policy, and catch the latest social moments — without hopping around.
              </p>
            </div>
          </Reveal>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={80 + i * 60}>
              <div
                className="flex h-full flex-col justify-between rounded-[28px] border p-5 backdrop-blur transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.82)",
                  borderColor: "rgba(107,28,111,0.08)",
                  boxShadow: "0 20px 45px rgba(107,28,111,0.08)",
                }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(107,28,111,0.08)" }}
                >
                  <stat.icon size={20} style={{ color: "#6B1C6F" }} />
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                >
                  {stat.label}
                </div>
                <div className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                  {stat.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StorySection />

      {/* Explore grid */}
      <section
        className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(253,248,240,0.86) 100%)",
        }}
      >
        <DustMotes />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              Explore
            </span>
            <h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              Take the scenic route through{" "}
              <span className="underline-accent">TBR</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
              Start with the chapter that matters most right now, then keep scrolling for the full experience.
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <Link
                  href={card.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 text-left transition-all hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,248,240,0.98) 100%)",
                    borderColor: "rgba(107,28,111,0.08)",
                    boxShadow: "0 18px 40px rgba(107,28,111,0.08)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full opacity-0 transition-all duration-500 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-30"
                    style={{ background: "#F1BB1A" }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(107,28,111,0.10) 0%, rgba(241,187,26,0.10) 100%)",
                      }}
                    >
                      <card.icon size={26} style={{ color: "#6B1C6F" }} />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                      style={{ background: "rgba(241,187,26,0.20)", color: "#6B1C6F" }}
                    >
                      Quick path
                    </span>
                  </div>
                  <h3
                    className="mt-6 text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {card.tagline}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-2.5"
                    style={{ color: "#F1BB1A" }}
                  >
                    Jump in
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VisitSection />
      <TradeSection />
      <ShopSection />
      <JustShelvedSection />
      <NextReadSection />

      {/* TikTok spotlight */}
      <section
        className="px-4 py-24 sm:px-6 lg:px-8"
        style={{ background: "rgba(255,255,255,0.78)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              TikTok spotlight
            </span>
            <h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              }}
            >
              A little <span className="underline-accent">motion</span> and personality.
            </h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "#4B5563" }}>
              The embed loads behind a styled placeholder, so the page feels intentional rather than empty
              while third-party content boots up.
            </p>
            <div
              className="mt-6 rounded-[28px] border p-5"
              style={{
                background: "linear-gradient(135deg, rgba(107,28,111,0.97), rgba(74,19,80,0.97))",
                borderColor: "rgba(107,28,111,0.12)",
                boxShadow: "0 24px 60px rgba(107,28,111,0.20)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/65">Now playing</p>
              <p className="mt-3 text-lg font-semibold text-white">Behind the scenes at @clackamas.book.ex</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Fresh finds, shelf tours, and bookish energy from inside the shop.
              </p>
              <a
                href="https://tiktok.com/@clackamas.book.ex"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#F1BB1A", color: "#1A1A1A" }}
              >
                Follow @clackamas.book.ex
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            <TikTokEmbed videoId="7321516299899703557" username="clackamas.book.ex" />
          </Reveal>
        </div>
      </section>

      <EventsSection />
      <LemmyFeatureSection />
      <ConnectSection />
      <FAQSection />
      <NewsletterCTA />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
