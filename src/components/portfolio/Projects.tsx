import { useState } from "react";
import { Section } from "./Section";
import { projects } from "@/data/portfolio";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const list = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <Section
      id="projects"
      eyebrow="03 / work"
      title={<>Selected <span className="text-gradient">projects</span></>}
      description="A mix of full-stack systems, client work, and security-focused tooling. Each project balances clean architecture with real-world delivery."
    >
      <div className="flex gap-2 mb-8">
        {(["featured", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-mono transition-all",
              filter === f
                ? "bg-primary/15 text-primary border border-primary/40"
                : "bg-secondary/60 text-muted-foreground border border-border hover:text-foreground"
            )}
          >
            {f === "featured" ? "Featured" : "All projects"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {list.map((p, i) => (
          <article
            key={p.title}
            className="group relative glass rounded-2xl p-7 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="font-mono text-xs text-primary">project_0{i + 1}</div>
              <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <a href={p.links.github} aria-label="GitHub" className="text-muted-foreground hover:text-primary">
                  <Github className="h-4 w-4" />
                </a>
                <a href={p.links.demo} aria-label="Live demo" className="text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="text-muted-foreground mb-5 leading-relaxed">{p.description}</p>

            <div className="space-y-2 text-sm mb-5 flex-1">
              <div className="flex gap-2">
                <span className="font-mono text-xs text-primary shrink-0 w-20">problem</span>
                <span className="text-muted-foreground">{p.problem}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-xs text-primary shrink-0 w-20">solution</span>
                <span className="text-muted-foreground">{p.solution}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-xs text-primary shrink-0 w-20">impact</span>
                <span className="text-muted-foreground">{p.impact}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="outlineGlow" asChild>
          <a href="#contact">
            Have a project in mind? <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
};
