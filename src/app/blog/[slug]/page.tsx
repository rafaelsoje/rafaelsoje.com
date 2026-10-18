import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | Rafael Soje",
    };
  }

  const url = `https://rafaelsoje.com/blog/${slug}`;

  return {
    title: `${post.title} | Rafael Soje`,
    description: post.excerpt,
    authors: [{ name: post.author, url: "https://rafaelsoje.com" }],
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Rafael Soje",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Rafael Soje",
      url: "https://rafaelsoje.com",
      jobTitle: "Engenheiro de Sistemas Linux & DevSecOps",
    },
    publisher: {
      "@type": "Organization",
      name: "Rafael Soje",
      url: "https://rafaelsoje.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rafaelsoje.com/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 py-10 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-8 overflow-x-auto pb-2"
          >
            <Link
              href="/"
              className="hover:text-teal-400 transition-colors shrink-0"
            >
              Início
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-teal-400 transition-colors shrink-0"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate">{post.title}</span>
          </nav>

          {/* Cabeçalho do Artigo */}
          <header className="mb-10 pb-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
              <span className="px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold">
                {post.category}
              </span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Conteúdo Renderizado */}
          <div
            className="prose prose-invert max-w-none text-slate-200 leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Botões de Compartilhamento Social */}
          <ShareButtons title={post.title} slug={post.slug} />

          {/* Bibliografia Sugerida & Referências Técnicas */}
          {post.references && post.references.length > 0 && (
            <section
              aria-labelledby="bibliografia-titulo"
              className="my-10 rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-teal-400 uppercase tracking-wider">
                <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 id="bibliografia-titulo" className="font-bold">
                  Bibliografia Sugerida &amp; Fontes Oficiais
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {post.references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-mono">
                    <span className="text-teal-400 select-none font-bold">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Card do Autor */}
          <div className="mt-16 rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-400/80 shrink-0 shadow-md bg-slate-800">
              <Image
                src="/images/rafael-soje.jpg"
                alt="Rafael Soje"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-white">Rafael Soje</h4>
                <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  LPIC-1 Certified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Bacharel em Ciência da Computação e pós-graduado em Segurança da Informação. Especialista em infraestrutura Linux, arquitetura de sistemas corporativos, DevSecOps e observabilidade.
              </p>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <a
                  href="https://linkedin.com/in/rafaelsoje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                  LinkedIn &rarr;
                </a>
                <a
                  href="https://github.com/rafaelsoje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                  GitHub &rarr;
                </a>
                <a
                  href="mailto:contato@rafaelsoje.com"
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                  contato@rafaelsoje.com
                </a>
              </div>
            </div>
          </div>

          {/* CTA de Atendimento Técnico */}
          <div className="mt-8 rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-slate-900 to-slate-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                Atendimento Técnico Direto
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                Precisa implementar essa arquitetura ou resolver problemas críticos no seu ambiente?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Entre em contato para diagnósticos, sustentação de servidores ou projetos sob medida.
              </p>
            </div>
            <Link
              href="/#contato"
              className="shrink-0 px-5 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-teal-400 transition-colors shadow-md"
            >
              Falar com Rafael
            </Link>
          </div>

          {/* Navegação Inferior */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex justify-between items-center text-sm font-mono">
            <Link
              href="/blog"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-semibold"
            >
              &larr; Voltar para todos os artigos
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

