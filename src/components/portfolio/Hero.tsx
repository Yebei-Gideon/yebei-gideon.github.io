import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, trustChips } from "@/data/portfolio";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-glow blur-3xl pointer-events-none animate-glow-pulse" aria-hidden />

      <div className="container-narrow relative z-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          {/* Terminal accent */}
          <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full glass">
            <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-muted-foreground">$ whoami</span>
            <span className="text-primary">{profile.name.toLowerCase().replace(" ", "_")}</span>
            <span className="text-primary animate-blink">▋</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Software Engineer &{" "}
            <span className="text-gradient">Cybersecurity</span>{" "}
            Specialist Building Secure, Scalable Digital Systems
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I design and build full-stack applications, robust backend services, and
            production-ready web systems — with security, performance, and clean architecture
            at the core.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outlineGlow" size="lg" asChild>
              <a href="#contact">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href={profile.resumeUrl} download>
                <Download className="h-4 w-4" /> Resume
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="text-xs font-mono px-3 py-1.5 rounded-full bg-secondary/60 border border-border text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal card */}
        <div className="hidden lg:block animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="glass rounded-xl p-1 shadow-elevated">
            <div className="rounded-lg bg-code-bg p-5 font-mono text-sm">
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/5">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-primary/70" />
                <span className="ml-2 text-xs text-muted-foreground">~/portfolio</span>
              </div>
              <div className="pt-4 space-y-2 text-code-fg">
                <div><span className="text-muted-foreground">$</span> cat profile.json</div>
                <div className="text-muted-foreground">{`{`}</div>
                <div className="pl-4"><span className="text-primary-glow">"role"</span>: <span>"Engineer"</span>,</div>
                <div className="pl-4"><span className="text-primary-glow">"focus"</span>: [</div>
                <div className="pl-8">"backend",</div>
                <div className="pl-8">"security",</div>
                <div className="pl-8">"systems"</div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-primary-glow">"status"</span>: <span className="text-primary">"available"</span></div>
                <div className="text-muted-foreground">{`}`}</div>
                <div className="pt-1"><span className="text-muted-foreground">$</span> <span className="animate-blink">▋</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
