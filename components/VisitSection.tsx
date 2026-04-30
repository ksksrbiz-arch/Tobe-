"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock, Copy, Navigation } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";

const infoCards = [
  {
    icon: MapPin,
    title: "Address",
    body: (
      <>
        <p>7931 SE King Rd</p>
        <p>Milwaukie, OR 97222</p>
      </>
    ),
    action: { label: "Copy address", value: "7931 SE King Rd, Milwaukie, OR 97222" },
  },
  {
    icon: Phone,
    title: "Phone",
    body: (
      <a
        href="tel:503-659-2559"
        className="font-semibold transition-colors hover:underline"
        style={{ color: "#6B1C6F" }}
      >
        503-659-2559
      </a>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    body: (
      <a
        href="mailto:TBR@tcpbusiness8.com"
        className="break-all font-semibold transition-colors hover:underline"
        style={{ color: "#6B1C6F" }}
      >
        TBR@tcpbusiness8.com
      </a>
    ),
  },
  {
    icon: Clock,
    title: "Hours",
    body: (
      <>
        <p>
          <strong>Mon – Sat</strong> · 10am – 5pm
        </p>
        <p className="mt-1 text-xs italic" style={{ color: "#6B7280" }}>
          Closed Sundays. May open late if a chapter runs long!
        </p>
      </>
    ),
  },
] as const;

const dayHours = [
  { day: "Mon", hours: "10:00 – 5:00" },
  { day: "Tue", hours: "10:00 – 5:00" },
  { day: "Wed", hours: "10:00 – 5:00" },
  { day: "Thu", hours: "10:00 – 5:00" },
  { day: "Fri", hours: "10:00 – 5:00" },
  { day: "Sat", hours: "10:00 – 5:00" },
  { day: "Sun", hours: "Closed" },
];

function isOpenNow(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;
  if (day === 0) return { open: false, label: "Closed today (Sun) · opens Mon 10am" };
  if (time >= 10 && time < 17) return { open: true, label: "Open now until 5pm" };
  if (time < 10) return { open: false, label: "Opening at 10am today" };
  return { open: false, label: "Closed for the day · opens 10am" };
}

export default function VisitSection() {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("7931 SE King Rd, Milwaukie, OR 97222");
    toast.success("Address copied to clipboard!");
  };

  const status = isOpenNow();

  return (
    <section id="visit" className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
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
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Find Us in <span className="underline-accent">Milwaukie</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />

          <div
            className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
            style={{
              borderColor: status.open ? "rgba(34,197,94,0.30)" : "rgba(107,28,111,0.20)",
              background: status.open ? "rgba(34,197,94,0.08)" : "rgba(107,28,111,0.06)",
              color: status.open ? "#15803d" : "#6B1C6F",
            }}
          >
            <span
              className={`h-2 w-2 rounded-full ${status.open ? "animate-pulse-glow" : ""}`}
              style={{ background: status.open ? "#22c55e" : "#6B1C6F" }}
            />
            {status.label}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Left: Info cards */}
          <Reveal delay={80}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {infoCards.map((card) => (
                <div
                  key={card.title}
                  className="group rounded-2xl border p-5 transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
                    borderColor: "rgba(107,28,111,0.10)",
                    boxShadow: "0 8px 22px rgba(107,28,111,0.05)",
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
                      }}
                    >
                      <card.icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>
                      {card.title}
                    </h3>
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                    {card.body}
                  </div>
                  {"action" in card && card.action && (
                    <button
                      onClick={handleCopyAddress}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:underline"
                      style={{ color: "#6B1C6F" }}
                    >
                      <Copy size={12} />
                      {card.action.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Hours table */}
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
              <div className="divide-y" style={{ borderColor: "rgba(107,28,111,0.08)" }}>
                {dayHours.map((d) => {
                  const todayIdx = new Date().getDay();
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

            <a
              href="https://maps.google.com/?q=7931+SE+King+Rd,+Milwaukie,+OR+97222"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </Reveal>

          {/* Right: Map */}
          <Reveal delay={160}>
            <div
              className="overflow-hidden rounded-3xl border shadow-xl"
              style={{
                borderColor: "rgba(107,28,111,0.12)",
                minHeight: "440px",
                background: "#FDF8F0",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.4521!2d-122.6317!3d45.4397!2m3!1f0!2f0!3f0!3m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495671e!2s7931%20SE%20King%20Rd%2C%20Milwaukie%2C%20OR%2097222!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "440px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clackamas Book Exchange location map"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
