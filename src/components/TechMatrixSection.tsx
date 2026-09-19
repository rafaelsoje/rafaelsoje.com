import React from "react";

export function TechMatrixSection() {
  const pillars = [
    {
      category: "SERVIDORES & SISTEMAS",
      code: "01 // AMBIENTES & HOSTING",
      items: [
        { name: "Linux", role: "Distribuições Debian e Ubuntu Server em ambientes dedicados e VPS." },
        { name: "Windows Server", role: "Configuração de ambiente, serviços IIS e suporte a sistemas corporativos." },
        { name: "Servidores Web", role: "Nginx e Apache para proxy reverso, balanceamento, HTTPS e desempenho." },
      ],
    },
    {
      category: "DESENVOLVIMENTO & APIS",
      code: "02 // SISTEMAS & FLUXOS",
      items: [
        { name: "PHP & Frameworks", role: "Manutenção e evolução em Laravel, CodeIgniter e sistemas legados." },
        { name: "TypeScript & Node", role: "Desenvolvimento de aplicações web, interfaces Next.js e APIs NestJS." },
        { name: "APIs & Integrações", role: "Comunicação entre serviços externos, webhooks e interligação de sistemas." },
      ],
    },
    {
      category: "DADOS & ARMAZENAMENTO",
      code: "03 // PERSISTÊNCIA & CACHE",
      items: [
        { name: "PostgreSQL", role: "Modelagem relacional consistente, índices eficientes e integridade de dados." },
        { name: "MySQL / MariaDB", role: "Ajuste de pools de conexão, otimização de consultas e rotinas de dump." },
        { name: "Redis", role: "Camada de cache em memória para aceleração de sessões e filas de execução." },
      ],
    },
    {
      category: "SEGURANÇA & ROTINAS",
      code: "04 // PROTEÇÃO & OPS",
      items: [
        { name: "Cloudflare & DNS", role: "Gestão de zonas de DNS, proteção contra tráfego abusivo e SSL de borda." },
        { name: "Segurança de Servidor", role: "Firewall, controle de acesso e regras contra tentativas de invasão." },
        { name: "Automação de Rotinas", role: "Scripts para backups automáticos externos, sincronização e manutenção." },
      ],
    },
  ];

  return (
    <section id="tecnologias" className="relative bg-[#f8fafc] text-slate-900 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-micro font-bold text-teal-700 tracking-wider">
              06 // AMBIENTES & REPERTÓRIO
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="text-micro text-slate-500 uppercase tracking-wider">
              Tecnologia como Meio
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-900 leading-tight">
            Tecnologias e ambientes com os quais trabalho.
          </h2>
          <p className="mt-4 text-body-lead text-slate-600 leading-relaxed max-w-[65ch]">
            As ferramentas são decisões técnicas adotadas conforme a necessidade de cada projeto. 
            Esta seção existe como referência técnica para quem deseja conhecer os principais componentes utilizados.
          </p>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className="rounded-lg border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
                  <span className="text-micro font-bold text-teal-700 tracking-wider">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="text-micro font-mono font-bold uppercase tracking-wider text-slate-500 mb-5">
                  {pillar.category}
                </h3>

                <div className="space-y-4">
                  {pillar.items.map((item, iIdx) => (
                    <div key={iIdx} className="group">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-teal-600 transition-colors" />
                        <span className="font-sans font-bold text-base text-slate-900">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 font-mono mt-1 pl-3.5 leading-relaxed">
                        {item.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-micro font-mono text-slate-400">
                PRODUÇÃO HOMOLOGADA
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
