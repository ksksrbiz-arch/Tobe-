/**
 * Thin wrapper around the GTM dataLayer for custom business events.
 *
 * Pushes a plain object with an `event` key, which is exactly what GTM's
 * Custom Event trigger type matches on. Safe to call before GTM has loaded
 * (DeferredGTM defers the container itself, not dataLayer) since
 * window.dataLayer is initialized synchronously by ConsentInit before any of
 * this code runs, and GTM drains whatever was queued once it loads.
 *
 * Every event name here must have a matching Custom Event trigger + GA4
 * Event tag configured in GTM-WC2RGMNS for it to actually reach GA4.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
