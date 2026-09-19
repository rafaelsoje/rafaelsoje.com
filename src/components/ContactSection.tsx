"use client";

import React, { useState } from "react";
import { BrandMonogram } from "./BrandMonogram";
import { validateContactForm } from "@/lib/validation";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    message: "",
    honeypot: "", // anti-spam field
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name] || errors.contact) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        delete next.contact;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side pre-validation
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setServerMessage(
          data.message ||
            "Sua solicitação foi enviada com sucesso! Rafael responderá em breve com a triagem inicial."
        );
        setFormData({
          name: "",
          company: "",
          whatsapp: "",
          email: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setServerMessage(
          data.error || "Ocorreu um erro no processamento. Você também pode me chamar diretamente no WhatsApp."
        );
        if (data.validationErrors) {
          setErrors(data.validationErrors);
        }
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "Não foi possível conectar ao servidor no momento. Por favor, entre em contato direto pelo WhatsApp +55 21 99984-0419."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative bg-[#090d16] text-white py-16 md:py-28 border-b border-slate-800 overflow-hidden">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400">
            08 // CANAL DIRETO & CONTRATAÇÃO
          </span>
          <div className="h-[1px] w-12 bg-slate-700" />
          <span className="font-mono text-xs text-slate-400 uppercase">
            Clímax Comercial
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Commercial Statement & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Vamos colocar sua infraestrutura em ordem.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
                Você conversa diretamente com Rafael Soje. Sem triagem automatizada inútil, 
                sem atendentes comerciais que não entendem de servidor.
              </p>

              {/* Direct Quick WhatsApp Card */}
              <div className="mt-8 p-6 rounded-lg border border-teal-500/40 bg-teal-950/20 shadow-lg">
                <div className="flex items-center space-x-2 text-xs font-mono text-teal-400 font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>RESPOSTA MAIS RÁPIDA VIA WHATSAPP</span>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Prefere conversar em tempo real? Envie uma mensagem com seu problema ou objetivo:
                </p>
                <a
                  href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20conversar%20sobre%20uma%20demanda%20t%C3%A9cnica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
                  </svg>
                  <span>Iniciar Conversa no WhatsApp</span>
                </a>
                <div className="mt-2 text-center text-[11px] font-mono text-slate-400">
                  +55 21 99984-0419
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="mt-4 p-4 rounded border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">E-mail comercial direto:</span>
                <a
                  href="mailto:contato@rafaelsoje.com"
                  className="text-teal-400 hover:text-teal-300 font-semibold"
                >
                  contato@rafaelsoje.com
                </a>
              </div>
            </div>

            {/* Commercial Trust Notes */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Avaliação Inicial Gratuita (Triagem Preliminar)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Emissão regular de Nota Fiscal de Serviços (TI)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Atendimento 100% confidencial sob boas práticas de segurança</span>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Formulário de Solicitação & Triagem
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Envio seguro criptografado com validação no servidor
                  </p>
                </div>
                <BrandMonogram size="sm" variant="minimal" className="text-teal-400" />
              </div>

              {/* Feedback messages */}
              {submitStatus === "success" && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-sm flex items-start space-x-3"
                >
                  <span className="text-lg">✓</span>
                  <div>
                    <strong className="block font-bold">Mensagem Recebida!</strong>
                    <span>{serverMessage}</span>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  className="mb-6 p-4 rounded border border-rose-500/50 bg-rose-950/40 text-rose-300 text-sm flex items-start space-x-3"
                >
                  <span className="text-lg">✕</span>
                  <div>
                    <strong className="block font-bold">Atenção</strong>
                    <span>{serverMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field - visually hidden from humans */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Deixe este campo em branco</label>
                  <input
                    id="honeypot"
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Seu Nome <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Carlos Silva"
                      className={`w-full px-3.5 py-2.5 rounded bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 ${
                        errors.name ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Empresa <span className="text-slate-500 text-[10px] lowercase">(opcional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Studio / E-commerce"
                      className="w-full px-3.5 py-2.5 rounded bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                {/* Contact Notice (WhatsApp OU E-mail) */}
                <div className="pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                      Canais de Retorno <span className="text-teal-400">*</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      (Informe WhatsApp <strong>OU</strong> E-mail)
                    </span>
                  </div>
                  {errors.contact && (
                    <p className="mt-1 text-xs text-rose-400 font-mono font-semibold">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* WhatsApp & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-xs font-mono text-slate-400 mb-1"
                    >
                      WhatsApp com DDD
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="21 99984-0419"
                      className={`w-full px-3.5 py-2.5 rounded bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 ${
                        errors.whatsapp ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-slate-400 mb-1"
                    >
                      E-mail profissional
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="voce@empresa.com.br"
                      className={`w-full px-3.5 py-2.5 rounded bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 ${
                        errors.email ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 font-mono">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Message / Symptoms */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Descreva o Problema ou Necessidade <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte o que está ocorrendo: site fora do ar, erro de SSL, lentidão, necessidade de migração ou criação de aplicação..."
                    className={`w-full px-3.5 py-2.5 rounded bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 ${
                      errors.message ? "border-rose-500" : "border-slate-700"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Privacy agreement & Submit */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono text-slate-400 mb-4 leading-relaxed">
                    Seus dados serão utilizados unicamente para responder a este contato e realizar a triagem técnica. 
                    Sem spam. Leia a nossa <a href="/privacidade" className="text-teal-400 hover:underline">Política de Privacidade</a>.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                        <span>Enviando Mensagem com Segurança...</span>
                      </span>
                    ) : (
                      <span>Enviar Solicitação para Rafael Soje →</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

