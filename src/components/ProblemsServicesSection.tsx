import React from "react";

export function ProblemsServicesSection() {
  const journeys = [
    {
      code: "01 // ESTABILIDADE & DISPONIBILIDADE",
      problemTitle: "“Meu site está fora do ar, muito lento ou caindo com frequência.”",
      problemDesc:
        "Telas de erro (502, 504, conexões esgotadas), lentidão súbita em horários de pico ou serviços que param de responder sem motivo aparente, afastando clientes e gerando prejuízo.",
      diagnosis:
        "Gargalos de memória ou processamento no servidor, configurações inadequadas de conexões simultâneas, consultas lentas no banco de dados ou ausência de políticas eficientes de cache.",
      solution:
        "Investigação completa do servidor e da aplicação, identificação da causa raiz e otimização das configurações do ambiente para melhorar a estabilidade e o tempo de resposta.",
      serviceType: "Suporte Pontual / Manutenção",
      actionText: "Solicitar diagnóstico para site ou servidor",
    },
    {
      code: "02 // MIGRAÇÃO & NOVOS AMBIENTES",
      problemTitle: "“Preciso mudar de hospedagem ou colocar um servidor novo no ar.”",
      problemDesc:
        "Necessidade de transferir sites, bancos de dados e arquivos volumosos entre servidores ou provedores de nuvem, com receio de perder dados ou deixar a operação paralisada.",
      diagnosis:
        "Migrações sem planejamento prévio de espelhamento, transferências incompletas de dados, permissões corrompidas de arquivos ou alteração precipitada de DNS que paralisa e-mails e sistemas.",
      solution:
        "Planejamento estruturado da migração, preparação do novo servidor (Linux ou Windows Server), transferência segura de dados e virada assistida de DNS com foco em reduzir riscos de indisponibilidade.",
      serviceType: "Configuração e Migração",
      actionText: "Planejar migração de servidor",
    },
    {
      code: "03 // PROTEÇÃO DE DADOS & BACKUP",
      problemTitle: "“Tenho backup, mas não sei se conseguiria recuperar meus dados em caso de desastre.”",
      problemDesc:
        "Receio legítimo de perder bancos de dados, arquivos de clientes ou histórico da empresa após uma falha de hardware, exclusão acidental, corrupção ou incidente de segurança.",
      diagnosis:
        "Cópias de segurança armazenadas no mesmo disco do servidor (ponto único de falha crítico), rotinas manuais esquecidas ou backups corrompidos que nunca foram testados para restauração.",
      solution:
        "Revisão da rotina existente, estruturação de cópias automatizadas com compactação e envio seguro para armazenamento externo em nuvem, além de validação dos procedimentos de recuperação.",
      serviceType: "Configuração & Migração / Manutenção",
      actionText: "Estruturar estratégia de backup",
    },
    {
      code: "04 // SEGURANÇA, SSL & DOMÍNIO",
      problemTitle: "“Meu site exibe aviso de conexão não segura ou recebo muitas tentativas de acesso.”",
      problemDesc:
        "Navegadores bloqueando visitantes com alerta de segurança, falhas na renovação de certificados SSL, erros de apontamento de domínio ou servidor exposto a tentativas frequentes de invasão.",
      diagnosis:
        "Falhas na emissão e renovação automática de certificados, conflitos de DNS ou portas administrativas do servidor desnecessariamente abertas na internet sem filtragem ou regras de proteção.",
      solution:
        "Instalação e alinhamento de certificados SSL com renovação automática confiável, diagnóstico e ajuste de zonas de DNS, isolamento de acessos e aplicação de medidas de proteção adequadas ao ambiente.",
      serviceType: "Suporte Pontual / Configuração",
      actionText: "Corrigir SSL, DNS ou segurança",
    },
    {
      code: "05 // SISTEMAS & AUTOMAÇÃO",
      problemTitle: "“Minha empresa depende de planilhas e tarefas manuais que poderiam ser um sistema.”",
      problemDesc:
        "Controles operacionais fragmentados, retrabalho diário em tarefas manuais repetitivas, sistemas existentes sem manutenção ou necessidade de integrar ferramentas que não conversam entre si.",
      diagnosis:
        "Falta de um sistema centralizado para regras de negócio, bancos de dados desorganizados ou dependência de rotinas manuais lentas e sujeitas a erros operacionais.",
      solution:
        "Desenvolvimento de sistemas sob medida, criação de aplicações web, manutenção e evolução de sistemas existentes, integração de APIs e automação de processos para organizar a operação.",
      serviceType: "Desenvolvimento & Suporte Técnico",
      actionText: "Conversar sobre sistema ou automação",
    },
  ];

  return (
    <section id="servicos" className="relative bg-[#ffffff] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-micro font-bold text-teal-700 tracking-wider">
              02 // RESOLUÇÃO DE PROBLEMAS
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="text-micro text-slate-500 uppercase tracking-wider">
              Diagnóstico Estruturado
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
            Problemas reais exigem diagnósticos precisos, não soluções improvisadas.
          </h2>
          <p className="mt-4 text-body-lead text-slate-600 leading-relaxed max-w-[65ch]">
            Em vez de contratar ferramentas isoladas, entenda como as falhas e gargalos mais 
            comuns da sua operação digital são investigados e resolvidos.
          </p>
        </div>

        {/* Narrative Flow Matrix */}
        <div className="space-y-6">
          {journeys.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg p-6 sm:p-8 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-5">
                <span className="text-micro font-bold text-teal-700 tracking-wider">
                  {item.code}
                </span>
                <span className="self-start md:self-auto text-micro uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-semibold">
                  Modalidade: {item.serviceType}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 1. Problema Observado */}
                <div className="lg:col-span-4">
                  <span className="text-micro font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                    PROBLEMA OBSERVADO
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                    {item.problemTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* 2. O que está acontecendo */}
                <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6">
                  <span className="text-micro font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                    O QUE ESTÁ ACONTECENDO
                  </span>
                  <div className="bg-white p-3.5 rounded border border-slate-200/80 shadow-xs">
                    <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                      {item.diagnosis}
                    </p>
                  </div>
                </div>
                {/* 3. Como posso ajudar */}
                <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-between">
                  <div>
                    <span className="text-micro font-bold text-teal-700 block mb-2 uppercase tracking-wider">
                      COMO POSSO AJUDAR
                    </span>
                    <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <a
                      href="#contato"
                      className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                    >
                      <span>{item.actionText}</span>
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
