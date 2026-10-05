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

    // Callbacks mantidos em refs para evitar desmontagem/recriação do widget em re-renderizações do pai
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const onExpireRef = useRef(onExpire);

    useEffect(() => {
      onSuccessRef.current = onSuccess;
      onErrorRef.current = onError;
      onExpireRef.current = onExpire;
    });

    const reset = useCallback(() => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // Widget já desmontado ou estado resetado
        }
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

        // Se já tiver um widget instanciado neste container, remove o anterior antes de recriar
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
            retry: "auto",
            "refresh-expired": "auto",
            callback: (token: string) => {
              if (isMounted) onSuccessRef.current(token);
            },
            "error-callback": (err?: string) => {
              if (isMounted) onErrorRef.current?.(err);
            },
            "expired-callback": () => {
              if (isMounted) onExpireRef.current?.();
            },
          });
          widgetIdRef.current = id;
        } catch {
          // Erro de renderização silencioso para resiliência do app
        }
      };

      const SCRIPT_ID = "cloudflare-turnstile-api";

      if (window.turnstile) {
        renderWidget();
      } else {
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement("script");
          script.id = SCRIPT_ID;
          script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const handleLoad = () => {
          if (!isMounted) return;
          if (window.turnstile) {
            renderWidget();
          } else {
            // Breve intervalo caso a injeção do objeto global tenha ligeiro delay
            const checkTimer = setInterval(() => {
              if (!isMounted) {
                clearInterval(checkTimer);
                return;
              }
              if (window.turnstile) {
                clearInterval(checkTimer);
                renderWidget();
              }
            }, 50);
            setTimeout(() => clearInterval(checkTimer), 4000);
          }
        };

        script.addEventListener("load", handleLoad, { once: true });
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
    }, [siteKey]);

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
