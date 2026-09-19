import React from "react";

export function ProjectsSection() {
  const projects = [
    {
      id: "proj-1",
      code: "SYS-01 // SOFTWARE PRÓPRIO",
      status: "Funcional e em evolução contínua",
      statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
      title: "Sistema de Gestão de Eventos",
      subtitle: "Operação completa de propostas, clientes, agenda e fluxo operacional",
      description:
        "Aplicação desenvolvida para estruturar o fluxo operacional de eventos ponta a ponta: do primeiro contato e envio de propostas comerciais à gestão de clientes, calendário integrado de datas e checklist de execução operacional.",
      stack: ["Next.js", "Laravel", "PostgreSQL", "Nginx", "Linux VPS"],
      architecturePoints: [
        "Separação clara entre camada visual ágil e API de regras de negócio",
        "Armazenamento de anexos e propostas com persistência segura",
        "Rotinas diárias de backup de banco de dados e arquivos",
      ],
      blueprintType: "diagram-events",
    },
    {
      id: "proj-2",
      code: "SYS-02 // EM DESENVOLVIMENTO",
      status: "Em desenvolvimento ativo",
      statusColor: "text-amber-400 bg-amber-950/60 border-amber-800",
      title: "Plataforma de Gestão Operacional",
      subtitle: "Centralização de processos, cadastros integrados e rotinas financeiras",
      description:
        "Projeto de plataforma modular focada na padronização de fluxos internos de empresas de serviços: unificação de cadastros de pessoas e fornecedores, controle de etapas operacionais e acompanhamento financeiro de faturamentos.",
      stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Docker"],
      architecturePoints: [
        "Modelagem de dados relacional robusta com integridade referencial estrita",
        "Arquitetura orientada a serviços para facilitar expansão de novos módulos",
        "Ambiente isolado e conteinerizado para padronização entre desenvolvimento e produção",
      ],
      blueprintType: "diagram-ops",
    },
    {
      id: "proj-3",
      code: "SYS-03 // ENGENHARIA DE AMBIENTE",
      status: "Experiência prática de produção",
      statusColor: "text-teal-400 bg-teal-950/60 border-teal-800",
      title: "Infraestrutura Web Linux de Alta Estabilidade",
      subtitle: "Ambiente blindado para sustentação de servidores web e bancos de dados",
      description:
        "Implementação e sustentação prática de ambientes de produção completos em Linux (Debian e Ubuntu). Integração com proxies reversos Nginx/Apache, tuning de pools de processamento, parametrização do Cloudflare no modo Strict e segurança em camadas.",
      stack: ["Linux", "Nginx / Apache", "PHP", "MySQL / PostgreSQL", "Cloudflare", "Fail2ban", "Bash"],
      architecturePoints: [
        "Hardening de sistema operacional: firewall UFW restrito e proteção ativa com Fail2ban",
        "Criptografia ponta a ponta: Let's Encrypt automatizado via Certbot com Cloudflare Edge SSL",
        "Scripts de automação em Bash para dumps, compactação criptografada e cópias remotas",
      ],
      blueprintType: "diagram-infra",
    },
  ];

  return (
    <section id="projetos" className="relative bg-[#0f172a] text-white py-16 md:py-24 border-b border-slate-800">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400">
              03 // PORTFÓLIO TÉCNICO & CASE STUDIES
            </span>
            <div className="h-[1px] w-12 bg-slate-700" />
            <span className="font-mono text-xs text-slate-400 uppercase">
              Projetos Reais & Arquitetura
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 leading-tight">
            Engenharia de software e infraestrutura aplicadas na prática.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Casos de desenvolvimento de software e sustentação de ambientes de produção. 
            Sem números fabricados ou métricas fictícias: clareza arquitetural sobre a tecnologia empregada.
          </p>
        </div>

        {/* Case Studies Display */}
        <div className="space-y-12">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="border border-slate-700/80 rounded-lg bg-slate-900/90 overflow-hidden shadow-2xl"
            >
              {/* Technical header bar */}
              <div className="bg-slate-950/80 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <span className="text-teal-400 font-bold tracking-wider">
                    {proj.code}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">
                    PRANCHA {idx + 1} DE {projects.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${proj.statusColor}`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              {/* Case content layout: Editorial grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Description & Specs Column */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-sm font-medium text-teal-400/90 mt-1 mb-4">
                      {proj.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    {/* Architectural Highlights */}
                    <div className="space-y-2 mb-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">
                        Destaques Arquiteturais:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                        {proj.architecturePoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start">
                            <span className="text-teal-400 mr-2 font-bold">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                      Stack Tecnológico:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Blueprint Viewport / Screenshot Frame */}
                <div className="lg:col-span-6">
                  <div className="relative rounded border border-slate-700 bg-slate-950 p-4 shadow-inner overflow-hidden">
                    {/* Viewport bar */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-4 text-[10px] font-mono text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      </div>
                      <span className="text-slate-400">BLUEPRINT_VIEWPORT // 16:10</span>
                      <span className="text-teal-500/80">RESERVADO PARA SCREENSHOT REAL</span>
                    </div>

                    {/* Conceptual Architectural Diagram / Wireframe */}
                    <div className="aspect-[16/10] w-full rounded bg-slate-900/60 border border-dashed border-slate-800 p-5 flex flex-col justify-between relative">
                      {/* Technical wireframe schema */}
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span className="text-teal-400">SCHEMA: {proj.title}</span>
                        <span>ENV: PRODUCTION_READY</span>
                      </div>

                      {/* Structural wireframe lines */}
                      <div className="my-auto space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-24 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono flex items-center justify-center text-slate-300">
                            INTERFACE
                          </div>
                          <div className="h-[1px] flex-1 bg-slate-800" />
                          <div className="h-6 w-24 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono flex items-center justify-center text-slate-300">
                            API / LOGIC
                          </div>
                          <div className="h-[1px] flex-1 bg-slate-800" />
                          <div className="h-6 w-24 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono flex items-center justify-center text-slate-300">
                            DATABASE
                          </div>
                        </div>

                        <div className="p-3 rounded bg-slate-950/60 border border-slate-800 text-center">
                          <span className="font-mono text-[11px] text-slate-400 block mb-1">
                            Container preparado para captura de tela da aplicação
                          </span>
                          <span className="font-mono text-[10px] text-teal-400/80">
                            Representação estrutural do projeto funcional
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>ESTRUTURA VERIFICADA</span>
                        <span>BACKUP & PERSISTÊNCIA ATIVOS</span>
                      </div>
                    </div>

                    <div className="mt-3 text-center text-[11px] font-mono text-slate-400">
                      As telas reais dos projetos serão incorporadas conforme novas versões forem homologadas.
                    </div>
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

