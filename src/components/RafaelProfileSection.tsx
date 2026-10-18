"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function RafaelProfileSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="sobre" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-6 text-micro uppercase tracking-wider">
          <span className="font-bold text-teal-700">01 // IDENTIDADE &amp; ATUAÇÃO</span>
          <div className="h-px w-12 bg-slate-300" />
          <span className="text-slate-500">Profissional independente</span>
        </div>

        {/* Header, Bio & Professional Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          {/* Coluna da Bio Técnica */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
              Engenharia técnica com responsabilidade direta.
            </h2>
            <div className="mt-6 space-y-4 text-body-editorial text-slate-700 leading-relaxed">
              <p>
                Sou <strong className="text-slate-900 font-semibold">Rafael Soje</strong>, profissional de tecnologia com atuação em infraestrutura, cloud, segurança e desenvolvimento de sistemas. Trabalho diretamente na análise, implementação e sustentação das soluções que entrego — do diagnóstico de um problema em produção à construção ou modernização de um ambiente completo.
              </p>
              <p>
                Minha atuação combina desenvolvimento e infraestrutura, o que permite analisar uma solução além do código: servidor, aplicação, banco de dados, rede, segurança, deploy, disponibilidade e operação fazem parte do mesmo contexto.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-mono text-xs font-semibold tracking-wide transition-colors shadow-sm"
              >
                Conhecer trajetória completa e certificações &rarr;
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-mono text-xs font-semibold tracking-wide transition-colors shadow-sm"
              >
                Acessar artigos técnicos &rarr;
              </Link>
            </div>
          </div>

          {/* Coluna da Foto de Perfil Profissional */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] rounded-2xl border border-slate-200/90 bg-white p-4 shadow-lg">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 font-mono text-micro">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-slate-700 font-semibold">Atendimento Ativo</span>
                </div>
                <span className="text-slate-400">ESPECIALISTA</span>
              </div>

              {/* Moldura da Foto */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-200 shadow-inner">
                {imageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-teal-400 bg-slate-800 flex items-center justify-center mb-3 text-2xl font-bold font-mono text-teal-400 shadow-inner">
                      RS
                    </div>
                    <span className="font-bold text-slate-100 font-mono text-base">Rafael Soje</span>
                    <span className="text-xs text-teal-400 font-mono mt-1">Infraestrutura &amp; Sistemas</span>
                    <div className="flex gap-2 mt-4 text-[10px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Linux</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Windows</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Cloud</span>
                    </div>
                  </div>
                ) : (
                  <Image
                    src="/images/rafael-soje.jpg"
                    alt="Rafael Soje - Especialista em Infraestrutura e Desenvolvimento de Sistemas"
                    fill
                    sizes="(max-width: 1024px) 280px, 320px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    onError={() => setImageError(true)}
                    priority={false}
                  />
                )}
              </div>

              {/* Informações da Foto */}
              <div className="mt-3.5 text-center">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  Rafael Soje
                </h3>
                <p className="text-xs font-mono text-teal-700 font-semibold mt-0.5">
                  Infraestrutura, Cloud &amp; Sistemas
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <span>Ciência da Computação</span>
                  <span>•</span>
                  <span>LPIC-1</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <Link
                    href="/sobre"
                    className="inline-block text-xs font-mono text-teal-700 hover:text-teal-900 font-semibold"
                  >
                    Ver perfil institucional detalhado &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formação, Certificações & Experiência Prática */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Formação & Certificações */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl border border-slate-200/90 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-micro font-mono uppercase tracking-wider text-teal-800 font-bold block mb-4 border-b border-slate-100 pb-2">
                FORMAÇÃO &amp; CERTIFICAÇÕES
              </span>
              <div className="space-y-4">
                <div className="border-l-2 border-teal-600 pl-3.5 py-0.5">
                  <div className="font-mono text-sm sm:text-[15px] font-bold text-slate-900">
                    Bacharel em Ciência da Computação
                  </div>
                  <span className="text-micro font-mono text-slate-500 uppercase">Graduação</span>
                </div>
                <div className="border-l-2 border-teal-600 pl-3.5 py-0.5">
                  <div className="font-mono text-sm sm:text-[15px] font-bold text-slate-900">
                    Pós-graduação em Segurança da Informação
                  </div>
                  <span className="text-micro font-mono text-slate-500 uppercase">Especialização</span>
                </div>
                <div className="border-l-2 border-slate-400 pl-3.5 py-0.5">
                  <div className="font-mono text-sm sm:text-[15px] font-bold text-slate-900">
                    LPIC-1
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Linux Professional Institute Certification
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiência Prática */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl border border-slate-200/90 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-micro font-mono uppercase tracking-wider text-slate-600 font-bold block mb-4 border-b border-slate-100 pb-2">
                EXPERIÊNCIA PRÁTICA CONSOLIDADA
              </span>
              <div className="space-y-4 text-body-editorial text-slate-700 leading-relaxed">
                <p>
                  Experiência prática com servidores Linux, VPS e ambientes dedicados, hospedagem de aplicações, bancos de dados, redes, segurança, migração de dados, troubleshooting e desenvolvimento de sistemas.
                </p>
                <p>
                  Atuação voltada tanto à resolução de incidentes quanto à implantação, modernização e sustentação de ambientes em produção.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-micro font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Sustentação</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Hardening</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Troubleshooting</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Modernização</span>
            </div>
          </div>
        </div>

        {/* Áreas de Atuação */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-micro font-mono text-teal-800 uppercase tracking-wider font-bold block mb-1">
              Capacidades Técnicas
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Áreas de Atuação
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>01 // INFRA</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                Linux &amp; Servidores
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                Administração, configuração, troubleshooting e hardening de sistemas operacionais.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>02 // CLOUD</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                Cloud &amp; Infraestrutura
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                VPS, ambientes dedicados, DNS, proxy reverso, redes e serviços essenciais.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>03 // SOFTWARE</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                Desenvolvimento
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                Sistemas web, backend, APIs, integrações de serviços e bancos de dados relacionais.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>04 // DEPLOY</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                DevOps &amp; Deploy
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                Docker, automação de esteira, versionamento Git, deploy controlado e operação contínua.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>05 // SECURITY</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                Segurança
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                Hardening de ambiente, análise de exposição externa, proteção e boas práticas defensivas.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-2">
                <span>06 // AUTOMATION</span>
              </div>
              <h4 className="font-mono text-sm sm:text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                Automação &amp; Integrações
              </h4>
              <p className="text-body-small text-slate-600 mt-2 leading-relaxed">
                APIs, fluxos de processos, integrações de plataformas e redução de intervenções manuais.
              </p>
            </div>
          </div>
        </div>

        {/* Como Eu Trabalho */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="text-micro font-mono text-teal-800 uppercase tracking-wider font-bold block mb-1">
              Metodologia &amp; Disciplina
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Como Eu Trabalho
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-700 block mb-2">01</span>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900">
                  ENTENDER
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                  Análise criteriosa do problema, diagnóstico do ambiente e mapeamento do impacto operacional.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-700 block mb-2">02</span>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900">
                  PLANEJAR
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                  Definição da arquitetura da solução, delimitação clara de escopo e ordem de prioridades.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-700 block mb-2">03</span>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900">
                  EXECUTAR
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                  Implementação técnica com controle de versões, segurança e documentação das mudanças.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-700 block mb-2">04</span>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900">
                  VALIDAR
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                  Testes de integridade, checagem de segurança e validação do resultado junto ao cliente.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-teal-700 block mb-2">05</span>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900">
                  SUSTENTAR
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                  Monitoramento contínuo, rotinas preventivas de manutenção e evolução planejada quando necessário.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsabilidade Direta */}
        <div className="p-6 sm:p-8 rounded-xl border border-teal-200 bg-white shadow-sm relative overflow-hidden">
          <div className="border-l-4 border-teal-600 pl-4 sm:pl-6 max-w-4xl">
            <span className="text-micro font-mono text-teal-800 uppercase tracking-wider font-bold block mb-1">
              RESPONSABILIDADE DIRETA
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Do diagnóstico à entrega.
            </h3>
            <p className="mt-3 text-body-editorial text-slate-700 leading-relaxed">
              Você não é transferido entre comercial, suporte e equipes diferentes. O contato técnico é direto comigo durante a avaliação, execução e entrega do projeto.
            </p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Quando a demanda exige outras especialidades, isso é alinhado de forma transparente antes da execução.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
