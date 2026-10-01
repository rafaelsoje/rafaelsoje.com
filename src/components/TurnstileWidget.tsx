"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          cData?: string;
          callback?: (token: string) => void;
          "error-callback"?: (errorCode?: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
          tabindex?: number;
          "response-field"?: boolean;
          "response-field-name"?: string;
          size?: "normal" | "flexible" | "compact";
          retry?: "auto" | "never";
          "retry-interval"?: number;
          "refresh-expired"?: "auto" | "manual" | "never";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileWidgetRef {
  reset: () => void;
}

interface TurnstileWidgetProps {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onError?: (errorCode?: string) => void;
  onExpire?: () => void;
  className?: string;
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  function TurnstileWidget(
    { siteKey, onSuccess, onError, onExpire, className },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    const reset = useCallback(() => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    useEffect(() => {
      if (!siteKey || typeof window === "undefined") {
        return;
      }

      let isMounted = true;

      const renderWidget = () => {
        if (!containerRef.current || !window.turnstile || !isMounted) return;

        // Se já tiver um widget instanciado neste container, remove o anterior
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Widget já desmontado
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            action: "contact",
            theme: "dark",
            size: "normal",
            callback: (token: string) => {
              if (isMounted) onSuccess(token);
            },
            "error-callback": (err?: string) => {
              if (isMounted) onError?.(err);
            },
            "expired-callback": () => {
              if (isMounted) onExpire?.();
            },
          });
          widgetIdRef.current = id;
        } catch {
          // Erro de renderização silencioso para resiliência do app
        }
      };

      // Carregamento dinâmico do script oficial da Cloudflare caso ainda não exista
      const SCRIPT_ID = "cloudflare-turnstile-api";
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";
        script.async = true;
        script.defer = true;

        window.onloadTurnstileCallback = () => {
          if (isMounted) {
            renderWidget();
          }
        };

        document.head.appendChild(script);
      } else if (window.turnstile) {
        renderWidget();
      } else {
        const prevOnload = window.onloadTurnstileCallback;
        window.onloadTurnstileCallback = () => {
          prevOnload?.();
          if (isMounted) {
            renderWidget();
          }
        };
      }

      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Nada a fazer no unmount
          }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, onSuccess, onError, onExpire]);

    if (!siteKey) {
      return null;
    }

    return (
      <div className={className || "my-3 flex justify-start min-h-[65px]"}>
        <div ref={containerRef} />
      </div>
    );
  }
);
