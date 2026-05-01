import { mdxComponents } from "@/components/blog/mdx-components";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollTop } from "@/components/portfolio/ScrollTop";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import {
  buildToc,
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
  type TocItem,
} from "@/lib/posts";
import { cn } from "@/lib/utils";
import { MDXProvider } from "@mdx-js/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  Clock,
  Linkedin,
  Link as LinkIcon,
  Share2,
  Twitter,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const Toc = ({ items }: { items: TocItem[] }) => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-2">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </div>
      <ul className="space-y-1.5 text-sm border-l border-border">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-6" : "pl-3"}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block -ml-px border-l-2 py-1 pl-3 transition-colors",
                active === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const post = slug ? getPostBySlug(slug) : undefined;
  const { toast } = useToast();

  const toc = useMemo(() => (post ? buildToc(post.raw) : []), [post]);
  const adjacent = useMemo(() => (slug ? getAdjacentPosts(slug) : { prev: undefined, next: undefined }), [slug]);
  const related = useMemo(() => (post ? getRelatedPosts(post, 3) : []), [post]);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug, hash]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Gideon Yebei`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", post.description);

    // Open Graph + Twitter
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) ?? [];
        if (key && val) el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[property="og:title"]', "content", post.title);
    setMeta('meta[property="og:description"]', "content", post.description);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[name="twitter:title"]', "content", post.title);
    setMeta('meta[name="twitter:description"]', "content", post.description);

    // Article JSON-LD
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author ?? profile.name },
      keywords: (post.tags ?? []).join(", "),
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const Mdx = post.Component;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const share = (target: "twitter" | "linkedin" | "copy") => {
    if (target === "copy") {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "Article URL copied to clipboard." });
      return;
    }
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(post.title);
    const href =
      target === "twitter"
        ? `https://twitter.com/intent/tweet?url=${u}&text=${t}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Article header */}
        <article>
          <header className="container-prose mb-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ChevronLeft className="h-3 w-3" /> Back to blog
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.category && (
                <span className="font-mono text-[11px] uppercase tracking-wider text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20">
                  {post.category}
                </span>
              )}
              {post.tags?.slice(0, 3).map((t) => (
                <Link
                  key={t}
                  to={`/blog/tag/${encodeURIComponent(t)}`}
                  className="text-[11px] font-mono px-2 py-1 rounded bg-muted text-muted-foreground hover:text-primary transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-b border-border py-4">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">
                  {post.author ?? profile.name}
                </span>
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read
              </span>
              <div className="ml-auto flex items-center gap-1">
                <span className="font-mono text-[11px] text-muted-foreground mr-1 flex items-center gap-1">
                  <Share2 className="h-3 w-3" /> Share
                </span>
                <Button variant="ghost" size="icon" onClick={() => share("twitter")} aria-label="Share on X">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => share("linkedin")} aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => share("copy")} aria-label="Copy link">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Body + sidebar TOC */}
          <div className="container-narrow grid lg:grid-cols-[minmax(0,1fr)_240px] gap-10">
            <div className="prose-mdx max-w-2xl mx-auto lg:mx-0">
              <MDXProvider components={mdxComponents}>
                <Mdx />
              </MDXProvider>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Toc items={toc} />
              </div>
            </aside>
          </div>
        </article>

        {/* Author card */}
        <section className="container-prose mt-16">
          <div className="glass rounded-xl p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center text-primary-foreground font-bold">
              {(post.author ?? profile.name)
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="font-semibold">{post.author ?? profile.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {profile.role}. Writing about engineering, security, IoT, and the architecture
                that holds real systems together.
              </div>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="container-narrow mt-12 grid md:grid-cols-2 gap-4">
          {adjacent.prev ? (
            <Link
              to={`/blog/${adjacent.prev.slug}`}
              className="group glass rounded-xl p-5 hover:shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                <ArrowLeft className="h-3 w-3" /> Newer
              </div>
              <div className="font-semibold group-hover:text-primary transition-colors">
                {adjacent.prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {adjacent.next ? (
            <Link
              to={`/blog/${adjacent.next.slug}`}
              className="group glass rounded-xl p-5 hover:shadow-glow hover:-translate-y-0.5 transition-all md:text-right"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2 md:justify-end">
                Older <ArrowRight className="h-3 w-3" />
              </div>
              <div className="font-semibold group-hover:text-primary transition-colors">
                {adjacent.next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container-narrow mt-16">
            <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Related reading
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group glass rounded-xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-primary mb-2">
                    {p.category}
                  </div>
                  <div className="font-semibold group-hover:text-primary transition-colors">
                    {p.title}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mt-3">
                    {p.readingMinutes} min read
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default BlogPost;
