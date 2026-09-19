import React from "react";
import Link from "next/link";
import { BrandSymbol } from "@/components/BrandLogo";

export const metadata = {
  title: "Política de Privacidade | Rafael Soje",
  description: "Transparência sobre o uso de dados de contato e solicitações técnicas em rafaelsoje.com.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors">
            <BrandSymbol className="w-5 h-5" theme="dark" />
            <span className="font-sans font-bold text-sm">Rafael Soje</span>
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>← Voltar ao Início</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-6 sm:p-10">
          <div className="flex items-center space-x-2 font-mono text-xs text-teal-400 uppercase tracking-wider mb-2">
            <span>AVISO LEGAL & TRANSPARÊNCIA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
            Política de Privacidade
          </h1>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
            <p>
              Esta política foi elaborada de maneira objetiva e transparente para informar como os dados 
              fornecidos através do formulário de contato do site <strong>rafaelsoje.com</strong> são tratados.
            </p>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                1. Finalidade da Coleta de Dados
              </h2>
              <p>
                Os dados solicitados em nosso formulário (nome, empresa opcional, WhatsApp, e-mail e mensagem) 
                têm a única e exclusiva finalidade de viabilizar a comunicação direta entre você e Rafael Soje, 
                permitindo responder às suas dúvidas, realizar a triagem técnica preliminar e enviar orçamentos solicitados.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                2. Não Compartilhamento com Terceiros
              </h2>
              <p>
                Seus dados não são vendidos, alugados, cedidos ou compartilhados com terceiros, agências de marketing 
                ou serviços de publicidade. O contato é estritamente confidencial e profissional.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                3. Armazenamento e Segurança
              </h2>
              <p>
                As mensagens enviadas pelo formulário são processadas por meio de canal criptografado (HTTPS/TLS) 
                e encaminhadas com segurança para a caixa de e-mail profissional de Rafael Soje, sob proteção de 
                autenticação forte.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                4. Exclusão de Informações
              </h2>
              <p>
                Caso deseje que os dados de seu contato sejam excluídos de nossas mensagens após o encerramento do 
                atendimento, basta solicitar pelo e-mail{" "}
                <a href="mailto:contato@rafaelsoje.com" className="text-teal-400 hover:underline">
                  contato@rafaelsoje.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                5. Contato Direto
              </h2>
              <p>
                Para qualquer dúvida sobre a privacidade de suas informações:
              </p>
              <ul className="list-disc pl-5 font-mono text-xs text-slate-300 space-y-1">
                <li>E-mail: contato@rafaelsoje.com</li>
                <li>WhatsApp: +55 21 99984-0419</li>
                <li>WhatsApp: Atendimento direto via link oficial no site</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs font-mono text-slate-400">
        <p>© {new Date().getFullYear()} Rafael Soje — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

