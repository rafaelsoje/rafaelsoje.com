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
    prefix: "A partir de",
    startingPrice: 250,
    formattedStartingPrice: "R$ 250",
    note: "Ideal para incidentes rápidos, desbloqueio de portas ou diagnóstico emergencial.",
  },
  configuracaoMigracao: {
    id: "configuracao-migracao",
    title: "Configuração e Migração",
    badge: "Setup Estrutural",
    category: "IMPLANTAÇÃO & AMBIENTE",
    type: "PROJETO",
    description:
      "Para quem está colocando um servidor novo no ar, mudando de hospedagem ou precisa reestruturar o ambiente.",
    prefix: "A partir de",
    startingPrice: 600,
    formattedStartingPrice: "R$ 600",
    note: "Servidor novo, transferência de hospedagem sem downtime ou reestruturação.",
  },
  manutencaoEssencial: {
    id: "manutencao-essencial",
    title: "Manutenção Essencial",
    badge: "Acompanhamento Mensal",
    category: "ACOMPANHAMENTO PREVENTIVO",
    type: "MENSAL",
    description:
      "Supervisão contínua e tranquilidade técnica para sites e ambientes que não podem ser abandonados.",
    prefix: "Planos a partir de",
    startingPrice: 450,
    formattedStartingPrice: "R$ 450",
    period: "/ mês",
    periodCompact: "/mês",
    note: "Monitoramento contínuo, backups e tranquilidade operacional.",
  },
} as const;

export type PricingKey = keyof typeof PRICING;

