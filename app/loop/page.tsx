"use client";

import dynamic from "next/dynamic";

const TBRLoop = dynamic(() => import("@/components/TBRLoop"), { ssr: false });

export default function LoopPage() {
  return (
    <main
      id="main"
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* The loop itself is a canvas animation (client-only), so it carries no
          text for crawlers or screen readers. This visually-hidden block gives
          both a real heading and description to index and announce. */}
      <div className="sr-only">
        <h1>The TBR Loop — Swap, Read, Repeat</h1>
        <p>
          A full-screen animation of the To Be Read loop: bring a book you&apos;ve
          finished to Clackamas Book Exchange in Milwaukie, Oregon, earn store
          credit, and pick something new. The loop that keeps thousands of
          stories moving through the community.
        </p>
      </div>
      <TBRLoop />
    </main>
  );
}
