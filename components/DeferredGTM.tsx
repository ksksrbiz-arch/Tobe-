"use client";

import { useEffect } from "react";

/**
 * Loads Google Tag Manager OFF the critical path.
 *
 * The official <GoogleTagManager> loads gtm.js `afterInteractive` — right as the
 * page hydrates — so its (and every tag it pulls in) parse/exec lands inside the
 * initial Total Blocking Time window, which is the single biggest drag on the
 * Lighthouse performance score. We instead defer the container until the browser
 * is idle OR the visitor first interacts (whichever comes first), so analytics
 * still fires for real sessions without taxing first load. The <noscript> iframe
 * lives in the root layout so it's present without JS.
 */
export default function DeferredGTM({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & {
      __gtmLoaded?: boolean;
      dataLayer?: unknown[];
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (w.__gtmLoaded) return;

    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      interactionEvents.forEach((e) => window.removeEventListener(e, load));
      if (idleHandle !== undefined) w.cancelIdleCallback?.(idleHandle);
      if (timer) clearTimeout(timer);
    };

    function load() {
      if (w.__gtmLoaded) return;
      w.__gtmLoaded = true;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
      cleanup();
    }

    interactionEvents.forEach((e) =>
      window.addEventListener(e, load, { passive: true, once: true }),
    );

    if (typeof w.requestIdleCallback === "function") {
      idleHandle = w.requestIdleCallback(load, { timeout: 6000 });
    } else {
      timer = setTimeout(load, 4000);
    }

    return cleanup;
  }, [gtmId]);

  return null;
}
