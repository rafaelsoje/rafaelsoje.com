import React from "react";

interface BrandMonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "monumental";
  variant?: "solid" | "outline" | "stamp" | "minimal";
}

export function BrandMonogram({
  className = "",
  size = "md",
  variant = "solid",
}: BrandMonogramProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-2xl",
    xl: "w-24 h-24 text-4xl",
    monumental: "w-40 h-40 md:w-64 md:h-64 text-7xl md:text-9xl",
  };

  if (variant === "minimal") {
    return (
      <span
        className={`inline-flex items-baseline font-mono font-black tracking-tighter ${className}`}
        aria-label="Monograma rs."
      >
        <span className="text-current">rs</span>
        <span className="text-teal-400 font-bold ml-[1px]">.</span>
      </span>
    );
  }

  if (variant === "stamp") {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-none border border-teal-500/30 bg-slate-950/80 p-3 ${className}`}
        aria-label="Selo de Engenharia rs."
      >
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-teal-400" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-teal-400" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-teal-400" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-teal-400" />
        <div className="flex flex-col items-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-teal-400/80 mb-0.5">
            RS // SYS
          </span>
          <span className="font-mono font-black text-xl tracking-tight text-white">
            rs<span className="text-teal-400">.</span>
          </span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">
            INFRA & DEV
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-bold select-none ${sizeClasses[size]} ${className}`}
      aria-label="Logo rs."
    >
      <div className="relative flex items-baseline">
        <span className="tracking-tight text-current">rs</span>
        <span className="text-teal-400 ml-[2px] font-black">.</span>
      </div>
    </div>
  );
}

