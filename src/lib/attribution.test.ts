import { describe, expect, it } from "vitest";
import { getAttributionPagePath, sanitizeCampaignPagePath } from "./attribution";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    values,
  };
}

describe("atribuição de campanha", () => {
  it("não cria campanha para URL sem UTM", () => {
    const storage = memoryStorage();
    expect(getAttributionPagePath("/?email=prospect@example.com", storage)).toBe("/");
    expect(storage.values.size).toBe(0);
  });

  it("preserva os cinco UTMs permitidos na primeira visita da aba", () => {
    const storage = memoryStorage();
    const entry = "/?utm_source=prospeccao&utm_medium=email&utm_campaign=prospeccao_tecnica&utm_content=ger7&utm_term=servidores";
    expect(getAttributionPagePath(entry, storage)).toBe(entry);
    expect(getAttributionPagePath("/privacidade", storage)).toBe(entry);
    expect(getAttributionPagePath("/?utm_source=outra&utm_medium=email", storage)).toBe(entry);
  });

  it("remove dados pessoais e parâmetros não permitidos da atribuição", () => {
    const input = "/?utm_source=prospeccao&utm_content=ger7&email=ana%40empresa.com&name=Ana&phone=11987654321&utm_term=ana%40empresa.com";
    const result = sanitizeCampaignPagePath(input);
    expect(result.pagePath).toBe("/?utm_source=prospeccao&utm_content=ger7");
    expect(result.pagePath).not.toMatch(/ana|email|name|phone|11987654321/i);
  });

  it("não permite outra origem e funciona sem sessionStorage", () => {
    expect(sanitizeCampaignPagePath("/\\outro-dominio.com/?utm_source=prospeccao").hasCampaign).toBe(false);
    expect(getAttributionPagePath("/?utm_source=prospeccao")).toBe("/?utm_source=prospeccao");
  });
});
