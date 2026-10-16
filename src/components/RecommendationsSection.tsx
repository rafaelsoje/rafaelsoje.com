import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
  details: string;
  initials: string;
  badgeColor: string;
  borderColor: string;
  scopeTag: string;
}

const testimonials: Testimonial[] = [
  {
    scopeTag: "SISTEMAS INTERNOS & OPERAÇÃO",
    quote:
      "Durante sua trajetória conosco, Rafael foi responsável pela criação e desenvolvimento de sistemas internos utilizados pela empresa, atuando diretamente como programador e contribuindo de forma significativa para melhorias operacionais e tecnológicas dentro da organização. Demonstrou comprometimento, responsabilidade, capacidade técnica, organização e postura ética.",
    name: "Guilherme Batista da Silva",
    role: "Direção Operacional",
    organization: "GUI Segurança em Eventos / GUI Vigilância",
    details: "CNPJ 19.170.409/0001-84 • Rio de Janeiro, RJ",
    initials: "GB",
    badgeColor: "bg-blue-950/80 text-blue-400 border-blue-800/80",
    borderColor: "border-blue-900/40 hover:border-blue-700/60",
  },
  {
    scopeTag: "GESTÃO EDITORIAL & BANCO DE DADOS",
    quote:
      "Atuou na concepção, arquitetura e desenvolvimento integral do sistema de gerenciamento interno em PHP 8, CodeIgniter 4 e MySQL, com módulos de projetos e fluxos de revisão. A entrega representou otimização expressiva nos processos e aumento comprovado da eficiência operacional.",
    name: "Carina Munhoz",
    role: "Bibliotecária e Documentarista",
    organization: "Munhoz Editoria",
    details: "Registro Profissional CRB 7-7205 • Niterói, RJ",
    initials: "CM",
    badgeColor: "bg-teal-950/80 text-teal-400 border-teal-800/80",
    borderColor: "border-teal-900/40 hover:border-teal-700/60",
  },
  {
    scopeTag: "AUTOMAÇÃO & PROCESSAMENTO EM PYTHON",
    quote:
      "Desenvolvimento de ferramentas especializadas em Python para automação, validação e tratamento de textos técnicos e literários com expressões regulares e relatórios automatizados. Soluções adotadas de forma contínua e permanente pela equipe.",
    name: "Gestão Executiva",
    role: "Diretoria de Operações Editoriais",
    organization: "GMV Editora",
    details: "Produção Editorial & Tecnologia",
    initials: "GMV",
    badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/80",
    borderColor: "border-emerald-900/40 hover:border-emerald-700/60",
  },
];

export function RecommendationsSection() {
  return (
    <section
      id="recomendacoes"
      className="relative bg-[#090d16] text-slate-100 py-16 md:py-24 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Marker */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3 text-micro font-mono uppercase tracking-wider">
            <span className="font-bold text-teal-400">
              03.1 // VALIDAÇÃO & RECONHECIMENTO
            </span>
            <div className="h-px w-12 bg-slate-700" />
            <span className="text-slate-400">Recomendações Formais</span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-100 leading-tight">
            Confiança atestada por quem contratou e validou a entrega.
          </h2>
          <p className="mt-4 text-body-lead text-slate-300 leading-relaxed max-w-[68ch]">
            Declarações e avaliações extraídas de cartas formais de recomendação profissional 
            emitidas por diretores, gestores e empresas atendidas por Rafael Soje.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((item) => (
            <div
              key={item.organization}
              className={`flex flex-col justify-between rounded-xl bg-slate-900/90 border p-6 sm:p-7 shadow-xl transition-all duration-200 ${item.borderColor}`}
            >
              <div>
                {/* Header do Card com Tag e Selo */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/80">
                  <span className="text-micro font-mono font-bold text-slate-400 tracking-wider">
                    {item.scopeTag}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${item.badgeColor}`}
                    title="Carta formal com assinatura verificada"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    CARTA ASSINADA
                  </span>
                </div>

                {/* Aspas decorativas e Citação */}
                <div className="relative mb-6">
                  <svg
                    className="w-8 h-8 text-slate-700/60 mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm sm:text-[14.5px] text-slate-200 leading-relaxed italic">
                    “{item.quote}”
                  </p>
                </div>
              </div>

              {/* Autor e Empresa com Iniciais estilizadas */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm tracking-wider shrink-0 border ${item.badgeColor}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-100 text-sm truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-teal-400 font-medium truncate">
                    {item.role}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {item.organization}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    {item.details}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Seção com Nota de Transparência */}
        <div className="mt-10 p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-teal-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>
              Documentação probatória: vias originais das cartas e contratos disponíveis para consulta em processos de homologação.
            </span>
          </div>
          <a
            href="#contato"
            className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4 shrink-0"
          >
            Falar diretamente com Rafael →
          </a>
        </div>
      </div>
    </section>
  );
}
