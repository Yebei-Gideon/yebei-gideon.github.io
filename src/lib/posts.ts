import type { ComponentType } from "react";

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  coverImage?: string;
  draft?: boolean;
};

export type PostModule = {
  default: ComponentType<Record<string, unknown>>;
  frontmatter: PostFrontmatter;
};

export type PostMeta = PostFrontmatter & {
  readingTime: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  Component: ComponentType<Record<string, unknown>>;
  raw: string;
};

// Eagerly import all MDX posts (compiled components) and raw source for TOC/reading-time.
const modules = import.meta.glob<PostModule>("../../content/posts/*.mdx", {
  eager: true,
});

const raws = import.meta.glob<string | { default?: string; }>(
  "../../content/posts/*.mdx",
  {
  eager: true,
  query: "?raw",
  import: "default",
  },
);

function normalizeRawText(input: unknown): string {
  if (typeof input === "string") return input;
  if (input && typeof input === "object" && "default" in input) {
    const maybeDefault = (input as { default?: unknown; }).default;
    if (typeof maybeDefault === "string") return maybeDefault;
  }
  return "";
}

function estimateReadingTime(text: string): { text: string; minutes: number; } {
  // Estimate based on typical adult reading speed.
  const words = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordsPerMinute = 225;
  const minutes = Math.max(1, words / wordsPerMinute);
  const rounded = Math.max(1, Math.round(minutes));

  return {
    text: `${rounded} min read`,
    minutes,
  };
}

function buildPosts(): Post[] {
  const posts: Post[] = [];
  for (const [path, mod] of Object.entries(modules)) {
    const fm = mod.frontmatter as PostFrontmatter | undefined;
    if (!fm || !fm.slug) continue;
    if (fm.draft && import.meta.env.PROD) continue;

    const raw = normalizeRawText(raws[path]);
    const stats = estimateReadingTime(raw);

    posts.push({
      ...fm,
      readingTime: stats.text,
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
      Component: mod.default,
      raw,
    });
  }
  // Newest first
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export const allPosts: Post[] = buildPosts();

export const getPostBySlug = (slug: string): Post | undefined =>
  allPosts.find((p) => p.slug === slug);

export const getAllTags = (): { tag: string; count: number }[] => {
  const map = new Map<string, number>();
  for (const p of allPosts) {
    for (const t of p.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

export const getAllCategories = (): string[] => {
  const set = new Set<string>();
  for (const p of allPosts) if (p.category) set.add(p.category);
  return [...set].sort();
};

export const getFeaturedPosts = (limit = 3): Post[] =>
  allPosts.filter((p) => p.featured).slice(0, limit);

export const getRelatedPosts = (post: Post, limit = 3): Post[] => {
  const tags = new Set(post.tags ?? []);
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.tags ?? []).filter((t) => tags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
};

export const getAdjacentPosts = (slug: string) => {
  const idx = allPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  // allPosts is newest-first, so "next" article (older) is idx+1, "previous" (newer) is idx-1
  return {
    prev: idx > 0 ? allPosts[idx - 1] : undefined,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : undefined,
  };
};

// Extract H2/H3 headings from raw MDX for table of contents
export type TocItem = { id: string; text: string; level: 2 | 3 };

export const buildToc = (raw: string): TocItem[] => {
  const lines = raw.split("\n");
  const items: TocItem[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }
  return items;
};
