import React from "react";
import { BrandMonogram } from "./BrandMonogram";

export function RafaelProfileSection() {
  return (
    <section id="sobre" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      {/* Subtle editorial grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section marker */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-700">
            01 // IDENTIDADE & ATUAÇÃO
          </span>
          <div className="h-[1px] w-12 bg-slate-300" />
          <span className="font-mono text-xs text-slate-500 uppercase">
            Profissional Independente
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Photo Frame Container */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Engineering Crop Marks */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-slate-900 pointer-events-none z-20" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-slate-900 pointer-events-none z-20" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-slate-900 pointer-events-none z-20" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-slate-900 pointer-events-none z-20" />

              {/* Photo Frame Container (4:5 Aspect Ratio) */}
              <div className="aspect-[4/5] rounded-none border border-slate-300 bg-white p-4 shadow-xl flex flex-col justify-between relative overflow-hidden">
                {/* Background blueprint guides */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Top framing bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] font-mono text-slate-500">
                  <span>REF: PERFIL_REAL</span>
                  <span>FORMATO 4:5</span>
                </div>

                {/* Center visual: Monogram Stamp & Real Photo Placeholder */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-300 rounded bg-slate-50/70">
                  <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
                    <BrandMonogram size="md" variant="minimal" className="text-white text-2xl" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-slate-900 mb-1">
                    Rafael Soje
                  </h4>
                  <p className="font-mono text-xs text-teal-700 font-semibold mb-3">
                    Ciência da Computação & Seg. da Informação
                  </p>
                  <div className="inline-block px-2.5 py-1 rounded bg-slate-200/80 text-slate-700 font-mono text-[10px] uppercase tracking-wider">
                    Espaço reservado para fotografia real
                  </div>
                </div>

                {/* Bottom metadata */}
                <div className="relative z-10 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 pr-16 sm:pr-20">
                  <span>ATENDIMENTO DIRETO</span>
                  <span>SEM INTERMEDIÁRIOS</span>
                </div>
              </div>

              {/* Floating Engineering Seal */}
              <div className="absolute -bottom-4 -right-4 hidden sm:block z-30">
                <BrandMonogram variant="stamp" />
              </div>
            </div>
          </div>

          {/* Profile Editorial Biography */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Engenharia técnica com responsabilidade direta.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Não sou uma agência com camadas burocráticas nem um atendente comercial repassando chamados. 
              Ao contratar meus serviços, você conversa e trabalha diretamente com quem analisa, 
              configura e sustenta o seu ambiente.
            </p>

            {/* Real Qualifications & Experience */}
            <div className="mt-8 space-y-4">
              <div className="border-l-2 border-teal-600 pl-4 py-1">
                <h3 className="font-sans font-bold text-sm text-slate-900">
                  Formação Acadêmica Real
                </h3>
                <p className="font-mono text-xs text-teal-800 font-medium mt-0.5">
                  Bacharel em Ciência da Computação
                </p>
                <p className="font-mono text-xs text-teal-800 font-medium">
                  Pós-graduação em Segurança da Informação
                </p>
              </div>

              <div className="border-l-2 border-slate-400 pl-4 py-1">
                <h3 className="font-sans font-bold text-sm text-slate-900">
                  Experiência Prática Consolidada
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Vivência em ambientes de produção com sistemas operacionais <strong>Linux</strong>, 
                  servidores dedicados e VPS, topologias de rede, práticas de segurança e 
                  desenvolvimento de aplicações web completas.
                </p>
              </div>
            </div>

            {/* Direct Professional Advantages */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-slate-200 bg-white">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-2" />
                  Contato Direto
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Comunicação clara pelo WhatsApp ou e-mail, sem filas de espera ou perda de contexto.
                </p>
              </div>

              <div className="p-4 rounded border border-slate-200 bg-white">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-2" />
                  Precisão & Ética
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diagnósticos sinceros. Não crio complexidade desnecessária para vender serviços extras.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-8 flex items-center space-x-4">
              <a
                href="#contato"
                className="inline-flex items-center text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 hover:underline"
              >
                <span>Falar diretamente com Rafael</span>
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

