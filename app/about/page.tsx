"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    caption: "Our shelves",
  },
  {
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    caption: "Cozy reading nooks",
  },
  {
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    caption: "Community corner",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FDF8F0" }}>
      <Navbar />
      <div className="pt-16">
        <PageHero
          title="Our Story"
          subtitle="45 years of stories, one chapter at a time"
          badge="About Us"
          imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
        />
        <StorySection />

        {/* Photo Gallery */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                Inside Our Store
              </h2>
              <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div key={item.caption} className="rounded-2xl overflow-hidden shadow-md group">
                  <div className="overflow-hidden" style={{ height: "220px" }}>
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="p-4 text-center text-sm font-medium"
                    style={{ background: "#FDF8F0", color: "#6B1C6F" }}
                  >
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
