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
  const rafRef = useRef<number | null>(null);
  const drawerTouchStartX = useRef<number | null>(null);
  // The progress bar updates every scroll frame — write styles straight to the
  // DOM (same pattern as CursorGlow/Tilt) instead of re-rendering the navbar.
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLSpanElement>(null);
  const drawerNavRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.min(100, (y / docH) * 100) : 0;
      if (progressFillRef.current) progressFillRef.current.style.width = `${progress}%`;
      if (progressDotRef.current) progressDotRef.current.style.opacity = progress > 0.5 ? "1" : "0";
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

  // Move focus into the drawer when it opens and back to the toggle when it
  // closes, so keyboard/screen-reader users aren't left behind the overlay.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen) {
      drawerNavRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasOpenRef.current) {
      menuToggleRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
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
        style={{ color: "var(--purple)", boxShadow: "0 6px 20px color-mix(in srgb, var(--purple) 18%, transparent)" }}
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
          borderBottom: scrolled ? "1px solid color-mix(in srgb, var(--purple) 10%, transparent)" : "1px solid transparent",
          // iOS notch awareness: pad the fixed header by the top safe-area inset
          // so the ticker/header isn't clipped under the status bar / notch.
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div
          className="overflow-hidden border-b"
          style={{
            background: "linear-gradient(90deg, var(--purple-dark) 0%, var(--purple) 45%, var(--purple-light) 100%)",
            borderColor: "color-mix(in srgb, var(--gold) 20%, transparent)",
          }}
        >
          <span className="sr-only">{tickerMessage}</span>
          <div
            aria-hidden="true"
            className="ticker-track flex min-w-max items-center gap-8 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white sm:text-[11px]"
          >
            {tickerItems.map((_, index) => (
              <span key={index} className="flex items-center gap-8 whitespace-nowrap">
                <span style={{ color: "var(--gold)" }}>Store update</span>
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
                      "radial-gradient(circle, color-mix(in srgb, var(--gold) 45%, transparent) 0%, color-mix(in srgb, var(--gold) 10%, transparent) 50%, transparent 75%)",
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
                    color: "var(--purple)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    lineHeight: 1.1,
                  }}
                >
                  To Be Read
                </div>
                <div
                  style={{
                    color: "var(--purple)",
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
                        background: "linear-gradient(135deg, color-mix(in srgb, var(--gold) 14%, transparent) 0%, color-mix(in srgb, var(--purple) 10%, transparent) 100%)",
                        color: "var(--purple)",
                        border: "1px solid color-mix(in srgb, var(--gold) 25%, transparent)",
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
                      color: isActive ? "var(--purple)" : "#374151",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                    <span
                      className="nav-underline pointer-events-none absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
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
                style={{ borderColor: "color-mix(in srgb, var(--purple) 18%, transparent)", color: "var(--purple)", background: "rgba(255,255,255,0.72)" }}
              >
                <Phone size={15} />
                <span className="sr-only">Call the store</span>
              </a>
              <button
                type="button"
                onClick={handleDirections}
                className="touch-target btn-shine hidden items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95 hover:scale-[1.04] hover:shadow-lg md:flex"
                style={{
                  background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)",
                }}
              >
                <MapPin size={14} />
                Get Directions
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                ref={menuToggleRef}
                className="touch-target rounded-lg p-2 transition-colors active:scale-95 md:hidden"
                style={{ color: "var(--purple)", background: isOpen ? "color-mix(in srgb, var(--purple) 8%, transparent)" : "transparent" }}
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
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "color-mix(in srgb, var(--purple) 6%, transparent)" }}>
          <div
            ref={progressFillRef}
            className="relative h-full transition-[width] duration-150 ease-out"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, var(--purple) 0%, var(--gold) 100%)",
              boxShadow: "0 0 12px color-mix(in srgb, var(--gold) 55%, transparent)",
            }}
            aria-hidden="true"
          >
            <span
              ref={progressDotRef}
              className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                background: "var(--gold)",
                boxShadow: "0 0 10px color-mix(in srgb, var(--gold) 85%, transparent)",
                opacity: 0,
                transition: "opacity 200ms ease-out",
              }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer. `inert` when closed: opacity-0 alone leaves the
          invisible links keyboard-focusable and exposed to screen readers. */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ background: "color-mix(in srgb, var(--ink) 45%, transparent)" }}
          onClick={() => setIsOpen(false)}
        />
        <nav
          ref={drawerNavRef}
          className={`absolute right-0 top-0 flex h-full w-[min(90vw,24rem)] touch-pan-y flex-col gap-1 overflow-y-auto overscroll-contain rounded-l-[32px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "linear-gradient(180deg, #FFFDF9 0%, var(--paper) 100%)", paddingTop: "var(--mobile-menu-offset)" }}
          aria-label="Mobile navigation"
          onTouchStart={handleDrawerTouchStart}
          onTouchEnd={handleDrawerTouchEnd}
        >
          <div
            className="mb-3 rounded-2xl border px-4 py-3"
            style={{
              borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)",
              background: "rgba(255,255,255,0.72)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--purple)" }}>
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
                    color: "var(--purple)",
                    background: "linear-gradient(135deg, color-mix(in srgb, var(--gold) 12%, transparent) 0%, color-mix(in srgb, var(--purple) 8%, transparent) 100%)",
                    border: "1px solid color-mix(in srgb, var(--gold) 22%, transparent)",
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
                  color: isActive ? "var(--purple)" : "#374151",
                  background: isActive ? "color-mix(in srgb, var(--purple) 8%, transparent)" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                  borderLeft: isActive ? "3px solid var(--gold)" : "3px solid transparent",
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
            style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)" }}
          >
            <MapPin size={16} />
            Get Directions
          </button>
          <a
            href="tel:503-659-2559"
            className="touch-target mt-2 flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold active:scale-[0.98]"
            style={{ borderColor: "var(--gold)", color: "var(--purple)" }}
          >
            <Phone size={15} />
            503-659-2559
          </a>
          <p className="mt-6 px-2 text-center text-xs" style={{ color: "var(--muted)" }}>
            7931 SE King Rd, Unit 1, Portland, OR
            <br />
            Mon–Sat · 10am – 5pm
          </p>
        </nav>
      </div>
    </>
  );
}
