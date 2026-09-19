export const HELP_TOPICS = [
  "Servidor / infraestrutura",
  "Site / sistema",
  "Migração",
  "Backup",
  "Segurança",
  "Automação",
  "Outro",
] as const;

export type HelpTopic = (typeof HELP_TOPICS)[number];

export interface ContactFormData {
  name: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  email: string;
  helpTopic: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    company?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    helpTopic?: string;
    message?: string;
    contact?: string;
    honeypot?: string;
  };
  sanitizedData?: {
    name: string;
    company: string;
    phone: string;
    whatsapp: string;
    email: string;
    helpTopic: string;
    message: string;
  };
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  // RFC 5322 compliant regex simplified for real-world web validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, "");
  // Brazilian numbers with DDD have 10 or 11 digits (e.g. 11 98765-4321)
  // General international allows 8 to 15 digits according to E.164
  return digits.length >= 10 && digits.length <= 15;
}

export const validateWhatsApp = validatePhone;

/**
 * Normaliza número de telefone para formato E.164:
 * - Trata adequadamente números brasileiros com DDI +55
 * - Preserva números internacionais existentes sem corrompê-los
 */
export function formatPhoneToE164(phone?: string): string {
  if (!phone) return "";
  const trimmed = phone.trim();
  if (!trimmed) return "";

  // Se já começar com '+'
  if (trimmed.startsWith("+")) {
    const digits = trimmed.replace(/\D/g, "");
    return digits ? `+${digits}` : "";
  }

  // Se começar com prefixo internacional '00'
  if (trimmed.startsWith("00")) {
    const digits = trimmed.slice(2).replace(/\D/g, "");
    return digits ? `+${digits}` : "";
  }

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";

  // Números brasileiros (DDD com 2 dígitos + telefone com 8 ou 9 dígitos = 10 ou 11 dígitos)
  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`;
  }

  // Se já possui o código 55 (12 ou 13 dígitos)
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    return `+${digits}`;
  }

  // Padrão genérico E.164
  return `+${digits}`;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  // Honeypot validation - must be empty
  if (data.honeypot && data.honeypot.trim() !== "") {
    errors.honeypot = "Spam detectado.";
    return { isValid: false, errors };
  }

  // Name validation (obrigatório)
  const name = (data.name || "").trim();
  if (!name) {
    errors.name = "Por favor, informe seu nome.";
  } else if (name.length < 2) {
    errors.name = "O nome deve conter pelo menos 2 caracteres.";
  } else if (name.length > 100) {
    errors.name = "O nome não pode exceder 100 caracteres.";
  }

  // Help topic validation (obrigatório e validado contra enum permitida)
  const helpTopic = (data.helpTopic || "").trim();
  if (!helpTopic) {
    errors.helpTopic = "Por favor, selecione como posso ajudar.";
  } else if (!HELP_TOPICS.includes(helpTopic as HelpTopic)) {
    errors.helpTopic = "Opção selecionada inválida. Escolha uma das opções da lista.";
  }

  // Company validation (opcional)
  const company = (data.company || "").trim();
  if (company.length > 100) {
    errors.company = "O nome da empresa não pode exceder 100 caracteres.";
  }

  // Email validation (obrigatório)
  const email = (data.email || "").trim();
  if (!email) {
    errors.email = "Por favor, informe seu e-mail de contato.";
  } else if (!validateEmail(email)) {
    errors.email = "E-mail inválido. Verifique o formato digitado.";
  }

  // Phone / WhatsApp validation (opcional - se preenchido, valida formato)
  const phone = (data.phone || data.whatsapp || "").trim();
  if (phone && !validatePhone(phone)) {
    const errorMsg = "Número de telefone inválido. Digite DDD + número (ex: 11 98765-4321).";
    errors.phone = errorMsg;
    errors.whatsapp = errorMsg;
  }

  // Message validation (obrigatória)
  const message = (data.message || "").trim();
  if (!message) {
    errors.message = "Por favor, descreva brevemente seu problema ou necessidade.";
  } else if (message.length < 10) {
    errors.message = "A mensagem deve conter pelo menos 10 caracteres para uma triagem inicial adequada.";
  } else if (message.length > 3000) {
    errors.message = "A mensagem não pode exceder 3.000 caracteres.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    ...(isValid
      ? {
          sanitizedData: {
            name,
            company,
            phone,
            whatsapp: phone,
            email,
            helpTopic,
            message,
          },
        }
      : {}),
  };
}

