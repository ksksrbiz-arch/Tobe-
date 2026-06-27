"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import BookLogo from "./BookLogo";

const navLinks: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
  { label: "Trade", href: "/trade" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Shop", href: "/shop" },
  { label: "Reading Room", href: "/reading-room" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Connect", href: "/connect" },
  { label: "TBR Loop", href: "/loop" },
];

const tickerMessage = "WE DO NOT BUY FOR CASH";
const tickerItems = Array.from({ length: 8 });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const drawerTouchStartX = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(100, (y / docH) * 100) : 0);
      rafRef.current = null;
    };
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateScrollState);
      }
    };
    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      const origOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      return () => {
        document.body.style.overflow = orig;
        document.body.style.overscrollBehavior = origOverscroll;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Close mobile menu when the route changes — uses the React-recommended
  // "store previous prop in state" pattern so we react during render without an effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (isOpen) setIsOpen(false);
  }

  const handleDirections = () => {
    window.open(
      "https://maps.google.com/?q=7931+SE+King+Rd,+Portland,+OR+97222",
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Opening directions in Google Maps!");
  };

  const handleDrawerTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    drawerTouchStartX.current = event.touches[0].clientX;
  };

  const handleDrawerTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startX = drawerTouchStartX.current;
    drawerTouchStartX.current = null;
    if (startX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX;
    if (endX - startX > 60) setIsOpen(false);
  };

  return (
    <>
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
        style={{ color: "#6B1C6F", boxShadow: "0 6px 20px rgba(107,28,111,0.18)" }}
      >
        Skip to content
      </a>

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{
          background: scrolled ? "rgba(255,253,249,0.92)" : "rgba(255,253,249,0.78)",
          backdropFilter: "saturate(140%) blur(8px)",
          WebkitBackdropFilter: "saturate(140%) blur(8px)",
          borderBottom: scrolled ? "1px solid rgba(107,28,111,0.10)" : "1px solid transparent",
          // iOS notch awareness: pad the fixed header by the top safe-area inset
          // so the ticker/header isn't clipped under the status bar / notch.
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div
          className="overflow-hidden border-b"
          aria-label={tickerMessage}
          style={{
            background: "linear-gradient(90deg, #4A1350 0%, #6B1C6F 45%, #8B2E90 100%)",
            borderColor: "rgba(241,187,26,0.20)",
          }}
        >
          <span className="sr-only">{tickerMessage}</span>
          <div
            aria-hidden="true"
            className="ticker-track flex min-w-max items-center gap-8 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white sm:text-[11px]"
          >
            {tickerItems.map((_, index) => (
              <span key={index} className="flex items-center gap-8 whitespace-nowrap">
                <span style={{ color: "#F1BB1A" }}>Store update</span>
                <span>{tickerMessage}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[clamp(3.75rem,7vw,4.25rem)] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5" aria-label="To Be Read home">
              <span className="relative inline-flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -m-1.5 rounded-full opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(241,187,26,0.45) 0%, rgba(241,187,26,0.10) 50%, transparent 75%)",
                    animation: "candleGlow 5s ease-in-out infinite",
                  }}
                />
                <BookLogo
                  size={40}
                  showText={false}
                  className="relative transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                />
              </span>
              <div className="hidden sm:block">
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#6B1C6F",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    lineHeight: 1.1,
                  }}
                >
                  To Be Read
                </div>
                <div
                  style={{
                    color: "#6B1C6F",
                    fontSize: "0.6rem",
                    opacity: 0.65,
                    letterSpacing: "0.16em",
                    fontWeight: 600,
                  }}
                >
                  CLACKAMAS BOOK EXCHANGE
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = !link.external && pathname === link.href;
                if (link.external) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative rounded-lg px-3.5 py-2 text-sm font-bold transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, rgba(241,187,26,0.14) 0%, rgba(107,28,111,0.10) 100%)",
                        color: "#6B1C6F",
                        border: "1px solid rgba(241,187,26,0.25)",
                      }}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className="nav-link relative rounded-lg px-3.5 py-2 text-sm font-medium"
                    style={{
                      color: isActive ? "#6B1C6F" : "#374151",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                    <span
                      className="nav-underline pointer-events-none absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #F1BB1A, #F5CC45)",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2">
              <a
                href="tel:503-659-2559"
                className="touch-target inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all active:scale-95 lg:hover:scale-110"
                style={{ borderColor: "rgba(107,28,111,0.18)", color: "#6B1C6F", background: "rgba(255,255,255,0.72)" }}
              >
                <Phone size={15} />
                <span className="sr-only">Call the store</span>
              </a>
              <button
                type="button"
                onClick={handleDirections}
                className="touch-target btn-shine hidden items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95 hover:scale-[1.04] hover:shadow-lg md:flex"
                style={{
                  background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
                }}
              >
                <MapPin size={14} />
                Get Directions
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="touch-target rounded-lg p-2 transition-colors active:scale-95 md:hidden"
                style={{ color: "#6B1C6F", background: isOpen ? "rgba(107,28,111,0.08)" : "transparent" }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(107,28,111,0.06)" }}>
          <div
            className="relative h-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6B1C6F 0%, #F1BB1A 100%)",
              boxShadow: "0 0 12px rgba(241,187,26,0.55)",
            }}
            aria-hidden="true"
          >
            <span
              className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                background: "#F1BB1A",
                boxShadow: "0 0 10px rgba(241,187,26,0.85)",
                opacity: progress > 0.5 ? 1 : 0,
                transition: "opacity 200ms ease-out",
              }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(31,26,46,0.45)" }}
          onClick={() => setIsOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(90vw,24rem)] touch-pan-y flex-col gap-1 overflow-y-auto overscroll-contain rounded-l-[32px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)", paddingTop: "var(--mobile-menu-offset)" }}
          aria-label="Mobile navigation"
          onTouchStart={handleDrawerTouchStart}
          onTouchEnd={handleDrawerTouchEnd}
        >
          <div
            className="mb-3 rounded-2xl border px-4 py-3"
            style={{
              borderColor: "rgba(107,28,111,0.10)",
              background: "rgba(255,255,255,0.72)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "#6B1C6F" }}>
              Quick reminder
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: "#374151" }}>
              {tickerMessage}
            </p>
          </div>
          {navLinks.map((link, i) => {
            const isActive = !link.external && pathname === link.href;
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="touch-target rounded-xl px-4 py-3.5 text-base font-bold transition-all active:scale-[0.99]"
                  style={{
                    color: "#6B1C6F",
                    background: "linear-gradient(135deg, rgba(241,187,26,0.12) 0%, rgba(107,28,111,0.08) 100%)",
                    border: "1px solid rgba(241,187,26,0.22)",
                    animation: isOpen ? `fadeInUp 0.45s ${i * 60}ms both` : undefined,
                  }}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className="touch-target rounded-xl px-4 py-3.5 text-base font-medium transition-all active:scale-[0.99]"
                style={{
                  color: isActive ? "#6B1C6F" : "#374151",
                  background: isActive ? "rgba(107,28,111,0.08)" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                  borderLeft: isActive ? "3px solid #F1BB1A" : "3px solid transparent",
                  animation: isOpen ? `fadeInUp 0.45s ${i * 60}ms both` : undefined,
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleDirections}
            className="touch-target mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            <MapPin size={16} />
            Get Directions
          </button>
          <a
            href="tel:503-659-2559"
            className="touch-target mt-2 flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold active:scale-[0.98]"
            style={{ borderColor: "#F1BB1A", color: "#6B1C6F" }}
          >
            <Phone size={15} />
            503-659-2559
          </a>
          <p className="mt-6 px-2 text-center text-xs" style={{ color: "#6B7280" }}>
            7931 SE King Rd, Unit 1, Portland, OR
            <br />
            Mon–Sat · 10am – 5pm
          </p>
        </nav>
      </div>
    </>
  );
}
