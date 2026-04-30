"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Music2 } from "lucide-react";

const TikTokEmbed = dynamic(() => import("@/components/TikTokEmbed"), {
  loading: () => (
    <div
      className="w-full max-w-[605px] animate-pulse rounded-[28px] border p-4"
      style={{
        background: "white",
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
      }}
    >
      <div className="mb-3 h-7 w-32 rounded-full" style={{ background: "rgba(107,28,111,0.10)" }} />
      <div
        className="h-[420px] rounded-2xl"
        style={{ background: "linear-gradient(180deg, rgba(107,28,111,0.08), rgba(241,187,26,0.12))" }}
      />
    </div>
  ),
});

const tiktokVideos = [
  { videoId: "7321516299899703557", username: "clackamas.book.ex" },
  { videoId: "7350198374850041131", username: "clackamas.book.ex" },
  { videoId: "7378029413929937195", username: "clackamas.book.ex" },
];

export default function ConnectPage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <PageHero
        title="Join Our Community"
        subtitle="Follow along for recommendations, store updates, and behind-the-scenes fun."
        badge="Connect"
        imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
        scrollTargetId="connect"
      />

      {/* TikTok showcase */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              <Music2 size={12} />
              On TikTok
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              @clackamas.<span className="underline-accent">book.ex</span>
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Shelf tours, staff picks, and the occasional cat cameo.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 justify-items-center">
            {tiktokVideos.map((video) => (
              <TikTokEmbed key={video.videoId} videoId={video.videoId} username={video.username} />
            ))}
          </div>
        </div>
      </section>

      <ConnectSection />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
