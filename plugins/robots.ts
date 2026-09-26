import fs from 'fs';
import path from 'path';
import type {PluginOption} from 'vite';

const PUBLIC_STATUSES = new Set(['published', 'accepted']);
const PDF_DIR = '/assets/docs/publications/';

interface Publication {
  status: string;
  pdfLink?: string;
}

const allowedPdfs = () => {
  const file = path.join(__dirname, '..', 'src', 'data', 'publications.json');
  const publications = JSON.parse(
    fs.readFileSync(file, 'utf-8'),
  ) as Publication[];
  return publications
    .filter(p => PUBLIC_STATUSES.has(p.status) && p.pdfLink)
    .map(p => `/${p.pdfLink!.replace(/^\//, '')}`)
    .filter(link => link.startsWith(PDF_DIR));
};

export function emitRobots(): PluginOption {
  let outDir = path.join(__dirname, '..', 'dist');
  return {
    name: 'emit-robots',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(
        path.join(__dirname, '..', 'public', 'robots.txt'),
        'utf-8',
      );
      const disallow = `Disallow: ${PDF_DIR}`;
      if (!template.includes(disallow)) {
        throw new Error(`emit-robots: "${disallow}" not found in robots.txt`);
      }
      const allows = allowedPdfs().map(link => `Allow: ${link}`);
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        template.replace(disallow, [disallow, ...allows].join('\n')),
        'utf-8',
      );
      console.log(`robots.txt: ${allows.length} paper PDFs allowed`);
    },
  };
}
