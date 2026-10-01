/**
 * Integração oficial server-side com Cloudflare Turnstile.
 * Endpoint: POST https://challenges.cloudflare.com/turnstile/v0/siteverify
 */

export const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_TIMEOUT_MS = 5000;

export interface TurnstileVerificationResult {
  success: boolean;
  errorCodes?: string[];
  error?: string;
}

export interface VerifyTurnstileParams {
  token?: string;
  ip?: string;
  secretKey?: string;
  expectedAction?: string;
}

interface CloudflareTurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Valida o token gerado pelo widget Turnstile diretamente contra a API oficial da Cloudflare.
 * A validação é estritamente server-side usando a Secret Key.
 */
export async function verifyTurnstileToken({
  token,
  ip,
  secretKey = process.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET,
  expectedAction,
}: VerifyTurnstileParams): Promise<TurnstileVerificationResult> {
  // Se a chave secreta não foi informada:
  // - Em produção: falha por segurança (fail-closed)
  // - Em desenvolvimento/testes: permite ignorar caso as chaves ainda não tenham sido configuradas
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[Turnstile Security Error] TURNSTILE_SECRET_KEY ou TURNSTILE_SECRET não configurada no ambiente de produção."
      );
      return {
        success: false,
        error: "Configuração de segurança incompleta no servidor.",
      };
    }
    // Em dev/test, avisa e permite continuar sem travar o ambiente local
    return { success: true };
  }

  // Token ausente ou com formato inválido
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return {
      success: false,
      error: "Por favor, complete a verificação de segurança antes de enviar.",
    };
  }

  // Impede tokens com tamanhos abusivos
  if (token.length > 2048) {
    return {
      success: false,
      error: "Token de segurança inválido.",
      errorCodes: ["invalid-token-length"],
    };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token.trim());
  if (ip && ip !== "127.0.0.1" && ip !== "unknown") {
    formData.append("remoteip", ip);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS);

  try {
    const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error: "Falha na comunicação com o serviço de verificação da Cloudflare.",
        errorCodes: [`http-status-${response.status}`],
      };
    }

    const data = (await response.json()) as CloudflareTurnstileResponse;

    if (data.success) {
      if (expectedAction && data.action && data.action !== expectedAction) {
        return {
          success: false,
          error: "Ação de validação inválida.",
          errorCodes: ["invalid-action"],
        };
      }

      const allowedHostnames = (
        process.env.TURNSTILE_HOSTNAMES || "rafaelsoje.com,localhost,127.0.0.1"
      )
        .split(",")
        .map((h) => h.trim().toLowerCase())
        .filter(Boolean);

      if (data.hostname && allowedHostnames.length > 0) {
        const normalizedHost = data.hostname.toLowerCase();
        if (!allowedHostnames.includes(normalizedHost)) {
          return {
            success: false,
            error: "Origem não autorizada para validação.",
            errorCodes: ["invalid-hostname"],
          };
        }
      }

      return { success: true };
    }

    return {
      success: false,
      errorCodes: data["error-codes"] || ["challenge-failed"],
      error: "Falha na validação anti-spam. Por favor, tente novamente.",
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      error: "Tempo limite esgotado ao verificar segurança. Tente novamente.",
      errorCodes: [isAbort ? "turnstile-timeout" : "network-error"],
    };
  }
}
