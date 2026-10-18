# Rafael Soje — Plataforma Web Oficial

<p align="center">
  <a href="https://rafaelsoje.com">
    <img src="https://img.shields.io/badge/Produção-rafaelsoje.com-0f766e?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" />
  </a>
  <a href="https://linkedin.com/in/rafaelsoje">
    <img src="https://img.shields.io/badge/LinkedIn-Rafael_Soje-0077b5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/LPIC--1-Certified-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="LPIC-1" />
</p>

---

## Visão Geral

Repositório da plataforma web oficial e sistema de atendimento de **Rafael Soje** ([rafaelsoje.com](https://rafaelsoje.com)) — Consultoria e Engenharia em Infraestrutura Linux, Cloud, Segurança da Informação e Desenvolvimento Web.

Desenvolvida com foco em **altíssimo desempenho**, **segurança defensiva rigorosa** e **arquitetura orientada a conversão**, a aplicação combina o ecossistema moderno do Next.js com esteiras de deploy atômico e observabilidade em produção.

---

## Arquitetura & Diferenciais Técnicos

### 1. Frontend & Performance
* **Next.js 15 (App Router):** Renderização híbrida (SSG/SSR) com otimização avançada de fontes (`next/font/google` Geist) e Core Web Vitals.
* **TypeScript Estrito:** Tipagem estática integral em componentes, rotas de API, esquemas de validação e bibliotecas de utilitários.
* **Design System & Tailwind CSS:** Direção de arte editorial inspirada em plantas técnicas de engenharia, com paleta dark slate (`#090d16`), acentos em teal (`#0f766e` / `#14b8a6`) e responsividade total (Mobile, Tablet e Desktop).

### 2. Segurança Defensiva & Anti-Bot
* **Cloudflare Turnstile:** Verificação interativa e não-intrusiva contra robôs sem atrito para o usuário.
* **Validação Server-Side Rigorosa:** Esquemas validados via **Zod** com limites de comprimento (e-mail RFC 5322, telefone E.164 e payload máximo).
* **Sanitização Estrita:** Proteção nativa contra injeção de scripts (XSS), SQLi e cabeçalhos maliciosos.
* **Rate Limiting em Memória:** Controle de requisições por IP na borda priorizando `CF-Connecting-IP` com bloqueio temporário de requisições abusivas.
* **Honeypot Invisível:** Armadilha para crawlers e scrapers automatizados com descarte silencioso de tráfego nocivo.

### 3. Integração CRM & Atribuição de Prospecção
* **HubSpot CRM API v3:** Integração direta com persistência automática de leads, contatos e mensagens em tempo real.
* **Rastreamento de Campanhas (UTMs):** Motor próprio de normalização de parâmetros de marketing (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) persistidos no perfil do cliente no CRM.
* **Rastreador First-Party (`/api/track`):** Rota interna executada via `navigator.sendBeacon` para métricas de conversão e cliques em campanhas, imune a bloqueadores de anúncios (AdBlockers).

### 4. Observabilidade & Monitoramento
* **Sentry SDK:** Captura de exceções e erros em tempo real tanto no lado do cliente quanto nas rotas do servidor.
* **Microsoft Clarity:** Gravação de sessões e mapas de calor de navegação integrados ao CRM.
* **Google Analytics 4 (GA4):** Métricas consolidadas de engajamento e fluxo de navegação.

### 5. Infraestrutura & Deploy em Produção
* **VPS Linux Dedicada (Hetzner Cloud):** Sistema operacional Ubuntu Server / Debian com isolamento estrito de portas.
* **Proxy Reverso Nginx:** Terminação SSL (Cloudflare Origin CA), HTTP/2, cabeçalhos de segurança rígidos (HSTS, CSP, X-Frame-Options, X-Content-Type-Options) e cache de assets estáticos.
* **Deploy Atômico Zero-Downtime:** Releases imutáveis organizadas por hash de commit e timestamp (`/var/www/rafaelsoje/releases/`), com alternância instantânea de links simbólicos (`current`) e suporte a rollback imediato.
* **Hardening com Fail2Ban:** Monitoramento ativo de conexões SSH e Nginx com bloqueio automático de varreduras e proteção contra força bruta.

---

## Estrutura de Diretórios

```bash
rafaelsoje.com/
├── public/                 # Assets estáticos, logos, manifest e imagens
├── src/
│   ├── app/                # App Router do Next.js
│   │   ├── api/            # Rotas de API (contact, track)
│   │   ├── privacidade/    # Termos e Política de Privacidade (LGPD)
│   │   ├── globals.css     # Estilos globais e tokens Tailwind
│   │   ├── layout.tsx      # Layout mestre com telemetria e fonts
│   │   └── page.tsx        # Página principal com todas as seções
│   ├── components/         # Componentes React modulares
│   │   ├── Header.tsx      # Barra de navegação e status operacional
│   │   ├── HeroSection.tsx # Abertura editorial e chamada de ação
│   │   ├── RafaelProfileSection.tsx # Perfil profissional e credenciais
│   │   ├── ProblemsServicesSection.tsx # Matriz de resolução de problemas
│   │   ├── ProjectsSection.tsx # Cases reais entregues em produção
│   │   ├── RecommendationsSection.tsx # Depoimentos com cartas assinadas
│   │   ├── PricingSection.tsx # Modalidades de atendimento e transparência
│   │   ├── FreeEvaluationSection.tsx # Diagnóstico técnico inicial
│   │   ├── TechMatrixSection.tsx # Matriz completa de tecnologias
│   │   ├── FAQSection.tsx  # Perguntas frequentes
│   │   ├── ContactSection.tsx # Formulário seguro com Turnstile e HubSpot
│   │   └── Footer.tsx      # Rodapé corporativo e dados de contato
│   └── lib/                # Módulos utilitários e bibliotecas de suporte
│       ├── analytics.ts    # Funções de telemetria GA4 e Clarity
│       ├── attribution.ts  # Tratamento de UTMs e fontes de tráfego
│       ├── hubspot.ts      # Cliente de envio para API v3 do HubSpot
│       ├── rate-limit.ts   # Rate limiting em memória por IP
│       ├── sanitize.ts     # Higienização de entradas de usuário
│       ├── turnstile.ts    # Verificação de token Cloudflare Turnstile
│       └── validation.ts   # Schemas Zod de validação
├── .env.example            # Especificação de variáveis de ambiente
└── next.config.ts          # Configurações do compilador Next.js
```

---

## Desenvolvimento Local

### Pré-requisitos
* Node.js 20.x ou superior
* npm, pnpm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rafaelsoje/rafaelsoje.com.git
cd rafaelsoje.com

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar.

---

## Licença & Autor

Desenvolvido por **Rafael Soje**.  
Bacharel em Ciência da Computação • Pós-Graduado em Segurança da Informação • Certificado LPIC-1 (Linux Professional Institute).

* **Website Oficial:** [rafaelsoje.com](https://rafaelsoje.com)  
* **LinkedIn:** [linkedin.com/in/rafaelsoje](https://linkedin.com/in/rafaelsoje)  
* **Contato Corporativo:** contato@rafaelsoje.com  
* **Localização:** Niterói / Rio de Janeiro, Brasil  
