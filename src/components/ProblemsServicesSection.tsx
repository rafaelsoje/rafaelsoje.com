import React from "react";

export function ProblemsServicesSection() {
  const journeys = [
    {
      code: "01 // DISPONIBILIDADE",
      problemTitle: "Site fora do ar, erros 502/504 ou lentidão extrema",
      problemDesc:
        "O site cai em horários de pico, demora segundos para carregar ou apresenta telas de erro inesperadas que afastam clientes.",
      diagnosis:
        "Esgotamento de memória RAM, configuração inadequada de pools no PHP-FPM, gargalo de conexões no Nginx ou falta de política de cache.",
      solution:
        "Estabilização imediata da VPS, ajuste fino de limites de processos, otimização de buffers do servidor web e aplicação de cache inteligente.",
      serviceType: "Suporte Pontual / Manutenção",
    },
    {
      code: "02 // SEGURANÇA & SSL",
      problemTitle: "Avisos de 'Site Não Seguro', falhas de SSL e erros de Cloudflare",
      problemDesc:
        "Certificados expirando sem renovar, navegadores bloqueando o acesso de visitantes ou erros 521/522/525 ao ativar o Cloudflare.",
      diagnosis:
        "Conflito entre o modo de criptografia do Cloudflare (Flexible vs. Full Strict), renovações automáticas do Certbot falhando por regras de porta ou DNS incorreto.",
      solution:
        "Instalação e alinhamento do SSL com renovação automática confiável, parametrização do Cloudflare no modo Strict e segurança no servidor de origem.",
      serviceType: "Suporte Pontual / Configuração",
    },
    {
      code: "03 // PROTEÇÃO DE DADOS",
      problemTitle: "Risco de perda irreversível por ausência de backups",
      problemDesc:
        "A empresa não possui cópias de segurança confiáveis ou guarda os backups no mesmo disco do servidor onde o site está instalado.",
      diagnosis:
        "Ponto único de falha crítico: em caso de ataque, corrupção de sistema de arquivos ou exclusão acidental, não há como recuperar o negócio.",
      solution:
        "Criação de rotina automatizada de dumps de banco de dados e arquivos com compactação, criptografia e envio direto para storage em nuvem externo.",
      serviceType: "Configuração & Migração / Manutenção",
    },
    {
      code: "04 // INFRAESTRUTURA & MIGRAÇÃO",
      problemTitle: "Necessidade de trocar de servidor sem ficar fora do ar",
      problemDesc:
        "Medo legítimo de migrar para uma VPS ou novo provedor e ter e-mails parados, banco de dados desatualizado ou dias de indisponibilidade.",
      diagnosis:
        "Migrações sem planejamento prévio, transferência lenta durante a produção ou corte de DNS antes da validação completa do ambiente espelho.",
      solution:
        "Setup completo do novo servidor Linux (hardening, firewall, Nginx, PHP/Node, DB), sincronização prévia de dados e virada assistida de DNS com zero downtime.",
      serviceType: "Configuração e Migração",
    },
    {
      code: "05 // APLICAÇÕES WEB",
      problemTitle: "Aplicações travando, código desatualizado ou falhas de rotina",
      problemDesc:
        "Sistemas internos, painéis administrativos ou APIs com erros 500, processamentos lentos ou rotinas de cron job que deixaram de rodar.",
      diagnosis:
        "Erros de compatibilidade de versões, logs acumulados sem rotação, falhas em consultas a banco de dados ou ausência de monitoramento de jobs.",
      solution:
        "Análise detalhada de logs do sistema, refatoração de código pontual em PHP (Laravel, CodeIgniter) ou Next.js/NestJS e normalização de rotinas.",
      serviceType: "Desenvolvimento & Suporte Técnico",
    },
  ];

  return (
    <section id="servicos" className="relative bg-[#ffffff] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-700">
              02 // RESOLUÇÃO DE PROBLEMAS
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="font-mono text-xs text-slate-500 uppercase">
              Diagnóstico Estruturado
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Problemas reais exigem diagnósticos precisos, não soluções improvisadas.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Em vez de tratar serviços de infraestrutura como pacotes abstratos, entenda como uma 
            falha operacional é mapeada e solucionada de forma definitiva.
          </p>
        </div>

        {/* Narrative Flow Matrix */}
        <div className="space-y-6">
          {journeys.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg p-5 sm:p-7 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-teal-700 tracking-wider">
                  {item.code}
                </span>
                <span className="self-start md:self-auto font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-semibold">
                  Modalidade: {item.serviceType}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Problema */}
                <div className="lg:col-span-4">
                  <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Problema Observado
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.problemTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Diagnóstico Técnico */}
                <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6">
                  <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Diagnóstico Técnico
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono bg-white p-3 rounded border border-slate-200/80">
                    {item.diagnosis}
                  </p>
                </div>

                {/* Solução & Entrega */}
                <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                      Solução & Engenharia
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <a
                      href="#contato"
                      className="text-xs font-mono font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                    >
                      <span>Solicitar diagnóstico para este caso</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

