import fs from 'fs';
import path from 'path';
import type {PluginOption} from 'vite';
import {ROUTE_PATHS, type RouteKey} from '../src/constants/siteNav';

const SITE = 'https://msadeqsirjani.com';
const SELF = 'Mohammad Sadegh Sirjani';
const DATA = path.join(__dirname, '..', 'src', 'data');

interface RouteMeta {
  title: string;
  description: string;
  image?: string;
}

interface Publication {
  title: string;
  venue?: string;
  year: string;
  authors: string;
  link?: string;
  pdfLink?: string;
  projectPage?: string;
  bibtexId?: string;
  keywords?: string[];
}

const readJson = <T>(file: string): T =>
  JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf-8')) as T;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const absolute = (url: string) =>
  /^https?:\/\//.test(url) ? url : `${SITE}/${url.replace(/^\//, '')}`;

const setMeta = (html: string, attr: string, key: string, value: string) =>
  html.replace(
    new RegExp(
      `(<meta\\s+${attr}="${escapeRegex(key)}"\\s+content=")[^"]*(")`,
    ),
    `$1${escapeHtml(value)}$2`,
  );

const removeMeta = (html: string, attr: string, key: RegExp) =>
  html.replace(
    new RegExp(`\\s*<meta\\s+${attr}="${key.source}"\\s+content="[^"]*"\\s*/>`, 'g'),
    '',
  );

const CANONICAL = /\s*<link rel="canonical" href="[^"]*"\s*\/>/;

const bibtexField = (bibtex: string, name: string) => {
  const match = new RegExp(`\\b${name}\\s*=\\s*`, 'i').exec(bibtex);
  if (!match) return undefined;
  let index = match.index + match[0].length;
  const open = bibtex[index];
  let value = '';
  if (open === '{') {
    let depth = 0;
    for (; index < bibtex.length; index++) {
      const char = bibtex[index];
      if (char === '{') depth++;
      if (char === '}') depth--;
      value += char;
      if (depth === 0) break;
    }
  } else if (open === '"') {
    const end = bibtex.indexOf('"', index + 1);
    value = bibtex.slice(index, end + 1);
  } else {
    value = /^[^,\n}]+/.exec(bibtex.slice(index))?.[0] ?? '';
  }
  return value
    .replace(/^[{"]|[}"]$/g, '')
    .replace(/[{}]/g, '')
    .replace(/\\&/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
};

const citationTags = (pub: Publication, bibtex: string | undefined, url: string) => {
  const tags: [string, string][] = [];
  const add = (name: string, value?: string) => {
    if (value) tags.push([name, value]);
  };
  const entryType = bibtex ? /@(\w+)/.exec(bibtex)?.[1]?.toLowerCase() : '';
  const field = (name: string) => (bibtex ? bibtexField(bibtex, name) : undefined);

  add('citation_title', field('title') ?? pub.title);
  pub.authors
    .split(',')
    .map(author => author.trim())
    .filter(Boolean)
    .forEach(author => add('citation_author', author));
  add('citation_publication_date', pub.year);
  if (entryType === 'article') {
    add('citation_journal_title', field('journal') ?? pub.venue);
  } else {
    add('citation_conference_title', field('booktitle') ?? pub.venue);
  }
  add('citation_volume', field('volume'));
  add('citation_issue', field('number'));
  const pages = field('pages')?.split(/-+/);
  add('citation_firstpage', pages?.[0]);
  add('citation_lastpage', pages?.[1]);
  const doi =
    field('doi')?.replace(/^https?:\/\/doi\.org\//, '') ??
    pub.link?.match(/doi\.org\/(.+)$/)?.[1];
  add('citation_doi', doi);
  add('citation_arxiv_id', pub.link?.match(/arxiv\.org\/abs\/(.+)$/)?.[1]);
  if (pub.pdfLink) add('citation_pdf_url', absolute(pub.pdfLink));
  add('citation_abstract_html_url', url);
  return tags;
};

const articleLd = (pub: Publication, meta: RouteMeta, url: string) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    description: meta.description,
    author: pub.authors
      .split(',')
      .map(name => name.trim())
      .filter(Boolean)
      .map(name =>
        name === SELF
          ? {'@type': 'Person', name, '@id': `${SITE}/#person`}
          : {'@type': 'Person', name},
      ),
    datePublished: pub.year,
    isPartOf: pub.venue ? {'@type': 'PublicationVolume', name: pub.venue} : undefined,
    keywords: pub.keywords?.join(', '),
    url,
    sameAs: pub.link,
    image: meta.image ? absolute(meta.image) : undefined,
    isAccessibleForFree: true,
  });

const renderRoute = (
  template: string,
  key: RouteKey,
  meta: RouteMeta,
  pub: Publication | undefined,
  bibtex: string | undefined,
) => {
  const url = key === 'home' ? `${SITE}/` : `${SITE}${ROUTE_PATHS[key]}`;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
  );

  html = setMeta(html, 'name', 'title', meta.title);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:image:alt', meta.title);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = setMeta(html, 'name', 'twitter:image:alt', meta.title);

  if (key !== 'home') {
    html = setMeta(html, 'property', 'og:type', pub ? 'article' : 'website');
    html = removeMeta(html, 'property', /profile:[\w:]+/);
  }

  if (meta.image) {
    const image = absolute(meta.image);
    html = setMeta(html, 'property', 'og:image', image);
    html = setMeta(html, 'name', 'twitter:image', image);
    html = removeMeta(html, 'property', /og:image:(?:width|height)/);
  }

  html = html.replace(CANONICAL, '');
  const head = [`<link rel="canonical" href="${url}" />`];
  if (pub) {
    citationTags(pub, bibtex, url).forEach(([name, value]) =>
      head.push(`<meta name="${name}" content="${escapeHtml(value)}" />`),
    );
    head.push(
      `<script type="application/ld+json">${articleLd(pub, meta, url)}</script>`,
    );
  }

  return html.replace('</head>', `    ${head.join('\n    ')}\n  </head>`);
};

const writeFile = (file: string, content: string) => {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, content, 'utf-8');
};

export function emitRoutePages(): PluginOption {
  let outDir = path.join(__dirname, '..', 'dist');
  return {
    name: 'emit-route-pages',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const template = fs.readFileSync(indexPath, 'utf-8');
      const routeMeta = readJson<Record<RouteKey, RouteMeta>>('routeMeta.json');
      const publications = readJson<Publication[]>('publications.json');
      const bibtex = readJson<Record<string, {bibtex: string}>>('bibtex.json');

      writeFile(
        path.join(outDir, '404.html'),
        setMeta(template, 'name', 'robots', 'noindex, follow').replace(
          CANONICAL,
          '',
        ),
      );

      (Object.keys(ROUTE_PATHS) as RouteKey[]).forEach(key => {
        const routePath = ROUTE_PATHS[key];
        const pub = publications.find(p => p.projectPage === routePath);
        const html = renderRoute(
          template,
          key,
          routeMeta[key],
          pub,
          pub?.bibtexId ? bibtex[pub.bibtexId]?.bibtex : undefined,
        );
        if (key === 'home') {
          writeFile(indexPath, html);
          return;
        }
        const base = path.join(outDir, routePath.replace(/^\//, ''));
        writeFile(`${base}.html`, html);
        writeFile(path.join(base, 'index.html'), html);
      });

      console.log(
        `Route pages written: ${Object.keys(ROUTE_PATHS).length} routes + 404.html`,
      );
    },
  };
}
