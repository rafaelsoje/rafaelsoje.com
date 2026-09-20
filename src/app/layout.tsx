import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
        {hubspotPortalId && /^\d+$/.test(hubspotPortalId) && (
          <Script
            id="hubspot-tracking"
            src={`https://js.hs-scripts.com/${hubspotPortalId}.js`}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
