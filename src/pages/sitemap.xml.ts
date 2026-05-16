import type { APIRoute } from 'astro';
import products from '../data/products.json';
import categories from '../data/categories.json';

const SITE_URL = 'https://zeecustomboxes.com.au';
const TODAY = new Date().toISOString().split('T')[0];

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
    url('/about', '0.6', 'monthly'),
    url('/contact', '0.6', 'monthly'),
    url('/request-quote', '0.8', 'monthly'),
    url('/privacy-policy', '0.3', 'yearly'),
    url('/terms-of-service', '0.3', 'yearly'),
  ];

  const categoryPages = categories.map(cat =>
    url(`/category/${cat.slug}`, '0.85', 'weekly')
  );

  const productPages = products.map(p =>
    url(`/product/${p.slug}`, '0.8', 'monthly')
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.join('')}
${categoryPages.join('')}
${productPages.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
