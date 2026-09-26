import fs from 'fs';
import path from 'path';
import type {PluginOption} from 'vite';

const PUBLIC_STATUSES = new Set(['published', 'accepted']);
const ANCHOR = 'Allow: /';

interface Publication {
  status: string;
  projectPage?: string;
}

const projectRules = () => {
  const file = path.join(__dirname, '..', 'src', 'data', 'publications.json');
  const publications = JSON.parse(
    fs.readFileSync(file, 'utf-8'),
  ) as Publication[];
  return publications
    .filter(p => p.projectPage)
    .map(p =>
      PUBLIC_STATUSES.has(p.status)
        ? `Allow: ${p.projectPage}`
        : `Disallow: ${p.projectPage}`,
    );
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
      if (!template.includes(`${ANCHOR}\n`)) {
        throw new Error(`emit-robots: "${ANCHOR}" not found in robots.txt`);
      }
      const rules = projectRules();
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        template.replace(`${ANCHOR}\n`, [ANCHOR, ...rules, ''].join('\n')),
        'utf-8',
      );
      console.log(`robots.txt: ${rules.length} project page rules`);
    },
  };
}
