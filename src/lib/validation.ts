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

export function validateWhatsApp(phone: string): boolean {
  if (!phone) return false;
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, "");
  // Brazilian numbers with DDD have 10 or 11 digits (e.g. 21 99984-0419)
  // General international allows 8 to 15 digits according to E.164
  return digits.length >= 10 && digits.length <= 15;
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

  // Help topic validation (obrigatório)
  const helpTopic = (data.helpTopic || "").trim();
  if (!helpTopic) {
    errors.helpTopic = "Por favor, selecione como posso ajudar.";
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

  // WhatsApp validation (opcional - se preenchido, valida formato)
  const whatsapp = (data.whatsapp || "").trim();
  if (whatsapp && !validateWhatsApp(whatsapp)) {
    errors.whatsapp = "Número de WhatsApp inválido. Digite DDD + número (ex: 21 99984-0419).";
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
            whatsapp,
            email,
            helpTopic,
            message,
          },
        }
      : {}),
  };
}

