/**
 * Centralized commercial pricing configuration for rafaelsoje.com
 * Single source of truth used across PricingSection, FAQSection, and CTAs.
 */

export const PRICING = {
  suportePontual: {
    id: "suporte-pontual",
    title: "Suporte Pontual",
    badge: "Demanda Específica",
    category: "INTERVENÇÃO DIRETA",
    type: "AVULSO",
    description:
      "Ideal para resolver emergências, desbloquear serviços fora do ar ou realizar correções específicas sob demanda.",
    prefix: "a partir de",
    startingPrice: 190,
    formattedStartingPrice: "R$ 190",
    note: "Valor final conforme complexidade e tempo necessário.",
  },
  configuracaoMigracao: {
    id: "configuracao-migracao",
    title: "Configuração e Migração",
    badge: "Setup Estrutural",
    category: "IMPLANTAÇÃO & AMBIENTE",
    type: "PROJETO",
    description:
      "Para quem está colocando um servidor novo no ar, mudando de hospedagem ou precisa reestruturar o ambiente.",
    prefix: "a partir de",
    startingPrice: 590,
    formattedStartingPrice: "R$ 590",
    note: "Valor definido após avaliação do ambiente e do escopo.",
  },
  manutencaoEssencial: {
    id: "manutencao-essencial",
    title: "Manutenção Essencial",
    badge: "Acompanhamento Mensal",
    category: "ACOMPANHAMENTO PREVENTIVO",
    type: "MENSAL",
    description:
      "Supervisão contínua e tranquilidade técnica para sites e ambientes que não podem ser abandonados.",
    prefix: "a partir de",
    startingPrice: 249,
    formattedStartingPrice: "R$ 249",
    period: "/ mês",
    periodCompact: "/mês",
    note: "Para 1 ambiente/site de baixa complexidade.",
  },
} as const;

export type PricingKey = keyof typeof PRICING;

