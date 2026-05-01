import { Section } from "./Section";
import { Shield, Code2, Zap } from "lucide-react";

export const About = () => {
  return (
    <Section
      id="about"
      eyebrow="01 / about"
      title={<>I build software that's <span className="text-gradient">secure, fast, and built to last.</span></>}
    >
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-10">
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            I'm a software engineer and cybersecurity specialist focused on building web
            applications, dashboards, automation tools, and secure digital systems. My work spans
            full-stack development, backend architecture, and modern infrastructure.
          </p>
          <p>
            I care deeply about <span className="text-foreground font-medium">maintainable code</span>,{" "}
            <span className="text-foreground font-medium">security</span>,{" "}
            <span className="text-foreground font-medium">performance</span>, and{" "}
            <span className="text-foreground font-medium">clean user experiences</span>. I enjoy
            solving real-world problems with practical, scalable solutions — and I work best when I
            can own a system end-to-end.
          </p>
          <p>
            Outside of code, I'm continually exploring how systems break, how they should be
            defended, and how engineering teams can ship faster without trading away quality.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: Shield,
              title: "What I value",
              text: "Security by default. Clarity over cleverness. Tools that respect their users.",
            },
            {
              icon: Code2,
              title: "How I work",
              text: "Small, focused changes. Strong typing. Tests where they matter. Documentation as part of the code.",
            },
            {
              icon: Zap,
              title: "Currently focused on",
              text: "Bun-based monorepos, secure backend architecture, and production-grade automation.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass rounded-xl p-5 hover:shadow-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
