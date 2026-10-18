"use client";

import React from "react";
import Link from "next/link";
import { BrandSymbol } from "./BrandLogo";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060910] text-slate-400 py-12 border-t border-slate-900 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 text-white">
                <BrandSymbol className="w-full h-full" theme="dark" />
              </div>
              <span className="font-sans font-bold text-slate-200 text-base">
                Rafael Soje
              </span>
            </div>
            <p className="text-slate-400 text-[13px] sm:text-[13.5px] leading-relaxed max-w-sm">
              Soluções profissionais para servidores, segurança, migração de dados, backup 
              e desenvolvimento de sistemas sob medida. Atendimento técnico direto e independente 
              com responsabilidade profissional.
            </p>
            <div className="text-[12px] sm:text-[12.5px] text-slate-400 pt-1">
              <span>FUSO: BRASÍLIA / RIO DE JANEIRO (UTC-3)</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[12px] sm:text-[13px] text-slate-300 font-bold uppercase tracking-wider block mb-3.5">
              Navegação Direta
            </span>
            <ul className="space-y-2 text-[13px] sm:text-[13.5px]">
              <li>
                <Link href="/#servicos" className="hover:text-teal-400 transition-colors">
                  › Problemas & Soluções
                </Link>
              </li>
              <li>
                <Link href="/#projetos" className="hover:text-teal-400 transition-colors">
                  › Projetos & Cases
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-400 text-teal-400/90 font-semibold transition-colors">
                  › Artigos Técnicos & Blog
                </Link>
              </li>
              <li>
                <Link href="/#precos" className="hover:text-teal-400 transition-colors">
                  › Modalidades & Preços
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-teal-400 transition-colors">
                  › Avaliação Inicial &amp; Contato
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="hover:text-teal-400 transition-colors">
                  › Identidade &amp; Atuação
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-teal-400 transition-colors">
                  › Dúvidas Frequentes (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Legal */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[12px] sm:text-[13px] text-slate-300 font-bold uppercase tracking-wider block mb-3.5">
              Contato &amp; Termos
            </span>

            <div className="space-y-2.5 text-[13px] sm:text-[13.5px] text-slate-400">
              <p>
                E-mail:{" "}
                <a
                  href="mailto:contato@rafaelsoje.com"
                  onClick={() => trackAnalyticsEvent("email_click", { location: "footer" })}
                  className="text-teal-400 hover:underline"
                >
                  contato@rafaelsoje.com
                </a>
              </p>
              <div>
                <Link href="/privacidade" className="text-slate-400 hover:text-slate-200 underline transition-colors">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 text-center sm:text-left text-[12px] sm:text-[13px] text-slate-400">
          <div>
            © {currentYear} Rafael Soje. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
