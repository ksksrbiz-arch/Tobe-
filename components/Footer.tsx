"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import BookLogo from "./BookLogo";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.54V6.88a4.85 4.85 0 01-1.02-.19z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.16 12.594l-4.995 1.624a1.04 1.04 0 00-.679 1.296c.029.075.064.146.107.213l2.659 4.165a1.041 1.041 0 001.452.27 9.444 9.444 0 003.077-3.96l.026-.066a1.041 1.041 0 00-.624-1.327 12.61 12.61 0 00-1.023-.215zm-7.32-1.063a1.041 1.041 0 001.357.61c.073-.027.142-.064.207-.108L18.564 9.5a1.041 1.041 0 00.291-1.413 9.464 9.464 0 00-4.024-3.018 1.041 1.041 0 00-1.4.703 12.49 12.49 0 00-.591 5.759zm-1.59 2.018l-2.65 4.18a1.041 1.041 0 00.291 1.435c.067.043.139.078.215.105 1.34.474 2.781.566 4.176.245.4-.092.66-.479.62-.886a12.46 12.46 0 00-1.353-4.857 1.041 1.041 0 00-1.299-.222zm-1.49-2.76L9.616 4.7a1.041 1.041 0 00-1.397-.42 16.83 16.83 0 00-3.43 2.4 1.041 1.041 0 00-.18 1.388l4.32 4.85a1.041 1.041 0 001.49-.085c.05-.06.092-.126.124-.197a16.94 16.94 0 00-.78-1.847zm-2.005 4.49l-3.687 1.07a1.041 1.041 0 00-.7 1.42c.486 1.27 1.245 2.422 2.226 3.378a1.041 1.041 0 001.435.067l2.787-2.633a1.041 1.041 0 00-.061-1.581 5.84 5.84 0 00-2-1.72z" />
  </svg>
);

const BookshopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 3h13a3 3 0 013 3v15a1 1 0 01-1.45.89L13 19l-5.55 2.89A1 1 0 016 21V6a3 3 0 01-3-3zm2 0v18l5-2.6 5 2.6V6a1 1 0 00-1-1H6zm12 0a1 1 0 011 1v15.38l-1-.52V4a1 1 0 010-1h.01z" />
  </svg>
);

const footerSocials = [
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com/toberead_clackamas" },
  { name: "TikTok", icon: TikTokIcon, href: "https://www.tiktok.com/@clackamas.book.ex" },
  { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/ClackamasBooksExchange/" },
  { name: "Yelp", icon: YelpIcon, href: "https://www.yelp.com/biz/clackamas-book-exchange-milwaukie" },
  { name: "Bookshop.org", icon: BookshopIcon, href: "https://bookshop.org/shop/ClackamasBookExchange" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("You're on the list! We'll keep you updated on book news and events.");
      setEmail("");
      setSubmitting(false);
    }, 800);
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 8% 20%, rgba(241,187,26,0.10), transparent 38%), radial-gradient(circle at 88% 0%, rgba(139,46,144,0.40), transparent 32%), linear-gradient(180deg, #4A1350 0%, #6B1C6F 60%, #2A0930 100%)",
      }}
    >
      {/* decorative top wave */}
      <svg
        aria-hidden="true"
        className="absolute -top-px left-0 right-0 w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ height: 56, color: "var(--background)" }}
      >
        <path
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <BookLogo size={52} showText={false} />
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F1BB1A" }}
                >
                  To Be Read
                </div>
                <div className="text-xs opacity-60">Clackamas Book Exchange</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-75">
              Your neighborhood used bookstore since the late 1970s. Trading stories, one book at a time.
            </p>

            <div className="mt-5 flex gap-2">
              {footerSocials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit us on ${s.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.10)", color: "white" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#F1BB1A";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.10)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: "#F1BB1A" }}>
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About the store", href: "/about" },
                { label: "Plan a visit", href: "/visit" },
                { label: "Trade your books", href: "/trade" },
                { label: "Shop online", href: "/shop" },
                { label: "Connect with us", href: "/connect" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm opacity-75 transition-all hover:opacity-100"
                  >
                    <span className="transition-colors group-hover:text-yellow-300">{item.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ color: "#F1BB1A" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: "#F1BB1A" }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm opacity-85">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#F1BB1A" }} />
                <span className="leading-relaxed">
                  7931 SE King Rd
                  <br />
                  Milwaukie, OR 97222
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} style={{ color: "#F1BB1A" }} />
                <a href="tel:503-659-2559" className="transition-colors hover:text-yellow-300">
                  503-659-2559
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} style={{ color: "#F1BB1A" }} />
                <a
                  href="mailto:TBR@tcpbusiness8.com"
                  className="break-all transition-colors hover:text-yellow-300"
                >
                  TBR@tcpbusiness8.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#F1BB1A" }} />
                <span className="leading-relaxed">
                  Mon–Sat · 10am–5pm
                  <br />
                  <em className="text-xs opacity-65">*may open late for a chapter!</em>
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider" style={{ color: "#F1BB1A" }}>
              Stay updated
            </h4>
            <p className="mb-4 text-sm leading-relaxed opacity-75">
              New arrivals, store events, and behind-the-scenes peeks at our 2026 rebrand — straight to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="rounded-xl bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-inner outline-none transition focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-shine flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)", color: "#1a1a1a" }}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
                <Send size={14} />
              </button>
              <p className="text-[11px] opacity-55">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-3 border-t pt-7 text-sm sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <p className="opacity-60">© 2026 To Be Read · Clackamas Book Exchange</p>
          <p className="text-xs opacity-60">
            Made with <span style={{ color: "#F1BB1A" }}>♥</span> in Milwaukie, Oregon
          </p>
        </div>
      </div>
    </footer>
  );
}
