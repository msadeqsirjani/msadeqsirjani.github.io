# Scholar Portfolio

Academic portfolio for Mohammad Sadegh Sirjani — a static, content-driven
research website built with React, TypeScript, and Vite.

[![Live Site](https://img.shields.io/badge/Visit-msadeqsirjani.com-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://msadeqsirjani.com)
[![Deploy](https://img.shields.io/github/actions/workflow/status/msadeqsirjani/msadeqsirjani.github.io/deploy-pages.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=deploy)](https://github.com/msadeqsirjani/msadeqsirjani.github.io/actions/workflows/deploy-pages.yml)
[![Last Commit](https://img.shields.io/github/last-commit/msadeqsirjani/msadeqsirjani.github.io?style=for-the-badge&logo=git&logoColor=white)](https://github.com/msadeqsirjani/msadeqsirjani.github.io/commits)

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](public/sw.js)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## Stack

React 19 (Preact compat), TypeScript, and Vite 7. Font Awesome for icons,
react-hot-toast for notifications, ESLint and Prettier for quality.

## Getting started

```bash
git clone https://github.com/msadeqsirjani/msadeqsirjani.github.io.git
cd msadeqsirjani.github.io
npm install
npm run dev
```

Requires Node.js 20+ and npm.

## Scripts

- `npm run dev` — local dev server with HMR
- `npm run build` — typecheck and bundle to `dist/` (also emits `404.html`)
- `npm run preview` — serve the production build
- `npm run lint` — run ESLint
- `npm run format` — run Prettier

## Routes

Client-side path routing, no router library:

- `/` — biography, recent news, latest publications, contact
- `/research` — research interests and experience
- `/education` — education
- `/publications` — full publication list (search, filters, BibTeX)
- `/teaching` — teaching
- `/news` — news archive
- `/awards` — awards and honors

Unknown paths render the NotFound view. Routes are defined in
`src/constants/siteNav.ts`; navigation helpers in `src/utils/router.ts`.

## Layout

```
public/        static assets (images, manifest, robots, sitemap, sw)
src/
  components/  one folder per UI feature
  constants/   route table and site nav
  context/     theme provider
  data/        JSON content and loaders (content.ts)
  styles/      global tokens and section CSS
  utils/       router, sanitize, helpers
```

Imports may use `@/` for `src/`.

## Content and theming

Edit the JSON files under `src/data/` to update site content. Colors come from
design tokens in `src/styles/base.css`, defined for both light and dark themes;
component CSS uses tokens only, no hardcoded hex.

## Deployment

On push to `main`, `.github/workflows/deploy-pages.yml` builds the site and
publishes `dist/` to GitHub Pages. The build emits a `404.html` copy of
`index.html` so clean paths resolve on direct load and refresh.

## License

MIT. Copyright (c) 2025 Mohammad Sadegh Sirjani.
