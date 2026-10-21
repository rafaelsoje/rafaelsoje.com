import React from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    code: "PROJ-01 // SAAS & DEVSECOPS",
    status: "No ar em produção (Live)",
    statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    title: "SIGES Eventos — Plataforma SaaS Multi-Tenant & Infraestrutura DevSecOps",
    subtitle: "SaaS corporativo em produção: esteira operacional, gestão de eventos, logística e perímetro blindado",
    problem:
      "Descentralização operacional no setor de eventos: propostas dispersas, risco de conflito de datas de espaços/geradores e ausência de uma infraestrutura com isolamento multi-tenant seguro.",
    solution:
      "Desenvolvimento de aplicação web corporativa com Laravel, Livewire e PostgreSQL, operando sob uma arquitetura de Defesa em Profundidade com Cloudflare WAF, Nginx com ModSecurity (OWASP CRS), gestão Zero-Trust via WireGuard VPN e banimento automatizado em borda.",
    organizes: [
      "Isolamento multi-tenant seguro com segregação física de acessos administrativos",
      "Controle de agenda, propostas comerciais, contratos e esteira operacional sem conflito de datas",
      "Perímetro Zero-Trust: portas de gestão remota bloqueadas na internet pública via VPN",
      "WAF na aplicação com regras OWASP CRS e mitigação reativa orquestrada com a Cloudflare",
      "Rotinas de backup automatizado GFS, monitoramento proativo e workers assíncronos no Supervisor",
    ],
    stack: [
      "Laravel",
      "Livewire",
      "PostgreSQL",
      "ModSecurity",
      "WireGuard",
      "Cloudflare WAF",
      "Redis",
      "Nginx",
      "Linux Server",
    ],
    image: "/images/projeto-gestao-eventos-demo.svg",
    alt: "Interface de gestão comercial e operacional para controle de propostas e contratos",
    url: "sigeseventos.com.br",
    liveUrl: "https://sigeseventos.com.br",
    caseStudyUrl: "/blog/estudo-de-caso-siges-eventos-devsecops-laravel-wireguard-modsecurity",
    caption: "Plataforma corporativa em produção operando sob perímetro Zero-Trust e WAF de camada de aplicação.",
  },
  {
    code: "PROJ-02 // PAINEL OPERACIONAL & CUSTOS",
    status: "Em operação contínua",
    statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    title: "Dashboard Operacional de Custos e Insumos Críticos",
    subtitle: "Monitoramento de consumo, geradores e rateio de despesas por evento",
    problem:
      "Dificuldade de auditar custos operacionais reais (geradores, diesel, água, energia elétrica e taxa de cozinha), com rateio impreciso e risco de desperdício.",
    solution:
      "Dashboard analítico desenvolvido para registrar e cruzar consumos reais com o histórico de eventos, emitindo alertas de manutenção preventiva para geradores.",
    organizes: [
      "Lançamento e auditoria de insumos operacionais em tempo real",
      "Gráficos comparativos de custos por evento e rateio automatizado",
      "Controle de horímetro e projeção de revisão preventiva de geradores",
      "Exportação de relatórios gerenciais para tomada de decisão financeira",
    ],
    stack: ["PHP", "JavaScript", "MySQL", "Nginx", "Linux Server"],
    image: "/images/projeto-dashboard-custos-demo.svg",
    alt: "Interface analítica sob medida para monitoramento e controle operacional em tempo real",
    url: "operacao.painel.local",
    caption: "Interface analítica sob medida para monitoramento e controle operacional em tempo real.",
  },
  {
    code: "PROJ-03 // PORTAL COMERCIAL & SAAS",
    status: "Em produção",
    statusColor: "text-teal-400 bg-teal-950/60 border-teal-800",
    title: "Portal Institucional & Comercial da Plataforma",
    subtitle: "Apresentação da solução, diferenciais técnicos e captação de clientes",
    problem:
      "Necessidade de um canal comercial institucional moderno para apresentar a robustez da plataforma e converter visitantes em pedidos de demonstração.",
    solution:
      "Desenvolvimento de portal de alta performance com Next.js e Tailwind CSS, otimizado para SEO técnico, com DNS seguro na Cloudflare e carregamento veloz.",
    organizes: [
      "Apresentação da proposta de valor, arquitetura e módulos da plataforma",
      "Transparência de planos, diferenciais de segurança e infraestrutura",
      "Captação direta de leads comerciais para agendamento de demonstração",
      "Otimização de tempo de resposta, responsividade completa e TLS rigoroso",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Cloudflare", "Linux VPS"],
    image: "/images/projeto-portal-comercial-demo.svg",
    alt: "Portal institucional de alta performance com arquitetura moderna e DNS seguro",
    url: "sigeseventos.com.br",
    caption: "Portal institucional de alta performance com arquitetura moderna e DNS seguro.",
  },
];

