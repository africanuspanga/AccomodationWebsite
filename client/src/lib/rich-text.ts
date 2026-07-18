const allowedColors = new Set([
  '#0f766e',
  '#b45309',
  '#1d4ed8',
  '#7c3aed',
  '#be123c',
]);

const allowedTags = new Set([
  'a',
  'b',
  'br',
  'em',
  'h2',
  'h3',
  'h4',
  'i',
  'li',
  'ol',
  'p',
  'span',
  'strong',
  'u',
  'ul',
]);

const dangerousTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta']);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeColor(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim().toLowerCase();

  if (allowedColors.has(trimmed)) {
    return trimmed;
  }

  const rgbMatch = trimmed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
  if (!rgbMatch) return null;

  const hex = rgbMatch
    .slice(1)
    .map((part) => Math.max(0, Math.min(255, Number(part))).toString(16).padStart(2, '0'))
    .join('');
  const normalized = `#${hex}`;

  return allowedColors.has(normalized) ? normalized : null;
}

function normalizeHref(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^(https?:|mailto:|tel:)/i.test(trimmed) || trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }

  return null;
}

function plainTextToHtml(value: string): string {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return '';

  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function unwrapElement(element: Element) {
  const parent = element.parentNode;
  if (!parent) return;

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }

  parent.removeChild(element);
}

function replaceTag(element: Element, tagName: string): Element {
  const replacement = element.ownerDocument.createElement(tagName);
  while (element.firstChild) {
    replacement.appendChild(element.firstChild);
  }
  element.parentNode?.replaceChild(replacement, element);
  return replacement;
}

function cleanElement(element: Element) {
  Array.from(element.childNodes).forEach((child) => {
    if (child.nodeType === Node.COMMENT_NODE) {
      child.parentNode?.removeChild(child);
      return;
    }

    if (child.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    let childElement = child as Element;
    let tagName = childElement.tagName.toLowerCase();

    if (dangerousTags.has(tagName)) {
      childElement.remove();
      return;
    }

    cleanElement(childElement);

    if (tagName === 'div') {
      childElement = replaceTag(childElement, 'p');
      tagName = 'p';
    }

    if (tagName === 'font') {
      const color = normalizeColor(childElement.getAttribute('color'));
      childElement = replaceTag(childElement, 'span');
      tagName = 'span';
      if (color) {
        childElement.setAttribute('style', `color: ${color};`);
      }
    }

    if (!allowedTags.has(tagName)) {
      unwrapElement(childElement);
      return;
    }

    const href = childElement.getAttribute('href');
    const style = childElement.getAttribute('style');
    Array.from(childElement.attributes).forEach((attribute) => {
      childElement.removeAttribute(attribute.name);
    });

    if (tagName === 'a') {
      const normalizedHref = normalizeHref(href);
      if (normalizedHref) {
        childElement.setAttribute('href', normalizedHref);
        if (/^https?:/i.test(normalizedHref)) {
          childElement.setAttribute('target', '_blank');
          childElement.setAttribute('rel', 'noopener noreferrer');
        }
      } else {
        unwrapElement(childElement);
      }
      return;
    }

    if (tagName === 'span') {
      const color = normalizeColor(style?.match(/color\s*:\s*([^;]+)/i)?.[1] || null);
      if (color) {
        childElement.setAttribute('style', `color: ${color};`);
      }
    }
  });
}

export function sanitizeRichText(value?: string | null): string {
  if (!value) return '';

  const trimmed = value.trim();
  if (!trimmed) return '';

  if (!/<[a-z][\s\S]*>/i.test(trimmed)) {
    return plainTextToHtml(trimmed);
  }

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return plainTextToHtml(trimmed.replace(/<[^>]*>/g, ''));
  }

  const doc = new DOMParser().parseFromString(`<div>${trimmed}</div>`, 'text/html');
  const container = doc.body.firstElementChild;

  if (!container) return '';

  cleanElement(container);

  return container.innerHTML
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/(<br\s*\/?>\s*){3,}/g, '<br><br>')
    .trim();
}

export function richTextToHtml(value?: string | null): string {
  const html = sanitizeRichText(value);
  if (!html) return '';

  if (/<(p|h2|h3|h4|ul|ol)(\s|>)/i.test(html)) {
    return html;
  }

  return `<p>${html}</p>`;
}

export function plainTextFromRichText(value?: string | null): string {
  if (!value) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const html = richTextToHtml(value);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

export function normalizeEditorUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (/^(https?:|mailto:|tel:)/i.test(trimmed) || trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export const richTextColors = [
  { label: 'Forest', value: '#0f766e' },
  { label: 'Amber', value: '#b45309' },
  { label: 'Blue', value: '#1d4ed8' },
  { label: 'Violet', value: '#7c3aed' },
  { label: 'Rose', value: '#be123c' },
] as const;
