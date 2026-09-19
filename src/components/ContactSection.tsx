"use client";

import React, { useState } from "react";
import { BrandMonogram } from "./BrandMonogram";
import { validateContactForm, ContactFormData, HELP_TOPICS } from "@/lib/validation";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    helpTopic: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the active field
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

    // Client-side strict validation
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.sanitizedData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setServerMessage(
          data.message ||
            "Sua mensagem foi enviada com sucesso. Rafael responderá em breve!"
        );
        // Reset form
        setFormData({
          name: "",
          company: "",
          whatsapp: "",
          email: "",
          helpTopic: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setServerMessage(
          data.error ||
            "Não foi possível processar sua solicitação no momento. Tente via WhatsApp."
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "Erro de conexão com o servidor. Por favor, tente novamente ou utilize o WhatsApp direto."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative bg-[#090d16] text-white py-16 md:py-24 border-b border-slate-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-micro font-bold text-teal-400 tracking-wider">
              06 // CANAL DE ATENDIMENTO
            </span>
            <div className="h-[1px] w-12 bg-slate-700" />
            <span className="text-micro text-slate-400 uppercase tracking-wider">
              Triagem Técnica Direta
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-100 leading-tight">
            Descreva seu problema ou projeto para receber uma orientação direta.
          </h2>
          <p className="mt-4 text-body-lead text-slate-300 leading-relaxed max-w-[65ch]">
            Sem atendentes comerciais intermediários. Toda conversa é tratada diretamente por quem 
            analisará o ambiente, investigará logs ou desenvolverá o sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Confidence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm">
              <span className="text-micro font-bold text-teal-400 uppercase tracking-wider block mb-2">
                Canal Ágil // Mensagem Direta
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                WhatsApp Oficial
              </h3>
              <p className="font-mono text-base sm:text-lg font-bold text-teal-400 mb-3">
                +55 21 99984-0419
              </p>
              <p className="text-body-small text-slate-300 mb-4 leading-relaxed">
                Prefere conversar em tempo real? Envie uma mensagem com o que está acontecendo:
              </p>
              <a
                href="https://wa.me/5521999840419?text=Ol%C3%A1%20Rafael%2C%20gostaria%20de%20conversar%20sobre%20uma%20demanda%20t%C3%A9cnica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
                </svg>
                <span>Iniciar Conversa no WhatsApp</span>
              </a>

              {/* Direct Email Card */}
              <div className="mt-4 p-4 rounded border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm font-mono">
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
            <div className="pt-4 space-y-2.5 text-xs sm:text-sm font-mono text-slate-300">
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
                <span>Atendimento confidencial sob boas práticas de segurança</span>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Formulário de Solicitação & Triagem
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
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

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                      className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
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
                      className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 ${
                        errors.name ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                    >
                      Empresa <span className="text-slate-400 text-xs lowercase">(opcional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Minha Empresa / Projeto"
                      className="w-full px-4 py-3 rounded bg-slate-950/80 border border-slate-700 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                {/* Quick Select: Como posso ajudar? */}
                <div>
                  <label
                    htmlFor="helpTopic"
                    className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Como posso ajudar? <span className="text-teal-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="helpTopic"
                      name="helpTopic"
                      required
                      value={formData.helpTopic}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white focus:outline-none focus:border-teal-400 appearance-none cursor-pointer ${
                        errors.helpTopic ? "border-rose-500" : "border-slate-700"
                      }`}
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-400">
                        Selecione o tipo de demanda técnica...
                      </option>
                      {HELP_TOPICS.map((topic) => (
                        <option key={topic} value={topic} className="bg-slate-900 text-white">
                          {topic}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 font-mono text-xs">
                      ▼
                    </div>
                  </div>
                  {errors.helpTopic && (
                    <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">
                      {errors.helpTopic}
                    </p>
                  )}
                </div>

                {/* Contact Notice (WhatsApp OU E-mail) */}
                <div className="pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono text-slate-200 font-semibold uppercase tracking-wider">
                      Canais de Retorno <span className="text-teal-400">*</span>
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-400">
                      (Informe WhatsApp <strong>OU</strong> E-mail)
                    </span>
                  </div>
                  {errors.contact && (
                    <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-semibold">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* WhatsApp & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-xs sm:text-sm font-mono text-slate-300 mb-1"
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
                      className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 ${
                        errors.whatsapp ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-mono text-slate-300 mb-1"
                    >
                      E-mail de contato
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="voce@empresa.com.br"
                      className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 ${
                        errors.email ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Message / Symptoms */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
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
                    placeholder="Ex: Meu site está apresentando lentidão em horários de pico / Preciso migrar para um novo servidor / Meu certificado SSL está com erro / Gostaria de desenvolver um sistema para organizar um processo interno..."
                    className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 ${
                      errors.message ? "border-rose-500" : "border-slate-700"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Privacy agreement & Submit */}
                <div className="pt-2">
                  <p className="text-xs sm:text-[13px] font-mono text-slate-400 mb-4 leading-relaxed">
                    Seus dados serão utilizados unicamente para responder a este contato e realizar a triagem técnica. 
                    Sem spam. Leia a nossa <a href="/privacidade" className="text-teal-400 hover:underline">Política de Privacidade</a>.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded text-xs sm:text-sm lg:text-base font-mono font-bold uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                        <span>Enviando Solicitação...</span>
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
