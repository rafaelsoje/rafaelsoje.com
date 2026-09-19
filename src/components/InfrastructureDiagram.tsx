"use client";

import React, { useState } from "react";

export function InfrastructureDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      id: 1,
      name: "Borda & Proteção",
      tag: "EDGE // WAF",
      tech: "Cloudflare Anycast",
      details: "Mitigação DDoS, WAF, DNS de baixa latência e terminação TLS de borda.",
      status: "PROTEGIDO",
      metrics: "DNS < 15ms // TLS 1.3",
    },
    {
      id: 2,
      name: "Segurança & Ingress",
      tag: "INGRESS // PROXY",
      tech: "Nginx + Fail2ban + UFW",
      details: "Proxy reverso calibrado, isolamento de portas, certificados SSL Full Strict e prevenção de força bruta.",
      status: "ATIVO",
      metrics: "Portas: 443 / 80 // SSL A+",
    },
    {
      id: 3,
      name: "Núcleo da Aplicação",
      tag: "COMPUTE // APP",
      tech: "Linux VPS (PHP / Node / Next.js)",
      details: "Execução otimizada de aplicações, tuning de memória/CPU, pools PHP-FPM e orquestração de rotinas.",
      status: "ESTÁVEL",
      metrics: "Uptime 99.9% // RAM Otimizada",
    },
    {
      id: 4,
      name: "Persistência & Resiliência",
      tag: "STORAGE // BACKUP",
      tech: "PostgreSQL / MySQL / Snapshots",
      details: "Bancos de dados indexados, rotinas de dump automatizadas e backups criptografados em repositório externo.",
      status: "SINCRONIZADO",
      metrics: "Snapshots diários // Offsite",
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
          <span className="hidden sm:inline">STATUS: <strong className="text-teal-400">NORMAL</strong></span>
          <span>SLA: <strong className="text-slate-200">ALTA RESILIÊNCIA</strong></span>
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
                <span className="font-mono text-[10px] text-teal-400/90 tracking-wider">
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
              <h4 className="text-sm font-semibold text-slate-100 tracking-tight mb-1">
                {layer.name}
              </h4>
              <p className="font-mono text-xs text-teal-400 font-medium mb-2.5">
                {layer.tech}
              </p>

              {/* Explanatory text in accessible Portuguese */}
              <p className="text-xs text-slate-300/90 leading-relaxed min-h-[52px]">
                {layer.details}
              </p>

              {/* Micro-technical metric footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-400">
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
          <span>Fluxo contínuo: Requisição do usuário → Proteção → Entrega rápida → Dados seguros</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Arquitetura sem pontos únicos de falha
        </div>
      </div>
    </div>
  );
}
