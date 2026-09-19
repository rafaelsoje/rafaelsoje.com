import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import { submitToHubSpotForm } from "../../../lib/hubspot";
import { NextRequest } from "next/server";
import { resetRateLimitStoreForTesting } from "../../../lib/rate-limit";

interface CapturedHubSpotPayload {
  fields: Array<{ objectTypeId?: string; name: string; value: string }>;
  context?: { pageUri: string; pageName: string; ipAddress: string };
}

describe("HubSpot Forms API Integration (/api/contact)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetRateLimitStoreForTesting();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("submitToHubSpotForm", () => {
    it("deve montar o payload exato esperado pela HubSpot Forms API v3", async () => {
      let capturedUrl = "";
      let capturedBody: CapturedHubSpotPayload | undefined;

      vi.spyOn(globalThis, "fetch").mockImplementation(async (url, init) => {
        capturedUrl = url.toString();
        capturedBody = JSON.parse(init?.body as string) as CapturedHubSpotPayload;
        return new Response(JSON.stringify({ inlineMessage: "Thanks for submitting the form." }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });

      const result = await submitToHubSpotForm({
        name: "Carlos Silva",
        company: "Tech Cloud Ltda",
        email: "carlos@techcloud.com.br",
        phone: "11 98765-4321",
        helpTopic: "Servidor / infraestrutura",
        message: "Necessitamos de migração e suporte para servidores Linux Debian.",
        ip: "192.168.1.100",
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);

      // Validação do Endpoint oficial
      expect(capturedUrl).toBe(
        "https://api.hsforms.com/submissions/v3/integration/submit/52058679/2edf85a0-b82d-4710-a31b-bbdb0d2b1faf"
      );

      // Validação dos Campos
      const parsed = capturedBody as CapturedHubSpotPayload;
      expect(parsed.fields).toEqual([
        { objectTypeId: "0-1", name: "firstname", value: "Carlos Silva" },
        { objectTypeId: "0-1", name: "email", value: "carlos@techcloud.com.br" },
        { objectTypeId: "0-1", name: "como_posso_ajudar", value: "Servidor / infraestrutura" },
        {
          objectTypeId: "0-1",
          name: "mensagem_do_formulario",
          value: "Necessitamos de migração e suporte para servidores Linux Debian.",
        },
        { objectTypeId: "0-1", name: "company", value: "Tech Cloud Ltda" },
        { objectTypeId: "0-1", name: "hs_whatsapp_phone_number", value: "+5511987654321" },
      ]);

      // Validação do Contexto
      expect(parsed.context).toEqual({
        pageUri: "https://rafaelsoje.com",
        pageName: "Formulário Comercial - rafaelsoje.com",
        ipAddress: "192.168.1.100",
      });
    });

    it("deve omitir empresa e whatsapp quando não preenchidos", async () => {
      let capturedBody: CapturedHubSpotPayload | undefined;

      vi.spyOn(globalThis, "fetch").mockImplementation(async (_, init) => {
        capturedBody = JSON.parse(init?.body as string) as CapturedHubSpotPayload;
        return new Response("{}", { status: 200 });
      });

      const result = await submitToHubSpotForm({
        name: "Ana Souza",
        email: "ana@exemplo.com",
        helpTopic: "Segurança",
        message: "Gostaria de uma auditoria de segurança no firewall do servidor.",
        ip: "10.0.0.1",
      });

      expect(result.success).toBe(true);
      const parsed = capturedBody as CapturedHubSpotPayload;
      const fieldNames = parsed.fields.map((f: { name: string }) => f.name);
      expect(fieldNames).toContain("firstname");
      expect(fieldNames).toContain("email");
      expect(fieldNames).toContain("como_posso_ajudar");
      expect(fieldNames).toContain("mensagem_do_formulario");
      expect(fieldNames).not.toContain("company");
      expect(fieldNames).not.toContain("hs_whatsapp_phone_number");
    });

    it("deve retornar success: false em caso de resposta HTTP 4xx ou 5xx do HubSpot", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
          JSON.stringify({
            status: "error",
            message: "The form submission was rejected.",
          }),
          { status: 400 }
        )
      );

      const result = await submitToHubSpotForm({
        name: "Teste Erro",
        email: "teste@erro.com",
        helpTopic: "Backup",
        message: "Configuração de rotinas automatizadas de backup no S3.",
        ip: "127.0.0.1",
      });

      expect(result.success).toBe(false);
      expect(result.status).toBe(400);
    });

    it("deve capturar timeout ou erro de rede sem lançar exceção não tratada", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network connection lost"));

      const result = await submitToHubSpotForm({
        name: "Teste Timeout",
        email: "teste@timeout.com",
        helpTopic: "Outro",
        message: "Mensagem de teste para verificar tratamento de erro de rede.",
        ip: "127.0.0.1",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Network error");
    });
  });

  describe("POST Route Handler", () => {
    const validPayload = {
      name: "Cliente Contratante",
      company: "Empresa XPTO",
      email: "contato@xpto.com",
      phone: "(21) 98765-4321",
      helpTopic: "Servidor / infraestrutura",
      message: "Precisamos de ajuda para configurar nosso ambiente de produção na nuvem.",
    };

    it("deve retornar HTTP 200 com mensagem padrão quando o HubSpot aceita a submissão", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "success" }), { status: 200 })
      );

      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe(
        "Solicitação enviada com sucesso. Obrigado pelo contato. Analisarei as informações e retornarei pelo e-mail ou WhatsApp informado."
      );
    });

    it("NÃO deve retornar HTTP 200 se o HubSpot rejeitar a submissão", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ status: "error" }), { status: 400 })
      );

      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(502);
      expect(data.success).toBe(false);
      expect(data.error).toBe(
        "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes."
      );
    });

    it("deve rejeitar silenciosamente bots com honeypot preenchido sem chamar a API do HubSpot", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validPayload,
          honeypot: "http://spam-link.ru",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      // Nenhuma chamada externa ao HubSpot deve ocorrer
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("deve retornar HTTP 400 se os dados forem inválidos", async () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: "invalido",
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Dados inválidos.");
      expect(data.validationErrors).toBeDefined();
    });
  });
});
