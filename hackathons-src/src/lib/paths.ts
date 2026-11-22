/** Base-aware URL helpers. The site is mounted at /samuel/hackathons/ (see astro.config.mjs). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL of a page inside the TableSalt documentary, e.g. docHref('learnings/retro'). */
export function docHref(path = '', hash = ''): string {
  return `${BASE}/tablesalt-ocr/${path ? `${path}/` : ''}${hash ? `#${hash}` : ''}`;
}

/** URL inside the hackathons archive root (overview). */
export function archiveHref(path = ''): string {
  return `${BASE}/${path ? `${path}/` : ''}`;
}

export const DOC_BASE = `${BASE}/tablesalt-ocr`;
export const HOME_HREF = '/samuel/';
