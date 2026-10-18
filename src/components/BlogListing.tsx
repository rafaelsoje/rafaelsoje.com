"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/blog";

interface BlogListingProps {
  posts: PostMeta[];
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
}

export function BlogListing({ posts, categories, tags }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filtro por Categoria
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false;
      }

      // Filtro por Tag
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      // Filtro por Busca (título, excerpt ou tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCat = post.category.toLowerCase().includes(query);

        if (!matchesTitle && !matchesExcerpt && !matchesTags && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedTag !== null;

  return (
    <div>
      {/* Controles de Busca e Filtros */}
      <div className="mb-10 space-y-6">
        {/* Barra de Pesquisa */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por assunto, comando, tecnologia (ex: Linux, Windows, Nginx, WAF)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
              aria-label="Limpar pesquisa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filtros por Categorias / Assunto */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
            Assunto:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedCategory === "all"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
          >
            Todos ({posts.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.category}
              onClick={() => setSelectedCategory(c.category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === c.category
                  ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {c.category} ({c.count})
            </button>
          ))}
        </div>

        {/* Nuvem de Tópicos / Tags Populares */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
              Tags:
            </span>
            {tags.map((t) => {
              const isSelected = selectedTag === t.tag;
              return (
                <button
                  key={t.tag}
                  onClick={() => setSelectedTag(isSelected ? null : t.tag)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                    isSelected
                      ? "bg-teal-400/20 border border-teal-400 text-teal-300 font-semibold"
                      : "bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  #{t.tag} ({t.count})
                </button>
              );
            })}
          </div>
        )}

        {/* Resumo de Filtros Ativos */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60">
          <div>
            Mostrando <span className="text-teal-400 font-semibold">{filteredPosts.length}</span> de{" "}
            {posts.length} publicações
            {selectedCategory !== "all" && (
              <span className="ml-2 px-2 py-0.5 bg-slate-800 text-slate-200 rounded">
                em {selectedCategory}
              </span>
            )}
            {selectedTag && (
              <span className="ml-2 px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                #{selectedTag}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-teal-400 hover:text-teal-300 underline underline-offset-2 flex items-center gap-1 font-semibold"
            >
              Limpar todos os filtros &times;
            </button>
          )}
        </div>
      </div>

      {/* Grid de Artigos Filtrados */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <p className="text-slate-300 font-medium text-base mb-1">
            Nenhum artigo encontrado com os filtros atuais.
          </p>
          <p className="text-slate-400 text-xs font-mono mb-4">
            Tente buscar por termos mais genéricos ou limpe os filtros.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg bg-teal-500 text-slate-950 font-semibold text-xs font-mono hover:bg-teal-400 transition-colors"
          >
            Limpar filtros e ver todos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 hover:border-teal-500/50 hover:bg-slate-900/60 transition-all duration-200 group shadow-lg"
            >
              <div>
                {/* Metadados Superiores */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-4">
                  <button
                    onClick={() => setSelectedCategory(post.category)}
                    className="text-teal-400 font-medium bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 hover:bg-teal-500/20 transition-colors"
                  >
                    {post.category}
                  </button>
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
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 hover:border-teal-500/40 hover:text-slate-200 transition-colors"
                    >
                      #{tag}
                    </button>
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
    </div>
  );
}

