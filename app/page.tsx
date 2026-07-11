import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import DustMotes from "@/components/DustMotes";
import SectionDivider from "@/components/SectionDivider";
import ReadingRoomTeaser from "@/components/ReadingRoomTeaser";
import SummerReadingBanner from "@/components/SummerReadingBanner";
import ClosureBanner from "@/components/ClosureBanner";
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
      style={{ background: muted ? "var(--paper)" : "rgba(255,255,255,0.82)" }}
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div
            className="mx-auto mb-4 h-7 w-28 rounded-full"
            style={{ background: "color-mix(in srgb, var(--purple) 12%, transparent)" }}
          />
          <div
            className="mx-auto h-10 w-full max-w-md rounded-2xl"
            style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)" }}
          />
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ background: "color-mix(in srgb, var(--gold) 60%, transparent)" }}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[28px] border p-6"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)",
                boxShadow: "0 20px 40px color-mix(in srgb, var(--purple) 6%, transparent)",
              }}
            >
              <div
                className="mb-5 h-12 w-12 rounded-2xl"
                style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)" }}
              />
              <div
                className="mb-3 h-5 rounded-full"
                style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
              />
              <div className="space-y-2">
                <div className="h-3 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
                <div className="h-3 w-4/5 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
                <div className="h-3 w-2/3 rounded-full" style={{ background: "rgba(31,41,55,0.08)" }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
          {eyebrow} · {title}
        </p>
      </div>
    </section>
  );
}

function TikTokSkeleton() {
  return (
    <div
      className="w-full max-w-[605px] animate-pulse rounded-[32px] border p-4 sm:p-5"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)",
        boxShadow: "0 24px 55px color-mix(in srgb, var(--purple) 8%, transparent)",
      }}
    >
      <div className="mb-4 h-8 w-32 rounded-full" style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)" }} />
      <div
        className="h-[clamp(20rem,58vw,27rem)] rounded-[24px]"
        style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--purple) 8%, transparent), color-mix(in srgb, var(--gold) 12%, transparent))" }}
      />
    </div>
  );
}

const TBRLoopEmbed = dynamic(
  () => import("@/components/TBRLoop").then((m) => ({ default: m.TBRLoopEmbed })),
  { loading: () => <SectionSkeleton eyebrow="TBR Loop" title="Spinning up the loop..." /> },
);

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

