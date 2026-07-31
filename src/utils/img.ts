/**
 * Product photography is pre-generated as WebP at three widths:
 *   /images/products/<name>.webp      — up to 1000px, for detail views
 *   /images/products/<name>-700.webp  — 700px, the 2x card size on phones
 *   /images/products/<name>-400.webp  — 400px, for cards and thumbnails
 * These helpers map any stored source path (jpg/png/webp) onto those files.
 */

const PRODUCT_DIR = '/images/products/';

function isProductImage(src: string): boolean {
  return src.startsWith(PRODUCT_DIR);
}

function stripExt(src: string): string {
  return src.replace(/\.(jpe?g|png|webp)$/i, '');
}

/** Full-size WebP (max 1000px). */
export function imgFull(src?: string): string {
  if (!src || !isProductImage(src)) return src || '/images/placeholder.webp';
  return `${stripExt(src)}.webp`;
}

/** 400px WebP for cards, thumbnails and galleries. */
export function imgThumb(src?: string): string {
  if (!src || !isProductImage(src)) return src || '/images/placeholder.webp';
  return `${stripExt(src)}-400.webp`;
}

/** srcset across the 400px, 700px and 1000px WebP renditions. */
export function imgSrcset(src?: string): string | undefined {
  if (!src || !isProductImage(src)) return undefined;
  const base = stripExt(src);
  return `${base}-400.webp 400w, ${base}-700.webp 700w, ${base}.webp 1000w`;
}
