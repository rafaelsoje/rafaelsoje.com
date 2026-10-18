export type AnalyticsEvent =
  | "form_start"
  | "form_submit"
  | "form_success"
  | "whatsapp_click"
  | "email_click"
  | "share_click";

export function trackAnalyticsEvent(
  eventName: AnalyticsEvent,
  eventParams?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  // Se o Google Analytics (gtag) estiver carregado via NEXT_PUBLIC_GA_ID, despacha o evento
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, eventParams);
  }

  // Despacha também para a rota própria /api/track nos eventos principais
  if (eventName === "whatsapp_click") trackCustomEvent("whatsapp_click");
  if (eventName === "form_start") trackCustomEvent("form_start");
  if (eventName === "form_submit") trackCustomEvent("form_submit");

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event: ${eventName}]`, eventParams);
  }
}

export function trackCustomEvent(
  event: "page_view" | "whatsapp_click" | "form_start" | "form_submit"
) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    pagePath: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", JSON.stringify(payload));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}

