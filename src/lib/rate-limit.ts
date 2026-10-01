interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpa entradas expiradas periodicamente para evitar memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000).unref?.();

/**
 * Verifica se a requisição está dentro do limite tolerado
 * @param identifier IP ou identificador único do cliente
 * @param limit Quantidade máxima de requisições na janela
 * @param windowMs Duração da janela em milissegundos (padrão: 10 minutos)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    if (rateLimitStore.size >= 10000) {
      // Limpeza de emergência caso haja ataque com rotação de IPs
      for (const [k, v] of rateLimitStore.entries()) {
        if (now > v.resetTime) rateLimitStore.delete(k);
      }
      if (rateLimitStore.size >= 10000) {
        let purged = 0;
        for (const k of rateLimitStore.keys()) {
          rateLimitStore.delete(k);
          if (++purged >= 1000) break;
        }
      }
    }

    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, newEntry);
    return {
      success: true,
      remaining: limit - 1,
      resetTime: newEntry.resetTime,
    };
  }

  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime,
  };
}

export function resetRateLimitStoreForTesting(): void {
  rateLimitStore.clear();
}

/**
 * Extrai o IP do cliente priorizando headers confiáveis da Cloudflare e proxies reversos.
 * Evita que atacantes burlem o rate limit forjando cabeçalhos X-Forwarded-For quando atrás do Cloudflare.
 */
export function extractClientIp(headers: Headers): string {
  // 1. Prioridade máxima: CF-Connecting-IP (injetado pela borda da Cloudflare)
  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  // 2. Fallback secundário: X-Real-IP (injetado por proxies locais como Nginx)
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  // 3. Fallback terciário: X-Forwarded-For (primeiro IP da lista)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  // 4. Fallback para ambiente local / desenvolvimento
  return "127.0.0.1";
}

