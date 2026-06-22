"use client";

import React, { useEffect, useState } from "react";
import TikTokEmbed from "./TikTokEmbed";

export interface FeaturedVideo {
  videoId: string;
  username: string;
}

interface LatestTikTokProps {
  /** Built-in videos shown on first paint and whenever the live feed is
   *  unavailable/unconfigured, so the section never renders empty or broken. */
  fallback: FeaturedVideo[];
  /** How many embeds to render (defaults to the fallback length). */
  limit?: number;
}

interface FeedPayload {
  configured: boolean;
  videos: FeaturedVideo[];
}

/**
 * Renders the bookstore's latest TikTok videos. It starts from the curated
 * `fallback` (so SSR + first paint always show something valid), then upgrades
 * to the live feed from /api/tiktok-latest when configured (TIKTOK_RSS_URL) —
 * putting the newest post at the top automatically as new clips are published.
 */
export default function LatestTikTok({ fallback, limit }: LatestTikTokProps) {
  const count = limit ?? fallback.length;
  const [videos, setVideos] = useState<FeaturedVideo[]>(() => fallback.slice(0, count));

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tiktok-latest")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: FeedPayload | null) => {
        if (cancelled || !data?.configured) return;
        if (Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos.slice(0, count));
        }
      })
      .catch(() => {
        /* keep the fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  return (
    <>
      {videos.map((v) => (
        <TikTokEmbed key={v.videoId} videoId={v.videoId} username={v.username} />
      ))}
    </>
  );
}