export function ProjectsSection() {
  return (
    <section id="projetos" className="relative bg-[#0f172a] text-white py-16 md:py-24 border-b border-slate-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3 text-micro uppercase tracking-wider">
            <span className="font-bold text-teal-400">03 // PROJETOS & CASES</span>
            <div className="h-px w-12 bg-slate-700" />
            <span className="text-slate-400">Soluções reais em funcionamento</span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-100 leading-tight">
            Sistemas e interfaces criados para atender necessidades concretas.
          </h2>
          <p className="mt-4 text-body-lead text-slate-300 leading-relaxed max-w-[65ch]">
            Exemplos reais de aplicações web, painéis de gestão e portais desenvolvidos por Rafael Soje 
            para resolver gargalos operacionais e comerciais.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <article key={project.code} className="border border-slate-700/80 rounded-lg bg-slate-900/90 overflow-hidden shadow-2xl">
              {/* Header do Card */}
              <div className="bg-slate-950/80 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-micro font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 font-bold tracking-wider">{project.code}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">CASE {index + 1} DE {projects.length}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded border font-semibold ${project.statusColor}`}>{project.status}</span>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Coluna de Conteúdo */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">{project.title}</h3>
                    <p className="text-sm sm:text-base font-medium text-teal-300 mt-1.5 mb-2">{project.subtitle}</p>
                    <div className="space-y-3 my-4">
                      <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800">
                        <span className="text-micro font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
                          01 // PROBLEMA ENFRENTADO
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800">
                        <span className="text-micro font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                          02 // SOLUÇÃO ARQUITETADA
                        </span>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                    <span className="text-micro font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">03 // RESULTADO PRÁTICO & O QUE ORGANIZA:</span>
                    <ul className="space-y-2 text-sm text-slate-300 font-mono">
                      {project.organizes.map((item) => (
                        <li key={item} className="flex items-start">
                          <span className="text-teal-400 mr-2 font-bold">›</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <span className="text-micro font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">Tecnologias utilizadas:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-micro font-mono text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {"caseStudyUrl" in project && project.caseStudyUrl && (
                    <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-3">
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-semibold transition-all hover:border-teal-500/50"
                      >
                        <span>Ler Estudo de Caso Completo</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                      {"liveUrl" in project && project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-all"
                        >
                          <span>Acessar Plataforma</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Coluna com Moldura de Navegador & Imagem Real */}
                <figure className="lg:col-span-6 rounded-lg border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl flex flex-col">
                  {/* Barra do Navegador */}
                  <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                    </div>
                    <span className="text-micro font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      {project.url}
                    </span>
                    <span className="text-micro font-mono text-teal-400 font-semibold uppercase">
                      HTTPS // TLS
                    </span>
                  </div>

                  {/* Visualizador da Interface com Scroll Vertical */}
                  <div className="relative max-h-[460px] overflow-y-auto bg-slate-950 p-2 sm:p-3">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded border border-slate-800/80 shadow"
                      loading="eager"
                    />
                  </div>

                  <figcaption className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 text-center text-xs font-mono text-slate-400">
                    {project.caption}
                  </figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
