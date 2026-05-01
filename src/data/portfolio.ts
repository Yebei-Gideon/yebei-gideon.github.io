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
    title: "Novaryzex Platform",
    description:
      "A modular, extensible publishing platform designed as a layered system — not a traditional CMS.",
    problem: "Most CMS platforms collapse under scale, customization, or team workflows.",
    solution:
      "Designed a layered architecture separating content, rendering, and editorial systems for long-term extensibility.",
    impact:
      "Foundation for a scalable, multi-product content ecosystem (blogging, editorial, community).",
    stack: ["TypeScript", "Bun", "PostgreSQL", "Modular architecture"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Full-Stack Bun Monorepo System",
    description:
      "A production-grade monorepo combining Bun, Nuxt, NestJS, and Prisma with full Docker orchestration.",
    problem:
      "Fragmented codebases slow teams down and create duplication across frontend/backend.",
    solution:
      "Unified monorepo with shared contracts, strict typing, and reproducible environments.",
    impact:
      "Faster iteration, cleaner collaboration, and production-ready developer experience.",
    stack: ["Bun", "Nuxt", "NestJS", "Prisma", "PostgreSQL", "Docker"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Secure Automation Toolkit",
    description:
      "Engineering automation tools built with security-first principles and auditability.",
    problem:
      "Manual workflows introduce risk, inconsistency, and security blind spots.",
    solution:
      "Designed automation pipelines with secure defaults, logging, and reproducibility.",
    impact:
      "Reduced operational risk while improving engineering velocity.",
    stack: ["TypeScript", "Bun", "Automation", "Security design"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Embedded CI / Firmware Pipeline",
    description:
      "Reliable CI/CD pipelines for ESP32/ESP8266 firmware with reproducible builds.",
    problem:
      "Embedded development lacks consistency and breaks across environments.",
    solution:
      "Structured firmware projects with automated builds and environment isolation.",
    impact:
      "Stability and confidence in shipping hardware-integrated systems.",
    stack: ["C/C++", "ESP32", "ESP8266", "CI/CD"],
    featured: true,
    links: { github: "#", demo: "#" },
  },
  {
    title: "Client Systems (WordPress & Shopify)",
    description:
      "Delivered production systems for clients across e-commerce and content platforms.",
    problem:
      "Businesses need reliable systems, not just websites.",
    solution:
      "Custom integrations, performance optimization, and maintainable builds.",
    impact:
      "Shipped systems that scale with real business usage.",
    stack: ["WordPress", "Shopify", "PHP", "Liquid", "JavaScript"],
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
