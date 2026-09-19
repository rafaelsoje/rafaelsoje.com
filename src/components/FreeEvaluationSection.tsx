import React from "react";

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
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400">
              05 // TRIAGEM TÉCNICA
            </span>
            <div className="h-[1px] w-12 bg-slate-700" />
            <span className="font-mono text-xs text-slate-400 uppercase">
              Sem Custo & Sem Compromisso
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Value Proposition */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Avaliação Inicial Gratuita: entenda o problema antes de contratar.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Você não precisa contratar às cegas sem saber o que está quebrado. 
                Envie os sintomas do seu site ou servidor e receba uma orientação preliminar 
                sobre a rota mais segura e econômica para resolver o cenário.
              </p>

              {/* 3 Steps */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <span className="font-mono text-teal-400 text-xs font-bold block mb-1">
                    01. VOCÊ EXPLICA
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Relata o sintoma, mensagens de erro observadas e o contexto do ambiente.
                  </p>
                </div>

                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <span className="font-mono text-teal-400 text-xs font-bold block mb-1">
                    02. RAFAEL AVALIA
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Análise inicial com base nas evidências para apontar o diagnóstico mais provável.
                  </p>
                </div>

                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <span className="font-mono text-teal-400 text-xs font-bold block mb-1">
                    03. PRÓXIMO PASSO
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Você decide: se for necessária intervenção direta, você recebe proposta clara antes.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Caveat Box & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/90 rounded-lg border border-slate-800 p-6 sm:p-7">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block mb-3 border-b border-slate-800 pb-2">
                  Limites Claros da Triagem:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  A triagem serve para direcionar a solução e identificar o escopo. 
                  <strong> Ela NÃO inclui:</strong>
                </p>
                <ul className="space-y-1.5 text-xs font-mono text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2">✕</span>
                    <span>Acesso SSH ao servidor ou credenciais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2">✕</span>
                    <span>Investigação aprofundada de código</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2">✕</span>
                    <span>Alterações ou correções no ambiente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-2">✕</span>
                    <span>Horas de consultoria gratuitas</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <a
                  href="#contato"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-md"
                >
                  Solicitar Triagem Preliminar
                </a>
                <a
                  href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20uma%20avalia%C3%A7%C3%A3o%20inicial%20gratuita%20sobre%20meu%20ambiente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded text-xs font-mono border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                >
                  Falar no WhatsApp: +55 21 99984-0419
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

