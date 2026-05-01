# Gideon Yebei Portfolio and Blog

Modern developer portfolio and technical blog built with React, TypeScript, Vite, Tailwind CSS, and MDX.

This repository contains a single-page portfolio experience plus a fully integrated blog system with MDX content, syntax-highlighted code blocks, tags, categories, related posts, and article metadata.

## Overview

The app has two main experiences:

- Portfolio landing page at `/` with section-based navigation.
- Blog platform at `/blog` and `/blog/:slug`, generated from MDX files in `content/posts`.

The project is optimized for:

- Fast local iteration (Vite + SWC).
- Typed frontend architecture (TypeScript + React Router).
- Content authoring via Markdown/MDX with frontmatter.
- Design consistency through a CSS variable-based design system and Tailwind utilities.

## Key Features

- Responsive portfolio with fixed navbar and smooth section scrolling.
- Theme toggle with persisted preference (`localStorage`).
- MDX-powered blog posts with:
	- frontmatter metadata
	- table of contents (H2/H3 extraction)
	- heading anchors
	- syntax highlighting via `rehype-pretty-code` + Shiki
	- tags, categories, featured posts, and related posts
	- previous/next post navigation
	- social share actions and SEO metadata
- Search and filtering on blog index page.
- Type-safe post loading utility with runtime-safe raw MDX normalization.
- Vitest setup (jsdom + Testing Library bootstrap).

## Tech Stack

- React 18
- TypeScript
- Vite 5 (`@vitejs/plugin-react-swc`)
- React Router 6
- Tailwind CSS 3 + tailwindcss-animate
- MDX (`@mdx-js/rollup`, `@mdx-js/react`)
- Unified plugins:
	- `remark-gfm`
	- `remark-frontmatter`
	- `remark-mdx-frontmatter`
	- `rehype-slug`
	- `rehype-autolink-headings`
	- `rehype-pretty-code`
- Radix UI primitives + shadcn-style UI components
- Vitest + Testing Library
- ESLint 9 + typescript-eslint

## Project Structure

```text
.
|- content/
|  |- posts/                # MDX blog content
|- public/
|  |- robots.txt
|- src/
|  |- components/
|  |  |- blog/              # MDX component mappings
|  |  |- portfolio/         # Portfolio page sections and layout
|  |  |- ui/                # Reusable UI primitives
|  |- data/
|  |  |- portfolio.ts       # Profile, nav items, projects, experience data
|  |- hooks/
|  |  |- use-theme.ts       # Theme persistence and toggling
|  |- lib/
|  |  |- posts.ts           # MDX post loading, sorting, tagging, TOC helpers
|  |- pages/
|  |  |- Index.tsx          # Portfolio landing page
|  |  |- BlogIndex.tsx      # Blog listing/search/filter page
|  |  |- BlogPost.tsx       # Individual article page
|  |  |- TagPage.tsx        # Tag archive page
|  |- test/                 # Vitest setup and tests
|  |- App.tsx               # Route definitions
|  |- index.css             # Design tokens and global styles
|- vite.config.ts           # Vite + MDX pipeline config
|- tailwind.config.ts       # Tailwind tokens and animations
```

## Routes

- `/` - Portfolio home with section anchors.
- `/blog` - Blog index, search, tags, categories, featured posts.
- `/blog/:slug` - Individual blog article page.
- `/blog/tag/:tag` - Posts filtered by tag.
- `*` - Not found page.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (or Bun if you prefer)

### Install

```bash
bun install
```

If you prefer Bun:

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

Default dev server runs on port `8080`.

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Available Scripts

- `bun run dev` - Start Vite dev server.
- `bun run build` - Build production bundle.
- `bun run build:dev` - Build using development mode.
- `bun run preview` - Serve built app locally.
- `bun run lint` - Run ESLint.
- `bun run test` - Run Vitest once.
- `bun run test:watch` - Run Vitest in watch mode.

## Writing Blog Posts

Create a new file in `content/posts`, for example:

`content/posts/my-new-post.mdx`

Use frontmatter fields compatible with `src/lib/posts.ts`:

```mdx
---
title: "My New Post"
slug: "my-new-post"
description: "One-line summary of the post"
date: "2026-05-01"
author: "Gideon Yebei"
tags:
	- architecture
	- security
category: "Engineering"
featured: false
draft: false
---

## Heading

Post content goes here.
```

Notes:

- `slug` must be unique.
- `draft: true` posts are excluded from production builds.
- Reading time is estimated from raw post text in the browser-safe utility.
- H2/H3 headings are used to generate article TOC.

## Custom MDX Components

MDX components are mapped in `src/components/blog/mdx-components.tsx`.

Example currently registered:

- `Callout`

To add more components:

1. Create the component under `src/components/blog`.
2. Register it in the MDX components map.
3. Use it directly in `.mdx` files.

## Customizing Portfolio Content

Update profile and section data in:

- `src/data/portfolio.ts`

This file controls:

- identity and social links
- skills and categories
- projects and experience
- certifications/services
- navbar section items

## Styling and Theming

- Design tokens are defined as CSS variables in `src/index.css`.
- Tailwind theme extensions live in `tailwind.config.ts`.
- Theme switching is implemented in `src/hooks/use-theme.ts` and applies/removes the `dark` class on `document.documentElement`.

## Testing

Vitest is configured with jsdom and a setup file for browser API shims:

- `vitest.config.ts`
- `src/test/setup.ts`

Run tests:

```bash
bun run test
```

## Linting

ESLint configuration is in `eslint.config.js`.

Run lint:

```bash
bun run lint
```

## Deployment

This is a static frontend app.

### GitHub Pages

This repository includes a ready-to-use GitHub Pages workflow at `.github/workflows/deploy.yml`.

How it works:

1. Push to the `main` branch.
2. GitHub Actions installs dependencies and runs `bun run build`.
3. The generated `dist/` directory is published to GitHub Pages.

To enable it in the repository settings:

1. Open **Settings** > **Pages**.
2. Set **Build and deployment** to **GitHub Actions**.
3. Push to `main` or run the workflow manually from the **Actions** tab.

The workflow uses Bun for installation and build steps.

SPA routing notes:

- `public/404.html` preserves deep links such as `/blog/my-post` by redirecting back into the app.
- The router uses `basename={import.meta.env.BASE_URL}` so it stays aligned with the deployed base path.

Typical deployment flow for other static hosts:

1. Build with `bun run build`.
2. Deploy the `dist/` directory to your static host.
3. Ensure SPA fallback routing is configured if your host requires it.

## Troubleshooting

### Blog scroll behavior

- Section anchor scrolling uses fixed-header offsets (`scroll-mt-*`).
- Blog post page scroll resets to top on slug navigation while preserving hash deep links.

### MDX import errors

- Confirm post files are in `content/posts/*.mdx`.
- Confirm frontmatter includes required `slug`, `title`, `description`, and `date`.

### Dependency issues

- Remove `node_modules` and reinstall.
- Prefer a single package manager workflow (npm or Bun) for consistency.

## License

No license has been declared yet. Add a `LICENSE` file if you intend to open-source this repository.
