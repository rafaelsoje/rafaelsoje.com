import fs from "fs";
import path from "path";
import { parseFrontmatter, markdownToHtml } from "./markdown";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  rawContent: string;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de leitura`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR);
  const posts: PostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);

    posts.push({
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "2026-10-18",
      excerpt: data.excerpt || "",
      category: data.category || "Engenharia & Infraestrutura",
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || "Rafael Soje",
      readTime: data.readTime || calculateReadTime(content),
    });
  }

  // Ordena por data decrescente
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const rawContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = parseFrontmatter(rawContent);
  const contentHtml = markdownToHtml(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "2026-10-18",
    excerpt: data.excerpt || "",
    category: data.category || "Engenharia & Infraestrutura",
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || "Rafael Soje",
    readTime: data.readTime || calculateReadTime(content),
    contentHtml,
    rawContent: content,
  };
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};

  for (const post of posts) {
    counts[post.category] = (counts[post.category] || 0) + 1;
  }

  return Object.entries(counts).map(([category, count]) => ({ category, count }));
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }

  return Object.entries(counts).map(([tag, count]) => ({ tag, count }));
}
