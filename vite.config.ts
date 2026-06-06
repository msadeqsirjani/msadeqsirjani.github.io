import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import PurgeCSS from 'vite-plugin-purgecss'
import fs from 'fs'
import path from 'path'

const BUILD_TIMESTAMP = Date.now().toString();

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
            'refusing to ship a service worker without a deterministic cache version.'
        );
      }

      const replaced = swContent.replace(/__BUILD_TIME__/g, BUILD_TIMESTAMP);

      fs.writeFileSync(distSwPath, replaced, 'utf-8');

      console.log(`Service worker cache version set to: ${BUILD_TIMESTAMP}`);
    }
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
    react(),
    injectBuildTime(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    PurgeCSS({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
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
        greedy: [/^publication-/, /^citation-/, /^select-/, /^nav-/]
      },
      defaultExtractor: (content: string) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }) as PluginOption
  ],
  base: '/',
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'react-hot-toast': ['react-hot-toast'],
          'fontawesome': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/react-fontawesome',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
          ],
        },
        sourcemapExcludeSources: true,
      },
    },
  },
})
