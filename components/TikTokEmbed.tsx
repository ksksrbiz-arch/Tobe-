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
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@${username}/video/${videoId}`}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "325px" }}
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
