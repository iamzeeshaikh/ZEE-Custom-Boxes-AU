export function buildRichDescription(
  product: any,
  primaryCat: string,
  primaryCatSlug: string,
  related: any[]
): string {
  const rawName = product.name.replace(/^Order\s+/i, '').replace(/\s+Wholesale\s*$/i, '').trim();
  const cat     = primaryCat || 'Custom Packaging';
  const catUrl  = `/category/${primaryCatSlug}`;
  const rel0    = related[0] || null;
  const rel1    = related[1] || null;

  const short = (product.shortDescription || '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  const sents = short.match(/[^.!?]+[.!?]+/g) || [short];
  const mid   = Math.ceil(sents.length / 2);
  const intro1 = sents.slice(0, mid).join(' ').trim();
  const intro2 = sents.slice(mid).join(' ').trim();

  const specsTable = product.specifications
    ? '<div class="rich-table-wrap">' + product.specifications + '</div>'
    : '<div class="rich-table-wrap"><table class="rich-specs-table"><tbody>' +
      '<tr><th>Materials</th><td>300–400 GSM Cardboard, Kraft, Rigid Board, Corrugated</td></tr>' +
      '<tr><th>Printing Options</th><td>CMYK Offset, Digital, Pantone Matching</td></tr>' +
      '<tr><th>Coatings &amp; Finishes</th><td>Gloss, Matte, Soft-Touch, Spot UV, Foil Stamping, Embossing</td></tr>' +
      '<tr><th>Available Sizes</th><td>Fully custom — any dimension to suit your product</td></tr>' +
      '<tr><th>Minimum Order Qty</th><td>No minimum order quantity</td></tr>' +
      '<tr><th>Turnaround Time</th><td>7–14 business days after artwork approval</td></tr>' +
      '<tr><th>Shipping</th><td>Australia-wide — all states and territories</td></tr>' +
      '<tr><th>Eco-Friendly Options</th><td>Recycled cardboard, FSC-certified kraft, soy-based inks</td></tr>' +
      '</tbody></table></div>';

  const homeLink = '<a href="/" class="desc-link">ZEE Custom Boxes AU</a>';
  const catLink  = '<a href="' + catUrl + '" class="desc-link">' + cat + '</a>';
  const rel0Name = rel0 ? rel0.name.replace(/^Order\s+/i, '').replace(/\s+Wholesale\s*$/i, '').trim() : '';
  const rel1Name = rel1 ? rel1.name.replace(/^Order\s+/i, '').replace(/\s+Wholesale\s*$/i, '').trim() : '';
  const rel0Link = rel0 ? '<a href="/product/' + rel0.slug + '" class="desc-link">' + rel0Name + '</a>' : '';
  const rel1Link = rel1 ? '<a href="/product/' + rel1.slug + '" class="desc-link">' + rel1Name + '</a>' : '';

  const parts: string[] = [];

  if (intro1) parts.push('<p>' + intro1 + '</p>');
  if (intro2) parts.push('<p>' + intro2 + '</p>');

  parts.push(
    '<h2>Custom ' + rawName + ' for Australian Businesses</h2>' +
    '<p>At ZEE Custom Boxes AU, we specialise in crafting ' + rawName + ' built to the highest standards of construction and print quality. Whether you are launching a new product line or scaling an existing brand, our packaging is engineered to make a lasting impression at every touchpoint — from the retail shelf to the unboxing moment.</p>' +
    '<p>Every order we produce is treated as a true partnership. From your first enquiry through to dispatch, our team is dedicated to getting every detail right. We work through material selection, structural engineering, print proofing, and quality control with the same level of care regardless of order size. We believe premium packaging should be accessible to every Australian business, not just the largest brands.</p>' +
    '<p>Our ' + rawName + ' are manufactured using advanced printing technology and premium substrates sourced from certified suppliers. Each batch undergoes rigorous quality inspection before leaving our facility, so what arrives at your door matches exactly what you approved in your digital proof.</p>'
  );

  parts.push(
    '<h2>Materials and Printing Options</h2>' +
    '<p>Choosing the right combination of materials, printing method, and surface finish is what separates ordinary packaging from packaging that sells. For every ' + rawName + ' order, our team guides you through each decision so the final product perfectly matches your brand identity, product requirements, and budget.</p>' +
    '<h3>Material Choices</h3>' +
    '<p>Selecting the right material for your ' + rawName + ' is one of the most important decisions in the packaging process. It affects both the visual presentation and the structural performance of your finished box. We offer a comprehensive range of substrates to match every product category and budget level.</p>' +
    '<p>Our most popular materials include 300–400 GSM coated clay board for vibrant full-colour retail packaging, unbleached kraft paper for an eco-conscious and rustic look, rigid board for premium gift or luxury applications that demand a solid feel, and single or double-wall corrugated board when shipping protection is a priority. We can also source specialty stocks including textured papers, linen finishes, and cotton-feel substrates for high-end product lines.</p>' +
    '<h3>Printing Methods for ' + rawName + '</h3>' +
    '<p>We offer both offset lithography and digital printing for ' + rawName + ', with the most appropriate method determined by your order volume, artwork complexity, and colour requirements. Offset printing delivers consistent, highly accurate colour reproduction and is the preferred choice for large production runs. Digital printing provides outstanding flexibility for short runs, prototypes, and variable-data packaging where personalisation is required.</p>' +
    '<p>All printing is performed in CMYK with optional Pantone spot colour matching available for brands that require strict colour consistency across multiple print batches. Full-bleed printing is standard on all orders, and we support white ink printing on kraft and dark substrates.</p>' +
    '<h3>Finishing Options</h3>' +
    '<p>The finish applied to your ' + rawName + ' can dramatically elevate perceived value and shelf presence. Our finishing options include gloss lamination for vivid, light-reflective colours; matte lamination for a refined, anti-fingerprint surface; soft-touch coating for a premium velvet-like tactile experience; spot UV varnish to create contrast between sheen and matte areas; hot foil stamping in gold, silver, rose gold, holographic, and custom foil colours; and embossing or debossing to create dimensional brand marks that stand out by touch as well as sight.</p>' +
    '<p>Multiple finishes can be combined on a single ' + rawName + ' order to achieve layered visual effects. Matte lamination combined with spot UV and gold foil stamping is among the most requested premium combinations we produce for ' + cat + ' brands.</p>'
  );

  parts.push(
    '<h2>' + rawName + ' — Specifications Overview</h2>' +
    specsTable
  );

  parts.push(
    '<h2>Available Styles and Sizes</h2>' +
    '<p>We produce ' + rawName + ' across a wide variety of structural styles to suit different product shapes, retail environments, and opening experiences. Common configurations include straight tuck end, reverse tuck end, auto-bottom lock, seal end, two-piece lid and base, sleeve boxes, mailer boxes with self-locking tabs, and open-top display trays. If your product requires a structure not listed here, our packaging engineers can design a custom dieline from scratch.</p>' +
    '<p>All dimensions are fully custom. We work to your exact measurements, whether you need a compact jewellery box, a standard retail carton, or a large-format presentation box. A digital 3D proof is provided for every order so you can verify the dimensions, layout, and visual presentation before production begins.</p>' +
    '<p>We can also incorporate value-added structural features into your ' + rawName + ', including die-cut window panels, magnetic closure strips, ribbon handles, foam or cardboard inserts, internal dividers, and velcro or button tabs. These features can meaningfully enhance the unboxing experience and increase perceived product value.' +
    (rel0Link ? ' If you are also looking for complementary packaging, consider our ' + rel0Link + '.' : '') + '</p>'
  );

  parts.push(
    '<h2>How to Order Your ' + rawName + '</h2>' +
    '<ol>' +
    '<li><strong>Request a Free Quote</strong> — Complete our short quote form with your packaging type, quantity, approximate dimensions, material preference, and any design notes. We respond with a detailed quote within 24 business hours at no obligation.</li>' +
    '<li><strong>Review and Confirm</strong> — Our packaging consultant will send a full quotation covering substrate options, unit pricing at various quantities, and a production timeline. We welcome adjustments to meet your budget or requirements.</li>' +
    '<li><strong>Free Artwork Creation</strong> — Once you confirm your order and a deposit is received, our in-house designers create your artwork at no charge. We produce a 3D digital mockup for your review and approval before any printing begins.</li>' +
    '<li><strong>Production</strong> — After written approval of your artwork proof, your ' + rawName + ' enter the production queue. Standard turnaround is 7–14 business days. Express production is available on request for urgent orders.</li>' +
    '<li><strong>Quality Inspection</strong> — Every completed order is inspected by our quality control team for print colour accuracy, structural consistency, lamination adhesion, and finishing quality before packing for dispatch.</li>' +
    '<li><strong>Delivery Across Australia</strong> — Your ' + rawName + ' are carefully packed to prevent transit damage and shipped directly to your door anywhere in Australia. Tracking details are provided upon dispatch so you can monitor your delivery in real time.</li>' +
    '</ol>'
  );

  parts.push(
    '<h2>Key Benefits of Our ' + rawName + '</h2>' +
    '<ul>' +
    '<li><strong>Free professional design service</strong> — expert artwork creation at no additional cost, with revisions included until you are completely satisfied</li>' +
    '<li><strong>No minimum order quantity</strong> — order as few or as many units as your business demands, from a single prototype to tens of thousands</li>' +
    '<li><strong>Premium-grade materials</strong> — durable, print-ready substrates that protect your product and present your brand at its best</li>' +
    '<li><strong>Fast 7–14 day production</strong> — competitive turnaround without cutting corners on quality or attention to detail</li>' +
    '<li><strong>Nationwide delivery</strong> — reliable, tracked shipping to every state and territory across Australia</li>' +
    '<li><strong>Transparent wholesale pricing</strong> — honest, itemised quotes with no hidden fees and volume discounts on larger orders</li>' +
    '<li><strong>Eco-friendly packaging options</strong> — recycled board, FSC-certified kraft, and plant-based inks available on request</li>' +
    '<li><strong>Dedicated packaging support</strong> — a real expert guides your order from initial enquiry through to delivery</li>' +
    '</ul>'
  );

  parts.push(
    '<h2>Industries That Use ' + rawName + '</h2>' +
    '<p>Our ' + rawName + ' are trusted by businesses across a wide range of Australian industries. The largest customer groups include cosmetics and beauty brands seeking elegant retail presentation; food and beverage companies requiring food-safe, shelf-ready packaging; e-commerce and subscription businesses that need durable mailer-style boxes that protect products in transit; and gift, luxury, and lifestyle brands that prioritise a premium unboxing experience.</p>' +
    '<p>We also supply ' + rawName + ' to pharmaceutical and health product companies, CBD and wellness brands, candle makers, jewellers, apparel labels, electronics retailers, and corporate gifting businesses. Regardless of your sector, our team has the experience to advise on materials, structures, and finishes that are appropriate for your specific product and regulatory requirements.' +
    (rel1Link ? ' You may also find our ' + rel1Link + ' a useful complement to your current order.' : '') + '</p>' +
    '<p>Our full range of ' + catLink + ' covers many complementary product types, allowing you to establish a consistent packaging identity across your entire product range with a single supplier.</p>'
  );

  parts.push(
    '<h2>Why Choose ZEE Custom Boxes AU</h2>' +
    '<p>ZEE Custom Boxes AU has built a strong reputation in the Australian packaging market by consistently delivering on three core promises: premium quality, reliable turnaround, and honest pricing. We invest in modern printing equipment, trained craftspeople, and rigorous quality control processes so that every order we produce meets the standard you approved in your proof.</p>' +
    '<p>We understand that packaging is not simply a container — it is a critical brand asset and customer experience touchpoint. That is why we take the time to understand your product, your audience, and your brand positioning before making any recommendations. Our free design service is a genuine commitment, not a marketing claim. Our designers will work with you through as many revision rounds as it takes to produce artwork you are proud of.</p>' +
    '<p>Our 4.9-star rating across Google and verified review platforms reflects the confidence our clients place in us. We back every order with a quality guarantee: if your ' + rawName + ' contain a defect or do not match your approved artwork, we will reprint or refund — no lengthy disputes, no bureaucracy.</p>'
  );

  parts.push(
    '<h2>Order Your ' + rawName + ' Today</h2>' +
    '<p>Getting started is straightforward. Use the quote form on this page to describe your ' + rawName + ' requirements — product dimensions, approximate quantity, material preferences, and any special finishing you have in mind. Our packaging team will respond with a detailed, obligation-free quote within 24 business hours.</p>' +
    '<p>Visit the ' + homeLink + ' homepage to explore our full catalogue of custom packaging solutions, browse related products in our ' + cat + ' range, and learn more about the materials and finishes we offer. Our team is ready to help you create ' + rawName + ' that genuinely elevate your brand and delight your customers.</p>'
  );

  return parts.join('\n');
}
