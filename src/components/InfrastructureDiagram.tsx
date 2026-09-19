"use client";

import React, { useState } from "react";

export function InfrastructureDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      id: 1,
      name: "Proteção & DNS",
      tag: "BORDA // REDE",
      tech: "Mitigação & DNS Rápido",
      details: "Proteção contra tráfego abusivo, estabilização de DNS e garantia de conexão criptografada para os visitantes.",
      status: "PROTEGIDO",
      metrics: "DNS Rápido // HTTPS Ativo",
    },
    {
      id: 2,
      name: "Segurança do Servidor",
      tag: "ACESSO // DEFESA",
      tech: "Defesa Ativa & Isolamento",
      details: "Bloqueio a tentativas de invasão, portas desnecessárias fechadas e certificados SSL sem avisos de insegurança.",
      status: "ATIVO",
      metrics: "Portas Restritas // SSL A+",
    },
    {
      id: 3,
      name: "Execução do Sistema",
      tag: "SERVIDORES // COMPUTE",
      tech: "Linux & Windows Server",
      details: "Ajuste de recursos do ambiente para que sites e sistemas respondam com agilidade e estabilidade mesmo sob carga.",
      status: "ESTÁVEL",
      metrics: "Recursos Calibrados",
    },
    {
      id: 4,
      name: "Backup & Recuperação",
      tag: "DADOS // SEGURANÇA",
      tech: "Cópias Externas & Resiliência",
      details: "Rotinas automáticas de backup de bancos e arquivos enviadas para armazenamento externo, prontas para restauração.",
      status: "SINCRONIZADO",
      metrics: "Rotinas Externas",
    },
  ];

  return (
    <div className="relative w-full rounded-lg border border-slate-800 bg-slate-950/90 p-5 md:p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Top bar with technical status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            Topologia de Operação Ativa
          </span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-400">
          <span className="hidden sm:inline">ESTADO: <strong className="text-teal-400">MONITORADO</strong></span>
          <span>ESTABILIDADE: <strong className="text-slate-200">ALTA DISPONIBILIDADE</strong></span>
        </div>
      </div>

      {/* Interactive Topology Stream */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {layers.map((layer, idx) => {
          const isHovered = activeLayer === layer.id;
          return (
            <div
              key={layer.id}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              className={`group relative rounded border transition-all duration-200 p-4 ${
                isHovered
                  ? "border-teal-400/70 bg-slate-900/90 shadow-lg shadow-teal-500/10 -translate-y-0.5"
                  : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700"
              }`}
            >
              {/* Node index */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-micro font-mono text-teal-400/90 tracking-wider">
                  0{idx + 1} {"//"} {layer.tag}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold ${
                    isHovered
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {layer.status}
                </span>
              </div>

              {/* Title & Core Tech */}
              <h4 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight mb-1">
                {layer.name}
              </h4>
              <p className="font-mono text-xs text-teal-300 font-semibold mb-2.5">
                {layer.tech}
              </p>

              {/* Explanatory text */}
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed min-h-[52px]">
                {layer.details}
              </p>

              {/* Micro-technical metric footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-micro text-slate-400">
                <span>{layer.metrics}</span>
              </div>

              {/* Connector line for desktop */}
              {idx < layers.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6H10M10 6L6 2M10 6L6 10"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Operational flow summary footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-teal-400 font-bold">↳</span>
          <span>Fluxo operacional: Proteção de acesso → Servidor seguro → Execução sem travamentos → Dados protegidos</span>
        </div>
        <div className="text-micro text-slate-400">
          Prevenção e redução de riscos operacionais
        </div>
      </div>
    </div>
  );
}
