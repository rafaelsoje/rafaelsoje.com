import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Sobre Rafael Soje | Engenharia de Infraestrutura & Segurança Linux",
  description:
    "Trajetória profissional, formação acadêmica em Ciência da Computação, pós-graduação em Cyber Security, certificação LPIC-1, contribuições open source globais e princípios de engenharia de Rafael Soje.",
  alternates: {
    canonical: "https://rafaelsoje.com/sobre",
  },
  openGraph: {
    title: "Sobre Rafael Soje | Engenharia de Infraestrutura & Segurança Linux",
    description:
      "Trajetória profissional, formação acadêmica em Ciência da Computação, pós-graduação em Cyber Security, certificação LPIC-1, contribuições open source globais e princípios de engenharia de Rafael Soje.",
    url: "https://rafaelsoje.com/sobre",
    siteName: "Rafael Soje",
    type: "profile",
    images: ["/brand/og-image.jpg"],
  },
};

export default function SobrePage() {
  const featuredPosts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-wider text-slate-400">
              <span className="font-bold text-teal-400">01 // BIOGRAFIA &amp; TRAJETÓRIA</span>
              <div className="h-px w-12 bg-slate-800" />
              <span>Engenharia de Infraestrutura</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Texto Principal */}
              <div className="lg:col-span-8 space-y-5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Engenharia de sistemas com foco em resiliência, blindagem e responsabilidade direta.
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Sou <strong className="text-white">Rafael Soje</strong>, Engenheiro de Infraestrutura e Especialista em Segurança Linux. Atuo na concepção, hardening, sustentação e resposta a incidentes em ambientes computacionais corporativos com tolerância zero para indisponibilidade e vazamento de dados.
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Minha abordagem une a solidez teórica da Ciência da Computação, especialização formal em Cyber Security e a disciplina operacional de quem atua na linha de frente de servidores de produção há mais de dez anos.
                </p>

                {/* Selos / Badges de Credencial */}
                <div className="pt-4 flex flex-wrap gap-2.5 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold">
                    Certificação LPIC-1 (ID: 61n256nnuq)
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                    Pós-Graduação em Cyber Security
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                    Bacharel em Ciência da Computação
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                    +10 Anos de Prática Operacional
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold">
                    Contribuidor Open Source (tldr, CrowdSec, SigmaHQ)
                  </div>
                </div>
              </div>

              {/* Card da Foto Profissional */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-full max-w-[320px] rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="text-teal-400 font-semibold">ATENDIMENTO ATIVO</span>
                    <span>ESPECIALISTA</span>
                  </div>

                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                    <Image
                      src="/images/rafael-soje.jpg"
                      alt="Rafael Soje — Engenheiro de Infraestrutura e Especialista em Segurança Linux"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  <div className="pt-4 text-center">
                    <span className="block font-bold text-white text-base">Rafael Soje</span>
                    <span className="block text-xs font-mono text-teal-400 mt-0.5">
                      Infraestrutura, Cloud &amp; Segurança
                    </span>
                    <span className="block text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-800">
                      Ciência da Computação • LPIC-1 • Open Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Linha do Tempo da Trajetória Profissional */}
        <section className="py-12 sm:py-16 md:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-2">
                EVOLUÇÃO E MARCOS TÉCNICOS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Trajetória Profissional e Formação Contínua
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Uma construção de carreira sólida, iniciada na administração direta de servidores web e consolidada com graduação, pós-graduação e certificação internacional de engenharia.
              </p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800 md:before:left-5">
              {/* Marco 1: 2013-2017 */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 w-full space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2013 — 2017</span>
                    <span className="text-slate-400">Administrador de Sistemas &amp; Web</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Fundações de Infraestrutura de Servidores e Redes Web
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Início da atuação profissional gerenciando servidores de hospedagem corporativa, configuração de pilhas LAMP/LEMP (Linux, Apache, Nginx, MySQL, PHP/Python), zonas de DNS, instalação de certificados SSL e resolução de indisponibilidades em produção.
                  </p>
                </div>
              </div>

              {/* Marco 2: 2017-2021 */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 w-full space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2017 — 2021</span>
                    <span className="text-slate-400">Anhanguera Educacional</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Bacharelado em Ciência da Computação
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Formação formal estruturada em arquitetura de computadores, teoria de sistemas operacionais, redes de dados, análise de algoritmos, bancos de dados relacionais e modelagem de sistemas de software complexos.
                  </p>
                </div>
              </div>

              {/* Marco 3: 2021-2022 */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 w-full space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2021 — 2022</span>
                    <span className="text-slate-400">Unidorp</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Pós-Graduação em Cyber Security &amp; Informação
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Especialização voltada para segurança defensiva, modelos de controle de acesso, criptografia aplicada, análise de vulnerabilidades, auditoria perimetral e governança de dados corporativos.
                  </p>
                </div>
              </div>

              {/* Marco 4: 2024 */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 w-full space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2024 — 2029</span>
                    <span className="text-slate-400">Linux Professional Institute (LPI)</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Certificação Internacional LPIC-1 (System Administrator)
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Certificação rigorosa que valida a proficiência prática em tarefas reais de administração Linux no terminal, manipulação de arquivos de configuração, permissões de sistema, gerenciamento de processos, armazenamento e conectividade de rede.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-400">
                      Código de verificação oficial: <strong className="text-teal-400 font-mono">61n256nnuq</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Marco 5: 2018 até o Presente */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 w-full space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2018 — PRESENTE</span>
                    <span className="text-slate-400">Consultoria Especializada Independente</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Engenharia de Infraestrutura Crítica e Segurança Linux
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Atendimento direto a empresas, fintechs e plataformas corporativas na concepção de defesas perimetrais em camadas, implantação de WAF e mitigações com Fail2ban, redes seguras com WireGuard VPN, backups multi-cloud criptografados com Rclone/GPG e automação com Docker e Ansible.
                  </p>
                </div>
              </div>

              {/* Marco 6: 2024 até o Presente */}
              <div className="relative flex items-start gap-4 md:gap-6 pl-10 md:pl-14">
                <div className="absolute left-1.5 md:left-3 top-1 w-4 h-4 rounded-full border-2 border-teal-400 bg-teal-400" />
                <div className="p-6 rounded-xl border border-teal-500/40 bg-slate-900/60 w-full space-y-2 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-teal-400">2024 — PRESENTE</span>
                    <span className="text-teal-300">P&amp;D &amp; Comunidade Global</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Colaboração Contínua no Ecossistema Open Source e Segurança
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Atuação ativa no aprimoramento de documentação canônica (tldr-pages com contribuições upstream aceitas em Lynis e Fail2ban), desenvolvimento de regras de detecção para SIEM no SigmaHQ, parsers de proteção defensiva no CrowdSec Hub e templates de análise de superfície no Nuclei.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contribuições para o Ecossistema Open Source */}
        <section className="py-12 sm:py-16 md:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="max-w-3xl">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-2">
                  SEGURANÇA GLOBAL &amp; CÓDIGO ABERTO
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Contribuições para o Ecossistema Open Source
                </h2>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Engenharia e segurança da informação são fortalecidas pela colaboração pública. Atuo ativamente no desenvolvimento, documentação canônica e validação de regras de detecção em ferramentas adotadas por milhares de engenheiros em escala global.
                </p>
              </div>

              <a
                href="https://github.com/rafaelsoje"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-mono text-teal-400 hover:text-teal-300 font-semibold gap-1.5 shrink-0 transition-colors"
              >
                Ver perfil e histórico no GitHub &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Segurança Defensiva & Resposta a Incidentes */}
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-400 font-bold uppercase">Defensiva &amp; SIEM</span>
                  <span className="text-slate-400">Hardening</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Auditoria, Mitigação &amp; Telemetria
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Contribuições no <strong className="text-white">tldr-pages</strong> (páginas oficiais de Lynis e Fail2ban com melhorias aceitas no upstream em inglês e português), desenvolvimento de parsers Grok no <strong className="text-white">CrowdSec Hub</strong> (mitigação de força bruta em PgBouncer/PostgreSQL) e regras de correlação SIEM no <strong className="text-white">SigmaHQ</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">tldr-pages</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">CrowdSec</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">SigmaHQ</span>
                </div>
              </div>

              {/* Card 2: Segurança Ofensiva & Análise de Vulnerabilidades */}
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-400 font-bold uppercase">Ofensiva &amp; Recon</span>
                  <span className="text-slate-400">Superfície</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Detecção de Superfície de Ataque
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Desenvolvimento de templates de auditoria no ecossistema <strong className="text-white">ProjectDiscovery (Nuclei-Templates)</strong> para mapeamento e detecção automatizada de painéis de gerenciamento e serviços corporativos expostos em infraestruturas web.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Nuclei</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">ProjectDiscovery</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">AppSec</span>
                </div>
              </div>

              {/* Card 3: Infraestrutura Comunitária & Dados Abertos */}
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-400 font-bold uppercase">Dados Abertos</span>
                  <span className="text-slate-400">Infraestrutura</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Transparência Pública e APIs Nacionais
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Colaboração em projetos abertos de alto impacto nacional, incluindo o ecossistema <strong className="text-white">BrasilAPI</strong> (APIs abertas de serviços públicos) e a iniciativa <strong className="text-white">Querido Diário</strong> (Open Knowledge Brasil) para transparência e processamento de diários oficiais.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">BrasilAPI</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Open Knowledge</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">GovTech</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Princípios de Engenharia e Governança */}
        <section className="py-12 sm:py-16 md:py-20 border-b border-slate-800/80 bg-slate-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-2">
                GOVERNANÇA &amp; ÉTICA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Princípios Inegociáveis de Trabalho
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Como trato os ambientes de produção, os dados sensíveis e os acessos que meus clientes confiam às minhas mãos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <span className="text-xs font-mono text-teal-400 block font-semibold">01 // RESPONSABILIDADE DIRETA</span>
                <h3 className="text-base font-bold text-white">Sem Intermediários</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  O cliente fala e planeja diretamente com quem executa. Nenhuma camada de gerentes de conta que não entendem de kernel ou chamados repassados para estagiários.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <span className="text-xs font-mono text-teal-400 block font-semibold">02 // MENOR PRIVILÉGIO</span>
                <h3 className="text-base font-bold text-white">Security by Design</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Todo servidor é configurado sob as diretrizes do CIS Benchmark. Root desativado, senhas comuns banidas e portas desnecessárias fechadas por padrão.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <span className="text-xs font-mono text-teal-400 block font-semibold">03 // SIGILO E CONTRATO</span>
                <h3 className="text-base font-bold text-white">Acordo de Confidencialidade (NDA)</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Atuação formalizada com emissão de Nota Fiscal (PJ e PF). Acessos remotos utilizam chaves criptográficas SSH exclusivas com rotação e revogabilidade.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <span className="text-xs font-mono text-teal-400 block font-semibold">04 // TRANSPARÊNCIA</span>
                <h3 className="text-base font-bold text-white">Sem Caixas-Pretas</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Toda intervenção é documentada. O cliente é dono de 100% da sua infraestrutura e recebe os manuais das configurações e rotinas aplicadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Publicações Técnicas & Engenharia de Conhecimento */}
        <section className="py-12 sm:py-16 md:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-2">
                  CONHECIMENTO ABERTO &amp; METODOLOGIA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Publicações Técnicas &amp; Engenharia de Produção
                </h2>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Acredito na engenharia transparente. Documento metodologias reais de hardening, mitigação de ameaças, alta disponibilidade e otimização de kernel em artigos práticos com comandos e arquiteturas verificadas.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center text-xs font-mono text-teal-400 hover:text-teal-300 font-semibold gap-1.5 shrink-0 transition-colors"
              >
                Explorar todos os artigos no Blog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/50 p-6 hover:border-teal-500/40 hover:bg-slate-900/80 transition-all duration-200 group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span className="text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 text-[11px]">
                        {post.category}
                      </span>
                      <span className="text-[11px]">{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors tracking-tight mb-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {post.date}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-mono text-teal-400 group-hover:text-teal-300 font-semibold flex items-center gap-1"
                    >
                      Ler artigo &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-12 sm:py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block">
              VAMOS TRABALHAR JUNTOS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Precisa proteger, otimizar ou reestruturar a infraestrutura da sua empresa?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Realizo diagnósticos completos de servidores em produção, projetos de hardening, contingência de backups e consultorias contínuas.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contato"
                className="px-6 py-3 rounded-lg bg-teal-500 text-slate-950 font-mono text-xs font-bold hover:bg-teal-400 transition-colors shadow-lg"
              >
                Solicitar Avaliação Técnica &rarr;
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 font-mono text-xs font-semibold hover:border-slate-500 hover:text-white transition-colors"
              >
                Ler Artigos Técnicos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

