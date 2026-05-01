import { Section } from "./Section";
import { skills } from "@/data/portfolio";
import { Layers, Server, Database, Container, ShieldCheck, Wrench } from "lucide-react";

const icons = [Layers, Server, Database, Container, ShieldCheck, Wrench];

export const Skills = () => {
  return (
    <Section
      id="skills"
      eyebrow="02 / stack"
      title={<>The <span className="text-gradient">tools</span> I build with</>}
      description="Proficient across the full stack, with a strong bias toward backend engineering, secure architecture, and systems that scale cleanly."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={group.category}
              className="group relative glass rounded-xl p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border text-foreground/80 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
