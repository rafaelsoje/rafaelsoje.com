import { describe, it, expect } from "vitest";
import { validateContactForm, validateEmail, validateWhatsApp } from "./validation";
import { escapeHtml, sanitizeText } from "./sanitize";
import { checkRateLimit, resetRateLimitStoreForTesting } from "./rate-limit";

describe("Validation Utilities", () => {
  describe("validateEmail", () => {
    it("deve aceitar e-mails válidos", () => {
      expect(validateEmail("contato@rafaelsoje.com")).toBe(true);
      expect(validateEmail("cliente.suporte@empresa.com.br")).toBe(true);
      expect(validateEmail("user+tag@domain.co")).toBe(true);
    });

    it("deve rejeitar e-mails inválidos", () => {
      expect(validateEmail("")).toBe(false);
      expect(validateEmail("email_sem_arroba.com")).toBe(false);
      expect(validateEmail("@dominio.com")).toBe(false);
      expect(validateEmail("contato@")).toBe(false);
      expect(validateEmail("nome@dominio")).toBe(false);
    });
  });

  describe("validateWhatsApp", () => {
    it("deve aceitar números válidos de WhatsApp brasileiros e internacionais", () => {
      expect(validateWhatsApp("21 99984-0419")).toBe(true);
      expect(validateWhatsApp("(21) 99984-0419")).toBe(true);
      expect(validateWhatsApp("+55 21 99984-0419")).toBe(true);
      expect(validateWhatsApp("21999840419")).toBe(true);
      expect(validateWhatsApp("+1 415 555 2671")).toBe(true);
    });

    it("deve rejeitar números com dígitos insuficientes ou inválidos", () => {
      expect(validateWhatsApp("")).toBe(false);
      expect(validateWhatsApp("123")).toBe(false);
      expect(validateWhatsApp("telefone_invalido")).toBe(false);
    });
  });

  describe("validateContactForm", () => {
    const validBase = {
      name: "Cliente Exemplo",
      company: "Empresa Tecnologia",
      message: "Gostaria de solicitar uma avaliação inicial para nosso servidor Linux.",
    };

    it("deve aprovar quando apenas WhatsApp válido é fornecido", () => {
      const result = validateContactForm({
        ...validBase,
        whatsapp: "21 99984-0419",
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitizedData?.whatsapp).toBe("21 99984-0419");
    });

    it("deve aprovar quando apenas E-mail válido é fornecido", () => {
      const result = validateContactForm({
        ...validBase,
        email: "contato@empresa.com",
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitizedData?.email).toBe("contato@empresa.com");
    });

    it("deve aprovar quando ambos WhatsApp e E-mail são válidos", () => {
      const result = validateContactForm({
        ...validBase,
        whatsapp: "21 99984-0419",
        email: "contato@empresa.com",
      });
      expect(result.isValid).toBe(true);
    });

    it("deve reprovar quando nenhum canal de contato é informado", () => {
      const result = validateContactForm({
        ...validBase,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.contact).toBeDefined();
    });

    it("deve reprovar se ambos são preenchidos mas um deles é inválido", () => {
      const result = validateContactForm({
        ...validBase,
        whatsapp: "21 99984-0419",
        email: "email-invalido",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it("deve rejeitar preenchimento de honeypot (bloqueio de robôs)", () => {
      const result = validateContactForm({
        ...validBase,
        email: "teste@empresa.com",
        honeypot: "http://bot-link.spam",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.honeypot).toBeDefined();
    });

    it("deve validar tamanho mínimo da mensagem", () => {
      const result = validateContactForm({
        ...validBase,
        email: "teste@empresa.com",
        message: "curto",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBeDefined();
    });
  });

  describe("Sanitization & Rate Limit", () => {
    it("deve escapar tags HTML para prevenir XSS", () => {
      const input = '<script>alert("xss")</script> & <b>bold</b>';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain("<script>");
      expect(escaped).toContain("&lt;script&gt;");
      expect(escaped).toContain("&amp;");
    });

    it("deve limpar caracteres de controle invisíveis", () => {
      const dirty = "Nome\u0000 com\u0007 lixo";
      expect(sanitizeText(dirty)).toBe("Nome com lixo");
    });

    it("deve respeitar a janela de requisições do rate limit", () => {
      resetRateLimitStoreForTesting();
      const ip = "192.168.1.50";

      // 3 requisições com limite de 3
      expect(checkRateLimit(ip, 3, 5000).success).toBe(true);
      expect(checkRateLimit(ip, 3, 5000).success).toBe(true);
      expect(checkRateLimit(ip, 3, 5000).success).toBe(true);
      // 4ª requisição deve ser bloqueada
      expect(checkRateLimit(ip, 3, 5000).success).toBe(false);
    });
  });
});
