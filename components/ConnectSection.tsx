"use client";

import React from "react";
import { ExternalLink, Star } from "lucide-react";
import Reveal from "./Reveal";
import GoogleReviews from "./GoogleReviews";

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.54V6.88a4.85 4.85 0 01-1.02-.19z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YelpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.16 12.594l-4.995 1.624a1.04 1.04 0 00-.679 1.296c.029.075.064.146.107.213l2.659 4.165a1.041 1.041 0 001.452.27 9.444 9.444 0 003.077-3.96l.026-.066a1.041 1.041 0 00-.624-1.327 12.61 12.61 0 00-1.023-.215zm-7.32-1.063a1.041 1.041 0 001.357.61c.073-.027.142-.064.207-.108L18.564 9.5a1.041 1.041 0 00.291-1.413 9.464 9.464 0 00-4.024-3.018 1.041 1.041 0 00-1.4.703 12.49 12.49 0 00-.591 5.759zm-1.59 2.018l-2.65 4.18a1.041 1.041 0 00.291 1.435c.067.043.139.078.215.105 1.34.474 2.781.566 4.176.245.4-.092.66-.479.62-.886a12.46 12.46 0 00-1.353-4.857 1.041 1.041 0 00-1.299-.222zm-1.49-2.76L9.616 4.7a1.041 1.041 0 00-1.397-.42 16.83 16.83 0 00-3.43 2.4 1.041 1.041 0 00-.18 1.388l4.32 4.85a1.041 1.041 0 001.49-.085c.05-.06.092-.126.124-.197a16.94 16.94 0 00-.78-1.847zm-2.005 4.49l-3.687 1.07a1.041 1.041 0 00-.7 1.42c.486 1.27 1.245 2.422 2.226 3.378a1.041 1.041 0 001.435.067l2.787-2.633a1.041 1.041 0 00-.061-1.581 5.84 5.84 0 00-2-1.72z" />
  </svg>
);

const BookshopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 3h13a3 3 0 013 3v15a1 1 0 01-1.45.89L13 19l-5.55 2.89A1 1 0 016 21V6a3 3 0 01-3-3zm2 0v18l5-2.6 5 2.6V6a1 1 0 00-1-1H6zm12 0a1 1 0 011 1v15.38l-1-.52V4a1 1 0 010-1h.01z" />
  </svg>
);

const socials = [
  {
    name: "Instagram",
    handle: "@toberead_clackamas",
    icon: InstagramIcon,
    href: "https://instagram.com/toberead_clackamas",
    gradient: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  {
    name: "TikTok",
    handle: "@clackamas.book.ex",
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@clackamas.book.ex",
    gradient: "linear-gradient(135deg, #25F4EE 0%, #000000 50%, #FE2C55 100%)",
  },
  {
    name: "Facebook",
    handle: "Clackamas Books Exchange",
    icon: FacebookIcon,
    href: "https://www.facebook.com/ClackamasBooksExchange/",
    gradient: "linear-gradient(135deg, #1877F2 0%, #0c5ec9 100%)",
  },
  {
    name: "Yelp",
    handle: "Clackamas Book Exchange",
    icon: YelpIcon,
    href: "https://www.yelp.com/biz/clackamas-book-exchange-milwaukie",
    gradient: "linear-gradient(135deg, #d32323 0%, #af1d1d 100%)",
  },
  {
    name: "Bookshop.org",
    handle: "ClackamasBookExchange",
    icon: BookshopIcon,
    href: "https://bookshop.org/shop/ClackamasBookExchange",
    gradient: "linear-gradient(135deg, #325b3a 0%, #1f3924 100%)",
  },
];

export default function ConnectSection() {
  return (
    <section
      id="connect"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 12% 90%, rgba(241,187,26,0.08), transparent 35%), linear-gradient(180deg, #FDF8F0 0%, #F8F2E8 100%)",
      }}
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            Connect
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Join Our <span className="underline-accent">Community</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </Reveal>

        {/* Socials */}
        <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {socials.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "rgba(107,28,111,0.10)", boxShadow: "0 8px 22px rgba(107,28,111,0.06)" }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: s.gradient }}
                />
                <div
                  className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110"
                  style={{ background: s.gradient }}
                >
                  <s.icon />
                </div>
                <div className="relative z-10">
                  <p className="font-semibold text-sm transition-colors group-hover:text-white" style={{ color: "#1a1a1a" }}>
                    {s.name}
                  </p>
                  <p className="mt-0.5 text-xs transition-colors group-hover:text-white/85" style={{ color: "#6B7280" }}>
                    {s.handle}
                  </p>
                </div>
                <ExternalLink
                  size={15}
                  className="relative z-10 ml-auto opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  style={{ color: "#6B1C6F" }}
                />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Google Reviews */}
        <Reveal>
          <div
            className="relative mb-16 overflow-hidden rounded-3xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
              boxShadow: "0 24px 60px rgba(107,28,111,0.25)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
              style={{ background: "#F1BB1A" }}
            />
            <div className="relative">
              <div className="mb-3 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    fill="#F1BB1A"
                    style={{ color: "#F1BB1A", filter: "drop-shadow(0 4px 12px rgba(241,187,26,0.45))" }}
                  />
                ))}
              </div>
              <h3
                className="mb-2 text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "white" }}
              >
                Reviews help us grow!
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-white/80">
                Love our store? A quick Google review truly makes a difference for small, independent businesses like ours.
              </p>
              <a
                href="https://www.google.com/search?q=Clackamas+Book+Exchange+Milwaukie+OR&hl=en#lrd=write-review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105"
                style={{ background: "#F1BB1A", color: "#1a1a1a" }}
              >
                Leave a Google Review
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Real Google reviews */}
        <Reveal>
          <h3
            className="mb-8 text-center text-2xl font-bold sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
          >
            What Readers <span className="underline-accent">Say</span> on Google
          </h3>
        </Reveal>
        <GoogleReviews />
      </div>
    </section>
  );
}
