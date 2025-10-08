import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import PurgeCSS from 'vite-plugin-purgecss'
import fs from 'fs'
import path from 'path'

// Custom plugin to inject build timestamp into service worker
function injectBuildTime(): PluginOption {
  return {
    name: 'inject-build-time',
    closeBundle() {
      const buildTime = Date.now().toString();
      const swPath = path.join(__dirname, 'public', 'sw.js');
      const distSwPath = path.join(__dirname, 'dist', 'sw.js');

      // Read the service worker file
      let swContent = fs.readFileSync(swPath, 'utf-8');

      // Replace the placeholder with actual build time
      swContent = swContent.replace('__BUILD_TIME__', buildTime);

      // Write to dist folder
      fs.writeFileSync(distSwPath, swContent, 'utf-8');

      console.log(`Service worker cache version set to: ${buildTime}`);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
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
          /^toastify/,
          /^fa-/,
          /^fas/,
          /^fab/,
          /active$/,
          /open$/,
          /visible$/,
          /dark-mode$/,
          /data-theme/,
        ],
        deep: [/toastify/, /fa-/, /animate-/],
        greedy: [/^publication-/, /^citation-/, /^select-/, /^nav-/]
      },
      defaultExtractor: (content: string) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }) as PluginOption
  ],
  base: '/',
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'qrcode': ['qrcode'],
          'toastify': ['toastify-js'],
        },
      },
    },
  },
})
