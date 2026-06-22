import type {MouseEvent} from 'react';

const ROUTE_EVENT = 'app:route';

const samePath = (a: string, b: string) =>
  (a.replace(/\/+$/, '') || '/') === (b.replace(/\/+$/, '') || '/');

/**
 * Client-side navigation via the History API. Pushes a new entry (or replaces
 * the current one when navigating within the same path, e.g. anchor-only) and
 * notifies subscribers so the app can re-render the matching route.
 */
export function navigate(path: string, anchor?: string) {
  const url = path + (anchor ? `#${anchor}` : '');
  if (samePath(window.location.pathname, path)) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/** Subscribe to route changes (programmatic navigation + back/forward). */
export function subscribeRoute(cb: () => void): () => void {
  window.addEventListener(ROUTE_EVENT, cb);
  window.addEventListener('popstate', cb);
  return () => {
    window.removeEventListener(ROUTE_EVENT, cb);
    window.removeEventListener('popstate', cb);
  };
}

/**
 * Props for an internal link: a real `href` (for SEO / open-in-new-tab) plus an
 * onClick that intercepts plain left-clicks for SPA navigation while leaving
 * modifier-clicks to the browser.
 */
export function navLinkProps(path: string, anchor?: string) {
  return {
    href: path + (anchor ? `#${anchor}` : ''),
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
        return;
      }
      e.preventDefault();
      navigate(path, anchor);
    },
  };
}
