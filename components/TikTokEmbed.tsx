"use client";

import React, { useEffect } from "react";

interface TikTokEmbedProps {
  videoId: string;
  username: string;
}

export default function TikTokEmbed({ videoId, username }: TikTokEmbedProps) {
  useEffect(() => {
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    let appended = true;
    // Only clean up the script this instance added
    return () => {
      if (appended && document.body.contains(script)) {
        document.body.removeChild(script);
        appended = false;
      }
    };
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@${username}/video/${videoId}`}
      data-video-id={videoId}
      style={{ maxWidth: "605px", minWidth: "325px" }}
    >
      <section></section>
    </blockquote>
  );
}
