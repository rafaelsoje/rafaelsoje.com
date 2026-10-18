import { describe, it, expect } from "vitest";
import { parseFrontmatter, markdownToHtml } from "./markdown";
import { getAllPosts, getPostBySlug } from "./blog";

describe("Markdown & Frontmatter Parser", () => {
  it("extrai metadados do frontmatter YAML", () => {
    const raw = `---
title: "Título de Teste"
date: "2026-10-18"
tags: ["Linux", "Hardening"]
---
Conteúdo do artigo aqui.`;

    const { data, content } = parseFrontmatter(raw);
    expect(data.title).toBe("Título de Teste");
    expect(data.date).toBe("2026-10-18");
    expect(data.tags).toEqual(["Linux", "Hardening"]);
    expect(content).toBe("Conteúdo do artigo aqui.");
  });

  it("converte cabeçalhos e blocos de código em HTML", () => {
    const md = `## Meu Cabeçalho
\`\`\`bash
echo "Hello World"
\`\`\`
Texto com **negrito** e \`código inline\`.`;

    const html = markdownToHtml(md);
    expect(html).toContain('id="meu-cabecalho"');
    expect(html).toContain("<pre");
    expect(html).toContain('class="flex items-center justify-between');
    expect(html).toContain("echo &quot;Hello World&quot;");
    expect(html).toContain('<strong class="font-bold text-white">negrito</strong>');
  });

  it("carrega todos os posts do diretório content/posts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(2);
    expect(posts[0]).toHaveProperty("slug");
    expect(posts[0]).toHaveProperty("title");
    expect(posts[0]).toHaveProperty("readTime");
  });

  it("carrega um post específico por slug com HTML renderizado", () => {
    const post = getPostBySlug("hardening-linux-servidores-producao");
    expect(post).not.toBeNull();
    expect(post?.title).toContain("Hardening de Servidores Linux");
    expect(post?.contentHtml).toContain("<h2");
    expect(post?.contentHtml).toContain("<pre");
  });
});

