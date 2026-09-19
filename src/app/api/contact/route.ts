import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactForm } from "../../../lib/validation";
import { escapeHtml, sanitizeText, sanitizeHeaderValue } from "../../../lib/sanitize";
import { checkRateLimit, extractClientIp } from "../../../lib/rate-limit";
import { submitToHubSpotForm } from "../../../lib/hubspot";

// Limite máximo do payload: 64 KB
const MAX_PAYLOAD_SIZE = 64 * 1024;

/**
 * Notificação SMTP opcional em segundo plano (fail-safe)
 */
async function sendEmailNotification({
  name,
  company,
  clientPhone,
  email,
  helpTopic,
  message,
  ip,
}: {
  name: string;
  company?: string;
  clientPhone?: string;
  email: string;
  helpTopic: string;
  message: string;
  ip: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"Rafael Soje - Contato" <contato@rafaelsoje.com>`;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "contato@rafaelsoje.com";

  if (!smtpHost || !smtpUser || !smtpPass) {
    return;
  }

  const safeName = escapeHtml(sanitizeText(name));
  const safeCompany = company ? escapeHtml(sanitizeText(company)) : "Não informada";
  const safePhone = clientPhone ? escapeHtml(sanitizeText(clientPhone)) : "Não informado";
  const safeEmail = email ? escapeHtml(sanitizeText(email)) : "Não informado";
  const safeHelpTopic = escapeHtml(sanitizeText(helpTopic));
  const safeMessage = escapeHtml(sanitizeText(message)).replace(/\n/g, "<br>");

  // Sanitização estrita contra CRLF / SMTP Header Injection no Subject (remove \r e \n)
  const cleanSubjectTopic = sanitizeHeaderValue(helpTopic);
  const cleanSubjectName = sanitizeHeaderValue(name);
  const cleanSubjectCompany = company ? sanitizeHeaderValue(company) : "";

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: smtpFrom,
    to: recipientEmail,
    replyTo: email || undefined,
    subject: `[Novo Contato Comercial - ${cleanSubjectTopic}] ${cleanSubjectName}${cleanSubjectCompany ? ` (${cleanSubjectCompany})` : ""}`,
    text: `Novo contato recebido pelo site rafaelsoje.com:
--------------------------------------------------
Nome: ${name}
Empresa: ${company || "Não informada"}
Telefone: ${clientPhone || "Não informado"}
E-mail: ${email || "Não informado"}
Assunto / Como posso ajudar: ${helpTopic}
--------------------------------------------------
Mensagem:
${message}
--------------------------------------------------
IP do solicitante: ${ip}
Data/Hora: ${new Date().toISOString()}`,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #0f172a; font-size: 20px;">Novo Contato Comercial — rafaelsoje.com</h2>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Nome:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Empresa:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeCompany}</td>
    </tr>${clientPhone ? `
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Telefone:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safePhone}</td>
    </tr>` : ""}
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeEmail}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Como posso ajudar:</td>
      <td style="padding: 8px 0; color: #0d9488; font-weight: bold;">${safeHelpTopic}</td>
    </tr>
  </table>
  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
    <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: bold;">Descrição da Demanda / Sintomas:</p>
    <div style="font-size: 14px; line-height: 1.6; color: #0f172a;">${safeMessage}</div>
  </div>
  <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
    IP: ${ip} | Data: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
  </div>
</div>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verificação de tamanho do payload
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: "Payload muito grande. Tamanho máximo excedido." },
        { status: 413 }
      );
    }

    // 2. Rate Limiting por IP (5 envios a cada 10 minutos por IP)
    const ip = extractClientIp(req.headers);

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error:
            "Limite de mensagens atingido para este período. Por favor, aguarde alguns minutos ou envie um e-mail para contato@rafaelsoje.com.",
        },
        { status: 429 }
      );
    }

    // 3. Leitura e validação do JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Formato de requisição inválido. Envie JSON válido." },
        { status: 400 }
      );
    }

    const validation = validateContactForm(body);

    // Proteção anti-spam via honeypot: rejeição silenciosa de bots sem envio ao CRM
    if (validation.errors.honeypot) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Solicitação enviada com sucesso. Obrigado pelo contato. Analisarei as informações e retornarei pelo e-mail ou WhatsApp informado.",
        },
        { status: 200 }
      );
    }

    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          error: "Dados inválidos.",
          validationErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, company, phone, whatsapp, email, helpTopic, message } =
      validation.sanitizedData;
    const clientPhone = phone || whatsapp;

    // 4. Integração direta com HubSpot Forms API v3 (oficial para formulário publicado)
    const hubspotResult = await submitToHubSpotForm({
      name,
      company,
      email,
      phone: clientPhone,
      helpTopic,
      message,
      ip,
    });

    // Se o HubSpot rejeitar a submissão, não retorna 200 para o frontend
    if (!hubspotResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
        },
        { status: 502 }
      );
    }

    // 5. Notificação por e-mail em segundo plano (fail-safe / não bloqueante)
    try {
      await sendEmailNotification({
        name,
        company,
        clientPhone,
        email,
        helpTopic,
        message,
        ip,
      });
    } catch (smtpErr) {
      console.error("[SMTP Notification Error]:", smtpErr);
    }

    // 6. Confirmação real de sucesso
    return NextResponse.json(
      {
        success: true,
        message:
          "Solicitação enviada com sucesso. Obrigado pelo contato. Analisarei as informações e retornarei pelo e-mail ou WhatsApp informado.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno ao processar formulário de contato:", error);
    return NextResponse.json(
      {
        error:
          "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
      },
      { status: 500 }
    );
  }
}
