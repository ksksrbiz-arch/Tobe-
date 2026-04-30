"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import TikTokEmbed from "@/components/TikTokEmbed";

const tiktokVideos = [
  { videoId: "7321516299899703557", username: "clackamas.book.ex" },
  { videoId: "7350198374850041131", username: "clackamas.book.ex" },
  { videoId: "7378029413929937195", username: "clackamas.book.ex" },
];

export default function ConnectPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FDF8F0" }}>
      <Navbar />
      <div className="pt-16">
        <PageHero
          title="Join Our Community"
          subtitle="Follow us for book recommendations, store updates, and behind-the-scenes fun"
          badge="Connect"
          imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
        />

        {/* TikTok Featured */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                Watch Us on TikTok 🎵
              </h2>
              <p className="text-sm mb-1" style={{ color: "#6B7280" }}>@clackamas.book.ex</p>
              <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {tiktokVideos.map((v, i) => (
                <TikTokEmbed key={i} videoId={v.videoId} username={v.username} />
              ))}
            </div>
            <p className="text-center text-xs italic mt-6" style={{ color: "#9CA3AF" }}>
              *Update with actual TikTok video IDs
            </p>
          </div>
        </section>

        <ConnectSection />
      </div>
      <Footer />
    </main>
  );
}
