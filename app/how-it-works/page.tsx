"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import BookLogo from "@/components/BookLogo";
import {
  BookOpen,
  Coins,
  ShoppingBag,
  Check,
  Minus,
  Clock,
  CreditCard,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";

const chapters = [
  {
    n: "01",
    eyebrow: "Chapter one",
    title: "Bring books in",
    body: "Drop a bag or box on the counter during open hours. We sort it together — usually about ten minutes.",
    icon: BookOpen,
  },
  {
    n: "02",
    eyebrow: "Chapter two",
    title: "Earn store credit",
    body: "One credit per paperback, two per hardcover. Credit lives on your account under your name. It never expires.",
    icon: Coins,
  },
  {
    n: "03",
    eyebrow: "Chapter three",
    title: "Take home the next",
    body: "Spend credit on whatever speaks to you. Mix credit and cash. Walk out with a fresh stack the same afternoon.",
    icon: ShoppingBag,
  },
];

const yesList = [
  ["Fiction", "paperback or hardcover"],
  ["Most non-fiction", "in readable shape"],
  ["Kids' books & YA", "always welcome"],
  ["Recent editions", "earn the best credit"],
  ["Cookbooks, poetry, graphic novels", ""],
];

const noList = [
  "Textbooks & encyclopedias",
  "Magazines & periodicals",
  "Reader's Digest condensed editions",
  "Anything water- or smoke-damaged",
  "Loose, unbound, or heavily marked",
];

const fineprint = [
  {
    q: "Daily trade-in limit?",
    a: "None. Bring as many as you can carry. We may be selective when shelves are full — we'll tell you why.",
  },
  {
    q: "Can I share credit with a partner?",
    a: "Credit is tied to one person, but family members can shop on each other's accounts at the counter.",
  },
  {
    q: "Cash, card, or both?",
    a: "Both. Credit and dollars work side by side on the same purchase.",
  },
  {
    q: "Special orders or rare titles?",
    a: "Sometimes — just ask. We'll do our best to track it down through our network.",
  },
  {
    q: "Forgot which number you used?",
    a: "No problem. We'll find you in the system by name or last four digits.",
  },
];

export const dynamic = "force-static";

export default function HowItWorksPage() {
  return (
    <main id="main">
      <Navbar />

      <PageHero
        badge="A six-minute tour"
        title="How the book exchange works"
        subtitle="No app. No membership. Just books, credit, and the next read on the shelf."
        imageUrl="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
        scrollTargetId="who-we-are"
      />

      {/* ─── Who we are ─── */}
      <section
        id="who-we-are"
        className="px-4 py-20 sm:px-6 md:py-28"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow mb-4 inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              Who we are
            </span>
            <h2 className="display-hero mt-3" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              A small bookstore with <em>forty-five years</em> of stories.
            </h2>
            <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
              We&apos;re <strong style={{ color: "var(--purple)" }}>To Be Read</strong> — known
              around here for forty-five years as the Clackamas Book Exchange. Same shelves, same
              readers, same trade-in counter. New name out front in 2026.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <Stat label="Since" value="1979" />
              <Divider />
              <Stat label="Books traded" value="200k+" />
              <Divider />
              <Stat label="Storefront" value="1" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80"
                alt="Storefront on SE King Road — warm window light, hand-painted sign."
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(42,9,48,0.55) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div
                  className="text-xs font-bold uppercase tracking-[0.22em]"
                  style={{ color: "var(--gold)" }}
                >
                  Storefront · SE King Road
                </div>
                <div className="mt-1 font-serif italic" style={{ fontSize: "1.15rem" }}>
                  Warm window light, hand-painted sign.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Three chapters overview ─── */}
      <section
        className="px-4 py-20 sm:px-6 md:py-28"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(241,187,26,0.10) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(107,28,111,0.10) 0%, transparent 50%), linear-gradient(180deg, #FDF8F0 0%, #F5EFE0 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow mb-4 inline-flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
                How the exchange works
              </span>
              <h2
                className="mt-4 font-serif font-bold"
                style={{
                  color: "var(--purple)",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                }}
              >
                The whole thing, in{" "}
                <em
                  style={{
                    background: "var(--grad-text)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  three chapters
                </em>
                .
              </h2>
              <p
                className="mt-4 font-serif italic"
                style={{ color: "var(--ink-soft)", fontSize: "1.15rem" }}
              >
                No app. No membership. Just books, credit, and the next read on the shelf.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {chapters.map((c, i) => (
              <Reveal key={c.n} delay={i * 100}>
                <article
                  className="group flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(107,28,111,0.10)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="font-serif italic"
                      style={{
                        color: "var(--purple)",
                        fontSize: "5.5rem",
                        lineHeight: 0.85,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {c.n}
                    </div>
                    <c.icon size={32} style={{ color: "var(--gold)" }} aria-hidden />
                  </div>
                  <div
                    className="mt-6 text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: "var(--gold)" }}
                  >
                    {c.eyebrow}
                  </div>
                  <h3
                    className="mt-2 font-serif font-bold"
                    style={{ color: "var(--purple)", fontSize: "1.75rem", lineHeight: 1.1 }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3" style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    {c.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What we look for ─── */}
      <section className="px-4 py-20 sm:px-6 md:py-28" style={{ background: "var(--background)" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow mb-4 inline-flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
                What we look for
              </span>
              <h2
                className="mt-4 font-serif font-bold"
                style={{
                  color: "var(--purple)",
                  fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
                  lineHeight: 1.1,
                }}
              >
                Most books we&apos;ll happily take.{" "}
                <em
                  style={{
                    background: "var(--grad-text)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  A few
                </em>{" "}
                we won&apos;t.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div
                className="h-full rounded-3xl p-8"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(107,28,111,0.10)",
                  borderLeft: "6px solid var(--gold)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--grad-gold)", color: "var(--purple)" }}
                  >
                    <Check size={24} strokeWidth={3} />
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: "var(--purple)" }}
                  >
                    Yes please
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {yesList.map(([k, v]) => (
                    <li key={k} style={{ color: "var(--ink-soft)", fontSize: "1.05rem" }}>
                      <span style={{ color: "var(--purple)", fontWeight: 600 }}>{k}</span>
                      {v && <> — {v}</>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="h-full rounded-3xl p-8"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(107,28,111,0.10)",
                  borderLeft: "6px solid rgba(107,28,111,0.4)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "rgba(107,28,111,0.12)", color: "var(--purple)" }}
                  >
                    <Minus size={24} strokeWidth={3} />
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: "var(--purple)" }}
                  >
                    We&apos;ll pass on
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {noList.map((s) => (
                    <li key={s} style={{ color: "var(--ink-soft)", fontSize: "1.05rem" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <p
            className="mt-10 text-center font-serif italic"
            style={{ color: "var(--ink-soft)", fontSize: "1.15rem" }}
          >
            Not sure? Bring it in — we&apos;ll sort it together at the counter.
          </p>
        </div>
      </section>

      {/* ─── Store credit ─── */}
      <section
        className="px-4 py-20 sm:px-6 md:py-28"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(241,187,26,0.10) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(107,28,111,0.10) 0%, transparent 50%), linear-gradient(180deg, #FDF8F0 0%, #F5EFE0 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              Chapter two · Store credit
            </span>
            <h2
              className="mt-4 font-serif font-bold"
              style={{
                color: "var(--purple)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Every book in{" "}
              <em
                style={{
                  background: "var(--grad-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                earns credit
              </em>
              .
            </h2>
            <p
              className="mt-4 max-w-2xl font-serif italic"
              style={{ color: "var(--ink-soft)", fontSize: "1.15rem" }}
            >
              Credit lives on your account, under your name and phone number. It never expires.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-5">
            <Reveal className="md:col-span-3">
              <div
                className="overflow-hidden rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(107,28,111,0.10)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div
                  className="px-8 pt-8"
                  style={{ borderBottom: "1px solid rgba(107,28,111,0.10)", paddingBottom: "1rem" }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: "var(--purple)" }}
                  >
                    Trade-in rate
                  </div>
                </div>
                <CreditRow
                  label="Paperback"
                  sub="Standard mass-market or trade"
                  value="1"
                  unit="credit"
                />
                <CreditRow
                  label="Hardcover"
                  sub="In good readable shape"
                  value="2"
                  unit="credits"
                />
                <div
                  className="flex items-center justify-between gap-4 px-8 py-7"
                  style={{ background: "rgba(241,187,26,0.10)" }}
                >
                  <div>
                    <div
                      className="font-serif"
                      style={{ color: "var(--purple)", fontSize: "1.5rem", fontWeight: 600 }}
                    >
                      High-demand titles
                    </div>
                    <div className="text-sm" style={{ color: "var(--ink-muted)" }}>
                      Recent releases, hot authors, signed copies
                    </div>
                  </div>
                  <div
                    className="font-serif italic font-bold"
                    style={{ color: "var(--gold)", fontSize: "1.75rem" }}
                  >
                    + bonus
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="md:col-span-2">
              <div className="flex h-full flex-col justify-center gap-7">
                <SideNote
                  icon={Clock}
                  caps="Never expires"
                  body="Come back next week or next year — your credit will be waiting."
                />
                <Hairline />
                <SideNote
                  icon={Sparkles}
                  caps="No card, no app"
                  body="Just your name and phone number. We'll find you in the system."
                />
                <Hairline />
                <SideNote
                  icon={CreditCard}
                  caps="Same-day spend"
                  body="Credit you earn today is yours to spend before you leave."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Browse & take home ─── */}
      <section className="px-4 py-20 sm:px-6 md:py-28" style={{ background: "var(--background)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80"
                alt="The shelves — fiction wall, reading chair, candle-tone afternoon light."
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(42,9,48,0.55) 100%)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              Chapter three · Take home
            </span>
            <h2
              className="mt-4 font-serif font-bold"
              style={{
                color: "var(--purple)",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                lineHeight: 1.05,
              }}
            >
              Walk the shelves.
              <br />
              <em
                style={{
                  background: "var(--grad-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Pick what speaks.
              </em>
            </h2>

            <div className="mt-8 space-y-5">
              <PriceRow numeral="1">
                Most paperbacks cost <strong style={{ color: "var(--purple)" }}>one credit</strong>.
              </PriceRow>
              <PriceRow numeral="2">
                Hardcovers cost <strong style={{ color: "var(--purple)" }}>two credits</strong>.
              </PriceRow>
              <PriceRow numeral="$">
                Short on credit? Pay the difference in{" "}
                <strong style={{ color: "var(--purple)" }}>cash or card</strong> — they work side by
                side.
              </PriceRow>
            </div>

            <div
              className="mt-8 rounded-2xl px-6 py-5"
              style={{
                background: "rgba(241,187,26,0.18)",
                borderLeft: "4px solid var(--gold)",
              }}
            >
              <p
                className="font-serif italic"
                style={{ color: "var(--purple)", fontSize: "1.1rem", lineHeight: 1.45 }}
              >
                Bring a bag in, leave with a different one — that&apos;s a full TBR loop in a single
                afternoon.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Fine print ─── */}
      <section
        className="px-4 py-20 sm:px-6 md:py-28"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(241,187,26,0.10) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(107,28,111,0.10) 0%, transparent 50%), linear-gradient(180deg, #FDF8F0 0%, #F5EFE0 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              The fine print
            </span>
            <h2
              className="mt-4 font-serif font-bold"
              style={{
                color: "var(--purple)",
                fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                lineHeight: 1.1,
              }}
            >
              A few practical things,{" "}
              <em
                style={{
                  background: "var(--grad-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                just so you know
              </em>
              .
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="mt-10 overflow-hidden rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(107,28,111,0.10)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <dl>
                {fineprint.map((row, idx) => (
                  <div
                    key={row.q}
                    className="grid gap-3 px-8 py-6 md:grid-cols-[38%_1fr] md:gap-8"
                    style={
                      idx < fineprint.length - 1
                        ? { borderBottom: "1px solid rgba(107,28,111,0.10)" }
                        : undefined
                    }
                  >
                    <dt
                      className="font-serif italic"
                      style={{ color: "var(--purple)", fontSize: "1.15rem" }}
                    >
                      {row.q}
                    </dt>
                    <dd style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>{row.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Visit us ─── */}
      <section
        className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-32"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(241,187,26,0.18) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(139,46,144,0.55) 0%, transparent 50%), linear-gradient(135deg, #4A1350 0%, #2A0930 100%)",
          color: "#FFFDF9",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.30em]"
              style={{ background: "rgba(241,187,26,0.18)", color: "var(--gold)" }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              Plan your visit
            </span>
            <h2
              className="mt-5 font-serif font-bold"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)", lineHeight: 1.05 }}
            >
              Come see us.{" "}
              <em
                style={{
                  background:
                    "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 50%, #FCE8A6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Walking in is our favorite.
              </em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <VisitBlock icon={MapPin} caps="Address">
              <div className="font-serif" style={{ fontSize: "1.45rem", fontWeight: 600 }}>
                7931 SE King Rd
                <br />
                Milwaukie, OR 97222
              </div>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                Just off McLoughlin, two blocks from the bakery.
              </p>
            </VisitBlock>

            <VisitBlock icon={Clock} caps="Hours">
              <div className="font-serif" style={{ fontSize: "1.45rem", fontWeight: 600 }}>
                Mon–Sat
                <br />
                10am – 5pm
              </div>
              <p
                className="mt-3 font-serif italic text-sm"
                style={{ color: "rgba(255,253,249,0.65)" }}
              >
                …may open late for a chapter.
              </p>
            </VisitBlock>

            <VisitBlock icon={Phone} caps="Reach us">
              <div className="space-y-2 font-serif" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                <div className="flex items-center gap-2">
                  <Phone size={16} aria-hidden /> (503) 555-0179
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} aria-hidden /> hello@tobereadbooks.com
                </div>
                <div
                  className="flex items-center gap-2 italic"
                  style={{ color: "var(--gold)" }}
                >
                  <Instagram size={16} aria-hidden /> @tobereadbooks
                </div>
              </div>
            </VisitBlock>
          </div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section
        className="relative overflow-hidden px-4 py-24 text-center sm:px-6 md:py-32"
        style={{ background: "var(--background-gradient), var(--background)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mx-auto" style={{ width: 96 }}>
              <BookLogo />
            </div>
            <h2
              className="mt-6 font-serif font-bold"
              style={{
                color: "var(--purple)",
                fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.015em",
              }}
            >
              Swap.{" "}
              <em
                style={{
                  background: "var(--grad-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Read.
              </em>{" "}
              Repeat.
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl font-serif italic"
              style={{ color: "var(--ink-soft)", fontSize: "1.15rem" }}
            >
              Forty-five years of doing it this way. We&apos;re not changing the recipe — just the
              sign out front.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/trade"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--grad-purple)", color: "#FFFDF9" }}
              >
                Start a trade
              </Link>
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
                style={{
                  border: "1.5px solid var(--purple)",
                  color: "var(--purple)",
                  background: "transparent",
                }}
              >
                Plan a visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: "var(--purple)" }}
      >
        {label}
      </div>
      <div
        className="mt-1 font-serif font-bold"
        style={{ color: "var(--purple)", fontSize: "2.5rem", lineHeight: 1 }}
      >
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 56,
        background: "rgba(107,28,111,0.20)",
      }}
    />
  );
}

function Hairline() {
  return (
    <div
      style={{
        height: 1,
        background: "linear-gradient(90deg, rgba(107,28,111,0.20), transparent)",
      }}
    />
  );
}

function CreditRow({
  label,
  sub,
  value,
  unit,
}: {
  label: string;
  sub: string;
  value: string;
  unit: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-8 py-7"
      style={{ borderBottom: "1px solid rgba(107,28,111,0.10)" }}
    >
      <div>
        <div
          className="font-serif"
          style={{ color: "var(--purple)", fontSize: "1.5rem", fontWeight: 600 }}
        >
          {label}
        </div>
        <div className="text-sm" style={{ color: "var(--ink-muted)" }}>
          {sub}
        </div>
      </div>
      <div
        className="font-serif italic font-bold"
        style={{ color: "var(--purple)", fontSize: "2.75rem", lineHeight: 1 }}
      >
        {value}
        <span
          className="ml-2 not-italic font-medium"
          style={{ fontSize: "0.95rem", color: "var(--ink-muted)" }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

function SideNote({
  icon: Icon,
  caps,
  body,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  caps: string;
  body: string;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: "var(--gold)" }}
      >
        <Icon size={16} style={{ color: "var(--gold)" }} />
        {caps}
      </div>
      <p className="mt-2" style={{ color: "var(--ink-soft)", fontSize: "1.1rem", lineHeight: 1.5 }}>
        {body}
      </p>
    </div>
  );
}

function PriceRow({ numeral, children }: { numeral: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-5">
      <div
        className="font-serif italic font-bold"
        style={{ color: "var(--gold)", fontSize: "2.4rem", lineHeight: 1, minWidth: 48 }}
      >
        {numeral}
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: "1.1rem", lineHeight: 1.5 }}>{children}</p>
    </div>
  );
}

function VisitBlock({
  icon: Icon,
  caps,
  children,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  caps: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-3xl p-8"
      style={{
        background: "rgba(255,253,249,0.06)",
        border: "1px solid rgba(255,253,249,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: "var(--gold)" }}
      >
        <Icon size={18} style={{ color: "var(--gold)" }} />
        {caps}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
