import React from "react";

export function TechMatrixSection() {
  const pillars = [
    {
      category: "INFRAESTRUTURA",
      code: "01 // HOSTING & PROXY",
      items: [
        { name: "Linux", role: "Distribuições Debian e Ubuntu Server em ambientes dedicados e VPS." },
        { name: "Nginx", role: "Configuração de proxy reverso, balanceamento, cache e terminação TLS." },
        { name: "Apache", role: "Gestão de VirtualHosts, módulos de reescrita (.htaccess) e compatibilidade." },
      ],
    },
    {
      category: "DESENVOLVIMENTO",
      code: "02 // STACK WEB & API",
      items: [
        { name: "PHP", role: "Arquitetura e manutenção de código moderno, OOP e otimização de execução." },
        { name: "Laravel", role: "Construção de ecossistemas web robustos, filas de processamento e ORM." },
        { name: "CodeIgniter", role: "Sustentação, atualização e diagnóstico em bases legadas existentes." },
        { name: "Next.js", role: "Interfaces modernas de alto desempenho, SSR e comunicação com APIs." },
        { name: "NestJS", role: "Microsserviços e APIs estruturadas em TypeScript com arquitetura limpa." },
      ],
    },
    {
      category: "DADOS",
      code: "03 // PERSISTÊNCIA & CACHE",
      items: [
        { name: "PostgreSQL", role: "Modelagem relacional consistente, índices eficientes e integridade." },
        { name: "MySQL", role: "Ajuste de pools de conexão, otimização de consultas e rotinas de dump." },
        { name: "Redis", role: "Camada de cache em memória rápida para sessões e filas de execução." },
      ],
    },
    {
      category: "CLOUD, SEGURANÇA & FERRAMENTAS",
      code: "04 // BORDER & OPS",
      items: [
        { name: "Cloudflare", role: "WAF, proteção DDoS, regras de página, CDN global e DNS Anycast." },
        { name: "Git", role: "Versionamento de código estruturado, branch workflow e deploys controlados." },
        { name: "Bash", role: "Scripts de automação para rotinas de backup, monitoramento e manutenção." },
      ],
    },
  ];

  return (
    <section id="tecnologias" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-700">
              06 // REPERTÓRIO TÉCNICO
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="font-mono text-xs text-slate-500 uppercase">
              Ferramental Consolidado
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Tecnologias dominadas na prática, sem listas infinitas e sem excessos.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Uma seleção de ferramentas consolidadas utilizadas no dia a dia para garantir estabilidade operacional, 
            segurança e velocidade de entrega.
          </p>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
                  <span className="font-mono text-[10px] font-bold text-teal-700 tracking-wider">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="font-mono text-xs font-black uppercase tracking-wider text-slate-900 mb-5">
                  {pillar.category}
                </h3>

                <div className="space-y-4">
                  {pillar.items.map((item, iIdx) => (
                    <div key={iIdx} className="group">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-teal-600 transition-colors" />
                        <span className="font-sans font-bold text-sm text-slate-900">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono mt-1 pl-3.5 leading-relaxed">
                        {item.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                PRODUÇÃO VALIDADA
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

