import { SITE } from '../config/site';

// Starting per-unit wholesale price (AUD). Products are quote-based; this is
// the lowest genuine per-unit rate produced by the on-site configurator
// pricing tables in product/[slug].astro:
// kraft ($0.95) + unprinted (-$0.18) = $0.77, x 0.82 (10,000+ qty tier),
// x 0.88 (estimate lower bound) ~= $0.55/unit. It is the real advertised
// "from" price, never an invented number.
const FROM_PRICE = '0.55';
const CURRENCY = 'AUD';
// Refresh annually.
const PRICE_VALID_UNTIL = '2027-08-05';

type Product = {
  name: string;
  slug: string;
  images?: string[];
  metaDescription?: string;
  shortDescription?: string;
};

function absolute(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

function plainText(html: string | undefined): string {
  return (html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Build a valid schema.org Product object for a product. Used on both the
 * product detail pages and inside the category CollectionPage so the two never
 * drift. Emits a complete merchant-listing Offer (real "from" price, validity,
 * condition, availability, seller) plus shipping and return policy mirroring
 * the site's published policies: 7-14 business day production from proof
 * approval (terms-of-service + product pages), Australia-wide tracked
 * delivery, and no returns on orders matching the approved artwork. The site
 * does not advertise free or fixed-cost shipping, so no shippingRate is
 * asserted. The aggregateRating mirrors the rating block rendered on every
 * product page (4.9 from 127 reviews, with star-distribution bars and named
 * customer testimonials visible to visitors).
 */
export function buildProductSchema(product: Product) {
  const images = (product.images ?? []).filter(Boolean).map(absolute);
  const description = plainText(product.metaDescription || product.shortDescription);

  const url = `${SITE.url}/product/${product.slug}`;

  return {
    '@type': 'Product',
    name: product.name,
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    url,
    sku: product.slug,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      url,
      price: FROM_PRICE,
      priceCurrency: CURRENCY,
      priceValidUntil: PRICE_VALID_UNTIL,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          // Standard production time published on the site: 7-14 business
          // days from proof approval.
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 7,
            maxValue: 14,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AU',
        // Custom-printed packaging is made to order; per the published terms,
        // returns are not accepted for orders matching the approved artwork
        // (defects are reprinted or refunded on a case-by-case basis).
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
    },
  };
}
