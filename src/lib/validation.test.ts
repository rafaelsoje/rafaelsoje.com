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
      expect(validateWhatsApp("11 98765-4321")).toBe(true);
      expect(validateWhatsApp("(11) 98765-4321")).toBe(true);
      expect(validateWhatsApp("+55 11 98765-4321")).toBe(true);
      expect(validateWhatsApp("11987654321")).toBe(true);
      expect(validateWhatsApp("21 98765-4321")).toBe(true);
      expect(validateWhatsApp("(21) 98765-4321")).toBe(true);
      expect(validateWhatsApp("+55 21 98765-4321")).toBe(true);
      expect(validateWhatsApp("21987654321")).toBe(true);
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
      email: "contato@empresa.com",
      helpTopic: "Servidor / infraestrutura",
      message: "Gostaria de solicitar uma avaliação inicial para nosso servidor Linux.",
    };

    it("deve aprovar quando os campos obrigatórios (nome, e-mail, como posso ajudar, mensagem) são preenchidos sem telefone", () => {
      const result = validateContactForm(validBase);
      expect(result.isValid).toBe(true);
      expect(result.sanitizedData?.email).toBe("contato@empresa.com");
      expect(result.sanitizedData?.phone).toBe("");
    });

    it("deve aprovar quando telefone válido é fornecido", () => {
      const result = validateContactForm({
        ...validBase,
        phone: "11 98765-4321",
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitizedData?.phone).toBe("11 98765-4321");
    });

    it("deve aprovar quando WhatsApp válido também é fornecido via campo legacy", () => {
      const result = validateContactForm({
        ...validBase,
        whatsapp: "11 98765-4321",
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitizedData?.whatsapp).toBe("11 98765-4321");
    });

    it("deve reprovar quando o e-mail não é informado", () => {
      const result = validateContactForm({
        ...validBase,
        email: "",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it("deve reprovar quando o e-mail é inválido", () => {
      const result = validateContactForm({
        ...validBase,
        email: "email-invalido-sem-arroba",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it("deve reprovar quando o WhatsApp fornecido é inválido", () => {
      const result = validateContactForm({
        ...validBase,
        whatsapp: "12345",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.whatsapp).toBeDefined();
    });

    it("deve reprovar quando o campo 'Como posso ajudar?' não é selecionado", () => {
      const result = validateContactForm({
        ...validBase,
        helpTopic: "",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.helpTopic).toBeDefined();
    });

    it("deve rejeitar preenchimento de honeypot (bloqueio de robôs)", () => {
      const result = validateContactForm({
        ...validBase,
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
