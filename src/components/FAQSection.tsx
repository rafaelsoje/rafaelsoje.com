"use client";

import React, { useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { PRICING } from "@/lib/pricing";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs = [
    {
      q: "Como funciona a avaliação inicial gratuita?",
      a: "É uma triagem preliminar sem custos. Você entra em contato explicando o problema observado, os sintomas do site ou servidor e o contexto da sua operação. Eu avalio as informações e indico a melhor rota de solução. Essa avaliação preliminar não inclui acesso SSH, alterações diretas no servidor ou horas de consultoria. Se uma intervenção direta for necessária, você receberá uma proposta com escopo e valor claros antes de qualquer trabalho.",
    },
    {
      q: "Você atende remotamente em qualquer região?",
      a: "Sim, os atendimentos de infraestrutura de servidores (Linux e Windows Server), segurança, migração de dados e desenvolvimento de sistemas são realizados de forma 100% remota. Atendo clientes em todo o Brasil, com fuso horário baseado em Brasília / Rio de Janeiro (UTC-3).",
    },
    {
      q: "Quanto custa um serviço e como é calculado o valor final?",
      a: `Os serviços contam com valores base transparentes: ${PRICING.suportePontual.title} ${PRICING.suportePontual.prefix} ${PRICING.suportePontual.formattedStartingPrice} (para emergências ou problemas específicos), ${PRICING.configuracaoMigracao.title} ${PRICING.configuracaoMigracao.prefix} ${PRICING.configuracaoMigracao.formattedStartingPrice} (para novos servidores ou mudança de provedor) e ${PRICING.manutencaoEssencial.title} ${PRICING.manutencaoEssencial.prefix} ${PRICING.manutencaoEssencial.formattedStartingPrice}${PRICING.manutencaoEssencial.periodCompact} (para supervisão contínua). O valor final depende da complexidade do ambiente e é sempre acordado previamente.`,
    },
    {
      q: "Você emite Nota Fiscal (NF) para empresas e pessoas físicas?",
      a: "Sim, todos os serviços contratados contam com emissão regular de Nota Fiscal de prestação de serviços de TI, adequada tanto para pessoas jurídicas (CNPJ) quanto para pessoas físicas.",
    },
    {
      q: "O que a Manutenção Essencial cobre e o que fica de fora?",
      a: `A ${PRICING.manutencaoEssencial.title} (${PRICING.manutencaoEssencial.prefix} ${PRICING.manutencaoEssencial.formattedStartingPrice}${PRICING.manutencaoEssencial.periodCompact}) é voltada para pequenos sites e aplicações estáveis que não podem ficar sem supervisão. Ela inclui: monitoramento contínuo de uptime, verificação periódica de SSL, conferência dos backups configurados, orientação técnica preventiva e até 30 minutos/mês de intervenção simples acordada (não cumulativo). Ela NÃO inclui suporte ilimitado, disponibilidade 24/7, SLA corporativo ou desenvolvimento de novos recursos.`,
    },
    {
      q: "Quais informações preciso fornecer no primeiro contato?",
      a: "Basta relatar seu nome, empresa (se houver), o endereço do site ou domínio afetado (se aplicável) e uma descrição resumida do problema que você precisa resolver ou do sistema que gostaria de criar. Não envie senhas nem credenciais de acesso no primeiro contato.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#ffffff] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-micro font-bold text-teal-700 tracking-wider">
              07 // DÚVIDAS FREQUENTES
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="text-micro text-slate-500 uppercase tracking-wider">
              Esclarecimentos Transparentes
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
            Perguntas diretas sobre atendimento e contratação.
          </h2>
          <p className="mt-3 text-body-lead text-slate-600 max-w-[65ch]">
            Respostas claras para você compreender como funciona o atendimento e o que esperar.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div key={index} className="py-5 sm:py-6">
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full text-left flex items-center justify-between gap-4 py-2 text-lg sm:text-xl font-bold text-slate-900 hover:text-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-2 flex-shrink-0 w-7 h-7 rounded border border-slate-300 flex items-center justify-center font-mono text-base transition-transform duration-200 ${
                        isOpen ? "bg-slate-900 text-white border-slate-900 rotate-180" : "text-slate-600"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="mt-3.5 text-body-editorial text-slate-700 leading-relaxed pr-8 max-w-[65ch]"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Note */}
        <div className="mt-10 p-4 sm:p-5 rounded bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 font-mono">
          <span>Tem outra dúvida específica sobre a sua necessidade?</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#contato"
              className="text-teal-700 font-bold hover:underline whitespace-nowrap"
            >
              Enviar pelo formulário →
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="mailto:contato@rafaelsoje.com"
              onClick={() => trackAnalyticsEvent("email_click", { location: "faq" })}
              className="text-slate-600 hover:text-slate-900 whitespace-nowrap"
            >
              contato@rafaelsoje.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
