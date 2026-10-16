import { NextRequest, NextResponse } from "next/server";
import { sanitizeCampaignPagePath } from "@/lib/attribution";
import { maskIp } from "@/lib/observability";

export interface TrackPayload {
  event: "page_view" | "whatsapp_click" | "form_start" | "form_submit";
  pagePath?: string;
  referrer?: string;
  screen?: { width: number; height: number };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const { event, pagePath, referrer, screen } = rawBody as TrackPayload;
    const allowedEvents = ["page_view", "whatsapp_click", "form_start", "form_submit"];
    if (!allowedEvents.includes(event)) {
      return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
    }

    const sanitizedPath = pagePath ? sanitizeCampaignPagePath(pagePath) : { pagePath: "/", hasCampaign: false };
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Extrai parâmetros de campanha se presentes
    const url = new URL(sanitizedPath.pagePath, "https://rafaelsoje.com");
    const campaignData: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const val = url.searchParams.get(key);
      if (val) campaignData[key] = val;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      path: sanitizedPath.pagePath,
      hasCampaign: sanitizedPath.hasCampaign,
      campaign: campaignData,
      referrer: typeof referrer === "string" ? referrer.slice(0, 256) : undefined,
      screen: screen && typeof screen.width === "number" ? `${screen.width}x${screen.height}` : undefined,
      clientIp: maskIp(ip),
      isMobile: /Mobile|Android|iPhone/i.test(userAgent),
    };

    // Log estruturado no console do servidor (capturado por journald/Docker na VPS)
    console.log(`[PROSPECTION_TRACKER] ${JSON.stringify(logEntry)}`);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[PROSPECTION_TRACKER_ERROR]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

