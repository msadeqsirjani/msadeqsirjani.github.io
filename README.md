# Scholar Portfolio

Academic portfolio site for **Mohammad Sadegh Sirjani** — React, TypeScript, and Vite. Content-driven sections (education, research, publications, teaching, news, awards, contact) with strong accessibility and performance defaults.

**Live site:** [msadeqsirjani.com](https://msadeqsirjani.com/) · **GitHub Pages:** [msadeqsirjani.github.io](https://msadeqsirjani.github.io)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Stack

| Layer | Choice |
|--------|--------|
| UI | React 19, TypeScript |
| Build | Vite 7 |
| Icons | Font Awesome (React) |
| Toasts | Sonner |
| Lint | ESLint 9 + typescript-eslint |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server (default: [http://localhost:5173](http://localhost:5173)) |
| `npm run build` | Typecheck + production bundle → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the project |

## Features

- **Layout & UX:** Responsive layout, skip link, animated sections, reading progress, pull-to-refresh (mobile), quick actions, offline indicator, cookie consent.
- **Navigation & search:** Navbar with theme controls, in-page sections, **⌘/Ctrl+K** global search across content.
- **Content:** Biography, education timeline, research interests & experience, publications (search, filters, BibTeX copy), teaching, news, awards, contact (Formspree), footer with social links.
- **Theming:** Light/dark (and related UI) via `ThemeContext`, persisted locally.
- **SEO & PWA:** Meta / Open Graph in `index.html`, `public/manifest.json`, service worker in `public/sw.js` (build injects cache version).
- **Quality:** Strict TypeScript, semantic HTML, ARIA where it matters.

## Repository layout

```
msadeqsirjani.github.io/       # repository root — Vite app lives here
├── .github/workflows/       # GitHub Pages deploy (build → dist)
├── public/                  # Static assets (images, manifest, robots, sitemap, sw)
├── src/
│   ├── components/          # One folder per UI feature
│   ├── constants/           # e.g. site nav, section IDs
│   ├── context/
│   ├── data/                # JSON sources + content loaders (content.ts)
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── eslint.config.js
├── package.json
└── tsconfig*.json
```

**Path alias:** imports can use `@/` as shorthand for `src/` (configured in `vite.config.ts` and `tsconfig.app.json`), e.g. `@/components/Hero/Hero`.

## Prerequisites

- **Node.js 20+** (same major as CI)
- **npm** (lockfile: `package-lock.json`)

## Getting started

```bash
git clone https://github.com/msadeqsirjani/msadeqsirjani.github.io.git
cd msadeqsirjani.github.io
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Customization

### Site copy & structured data

- **`src/data/content.ts`** — loads JSON and exposes typed helpers used by sections.
- **JSON under `src/data/`** — e.g. `publications.json`, `education.json`, `research.json`, `teaching.json`, `news.json`, `awards.json`, `research-interests.json`, plus `settings.json` for toggles/limits.
- **`src/data/bibtex.json`** — publication BibTeX snippets for copy-to-clipboard.

Edit the JSON (or the loaders in `content.ts`) and adjust **`src/types/`** if you add new fields.

### Theme & global CSS

Tokens and global rules live in **`src/index.css`**. Co-located `*.css` files exist next to some components.

### Nav, sections, and 404

Section order and lazy loading are defined in **`src/App.tsx`**. Routes / hash validation use **`src/constants/siteNav.ts`**. The **NotFound** view is shown for invalid paths.

### Contact form

Point the Formspree (or other) action URL in **`src/components/Contact/Contact.tsx`** to your endpoint.

### Static & deploy assets

Replace images and CV under **`public/`** (e.g. `public/assets/`) and update references in content or `index.html` meta (OG image, etc.) as needed.

## Deployment (GitHub Pages)

On push to **`main`**, `.github/workflows/static.yml` runs `npm ci`, `npm run build`, and publishes the **`dist/`** artifact to GitHub Pages. Configure the **Pages** source to **GitHub Actions** in the repository settings if it is not already.

For a **project** site (`username.github.io/repo/`), set Vite `base` in `vite.config.ts` to your subpath (e.g. `/ScholarPortfolio/`) and redeploy.

## Browser support

Recent evergreen browsers (Chrome, Firefox, Safari, Edge). Production build targets ES2015+.

## License

This project is released under the [MIT License](LICENSE).

Copyright (c) 2025 Mohammad Sadegh Sirjani.
