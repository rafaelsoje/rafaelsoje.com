import React from "react";
import { PRICING } from "@/lib/pricing";

export function PricingSection() {
  return (
    <section id="precos" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-micro font-bold text-teal-700 tracking-wider">
              04 // MODALIDADES & PREÇOS
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="text-micro text-slate-500 uppercase tracking-wider">
              Transparência Comercial
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
            Serviços profissionais com escopo e valores claros.
          </h2>
          <p className="mt-4 text-body-lead text-slate-600 leading-relaxed max-w-[65ch]">
            Sem mensalidades escondidas ou falsas promessas. 
            Você sabe exatamente como cada intervenção é conduzida e o que está contemplado.
          </p>
        </div>

        {/* 3 Core Commercial Offerings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* 1. Suporte Pontual */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 sm:p-8 shadow-md hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-4 border-b border-slate-100 pb-2.5">
                <span>INTERVENÇÃO DIRETA</span>
                <span>AVULSO</span>
              </div>
              <h3 className="text-feature-title font-bold text-slate-900 tracking-tight">
                SUPORTE PONTUAL
              </h3>
              <p className="text-body-editorial text-slate-600 mt-2.5 mb-6 leading-relaxed">
                Ideal para resolver emergências, desbloquear serviços fora do ar ou realizar correções específicas sob demanda.
              </p>

              {/* Price */}
              <div className="my-5 py-4 px-4 rounded bg-slate-50 border border-slate-200/80">
                <span className="text-micro font-mono text-slate-500 uppercase block mb-1">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-sm text-slate-500 font-mono font-medium">{PRICING.suportePontual.prefix}</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {PRICING.suportePontual.formattedStartingPrice}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {PRICING.suportePontual.note}
                </p>
              </div>

              {/* Scope details */}
              <div className="space-y-3 mt-6">
                <span className="text-micro font-mono uppercase tracking-wider text-slate-700 font-bold block">
                  Exemplos de Atendimento:
                </span>
                <ul className="space-y-2.5 text-sm text-slate-700 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Diagnóstico de lentidão, instabilidade ou queda de servidor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Correção de erros em DNS, apontamentos de domínio e HTTPS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Resolução de falhas e renovação de certificados SSL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Desbloqueio e recuperação de serviços travados no ambiente</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Solicitar Suporte Pontual
              </a>
            </div>
          </div>

          {/* 2. Configuração e Migração */}
          <div className="flex flex-col justify-between rounded-lg border-2 border-teal-600/80 bg-white p-7 sm:p-8 shadow-lg relative">
            {/* Highlight badge */}
            <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-teal-600 text-white text-micro uppercase font-bold tracking-wider">
              Setup Estrutural
            </div>

            <div>
              <div className="flex items-center justify-between text-micro font-mono text-teal-800 mb-4 border-b border-slate-100 pb-2.5">
                <span>IMPLANTAÇÃO & AMBIENTE</span>
                <span>PROJETO</span>
              </div>
              <h3 className="text-feature-title font-bold text-slate-900 tracking-tight">
                CONFIGURAÇÃO E MIGRAÇÃO
              </h3>
              <p className="text-body-editorial text-slate-600 mt-2.5 mb-6 leading-relaxed">
                Para quem está colocando um servidor novo no ar, mudando de hospedagem ou precisa reestruturar o ambiente.
              </p>

              {/* Price */}
              <div className="my-5 py-4 px-4 rounded bg-teal-50/50 border border-teal-200">
                <span className="text-micro font-mono text-teal-800 uppercase block mb-1">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-sm text-slate-500 font-mono font-medium">{PRICING.configuracaoMigracao.prefix}</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {PRICING.configuracaoMigracao.formattedStartingPrice}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {PRICING.configuracaoMigracao.note}
                </p>
              </div>

              {/* Scope details */}
              <div className="space-y-3 mt-6">
                <span className="text-micro font-mono uppercase tracking-wider text-slate-700 font-bold block">
                  O que está incluso:
                </span>
                <ul className="space-y-2.5 text-sm text-slate-700 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Preparação e configuração de servidor (Linux ou Windows Server)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Migração planejada de sites, bancos e arquivos com foco em integridade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Configuração de servidor web, proxy reverso e otimização do ambiente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Revisão de segurança, proteção contra acessos indevidos e DNS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Estruturação de rotinas automáticas de backup para repositório externo</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white transition-colors shadow-sm"
              >
                Orçar Configuração / Migração
              </a>
            </div>
          </div>

          {/* 3. Manutenção Essencial */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 sm:p-8 shadow-md hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center justify-between text-micro font-mono text-slate-400 mb-4 border-b border-slate-100 pb-2.5">
                <span>ACOMPANHAMENTO PREVENTIVO</span>
                <span>MENSAL</span>
              </div>
              <h3 className="text-feature-title font-bold text-slate-900 tracking-tight">
                MANUTENÇÃO ESSENCIAL
              </h3>
              <p className="text-body-editorial text-slate-600 mt-2.5 mb-6 leading-relaxed">
                Supervisão contínua e tranquilidade técnica para sites e ambientes que não podem ser abandonados.
              </p>

              {/* Price */}
              <div className="my-5 py-4 px-4 rounded bg-slate-50 border border-slate-200/80">
                <span className="text-micro font-mono text-slate-500 uppercase block mb-1">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-sm text-slate-500 font-mono font-medium">{PRICING.manutencaoEssencial.prefix}</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {PRICING.manutencaoEssencial.formattedStartingPrice}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-mono font-medium">{PRICING.manutencaoEssencial.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {PRICING.manutencaoEssencial.note}
                </p>
              </div>

              {/* Escopo detalhado e limites claros */}
              <div className="space-y-3 mt-6">
                <span className="text-micro font-mono uppercase tracking-wider text-slate-700 font-bold block">
                  Escopo Previsto:
                </span>
                <ul className="space-y-2.5 text-sm text-slate-700 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Monitoramento contínuo de disponibilidade básica (uptime)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Verificação periódica de validade e renovação de certificados SSL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Conferência da execução e integridade dos backups configurados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Orientação técnica preventiva contra incidentes operacionais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Até 30 min/mês de intervenção simples acordada (não cumulativo)</span>
                  </li>
                </ul>

                {/* Importante: Limites transparentes do escopo */}
                <div className="mt-4 p-3.5 rounded bg-slate-100 border border-slate-200 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 block mb-0.5 font-mono">Transparência:</strong>
                  Não inclui suporte ilimitado, atendimento emergencial 24/7, SLA corporativo ou desenvolvimento de novos recursos. Demandas fora do escopo são orçadas separadamente.
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Contratar Manutenção
              </a>
            </div>
          </div>
        </div>

        {/* Commercial Clarification Note */}
        <div className="mt-10 p-4 rounded border border-slate-200 bg-white text-xs sm:text-sm text-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <span className="font-mono font-bold text-teal-700 uppercase shrink-0">
              Nota de Precificação:
            </span>
            <span>
              Todos os valores informados são expressos com &ldquo;a partir de&rdquo; e o valor final exato é confirmado após o alinhamento de escopo e complexidade técnica.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
