import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { profile, navItems } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-10">
      <div className="container-narrow py-12 grid md:grid-cols-3 gap-8">
        <div>
          <a href="#home" className="flex items-center gap-2 font-mono text-sm font-semibold mb-3">
            <Terminal className="h-4 w-4 text-primary" />
            <span>gideon<span className="text-primary">.yebei</span></span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {profile.tagline} Engineering with care, security, and craft.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs text-muted-foreground uppercase mb-3">Navigate</h4>
          <ul className="grid grid-cols-2 gap-2">
            {navItems.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs text-muted-foreground uppercase mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href={profile.github} aria-label="GitHub" className="h-10 w-10 glass rounded-lg flex items-center justify-center hover:text-primary hover:shadow-glow transition-all" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="h-10 w-10 glass rounded-lg flex items-center justify-center hover:text-primary hover:shadow-glow transition-all" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="h-10 w-10 glass rounded-lg flex items-center justify-center hover:text-primary hover:shadow-glow transition-all">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-narrow py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
            <span>Available for new opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
