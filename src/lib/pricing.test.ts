import { describe, it, expect } from "vitest";
import { PRICING } from "./pricing";

describe("PRICING constants", () => {
  it("contains valid configuration for Suporte Pontual", () => {
    expect(PRICING.suportePontual.startingPrice).toBe(190);
    expect(PRICING.suportePontual.formattedStartingPrice).toBe("R$ 190");
    expect(PRICING.suportePontual.prefix).toBe("a partir de");
    expect(PRICING.suportePontual.note).toBeTruthy();
  });

  it("contains valid configuration for Configuração e Migração", () => {
    expect(PRICING.configuracaoMigracao.startingPrice).toBe(590);
    expect(PRICING.configuracaoMigracao.formattedStartingPrice).toBe("R$ 590");
    expect(PRICING.configuracaoMigracao.prefix).toBe("a partir de");
    expect(PRICING.configuracaoMigracao.note).toBeTruthy();
  });

  it("contains valid configuration for Manutenção Essencial", () => {
    expect(PRICING.manutencaoEssencial.startingPrice).toBe(249);
    expect(PRICING.manutencaoEssencial.formattedStartingPrice).toBe("R$ 249");
    expect(PRICING.manutencaoEssencial.period).toBe("/ mês");
    expect(PRICING.manutencaoEssencial.periodCompact).toBe("/mês");
    expect(PRICING.manutencaoEssencial.note).toBeTruthy();
  });
});

