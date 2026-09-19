import React from "react";
import { BrandSymbol } from "./BrandLogo";

export function RafaelProfileSection() {
  return (
    <section id="sobre" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-3 mb-8 text-micro uppercase tracking-wider">
          <span className="font-bold text-teal-700">01 // IDENTIDADE & ATUAÇÃO</span>
          <div className="h-px w-12 bg-slate-300" />
          <span className="text-slate-500">Profissional independente</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="rounded-xl border border-slate-300 bg-white p-7 sm:p-8 shadow-xl relative overflow-hidden">
                {/* Tech blueprint coordinates */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-200 text-micro font-mono text-slate-500">
                  <span className="font-bold text-teal-700 tracking-wider">CREDENCIAL TÉCNICA</span>
                  <span>ID // RS-ENG-01</span>
                </div>

                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 border-2 border-teal-500/40 flex items-center justify-center shadow-lg relative mb-5 p-3">
                    <BrandSymbol className="w-14 h-14 sm:w-16 sm:h-16" theme="dark" />
                    <span className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-teal-900/90 border border-teal-400/50 text-[10px] font-mono font-bold text-teal-200 uppercase tracking-wider">
                      OPERACIONAL
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Rafael Soje
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-teal-700 font-semibold mt-1">
                    Infraestrutura, Cloud e Desenvolvimento Web
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200 font-mono text-xs text-slate-600">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">ATUAÇÃO</span>
                    <span className="font-bold text-slate-800">Engenheiro / Consultor</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">INTERMEDIÁRIOS</span>
                    <span className="font-bold text-emerald-700">Zero (Contato Direto)</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">REGIME FISCAL</span>
                    <span className="font-bold text-slate-800">Emissão de Nota Fiscal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
              Engenharia técnica com responsabilidade direta.
            </h2>
            <p className="mt-4 text-body-editorial text-slate-700 leading-relaxed max-w-[65ch]">
              Ao contratar meus serviços, você conversa e trabalha diretamente com quem analisa, configura 
              e sustenta o seu ambiente e seus sistemas. Sem repasse de chamados, sem intermediários.
            </p>
            <div className="mt-8 space-y-5">
              <div className="border-l-2 border-teal-600 pl-4 py-1">
                <h3 className="text-feature-title font-bold text-slate-900">Formação Acadêmica</h3>
                <p className="font-mono text-sm sm:text-[15px] text-teal-800 font-semibold mt-1">Bacharel em Ciência da Computação</p>
                <p className="font-mono text-sm sm:text-[15px] text-teal-800 font-semibold">Pós-graduação em Segurança da Informação</p>
              </div>
              <div className="border-l-2 border-slate-400 pl-4 py-1">
                <h3 className="text-feature-title font-bold text-slate-900">Experiência Prática Consolidada</h3>
                <p className="text-body-editorial text-slate-700 mt-1 leading-relaxed max-w-[65ch]">
                  Vivência na sustentação de servidores dedicados e VPS, segurança de ambientes digitais, 
                  migração de dados e desenvolvimento de sistemas para resolver gargalos operacionais reais.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded border border-slate-200 bg-white shadow-sm">
                <h3 className="font-mono text-sm font-bold uppercase mb-1.5 text-slate-900">Contato Direto</h3>
                <p className="text-body-small text-slate-600 leading-relaxed">
                  Comunicação clara e ágil pelo WhatsApp ou e-mail, com histórico e alinhamento direto.
                </p>
              </div>
              <div className="p-5 rounded border border-slate-200 bg-white shadow-sm">
                <h3 className="font-mono text-sm font-bold uppercase mb-1.5 text-slate-900">Precisão & Ética</h3>
                <p className="text-body-small text-slate-600 leading-relaxed">
                  Diagnósticos sinceros, soluções adequadas à sua escala e emissão regular de Nota Fiscal.
                </p>
              </div>
            </div>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center text-sm font-mono font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 hover:underline"
            >
              Falar diretamente com Rafael →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
