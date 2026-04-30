"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import {
  Award,
  BookMarked,
  BookOpen,
  Clock,
  MapPin,
  RefreshCw,
  ShoppingBag,
  Users,
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
                <div
                  className="h-3 rounded-full"
                  style={{ background: "rgba(31,41,55,0.08)" }}
                />
                <div
                  className="h-3 w-4/5 rounded-full"
                  style={{ background: "rgba(31,41,55,0.08)" }}
                />
                <div
                  className="h-3 w-2/3 rounded-full"
                  style={{ background: "rgba(31,41,55,0.08)" }}
                />
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
      <div
        className="mb-4 h-8 w-32 rounded-full"
        style={{ background: "rgba(107,28,111,0.1)" }}
      />
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

const ConnectSection = dynamic(() => import("@/components/ConnectSection"), {
  loading: () => <SectionSkeleton id="connect" eyebrow="Connect" title="Pulling in the community shelf..." muted />,
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
    color: "#6B1C6F",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    tagline: "Find us in Milwaukie, OR — Mon–Sat 10am–5pm",
    href: "#visit",
    color: "#6B1C6F",
  },
  {
    icon: RefreshCw,
    title: "Trade Books",
    tagline: "Bring your books in and earn store credit",
    href: "#trade",
    color: "#6B1C6F",
  },
  {
    icon: ShoppingBag,
    title: "Shop Online",
    tagline: "Browse thousands of titles on PangoBooks & Bookshop.org",
    href: "#shop",
    color: "#6B1C6F",
  },
  {
    icon: Users,
    title: "Connect",
    tagline: "Follow us on TikTok, Instagram, and Facebook",
    href: "#connect",
    color: "#6B1C6F",
  },
];

const stats = [
  { icon: Award, label: "45+ Years", sub: "Serving the community" },
  { icon: BookMarked, label: "Thousands of Titles", sub: "Always changing" },
  { icon: RefreshCw, label: "Trade Credit", sub: "Available in-store" },
  { icon: Clock, label: "Mon–Sat 10am–5pm", sub: "Come visit us!" },
];

export default function Home() {
  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#6B1C6F", "#F1BB1A", "#ffffff", "#8B2E90", "#F5CC45"],
      });
    } catch {
      // silently fail if confetti unavailable
    }
  }, []);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(241,187,26,0.10), transparent 28%), radial-gradient(circle at top right, rgba(107,28,111,0.10), transparent 24%), linear-gradient(180deg, #FDF8F0 0%, #FFFDF9 35%, #F8F2FF 100%)",
      }}
    >
      <Navbar />
      <HeroSection onConfetti={fireConfetti} />

      <section className="relative z-10 -mt-20 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div
            className="rounded-[28px] border p-6 backdrop-blur"
            style={{
              background: "rgba(255,255,255,0.82)",
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
              Browse the story, plan your visit, check the trade policy, and catch the latest social moments without hopping around.
            </p>
          </div>

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between rounded-[28px] border p-5 backdrop-blur"
              style={{
                background: "rgba(255,255,255,0.78)",
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
          ))}
        </div>
      </section>

      <StorySection />

      <section
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(253,248,240,0.82) 100%)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "#F1BB1A20", color: "#6B1C6F" }}
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
              Take the scenic route through TBR
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
              Start with the chapter that matters most right now, then keep scrolling for the full experience.
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col rounded-[28px] border p-8 text-left transition-all hover:-translate-y-2"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(253,248,240,0.98) 100%)",
                  borderColor: "rgba(107,28,111,0.08)",
                  boxShadow: "0 18px 40px rgba(107,28,111,0.08)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ background: "#6B1C6F10" }}
                  >
                    <card.icon size={26} style={{ color: card.color }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
                  >
                    Quick path
                  </span>
                </div>
                <h3
                  className="mt-6 text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {card.tagline}
                </p>
                <span className="mt-6 text-xs font-semibold uppercase tracking-wider" style={{ color: "#F1BB1A" }}>
                  Jump in ↓
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <VisitSection />
      <TradeSection />
      <ShopSection />

      <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ background: "rgba(255,255,255,0.72)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "#6B1C6F15", color: "#6B1C6F" }}
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
              A little motion and personality for the homepage.
            </h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "#4B5563" }}>
              The embed now loads behind a styled placeholder so the page feels intentional instead of empty while third-party content catches up.
            </p>
            <div
              className="mt-6 rounded-[28px] border p-5"
              style={{
                background: "linear-gradient(135deg, rgba(107,28,111,0.96), rgba(74,19,80,0.96))",
                borderColor: "rgba(107,28,111,0.12)",
                boxShadow: "0 24px 60px rgba(107,28,111,0.18)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/65">Now playing</p>
              <p className="mt-3 text-lg font-semibold text-white">Behind the scenes at @clackamas.book.ex</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Fresh finds, shelf tours, and bookish energy from inside the shop.
              </p>
              <a
                href="https://tiktok.com/@clackamas.book.ex"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "#F1BB1A", color: "#1A1A1A" }}
              >
                Follow @clackamas.book.ex
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <TikTokEmbed videoId="7321516299899703557" username="clackamas.book.ex" />
          </div>
        </div>
      </section>

      <ConnectSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
