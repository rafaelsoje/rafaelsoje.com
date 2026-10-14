"use client";

import React, { useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phone = "5521999840419";
  const defaultText = "Olá Rafael! Vi seu site e preciso de suporte com meu servidor/sistema.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;

  return (
    <aside
      aria-label="Atendimento emergencial via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Tooltip / Badge de Emergência */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/95 border border-emerald-500/40 text-white shadow-xl backdrop-blur-md transition-all duration-300 font-mono text-xs ${
          isHovered
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-90 translate-x-0 pointer-events-none"
        }`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-slate-200">
          Emergência de Servidor?{" "}
          <strong className="text-emerald-400 font-semibold">Fale no WhatsApp</strong>
        </span>
      </div>

      {/* Botão Flutuante de Ação */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAnalyticsEvent("whatsapp_click", { location: "floating_button" })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
        aria-label="Emergência de Servidor? Fale com Rafael Soje no WhatsApp"
      >
        {/* Efeito de pulso sutil no fundo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />

        {/* Ícone oficial do WhatsApp */}
        <svg
          className="w-7 h-7 fill-current relative z-10 transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
        </svg>
      </a>
    </aside>
  );
}
