/**
 * Observabilidade técnica sem PII (Personally Identifiable Information).
 * Garante que logs de diagnóstico nunca exponham nomes, e-mails, telefones ou mensagens.
 */

export function maskIp(ip: string): string {
  if (!ip) return "unknown";
  const trimmed = ip.trim();

  // IPv4: mascara o último octeto (ex: 192.168.1.xxx)
  if (trimmed.includes(".")) {
    const parts = trimmed.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }

  // IPv6: preserva apenas os primeiros segmentos (ex: 2001:db8:85a3::xxxx)
  if (trimmed.includes(":")) {
    const parts = trimmed.split(":");
    return `${parts.slice(0, 3).join(":")}::xxxx`;
  }

  return "masked";
}

export type SecurityAction =
  | "honeypot_triggered"
  | "turnstile_failed"
  | "validation_failed"
  | "rate_limit_exceeded"
  | "payload_too_large"
  | "hubspot_rejected";

export interface SecurityEvent {
  action: SecurityAction;
  ip?: string;
  details?: Record<string, string | number | boolean>;
}

export function logSecurityEvent(event: SecurityEvent): void {
  const maskedIp = event.ip ? maskIp(event.ip) : undefined;
  const timestamp = new Date().toISOString();

  // Log técnico estruturado em JSON para facilitar filtros em Cloudwatch/Datadog/ELK/Journald
  console.warn(
    JSON.stringify({
      level: "warn",
      source: "security",
      action: event.action,
      ip: maskedIp,
      timestamp,
      ...(event.details ? { details: event.details } : {}),
    })
  );
}
