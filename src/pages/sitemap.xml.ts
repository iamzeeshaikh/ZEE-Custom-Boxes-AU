import type { APIRoute } from 'astro';
import products from '../data/products.json';
import categories from '../data/categories.json';
import locations from '../data/locations';
import { blogPosts } from '../data/blogPosts';

const SITE_URL = 'https://zeecustomboxes.com.au';
// Stable last-modified date. Bump this when content is materially updated. Using
// a fixed date instead of new Date() stops every URL's lastmod resetting on each
// build, which Google learns to distrust.
const TODAY = '2026-07-09';

function url(path: string, priority: string, freq: string, lastmod = TODAY): string {
  return `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = () => {
  const staticPages = [
    url('/', '1.0', 'weekly'),
    url('/products', '0.9', 'weekly'),
    url('/locations', '0.8', 'monthly'),
    url('/about', '0.6', 'monthly'),
    url('/contact', '0.6', 'monthly'),
    url('/request-quote', '0.8', 'monthly'),
    url('/blog/', '0.7', 'weekly'),
    url('/privacy-policy', '0.3', 'yearly'),
    url('/terms-of-service', '0.3', 'yearly'),
  ];

  const locationPages = locations.map(loc =>
    url(`/${loc.slug}`, loc.type === 'national' ? '0.85' : loc.type === 'state' ? '0.8' : '0.75', 'monthly')
  );

  const categoryPages = categories.map(cat =>
    url(`/product-category/${cat.slug}/`, '0.85', 'weekly')
  );

  const productPages = products.map(p =>
    url(`/product/${p.slug}`, '0.8', 'monthly')
  );

  const blogPages = blogPosts.map(p =>
    url(`/blog/${p.slug}/`, '0.6', 'monthly')
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.join('')}
${locationPages.join('')}
${categoryPages.join('')}
${productPages.join('')}
${blogPages.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
