import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollTop } from "@/components/portfolio/ScrollTop";
import { allPosts } from "@/lib/posts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const decoded = tag ? decodeURIComponent(tag) : "";
  const posts = useMemo(
    () => allPosts.filter((p) => (p.tags ?? []).includes(decoded)),
    [decoded]
  );

  useEffect(() => {
    document.title = `${decoded} — Gideon Yebei Blog`;
  }, [decoded]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="container-narrow mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" /> All posts
          </Link>
          <div className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-primary" />
            tag
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-gradient">#{decoded}</span>
          </h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"} tagged with {decoded}.
          </p>
        </section>

        <section className="container-narrow">
          {posts.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center text-muted-foreground">
              No posts under this tag yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group glass rounded-xl p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20 self-start mb-4">
                    {p.category ?? "Article"}
                  </span>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="text-xs font-mono text-muted-foreground">
                    {formatDate(p.date)} · {p.readingMinutes} min
                  </div>
                </Link>
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

export default TagPage;
