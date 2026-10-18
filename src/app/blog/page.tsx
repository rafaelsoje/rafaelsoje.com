import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Artigos Técnicos & Engenharia | Rafael Soje",
  description:
    "Artigos e tutoriais práticos sobre infraestrutura Linux, Windows Server, ferramentas, DevSecOps, Nginx e segurança defensiva por Rafael Soje.",
  alternates: {
    canonical: "https://rafaelsoje.com/blog",
  },
  openGraph: {
    title: "Artigos Técnicos & Engenharia | Rafael Soje",
    description:
      "Publicações de alto nível sobre infraestrutura Linux, Windows Server, ferramentas, DevSecOps e segurança da informação.",
    url: "https://rafaelsoje.com/blog",
    siteName: "Rafael Soje",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section Compacto */}
        <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent py-8 sm:py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                BASE DE CONHECIMENTO & ENGENHARIA
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                Artigos Técnicos &amp; Práticas de Engenharia
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Análises aprofundadas sobre administração Linux, Windows Server, ferramentas, DevSecOps e segurança defensiva aplicados ao ambiente real.
              </p>
            </div>
          </div>
        </section>

        {/* Listagem Interativa com Busca e Filtros */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogListing posts={posts} categories={categories} tags={tags} />

            {/* Banner de Chamada para Consultoria Técnica */}
            <div className="mt-16 rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-slate-900 to-slate-900/60 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                  Consultoria & Engenharia
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Precisa de suporte ou implementação em infraestrutura Linux e segurança?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Atendimento direto e sem intermediários para diagnósticos de instabilidade, hardening de servidores, migrações críticas e arquitetura web.
                </p>
              </div>
              <Link
                href="/#contato"
                className="shrink-0 px-6 py-3 rounded-lg bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-colors shadow-md"
              >
                Solicitar Avaliação Técnica
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
