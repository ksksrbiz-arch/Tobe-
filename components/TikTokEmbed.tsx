"use client";

import React from "react";
import Script from "next/script";

interface TikTokEmbedProps {
  videoId: string;
  username: string;
}

export default function TikTokEmbed({ videoId, username }: TikTokEmbedProps) {
  return (
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
  );
}
