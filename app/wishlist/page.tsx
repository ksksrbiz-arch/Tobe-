"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import WishlistManager from "@/components/WishlistManager";
import Reveal from "@/components/Reveal";
import { Bell, BookMarked, Mail, Zap } from "lucide-react";

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
  {
    icon: Bell,
    title: "Instant email alert",
    body: "The moment a match lands on our shelf, you get an email — so you can grab it before anyone else.",
  },
  {
    icon: Mail,
    title: "No password required",
    body: "Sign in with a magic link sent to your email. Simple, secure, and one less password to remember.",
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
      <section className="px-4 py-16 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div
                  className="flex flex-col items-center rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
                    boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg, rgba(107,28,111,0.10), rgba(241,187,26,0.15))" }}
                  >
                    <f.icon size={22} style={{ color: "#6B1C6F" }} />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
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
            "radial-gradient(circle at 80% 20%, rgba(241,187,26,0.08), transparent 40%), linear-gradient(180deg, #FDF8F0 0%, #FFFDF9 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              Your list
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.4rem)",
              }}
            >
              Hunt for your <span className="underline-accent">next treasure</span>
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>
          <WishlistManager />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
