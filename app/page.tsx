"use client";

import React, { useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import VisitSection from "@/components/VisitSection";
import TradeSection from "@/components/TradeSection";
import ShopSection from "@/components/ShopSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#6B1C6F", "#F1BB1A", "#ffffff", "#8B2E90", "#F5CC45"],
      });
    } catch {
      // silently fail if confetti unavailable
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection onConfetti={fireConfetti} />
      <StorySection />
      <VisitSection />
      <TradeSection />
      <ShopSection />
      <ConnectSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
