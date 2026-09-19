import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Rafael Soje | Infraestrutura Linux, Cloud e Desenvolvimento Web",
  description:
    "Engenharia de infraestrutura Linux, servidores VPS, Cloudflare, segurança, certificados SSL, migrações sem instabilidade e desenvolvimento web para manter sua operação funcionando.",
  authors: [{ name: "Rafael Soje", url: "https://rafaelsoje.com" }],
  keywords: [
    "Infraestrutura Linux",
    "Servidores Linux",
    "Cloudflare",
    "Segurança da Informação",
    "Certificados SSL",
    "Migração de Servidores",
    "Desenvolvimento Web",
    "Rafael Soje",
    "Nginx",
    "PHP",
    "Next.js",
  ],
  alternates: {
    canonical: "https://rafaelsoje.com",
  },
  openGraph: {
    title: "Rafael Soje | Infraestrutura Linux, Cloud e Desenvolvimento Web",
    description:
      "Engenharia de infraestrutura Linux, servidores VPS, Cloudflare, segurança, SSL, migrações e desenvolvimento web para manter sua operação funcionando.",
    url: "https://rafaelsoje.com",
    siteName: "Rafael Soje",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Soje | Infraestrutura Linux, Cloud e Desenvolvimento Web",
    description:
      "Engenharia de infraestrutura Linux, servidores VPS, Cloudflare, segurança, SSL, migrações e desenvolvimento web para manter sua operação funcionando.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090d16] text-slate-100 selection:bg-teal-500 selection:text-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
