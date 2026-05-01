import { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

export const Section = ({ id, eyebrow, title, description, children }: SectionProps) => {
  return (
    <section id={id} className="section-padding relative scroll-mt-20 md:scroll-mt-24">
      <div className="container-narrow">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-primary" />
            {eyebrow}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
