/**
 * Helper to send custom events to Google Analytics (GA4) via gtag.
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Send a custom event to Google Analytics 4.
 * If gtag is not available (e.g. in local dev) this becomes a no-op.
 *
 * @param eventName  Name of the event (eg: "navbar_booking")
 * @param params     Optional parameters to attach to the event.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, any> = {},
): void {
  if (typeof window === "undefined") return; // SSR safety

  // Fix: Properly detect development environment - browser-safe detection
  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.port === "3000" ||
    window.location.hostname.includes("localhost");

  // Debug logging for development (can be removed after testing)
  if (isDev) {
    console.log("[Analytics Debug]", {
      eventName,
      params,
      gtagExists: typeof window.gtag === "function",
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[GA DEV→gtag] Event sent:", eventName, params);
    }
  } else if (isDev) {
    // Local fallback when gtag not present
    // eslint-disable-next-line no-console
    console.log("[GA DEV] gtag not available, event would be:", eventName, params);
  } else {
    // In production but gtag not loaded
    console.warn("[GA PROD] gtag not loaded, event lost:", eventName, params);
  }
}

/**
 * Semantic helper for the old "add product" event. Kept for backwards compatibility.
 */
export function trackAddProduct(name: string, price?: number): void {
  trackEvent("add_product", { name, price });
}

export type TrackEventFn = typeof trackEvent;
