import React from "react";
import { BrandMonogram } from "./BrandMonogram";
import { InfrastructureDiagram } from "./InfrastructureDiagram";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#090d16] text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-800">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient-hero pointer-events-none" />

      {/* Decorative technical coordinate stamps */}
      <div className="hidden lg:flex absolute top-6 right-8 font-mono text-[10px] text-slate-400 flex-col items-end space-y-1 select-none pointer-events-none">
        <span>SYS // LINUX_SRV_ARCH</span>
        <span>LAT: -22.9068 | LON: -43.1729</span>
        <span className="text-teal-400">EDGE // TLS 1.3 // WAF ACTIVE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Monogram & Category Header */}
        <div className="flex items-center space-x-3 mb-6">
          <BrandMonogram size="sm" variant="minimal" className="text-teal-400" />
          <div className="h-3 w-[1px] bg-slate-700" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Engenharia de Infraestrutura & Desenvolvimento
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            Infraestrutura, Cloud e Desenvolvimento para manter sua operação{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              funcionando.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl">
            Atuação técnica direta em <strong>servidores Linux</strong>, <strong>Cloudflare</strong>, 
            segurança, certificados <strong>SSL</strong>, migrações sem instabilidade, rotinas de 
            <strong> backup</strong> e <strong>desenvolvimento web</strong>. Sem intermediários, com 
            responsabilidade e precisão profissional.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
          <a
            href="#avaliacao"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <span>Solicitar Avaliação Inicial Gratuita</span>
            <span className="ml-2 font-sans font-bold">→</span>
          </a>

          <a
            href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20conversar%20sobre%20uma%20demanda%20t%C3%A9cnica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <svg className="w-4 h-4 mr-2 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
            </svg>
            <span>Falar no WhatsApp (+55 21 99984-0419)</span>
          </a>
        </div>

        {/* Embedded Topology Diagram */}
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-widest text-[11px] text-slate-400">
              Arquitetura de Conexões e Continuidade Operacional
            </span>
            <span className="hidden sm:inline text-slate-400">
              MONITORAMENTO & PREVENÇÃO ATIVA
            </span>
          </div>
          <InfrastructureDiagram />
        </div>
      </div>
    </section>
  );
}

