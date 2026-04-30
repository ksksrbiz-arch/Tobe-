"use client";

import React from "react";
import { ExternalLink, Star } from "lucide-react";

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.54V6.88a4.85 4.85 0 01-1.02-.19z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const socials = [
  {
    name: "Instagram",
    handle: "@ToBeRead_clackamas",
    icon: InstagramIcon,
    href: "https://instagram.com/ToBeRead_clackamas",
    color: "#E1306C",
  },
  {
    name: "TikTok",
    handle: "@clackamas.book.ex",
    icon: TikTokIcon,
    href: "https://tiktok.com/@clackamas.book.ex",
    color: "#010101",
  },
  {
    name: "Facebook",
    handle: "Clackamas Book Exchange",
    icon: FacebookIcon,
    href: "https://facebook.com/ClackamasBookExchange",
    color: "#1877F2",
  },
];

const testimonials = [
  {
    quote:
      "This place is an absolute gem! I've been coming here for years and the new owners have kept all the charm while adding such a warm, welcoming energy. Found three rare fantasy novels I'd been searching for!",
    author: "Sarah M.",
    location: "Milwaukie, OR",
  },
  {
    quote:
      "The best used bookstore in the Portland metro area, hands down. Fair trade credits, amazing selection, and the staff actually loves books. My kids and I come every weekend!",
    author: "David K.",
    location: "Oregon City, OR",
  },
  {
    quote:
      "Cozy, eclectic, and full of treasures. I walked in looking for one book and came out with eight. The new branding is beautiful and the store feels like home. So excited for TBR 2026!",
    author: "Priya L.",
    location: "Portland, OR",
  },
];

export default function ConnectSection() {
  return (
    <section
      id="connect"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#FDF8F0" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#F1BB1A20", color: "#6B1C6F" }}
          >
            Connect
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Join Our Community
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                style={{ background: "#6B1C6F", color: "white" }}
              >
                <s.icon />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{s.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{s.handle}</p>
              </div>
              <ExternalLink size={14} className="ml-auto opacity-40" style={{ color: "#6B1C6F" }} />
            </a>
          ))}
        </div>

        {/* Google Reviews */}
        <div
          className="p-7 rounded-2xl text-center mb-14"
          style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#F1BB1A" style={{ color: "#F1BB1A" }} />
            ))}
          </div>
          <h3
            className="font-bold text-xl mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
          >
            Reviews Help Us Grow!
          </h3>
          <p className="text-sm mb-5" style={{ color: "#6B7280" }}>
            Love our store? Leave us a Google review — it truly makes a difference for small, independent businesses like ours. ❤️
          </p>
          <a
            href="https://g.page/r/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: "#6B1C6F" }}
          >
            Leave a Google Review
            <ExternalLink size={14} />
          </a>
          <p className="mt-3 text-xs italic" style={{ color: "#9CA3AF" }}>
            *Google Business link placeholder — update in production
          </p>
        </div>

        {/* Testimonials */}
        <h3
          className="font-bold text-2xl text-center mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
        >
          What Readers Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl relative"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
            >
              <div
                className="text-5xl leading-none mb-3 font-serif"
                style={{ color: "#F1BB1A" }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>
                {t.quote}
              </p>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#6B1C6F" }}>{t.author}</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
