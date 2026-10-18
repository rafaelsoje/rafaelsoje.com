import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Artigos Técnicos & Engenharia | Rafael Soje",
  description:
    "Artigos e tutoriais práticos sobre infraestrutura Linux, segurança defensiva perimetral, DevSecOps, Nginx e desenvolvimento de software corporativo por Rafael Soje.",
  alternates: {
    canonical: "https://rafaelsoje.com/blog",
  },
  openGraph: {
    title: "Artigos Técnicos & Engenharia | Rafael Soje",
    description:
      "Publicações de alto nível sobre infraestrutura Linux, DevSecOps, segurança da informação e engenharia de software.",
    url: "https://rafaelsoje.com/blog",
    siteName: "Rafael Soje",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                ENGENHARIA & INFRAESTRUTURA
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Artigos Técnicos & Práticas de Engenharia
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Análises aprofundadas, arquitetura defensiva, administração de sistemas Linux e DevSecOps aplicados ao mundo real.
              </p>

              {/* Categorias */}
              {categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800/60">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
                    Tópicos:
                  </span>
                  {categories.map((c) => (
                    <span
                      key={c.category}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono"
                    >
                      {c.category} ({c.count})
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Grid de Artigos */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-400 font-mono text-sm">
                  Nenhum artigo publicado no momento.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 hover:border-teal-500/50 hover:bg-slate-900/60 transition-all duration-200 group shadow-lg"
                  >
                    <div>
                      {/* Metadados Superiores */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-4">
                        <span className="text-teal-400 font-medium bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("pt-BR", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Título */}
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors tracking-tight mb-3">
                        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                          {post.title}
                        </Link>
                      </h2>

                      {/* Resumo */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Rodapé do Card */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-mono text-teal-400 group-hover:text-teal-300 flex items-center gap-1 font-semibold"
                        aria-label={`Ler artigo completo: ${post.title}`}
                      >
                        Ler artigo <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

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

