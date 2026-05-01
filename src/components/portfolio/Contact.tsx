import { useState } from "react";
import { z } from "zod";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { profile } from "@/data/portfolio";
import { Mail, Github, Linkedin, MapPin, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: "Please check your input",
        description: result.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    // PLACEHOLDER: wire to your backend / email service
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast({
      title: "Message ready ✓",
      description: "Form is wired up — connect your backend or email service to send.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section
      id="contact"
      eyebrow="07 / contact"
      title={<>Let's <span className="text-gradient">build</span> something</>}
      description="Open to engineering roles, contract work, and collaboration on projects that take security and craft seriously."
    >
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
        {/* Info card */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-6 space-y-4">
            <ContactItem icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactItem icon={Github} label="GitHub" value="github.com/gideonyebei" href={profile.github} />
            <ContactItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/gideonyebei" href={profile.linkedin} />
            <ContactItem icon={MapPin} label="Location" value={profile.location} />
          </div>

          <div className="glass rounded-xl p-6">
            <div className="font-mono text-xs text-primary mb-2">resume.pdf</div>
            <div className="font-semibold mb-1">Grab my CV</div>
            <p className="text-sm text-muted-foreground mb-4">
              The full breakdown — experience, projects, and skills.
            </p>
            <Button variant="hero" className="w-full" asChild>
              <a href={profile.resumeUrl} download>
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="glass rounded-xl p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" />
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell me about your project, role, or question..."
              required
              maxLength={2000}
            />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : <>Send message <Send className="h-4 w-4" /></>}
          </Button>
        </form>
      </div>
    </Section>
  );
};

const Field = ({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} type={type} placeholder={placeholder} required maxLength={255} />
  </div>
);

const ContactItem = ({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) => {
  const Inner = (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground font-mono">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-primary transition-colors" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {Inner}
    </a>
  ) : Inner;
};
