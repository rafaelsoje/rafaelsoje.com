"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandSymbol } from "./BrandLogo";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Serviços & Problemas", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Preços", href: "#precos" },
    { label: "Sobre Rafael", href: "#sobre" },
    { label: "Tecnologias", href: "#tecnologias" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-colors">
      {/* Top operational bar */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/40 px-4 py-1.5 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-300">
              DISPONÍVEL PARA SUPORTE E PROJETOS
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-400">
              ATENDIMENTO TÉCNICO DIRETO
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-slate-400">
              RIO DE JANEIRO (UTC-3)
            </span>
            <a
              href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20conversar%20sobre%20uma%20demanda%20t%C3%A9cnica."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAnalyticsEvent("whatsapp_click", { location: "header_topbar" })}
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-semibold"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          aria-label="Rafael Soje — Página inicial"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center p-1.5 text-white group-hover:border-teal-400/80 transition-colors shadow-sm">
            <BrandSymbol className="w-full h-full" theme="dark" />
          </div>
          <span className="font-sans font-bold text-base tracking-tight text-white group-hover:text-teal-300 transition-colors">
            Rafael Soje
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300" aria-label="Navegação Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-teal-400 transition-colors duration-150 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-4 py-2 rounded text-xs font-mono font-semibold tracking-wider uppercase bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            Avaliação Inicial
          </a>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-slate-900 hover:text-teal-400 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors"
            >
              Solicitar Avaliação Inicial
            </a>
            <a
              href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20conversar%20sobre%20uma%20demanda%20t%C3%A9cnica."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackAnalyticsEvent("whatsapp_click", { location: "header_mobile" });
              }}
              className="w-full text-center px-4 py-2 rounded text-xs font-mono border border-slate-700 hover:border-teal-400 text-slate-300 hover:text-white transition-colors"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

