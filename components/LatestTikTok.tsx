"use client";

import React, { useEffect, useRef, useState } from "react";
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
 *
 * The feed fetch waits until the section approaches the viewport (same gating
 * as the embeds themselves): the section sits far below the fold, so fetching
 * during hydration paid an API call for every visitor, most of whom never
 * scroll here.
 */
export default function LatestTikTok({ fallback, limit }: LatestTikTokProps) {
  const count = limit ?? fallback.length;
  const [videos, setVideos] = useState<FeaturedVideo[]>(() => fallback.slice(0, count));
  const [nearViewport, setNearViewport] = useState(false);
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Watch the parent container: the hidden sentinel itself is display:none
    // (so it can't disturb the parent grid/flex layout) and has no box of its
    // own to observe.
    const el = sentinelRef.current?.parentElement;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
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
  }, [nearViewport, count]);

  return (
    <>
      <span hidden ref={sentinelRef} />
      {videos.map((v) => (
        <TikTokEmbed key={v.videoId} videoId={v.videoId} username={v.username} />
      ))}
    </>
  );
}
