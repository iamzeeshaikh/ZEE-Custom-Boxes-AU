import { SITE } from '../config/site';

// Starting per-unit wholesale price (AUD). Products are quote-based; this is the
// advertised "from" price and drives the AggregateOffer lowPrice so each product
// is a valid Product snippet AND eligible for merchant listings.
const LOW_PRICE = '0.40';
const CURRENCY = 'AUD';

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
 * drift. Includes AggregateOffer (real "from" price), shipping and return
 * policy for merchant-listing eligibility, and the site's aggregate rating.
 */
export function buildProductSchema(product: Product) {
  const images = (product.images ?? []).filter(Boolean).map(absolute);
  const description = plainText(product.metaDescription || product.shortDescription);

  return {
    '@type': 'Product',
    name: product.name,
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    url: `${SITE.url}/product/${product.slug}`,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: CURRENCY,
      lowPrice: LOW_PRICE,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE.name },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: CURRENCY,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
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
        // Custom-printed packaging is made to order, so returns are not accepted.
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
