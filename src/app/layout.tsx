import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rafaelsoje.com"),
  title: "Rafael Soje | Infraestrutura, Cloud e Desenvolvimento Web",
  description:
    "Soluções profissionais para servidores Linux e Windows Server: diagnóstico de instabilidade, configuração, migrações seguras, backups, segurança e desenvolvimento de sistemas web sob medida.",
  authors: [{ name: "Rafael Soje", url: "https://rafaelsoje.com" }],
  keywords: [
    "Infraestrutura Linux",
    "Servidores Linux",
    "Windows Server",
    "Cloudflare",
    "Segurança da Informação",
    "Certificados SSL",
    "Migração de Servidores",
    "Desenvolvimento Web",
    "configuração de servidores",
    "administração de servidores",
    "suporte a servidores",
    "migração de sites",
    "backup automatizado",
    "recuperação de dados",
    "segurança de servidores",
    "diagnóstico DNS",
    "desenvolvimento de sistemas",
    "manutenção de sistemas",
    "Rafael Soje",
    "Nginx",
    "PHP",
    "Next.js",
  ],
  alternates: {
    canonical: "https://rafaelsoje.com",
  },
  openGraph: {
    title: "Rafael Soje | Infraestrutura, Cloud e Desenvolvimento Web",
    description:
      "Atendimento técnico direto para servidores Linux e Windows Server, migrações seguras, diagnóstico de instabilidade, backup, SSL e desenvolvimento de sistemas sob medida.",
    url: "https://rafaelsoje.com",
    siteName: "Rafael Soje",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Soje | Infraestrutura, Cloud e Desenvolvimento Web",
    description:
      "Atendimento técnico direto para servidores Linux e Windows Server, migrações seguras, diagnóstico de instabilidade, backup, SSL e desenvolvimento de sistemas sob medida.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rafael Soje",
  url: "https://rafaelsoje.com",
  jobTitle: "Consultor de Infraestrutura e Desenvolvedor Web",
  description:
    "Serviços profissionais de infraestrutura de servidores Linux e Windows Server, Cloud, segurança da informação, rotinas de backup e desenvolvimento de sistemas web sob medida.",
  email: "contato@rafaelsoje.com",
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "Linux",
    "Windows Server",
    "Cloud Computing",
    "Cloudflare",
    "Next.js",
    "PHP",
    "Laravel",
    "DevOps",
    "Segurança da Informação",
    "Backup e Recuperação",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var _next;var defineInterceptor=function(){Object.defineProperty(window,'next',{configurable:true,enumerable:true,get:function(){return _next},set:function(val){if(val&&typeof val==='object'){try{delete val.version}catch(e){}_next=new Proxy(val,{get:function(t,p,r){if(p==='version')return undefined;return Reflect.get(t,p,r)},set:function(t,p,v,r){if(p==='version')return true;return Reflect.set(t,p,v,r)},has:function(t,p){if(p==='version')return false;return Reflect.has(t,p)},ownKeys:function(t){return Reflect.ownKeys(t).filter(function(k){return k!=='version'})},getOwnPropertyDescriptor:function(t,p){if(p==='version')return undefined;return Reflect.getOwnPropertyDescriptor(t,p)}});return}_next=val}})};var existing=window.next;defineInterceptor();if(existing){window.next=existing;}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090d16] text-slate-100 selection:bg-teal-500 selection:text-slate-950`}
      >
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {/* HubSpot Tracking Script (Portal Oficial 52058679) */}
        <Script
          id="hubspot-tracking"
          src={`https://js.hs-scripts.com/${hubspotPortalId || "52058679"}.js`}
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity (Gravação de tela e mapa de calor gratuito) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}

        {/* Rastreador próprio de abertura de links de prospecção (Imune a AdBlock) */}
        <Script
          id="prospection-pageview"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var p = window.location.pathname + window.location.search;
                  var data = JSON.stringify({
                    event: "page_view",
                    pagePath: p,
                    referrer: document.referrer || undefined,
                    screen: { width: window.innerWidth, height: window.innerHeight }
                  });
                  if (navigator.sendBeacon) {
                    navigator.sendBeacon("/api/track", data);
                  } else {
                    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: data, keepalive: true }).catch(function(){});
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
