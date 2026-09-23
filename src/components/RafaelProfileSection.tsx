import React from "react";

export function RafaelProfileSection() {
  return (
    <section id="sobre" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-3 mb-6 text-micro uppercase tracking-wider">
          <span className="font-bold text-teal-700">01 // IDENTIDADE & ATUAÇÃO</span>
          <div className="h-px w-12 bg-slate-300" />
          <span className="text-slate-500">Profissional independente</span>
        </div>

        <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
          Engenharia técnica com responsabilidade direta.
        </h2>
        <p className="mt-4 text-body-editorial text-slate-700 leading-relaxed max-w-[65ch]">
          Ao contratar meus serviços, você conversa e trabalha diretamente com quem analisa, configura 
          e sustenta o seu ambiente e seus sistemas. Sem repasse de chamados, sem intermediários.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-l-2 border-teal-600 pl-4 py-1">
            <h3 className="text-feature-title font-bold text-slate-900">Formação Acadêmica</h3>
            <p className="font-mono text-sm sm:text-[15px] text-teal-800 font-semibold mt-1">Bacharel em Ciência da Computação</p>
            <p className="font-mono text-sm sm:text-[15px] text-teal-800 font-semibold">Pós-graduação em Segurança da Informação</p>
          </div>
          <div className="border-l-2 border-slate-400 pl-4 py-1">
            <h3 className="text-feature-title font-bold text-slate-900">Experiência Prática Consolidada</h3>
            <p className="text-body-editorial text-slate-700 mt-1 leading-relaxed">
              Vivência na sustentação de servidores dedicados e VPS, segurança de ambientes digitais, 
              migração de dados e desenvolvimento de sistemas para resolver gargalos operacionais reais.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded border border-slate-200 bg-white shadow-sm">
            <h3 className="font-mono text-sm font-bold uppercase mb-1.5 text-slate-900">Contato Direto</h3>
            <p className="text-body-small text-slate-600 leading-relaxed">
              Comunicação clara e ágil por e-mail e canais estruturados, com histórico e alinhamento direto.
            </p>
          </div>
          <div className="p-5 rounded border border-slate-200 bg-white shadow-sm">
            <h3 className="font-mono text-sm font-bold uppercase mb-1.5 text-slate-900">Precisão & Ética</h3>
            <p className="text-body-small text-slate-600 leading-relaxed">
              Diagnósticos sinceros, soluções adequadas à sua escala e emissão regular de Nota Fiscal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
