"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MapPin } from "lucide-react";
import { toast } from "sonner";
import BookLogo from "./BookLogo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
  { label: "Trade", href: "#trade" },
  { label: "Shop", href: "#shop" },
  { label: "Connect", href: "#connect" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDirections = () => {
    window.open(
      "https://maps.google.com/?q=7931+SE+King+Rd,+Milwaukie,+OR+97222",
      "_blank"
    );
    toast.success("Opening directions in Google Maps!");
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-purple-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BookLogo size={40} showText={false} className="transition-transform group-hover:scale-110" />
            <div className="hidden sm:block">
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                To Be Read
              </div>
              <div style={{ color: "#6B1C6F", fontSize: "0.65rem", opacity: 0.7, letterSpacing: "0.08em" }}>
                CLACKAMAS BOOK EXCHANGE
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-purple-700"
                style={{ color: "#374151" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDirections}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              style={{ backgroundColor: "#6B1C6F" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F1BB1A"; (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6B1C6F"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            >
              <MapPin size={14} />
              Get Directions
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: "#6B1C6F" }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4" style={{ borderColor: "#e5e7eb" }}>
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors"
                  style={{ color: "#374151" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleDirections}
                className="flex items-center gap-2 mt-2 mx-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#6B1C6F" }}
              >
                <MapPin size={16} />
                Get Directions
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
