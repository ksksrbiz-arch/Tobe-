"use client";

import React from "react";
import { ExternalLink, ShoppingBag, BookOpen, Store, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const shopCards = [
  {
    icon: ShoppingBag,
    name: "PangoBooks",
    color: "#6B1C6F",
    bgGradient: "linear-gradient(135deg, rgba(107,28,111,0.10) 0%, rgba(139,46,144,0.06) 100%)",
    accent: "#8B2E90",
    description:
      "Browse our curated online selection on PangoBooks. Find that special title you've been searching for, delivered right to your door.",
    cta: "Browse PangoBooks",
    href: "https://www.pangobooks.com/seller/cltoberread2024",
    badge: "Online Shop",
  },
  {
    icon: BookOpen,
    name: "Bookshop.org",
    color: "#1a6b1c",
    bgGradient: "linear-gradient(135deg, rgba(26,107,28,0.10) 0%, rgba(34,197,94,0.06) 100%)",
    accent: "#16a34a",
    description:
      "Support us and independent bookstores everywhere through Bookshop.org. Every purchase helps small bookshops thrive.",
    cta: "Browse Bookshop",
    href: "https://bookshop.org/shop/tobereadclackamas",
    badge: "Support Indies",
  },
  {
    icon: Store,
    name: "In-Store Experience",
    color: "#b45309",
    bgGradient: "linear-gradient(135deg, rgba(180,83,9,0.10) 0%, rgba(241,187,26,0.10) 100%)",
    accent: "#F1BB1A",
    description:
      "Nothing beats wandering our shelves in person. Come browse thousands of titles, smell that wonderful old-book smell, and chat with fellow book lovers.",
    cta: "Get Directions",
    href: "https://maps.google.com/?q=7931+SE+King+Rd,+Milwaukie,+OR+97222",
    badge: "Best Experience",
  },
] as const;

export default function ShopSection() {
  return (
    <section
      id="shop"
      className="px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            Shop Online
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Shop Our <span className="underline-accent">Collection</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            Whether you prefer scrolling from the couch or wandering between shelves, we&apos;ve got you covered.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {shopCards.map((card, i) => (
            <Reveal key={card.name} delay={i * 80}>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 12px 30px rgba(107,28,111,0.08)",
                }}
              >
                {/* Header */}
                <div
                  className="relative px-6 pt-7 pb-5"
                  style={{ background: card.bgGradient }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.accent} 100%)`,
                      }}
                    >
                      <card.icon size={26} className="text-white" />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        background: card.color + "22",
                        color: card.color,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: card.color }}
                  >
                    {card.name}
                  </h3>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-6 py-6">
                  <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                    {card.description}
                  </p>

                  <div
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: card.color }}
                  >
                    {card.cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    <ExternalLink size={13} className="opacity-60" />
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full transition-transform duration-500 group-hover:scale-125"
                  style={{ background: card.color, opacity: 0.05 }}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
