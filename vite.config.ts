import {defineConfig, type PluginOption} from 'vite';
import preact from '@preact/preset-vite';
import {visualizer} from 'rollup-plugin-visualizer';
import PurgeCSS from 'vite-plugin-purgecss';
import fs from 'fs';
import path from 'path';

const BUILD_TIMESTAMP = Date.now().toString();

const SITE = 'https://msadeqsirjani.com';
const PERSON_ID = `${SITE}/#person`;

interface PublicationRecord {
  title: string;
  venue?: string;
  year: string | number;
  authors: string;
  link?: string;
  citations?: number;
  keywords?: string[];
}

function buildPublicationsLd(): string {
  const file = path.join(__dirname, 'src', 'data', 'publications.json');
  const pubs: PublicationRecord[] = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const itemListElement = pubs.map((p, i) => {
    const author = p.authors
      .split(',')
      .map(a => a.trim())
      .filter(Boolean)
      .map(name => {
        const person: Record<string, unknown> = {'@type': 'Person', name};
        if (name.includes('Sirjani')) person['@id'] = PERSON_ID;
        return person;
      });
    const work: Record<string, unknown> = {
      '@type': 'ScholarlyArticle',
      name: p.title,
      author,
      datePublished: String(p.year),
      inLanguage: 'en',
    };
    if (p.keywords?.length) work.keywords = p.keywords.join(', ');
    if (p.venue) work.isPartOf = {'@type': 'Periodical', name: p.venue};
    if (p.link) {
      work.url = p.link;
      work.sameAs = p.link;
    }
    if (typeof p.citations === 'number') {
      work.interactionStatistic = {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CiteAction',
        userInteractionCount: p.citations,
      };
    }
    return {'@type': 'ListItem', position: i + 1, item: work};
  });
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Publications — Mohammad Sadegh Sirjani',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: pubs.length,
    itemListElement,
  });
}

// Generate publications structured data from data, and preload the primary font.
function injectSeoAndFonts(): PluginOption {
  return {
    name: 'inject-seo-and-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const tags: import('vite').HtmlTagDescriptor[] = [];
        const fontFile =
          ctx.bundle &&
          Object.keys(ctx.bundle).find(f =>
            /roboto-latin-400-normal-[^/]*\.woff2$/.test(f),
          );
        if (fontFile) {
          tags.push({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${fontFile}`,
              crossorigin: '',
            },
            injectTo: 'head-prepend',
          });
        }
        tags.push({
          tag: 'script',
          attrs: {type: 'application/ld+json'},
          children: buildPublicationsLd(),
          injectTo: 'head',
        });
        return {html, tags};
      },
    },
  };
}

function injectBuildTime(): PluginOption {
  let outDir = path.join(__dirname, 'dist');
  return {
    name: 'inject-build-time',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      const swPath = path.join(__dirname, 'public', 'sw.js');
      const distSwPath = path.join(outDir, 'sw.js');

      const swContent = fs.readFileSync(swPath, 'utf-8');

      if (!swContent.includes('__BUILD_TIME__')) {
        throw new Error(
          'inject-build-time: __BUILD_TIME__ placeholder not found in public/sw.js — ' +
            'refusing to ship a service worker without a deterministic cache version.',
        );
      }

      const replaced = swContent.replace(/__BUILD_TIME__/g, BUILD_TIMESTAMP);

      fs.writeFileSync(distSwPath, replaced, 'utf-8');

      console.log(`Service worker cache version set to: ${BUILD_TIMESTAMP}`);
    },
  };
}

// GitHub Pages serves 404.html for unknown paths. Shipping a copy of the built
// index.html lets the SPA boot and resolve client-side routes (e.g. /publications)
// on direct load and hard refresh.
function emitSpaFallback(): PluginOption {
  let outDir = path.join(__dirname, 'dist');
  return {
    name: 'emit-spa-fallback',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      const notFoundPath = path.join(outDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
        console.log('SPA fallback written: 404.html');
      }
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(BUILD_TIMESTAMP),
  },
  plugins: [
    preact(),
    injectSeoAndFonts(),
    injectBuildTime(),
    emitSpaFallback(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    PurgeCSS({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
      safelist: {
        standard: [
          /^fa-/,
          /^fas/,
          /^fab/,
          /active$/,
          /open$/,
          /visible$/,
          /dark-mode$/,
          /data-theme/,
        ],
        deep: [/fa-/, /animate-/, /toast/],
        greedy: [/^publication-/, /^citation-/, /^select-/, /^nav-/],
      },
      defaultExtractor: (content: string) =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    }) as PluginOption,
  ],
  base: '/',
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        // Strip noisy logs in production, keep console.error/warn for diagnostics
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (
            id.includes('/preact/') ||
            id.includes('/preact') ||
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (id.includes('@fortawesome')) return 'fontawesome';
          if (id.includes('react-hot-toast') || id.includes('/goober/')) {
            return 'react-hot-toast';
          }
        },
      },
    },
  },
});
