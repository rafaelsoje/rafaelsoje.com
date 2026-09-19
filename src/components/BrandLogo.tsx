import React from "react";

export interface BrandLogoProps {
  className?: string;
  variant?: "symbol" | "horizontal" | "squircle";
  theme?: "dark" | "light" | "monochrome";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withSubtitle?: boolean;
  subtitle?: string;
}

/**
 * Official SVG Vector Symbol paths from Figma export:
 * Path 1: Teal accent curve (#10D2B4)
 * Path 2: Dark or Light secondary curve (#F6F9FA on dark, #0A1728 on light)
 */
export function BrandSymbol({
  className = "w-6 h-6",
  theme = "dark",
  withSquircle = false,
}: {
  className?: string;
  theme?: "dark" | "light" | "monochrome";
  withSquircle?: boolean;
}) {
  // Official palette tokens matching the SVGs
  const strokePrimary = "#10D2B4"; // Teal
  const strokeSecondary =
    theme === "dark" ? "#F6F9FA" : theme === "light" ? "#0A1728" : "#F6F9FA";
  const squircleBg = theme === "dark" ? "#081220" : "#F6F9FA";

  if (theme === "monochrome") {
    return (
      <svg
        viewBox={withSquircle ? "0 0 260 260" : "68 79 126 97"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {withSquircle && <rect width="260" height="260" rx="32" fill={squircleBg} />}
        <path
          d="M78.8 165.2V118.8C78.8 99.6 88.9333 90 109.2 90H138C152.933 90 160.4 97.4667 160.4 112.4C160.4 127.333 152.933 134.8 138 134.8H110.8"
          stroke="currentColor"
          strokeWidth="20.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112.4 90H165.2C176.933 90 182.8 95.8667 182.8 107.6C182.8 119.333 176.933 125.2 165.2 125.2H118.8C106 125.2 99.6 131.6 99.6 144.4C99.6 158.267 106.533 165.2 120.4 165.2H178"
          stroke="currentColor"
          strokeWidth="20.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={withSquircle ? "0 0 260 260" : "68 79 126 97"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {withSquircle && <rect width="260" height="260" rx="32" fill={squircleBg} />}
      <path
        d="M78.8 165.2V118.8C78.8 99.6 88.9333 90 109.2 90H138C152.933 90 160.4 97.4667 160.4 112.4C160.4 127.333 152.933 134.8 138 134.8H110.8"
        stroke={strokePrimary}
        strokeWidth="20.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M112.4 90H165.2C176.933 90 182.8 95.8667 182.8 107.6C182.8 119.333 176.933 125.2 165.2 125.2H118.8C106 125.2 99.6 131.6 99.6 144.4C99.6 158.267 106.533 165.2 120.4 165.2H178"
        stroke={strokeSecondary}
        strokeWidth="20.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandLogo({
  className = "",
  variant = "horizontal",
  theme = "dark",
  size = "md",
  withSubtitle = false,
  subtitle = "Infraestrutura, Cloud & Dev Web",
}: BrandLogoProps) {
  const iconSizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-16 h-16",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  };

  const isLight = theme === "light";
  const textColor = isLight ? "text-slate-900" : "text-slate-100";
  const subColor = isLight ? "text-slate-600" : "text-slate-400";

  if (variant === "symbol") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <BrandSymbol className={iconSizes[size]} theme={theme} />
      </span>
    );
  }

  if (variant === "squircle") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <BrandSymbol className={iconSizes[size]} theme={theme} withSquircle={true} />
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="flex-shrink-0 flex items-center justify-center">
        <BrandSymbol className={iconSizes[size]} theme={theme} />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-sans font-bold tracking-tight ${textSizes[size]} ${textColor} transition-colors`}
        >
          Rafael Soje
        </span>
        {withSubtitle && (
          <span
            className={`font-mono text-[10px] tracking-wider uppercase ${subColor} mt-0.5`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

