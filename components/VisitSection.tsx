"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Copy, Navigation, ExternalLink, Hand } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";

const STORE_ADDRESS = "7931 SE King Rd, Milwaukie, OR 97222";
const STORE_ADDRESS_QUERY = encodeURIComponent(STORE_ADDRESS);
const GOOGLE_MAPS_LINK = `https://maps.google.com/?q=${STORE_ADDRESS_QUERY}`;
const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${STORE_ADDRESS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const APPLE_MAPS_LINK = `https://maps.apple.com/?q=${STORE_ADDRESS_QUERY}`;

const dayHours = [
  { day: "Mon", short: "M", hours: "10:00 – 5:00" },
  { day: "Tue", short: "T", hours: "10:00 – 5:00" },
  { day: "Wed", short: "W", hours: "10:00 – 5:00" },
  { day: "Thu", short: "T", hours: "10:00 – 5:00" },
  { day: "Fri", short: "F", hours: "10:00 – 5:00" },
  { day: "Sat", short: "S", hours: "10:00 – 5:00" },
  { day: "Sun", short: "S", hours: "Closed" },
];

function isOpenNow(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;
  if (day === 0) return { open: false, label: "Closed today (Sun) · opens Mon 10am" };
  if (time >= 10 && time < 17) return { open: true, label: "Open now until 5pm" };
  if (time < 10) return { open: false, label: "Opening at 10am today" };
  return { open: false, label: "Closed for the day · opens 10am" };
}

export default function VisitSection() {
  const [mapInteractive, setMapInteractive] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(STORE_ADDRESS);
      toast.success("Address copied to clipboard!");
    } catch {
      toast.error("Couldn't copy — try selecting it manually.");
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "To Be Read · Clackamas Book Exchange",
          text: STORE_ADDRESS,
          url: GOOGLE_MAPS_LINK,
        });
        return;
      } catch {
        // fall through to copy
      }
    }
    handleCopyAddress();
  };

  const status = isOpenNow();
  const todayIdx = new Date().getDay();
  const todayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][todayIdx];

  return (
    <section
      id="visit"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 12% 8%, rgba(241,187,26,0.18) 0%, transparent 42%), radial-gradient(ellipse at 92% 18%, rgba(107,28,111,0.16) 0%, transparent 38%), radial-gradient(circle at 50% 110%, rgba(139,46,144,0.18) 0%, transparent 50%), linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 50%, #F8F2FF 100%)",
      }}
    >
      {/* Decorative paper-grain pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(107,28,111,0.06) 1px, transparent 1px), radial-gradient(rgba(241,187,26,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px, 36px 36px",
          backgroundPosition: "0 0, 14px 18px",
        }}
      />
      {/* Soft floating blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(241,187,26,0.45), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(107,28,111,0.45), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center sm:mb-14">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            Visit Us
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(1.85rem, 5vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            Find Us in <span className="underline-accent">Milwaukie</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />

          <div
            className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium sm:text-sm"
            style={{
              borderColor: status.open ? "rgba(34,197,94,0.30)" : "rgba(107,28,111,0.20)",
              background: status.open ? "rgba(34,197,94,0.10)" : "rgba(255,255,255,0.75)",
              color: status.open ? "#15803d" : "#6B1C6F",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <span
              className={`h-2 w-2 rounded-full ${status.open ? "animate-pulse-glow" : ""}`}
              style={{ background: status.open ? "#22c55e" : "#6B1C6F" }}
            />
            {status.label}
          </div>
        </Reveal>

        {/* Mobile-first quick action bar (call / directions / share) */}
        <Reveal className="mb-6 lg:hidden">
          <div
            className="grid grid-cols-3 gap-2 rounded-2xl border p-2"
            style={{
              background: "rgba(255,255,255,0.78)",
              borderColor: "rgba(107,28,111,0.10)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 12px 30px rgba(107,28,111,0.08)",
            }}
          >
            <a
              href="tel:503-659-2559"
              className="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold transition-all active:scale-95"
              style={{ color: "#6B1C6F", background: "rgba(107,28,111,0.06)" }}
            >
              <Phone size={18} />
              Call
            </a>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
            >
              <Navigation size={18} />
              Directions
            </a>
            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold transition-all active:scale-95"
              style={{ color: "#6B1C6F", background: "rgba(241,187,26,0.18)" }}
            >
              <Copy size={18} />
              Share
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Left: Info cards */}
          <Reveal delay={80}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {/* Address */}
              <div
                className="group rounded-2xl border p-4 transition-all hover:-translate-y-1 sm:p-5"
                style={{
                  background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <MapPin size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>
                    Address
                  </h3>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                  <p>7931 SE King Rd</p>
                  <p>Milwaukie, OR 97222</p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:underline"
                  style={{ color: "#6B1C6F" }}
                >
                  <Copy size={12} />
                  Copy address
                </button>
              </div>

              {/* Phone */}
              <a
                href="tel:503-659-2559"
                className="group block rounded-2xl border p-4 transition-all hover:-translate-y-1 active:scale-[0.98] sm:p-5"
                style={{
                  background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <Phone size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>
                    Phone
                  </h3>
                </div>
                <span
                  className="text-sm font-semibold leading-relaxed transition-colors group-hover:underline"
                  style={{ color: "#6B1C6F" }}
                >
                  503-659-2559
                </span>
                <p className="mt-1 text-xs sm:hidden" style={{ color: "#6B7280" }}>
                  Tap to call
                </p>
              </a>

              {/* Email */}
              <a
                href="mailto:TBR@tcpbusiness.com"
                className="group block rounded-2xl border p-4 transition-all hover:-translate-y-1 active:scale-[0.98] sm:p-5"
                style={{
                  background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <Mail size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>
                    Email
                  </h3>
                </div>
                <span
                  className="block break-all text-sm font-semibold leading-relaxed transition-colors group-hover:underline"
                  style={{ color: "#6B1C6F" }}
                >
                  TBR@tcpbusiness.com
                </span>
              </a>

              {/* Hours summary card */}
              <div
                className="group rounded-2xl border p-4 transition-all hover:-translate-y-1 sm:p-5"
                style={{
                  background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <Clock size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>
                    Hours
                  </h3>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                  <p>
                    <strong>Mon – Sat</strong> · 10am – 5pm
                  </p>
                  <p className="mt-1 text-xs italic" style={{ color: "#6B7280" }}>
                    Closed Sundays. May open late if a chapter runs long!
                  </p>
                </div>
              </div>
            </div>

            {/* Hours table — compact pills on mobile, full table on larger screens */}
            <div
              className="mt-6 overflow-hidden rounded-2xl border"
              style={{
                background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                borderColor: "rgba(107,28,111,0.10)",
                boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
              }}
            >
              <div
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider"
                style={{ background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }}
              >
                Weekly Hours
              </div>

              {/* Mobile: pill row showing only the day initials */}
              <div className="grid grid-cols-7 gap-1.5 p-3 sm:hidden">
                {dayHours.map((d) => {
                  const idx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(d.day);
                  const isToday = idx === todayIdx;
                  const isClosed = d.hours === "Closed";
                  return (
                    <div
                      key={d.day}
                      className="flex flex-col items-center justify-center rounded-lg py-2"
                      style={{
                        background: isToday
                          ? "rgba(241,187,26,0.18)"
                          : isClosed
                            ? "rgba(107,28,111,0.04)"
                            : "rgba(107,28,111,0.06)",
                        border: isToday ? "1.5px solid #F1BB1A" : "1.5px solid transparent",
                      }}
                    >
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ color: isToday ? "#6B1C6F" : "#6B7280" }}
                      >
                        {d.short}
                      </span>
                      <span
                        className="mt-0.5 text-[9px] font-medium"
                        style={{ color: isClosed ? "#9CA3AF" : isToday ? "#6B1C6F" : "#374151" }}
                      >
                        {isClosed ? "—" : "10–5"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p
                className="border-t px-4 pb-3 pt-2 text-center text-[11px] font-medium sm:hidden"
                style={{ borderColor: "rgba(107,28,111,0.06)", color: "#6B7280" }}
              >
                Today is <strong style={{ color: "#6B1C6F" }}>{todayName}</strong>
              </p>

              {/* Desktop: full row list */}
              <div className="hidden divide-y sm:block" style={{ borderColor: "rgba(107,28,111,0.08)" }}>
                {dayHours.map((d) => {
                  const idx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(d.day);
                  const isToday = idx === todayIdx;
                  return (
                    <div
                      key={d.day}
                      className="flex items-center justify-between px-5 py-2.5 text-sm"
                      style={{
                        background: isToday ? "rgba(241,187,26,0.10)" : "transparent",
                        color: "#374151",
                        fontWeight: isToday ? 700 : 500,
                      }}
                    >
                      <span style={{ color: isToday ? "#6B1C6F" : "#374151" }}>
                        {d.day}
                        {isToday && (
                          <span className="ml-2 text-[10px] uppercase tracking-wider" style={{ color: "#F1BB1A" }}>
                            • today
                          </span>
                        )}
                      </span>
                      <span>{d.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Directions buttons (Google + Apple on mobile) */}
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
              >
                <Navigation size={16} />
                Google Maps
              </a>
              <a
                href={APPLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-4 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: "rgba(107,28,111,0.25)", color: "#6B1C6F", background: "rgba(255,255,255,0.7)" }}
              >
                <ExternalLink size={16} />
                Apple Maps
              </a>
            </div>
          </Reveal>

          {/* Right: Map */}
          <Reveal delay={160}>
            <div
              className="relative overflow-hidden rounded-3xl border shadow-xl"
              style={{
                borderColor: "rgba(107,28,111,0.12)",
                background: "linear-gradient(135deg, #FDF8F0 0%, #F8F2FF 100%)",
              }}
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    border: 0,
                    pointerEvents: mapInteractive ? "auto" : "none",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="To Be Read bookstore location map"
                />

                {/* Tap-to-interact overlay (lets users scroll past on mobile) */}
                {!mapInteractive && (
                  <button
                    type="button"
                    onClick={() => setMapInteractive(true)}
                    className="absolute inset-0 flex items-end justify-center bg-transparent lg:hidden"
                    aria-label="Activate map interactions"
                  >
                    <span
                      className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        color: "#6B1C6F",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                      }}
                    >
                      <Hand size={14} />
                      Tap to interact with map
                    </span>
                  </button>
                )}

                {/* Floating "open in maps" pill */}
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold shadow-lg transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#6B1C6F",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <ExternalLink size={12} />
                  Open
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
