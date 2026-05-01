"use client";

import dynamic from "next/dynamic";

const TBRLoop = dynamic(() => import("@/components/TBRLoop"), { ssr: false });

export default function LoopPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <TBRLoop />
    </div>
  );
}
