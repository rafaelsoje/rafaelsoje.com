import { formatPhoneToE164 } from "./validation";

// Configurações do formulário publicado no HubSpot
export const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || "52058679";
export const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID || "2edf85a0-b82d-4710-a31b-bbdb0d2b1faf";
export const HUBSPOT_TIMEOUT_MS = 8000;

export interface HubSpotField {
  objectTypeId?: string;
  name: string;
  value: string;
}

export interface HubSpotSubmissionPayload {
  fields: HubSpotField[];
  context: {
    pageUri: string;
    pageName: string;
    ipAddress: string;
  };
}

export interface HubSpotSubmissionResult {
  success: boolean;
  status?: number;
  error?: string;
}

export interface SubmitToHubSpotParams {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  helpTopic: string;
  message: string;
  ip: string;
  portalId?: string;
  formGuid?: string;
}

/**
 * Envia os dados submetidos pelo formulário para a HubSpot Forms API v3 oficial
 * Endpoint: POST https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid
 */
export async function submitToHubSpotForm({
  name,
  company,
  email,
  phone,
  helpTopic,
  message,
  ip,
  portalId = HUBSPOT_PORTAL_ID,
  formGuid = HUBSPOT_FORM_GUID,
}: SubmitToHubSpotParams): Promise<HubSpotSubmissionResult> {
  const fields: HubSpotField[] = [
    { objectTypeId: "0-1", name: "firstname", value: name },
    { objectTypeId: "0-1", name: "email", value: email },
    { objectTypeId: "0-1", name: "como_posso_ajudar", value: helpTopic },
    { objectTypeId: "0-1", name: "mensagem_do_formulario", value: message },
  ];

  if (company) {
    fields.push({ objectTypeId: "0-1", name: "company", value: company });
  }

  const formattedPhone = formatPhoneToE164(phone);
  if (formattedPhone) {
    fields.push({
      objectTypeId: "0-1",
      name: "hs_whatsapp_phone_number",
      value: formattedPhone,
    });
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HUBSPOT_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: "https://rafaelsoje.com",
          pageName: "Formulário Comercial - rafaelsoje.com",
          ipAddress: ip,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      console.log(`[HubSpot Forms API] Submissão aceita com sucesso. Status: ${response.status}`);
      return { success: true, status: response.status };
    }

    const status = response.status;
    const errorBody = await response.text().catch(() => "");
    console.error(
      `[HubSpot Forms API Error] Rejeição do servidor. Status: ${status}. Diagnóstico: ${errorBody.slice(0, 300)}`
    );
    return { success: false, status, error: "HubSpot rejected submission" };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error(
      `[HubSpot Forms API Exception] ${isAbort ? "Timeout na requisição (8s)" : "Falha de rede/conexão"}`
    );
    return { success: false, error: isAbort ? "Timeout" : "Network error" };
  }
}

