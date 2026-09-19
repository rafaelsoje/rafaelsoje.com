export type AnalyticsEvent =
  | "form_start"
  | "form_submit"
  | "form_success"
  | "whatsapp_click"
  | "email_click";

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

  // Log limpo em ambiente de desenvolvimento para conferência
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event: ${eventName}]`, eventParams);
  }
}

