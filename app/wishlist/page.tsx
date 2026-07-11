"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import WishlistManager from "@/components/WishlistManager";
import Reveal from "@/components/Reveal";
import { Bell, BookMarked, Mail, Zap } from "lucide-react";
import { EMAIL_ENABLED } from "@/lib/flags";

// While email is paused (moving off Resend), the sign-in + hunt-list flow is
// unavailable, so we show a friendly notice instead. Flip EMAIL_ENABLED in
// lib/flags.ts to restore the live <WishlistManager />.
function WishlistComingSoon() {
  return (
    <div
      className="rounded-[28px] border-2 p-8 text-center shadow-xl"
      style={{
        background: "linear-gradient(180deg, rgba(253,248,240,0.98) 0%, rgba(255,255,255,0.98) 100%)",
        borderColor: "color-mix(in srgb, var(--purple) 14%, transparent)",
        boxShadow: "0 20px 60px color-mix(in srgb, var(--purple) 10%, transparent)",
      }}
    >
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
      >
        <BookMarked size={24} className="text-white" />
      </div>
      <h3
        className="mb-2 text-2xl font-bold"
        style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
      >
        Hunting lists are coming soon
      </h3>
      <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed" style={{ color: "#4B5563" }}>
        We&apos;re rebuilding our alerts so we can email you the moment a title on your list
        lands on our shelves. It&apos;ll be back shortly — in the meantime, come browse in
        person or online, and follow along on social for fresh arrivals.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/#shop" className="btn-primary pressable">
          Browse the shop
        </Link>
        <Link
          href="/visit"
          className="pressable inline-flex items-center justify-center rounded-2xl border-2 px-6 py-3 text-sm font-semibold"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 20%, transparent)", color: "var(--purple)" }}
        >
          Plan a visit
        </Link>
      </div>
    </div>
  );
}

// The last two pills describe the email-alert + magic-link flow. That flow is
// paused while EMAIL_ENABLED is false (see lib/flags.ts and WishlistComingSoon
// above), so we reword them to "coming soon"-consistent copy in that state to
// avoid promising something the very next block says is unavailable. When the
// flag is on, the live copy returns.
const features = [
  {
    icon: BookMarked,
    title: "Build your hunting list",
    body: "Add any title by ISBN. We store it securely against your account.",
  },
  {
    icon: Zap,
    title: "Automatic matching",
    body: "Every trade processed at the desk is checked against all active wishlists in seconds.",
  },
  EMAIL_ENABLED
    ? {
        icon: Bell,
        title: "Instant email alert",
        body: "The moment a match lands on our shelf, you get an email — so you can grab it before anyone else.",
      }
    : {
        icon: Bell,
        title: "Email alerts, coming soon",
        body: "We're rebuilding alerts so we can email you the moment a match lands on our shelf. Back shortly.",
      },
  EMAIL_ENABLED
    ? {
        icon: Mail,
        title: "No password required",
        body: "Sign in with a magic link sent to your email. Simple, secure, and one less password to remember.",
      }
    : {
        icon: Mail,
        title: "Passwordless sign-in, coming soon",
        body: "Magic-link sign-in returns alongside alerts — no password to remember when it does.",
      },
];

export default function WishlistPage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <PageHero
        title="My Hunting List"
        subtitle="Tell us what you're looking for and we'll alert you the moment it arrives."
        badge="Wishlist"
        imageUrl="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1600&q=80"
        scrollTargetId="wishlist"
      />

      {/* Feature pills */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, color-mix(in srgb, var(--purple) 7%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--gold) 8%, transparent) 0%, transparent 50%), linear-gradient(180deg, #FFFEFB 0%, var(--paper) 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div
                  className="flex flex-col items-center rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(180deg, var(--paper) 0%, #FFFEFB 100%)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--purple) 10%, transparent), color-mix(in srgb, var(--gold) 15%, transparent))" }}
                  >
                    <f.icon size={22} style={{ color: "var(--purple)" }} />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wishlist manager */}
      <section
        id="wishlist"
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--gold) 8%, transparent), transparent 40%), linear-gradient(180deg, var(--paper) 0%, #FFFDF9 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)", color: "var(--purple)" }}
            >
              Your list
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--purple)",
                fontSize: "clamp(1.9rem, 4vw, 2.4rem)",
              }}
            >
              Hunt for your <span className="underline-accent">next treasure</span>
            </h2>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
          </Reveal>
          {EMAIL_ENABLED ? <WishlistManager /> : <WishlistComingSoon />}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
