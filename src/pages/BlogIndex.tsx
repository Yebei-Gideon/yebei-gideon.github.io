import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Clock, Calendar, Tag as TagIcon, Sparkles } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollTop } from "@/components/portfolio/ScrollTop";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allPosts, getAllTags, getAllCategories, getFeaturedPosts, type Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const PostCard = ({ post, featured = false }: { post: Post; featured?: boolean }) => (
  <Link
    to={`/blog/${post.slug}`}
    className={cn(
      "group glass rounded-xl p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col",
      featured && "md:p-7"
    )}
  >
    <div className="flex items-center justify-between mb-4">
      <span className="font-mono text-[11px] uppercase tracking-wider text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20">
        {post.category ?? "Article"}
      </span>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
    </div>
    <h3
      className={cn(
        "font-semibold mb-2 group-hover:text-primary transition-colors leading-snug",
        featured ? "text-xl md:text-2xl" : "text-lg"
      )}
    >
      {post.title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
      {post.description}
    </p>
    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
      <span className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        {formatDate(post.date)}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {post.readingMinutes} min
      </span>
    </div>
    {post.tags && post.tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/50">
        {post.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    )}
  </Link>
);

const BlogIndex = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featured = useMemo(() => getFeaturedPosts(3), []);
  const tags = useMemo(() => getAllTags(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeTag && !(p.tags ?? []).includes(activeTag)) return false;
      if (!q) return true;
      const hay = [p.title, p.description, ...(p.tags ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeCategory, activeTag]);

  useEffect(() => {
    document.title = "Blog — Gideon Yebei | Engineering, Security & IoT";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Notes on software engineering, cybersecurity, IoT, firmware, and systems development by Gideon Yebei."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container-narrow mb-12 md:mb-16 relative">
          <div className="absolute inset-0 hero-glow pointer-events-none -z-10" aria-hidden />
          <div className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-primary" />
            ~/blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Engineering <span className="text-gradient">notes</span> & field reports
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A working engineer's notebook — software, cybersecurity, IoT, firmware, and the
            architecture decisions that hold systems together.
          </p>
        </section>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="container-narrow mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                Featured
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((p) => (
                <PostCard key={p.slug} post={p} featured />
              ))}
            </div>
          </section>
        )}

        {/* Search + filters */}
        <section className="container-narrow mb-10">
          <div className="glass rounded-xl p-5 space-y-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags, topics…"
                className="pl-10 bg-background/60"
                aria-label="Search posts"
              />
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mr-1">
                  Category:
                </span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    "text-xs font-mono px-3 py-1 rounded-full border transition-colors",
                    activeCategory === null
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c === activeCategory ? null : c)}
                    className={cn(
                      "text-xs font-mono px-3 py-1 rounded-full border transition-colors",
                      activeCategory === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
                  <TagIcon className="h-3 w-3" /> Tags:
                </span>
                {tags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={cn(
                      "text-[11px] font-mono px-2 py-1 rounded transition-colors",
                      activeTag === tag
                        ? "bg-primary/15 text-primary border border-primary/40"
                        : "bg-muted text-muted-foreground hover:text-foreground border border-transparent"
                    )}
                  >
                    {tag}
                    <span className="opacity-60 ml-1">{count}</span>
                  </button>
                ))}
              </div>
            )}

            {(activeCategory || activeTag || query) && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory(null);
                    setActiveTag(null);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* All posts */}
        <section className="container-narrow">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-6">
            {activeCategory || activeTag || query ? "Results" : "All posts"}
          </h2>
          {filtered.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center text-muted-foreground">
              No posts match your filters.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default BlogIndex;
