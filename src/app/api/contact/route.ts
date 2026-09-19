import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactForm } from "@/lib/validation";
import { escapeHtml, sanitizeText } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rate-limit";

// Limite máximo do payload: 64 KB
const MAX_PAYLOAD_SIZE = 64 * 1024;

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

    // 2. Rate Limiting por IP (ou cabeçalhos de proxy reverso)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000); // 5 envios a cada 10 minutos
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error:
            "Limite de mensagens atingido para este período. Por favor, aguarde alguns minutos ou entre em contato diretamente pelo WhatsApp.",
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
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          error: "Dados inválidos.",
          validationErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, company, whatsapp, email, message } = validation.sanitizedData;

    // 4. Sanitização contra injeção em HTML e headers
    const safeName = escapeHtml(sanitizeText(name));
    const safeCompany = company ? escapeHtml(sanitizeText(company)) : "Não informada";
    const safeWhatsapp = whatsapp ? escapeHtml(sanitizeText(whatsapp)) : "Não informado";
    const safeEmail = email ? escapeHtml(sanitizeText(email)) : "Não informado";
    const safeMessage = escapeHtml(sanitizeText(message)).replace(/\n/g, "<br>");

    // 5. Configuração e Envio SMTP
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || `"Rafael Soje - Contato" <contato@rafaelsoje.com>`;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "contato@rafaelsoje.com";

    // Se as credenciais SMTP estiverem preenchidas, dispara via nodemailer
    if (smtpHost && smtpUser && smtpPass) {
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
        subject: `[Novo Contato Comercial] ${safeName}${company ? ` (${safeCompany})` : ""}`,
        text: `Novo contato recebido pelo site rafaelsoje.com:
--------------------------------------------------
Nome: ${name}
Empresa: ${company || "Não informada"}
WhatsApp: ${whatsapp || "Não informado"}
E-mail: ${email || "Não informado"}
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
      <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #64748b;">Nome:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Empresa:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeCompany}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">WhatsApp:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeWhatsapp}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail:</td>
      <td style="padding: 8px 0; color: #0f172a;">${safeEmail}</td>
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
    } else {
      // Em ambiente local de desenvolvimento ou teste onde SMTP ainda não foi configurado
      console.log("[SMTP Simulated Delivery] Mensagem recebida com sucesso:", {
        name,
        company,
        whatsapp,
        email,
        message,
        ip,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Mensagem recebida com sucesso! Rafael entrará em contato em breve para realizar a triagem inicial.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno ao processar formulário de contato:", error);
    return NextResponse.json(
      {
        error:
          "Ocorreu um erro ao enviar sua mensagem. Se preferir, contate diretamente pelo WhatsApp +55 21 99984-0419.",
      },
      { status: 500 }
    );
  }
}

