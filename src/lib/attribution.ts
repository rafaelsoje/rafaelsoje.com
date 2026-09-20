const STORAGE_KEY = "rafaelsoje_campaign_page";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const SITE_ORIGIN = "https://rafaelsoje.com";

/** Mantém somente identificadores de campanha; nunca replica outros parâmetros da URL. */
export function sanitizeCampaignPagePath(input: string): { pagePath: string; hasCampaign: boolean } {
  if (!input.startsWith("/") || input.length > 2048) {
    return { pagePath: "/", hasCampaign: false };
  }

  try {
    const url = new URL(input, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN) {
      return { pagePath: "/", hasCampaign: false };
    }

    const campaign = new URLSearchParams();
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      // Identificadores comerciais curtos, iniciados por letra. Exclui e-mails e telefones.
      if (value && /^[a-z][a-z0-9_-]{0,79}$/i.test(value)) {
        campaign.set(key, value);
      }
    }

    const query = campaign.toString();
    return { pagePath: url.pathname + (query ? `?${query}` : ""), hasCampaign: Boolean(query) };
  } catch {
    return { pagePath: "/", hasCampaign: false };
  }
}

/** Primeira campanha válida desta aba; funciona sem storage quando ele é bloqueado. */
export function getAttributionPagePath(
  currentPath: string,
  storage?: Pick<Storage, "getItem" | "setItem">
): string {
  const current = sanitizeCampaignPagePath(currentPath);
  if (!storage) return current.pagePath;

  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      const previous = sanitizeCampaignPagePath(stored);
      if (previous.hasCampaign) return previous.pagePath;
    }
    if (current.hasCampaign) storage.setItem(STORAGE_KEY, current.pagePath);
  } catch {
    // Storage pode ser bloqueado por configurações de privacidade do navegador.
  }

  return current.pagePath;
}

export function getBrowserAttributionPagePath(): string {
  const currentPath = window.location.pathname + window.location.search;
  try {
    return getAttributionPagePath(currentPath, window.sessionStorage);
  } catch {
    return sanitizeCampaignPagePath(currentPath).pagePath;
  }
}
