export const profile = {
  name: "Gideon Yebei",
  role: "Software Engineer · Systems & Security",
  tagline: "I design and build secure, scalable systems — from backend infrastructure to firmware.",
  email: "hello@gideonyebei.com",
  github: "https://github.com/gideonyebei",
  linkedin: "https://linkedin.com/in/gideonyebei",
  location: "Remote · Open to global opportunities",
  resumeUrl: "/resume.pdf",
};

export const trustChips = [
  "Systems engineering",
  "Backend infrastructure",
  "Cybersecurity mindset",
  "Monorepo architecture",
  "Embedded + web integration",
];

export const skills = [
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Nuxt", "Tailwind CSS", "Modern UI architecture"],
  },
  {
    category: "Backend",
    items: ["Bun", "Hono", "NestJS", "API design", "Distributed systems basics"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Prisma ORM", "Schema design", "Performance tuning"],
  },
  {
    category: "DevOps & Infra",
    items: ["Docker", "CI/CD", "Environment isolation", "Reproducible builds"],
  },
  {
    category: "Security",
    items: ["Secure system design", "Threat modeling", "Secure coding", "Hardening"],
  },
  {
    category: "Low-Level / Embedded",
    items: ["C/C++", "ESP32", "ESP8266", "Firmware architecture", "Hardware-aware design"],
  },
  {
    category: "Engineering",
    items: ["System design", "Debugging", "Automation", "Monorepo architecture"],
  },
];

export const projects = [
  {
    title: "FirmwareAnalyzer",
    description:
      "An automated platform for extracting, analyzing, and identifying vulnerabilities in IoT firmware images.",
    problem:
      "IoT firmware is notoriously opaque and difficult to audit at scale, leaving widespread vulnerabilities undiscovered.",
    solution:
      "Built a pipeline for firmware unpacking, binary analysis, and vulnerability scanning with automated report generation.",
    impact:
      "Enables scalable security auditing of embedded devices and reduces time-to-discovery for critical flaws.",
    stack: ["Python", "Docker", "Binwalk", "Ghidra", "React"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "SecureVault API",
    description:
      "A hardened secrets management service built on zero-trust principles.",
    problem:
      "Teams lack secure, self-hosted alternatives to cloud-based secrets managers.",
    solution:
      "Designed a microservice implementing envelope encryption, HSM integration, and full audit logging.",
    impact:
      "Provides secure, auditable secrets storage with seamless CI/CD integration.",
    stack: ["Go", "PostgreSQL", "HashiCorp Vault", "Kubernetes", "gRPC"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "ThreatMap",
    description:
      "A real-time threat intelligence dashboard aggregating and correlating multiple security feeds.",
    problem:
      "Security teams struggle to correlate indicators of compromise across fragmented data sources.",
    solution:
      "Built a unified system with automated correlation, visualization, and alerting.",
    impact:
      "Improves situational awareness and speeds up threat detection and response.",
    stack: ["TypeScript", "React", "Node.js", "ElasticSearch", "Redis"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "OTA Secure Update Framework",
    description:
      "A cryptographically secure OTA update system for embedded devices with rollback protection.",
    problem:
      "Firmware updates are high-risk and often lack integrity guarantees or recovery mechanisms.",
    solution:
      "Implemented signed updates, integrity verification, delta updates, and automatic rollback on failure.",
    impact:
      "Enables safe, bandwidth-efficient, and resilient firmware delivery for IoT systems.",
    stack: ["C", "ESP-IDF", "mbedTLS", "Python", "AWS IoT"],
    featured: true,
    links: { github: "#", demo: "#" },
  },

  {
    title: "Novaryzex Platform",
    description:
      "A modular, extensible publishing platform designed as a layered system.",
    problem:
      "Traditional CMS platforms struggle with scalability and extensibility.",
    solution:
      "Designed a layered architecture separating content, rendering, and editorial systems.",
    impact:
      "Foundation for a scalable, multi-product content ecosystem.",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Full-Stack Bun Monorepo System",
    description:
      "A production-grade monorepo with unified tooling and shared contracts.",
    problem:
      "Fragmented codebases slow development and create duplication.",
    solution:
      "Built a monorepo with shared types, reproducible environments, and strict boundaries.",
    impact:
      "Improved developer experience and faster delivery.",
    stack: ["Bun", "Nuxt", "NestJS", "Prisma", "Docker"],
    featured: false,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Embedded CI / Firmware Pipeline",
    description:
      "CI/CD pipelines for embedded systems with reproducible builds.",
    problem:
      "Embedded builds are fragile and inconsistent.",
    solution:
      "Automated firmware pipelines with environment isolation.",
    impact:
      "Improved reliability in embedded development workflows.",
    stack: ["C/C++", "ESP32", "CI/CD"],
    featured: false,
    links: { github: "#", demo: "#" },
  },
];

export const experience = [
  {
    period: "2024 — Present",
    role: "Software Engineer",
    org: "Independent / Systems-Focused Work",
    points: [
      "Designing full-stack systems with strong emphasis on backend architecture.",
      "Building monorepos and shared infrastructure using Bun, NestJS, and Prisma.",
      "Applying security principles across application and infrastructure layers.",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    org: "Client Work",
    points: [
      "Delivered production systems using WordPress and Shopify.",
      "Built integrations and automation for content and e-commerce workflows.",
      "Focused on performance, maintainability, and real-world usability.",
    ],
  },
  {
    period: "Ongoing",
    role: "Systems & Embedded R&D",
    org: "Personal Lab",
    points: [
      "Experimenting with firmware, IoT systems, and embedded pipelines.",
      "Building tools around secure development and automation.",
      "Exploring system design across web, backend, and hardware boundaries.",
    ],
  },
];

export const certifications = [
  { title: "Cybersecurity (Practical Track)", org: "Self-directed", year: "Ongoing" },
  { title: "Systems & Backend Engineering", org: "Project-based", year: "Ongoing" },
  { title: "Embedded Systems & Firmware", org: "Hands-on", year: "Ongoing" },
];

export const services = [
  {
    title: "System Design & Architecture",
    desc: "Design scalable, maintainable systems from backend to infrastructure.",
  },
  {
    title: "Backend Engineering",
    desc: "Robust APIs, database design, and service-oriented architectures.",
  },
  {
    title: "Secure System Development",
    desc: "Security-first engineering across code, infrastructure, and workflows.",
  },
  {
    title: "Full-Stack Systems",
    desc: "End-to-end applications with clean architecture and strong foundations.",
  },
  {
    title: "Automation & Tooling",
    desc: "Custom tools that eliminate repetitive engineering work.",
  },
  {
    title: "Embedded + Web Integration",
    desc: "Bridging firmware, IoT, and backend systems.",
  },
];

export const posts = [
  {
    title: "Designing Secure-by-Default Systems",
    category: "Security",
    excerpt:
      "Security is not a layer — it's a property of good system design.",
    date: "Coming soon",
  },
  {
    title: "Why Monorepos Fail (and How to Fix Them)",
    category: "Architecture",
    excerpt:
      "Most monorepos break due to poor boundaries — not tooling.",
    date: "Coming soon",
  },
  {
    title: "From Firmware to Backend: One System",
    category: "Systems",
    excerpt:
      "Thinking beyond silos — integrating embedded systems with modern backends.",
    date: "Coming soon",
  },
];

export const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];
