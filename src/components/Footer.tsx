import React from "react";
import Link from "next/link";
import { BrandMonogram } from "./BrandMonogram";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060910] text-slate-400 py-12 border-t border-slate-900 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                <BrandMonogram size="sm" variant="minimal" className="text-white text-base" />
              </div>
              <span className="font-sans font-bold text-slate-200 text-base">
                Rafael Soje
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Engenharia de Infraestrutura Linux, Cloudflare, segurança, SSL, migrações 
              e desenvolvimento de aplicações web. Presença técnica independente com 
              responsabilidade direta.
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              <span>FUSO: BRASÍLIA / RIO DE JANEIRO (UTC-3)</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider block mb-3">
              Navegação Direta
            </span>
            <ul className="space-y-1.5">
              <li>
                <a href="#servicos" className="hover:text-teal-400 transition-colors">
                  › Problemas & Diagnósticos
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-teal-400 transition-colors">
                  › Portfólio Técnico & Blueprints
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-teal-400 transition-colors">
                  › Modalidades & Preços Claros
                </a>
              </li>
              <li>
                <a href="#avaliacao" className="hover:text-teal-400 transition-colors">
                  › Avaliação Inicial Gratuita
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-teal-400 transition-colors">
                  › Formação & Sobre Rafael
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-400 transition-colors">
                  › Dúvidas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Legal */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider block mb-3">
              Contato & Termos
            </span>
            <p className="text-slate-400">
              WhatsApp:{" "}
              <a
                href="https://wa.me/5521999840419"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                +55 21 99984-0419
              </a>
            </p>
            <p className="text-slate-400">
              E-mail:{" "}
              <a href="mailto:contato@rafaelsoje.com" className="text-teal-400 hover:underline">
                contato@rafaelsoje.com
              </a>
            </p>
            <div className="pt-2">
              <Link href="/privacidade" className="text-slate-400 hover:text-slate-200 underline">
                Política de Privacidade
              </Link>
            </div>
            <div className="pt-1 text-[11px] text-slate-400">
              Emissão de Nota Fiscal de Serviços (TI)
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {currentYear} Rafael Soje. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-2">
            <span>MARCA REGISTRÁVEL:</span>
            <BrandMonogram size="sm" variant="minimal" className="text-teal-500 font-bold" />
          </div>
        </div>
      </div>
    </footer>
  );
}

