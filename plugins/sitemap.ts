import {execFileSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import type {PluginOption} from 'vite';
import {ROUTE_PATHS, type RouteKey} from '../src/constants/siteNav';

const SITE = 'https://msadeqsirjani.com';
const ROOT = path.join(__dirname, '..');
const PUBLIC_STATUSES = new Set(['published', 'accepted']);

interface RouteMeta {
  sources?: string[];
}

interface Publication {
  status: string;
  projectPage?: string;
}

const readJson = <T>(file: string): T =>
  JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf-8')) as T;

const today = () => new Date().toISOString().slice(0, 10);

const lastModified = (sources: string[] = []) => {
  if (!sources.length) return today();
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', ...sources],
      {cwd: ROOT, encoding: 'utf-8'},
    ).trim();
    return date || today();
  } catch {
    return today();
  }
};

const hiddenPages = () =>
  new Set(
    readJson<Publication[]>('src/data/publications.json')
      .filter(p => p.projectPage && !PUBLIC_STATUSES.has(p.status))
      .map(p => p.projectPage),
  );

const buildSitemap = () => {
  const routeMeta = readJson<Record<RouteKey, RouteMeta>>(
    'src/data/routeMeta.json',
  );
  const hidden = hiddenPages();
  const urls = (Object.keys(ROUTE_PATHS) as RouteKey[])
    .filter(key => !hidden.has(ROUTE_PATHS[key]))
    .map(key => {
      const loc = key === 'home' ? `${SITE}/` : `${SITE}${ROUTE_PATHS[key]}`;
      const lastmod = lastModified(routeMeta[key]?.sources);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
};

export function emitSitemap(): PluginOption {
  let outDir = path.join(ROOT, 'dist');
  return {
    name: 'emit-sitemap',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      const sitemap = buildSitemap();
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8');
      console.log(`sitemap.xml: ${sitemap.match(/<url>/g)?.length ?? 0} pages`);
    },
  };
}
