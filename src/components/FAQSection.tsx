"use client";

import React, { useState } from "react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs = [
    {
      q: "Como funciona a avaliação inicial gratuita?",
      a: "É uma triagem preliminar sem custos. Você entra em contato explicando o problema observado, os sintomas do site ou servidor e o contexto da sua aplicação. Eu avalio as informações e indico a melhor rota de solução. Essa avaliação preliminar não inclui acesso SSH, alterações diretas no servidor, correção de bugs ou horas de consultoria. Se uma intervenção for necessária, você receberá um orçamento com escopo detalhado antes de qualquer trabalho.",
    },
    {
      q: "Você atende remotamente em qualquer região?",
      a: "Sim, 100% dos serviços de infraestrutura Linux, Cloud, segurança e desenvolvimento web são realizados de forma remota. Atendo clientes em todo o Brasil, com fuso horário baseado em Brasília / Rio de Janeiro (UTC-3).",
    },
    {
      q: "Quanto custa um serviço e como é calculado o valor final?",
      a: "Os serviços contam com valores base transparentes: Suporte Pontual a partir de R$ 150, Configuração e Migração a partir de R$ 350, e Manutenção Essencial a partir de R$ 149/mês. O valor final depende estritamente do tamanho do ambiente, complexidade da pilha de software e tempo estimado de execução. Antes de iniciar qualquer atividade paga, o valor é acordado previamente.",
    },
    {
      q: "Você emite Nota Fiscal (NF) para empresas e pessoas físicas?",
      a: "Sim, todos os serviços contratados contam com emissão regular de Nota Fiscal de prestação de serviços de TI, adequada tanto para pessoas jurídicas (CNPJ) quanto para pessoas físicas.",
    },
    {
      q: "O que a Manutenção Essencial cobre e o que fica de fora?",
      a: "A Manutenção Essencial (a partir de R$ 149/mês) é voltada para pequenos sites e aplicações estáveis. Ela inclui: monitoramento contínuo de uptime, verificação periódica de SSL, conferência dos backups configurados, orientação técnica preventiva e até 30 minutos/mês de intervenção simples acordada (não cumulativo). Ela NÃO inclui: suporte ilimitado, disponibilidade 24/7, SLA corporativo ou desenvolvimento de novos recursos. Demandas fora desse escopo são orçadas separadamente.",
    },
    {
      q: "Quais informações preciso fornecer no primeiro contato?",
      a: "Basta relatar seu nome, empresa (se houver), o endereço do site ou domínio afetado (se aplicável) e uma descrição resumida do que está acontecendo ou do objetivo da contratação. Não envie senhas nem credenciais de acesso no primeiro contato.",
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
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-700">
              07 // DÚVIDAS FREQUENTES
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="font-mono text-xs text-slate-500 uppercase">
              Esclarecimentos Transparentes
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Perguntas diretas sobre atendimento e escopo.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Respostas claras para você compreender como funciona a contratação e o que esperar.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div key={index} className="py-5">
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full text-left flex items-center justify-between gap-4 py-2 text-base sm:text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-2 flex-shrink-0 w-6 h-6 rounded border border-slate-300 flex items-center justify-center font-mono text-sm transition-transform duration-200 ${
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
                    className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed pr-8"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Note */}
        <div className="mt-10 p-4 rounded bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs text-slate-600 font-mono">
          <span>Tem outra dúvida específica para o seu ambiente?</span>
          <a
            href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20tenho%20uma%20d%C3%BAvida%20espec%C3%ADfica."
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 font-bold hover:underline whitespace-nowrap"
          >
            Perguntar no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

