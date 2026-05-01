import { Section } from "./Section";
import { certifications, services } from "@/data/portfolio";
import { Award, CheckCircle2 } from "lucide-react";

export const CertificationsServices = () => {
  return (
    <Section
      id="certifications"
      eyebrow="06 / credentials"
      title={<>Achievements & <span className="text-gradient">services</span></>}
      description="Continuous learning paired with concrete services I offer to teams and clients."
    >
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Certifications */}
        <div>
          <h3 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" /> Certifications & Achievements
          </h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="glass rounded-lg p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="font-medium">{cert.title}</div>
                  <div className="text-xs text-muted-foreground">{cert.org}</div>
                </div>
                <div className="font-mono text-xs text-primary">{cert.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> What I Offer
          </h3>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-lg p-4 hover:border-primary/40 transition-colors">
                <div className="font-medium mb-1">{s.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
