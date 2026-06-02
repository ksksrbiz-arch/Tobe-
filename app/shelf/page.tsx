"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CoverWall from "@/components/CoverWall";
import Reveal from "@/components/Reveal";

export default function ShelfPage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <PageHero
        title="The Wall"
        subtitle="Every cover here just landed on our shelves. Browse the latest arrivals."
        badge="Recently Shelved"
        imageUrl="/images/shelves/store-kids-chapter-wall.jpg"
        scrollTargetId="wall"
      />

      <section
        id="wall"
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(circle at 10% 80%, rgba(241,187,26,0.08), transparent 40%), linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 text-center">
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Fresh off the <span className="underline-accent">trade desk</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
              Hover or tap a cover for the title and the store credit it&apos;s worth. New books
              appear here as they&apos;re shelved.
            </p>
            <div className="accent-bar mx-auto mt-4 h-1 w-16 rounded-full" />
          </Reveal>
          <CoverWall />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
