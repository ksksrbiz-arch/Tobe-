"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface TikTokEmbedProps {
  videoId: string;
  username: string;
}

export default function TikTokEmbed({ videoId, username }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;

    const node = containerRef.current;
    if (!node) return;

    // Guard for environments without IntersectionObserver support: load the
    // embed on the next frame so it still renders, without a synchronous
    // setState in the effect body.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full"
      style={{ width: "100%", maxWidth: "605px", minWidth: 0 }}
    >
      {inView ? (
        <>
          <blockquote
            className="tiktok-embed mx-auto w-full"
            cite={`https://www.tiktok.com/@${username}/video/${videoId}`}
            data-video-id={videoId}
            style={{ width: "100%", maxWidth: "605px", minWidth: 0 }}
          >
            <section></section>
          </blockquote>
          <Script
            src="https://www.tiktok.com/embed.js"
            strategy="lazyOnload"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="mx-auto w-full"
          style={{
            width: "100%",
            maxWidth: "605px",
            minWidth: 0,
            aspectRatio: "9 / 16",
          }}
        />
      )}
    </div>
  );
}
