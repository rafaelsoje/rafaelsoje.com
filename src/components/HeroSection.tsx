"use client";

import React from "react";
import { BrandSymbol } from "./BrandLogo";
import { InfrastructureDiagram } from "./InfrastructureDiagram";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#090d16] text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-800">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient-hero pointer-events-none" />

      {/* Decorative technical coordinate stamps */}
      <div className="hidden lg:flex absolute top-6 right-8 font-mono text-[10px] text-slate-400 flex-col items-end space-y-1 select-none pointer-events-none">
        <span>SYS // SERVER_INFRA_OPS</span>
        <span>LAT: -22.9068 | LON: -43.1729</span>
        <span className="text-teal-400">SUPORTE & SUSTENTAÇÃO ATIVA</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Monogram & Category Header */}
        <div className="flex items-center space-x-3 mb-6">
          <BrandSymbol className="w-5 h-5" theme="dark" />
          <div className="h-3 w-[1px] bg-slate-700" />
          <span className="text-micro text-slate-400 font-bold tracking-wider uppercase">
            Infraestrutura, Cloud &amp; Desenvolvimento Web
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-display font-extrabold text-slate-100">
            Servidores estáveis, seguros e sistemas sob medida para sua empresa{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              não parar.
            </span>
          </h1>
          <p className="mt-6 text-body-lead text-slate-300 leading-relaxed max-w-[65ch]">
            Diagnóstico imediato de instabilidade, configuração, migrações sem perda de dados e desenvolvimento ágil em <strong>Linux</strong> e <strong>Windows Server</strong>. Atendimento técnico direto com especialista.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-6 py-4 rounded text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <span>Solicitar avaliação inicial</span>
            <span className="ml-2 font-sans font-bold">→</span>
          </a>

          <a
            href="#servicos"
            className="inline-flex items-center justify-center px-6 py-4 rounded text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 gap-2"
          >
            <span>Ver Problemas &amp; Soluções</span>
            <span className="font-sans font-bold">↓</span>
          </a>
        </div>

        {/* Embedded Topology Diagram */}
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-widest text-micro text-slate-400">
              Estrutura Operacional e Continuidade de Serviços
            </span>
            <span className="hidden sm:inline text-micro text-slate-400">
              DIAGNÓSTICO & PREVENÇÃO ATIVA
            </span>
          </div>
          <InfrastructureDiagram />
        </div>
      </div>
    </section>
  );
}
