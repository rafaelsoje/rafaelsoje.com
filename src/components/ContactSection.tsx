"use client";

import React, { useState, useRef } from "react";
import { BrandSymbol } from "./BrandLogo";
import { validateContactForm, ContactFormData, HELP_TOPICS } from "@/lib/validation";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    helpTopic: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formStartedRef = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackAnalyticsEvent("form_start");
    }

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the active field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
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
    trackAnalyticsEvent("form_submit", { helpTopic: formData.helpTopic });

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
            "Solicitação enviada com sucesso. Obrigado pelo contato. Analisarei as informações e retornarei pelo e-mail ou WhatsApp informado."
        );
        trackAnalyticsEvent("form_success", { helpTopic: formData.helpTopic });
        // Reset form
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          helpTopic: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
        formStartedRef.current = false;
      } else {
        setSubmitStatus("error");
        setServerMessage(
          data.error ||
            "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes."
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes."
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
              06 // AVALIAÇÃO &amp; CONTATO
            </span>
            <div className="h-[1px] w-12 bg-slate-700" />
            <span className="text-micro text-slate-400 uppercase tracking-wider">
              Triagem Técnica Direta
            </span>
          </div>
          <h2 className="text-section-title font-extrabold text-slate-100 leading-tight">
            Solicite uma avaliação inicial do seu ambiente ou projeto.
          </h2>
          <p className="mt-4 text-body-lead text-slate-300 leading-relaxed max-w-[65ch]">
            Preencha o formulário abaixo com as informações do seu problema ou necessidade técnica. 
            Toda solicitação é analisada diretamente por Rafael Soje para orientar o diagnóstico ou próximo passo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Secondary Channels & Confidence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm">
              <span className="text-micro font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                Canal Institucional Direto
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                E-mail Corporativo
              </h3>
              <p className="text-body-small text-slate-300 mb-4 leading-relaxed">
                Para envio de propostas, acordos de confidencialidade (NDA) ou dúvidas técnicas diretas:
              </p>
              <div className="mb-4">
                <a
                  href="mailto:contato@rafaelsoje.com"
                  onClick={() => trackAnalyticsEvent("email_click", { location: "contact_section" })}
                  className="font-mono text-base sm:text-lg font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  contato@rafaelsoje.com
                </a>
              </div>
              <a
                href="mailto:contato@rafaelsoje.com"
                onClick={() => trackAnalyticsEvent("email_click", { location: "contact_section" })}
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider border border-slate-700 bg-slate-950/80 hover:bg-slate-800 hover:border-slate-500 text-slate-200 transition-colors shadow-sm gap-2"
              >
                <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Enviar Mensagem por E-mail</span>
              </a>
            </div>

            {/* Scope / Triagem Commercial Note (Item 8) */}
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-mono space-y-2">
              <span className="text-teal-400 font-bold block uppercase tracking-wider text-[11px]">
                Sobre a Avaliação Inicial:
              </span>
              <p>
                A avaliação inicial é uma triagem para entender sua necessidade e orientar o próximo passo. Demandas que exigem acesso ao servidor, análise aprofundada de logs ou intervenção técnica são orçadas previamente.
              </p>
            </div>

            {/* Commercial Trust Notes */}
            <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Atendimento e análise técnica direta sem intermediários</span>
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
            <div className="rounded-lg border border-teal-500/30 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Canal Principal de Entrada
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Solicitar Avaliação Inicial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                    Envio direto e estruturado para triagem e acompanhamento
                  </p>
                </div>
                <BrandSymbol className="w-6 h-6" theme="dark" />
              </div>

              {/* Feedback messages */}
              {submitStatus === "success" && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-sm flex items-start space-x-3"
                >
                  <span className="text-lg">✓</span>
                  <div>
                    <strong className="block font-bold">Solicitação Recebida!</strong>
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
                      Nome <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
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
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Minha Empresa / Projeto"
                      className="w-full px-4 py-3 rounded bg-slate-950/80 border border-slate-700 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                {/* Email & Telefone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                    >
                      E-mail de Contato <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      name="email"
                      required
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

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                    >
                      Telefone <span className="text-slate-400 text-xs lowercase">(opcional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      placeholder="(11) 98765-4321"
                      className={`w-full px-4 py-3 rounded bg-slate-950/80 border text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 ${
                        errors.phone || errors.whatsapp ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {(errors.phone || errors.whatsapp) && (
                      <p className="mt-1.5 text-xs sm:text-sm text-rose-400 font-mono font-medium">
                        {errors.phone || errors.whatsapp}
                      </p>
                    )}
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
                        Selecione o tipo de necessidade...
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

                {/* Message / Symptoms */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Mensagem / descrição do problema <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente o que está acontecendo com seu servidor, site ou sistema, ou qual é o objetivo do projeto..."
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
                        <span>Enviando solicitação...</span>
                      </span>
                    ) : (
                      <span>Solicitar avaliação inicial →</span>
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
