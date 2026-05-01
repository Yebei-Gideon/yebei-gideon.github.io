import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Blog } from "@/components/portfolio/Blog";
import { CertificationsServices } from "@/components/portfolio/CertificationsServices";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollTop } from "@/components/portfolio/ScrollTop";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // JSON-LD structured data for SEO
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Gideon Yebei",
      jobTitle: "Software Engineer & Cybersecurity Specialist",
      url: typeof window !== "undefined" ? window.location.href : "",
      sameAs: [
        "https://github.com/gideonyebei",
        "https://linkedin.com/in/gideonyebei",
      ],
      knowsAbout: [
        "Software Engineering",
        "Cybersecurity",
        "Full-stack Development",
        "Backend Engineering",
        "Secure System Design",
      ],
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <CertificationsServices />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Index;
