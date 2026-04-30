"use client";

import React from "react";
import { ExternalLink, ShoppingBag, BookOpen, Store } from "lucide-react";

const shopCards = [
  {
    icon: ShoppingBag,
    name: "PangoBooks",
    color: "#6B1C6F",
    bgColor: "#6B1C6F10",
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
    bgColor: "#1a6b1c10",
    description:
      "Support us and independent bookstores everywhere through Bookshop.org. Every purchase helps small bookshops thrive.",
    cta: "Browse Bookshop",
    href: "https://bookshop.org/shop/tobereadclackamas",
    badge: "Support Indies",
    note: "⚠️ Update with real link",
  },
  {
    icon: Store,
    name: "In-Store Experience",
    color: "#b45309",
    bgColor: "#b4530910",
    description:
      "Nothing beats the experience of wandering our shelves in person! Come in to browse thousands of titles, smell that wonderful old book smell, and chat with fellow book lovers.",
    cta: "Get Directions",
    href: "https://maps.google.com/?q=7931+SE+King+Rd,+Milwaukie,+OR+97222",
    badge: "Best Experience",
  },
] as const;

export default function ShopSection() {
  return (
    <section id="shop" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#6B1C6F15", color: "#6B1C6F" }}
          >
            Shop Online
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Shop Our Collection
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#6B7280" }}>
            Whether you prefer shopping online or in person, we&apos;ve got you covered.
          </p>
          <div className="w-16 h-1 mx-auto rounded-full mt-4" style={{ background: "#F1BB1A" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shopCards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl"
              style={{ boxShadow: "0 4px 20px rgba(107,28,111,0.08)", background: "white" }}
            >
              {/* Card Header */}
              <div
                className="p-6 flex items-center gap-4"
                style={{ background: card.bgColor }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: card.color }}
                >
                  <card.icon size={22} className="text-white" />
                </div>
                <div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: card.color + "20", color: card.color }}
                  >
                    {card.badge}
                  </span>
                  <h3
                    className="font-bold text-lg mt-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: card.color }}
                  >
                    {card.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6">
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                  {card.description}
                </p>
                {"note" in card && card.note && (
                  <p className="mt-2 text-xs italic" style={{ color: "#9CA3AF" }}>{card.note}</p>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                  style={{ background: card.color }}
                >
                  {card.cta}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
