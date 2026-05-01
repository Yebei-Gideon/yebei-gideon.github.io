import { Link } from "react-router-dom";
import { Section } from "./Section";
import { allPosts } from "@/lib/posts";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export const Blog = () => {
  const recent = allPosts.slice(0, 3);
  return (
    <Section
      id="blog"
      eyebrow="05 / writing"
      title={<>Notes on <span className="text-gradient">engineering</span> & security</>}
      description="A working engineer's notebook — software, cybersecurity, IoT, firmware, and the architecture decisions that hold systems together."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {recent.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group glass rounded-xl p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20">
                {post.category ?? "Article"}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {post.description}
            </p>
            <div className="text-xs font-mono text-muted-foreground">
              {formatDate(post.date)} · {post.readingMinutes} min read
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:gap-3 transition-all"
        >
          View all posts
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Section>
  );
};
