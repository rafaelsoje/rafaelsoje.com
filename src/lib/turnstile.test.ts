import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstileToken, TURNSTILE_VERIFY_ENDPOINT } from "./turnstile";

describe("Cloudflare Turnstile Verification", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("deve aprovar verificação quando Cloudflare retorna success: true", async () => {
    let capturedUrl = "";
    let capturedBody = "";

    vi.spyOn(globalThis, "fetch").mockImplementation(async (url, init) => {
      capturedUrl = url.toString();
      capturedBody = init?.body?.toString() || "";
      return new Response(
        JSON.stringify({
          success: true,
          challenge_ts: "2026-10-01T12:00:00.000Z",
          hostname: "rafaelsoje.com",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const result = await verifyTurnstileToken({
      token: "valid-turnstile-token-12345",
      ip: "198.51.100.22",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(true);
    expect(capturedUrl).toBe(TURNSTILE_VERIFY_ENDPOINT);
    expect(capturedBody).toContain("secret=0x4AAAAAAATestSecretKey");
    expect(capturedBody).toContain("response=valid-turnstile-token-12345");
    expect(capturedBody).toContain("remoteip=198.51.100.22");
  });

  it("deve aprovar subdomínio válido como www.rafaelsoje.com quando rafaelsoje.com está autorizado", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          challenge_ts: "2026-10-01T12:00:00.000Z",
          hostname: "www.rafaelsoje.com",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const result = await verifyTurnstileToken({
      token: "valid-token-www",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(true);
  });

  it("deve reprovar quando hostname retornado pela Cloudflare não pertencer à lista autorizada", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          challenge_ts: "2026-10-01T12:00:00.000Z",
          hostname: "hacker-domain.com",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const result = await verifyTurnstileToken({
      token: "valid-token-from-bad-domain",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("invalid-hostname");
  });

  it("deve reprovar quando Cloudflare retorna success: false com error-codes", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          "error-codes": ["invalid-input-response", "timeout-or-duplicate"],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const result = await verifyTurnstileToken({
      token: "invalid-token",
      ip: "198.51.100.22",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(false);
    expect(result.errorCodes).toEqual(["invalid-input-response", "timeout-or-duplicate"]);
    expect(result.error).toContain("Falha na validação anti-spam");
  });

  it("deve reprovar imediatamente quando o token não for fornecido", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const result = await verifyTurnstileToken({
      token: "",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("complete a verificação de segurança");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("deve reprovar tokens excessivamente longos que possam ser vetor de payload injection", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const hugeToken = "a".repeat(2049);

    const result = await verifyTurnstileToken({
      token: hugeToken,
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("invalid-token-length");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("deve tratar timeout ou erro de rede da Cloudflare sem lançar exceção não capturada", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network connection dropped"));

    const result = await verifyTurnstileToken({
      token: "some-token",
      secretKey: "0x4AAAAAAATestSecretKey",
    });

    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("network-error");
  });

  it("deve falhar fechado (fail-closed) em produção quando TURNSTILE_SECRET_KEY não estiver configurada", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
      writable: true,
    });
    delete process.env.TURNSTILE_SECRET_KEY;

    const result = await verifyTurnstileToken({
      token: "some-token",
      secretKey: undefined,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Configuração de segurança incompleta no servidor.");
  });
});
