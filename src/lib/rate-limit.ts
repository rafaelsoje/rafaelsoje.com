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

