/**
 * Root path + section hash for in-site navigation.
 * Using `/#id` (not bare `#id`) helps crawlers classify links as same-origin internal.
 */
export function sectionHref(sectionId: string): string {
  return `/#${sectionId}`;
}