const CookbookCurationGallery = dynamic(
  () => import("@/components/CookbookCurationGallery").then((m) => ({ default: m.CookbookCurationGallery })),
  { loading: () => <SectionSkeleton eyebrow="Newly Curated" title="Plating the cookbook area..." /> },
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

const ShelfPicks = dynamic(() => import("@/components/ShelfPicks"), {
  loading: () => <SectionSkeleton eyebrow="Staff Shelf" title="Stocking the staff shelf..." />,
});

const BookishQuote = dynamic(() => import("@/components/BookishQuote"), {
  loading: () => (
    <div className="px-4 py-12 sm:py-20">
      <div
        className="mx-auto h-56 max-w-3xl animate-pulse rounded-[28px]"
        style={{ background: "color-mix(in srgb, var(--purple) 6%, transparent)" }}
      />
    </div>
  ),
});

const NewsletterCTA = dynamic(() => import("@/components/NewsletterCTA"), {
  loading: () => (
    <div className="px-4 py-12 sm:py-20">
      <div
        className="mx-auto h-48 max-w-4xl animate-pulse rounded-[36px]"
        style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
      />
    </div>
  ),
});

const LatestTikTok = dynamic(() => import("@/components/LatestTikTok"), {
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

// Statically prerendered, but revalidated daily so date-gated banners (the
// closure notice, seasonal programs like Summer Reading) appear and retire
// on schedule.
export const revalidate = 86400;

export default function Home() {
  return (
    <main
      id="main"
      className="min-h-screen overflow-x-hidden animate-page-enter"
      style={{
        background:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--gold) 10%, transparent), transparent 28%), radial-gradient(circle at top right, color-mix(in srgb, var(--purple) 10%, transparent), transparent 24%), linear-gradient(180deg, var(--paper) 0%, #FFFDF9 35%, #F8F2FF 100%)",
      }}
    >
      <Navbar />
      <HeroSection />

      {/* One-off shop closure notice — date-gated, renders only through the
          closure date and retires itself the next morning. See
          lib/storeHours.ts (CLOSURES). */}
      <ClosureBanner />

      {/* Seasonal program spotlight — date-gated, renders only while active.
          Calendar buttons are omitted here to keep above-the-fold JS minimal;
          they live on the Events and dedicated Summer Reading pages. */}
      <SummerReadingBanner showAddToCalendar={false} />

      {/* AI Matchmaker — promoted near the top so it's the first interactive
          feature visitors meet right after the hero. */}
      <NextReadSection />

      {/* TBR Loop preview section */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:py-20 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,248,240,0.60) 0%, rgba(255,253,249,0.90) 100%)",
        }}
      >
        <DustMotes />
        {/* Near-fold intro: paint immediately via the CSS-only `.stagger`
            utility (children fade in via CSS) instead of the JS-gated <Reveal>
            island, so this content isn't held at opacity:0 until hydration. */}
        <div className="stagger relative z-10 mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--purple)" }}
            >
              Swap · Read · Repeat
            </span>
            <h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              The TBR Loop
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--muted)" }}>
              Bring a book, earn credit, pick something new. That&apos;s the loop — and it never gets old.
            </p>
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </div>

          {/* 1:1 aspect-ratio container for the animation */}
          <div
            className="relative mx-auto overflow-hidden rounded-[28px]"
            style={{
              maxWidth: 520,
              aspectRatio: "1 / 1",
              boxShadow: "0 36px 90px color-mix(in srgb, var(--purple) 18%, transparent), 0 8px 20px color-mix(in srgb, var(--gold) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--purple) 10%, transparent)",
            }}
          >
            <TBRLoopEmbed />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/loop"
              className="btn-primary pressable"
            >
              Open full-screen loop
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-16 px-4 pb-10 sm:px-6 lg:px-8">
        {/* Near-fold: children fade in via the CSS-only `.stagger` utility so
            the strip paints immediately rather than waiting on the <Reveal>
            JS island (which holds content at opacity:0 until hydration). */}
        <div
          className="stagger mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]"
        >
          <div
            className="h-full rounded-[28px] border p-6"
            style={{
              background: "rgba(255,255,255,0.93)",
              borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)",
              boxShadow: "0 24px 60px color-mix(in srgb, var(--purple) 12%, transparent)",
            }}
          >
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)", color: "var(--purple)" }}
            >
              A warmer welcome
            </span>
            <h2
              className="mt-4 text-2xl font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
            >
              More than a quick landing page.
            </h2>
            <p className="mt-3 text-sm leading-6" style={{ color: "#4B5563" }}>
              Browse the story, plan your visit, check the trade policy, and catch the latest social moments — without hopping around.
            </p>
          </div>
          {stats.map((stat) => (
            <Tilt key={stat.label} className="h-full rounded-[28px]" max={6} scale={1.02}>
              <div
                className="flex h-full flex-col justify-between rounded-[28px] border p-5 transition-shadow"
                style={{
                  background: "rgba(255,255,255,0.93)",
                  borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)",
                  boxShadow: "0 20px 45px color-mix(in srgb, var(--purple) 8%, transparent)",
                }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)" }}
                >
                  <stat.icon size={20} style={{ color: "var(--purple)" }} />
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
                >
                  {stat.label}
                </div>
                <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {stat.sub}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      <StorySection />

      <SectionDivider variant="book" label="Explore" muted />

      {/* Explore grid */}
      <section
        className="relative overflow-hidden px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(253,248,240,0.86) 100%)",
        }}
      >
        <DustMotes />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--purple)" }}
            >
              Explore
            </span>
            <h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              Take the scenic route through{" "}
              <span className="underline-accent">TBR</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "var(--muted)" }}>
              Start with the chapter that matters most right now, then keep scrolling for the full experience.
            </p>
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <Tilt className="h-full rounded-[28px]" max={7} scale={1.02}>
                <Link
                  href={card.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 text-left transition-all hover:shadow-2xl active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,248,240,0.98) 100%)",
                    borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)",
                    boxShadow: "0 18px 40px color-mix(in srgb, var(--purple) 8%, transparent)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full opacity-0 transition-all duration-500 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-30"
                    style={{ background: "var(--gold)" }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, color-mix(in srgb, var(--purple) 10%, transparent) 0%, color-mix(in srgb, var(--gold) 10%, transparent) 100%)",
                      }}
                    >
                      <card.icon size={26} style={{ color: "var(--purple)" }} />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                      style={{ background: "color-mix(in srgb, var(--gold) 20%, transparent)", color: "var(--purple)" }}
                    >
                      Quick path
                    </span>
                  </div>
                  <h3
                    className="mt-6 text-xl font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {card.tagline}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-2.5"
                    style={{ color: "var(--gold)" }}
                  >
                    Jump in
                    <ArrowRight size={13} className="icon-nudge" />
                  </span>
                </Link>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VisitSection />
      <TradeSection />
      <ShopSection />
      <SectionDivider variant="sparkle" label="Just Shelved" />

      {/* content-visibility: auto skips rendering these heavy sections until
          they're near the viewport, cutting initial paint work significantly. */}
      <div className="cv-auto-tall">
        <JustShelvedSection />
        <CookbookCurationGallery />
      </div>

      {/* TikTok spotlight */}
      <div className="cv-auto">
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{ background: "rgba(255,255,255,0.78)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)", color: "var(--purple)" }}
            >
              TikTok spotlight
            </span>
            <h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              }}
            >
              Behind the <span className="underline-accent">shelves</span>.
            </h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "#4B5563" }}>
              Fresh finds, weird treasures, and the occasional very good dog spotted near the children&apos;s section. Follow along for shelf tours, new arrivals, and the kind of bookish energy that makes you want to come in just to browse.
            </p>
            <div
              className="mt-6 rounded-[28px] border p-5"
              style={{
                background: "linear-gradient(135deg, color-mix(in srgb, var(--purple) 97%, transparent), color-mix(in srgb, var(--purple-dark) 97%, transparent))",
                borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)",
                boxShadow: "0 24px 60px color-mix(in srgb, var(--purple) 20%, transparent)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/65">Now playing</p>
              <p className="mt-3 text-lg font-semibold text-white">@clackamas.book.ex on TikTok</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                45 years of stories — and we&apos;re finally showing you what&apos;s behind the stacks.
              </p>
              <a
                href="https://tiktok.com/@clackamas.book.ex"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine pressable mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                style={{ background: "var(--gold)", color: "#1A1A1A" }}
              >
                Follow @clackamas.book.ex
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            {/* Newest TikTok via /api/tiktok-latest (TIKTOK_RSS_URL); falls back
                to a known-good recent clip until the feed is configured. */}
            <LatestTikTok
              fallback={[{ videoId: "7647996870769331469", username: "clackamas.book.ex" }]}
              limit={1}
            />
          </Reveal>
        </div>
      </section>
      </div>

      <SectionDivider variant="book" label="Staff Shelf" muted />
      <div className="cv-auto">
        <ShelfPicks />
      </div>

      <div className="cv-auto">
        <EventsSection />
        <LemmyFeatureSection />
        <BookishQuote />
      </div>
      <div className="cv-auto">
        <ReadingRoomTeaser />
      </div>
      <SectionDivider variant="bookmark" label="Stay in touch" muted />
      <div className="cv-auto">
        <ConnectSection />
        <FAQSection />
        <NewsletterCTA />
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
