# Integração HubSpot

## Arquitetura

O site permanece em Next.js 15 e na hospedagem atual. O `RootLayout` carrega o Tracking Code uma vez por página com `next/script` após a hidratação, somente quando `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` está definido. O formulário visual existente envia para `/api/contact`; a rota valida os dados e usa a Forms API pública da HubSpot, sem token privado. A notificação SMTP opcional continua após a aceitação do formulário pela HubSpot.

A captura automática de formulários externos deve permanecer **desativada** para este site. O formulário usa `onSubmit` com JavaScript e `fetch`, o que não atende aos requisitos dessa função e pode gerar envios duplicados ou incompletos. Os campos HTML existentes já têm `name` estável. O script de rastreamento não substitui a Forms API.

No envio, o navegador passa o cookie `hubspotutk`, quando existir, e o caminho com a query string atual. A rota aceita apenas um cookie no formato esperado e reconstrói a URL no domínio do site. Isso permite à HubSpot associar a submissão à visita e manter `utm_source`, `utm_medium`, `utm_campaign` e `utm_content` na URL. A atribuição depende de o visitante aceitar cookies conforme a configuração do portal, de o script carregar e de o cookie estar disponível no navegador. Não há armazenamento adicional de UTMs: links internos com `#contato` preservam a query string da página, mas uma visita posterior sem UTMs não a recupera.

## Arquivos

- `src/app/layout.tsx`: Tracking Code global e opcional.
- `src/components/ContactSection.tsx`: cookie e URL da visita no envio; trava contra clique duplo.
- `src/app/api/contact/route.ts`: encaminhamento do contexto à Forms API.
- `src/lib/hubspot.ts`: validação do contexto e submissão.
- `src/app/api/contact/route.test.ts`: teste de associação e UTMs.
- `.env.example`: variáveis necessárias.

## Configuração

Defina `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` com o ID público do mesmo portal usado por `HUBSPOT_PORTAL_ID`. Configure `HUBSPOT_FORM_GUID` com o GUID do formulário publicado, e confirme que os campos `firstname`, `email`, `company`, `hs_whatsapp_phone_number`, `como_posso_ajudar` e `mensagem_do_formulario` constam na definição do formulário. Os IDs atuais da Forms API já existem como valores padrão no código; confira se pertencem ao portal pretendido antes de publicar. Nenhuma Private App Access Token é necessária. Variáveis `NEXT_PUBLIC_*` ficam visíveis no navegador; nunca use esse prefixo para segredos.

No painel HubSpot, instale/confirme o domínio externo em **Configurações → Rastreamento e análises → Código de rastreamento** e confira o ID do portal. Mantenha a coleta de formulários externos desativada em **Marketing → Formulários → Formulários externos**, para evitar duplicatas. Em **Privacidade e consentimento → Cookies**, adicione o domínio externo e configure a política e o banner de consentimento apropriados antes da ativação em produção. Revise também as configurações de domínios rastreados e exclusão do próprio tráfego.

## Privacidade

O Tracking Code pode criar cookies e registrar visitas, IP e páginas acessadas. A política de privacidade atual descreve apenas os dados enviados no formulário e afirma ausência de compartilhamento com terceiros. Ela precisa de revisão antes da ativação para descrever HubSpot, cookies, finalidade de análise comercial, retenção, direitos e eventual transferência de dados. A decisão sobre base legal, texto da política, categorias de cookies e exigência de consentimento deve ser tomada com orientação jurídica/comercial. Tecnicamente, a HubSpot oferece banner de consentimento para domínios externos; nenhum consentimento foi presumido no código e nenhum banner genérico foi criado.

## Validação em produção

1. Implante com `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `HUBSPOT_PORTAL_ID` e `HUBSPOT_FORM_GUID` corretos. Refaça o build após alterar variável `NEXT_PUBLIC_*`.
2. Em navegador limpo, abra `https://rafaelsoje.com/?utm_source=outbound&utm_medium=email&utm_campaign=prospeccao&utm_content=empresa#contato`. Confira no Network uma única requisição para `js.hs-scripts.com/ID.js`, sem erros no Console, e as UTMs na URL.
3. Configure/aceite o consentimento de cookies conforme a política do portal. Verifique `hubspotutk` nas ferramentas do navegador. A ausência de cookie pode impedir associar a visita ao contato, embora a Forms API ainda receba o formulário.
4. Com um endereço de teste autorizado, preencha e envie uma vez. No Network, confira uma chamada a `/api/contact` com HTTP 200. Na HubSpot, abra o formulário configurado e verifique a submissão; busque o e-mail em Contatos e confira a atividade/atribuição da visita. Verifique também o e-mail SMTP se configurado.
5. Teste resposta inválida/indisponibilidade da HubSpot em ambiente controlado: a interface deve mostrar erro e permitir nova tentativa, sem marcar sucesso falso.

Para desativar apenas o rastreamento, remova `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` e refaça o build. O formulário/API permanece ativo. Para desativar a integração do formulário, é necessária alteração de código na rota, pois a HubSpot é atualmente o destino principal e sua falha retorna erro ao usuário.

## Limitações

O formulário já dependia da aceitação da HubSpot para retornar sucesso. Em timeout, uma solicitação pode ter sido aceita pela HubSpot sem confirmação ao site; uma nova tentativa manual pode criar outra submissão. O bloqueio de clique duplo protege apenas contra envios simultâneos na mesma aba. Bloqueadores de scripts ou recusa de cookies podem impedir atribuição de visitas, sem impedir a submissão pela API. A verificação do portal, formulário e contato reais exige acesso ao painel HubSpot e um envio de teste autorizado.
