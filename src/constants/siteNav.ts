export interface NavLink {
  id: string;
  label: string;
}

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  {id: 'home', label: 'Home'},
  {id: 'biography', label: 'About'},
  {id: 'education', label: 'Education'},
  {id: 'research', label: 'Research'},
  {id: 'publications', label: 'Publications'},
];

export const DROPDOWN_NAV_LINKS: readonly NavLink[] = [
  {id: 'teaching', label: 'Teaching'},
  {id: 'news', label: 'News'},
  {id: 'awards', label: 'Awards'},
  {id: 'contact', label: 'Contact'},
];

export const ALL_NAV_LINKS: readonly NavLink[] = [
  ...MAIN_NAV_LINKS,
  ...DROPDOWN_NAV_LINKS,
];

export const VALID_HASHES: readonly string[] = [
  '',
  'main-content',
  'person',
  'research-interests',
  'publications-all',
  ...ALL_NAV_LINKS.map(link => link.id),
];

export const VALID_PATHNAMES: readonly string[] = ['/', '/index.html'];

export function sectionHref(sectionId: string): string {
  return `/#${sectionId}`;
}

export function isValidRoute(pathname: string, hash: string): boolean {
  const normalizedPath = pathname.toLowerCase();
  if (!VALID_PATHNAMES.includes(normalizedPath)) return false;

  const rawHash = hash.toLowerCase().replace(/^#/, '');
  const cleanHash = rawHash.split('?')[0] ?? '';
  return VALID_HASHES.includes(cleanHash);
}
