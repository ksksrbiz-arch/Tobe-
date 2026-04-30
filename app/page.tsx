"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import TikTokEmbed from "@/components/TikTokEmbed";
import { BookOpen, MapPin, RefreshCw, ShoppingBag, Users, Clock, Award, BookMarked } from "lucide-react";

const exploreCards = [
  {
    icon: BookOpen,
    title: "Our Story",
    tagline: "45 years of connecting readers with books they love",
    href: "/about",
    color: "#6B1C6F",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    tagline: "Find us in Milwaukie, OR — Mon–Sat 10am–5pm",
    href: "/visit",
    color: "#6B1C6F",
  },
  {
    icon: RefreshCw,
    title: "Trade Books",
    tagline: "Bring your books in and earn store credit",
    href: "/trade",
    color: "#6B1C6F",
  },
  {
    icon: ShoppingBag,
    title: "Shop Online",
    tagline: "Browse thousands of titles on PangoBooks & Bookshop.org",
    href: "/shop",
    color: "#6B1C6F",
  },
  {
    icon: Users,
    title: "Connect",
    tagline: "Follow us on TikTok, Instagram, and Facebook",
    href: "/connect",
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
    <main className="min-h-screen">
      <Navbar />
      <HeroSection onConfetti={fireConfetti} />

      {/* Explore Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#FDF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: "#F1BB1A20", color: "#6B1C6F" }}
            >
              Explore
            </span>
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              Everything We Offer
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col items-center text-center p-8 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl"
                style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-colors group-hover:scale-110"
                  style={{ background: "#6B1C6F10" }}
                >
                  <card.icon size={26} style={{ color: card.color }} />
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {card.tagline}
                </p>
                <span
                  className="mt-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#F1BB1A" }}
                >
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TikTok Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#6B1C6F15", color: "#6B1C6F" }}
          >
            TikTok
          </span>
          <h2
            className="font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            }}
          >
            Follow Our Journey on TikTok 🎵
          </h2>
          <p className="mb-8 text-base" style={{ color: "#6B7280" }}>
            Watch us behind the scenes at @clackamas.book.ex
          </p>
          <div className="flex justify-center mb-8">
            <TikTokEmbed videoId="7321516299899703557" username="clackamas.book.ex" />
          </div>
          <a
            href="https://tiktok.com/@clackamas.book.ex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: "#010101" }}
          >
            Follow @clackamas.book.ex
          </a>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section style={{ background: "#6B1C6F" }} className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(241,187,26,0.2)" }}
                >
                  <stat.icon size={20} style={{ color: "#F1BB1A" }} />
                </div>
                <div
                  className="font-bold text-lg text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {stat.label}
                </div>
                <div className="text-xs text-white/60">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
