export interface NavLink {
  id: string;
  label: string;

  path: string;

  anchor?: string;
}

export const ROUTE_PATHS = {
  home: '/',
  research: '/research',
  education: '/education',
  publications: '/publications',
  teaching: '/teaching',
  news: '/news',
  awards: '/awards',
} as const;

export type RouteKey = keyof typeof ROUTE_PATHS;

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  {id: 'home', label: 'Home', path: ROUTE_PATHS.home},
  {id: 'publications', label: 'Publications', path: ROUTE_PATHS.publications},
  {id: 'teaching', label: 'Teaching', path: ROUTE_PATHS.teaching},
  {id: 'awards', label: 'Awards', path: ROUTE_PATHS.awards},
];

export const DROPDOWN_NAV_LINKS: readonly NavLink[] = [
  {id: 'education', label: 'Education', path: ROUTE_PATHS.education},
  {id: 'research', label: 'Research', path: ROUTE_PATHS.research},
  {id: 'news', label: 'News', path: ROUTE_PATHS.news},
];

export const ALL_NAV_LINKS: readonly NavLink[] = [
  ...MAIN_NAV_LINKS,
  ...DROPDOWN_NAV_LINKS,
];

export const SEARCH_CATEGORY_DEST: Record<
  string,
  {path: string; anchor?: string}
> = {
  publications: {path: ROUTE_PATHS.publications},
  research: {path: ROUTE_PATHS.research},
  teaching: {path: ROUTE_PATHS.teaching},
  education: {path: ROUTE_PATHS.education},
  news: {path: ROUTE_PATHS.news},
  awards: {path: ROUTE_PATHS.awards},
};

export function normalizePath(pathname: string): string {
  let p = (pathname || '/').toLowerCase();
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '');
  return p || '/';
}

const PATH_TO_KEY = new Map<string, RouteKey>(
  (Object.entries(ROUTE_PATHS) as [RouteKey, string][]).map(([key, path]) => [
    path,
    key,
  ]),
);

export function routeKeyForPath(pathname: string): RouteKey | null {
  return PATH_TO_KEY.get(normalizePath(pathname)) ?? null;
}

export function isValidPath(pathname: string): boolean {
  return routeKeyForPath(pathname) !== null;
}
