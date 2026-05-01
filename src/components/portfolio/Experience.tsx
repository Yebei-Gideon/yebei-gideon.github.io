import { Section } from "./Section";
import { experience } from "@/data/portfolio";

export const Experience = () => {
  return (
    <Section
      id="experience"
      eyebrow="04 / journey"
      title={<>Where I've <span className="text-gradient">shipped</span> work</>}
      description="A mix of independent engineering, contract work, and ongoing personal R&D — all focused on building software that ships and lasts."
    >
      <div className="relative">
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

        <div className="space-y-10">
          {experience.map((item, i) => (
            <div
              key={item.role}
              className={`relative grid md:grid-cols-2 gap-6 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <div className="font-mono text-xs text-primary mb-2">{item.period}</div>
                <h3 className="text-xl font-semibold mb-1">{item.role}</h3>
                <div className="text-muted-foreground text-sm">{item.org}</div>
              </div>

              <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:text-right md:pr-12"}`}>
                <div className="glass rounded-xl p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-primary font-mono shrink-0">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-glow" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
