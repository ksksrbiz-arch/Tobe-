"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import BookLogo from "./BookLogo";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.54V6.88a4.85 4.85 0 01-1.02-.19z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const footerSocials = [
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com/toberead_clackamas" },
  { name: "TikTok", icon: TikTokIcon, href: "https://tiktok.com/@clackamas.book.ex" },
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com/ClackamasBookExchange" },
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
      toast.success("You're on the list! 📚 We'll keep you updated on book news and events.");
      setEmail("");
      setSubmitting(false);
    }, 800);
  };

  return (
    <footer style={{ background: "#6B1C6F", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <BookLogo size={50} showText={false} />
              <div>
                <div
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F1BB1A" }}
                >
                  To Be Read
                </div>
                <div className="text-xs opacity-60">Clackamas Book Exchange</div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Your neighborhood used bookstore since the late 1970s. Trading stories, one book at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider mb-5"
              style={{ color: "#F1BB1A" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Visit", href: "/visit" },
                { label: "Trade", href: "/trade" },
                { label: "Shop", href: "/shop" },
                { label: "Connect", href: "/connect" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-yellow-300 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider mb-5"
              style={{ color: "#F1BB1A" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#F1BB1A" }} />
                <span>7931 SE King Rd<br />Milwaukie, OR 97222</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} style={{ color: "#F1BB1A" }} />
                <a href="tel:503-659-2559" className="hover:text-yellow-300 transition-colors">503-659-2559</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} style={{ color: "#F1BB1A" }} />
                <a href="mailto:TBR@tcpbusiness8.com" className="hover:text-yellow-300 transition-colors break-all">TBR@tcpbusiness8.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#F1BB1A" }} />
                <span>Mon–Sat, 10am–5pm<br /><em className="text-xs opacity-60">*May open late for a chapter!</em></span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider mb-5"
              style={{ color: "#F1BB1A" }}
            >
              Stay Updated
            </h4>
            <p className="text-sm opacity-70 mb-4">
              Get updates on new arrivals, events, and our 2026 rebrand!
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "#F1BB1A", color: "#1a1a1a" }}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
                <Send size={14} />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {footerSocials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit us on ${s.name}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F1BB1A"; (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-3 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <p className="opacity-60">
            © 2026 To Be Read / Clackamas Book Exchange
          </p>
          <p className="opacity-60 text-xs">
            Made with ❤️ in Milwaukie, Oregon
          </p>
        </div>
      </div>
    </footer>
  );
}
