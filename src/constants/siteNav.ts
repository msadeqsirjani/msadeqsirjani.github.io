/**
 * Single source of truth for in-page navigation IDs.
 * Each entry maps a hash anchor (#id) to a human-readable label.
 *
 * Using `/#id` (not bare `#id`) helps crawlers classify links as same-origin
 * internal.
 */

export interface NavLink {
  id: string;
  label: string;
}

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'biography', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
];

export const DROPDOWN_NAV_LINKS: readonly NavLink[] = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'news', label: 'News' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export const ALL_NAV_LINKS: readonly NavLink[] = [
  ...MAIN_NAV_LINKS,
  ...DROPDOWN_NAV_LINKS,
];

/**
 * Hash fragments (without the leading `#`) that should be considered valid
 * routes by the client-side 404 check. Includes navigable section IDs as
 * well as the schema.org/jump anchors that aren't in the menu.
 */
export const VALID_HASHES: readonly string[] = [
  '',
  'main-content',
  'person',
  'research-interests',
  ...ALL_NAV_LINKS.map(link => link.id),
];

export const VALID_PATHNAMES: readonly string[] = ['/', '/index.html'];

export function sectionHref(sectionId: string): string {
  return `/#${sectionId}`;
}

/**
 * Given the current location, return whether the path/hash should resolve to
 * a real section on the page. Strips any query-string suffix in the hash.
 */
export function isValidRoute(pathname: string, hash: string): boolean {
  const normalizedPath = pathname.toLowerCase();
  if (!VALID_PATHNAMES.includes(normalizedPath)) return false;

  const rawHash = hash.toLowerCase().replace(/^#/, '');
  const cleanHash = rawHash.split('?')[0] ?? '';
  return VALID_HASHES.includes(cleanHash);
}
