"use client";

import React from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function FreeEvaluationSection() {
  return (
    <section id="avaliacao" className="relative bg-[#090d16] text-white py-16 md:py-24 border-b border-slate-800">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-xl border border-teal-500/40 bg-slate-900/90 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Marker */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-micro font-bold text-teal-400 tracking-wider">
              05 // TRIAGEM PRELIMINAR
            </span>
            <div className="h-[1px] w-12 bg-slate-700" />
            <span className="text-micro text-slate-400 uppercase tracking-wider">
              Sem Custo & Sem Compromisso
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Value Proposition */}
            <div className="lg:col-span-7">
              <h2 className="text-section-title font-extrabold text-white leading-tight">
                Não sabe exatamente o que está causando o problema?
              </h2>
              <p className="mt-4 text-body-lead text-slate-300 leading-relaxed max-w-[65ch]">
                Você não precisa adivinhar o que está quebrado nem contratar um serviço sem necessidade. 
                Explique o cenário e os sintomas observados: Rafael faz uma triagem inicial para 
                entender a situação e indicar o próximo passo mais adequado e econômico.
              </p>

              {/* 3 Steps */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 sm:p-5 rounded border border-slate-800 bg-slate-950/60 shadow-inner">
                  <span className="text-micro sm:text-xs font-mono text-teal-300 font-bold block mb-1.5">
                    01. VOCÊ EXPLICA
                  </span>
                  <p className="text-body-small text-slate-300 leading-relaxed">
                    Relata o que está acontecendo, mensagens de erro observadas e o contexto do ambiente.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded border border-slate-800 bg-slate-950/60 shadow-inner">
                  <span className="text-micro sm:text-xs font-mono text-teal-300 font-bold block mb-1.5">
                    02. RAFAEL AVALIA
                  </span>
                  <p className="text-body-small text-slate-300 leading-relaxed">
                    Triagem inicial com base nos sintomas para identificar a provável origem e o escopo necessário.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded border border-slate-800 bg-slate-950/60 shadow-inner">
                  <span className="text-micro sm:text-xs font-mono text-teal-300 font-bold block mb-1.5">
                    03. PRÓXIMO PASSO
                  </span>
                  <p className="text-body-small text-slate-300 leading-relaxed">
                    Você decide: se for necessária intervenção técnica direta, você recebe um escopo e valor claros antes.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Caveat Box & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/90 rounded-lg border border-slate-800 p-6 sm:p-8">
              <div>
                <span className="text-micro font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3 border-b border-slate-800 pb-2.5">
                  Limites Claros da Triagem:
                </span>
                <p className="text-body-small text-slate-300 leading-relaxed mb-4">
                  A avaliação inicial serve para direcionar a rota de solução. 
                  <strong className="text-white"> Ela NÃO inclui:</strong>
                </p>
                <ul className="space-y-2 text-xs sm:text-sm font-mono text-slate-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2 font-bold">✕</span>
                    <span>Acesso SSH ao servidor ou solicitação de senhas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2 font-bold">✕</span>
                    <span>Investigação aprofundada de código ou bancos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2 font-bold">✕</span>
                    <span>Alterações ou correções diretas no ambiente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2 font-bold">✕</span>
                    <span>Horas de consultoria gratuitas</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <a
                  href="#contato"
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-md"
                >
                  Solicitar avaliação inicial
                </a>
                <a
                  href="mailto:contato@rafaelsoje.com"
                  onClick={() => trackAnalyticsEvent("email_click", { location: "free_evaluation" })}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded text-xs sm:text-sm font-mono border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                >
                  contato@rafaelsoje.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
