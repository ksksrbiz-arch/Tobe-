"use client";

import React from "react";

/**
 * Reopens the <CookieConsent> banner so a visitor can change their cookie
 * choice at any time. Communicates via a window CustomEvent so it stays fully
 * decoupled from the banner and can be dropped anywhere (footer, cookie policy).
 */
export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tbr:open-cookie-settings"));
  }
}

interface CookieSettingsButtonProps {
  /** Render as an inline footer link instead of the default pill button. */
  variant?: "button" | "link";
  className?: string;
  children?: React.ReactNode;
}

export default function CookieSettingsButton({
  variant = "button",
  className,
  children,
}: CookieSettingsButtonProps) {
  const label = children ?? "Cookie settings";

  if (variant === "link") {
    return (
      <button type="button" onClick={openCookieSettings} className={className}>
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ??
        "btn-shine inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
      }
      style={
        className
          ? undefined
          : { background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }
      }
    >
      {label}
    </button>
  );
}
