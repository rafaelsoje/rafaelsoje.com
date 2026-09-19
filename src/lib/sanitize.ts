/**
 * Sanitiza strings para exibição segura e proteção contra injeção de tags em e-mails HTML/texto
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeText(text: string): string {
  // Remove caracteres de controle invisíveis e normaliza espaços
  return text
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

/**
 * Sanitiza valores destinados a cabeçalhos de e-mail de linha única (ex: Subject),
 * removendo explicitamente caracteres de quebra de linha (\r, \n) e substituindo por espaço.
 * Previne ataques de CRLF / SMTP Header Injection.
 */
export function sanitizeHeaderValue(text: string): string {
  return sanitizeText(text).replace(/[\r\n]+/g, " ").trim();
}

