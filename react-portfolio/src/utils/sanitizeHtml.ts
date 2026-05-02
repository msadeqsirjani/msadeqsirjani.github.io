/**
 * Tiny allowlist sanitizer for the small subset of HTML used in
 * news/awards descriptions: only <a> tags with safe href/target/rel attrs.
 *
 * This is intentionally minimal — the data lives in the repo and is reviewed
 * at commit time. The sanitizer exists so that if any description ever grows
 * accidental script/iframe/style markup, we strip it before render.
 */

const ALLOWED_TAGS = new Set(['a']);
const ALLOWED_ATTRS = new Set(['href', 'target', 'rel']);
const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:'];

const isSafeUrl = (value: string): boolean => {
  const trimmed = value.trim();
  // Permit relative URLs and fragment links.
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true;
  try {
    const parsed = new URL(trimmed, 'https://example.com/');
    return SAFE_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
};

const sanitizeNode = (node: Node, parent: Node) => {
  if (node.nodeType === Node.TEXT_NODE) return;

  if (node.nodeType !== Node.ELEMENT_NODE) {
    parent.removeChild(node);
    return;
  }

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  if (!ALLOWED_TAGS.has(tag)) {
    // Replace the element with its text content so we don't lose context.
    const text = el.textContent ?? '';
    parent.replaceChild(el.ownerDocument!.createTextNode(text), el);
    return;
  }

  // Strip every attribute we don't allow; validate href.
  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();
    if (!ALLOWED_ATTRS.has(name)) {
      el.removeAttribute(attr.name);
      continue;
    }
    if (name === 'href' && !isSafeUrl(attr.value)) {
      el.removeAttribute(attr.name);
    }
  }

  // Force safe defaults for outbound links.
  if (el.getAttribute('target') === '_blank') {
    const rel = (el.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean);
    if (!rel.includes('noopener')) rel.push('noopener');
    if (!rel.includes('noreferrer')) rel.push('noreferrer');
    el.setAttribute('rel', rel.join(' '));
  }

  for (const child of Array.from(el.childNodes)) {
    sanitizeNode(child, el);
  }
};

export const sanitizeHtml = (input: string): string => {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // SSR fallback: strip all tags entirely.
    return input.replace(/<[^>]*>/g, '');
  }
  const doc = new DOMParser().parseFromString(`<div>${input}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return '';
  for (const child of Array.from(root.childNodes)) {
    sanitizeNode(child, root);
  }
  return root.innerHTML;
};
