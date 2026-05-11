const ALLOWED_TAGS = new Set(['a']);
const ALLOWED_ATTRS = new Set(['href', 'target', 'rel']);
const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:'];

const isSafeUrl = (value: string): boolean => {
  const trimmed = value.trim();
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
    const text = el.textContent ?? '';
    parent.replaceChild(el.ownerDocument!.createTextNode(text), el);
    return;
  }

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
