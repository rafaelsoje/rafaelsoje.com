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
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          error: "Dados inválidos.",
          validationErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, company, phone, whatsapp, email, helpTopic, message } = validation.sanitizedData;
    const clientPhone = phone || whatsapp;

    // 4. Sanitização contra injeção em HTML e headers
    const safeName = escapeHtml(sanitizeText(name));
    const safeCompany = company ? escapeHtml(sanitizeText(company)) : "Não informada";
    const safePhone = clientPhone ? escapeHtml(sanitizeText(clientPhone)) : "Não informado";
    const safeEmail = email ? escapeHtml(sanitizeText(email)) : "Não informado";
    const safeHelpTopic = escapeHtml(sanitizeText(helpTopic));
    const safeMessage = escapeHtml(sanitizeText(message)).replace(/\n/g, "<br>");

    // 5. Integração com HubSpot CRM (não bloqueante / fail-safe)
    await dispatchToHubSpot({
      name,
      company,
      phone: clientPhone,
      whatsapp: clientPhone,
      email,
      helpTopic,
      message,
      ip,
    });

    // 6. Configuração e Envio SMTP
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
        subject: `[Novo Contato Comercial - ${safeHelpTopic}] ${safeName}${company ? ` (${safeCompany})` : ""}`,
        text: `Novo contato recebido pelo site rafaelsoje.com:
--------------------------------------------------
Nome: ${name}
Empresa: ${company || "Não informada"}${clientPhone ? `\nTelefone: ${clientPhone}` : ""}
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
    } else {
      // Em ambiente local de desenvolvimento ou teste onde SMTP ainda não foi configurado
      console.log("[SMTP Simulated Delivery] Mensagem recebida com sucesso:", {
        name,
        company,
        whatsapp,
        email,
        helpTopic,
        message,
        ip,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Recebi sua solicitação. Vou analisar as informações e entrar em contato.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno ao processar formulário de contato:", error);
    return NextResponse.json(
      {
        error:
          "Ocorreu um erro ao enviar sua mensagem. Se preferir, envie um e-mail diretamente para contato@rafaelsoje.com.",
      },
      { status: 500 }
    );
  }
}

interface LeadPayload {
  name: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  email: string;
  helpTopic: string;
  message: string;
  ip: string;
}

async function dispatchToHubSpot(lead: LeadPayload) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  const contactDate = new Date().toISOString();

  try {
    // 1. Prioridade: HubSpot CRM API v3 (com Access Token privado)
    if (token) {
      const names = lead.name.trim().split(" ");
      const firstname = names[0];
      const lastname = names.slice(1).join(" ") || "";

      const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          properties: {
            firstname,
            lastname,
            company: lead.company || "",
            phone: lead.whatsapp || "",
            mobilephone: lead.whatsapp || "",
            email: lead.email,
            message: `[${lead.helpTopic}] ${lead.message}`,
            hs_lead_status: "NEW",
            lead_source: "rafaelsoje.com",
            notes_last_contacted: `Origem: rafaelsoje.com | Data: ${contactDate} | Demanda: ${lead.helpTopic}`,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`[HubSpot CRM API Error] Status ${res.status}: ${errorText}`);
      } else {
        console.log("[HubSpot CRM API] Lead despachado com sucesso.");
      }
      return;
    }

    // 2. Alternativa: HubSpot Forms API v3 (com Portal ID e Form GUID)
    if (portalId && formGuid) {
      const fields = [
        { objectTypeId: "0-1", name: "firstname", value: lead.name },
        { objectTypeId: "0-1", name: "company", value: lead.company || "" },
        { objectTypeId: "0-1", name: "phone", value: lead.whatsapp || "" },
        { objectTypeId: "0-1", name: "email", value: lead.email },
        { objectTypeId: "0-1", name: "message", value: `[${lead.helpTopic}] ${lead.message}` },
        { objectTypeId: "0-1", name: "lead_source", value: "rafaelsoje.com" },
      ];

      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: "https://rafaelsoje.com",
              pageName: "Formulário Comercial - rafaelsoje.com",
            },
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`[HubSpot Forms API Error] Status ${res.status}: ${errorText}`);
      } else {
        console.log("[HubSpot Forms API] Lead despachado com sucesso.");
      }
      return;
    }

    // 3. Fallback / Log estruturado caso as variáveis de ambiente ainda não estejam preenchidas
    console.log("[HubSpot Simulated Dispatch] Credenciais ausentes. Mapeamento pronto para conexão:", {
      nome: lead.name,
      empresa: lead.company || "Não informada",
      email: lead.email,
      whatsapp: lead.whatsapp || "Não informado",
      tipo_de_necessidade: lead.helpTopic,
      mensagem: lead.message,
      origem_do_lead: "rafaelsoje.com",
      data_do_contato: contactDate,
      ip: lead.ip,
    });
  } catch (hubspotErr) {
    // Fail-safe: Não quebra a requisição do usuário em caso de indisponibilidade de rede ou falha externa
    console.error("[HubSpot Integration Exception]:", hubspotErr);
  }
}

