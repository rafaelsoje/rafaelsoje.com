import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="artigos" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              CONHECIMENTO TÉCNICO & ARTIGOS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Publicações & Engenharia de Sistemas
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Artigos práticos sobre hardening de infraestrutura Linux, arquitetura de redes, segurança defensiva perimetral e DevSecOps.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-mono text-teal-400 hover:text-teal-300 font-semibold gap-1.5 shrink-0 transition-colors"
          >
            Ver todos os artigos <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/30 p-6 hover:border-teal-500/40 hover:bg-slate-900/60 transition-all duration-200 group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors tracking-tight mb-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
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
                  className="text-xs font-mono text-teal-400 group-hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  Ler artigo &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

