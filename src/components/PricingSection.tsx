import React from "react";

export function PricingSection() {
  return (
    <section id="precos" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-700">
              04 // MODALIDADES & PREÇOS
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="font-mono text-xs text-slate-500 uppercase">
              Transparência Comercial
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Serviços profissionais com escopo e valores claros.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Sem mensalidades escondidas ou promessas enganosas de planos SaaS. 
            Você sabe exatamente onde cada intervenção técnica começa e o que está contemplado.
          </p>
        </div>

        {/* 3 Core Commercial Offerings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* 1. Suporte Pontual */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 shadow-md hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
                <span>INTERVENÇÃO DIRETA</span>
                <span>AVULSO</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                SUPORTE PONTUAL
              </h3>
              <p className="text-xs text-slate-600 mt-2 mb-5 leading-relaxed">
                Ideal para resolver emergências, desbloquear sistemas ou realizar correções específicas sob demanda.
              </p>

              {/* Price */}
              <div className="my-4 py-3 px-4 rounded bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-mono text-slate-500 uppercase block">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs text-slate-600 font-mono">a partir de</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    R$ 150
                  </span>
                </div>
              </div>

              {/* Scope details */}
              <div className="space-y-3 mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
                  Exemplos de Atendimento:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Diagnóstico de lentidão ou travamento súbito de servidor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Ajuste de zonas de DNS, propagação e Cloudflare</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Correção e renovação de certificados SSL quebrados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Desbloqueio de serviços travados (Nginx, PHP, MySQL)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Solicitar Suporte Pontual
              </a>
            </div>
          </div>

          {/* 2. Configuração e Migração */}
          <div className="flex flex-col justify-between rounded-lg border-2 border-teal-600/80 bg-white p-7 shadow-lg relative">
            {/* Highlight badge */}
            <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-teal-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
              Setup Estrutural
            </div>

            <div>
              <div className="flex items-center justify-between font-mono text-xs text-teal-800 mb-3 border-b border-slate-100 pb-2">
                <span>IMPLANTAÇÃO & AMBIENTE</span>
                <span>PROJETO</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                CONFIGURAÇÃO E MIGRAÇÃO
              </h3>
              <p className="text-xs text-slate-600 mt-2 mb-5 leading-relaxed">
                Para quem está subindo um novo servidor, mudando de hospedagem ou precisa blindar sua infraestrutura.
              </p>

              {/* Price */}
              <div className="my-4 py-3 px-4 rounded bg-teal-50/50 border border-teal-200">
                <span className="text-xs font-mono text-teal-800 uppercase block">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs text-slate-600 font-mono">a partir de</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    R$ 350
                  </span>
                </div>
              </div>

              {/* Scope details */}
              <div className="space-y-3 mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
                  O que está incluso:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Instalação limpa e hardening em servidor Linux novo (Ubuntu/Debian)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Migração completa de sites, arquivos e bancos sem perda de dados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Configuração de proxy reverso (Nginx) e otimização de execução</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Firewall UFW, proteção Fail2ban e ativação de Cloudflare Full (Strict)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Criação de rotina automatizada de backup em nuvem</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white transition-colors shadow-sm"
              >
                Orçar Configuração / Migração
              </a>
            </div>
          </div>

          {/* 3. Manutenção Essencial */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 shadow-md hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
                <span>ACOMPANHAMENTO PREVENTIVO</span>
                <span>MENSAL</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                MANUTENÇÃO ESSENCIAL
              </h3>
              <p className="text-xs text-slate-600 mt-2 mb-5 leading-relaxed">
                Tranquilidade técnica para pequenos sites e ambientes que não podem ser abandonados sem supervisão.
              </p>

              {/* Price */}
              <div className="my-4 py-3 px-4 rounded bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-mono text-slate-500 uppercase block">
                  Investimento
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs text-slate-600 font-mono">a partir de</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    R$ 149
                  </span>
                  <span className="text-xs text-slate-500 font-mono">/ mês</span>
                </div>
              </div>

              {/* Escopo detalhado e limites claros */}
              <div className="space-y-3 mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
                  Escopo Previsto:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-mono">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Monitoramento básico contínuo de disponibilidade (uptime)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Verificação periódica de validade e renovação de SSL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Conferência da integridade dos backups já configurados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Orientação técnica preventiva contra incidentes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span>Até 30 min/mês de intervenção simples acordada (não cumulativo)</span>
                  </li>
                </ul>

                {/* Importante: Limites transparentes do escopo */}
                <div className="mt-4 p-3 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 block mb-0.5 font-mono">Transparência:</strong>
                  Não inclui suporte ilimitado, atendimento emergencial 24/7, SLA corporativo ou desenvolvimento de novos recursos. Demandas fora do escopo são orçadas separadamente.
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href="#contato"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Contratar Manutenção
              </a>
            </div>
          </div>
        </div>

        {/* Commercial Clarification Note */}
        <div className="mt-10 p-4 rounded border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-teal-700 uppercase">Nota de Precificação:</span>
            <span>Todos os valores informados são expressos com &ldquo;a partir de&rdquo; e o investimento final depende da complexidade do ambiente.</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500 whitespace-nowrap">
            EMISSÃO DE NOTA FISCAL INCLUSA
          </div>
        </div>
      </div>
    </section>
  );
}

