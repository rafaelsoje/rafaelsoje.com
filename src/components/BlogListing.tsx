"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/blog";

interface BlogListingProps {
  posts: PostMeta[];
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
}

const INITIAL_TAGS_LIMIT = 6;

export function BlogListing({ posts, categories, tags }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  // Ordena tags por frequência (mais usadas primeiro)
  const sortedTags = useMemo(() => {
    return [...tags].sort((a, b) => b.count - a.count);
  }, [tags]);

  // Lista de tags visíveis (limitada inicialmente para não poluir a tela)
  const visibleTags = useMemo(() => {
    if (showAllTags) return sortedTags;
    const top = sortedTags.slice(0, INITIAL_TAGS_LIMIT);
    // Garante que a tag selecionada esteja visível se o usuário clicou nela
    if (selectedTag && !top.some((t) => t.tag === selectedTag)) {
      const activeObj = sortedTags.find((t) => t.tag === selectedTag);
      if (activeObj) return [...top, activeObj];
    }
    return top;
  }, [sortedTags, showAllTags, selectedTag]);

  // Filtragem combinada em memória
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

  const POSTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      const el = document.getElementById("blog-grid-top");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedTag !== null;

  return (
    <div>
      {/* Controles de Busca e Filtros Compactos e Escaláveis */}
      <div className="mb-8 p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4 shadow-lg">
        {/* Linha 1: Campo de Busca com Atalho e Limpeza */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-4 h-4"
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
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por assunto, comando, tecnologia (ex: Linux, Windows, Nginx, WAF)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              aria-label="Limpar pesquisa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Linha 2: Categorias em barra deslizável (evita empilhar na vertical) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          <span className="text-slate-400 uppercase tracking-wider text-[11px] shrink-0 mr-1">
            Assunto:
          </span>
          <button
            onClick={() => handleCategorySelect("all")}
            className={`px-3 py-1 rounded-md shrink-0 transition-all ${
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
              onClick={() => handleCategorySelect(c.category)}
              className={`px-3 py-1 rounded-md shrink-0 transition-all ${
                selectedCategory === c.category
                  ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {c.category} ({c.count})
            </button>
          ))}
        </div>

        {/* Linha 3: Tags compactas (apenas top 6 com expansão opcional sob demanda) */}
        {tags.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
              Tags:
            </span>
            {visibleTags.map((t) => {
              const isSelected = selectedTag === t.tag;
              return (
                <button
                  key={t.tag}
                  onClick={() => handleTagSelect(isSelected ? null : t.tag)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                    isSelected
                      ? "bg-teal-400/20 border border-teal-400 text-teal-300 font-semibold shadow-sm"
                      : "bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  #{t.tag} ({t.count})
                </button>
              );
            })}

            {/* Botão de expansão/colapso quando houver mais de 6 tags */}
            {sortedTags.length > INITIAL_TAGS_LIMIT && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-[11px] font-mono px-2 py-0.5 rounded text-teal-400 hover:text-teal-300 bg-teal-500/10 border border-teal-500/20 hover:border-teal-500/40 transition-colors"
              >
                {showAllTags
                  ? "Ocultar tags ▴"
                  : `+ Mais tags (${sortedTags.length - INITIAL_TAGS_LIMIT}) ▾`}
              </button>
            )}
          </div>
        )}

        {/* Linha 4: Resumo dos filtros ativos */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span>
                Mostrando <strong className="text-teal-400">{filteredPosts.length}</strong> de{" "}
                {posts.length} artigos
              </span>
              {selectedCategory !== "all" && (
                <span className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-[11px]">
                  {selectedCategory}
                </span>
              )}
              {selectedTag && (
                <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30 text-[11px]">
                  #{selectedTag}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-teal-400 hover:text-teal-300 underline underline-offset-2 font-semibold"
            >
              Limpar filtros &times;
            </button>
          </div>
        )}
      </div>

      {/* Grid de Artigos */}
      <div id="blog-grid-top" className="scroll-mt-8" />
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <p className="text-slate-300 font-medium text-sm mb-1">
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/30 p-6 sm:p-7 hover:border-teal-500/50 hover:bg-slate-900/60 transition-all duration-200 group shadow-lg"
              >
                <div>
                  {/* Metadados Superiores */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
                    <button
                      onClick={() => handleCategorySelect(post.category)}
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
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors tracking-tight mb-2.5">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Resumo */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                </div>

                {/* Rodapé do Card */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
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

          {/* Barra de Paginação */}
          {totalPages > 1 && (
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <span className="text-slate-400">
                Página <strong className="text-white">{currentPage}</strong> de{" "}
                <strong className="text-white">{totalPages}</strong> ({filteredPosts.length} artigos)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Página anterior"
                >
                  &larr; Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      currentPage === pageNum
                        ? "bg-teal-500 text-slate-950 font-bold shadow-md"
                        : "border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Próxima página"
                >
                  Próxima &rarr;
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
