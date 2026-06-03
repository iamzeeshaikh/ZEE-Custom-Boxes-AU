type ProductType =
  | 'cosmetic' | 'kraft' | 'soap' | 'gift' | 'pillow'
  | 'rigid' | 'bakery' | 'display' | 'retail' | 'food'
  | 'candle' | 'corrugated' | 'mailer' | 'cbd' | 'pharma'
  | 'chocolate' | 'popcorn' | 'match' | 'cardboard'
  | 'business_card' | 'sticker' | 'folder' | 'pizza' | 'tray'
  | 'christmas' | 'beverage' | 'candy' | 'soap' | 'general';

function detectType(name: string, categories: string[]): ProductType {
  const n = name.toLowerCase();
  const c = categories.join(' ').toLowerCase();

  if (n.includes('christmas') || n.includes('xmas')) return 'christmas';
  if (n.includes('pizza')) return 'pizza';
  if (n.includes('popcorn')) return 'popcorn';
  if ((n.includes('chocolate') && !n.includes('kraft')) || n.includes('truffle') || n.includes('hot choc')) return 'chocolate';
  if ((n.includes('match') && n.includes('box')) || c.includes('match box')) return 'match';
  if (n.includes('business card') || c.includes('business card')) return 'business_card';
  if (n.includes('sticker') || (n.includes(' label') && !n.includes('lip balm') && !n.includes('candle label')) || c.includes('sticker') || c.includes('label')) return 'sticker';
  if (n.includes('folder') || c.includes('folder')) return 'folder';
  if (n.includes('candle')) return 'candle';
  if (n.includes('cbd') || n.includes('vape') || n.includes('tincture')) return 'cbd';
  // Use word boundary so "pillow" doesn't trigger pharma
  if (/\bpill\b/.test(n) || n.includes('medicine') || n.includes('lab box') || c.includes('pharmaceutical')) return 'pharma';
  if (n.includes('pillow box') || c.includes('pillow box')) return 'pillow';
  if (n.includes('corrugated')) return 'corrugated';
  if (n.includes('mailer') || (n.includes('shipping') && n.includes('box')) || n.includes('postal box')) return 'mailer';
  if (n.includes('display')) return 'display';
  if (n.includes('rigid')) return 'rigid';
  if (n.includes('tray') || c.includes('tray')) return 'tray';
  if (n.includes('candy') || c.includes('candy')) return 'candy';
  if (n.includes('coffee') || (n.includes('tea') && n.includes('box')) || c.includes('beverage')) return 'beverage';
  if (n.includes('brown') || c.includes('brown boxes')) return 'kraft';
  if (n.includes('kraft')) return 'kraft';
  if (n.includes('bakery') || n.includes('pastry') || n.includes('cake') || n.includes('biscotti') || n.includes('bagel') || n.includes('cookie') || c.includes('bakery')) return 'bakery';
  if (n.includes('burger') || n.includes('hot dog') || n.includes('french fry') || n.includes('macaron') || n.includes('pasta') || n.includes('gummy') || n.includes('frozen') || n.includes('fast food') || n.includes('fried chicken') || n.includes('cone sleeve') || (n.includes('food') && (n.includes('box') || n.includes('pack'))) || c.includes('food packaging')) return 'food';
  if (n.includes('soap')) return 'soap';
  if (n.includes('cream') || n.includes('perfume') || n.includes('lipstick') || n.includes('lip') || n.includes('eyelash') || n.includes('lotion') || n.includes('essential oil') || n.includes('beard oil') || n.includes('hair extension') || n.includes('cosmetic') || n.includes('beauty') || c.includes('cosmetic')) return 'cosmetic';
  if (n.includes('gift') || n.includes('scarf') || n.includes('ribbon') || n.includes('flower') || n.includes('necklace') || n.includes('earring') || n.includes('promotional') || n.includes('holiday') || c.includes('gift')) return 'gift';
  if (n.includes('retail') || n.includes('hanger') || c.includes('retail')) return 'retail';
  if (n.includes('cardboard') || c.includes('cardboard')) return 'cardboard';
  return 'general';
}

function specsTableHtml(product: any): string {
  if (product.specifications) return `<div class="rich-table-wrap">${product.specifications}</div>`;
  return `<div class="rich-table-wrap"><table class="rich-specs-table"><tbody>
<tr><th>Material Options</th><td>300–400 gsm cardboard, natural kraft, rigid greyboard, corrugated board</td></tr>
<tr><th>Printing</th><td>Full-colour CMYK; Pantone spot colour matching available</td></tr>
<tr><th>Surface Finishes</th><td>Gloss lam, matte lam, soft-touch, spot UV, hot foil, embossing, debossing</td></tr>
<tr><th>Dimensions</th><td>Fully custom — engineered to your product measurements</td></tr>
<tr><th>Minimum Order</th><td>No minimum order quantity</td></tr>
<tr><th>Production Time</th><td>7–14 business days from artwork approval</td></tr>
<tr><th>Delivery</th><td>Australia-wide, all states and territories</td></tr>
<tr><th>Eco Options</th><td>FSC-certified kraft, recycled board, soy-based inks</td></tr>
</tbody></table></div>`;
}

// ─── TYPE CONTENT GENERATORS ────────────────────────────────────────────────
// Each type produces a DIFFERENT page structure — unique H2s, different section order.

function cosmeticContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Cosmetic Packaging in the Australian Beauty Market</h2>
<p>The Australian beauty and personal care retail environment is one of the most packaging-conscious in the country. Shoppers in this category make purchasing decisions based on what the packaging communicates before they touch the product — the finish, the weight of the board, the accuracy of the colour. Getting those signals right is not a nice-to-have. It directly affects conversion at shelf and repeat purchase online.</p>
<p>${n} need to hold print colour accurately across CMYK and Pantone specifications, accept premium surface finishes without edge curling or delamination, and maintain structural integrity through the logistics of retail distribution. The substrate choice sets the ceiling for all of those requirements.</p>

<h2>Board and Surface Finish Options for ${n}</h2>
<p>The standard substrate for cosmetic cartons in Australia is SBS (Solid Bleached Sulphate) clay board in the 300–400 gsm range. It prints cleanly, cuts crisply, and accepts lamination without adhesion issues. For brands with a natural or sustainability-forward positioning, FSC-certified white kraft is an alternative — it prints with a slightly warmer character that many beauty brands use deliberately.</p>
<p>Soft-touch matte lamination is the most requested finish across our cosmetic client base. It creates a tactile premium signal that gloss lamination does not — and it photographs well for product imagery. Spot UV over a matte base is a close second, particularly for brands that want to direct attention to a logo mark or product name without the entire pack reading as shiny. Gold foil stamping remains the go-to for fragrance and luxury skincare brands.</p>

${specs}

<h2>Structural Formats — Tuck-End, Sleeve, Drawer, and Rigid</h2>
<p>Most cosmetic cartons in the mid-market use a straight-tuck or reverse-tuck end format — they flat-pack efficiently, assemble quickly on a packing line, and present well on a pharmacy or beauty retailer shelf. Sleeve boxes (a tray that slides into a printed outer) are popular for gift sets and multipack presentations where the unboxing moment matters more than packing speed.</p>
<p>Rigid boxes (greyboard 1,200–2,400 gsm, wrapped in print paper) are reserved for luxury cosmetic applications — perfume gift sets, skincare collector editions, and high-end beauty launch packs. The weight of the board signals premium quality in a way no folding carton can replicate.${rel1 ? ' Our ' + rel1 + ' is a popular option in this space.' : ''}</p>

<h2>Colour Accuracy for Cosmetic Brands</h2>
<p>Cosmetic brands with defined brand colour systems need Pantone spot colour matching — CMYK cannot reliably reproduce specific reds, corals, or custom brand colours within the tolerance a beauty brand requires for retail recognition across multiple print runs.</p>
<p>We manage Pantone matching on all ${n} orders and provide a colour-matched digital proof before production. If your product line spans multiple SKUs with the same base colour across different box sizes, we can align the print specification across all variants in a single production run.${rel0 ? ' If you also need ' + rel0 + ', we can quote both together.' : ''}</p>

<h2>Getting Your ${n} Made</h2>
<ol>
<li><strong>Submit your brief</strong> — dimensions, quantity, material and finish preferences, any brand files</li>
<li><strong>Quote and substrate recommendation</strong> — response within 24 hours, tiered pricing included</li>
<li><strong>Free artwork</strong> — our designers produce a 3D mockup and flat dieline for approval</li>
<li><strong>Production</strong> — 7–14 business days from written artwork approval</li>
<li><strong>Delivery</strong> — tracked, Australia-wide</li>
</ol>`;
}

function kraftContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Why Kraft Works in the Australian Natural and Artisan Market</h2>
<p>Kraft packaging has shifted from a purely functional material into a deliberate brand aesthetic. When a customer picks up a product in unbleached kraft packaging, they read it as a signal — natural ingredients, handmade production, honest sourcing. That reading happens before any copy is processed. For brands in artisan food, natural beauty, wellness, and eco-lifestyle categories, the material itself is doing part of the brand communication work.</p>
<p>The key is matching the kraft variant to the brand position. Not all kraft looks or performs the same.</p>

<h2>Unbleached vs Bleached Kraft — Which Is Right for ${n}</h2>
<p>Unbleached kraft keeps the natural brown colour of the wood pulp. It prints with a warm cast — CMYK blues shift slightly green, and true white is not achievable. That warm, organic print quality is often exactly what artisan brands want. Bleached kraft is processed to a white or off-white surface while keeping the structural properties of kraft board — it prints more accurately and is the right choice when full-colour artwork needs to read cleanly without the warm shift.</p>
<p>Both variants are available in FSC-certified grades. If your brand makes sustainability claims about its packaging, we can provide the chain-of-custody documentation that backs up those claims accurately.</p>

${specs}

<h2>Print Results on Kraft — What to Expect</h2>
<p>Full-colour CMYK printing is available on both unbleached and bleached ${n}. On unbleached stock, colours print with a natural, slightly muted character — warm tones read richly, cool tones shift warm. On bleached kraft, colour accuracy improves significantly. Our design team adjusts colour profiles for kraft printing and flags any artwork elements that may not reproduce well before the order goes to press.</p>
<p>Matte aqueous coating is the most common surface treatment — it protects the print without adding the synthetic sheen that contradicts the natural aesthetic of kraft. Hot foil stamping in gold or copper against the brown surface is a high-impact embellishment that many artisan brands use as a signature element.${rel1 ? ' See also our ' + rel1 + ' for related formats.' : ''}</p>

<h2>What Australian Brands Use ${n} For</h2>
<ul>
<li>Artisan soap brands presenting handmade bars in a format that matches the product's natural positioning</li>
<li>Wholefood and health food producers packaging dry goods, snacks, and supplement products</li>
<li>Independent candle makers using kraft cartons to align packaging with clean, natural brand messaging</li>
<li>Specialty coffee roasters and tea producers packaging retail pouches and gift sets</li>
<li>Natural skincare labels for whom a kraft carton is part of a broader eco-certification story</li>
</ul>
${rel0 ? '<p>If you are also considering ' + rel0 + ', we can quote and produce both formats from a single brief.</p>' : ''}

<h2>Placing Your Kraft Packaging Order</h2>
<ol>
<li><strong>Brief</strong> — product dimensions, quantity, unbleached or bleached preference, any design assets</li>
<li><strong>Quote</strong> — sent within 24 hours with tiered volume pricing</li>
<li><strong>Design</strong> — free artwork adjusted for kraft print characteristics, 3D mockup provided</li>
<li><strong>Production</strong> — 7–14 business days from approval</li>
<li><strong>Delivery</strong> — tracked to any Australian address</li>
</ol>`;
}

function soapContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Soap Packaging That Sells the Product Twice</h2>
<p>The first sale happens at point of purchase — the customer sees the box on a market table or boutique shelf and picks it up. The second happens when they get home and take the soap out. Both moments matter, and both are shaped by the packaging choice. A soap box that photographs well at the market stall, opens cleanly, and presents the bar correctly earns the brand repeat business in a way that a plain sleeve never does.</p>
<p>${n} need to hold the bar securely during retail display, survive a few days in a humid bathroom environment without losing structural integrity, and communicate the brand's values clearly within a small amount of printable space.</p>

<h2>Kraft vs Art Board — Choosing the Right Material</h2>
<p>For most artisan soap brands, unbleached kraft is the default choice — the earthy, natural character of the board reinforces the handmade and natural positioning of the product inside. It prints with a warm, organic quality that cold-process and botanical soap brands use deliberately. Art board (SBS, 300–350 gsm) is the right choice when colour accuracy matters more — when the soap bar itself is vividly coloured and the packaging needs to reflect that precisely, or when the brand design is more editorial and less artisan.</p>
<p>Board weight matters more for soap than people assume. A single bar of 100–120 g needs at minimum 300 gsm to maintain structural integrity in a tuck-end format. Heavier bars (200 g+) benefit from 350–400 gsm or a lock-bottom construction where the base is assembled before packing rather than tucked.</p>

${specs}

<h2>Window Panels, Belly Bands, and Closure Options</h2>
<p>Windowed soap boxes use a clear PET film panel die-cut into the face of the box, letting the soap's colour, texture, and any embedded botanicals do the selling from inside the packaging. The window can be rectangular, oval, arch-shaped, or custom die-cut. This format is highly effective for bars where the visual character of the soap — swirled colours, dried flowers, textured surfaces — is the primary purchase trigger at the market stall or boutique shelf.</p>
<p>Belly bands are the minimal alternative — a printed card strip wraps around an unwrapped or tissue-wrapped bar, and the bar is held by the band tension rather than enclosed. This format uses less material, works well for artisan brands that hand-wrap each bar in tissue or wax paper first, and creates a slightly different aesthetic.${rel1 ? ' We also produce ' + rel1 + ' for brands that want a gift-set presentation.' : ''}</p>

<h2>Sizing for Single Bars, Multipacks, and Gift Sets</h2>
<p>Standard single soap bars range from 75 × 45 × 30 mm at the smaller end through to 110 × 65 × 35 mm for larger artisan bars. The box internal dimensions are typically 2–3 mm larger than the bar on each face to allow for easy insertion and removal. For twin-bar or triple-bar sets, we design an appropriately sized box with internal partitions to keep bars separated and stable.</p>
<p>Gift sets with three or more bars are often better served by a rigid box with individual bar compartments — the lid-off reveal of a set of three artisan soaps in a rigid box is a stronger unboxing moment than the same bars in a tuck-end carton.${rel0 ? ' See our ' + rel0 + ' for those applications.' : ''}</p>

<h2>Getting Your Soap Boxes Made</h2>
<ol>
<li><strong>Bar dimensions</strong> — length, width, height of your soap bar and approximate weight</li>
<li><strong>Format decision</strong> — enclosed box, windowed box, or belly band</li>
<li><strong>Quote</strong> — we respond within 24 hours with pricing across multiple quantities</li>
<li><strong>Free artwork</strong> — 3D proof and dieline for approval, no charge</li>
<li><strong>7–14 day production</strong> — tracked delivery Australia-wide</li>
</ol>`;
}

function pillowContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>The Pillow Box Format — Why It Works for Gifts and Boutique Retail</h2>
<p>Pillow boxes are a good fit when the unboxing moment matters more than structural rigidity. The curved form reads as intentional and considered — not just a container, but part of the gift itself. For small jewellery, hair accessories, artisan chocolates, or boutique retail items in the AU$15–80 range, they consistently outperform standard tuck-end cartons for customer reaction at point of purchase.</p>
<p>The curved push-in closure is simple enough for customers to open and close without damaging the packaging, which matters for retail environments where a customer picks up and replaces a product several times before buying. The format also flat-packs efficiently for storage and ships without wasted void fill.</p>

<h2>Paper Stock and Print Options for ${n}</h2>
<p>Pillow boxes are typically produced from 300–350 gsm art board or a natural 280–350 gsm kraft stock. Art board gives a clean white base for full-colour printing — good for brand-heavy designs, photographic elements, or any design where colour accuracy matters. Kraft gives the earthy, tactile quality that works well for artisan, organic, or sustainably-positioned products.</p>
<p>Gloss lamination intensifies printed colour and adds a wipe-clean durability that holds up well in retail environments. Matte lamination gives a more refined result — fingerprint-resistant and with a slightly higher perceived quality in the AU boutique and gift retail segment. Soft-touch matte is the premium version of that finish, with a velvet-like feel that is noticeable the moment a customer picks up the box.</p>

${specs}

<h2>Sizes and What They Are Best Suited For</h2>
<p>Small pillow boxes (roughly 90 × 55 mm flat dimension) are designed for rings, earring studs, small pendants, and individually wrapped confectionery. Medium formats (130 × 80 mm) work well for bracelets, anklets, small hair accessories, and bath bomb single-serves. Larger configurations (180 × 110 mm and above) suit folded scarves, clutch wallets, two-to-three chocolate bars, or artisan soap bars wrapped in tissue.</p>
<p>All dimensions in our range are custom — if none of the standard proportions suit your product, we design the dieline around your specific measurements. Providing the product's length, width, and height lets us calculate the correct flat dimensions and curved tuck depth.${rel1 ? ' We also produce ' + rel1 + ' for applications where a more structured format is needed.' : ''}</p>

<h2>What Australian Retailers and Gift Brands Use ${n} For</h2>
<ul>
<li>Jewellery boutiques packaging rings, earrings, and pendants for over-the-counter gift purchase</li>
<li>Wedding favour businesses using printed pillow boxes for bonbonnieres and table place items</li>
<li>Artisan chocolate makers presenting single bars or truffles for farmers market and specialty store retail</li>
<li>Hair accessories brands packaging clips, scrunchies, and pins for boutique retail display</li>
<li>Online gift retailers using pillow boxes as branded packaging for small-format gift items</li>
<li>Event businesses producing branded packaging for conference or celebration gift inclusions</li>
</ul>
${rel0 ? '<p>If you need volume packaging across multiple formats, ' + rel0 + ' may also be relevant to your brief.</p>' : ''}

<h2>Getting Your ${n} Produced</h2>
<ol>
<li><strong>Product dimensions</strong> — length, width, height of what goes inside</li>
<li><strong>Stock and finish</strong> — art board or kraft, gloss/matte/soft-touch preference</li>
<li><strong>Free quote</strong> — within 24 hours, tiered pricing across quantities</li>
<li><strong>Artwork</strong> — free design, 3D mockup for approval before production</li>
<li><strong>Production and delivery</strong> — 7–14 days, tracked Australia-wide</li>
</ol>`;
}

function giftContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>The Mechanics of a Good Gift Unboxing</h2>
<p>The moment a gift recipient opens a box communicates something about the person who gave it. A lid that lifts cleanly, a box that holds its shape, an interior that presents the product correctly — these details are read as care and intention. ${n} are designed around that moment, not just around the functional requirement of holding the product safely.</p>
<p>The structural format — folding carton, rigid lid-and-base, magnetic closure, or drawer box — determines how that moment unfolds, and it should be chosen based on the product's price point, the gifting context, and the desired unboxing experience.</p>

<h2>Structural Formats Available for ${n}</h2>
<p>Folding cartons (SBS 350–450 gsm) with tissue inserts are the cost-effective standard for mid-range gifting — they present well, hold a product securely, and can be produced at volumes that make per-unit pricing workable for gift brands operating in the AU$25–60 product range. A tuck-end box with a tissue interior does the job without requiring the production complexity of a rigid construction.</p>
<p>Rigid lid-and-base boxes (greyboard 1,200–2,400 gsm, wrapped in specialty print paper) are the correct choice when the product's price point demands a packaging weight that matches. The weight of a rigid box in a customer's hand before they open it is part of the luxury signal. Magnetic closure strips embedded in the lid and base add the snap-close moment that luxury gift brands consistently specify.${rel1 ? ' Related options include our ' + rel1 + '.' : ''}</p>

${specs}

<h2>Finishes That Read as Premium in Australian Gift Retail</h2>
<p>Soft-touch matte lamination on a folding carton is the most cost-effective premium finish available in the Australian gift packaging market. The velvet-like surface character creates an immediate quality signal that a standard gloss laminated box does not. For rigid boxes, a matte wrap paper with spot UV on the brand mark is the standard premium configuration — understated but clearly high quality.</p>
<p>Gold foil stamping on either format is the most impactful single embellishment for gift packaging in Australia — the metallic contrast against matte or soft-touch board communicates occasion and premium value in a single visual hit. It does not need to be used heavily; a logo mark or product name in gold foil is sufficient to shift the whole pack reading upward.${rel0 ? ' If you are also sourcing ' + rel0 + ', we can consolidate both into a single quote.' : ''}</p>

<h2>Gift Packaging in the Australian Corporate and Retail Market</h2>
<ul>
<li>Luxury retail brands packaging jewellery, accessories, and lifestyle products for over-the-counter gift purchase</li>
<li>Corporate gifting programmes sourcing end-of-year client boxes, onboarding gift packs, and event giveaways</li>
<li>Wedding businesses producing presentation boxes for bridesmaid gifts, bonbonnieres, and ceremony favours</li>
<li>E-commerce gift brands that sell direct-to-consumer and need packaging that performs as a branded unboxing experience</li>
<li>Florist and fresh produce gift companies packaging dried arrangements, gourmet hamper components, and occasion gifts</li>
</ul>

<h2>From Brief to Box</h2>
<ol>
<li><strong>Product dimensions and price point</strong> — tells us the correct format and board grade</li>
<li><strong>Quote with format recommendation</strong> — within 24 hours, tiered quantities</li>
<li><strong>Free artwork</strong> — 3D digital mockup for approval, no charge</li>
<li><strong>Production</strong> — 7–14 business days (rigid formats may take 10–14 days)</li>
<li><strong>Delivery</strong> — tracked, anywhere in Australia</li>
</ol>`;
}

function rigidContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>How Magnetic Closure Engineering Affects the Unboxing Moment</h2>
<p>The snap of a magnetic closure is not an accident — it is an engineered tactile moment that signals quality before the product is even seen. The magnet strength, the greyboard thickness, and the precision of the lid-to-base fit all determine whether that moment lands as premium or falls flat. ${n} are constructed around getting that moment right.</p>
<p>The greyboard core ranges from 1 mm (appropriate for lighter products and smaller formats) through to 3 mm for luxury applications where the weight of the box in the hand is itself a quality signal. The exterior is wrapped in specialty print paper — art paper, textured stock, or soft-touch paper — and finished to specification before the magnetic strips are embedded flush with the lid and base panels.</p>

<h2>Greyboard Thickness and Wrap Paper Options</h2>
<p>The choice of greyboard thickness is a structural and tactile decision, not just a cost one. Thinner board (1–1.5 mm) is appropriate for smaller rigid boxes holding jewellery, accessories, or small cosmetic products. Mid-range thickness (1.5–2 mm) suits most gift and retail applications — electronics accessories, candles, beauty gift sets. Heavy board (2–3 mm) is specified for prestige applications where every component of the box needs to communicate luxury — high-end spirits, watches, corporate gifts.</p>
<p>Wrap paper options include: gloss art paper (vivid, high-shine), matte art paper (refined, anti-fingerprint), soft-touch paper (velvet-like feel), and textured uncoated stock (natural, premium — widely used by fragrance and jewellery brands). The wrap paper is laminated or varnished to the chosen specification before application to the greyboard shell.${rel1 ? ' We also produce ' + rel1 + ' for applications where a folding carton format is more appropriate.' : ''}</p>

${specs}

<h2>Surface Finishes That Signal Premium Before the Box Opens</h2>
<p>The most impactful finish combination for ${n} in the Australian premium market is soft-touch wrap paper with spot UV on the brand mark. The matte base creates a refined, tactile feel; the spot gloss on the logo creates a visual contrast that directs the eye without appearing decorative. This combination is used consistently by Australian luxury beauty, jewellery, and lifestyle brands because it photographs well and handles well through retail.</p>
<p>Gold hot foil stamping on the exterior wrap is the statement embellishment — applied with heat and pressure to the logo, product name, or border elements, it cannot be replicated digitally and creates a premium signal that resonates across gifting, cosmetics, and corporate packaging contexts.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Where Rigid Boxes Win in the Australian Market</h2>
<ul>
<li>Luxury cosmetics and fragrance brands where the box stays on a customer's vanity after the product is used</li>
<li>Premium spirits and wine gifting, where the structural weight of the box reinforces the product's price positioning</li>
<li>Jewellery retail, where a rigid lid-base box is the expected presentation format for the purchase price range</li>
<li>Corporate gifting companies where the box is the first thing a client physically receives from the brand</li>
<li>Technology accessories brands at the premium end where unboxing content is shared and the box contributes to perceived value</li>
</ul>

<h2>Lead Time, Minimums, and How to Start</h2>
<p>Rigid box production involves more steps than folding carton work — the greyboard cutting, forming, wrapping, and closure installation add production time. Standard lead time is 10–14 business days from artwork approval. No minimum order quantity applies; however, per-unit pricing at low quantities reflects the additional production steps involved.</p>
<p>To start, use the quote form on this page with your product dimensions, the greyboard thickness you are considering, and your preferred wrap paper and finish. We respond with a detailed quote and a 3D mockup concept within 24 hours.</p>`;
}

function bakeryContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>What Food-Safe Bakery Packaging Actually Means</h2>
<p>Food safety in bakery packaging is not just about the materials being technically non-toxic — it covers the full specification: board grade, adhesive formulation, printing ink chemistry, and any interior coatings. In Australia, food contact packaging must comply with the relevant Australian and New Zealand food standards, and the certification should be traceable to the specific materials used in your order, not just a blanket claim about the product category.</p>
<p>Our ${n} use food-grade board and adhesive formulations with traceable food contact certification. If your bakery supplies a retailer or food service account that requires documentation, we can provide the relevant material safety data for the board and inks used in your order.</p>

<h2>Board Weight, Greaseproofing, and Window Options</h2>
<p>Standard bakery cartons use 350–400 gsm SBS clay board. This provides adequate structural rigidity for portion-sized pastries, cookies, and slices, and a clean white surface for full-colour branding. For products with high fat or oil content — croissants, Danish pastries, fried items, or butter-rich cakes — a greaseproof interior coating is required. Without it, oil migrates through the board within minutes, saturating the exterior print and compromising the structure of the box.</p>
<p>Windowed panels use food-safe PET film die-cut into the box face or lid. Rectangular, oval, and arch windows are standard; custom die-cut shapes are available for brands that want a more distinctive shelf presence. The window format is particularly effective for products where the visual character of what is inside — a coloured macaron, a decorated tart, an artisan biscuit — drives the purchase decision at the counter.${rel1 ? ' For products requiring larger presentation formats, our ' + rel1 + ' is worth reviewing.' : ''}</p>

${specs}

<h2>Common Bakery Box Formats in Australian Cafés and Patisseries</h2>
<p>Tuck-end cartons are the standard for individual-serve pastries, slices, and portion-sized cake squares — they assemble quickly without tools and close securely for customer carry-out. Lock-bottom construction is specified for heavier items (whole cakes, heavy tarts, multi-piece sets) where the base needs to be pre-assembled before loading rather than tucking in under the weight of the product.</p>
<p>Window boxes in a three-quarter-lid configuration — where the lid covers the back two-thirds of the box and the front third is open, revealing the product — are popular for display counter presentation of macarons, petit fours, and decorated cookies in boutique patisseries.${rel0 ? ' For café-branded takeaway packaging, ' + rel0 + ' covers the flat-bottom carton formats commonly used in that context.' : ''}</p>

<h2>Sizing for Single Serves, Slices, Cakes, and Gift Boxes</h2>
<ul>
<li>Single macaron or petit four: approximately 60 × 60 × 40 mm internal — small enough to stack on a display tray without taking up counter space</li>
<li>Individual slice or bar: 120 × 60 × 40–50 mm — the most common single-serve format for café slice and brownie portioning</li>
<li>Four-macaron box: 200 × 65 × 45 mm — with internal paper dividers to keep each macaron in position</li>
<li>Whole tart or small cake (18 cm): approximately 220 × 220 × 80 mm with a lock-bottom base for load stability</li>
<li>Cookie gift box (6 pieces): approximately 250 × 120 × 50 mm with individual card inserts</li>
</ul>

<h2>Placing Your Bakery Packaging Order</h2>
<ol>
<li><strong>Product details</strong> — what you are packaging, approximate weight, whether greaseproof coating is needed</li>
<li><strong>Dimensions</strong> — internal measurements or product measurements so we can calculate the correct box size</li>
<li><strong>Quote</strong> — within 24 hours, tiered pricing across quantities from small trial runs to ongoing wholesale</li>
<li><strong>Free artwork</strong> — our designers produce a 3D mockup adjusted for the bakery box format</li>
<li><strong>Production and delivery</strong> — 7–14 business days, delivered to your business address anywhere in Australia</li>
</ol>`;
}

function displayContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Counter Display vs Floor Display — Choosing the Right Format</h2>
<p>The commercial brief for a counter PDQ tray and a floor display stand are different enough that they should be considered as separate decisions. Counter displays sit at checkout or service desk level — they need to hold individual units in a forward-facing arrangement for easy self-selection and survive daily restocking without looking battered. Floor displays hold significantly higher unit counts, are typically placed at category entry or aisle end, and need to withstand more aggressive handling over longer campaign periods.</p>
<p>${n} need to perform reliably in their specific retail environment, not just look good in a print-ready rendering. The board grade, construction method, and header card configuration should all be selected with the actual in-store conditions in mind.</p>

<h2>Header Card Design and Its Role in Retail Conversion</h2>
<p>The header card is the primary brand communication surface on any display unit — it does the selling at a distance of 3–5 metres, in an environment where the customer is moving and has half a second of attention to give. Full-colour CMYK printing on SBS board delivers photographic-quality graphics for counter display headers. For corrugated floor displays, litho laminate printing (offset print on art paper, laminated to the corrugated substrate) achieves near-retail-carton print quality on a much more structurally robust format.</p>
<p>The most effective header cards in Australian retail communicate a single message clearly — product name, key benefit, and price point — rather than trying to carry the full brand story. Our design team can assist with header card layout optimisation for the specific retail environment your ${n} will be used in.${rel1 ? ' Related format: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Construction Specs for PDQ and Shelf-Ready Packaging</h2>
<p>Counter PDQ trays for lightweight impulse items use 350–400 gsm SBS board. For heavier products (cosmetics, canned goods, small electronics), single-wall corrugated board in B or C flute provides the structural base strength needed for a full tray of product. Shelf-ready packaging (SRP) that converts from shipper to display unit — by removing the lid or front panel — is typically produced in single-wall corrugated with litho laminate printing for the retail-facing panels.</p>
<p>All display packaging we produce is engineered for the product count and weight you specify. The shelf width, depth, product footprint, and unit count per tray are all factored into the structural design.${rel0 ? ' If you also need ' + rel0 + ', we can include both formats in a single production quote.' : ''}</p>

<h2>Who Buys Counter Display Packaging in Australia</h2>
<ul>
<li>FMCG brands launching new SKUs and needing prominent placement during the launch window without a permanent shelf fixture change</li>
<li>Supplement and health brands running seasonal promotional campaigns at pharmacy and health retail checkout</li>
<li>Confectionery brands placing impulse-buy product at checkout in petrol stations, newsagencies, and convenience stores</li>
<li>Cosmetic and personal care brands targeting secondary placement in gift, homewares, and boutique retail</li>
<li>Stationery and craft brands supplying independent retailers that need a self-contained display solution alongside the product</li>
</ul>

<h2>Getting Your Display Packaging Quoted</h2>
<ol>
<li><strong>Retail context</strong> — counter, floor, or shelf-ready; retail environment type</li>
<li><strong>Product details</strong> — individual unit dimensions, weight, units per display</li>
<li><strong>Total quantity</strong> — number of complete display units required</li>
<li><strong>Buyer spec</strong> — share any retail buyer style guide or dimensional requirements</li>
<li><strong>Quote</strong> — within 24 hours with structural format recommendation and pricing</li>
</ol>`;
}

function retailContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Retail Packaging That Earns Shelf Space</h2>
<p>Retail buyers at Australian pharmacy chains, homewares retailers, and specialty stores assess packaging alongside the product itself. A box that does not hold its shape under shelf conditions, cannot maintain consistent print colour across SKUs, or cannot withstand the handling of a retail distribution centre creates problems before the product reaches a customer. ${n} need to perform in all three of those dimensions before they can do their primary job of communicating brand and driving purchase.</p>
<p>Shelf presence — the ability of a box to attract attention from 60–90 cm away — is partly a design problem and partly a materials decision. The right substrate and surface finish creates the foundation; design executes within it.</p>

<h2>Card Weight and Finish Options for Shelf-Ready Cartons</h2>
<p>Most retail cartons use 300–400 gsm SBS clay board — this range provides adequate compressive strength for planogram stacking, a clean surface for colour-accurate printing, and the caliper consistency that automated packing lines require. The upper end of that range (350–400 gsm) is appropriate for heavier products or taller carton formats where the side panels need more support against deflection under shelf load.</p>
<p>Gloss lamination maximises colour intensity on shelf — it makes printed colours appear more saturated and reflects light in a way that draws the eye from a distance. Matte lamination produces a more restrained result that is preferred in premium lifestyle, beauty, and wellness retail where high-shine can read as cheap. Pantone spot colour matching is the specification choice for brands where the colour of a key design element — a brand red, a specific blue — needs to be reproduced consistently across multiple print runs and across different box sizes in the same range.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Structural Formats for Australian Retail</h2>
<p>Straight-tuck end cartons are the most common retail format — they flat-pack efficiently, assemble quickly on packing lines, and present a clean rectangular profile on shelf. Reverse-tuck end formats are specified when the product needs to be loaded from the top rather than the front. Two-piece tray-and-lid formats are used for premium retail applications where the lid-off reveal is part of the customer experience. Hanger formats with a Euro hole or J-hook cutout are required for peg-hook planograms in hardware, pharmacy, and stationery retail.</p>
<p>All retail carton formats are available in any custom dimension. Our structural engineering team designs the dieline to your product measurements — there is no fixed size catalogue.${rel0 ? ' Our ' + rel0 + ' covers related packaging options for the same product range.' : ''}</p>

<h2>Ordering and Lead Times</h2>
<p>Standard production is 7–14 business days from artwork approval. If you have a retail buyer delivery date to meet, share that with us at the quoting stage — we plan backwards from your required in-hand date and confirm production feasibility before you commit. Use the quote form on this page with your product dimensions, quantity, and any buyer style guide specifications. We respond within 24 hours.</p>`;
}

function foodContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Food Safety Specification — What Australian Food Packaging Must Meet</h2>
<p>Food contact packaging in Australia needs to comply with the relevant Australian and New Zealand food standards, covering the materials in direct or indirect contact with food — board grades, adhesives, printing inks, and interior coatings. For most food packaging applications, this means specifying food-grade SBS board with food-safe adhesive formulations and inks from suppliers with food contact certification. For applications involving greasy, hot, or moist food products, the interior barrier specification becomes critical.</p>
<p>${n} are produced using board and adhesive specifications that meet the relevant Australian food contact requirements. Material certification documentation is available for orders where food safety audit programmes or retail buyer compliance frameworks require traceability evidence.</p>

<h2>Board Choice and Interior Coatings for Different Food Types</h2>
<p>Dry and ambient food products — packaged biscuits, dry snacks, boxed confectionery — use standard food-grade SBS board without an interior barrier coating. Products with moderate fat content — pastries, sandwiches, moderate-fat baked goods — need an aqueous greaseproof coating on the interior surface. High-fat fried food products — chips, fried chicken, heavily oiled items — require a robust barrier specification to prevent oil penetration within the service timeframe. Hot food products benefit from a heat-resistant interior specification.</p>
<p>Kraft board is an option for dry food applications where the natural aesthetic aligns with the product positioning — wholefood brands, artisan bakeries, organic producers. For food service applications where speed of branding and cost efficiency matter more than premium aesthetics, flexographic printing on standard kraft corrugated is the standard.${rel1 ? ' Related format: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Branded Food Boxes in Hospitality and Food Retail</h2>
<p>Custom branded food packaging creates a mobile brand impression that extends well beyond the point of purchase. A branded takeaway box carried through a shopping centre or delivered to a customer's door is seen by multiple people. For food businesses investing in brand recognition, the packaging is marketing spend that also does a functional job — which is rare.</p>
<p>Full-colour CMYK printing allows logos, brand colours, and any required food labelling information to be incorporated into a single printed design. For food service applications where mandatory allergen and nutritional information needs to appear on the packaging, our design team incorporates the text content into the artwork layout at no additional charge.${rel0 ? ' If you also need ' + rel0 + ', we can quote both formats together.' : ''}</p>

<h2>Common Formats for Australian Food Service and Takeaway</h2>
<ul>
<li>Burger boxes in corrugated or SBS board — single-wall fluted base for heat retention, full-colour lid print for brand visibility at the table</li>
<li>Cone sleeves for hot chips and fried food — food-safe paperboard in standard taper dimensions with flexo or offset branding</li>
<li>Hot dog and long-food cartons — elongated tuck-end formats in food-grade SBS with greaseproof coating</li>
<li>Macaron and premium patisserie boxes — SBS with windowed lids and internal card dividers for product protection and presentation</li>
<li>Gourmet food retail cartons — SBS or kraft for packaged products in specialty retail and deli channels</li>
</ul>

<h2>Quoting Your Food Packaging</h2>
<ol>
<li><strong>Food type and service context</strong> — hot food, ambient packaged, greasy items, refrigerated</li>
<li><strong>Dimensions and quantity</strong> — product or box measurements and order volume</li>
<li><strong>Interior coating requirement</strong> — we confirm the correct specification in the quote</li>
<li><strong>Design</strong> — free artwork including any mandatory food labelling text</li>
<li><strong>Production</strong> — 7–14 business days, food contact certification provided on request</li>
</ol>`;
}

function candleContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Why Candle Packaging Has Specific Structural Requirements</h2>
<p>Candle packaging is a category where generic box templates consistently underperform. The structural requirements — base strength for glass vessel weight, interior height precision for pillar candles, board grade appropriate for the combined product weight — are specific enough that a standard tuck-end template sized to the approximate dimensions will often fail in one of those areas.</p>
<p>${n} need to be engineered around the specific candle format being packaged, not adapted from a general-purpose box template. A 300 g soy candle in a glass vessel sitting in a standard 350 gsm tuck-end box is likely to delaminate or deflect at the base under transit conditions.</p>

<h2>Base Construction for Jar Candles — Getting the Weight Right</h2>
<p>Glass jar candles combine the weight of the wax with the weight of the vessel — a 300 g finished candle in a standard glass jar typically weighs 400–500 g total. That load sits on the box base through storage, transit, and retail display. Standard tuck-in base construction relies on the friction of tucked panels to maintain the base shape under load — it is not reliable for this weight range. Lock-bottom construction, where the base panels are mechanically interlocked and hold under load without relying on friction, is the minimum specification for glass jar candles over 200 g.</p>
<p>Board weight also matters. 350–400 gsm SBS is appropriate for most candle carton applications. For particularly heavy jars or for rigid box formats where the product sits inside a lid-and-base construction, greyboard (1,200 gsm+) provides the structural integrity the weight requires.${rel1 ? ' Our ' + rel1 + ' covers the rigid box formats commonly used for candle gift sets.' : ''}</p>

${specs}

<h2>Finishes That Work for Australian Home Fragrance Brands</h2>
<p>Soft-touch matte lamination is the most requested finish across our candle packaging client base. The velvet-like surface character is a deliberate aesthetic choice for home fragrance brands — it aligns with the sensory, premium-lifestyle positioning of the category and creates a tactile signal before the box is opened. It photographs particularly well for product imagery, which matters for brands that rely heavily on e-commerce and social media sales channels.</p>
<p>For artisan candle brands with a natural or eco positioning, unbleached kraft board with minimal surface treatment is the default — the warm, textured character of the material reinforces the product story more effectively than any printed claim about natural ingredients. Gold or copper foil stamping on a kraft surface creates a striking contrast that many independent candle labels use as a signature brand element.${rel0 ? ' For mailer or shipper packaging for e-commerce candle orders, see our ' + rel0 + '.' : ''}</p>

<h2>What Australian Candle Brands Actually Order</h2>
<ul>
<li>Independent candle makers producing their first 100–200 box run for a boutique retailer or online store launch</li>
<li>Established wholesale candle brands managing ongoing replenishment across national homewares, gift, and department store accounts</li>
<li>Corporate gifting companies sourcing branded candles as premium client gift inclusions and needing the box to match a specific corporate colour palette</li>
<li>Subscription box businesses curating monthly home fragrance selections and needing packaging that survives postal delivery without crush damage</li>
<li>Hotel and hospitality groups commissioning private-label candles and requiring packaging that reflects the property brand standard</li>
</ul>

<h2>Production Lead Times and Getting Started</h2>
<p>Standard production for most candle carton formats is 7–14 business days from artwork approval. Rigid box formats (for heavier glass jar candles or premium gift set configurations) may require 10–14 days due to the additional construction steps. To start, use the quote form on this page with the candle format (jar, pillar, taper — and the vessel dimensions), approximate filled weight, quantity, and substrate preference. We respond within 24 hours.</p>`;
}

function corrugatedContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Flute Configuration and What It Means for Your Box</h2>
<p>The flute — the corrugated medium between the liner sheets — determines the primary structural properties of the board. B flute (approximately 3 mm total thickness) delivers a good balance of surface quality and compressive strength, and it is the standard specification for e-commerce mailers and printed retail-ready shippers where surface print quality matters. C flute (approximately 4 mm) provides higher compressive strength for products over 5 kg or for boxes that need to stack reliably under warehouse load. Double-wall BC combination (approximately 6–7 mm) is the specification for fragile goods, industrial products, and export cartons where both compressive and burst strength need to be significantly higher than single-wall allows.</p>
<p>${n} are specified based on the product's weight, fragility, transit method, and any stacking requirements. The flute and wall configuration recommendation comes in the quote alongside pricing.</p>

<h2>Print Options — Flexo vs Litho Laminate on Corrugated</h2>
<p>Flexographic printing directly on the corrugated liner is the cost-effective standard for high-volume corrugated orders where brand graphics need to be clear and functional rather than photographic. It produces solid colours and clean typography accurately, but does not achieve the colour graduation and fine detail that offset or digital printing delivers. For most shipping cartons and transit packaging, flexo is sufficient.</p>
<p>Litho laminate printing — full-colour offset or digital print on smooth art paper, laminated to the corrugated substrate — is the specification for e-commerce brands where the outer box is a brand experience as much as a shipping container. The print quality is comparable to a retail carton. The structural performance is corrugated. This combination is what premium e-commerce brands in Australia use for their branded mailer boxes.${rel1 ? ' For standalone branded mailer formats, see our ' + rel1 + '.' : ''}</p>

${specs}

<h2>Stacking Strength, BCT, and Pallet Configuration</h2>
<p>BCT (Box Compression Test) strength is the measure of how much vertical load a corrugated box can sustain before it deforms. It is determined by the flute configuration, board grade, and box dimensions — a larger box of the same board specification has a lower BCT than a smaller one because the side panels span a greater distance. For warehouse stacking applications, we calculate the BCT requirement based on the number of boxes in a stack, the average weight per box, and any pallet-level stacking that occurs in your supply chain.</p>
<p>If your ${n} need to pass a specific BCT test for a retail buyer or logistics provider, share the requirement at the quoting stage. We specify the board grade and wall configuration required to meet it, and we can provide testing documentation if required.${rel0 ? ' Related shipping solutions: ' + rel0 + '.' : ''}</p>

<h2>Where Corrugated Wins Over Folding Carton</h2>
<ul>
<li>Products over 3 kg where a folding carton base will deflect or delaminate under product weight and transit stress</li>
<li>Fragile items where the cushioning effect of the corrugated flute provides meaningful additional protection during courier transit</li>
<li>E-commerce brands where the outer box is the first physical brand touchpoint and needs litho laminate print quality alongside transit protection</li>
<li>Products distributed through pallet freight where BCT under stacking load needs to be engineered rather than assumed</li>
<li>Subscription box programmes where the mailer box is assembled by the fulfilment team and needs to self-lock without tools or tape</li>
</ul>

<h2>Getting a Corrugated Box Quote</h2>
<ol>
<li><strong>Product dimensions and weight</strong> — internal dimensions and the weight of a fully packed box</li>
<li><strong>Transit method</strong> — parcel courier, pallet freight, or both</li>
<li><strong>Print specification</strong> — flexo or litho laminate, exterior print only or interior print also required</li>
<li><strong>Stacking requirement</strong> — number of boxes per pallet and stacking height if relevant</li>
<li><strong>Quote within 24 hours</strong> — flute recommendation, board grade, and pricing included</li>
</ol>`;
}

function mailerContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>What Makes a Good E-Commerce Mailer Box</h2>
<p>A branded mailer box has to do two things simultaneously — protect the product through the courier network and communicate the brand at the moment of delivery. Most generic brown boxes succeed at the first and fail completely at the second. ${n} are designed to handle both: the board grade and self-locking tab construction protect the contents; the full-colour litho print on the exterior delivers the brand at the moment the customer lifts the box from their doorstep.</p>
<p>The moment a customer receives a premium branded mailer is a marketing moment — one that is increasingly captured and shared. Australian research consistently shows that premium unboxing packaging increases likelihood of repeat purchase, positive review submission, and social sharing. It is one of the most measurable packaging ROI opportunities available to e-commerce brands.</p>

<h2>Board Weight, Tab Type, and Closure Options</h2>
<p>The board grade for mailer boxes is selected based on the product weight and fragility. For lightweight apparel, accessories, and flat products under 500 g, rigid board mailers (350–400 gsm) in a self-seal envelope format provide a sleek, compact solution. For heavier or more fragile products, single-wall corrugated B or E flute is the specification — with self-locking tabs that assemble without tape and hold the lid closed securely through courier transit.</p>
<p>Self-locking tabs are the critical feature for high-volume e-commerce fulfilment — they allow the box to be assembled and loaded in seconds without a tape gun. Peel-and-seal tape closure strips are an alternative for rigid board formats where a clean, reusable look is preferred. Tear-strip opening strips, added to the reverse of the lid, give customers a clean opening experience without needing to tear the box apart.${rel1 ? ' Related: ' + rel1 + ' for outer transit packaging.' : ''}</p>

${specs}

<h2>The Business Case for Printed Mailers vs Plain Brown Boxes</h2>
<p>The cost difference between a printed branded mailer and a plain brown RSC shipper is typically smaller than e-commerce brands expect — particularly at quantities over 500 units. At 1,000 units, the per-unit premium for a litho laminate branded mailer over a plain corrugated box is often in the AU$0.80–1.50 range depending on print complexity. Against the measurable uplift in repeat purchase rate and review volume that premium unboxing packaging delivers, that premium recovers quickly.</p>
<p>For subscription box brands, the mailer box is a core part of the product experience — subscribers anticipate the box as much as the contents. For those brands, the investment in premium printed packaging is not optional; it is part of what the customer is paying for.${rel0 ? ' For interior packaging elements, see our ' + rel0 + '.' : ''}</p>

<h2>Common Mailer Sizes for Australian Online Sellers</h2>
<ul>
<li>Small rigid mailer (200 × 150 × 50 mm) — jewellery, accessories, phone cases, small electronics accessories</li>
<li>Medium corrugated mailer (300 × 220 × 80 mm) — folded apparel, books, beauty sets, skincare bundles</li>
<li>Large mailer (400 × 300 × 120 mm) — subscription box standard, small homewares, multiple product orders</li>
<li>Shallow mailer (320 × 230 × 30 mm) — documents, art prints, flat accessories, single garments</li>
<li>Custom dimensions — for brands whose product dimensions do not fit standard proportions cleanly</li>
</ul>

<h2>From Brief to Delivery</h2>
<ol>
<li><strong>Product weight and dimensions</strong> — determines board grade and self-lock configuration</li>
<li><strong>Print specification</strong> — exterior only or interior print also; design assets or brief</li>
<li><strong>Quote</strong> — within 24 hours, tiered pricing from 250 to 10,000+ units</li>
<li><strong>Free artwork</strong> — 3D mockup of the assembled box exterior and interior if applicable</li>
<li><strong>Production and dispatch</strong> — 7–14 business days, tracked Australia-wide</li>
</ol>`;
}

function cbdContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Packaging for Australian CBD and Hemp Wellness Products</h2>
<p>The Australian market for CBD oil, hemp-derived wellness products, and plant-based health supplements is growing, and with that growth comes increasing attention to packaging compliance. Brands in this category need packaging that navigates the regulatory environment accurately while communicating the clean, credible aesthetic that wellness consumers associate with quality and legitimacy. Generic packaging undermines both.</p>
<p>${n} need sufficient panel area for the mandatory regulatory text, a substrate that prints regulatory copy legibly at small type sizes, and a visual design that positions the product confidently within the wellness category rather than looking clinical or improvised.</p>

<h2>Panel Configuration for Compliance Copy</h2>
<p>The panel layout for CBD and hemp wellness cartons must accommodate active ingredient concentration information, dosage guidance, scheduling notes where applicable, and batch and expiry date fields — without those elements overwhelming the brand design panels. This is a layout problem that needs to be resolved at the dieline design stage, not retrofitted into an artwork file.</p>
<p>Our design process for ${n} starts with the regulatory content brief. The dieline is structured around the compliance information requirements first; brand artwork is designed within the remaining panels. This approach eliminates the common problem of brands discovering at artwork approval that there is not enough panel area for the required text at a legible size.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Substrate and Finish Choices for Wellness Cartons</h2>
<p>300–350 gsm SBS clay board is the standard substrate for ${n} — it provides a clean white printing surface with good small-text legibility and accepts matte lamination cleanly. Matte lamination is the most consistent finish choice in the Australian wellness packaging market: it creates a restrained, health-adjacent aesthetic that is neither clinical nor overtly decorative, and it provides good legibility for small-format compliance text on a matte surface.</p>
<p>Soft-touch matte is a premium upgrade that a number of Australian wellness brands use to differentiate from competitors at the same price point. Spot UV on the brand mark over a soft-touch or matte base — selective gloss against a matte field — is a widely used premium signal in this category.${rel0 ? ' For related packaging, see our ' + rel0 + '.' : ''}</p>

<h2>Child-Resistant Options</h2>
<p>Where your product's regulatory classification requires child-resistant packaging, we offer push-and-turn and squeeze-and-slide structural closure configurations that meet relevant Australian standards. These features must be specified at the dieline design stage — they cannot be added to a standard tuck-end carton after the fact. If you are uncertain whether your product requires CR packaging, advise your regulatory consultant before finalising the packaging brief with us.</p>

<h2>Placing Your CBD Packaging Order</h2>
<ol>
<li><strong>Regulatory brief</strong> — product classification, mandatory text fields, CR requirement if applicable</li>
<li><strong>Product dimensions and quantity</strong> — carton dimensions and order volume</li>
<li><strong>Quote</strong> — within 24 hours, includes substrate and finish recommendation</li>
<li><strong>Dieline and artwork</strong> — designed around compliance requirements, free of charge</li>
<li><strong>Production</strong> — 7–14 business days, all materials food and health contact certified</li>
</ol>`;
}

function pharmaContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Pharmaceutical Carton Compliance in Australia</h2>
<p>Pharmaceutical and health product packaging in Australia operates within specific requirements that standard retail carton specifications are not designed to meet. TGA scheduling, mandatory text field positioning, tamper-evidence provisions, and for some classifications, child-resistant closure requirements — these must all be resolved in the structural design of ${n} before a single artwork element is applied.</p>
<p>Our team works with compounding pharmacies, nutraceutical brands, veterinary pharmaceutical producers, and medical device manufacturers across Australia on carton specifications that meet their regulatory requirements. Material certification documentation is available for all orders where audit traceability is required.</p>

<h2>Panel Layout for Regulatory Information</h2>
<p>The panel geometry of pharmaceutical cartons is a compliance engineering problem. Every mandatory field — product name, active ingredient listing, dosage information, AUST number, scheduling text, batch and expiry date fields — must be accommodated at a legible type size within the available panel area, without compromising the clarity of the design in ways that create patient safety risks.</p>
<p>Our design process starts with the regulatory content provided by your compliance team. The dieline is structured around those requirements; brand artwork fills the remaining panel space. Serialisation windows — reserved areas for batch-specific barcode or 2D code application — are incorporated into the structural design at this stage.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Tamper-Evidence Options for Medicine Packaging</h2>
<p>Tamper-evident features for ${n} include glue seal configurations where the carton cannot be opened without visibly breaking the adhesive bond, tear-strip features that allow easy customer opening while providing clear evidence of interference, and score-to-break panels that cannot be resealed once opened. The appropriate format depends on your product's classification and the specific tamper-evidence standard required by your distribution channel.</p>
<p>Child-resistant closure configurations — push-and-turn and squeeze-and-slide formats — must be specified at the dieline stage. They cannot be retrofitted to a standard tuck-end carton. If CR packaging is required for your product's classification, confirm that requirement before we begin structural design.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Substrates and Print Specification for Pharma Cartons</h2>
<p>The standard substrate for pharmaceutical cartons is 300–400 gsm SBS clay board with a clean white printing surface. This grade provides the print legibility necessary for small-format regulatory text and the structural consistency required across production batches. All adhesives and board grades used carry food and pharmaceutical contact certifications. Inks are specified from certified pharmaceutical packaging suppliers with the relevant food contact regulatory clearance.</p>

<h2>Production Documentation and Sign-Off</h2>
<p>Pharmaceutical packaging orders are managed with the confidentiality and documentation standards the category requires. Design files, regulatory content, and product specifications shared during the quoting and production process are not disclosed externally. Pre-production sign-off follows a formal approval process — written artwork approval is required before any production run begins, and this approval document is retained as part of the production record. Contact our team using the quote form on this page; all pharmaceutical briefs are handled through a dedicated account management process.</p>`;
}

function chocolateContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Chocolate Packaging Engineering — Protecting a Fragile Product</h2>
<p>Premium chocolate is one of the more demanding products from a packaging engineering perspective. It is temperature-sensitive, structurally fragile, subject to bloom if exposed to humidity fluctuations, and positioned at a price point where a packaging failure — a dented box, a crushed truffle, a tray that has shifted in transit — is commercially and reputationally costly. ${n} need to be engineered for the specific product, not selected from a general-purpose catalogue.</p>
<p>The key decisions are the structural format (rigid vs folding carton), the interior configuration (custom insert tray, paper dividers, or open format), and the exterior finish (which needs to communicate a quality level that matches the product's price positioning).</p>

<h2>Food-Safe Liners and Insert Tray Options</h2>
<p>For ${n} where chocolate is in direct contact with the box interior, food-safe liner paper is required. This is available in plain white and in metallic gold foil — the gold foil interior is the standard for luxury assortment boxes because it elevates the visual presentation at the moment of opening and communicates quality at the same time as protecting the product.</p>
<p>Custom insert trays position individual chocolates precisely within the box and prevent contact between pieces that would damage coatings and shapes. We produce inserts in food-grade cardboard (cost-effective for standard configurations), vacuum-formed clear PET (precise cavity fit for complex shapes), and velvet-flocked card (the premium option for luxury gift positioning). The insert specification significantly affects the perceived quality of the unboxing experience — it is worth specifying carefully rather than defaulting to the cheapest available option.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Finishes for Premium Chocolate Gifting</h2>
<p>Hot gold foil stamping on a matte or soft-touch base is the most impactful finish available for luxury chocolate packaging. The metallic contrast signals premium quality and occasion without requiring any supporting copy to make the point. Applied to a brand mark, product name, or border treatment on a matte laminated rigid box, it is one of the most reliable premium packaging signals in the Australian gift market.</p>
<p>Embossing on the box lid — raising the brand mark or a design element in relief — adds tactile dimension that the customer feels before they see it. For brands whose chocolate is positioned as luxury gifting or occasion chocolate, embossing on the exterior of a rigid box alongside foil stamping creates a multi-sensory premium signal that is difficult to replicate at a lower price point.${rel0 ? ' Related options: ' + rel0 + '.' : ''}</p>

<h2>What Australian Chocolate Brands Order</h2>
<ul>
<li>Artisan chocolatiers producing seasonal gift collections for Christmas, Valentine's Day, and Easter retail</li>
<li>Corporate gifting companies sourcing premium branded chocolate boxes for end-of-year client gifts</li>
<li>Hotel and hospitality groups commissioning private-label chocolate with packaging that reflects the property standard</li>
<li>Specialty chocolate retailers developing own-brand gift assortments for in-store and online sales</li>
<li>Wedding businesses presenting chocolate favours in branded boxes for ceremony or reception tables</li>
</ul>

<h2>Getting Your Chocolate Box Quoted</h2>
<ol>
<li><strong>Format</strong> — rigid lid-base, folding carton, or windowed retail carton</li>
<li><strong>Piece count and chocolate dimensions</strong> — for insert tray specification</li>
<li><strong>Exterior finish preference</strong> — matte, soft-touch, foil, embossing, or combination</li>
<li><strong>Food-safe liner requirement</strong> — direct contact or individually wrapped product</li>
<li><strong>Quote within 24 hours</strong> — food contact certification included in order documentation</li>
</ol>`;
}

function popcornContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Food Service vs Retail — Two Different Briefs for Popcorn Packaging</h2>
<p>A cinema or event food service popcorn box and a gourmet retail popcorn carton are solving different problems. The food service format needs to hold volume efficiently, allow easy filling on a busy concession line, provide adequate grease resistance for butter or flavouring, and carry brand graphics that are visible from the serving area. The retail format needs shelf standout, a reclosable or display-friendly structure, and print quality that positions the product at its intended price point in the specialty food or supermarket snack aisle.</p>
<p>${n} cover both contexts. The specification differs; the print quality and food safety requirements apply to both.</p>

<h2>Grease Resistance and Print Specification</h2>
<p>Butter and oil flavouring on popcorn migrates through uncoated paperboard within minutes of contact — saturating the exterior print and compromising the structure of the container. Our ${n} use food-grade coated SBS paperboard with a grease-resistant interior coating that prevents this migration. The exterior printed surface stays intact through the service period; the brand graphics on the outside of the box remain legible and clean.</p>
<p>Full-colour CMYK printing on the exterior of ${n} allows high-energy brand graphics, product photography, and flavour variant callouts to be printed with the same quality as any retail carton. For gourmet and specialty retail formats, matte lamination on the exterior creates a more premium aesthetic than standard gloss.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Sizes for Cinema, Events, and Retail</h2>
<p>Open-top bucket formats for food service are produced in small (approximately 500 ml), medium (1 litre), large (1.5–2 litres), and sharing (3+ litres) configurations. For event and cinema concession operations, we recommend confirming the serving volume in millilitres rather than relying on naming conventions — "large" means different things across different venues.</p>
<p>Retail flat-pack cartons for grocery and specialty food channels use a reclosable tuck-end format in sizes appropriate for 50–200 g packaged popcorn depending on the product density. Window panels on the front face allow the product to be seen at shelf level.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Getting Your Popcorn Boxes Made</h2>
<ol>
<li><strong>Format and channel</strong> — food service bucket, retail carton, or windowed display</li>
<li><strong>Size and serving volume</strong> — confirm in millilitres or grams rather than S/M/L naming</li>
<li><strong>Quantity</strong> — and whether ongoing replenishment ordering is likely</li>
<li><strong>Brand assets or brief</strong> — for free design and 3D mockup</li>
<li><strong>Quote within 24 hours</strong> — food contact certification included</li>
</ol>`;
}

function matchContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Dimensional Precision in Match Box Production</h2>
<p>The most important engineering specification in ${n} is the dimensional relationship between the internal tray and the external sleeve. The tray must slide smoothly — tight enough that it does not rattle when the box is held, loose enough that it can be extracted with one hand without requiring force. We hold a ±0.5 mm tolerance on both components to achieve this consistently across the full production run.</p>
<p>If you are filling the boxes with specific match lengths, the internal tray dimensions need to be engineered around those measurements, not around a standard format. Providing the match length, the bundle diameter, and the approximate match count per box allows us to design the tray cavity correctly from the outset.</p>

<h2>Print Spec and Finish Options for ${n}</h2>
<p>The external sleeve is the primary brand communication surface — it carries your logo, brand colours, and any artwork elements in full-colour CMYK on 300–350 gsm SBS clay board. All standard surface finishes are available: gloss lamination, matte lamination, soft-touch, spot UV, and hot foil stamping. Gold foil on a dark-coloured matte sleeve is a high-impact combination for hospitality and gifting applications where premium presentation matters.</p>
<p>The internal tray can be left plain white or printed with a secondary design element — a pattern, a coloured interior, or brand messaging that is revealed when the tray is extracted. This is a small detail that branded match box programmes in the hospitality sector have used effectively as a surprise-and-delight element.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Who Uses Custom Branded Match Boxes in Australia</h2>
<ul>
<li>Hotels and restaurants using branded match boxes on dining tables and in rooms for candle and fireplace lighting</li>
<li>Artisan candle brands including a custom branded match box in gift sets as an added-value item</li>
<li>Wedding and event businesses producing branded match box favours for guest tables</li>
<li>Corporate gifting companies including match boxes in premium gift packs as a branded utility item</li>
<li>Luxury lifestyle brands using branded match boxes as a collectible or seasonal promotional item</li>
</ul>
${rel0 ? '<p>For complementary packaging, see our ' + rel0 + '.</p>' : ''}

<h2>Getting Your Match Boxes Made</h2>
<ol>
<li><strong>Sleeve dimensions</strong> — external length, width, and depth</li>
<li><strong>Match specification</strong> — match length and bundle count if filling with functional matches</li>
<li><strong>Strike strip</strong> — required for functional match boxes; omit for decorative or promotional use</li>
<li><strong>Finish preference</strong> — matte, gloss, soft-touch, or foil stamping</li>
<li><strong>Quote within 24 hours</strong> — free artwork for both sleeve and tray included</li>
</ol>`;
}

function cardboardContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Cardboard Grade and What It Means for Your Packaging</h2>
<p>The phrase "cardboard box" covers an enormous range of materials, structures, and performance levels. A 250 gsm carton holding a 100 g accessory and a 450 gsm lock-bottom box holding a 1.2 kg product are both "cardboard boxes" — but they are very different specifications. Getting the board grade right for your product and distribution context is the most important structural decision before anything visual is considered.</p>
<p>${n} are produced in SBS clay board from 250 gsm through to 450 gsm, with the grade selected based on your product weight, the structural format, and the retail or transit conditions the box will face. Our team recommends the appropriate grade in the quote rather than defaulting to a standard weight.</p>

<h2>Structural Formats Available for ${n}</h2>
<p>Straight-tuck end cartons are the most widely used format in retail product packaging — they flat-pack efficiently, assemble quickly on a packing line, and present a clean rectangular profile on shelf. Reverse-tuck end formats suit products that need to be loaded from the top of the box rather than the front. Lock-bottom construction is specified for products over approximately 600 g where the base needs to be mechanically secured rather than tucked. Two-piece tray-and-lid, drawer (sleeve-and-tray), and hanger formats are used where the application calls for a specific opening experience or retail fixture type.</p>
<p>All formats are available in any custom dimension. We do not use a standard size catalogue — your ${n} are produced to the exact measurements your product requires.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Surface Finish Options</h2>
<p>Every standard surface finish is available on ${n}: gloss lamination for maximum colour vibrancy and shelf visibility, matte lamination for a refined, fingerprint-resistant surface, soft-touch coating for a velvet-like premium tactile quality, spot UV varnish for selective high-gloss contrast over design elements, hot foil stamping in gold, silver, and custom metallic colours, and embossing or debossing for dimensional brand marks. Multiple finishes can be combined — matte lamination with spot UV on the logo is the most requested premium combination in our general retail packaging client base.</p>
${rel0 ? '<p>If you are also considering ' + rel0 + ', we can include both in a single production quote.</p>' : ''}

<h2>Getting a Quote for ${n}</h2>
<ol>
<li><strong>Product dimensions and weight</strong> — internal or external measurements, filled product weight</li>
<li><strong>Structural format</strong> — tuck-end, lock-bottom, two-piece, or other; we can recommend if unsure</li>
<li><strong>Finish preference</strong> — gloss, matte, soft-touch, spot UV, foil</li>
<li><strong>Quantity</strong> — tiered pricing included in quote response</li>
<li><strong>Response within 24 hours</strong> — free artwork and 3D mockup included in the order</li>
</ol>`;
}

function businessCardContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Stock Weight and What It Tells Your Client</h2>
<p>The weight of a business card in a client's hand communicates something before they read a word on it. A thin, flimsy card reads as low-cost and provisional. A card with genuine heft — 400 gsm and above — reads as confident and established. This is not a subjective aesthetic preference; it is a consistently observed reaction across professional services contexts in Australia.</p>
<p>${n} are produced from 350–700 gsm laminated board. Standard professional cards use 350–400 gsm. Ultra-thick cards use 550–700 gsm double-layer construction — two sheets laminated together, often with a coloured core between them that creates a coloured edge effect when the card is viewed from the side. The coloured edge is a distinctive detail that is noticeable when a card is held and is increasingly used in the Australian design, finance, and legal sectors.</p>

<h2>Soft-Touch, Spot UV, Foil — Which Finish for Which Industry</h2>
<p>Soft-touch matte lamination is the most requested finish across our business card client base. The velvet-like surface quality creates a tactile premium signal that standard gloss or matte lamination does not — recipients notice it and comment on it, which is exactly the reaction a first-impression document should generate. It is widely used in design agencies, architecture firms, financial advisory practices, and premium retail brands in Australia.</p>
<p>Spot UV over a matte or soft-touch base — selective gloss coating applied to the logo, name, or a specific design element — creates a visual contrast that directs the eye and is subtle enough to be used in conservative professional contexts (law, accounting, medicine) without appearing decorative. Gold or silver foil stamping is a statement choice — used by brands in luxury retail, events, and high-end hospitality who want the card to communicate prestige explicitly.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Standard vs Custom Formats for ${n}</h2>
<p>The standard Australian business card dimension is 90 × 55 mm — we print this format across all stock and finish options. Square cards (55 × 55 mm or 60 × 60 mm) are an increasingly common format choice for brands that want a distinct card shape; they read differently from a standard rectangular card in a card wallet or on a desk and are used effectively by creative and design-focused businesses. Folded cards (90 × 110 mm folding to 90 × 55 mm) provide additional space for contact information, a brief brand statement, or a product or service listing. Custom die-cut shapes are available for brands where the card itself is a brand element.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>The Print Process and What to Expect</h2>
<p>Business cards are printed in full-colour CMYK as standard. Pantone spot colour matching is available for brands where exact colour reproduction is critical — this is recommended for brands with a defined colour standard that needs to match accurately across multiple print runs and across different branded materials. All cards are printed at 300+ DPI with appropriate bleed and crop marks; we check all submitted artwork files before press and flag any issues before production begins. Free design is available if you do not have existing print-ready artwork.</p>

<h2>Ordering Your ${n}</h2>
<ol>
<li><strong>Format and size</strong> — standard 90 × 55 mm, square, folded, or custom</li>
<li><strong>Stock and finish</strong> — weight, lamination type, any foil or spot UV</li>
<li><strong>Artwork</strong> — submit existing files or brief our designers for free artwork</li>
<li><strong>Quantity</strong> — pricing tiered from 100 to 10,000+ cards</li>
<li><strong>Production</strong> — typically 5–7 business days for standard formats</li>
</ol>`;
}

function stickerContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Substrate Matching — The Most Important Decision for ${n}</h2>
<p>The substrate is the material the sticker or label is printed on, and getting it right for the specific application is more important than any design decision. A paper label on a product that gets handled in a humid environment will bubble and peel. A vinyl sticker on a vehicle in Australian sun will last 5–7 years. The same vinyl sticker used as a product label indoors will outlive its packaging. Matching the substrate to the application — surface, environment, required lifespan — is the first decision we confirm before anything else.</p>
<p>${n} are produced on substrates selected for the intended use: vinyl for outdoor, vehicle, and durable product applications; paper for product and packaging labels where shelf life is measured in months; clear polypropylene for transparent no-label looks on glass and clear packaging; kraft paper for artisan product labels where a natural, eco-conscious aesthetic is the positioning.</p>

<h2>Adhesive Types — When Each One Is Right</h2>
<p>Permanent adhesive is the default — it bonds securely to clean surfaces and is not designed for removal without damage to the label or the surface beneath it. This is the correct specification for product labels, brand stickers, and vehicle graphics that need to stay where they are placed. Removable adhesive is specified for promotional labels, price stickers, and applications where clean removal without residue is required. High-tack adhesive is specified for difficult surfaces — matte-laminated carton board, textured plastic, corrugated board — where standard permanent adhesive may not bond reliably due to the surface porosity or texture.</p>
<p>Roll format is the standard for labels that are applied on an automated labelling machine — core diameter, label gap, and wind direction are specified to match the applicator. Sheet format suits hand-application and lower-volume operations.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Finish Options and Durability Ratings</h2>
<p>Gloss laminate over the printed surface provides the highest colour saturation and is the most durable surface option for product labels and outdoor stickers. Matte laminate reduces glare and fingerprint visibility — preferred for premium product labels where the surface character of the label is part of the product's aesthetic. Unlaminated paper labels are the most cost-effective option for short-lifespan applications where durability is not a primary requirement.</p>
<p>For outdoor vinyl stickers and vehicle graphics, UV-stable laminate is standard — it protects the printed colour from fading in Australian sun conditions for 5–7 years under normal exposure. Without UV laminate, printed vinyl stickers in direct sun will fade noticeably within 12–18 months.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Common Applications Across Australian Industries</h2>
<ul>
<li>Product labels for food, beverage, cosmetic, supplement, and general retail products — paper or polypropylene, roll format for automated application</li>
<li>Packaging seals for e-commerce brands — branded paper or kraft stickers applied to mailer boxes, tissue paper, and poly bags</li>
<li>Vehicle and fleet graphics — cast vinyl, UV-laminated, permanent adhesive for all weather conditions</li>
<li>Window decals for retail storefronts — static cling vinyl or permanent vinyl depending on reuse requirement</li>
<li>Event and promotional stickers — paper or vinyl, typically shorter lifespan, may be removable adhesive specification</li>
</ul>

<h2>Ordering Your ${n}</h2>
<ol>
<li><strong>Application details</strong> — surface the sticker adheres to, indoor or outdoor, required lifespan</li>
<li><strong>Substrate preference or recommendation request</strong> — we confirm the correct spec in the quote</li>
<li><strong>Size, shape, and quantity</strong> — and supply format (roll or sheet)</li>
<li><strong>Artwork files</strong> — or brief for free design</li>
<li><strong>Quote within 24 hours</strong> — substrate and adhesive recommendation included</li>
</ol>`;
}

function folderContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Pocket Configuration and What It Says About Your Firm</h2>
<p>A presentation folder is the physical container for the first serious documentation a prospect or client receives from your business. The decision to use a single-pocket format or a double-pocket format, to include a business card slot, or to add a spine for a thicker document pack — these structural choices communicate something about how your organisation approaches client relationships.</p>
<p>Single-pocket ${n} present a document set as a unified body of work. Double-pocket formats separate content into two categories — left for reference material, right for the active proposal or current deliverable — and communicate systematic organisation. A spine addition signals that the document pack is substantial enough to require structural support, which in a corporate context often implies thoroughness and depth.</p>

<h2>Stock Weight and Finish Options</h2>
<p>Our ${n} are produced from 350–400 gsm SBS clay board — at the heavier end of the printing paper range, providing the rigidity needed for a folder to hold its shape when carried under an arm or stored in a briefcase. Lighter stocks deflect and crease under real-world handling in ways that counteract the professional intent of the document it contains.</p>
<p>Matte lamination with spot UV on the logo and key typographic elements is the most requested finish combination for professional services ${n} in Australia. The matte base creates a restrained, high-quality surface character; the spot UV on specific elements creates contrast without making the folder appear decorative. Soft-touch matte is the premium version of this — the velvet-like surface is noticeable in the hand and creates a stronger first-impression signal than standard matte.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Standard A4 vs Custom Formats</h2>
<p>A4 folders (approximately 230 × 310 mm closed) are the standard for professional services, government, and corporate applications in Australia — they hold A4 documents without folding and fit into a standard A4 envelope or satchel. Square and custom formats are used by agencies, creative studios, and brands where the folder format itself is an expression of brand identity. Bespoke dimensions are available for firms that want their collateral to be distinctly different from the generic A4 format that most of their competitors use.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>What Australian Professional Firms Order</h2>
<ul>
<li>Law firms producing proposal folders for new matter pitches and client onboarding documentation</li>
<li>Accounting and financial advisory practices presenting annual review packages, financial plans, and client proposals</li>
<li>Real estate agencies packaging property investment proposals, sales documentation, and market appraisal packs</li>
<li>Architecture and design firms presenting concept documentation, tender submissions, and project proposals</li>
<li>Government departments and educational institutions packaging tender responses, policy documents, and stakeholder communications</li>
</ul>

<h2>Getting Your ${n} Produced</h2>
<ol>
<li><strong>Configuration</strong> — single or double pocket, business card slot, spine requirement</li>
<li><strong>Size</strong> — standard A4 or custom format</li>
<li><strong>Finish</strong> — matte, soft-touch, spot UV preference</li>
<li><strong>Quantity</strong> — tiered pricing from 100 to 10,000 units</li>
<li><strong>Free artwork</strong> — both covers and interior pocket panels included in the design service</li>
</ol>`;
}

function pizzaContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Corrugated Spec for Pizza Boxes — What Actually Matters</h2>
<p>The structural requirements for ${n} are straightforward and worth specifying correctly from the outset. The base panel needs to support the weight of the pizza — a loaded 40 cm pizza can weigh 800 g–1.2 kg — without deflecting or sagging during the delivery window. The corrugated flute provides passive thermal insulation through the air channels within the board, which slows heat loss during transit. The inner base surface needs a grease-resistant coating to prevent the pizza fat from saturating through the board and compromising the structural integrity of the box before the customer opens it.</p>
<p>${n} in Australia are primarily produced in single-wall B or C flute corrugated board. B flute (approximately 3 mm) provides adequate base strength for standard pizza weights in most delivery formats. C flute (approximately 4 mm) is specified for larger pizzas, deep-dish formats, or for brands that want slightly better thermal performance across longer delivery distances.</p>

<h2>Heat Retention, Grease Resistance, and Structural Performance</h2>
<p>The corrugated flute in the walls and base of ${n} provides passive insulation by trapping air within the flute channels. This slows heat loss — but does not maintain temperature indefinitely. For standard delivery windows of 15–30 minutes, it is sufficient. For extended delivery routes or premium delivery services where heat retention is a customer expectation, we offer an insulated liner upgrade that significantly improves heat retention through longer delivery windows.</p>
<p>The interior base coating is a functional requirement, not a premium option. Without grease resistance on the inner base surface, oil from the pizza will penetrate the board within minutes, weakening the structural base and creating a visual issue on the exterior that reflects poorly on the food business.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Print Options for Pizza Box Branding</h2>
<p>The lid exterior is the primary branding surface — it is seen by the customer when the box is placed on their table or handed over at the delivery door. Flexographic printing directly on the kraft liner exterior is cost-effective for high-volume orders and produces clear, functional brand graphics. For brands where print quality on the lid matters — full-colour photography, detailed graphic design, brand colour accuracy — litho laminate printing delivers near-retail-carton quality on the lid exterior while maintaining the standard corrugated construction.</p>
<p>The base exterior can carry secondary branding or remain plain. Some brands print the interior of the lid with additional brand messaging, game content, or promotional offers — this converts an otherwise blank surface into a customer engagement moment during the dining experience.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Sizes We Produce for the Australian Market</h2>
<ul>
<li>8-inch (200 × 200 mm) — personal or mini pizza, increasingly used for half-and-half format at events</li>
<li>10-inch (255 × 255 mm) — small pizza, common in café and lunch-trade operations</li>
<li>12-inch (305 × 305 mm) — standard medium, the most ordered size across our pizza client base</li>
<li>14-inch (355 × 355 mm) — standard large in most Australian delivery operations</li>
<li>16-inch (405 × 405 mm) — party and family size; requires C flute for adequate base support at this span</li>
<li>Custom sizes — for roman, deep-dish, and non-standard pizza formats</li>
</ul>

<h2>Placing Your Pizza Box Order</h2>
<ol>
<li><strong>Sizes and quantities</strong> — list all sizes needed; we quote multi-size orders as a single order</li>
<li><strong>Print specification</strong> — flexo or litho laminate; brand assets or brief for free design</li>
<li><strong>Insulated liner</strong> — advise if extended heat retention is required</li>
<li><strong>Quote within 24 hours</strong> — food contact certification included</li>
<li><strong>Production</strong> — 7–14 business days, delivered anywhere in Australia</li>
</ol>`;
}

function trayContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Open Tray vs Lidded Tray — Choosing the Right Configuration</h2>
<p>The distinction between an open tray and a lidded tray is a functional brief decision, not just a visual one. Open trays — four walls, no lid — are used for food service portion presentation, retail product display where the product needs to be seen and accessed without opening a box, and logistics pick trays where items need to be placed and retrieved quickly. Lidded trays (full lid, partial lid, or windowed lid) are specified when the product needs some enclosure for hygiene, security, or presentation purposes during transit or retail display.</p>
<p>${n} are produced in both configurations and in any combination of dimensions. The depth range covers low-profile display trays (15–25 mm) through to deep food service trays (60–80 mm), with the appropriate board weight and food-safe specification for each application.</p>

<h2>Food-Safe Specification for Catering and Retail Applications</h2>
<p>Food service ${n} are produced using food-grade board and food-safe adhesive formulations compliant with Australian food contact packaging regulations. For products with high fat or moisture content, a greaseproof interior coating is applied — this is required for trays used with pastries, cheese, charcuterie, and any product where oil or moisture migration through the board is a practical concern during service or display.</p>
<p>Material certification documentation is available for food service tray orders where audit programmes or retail buyer compliance requirements demand traceability evidence. This is particularly relevant for ${n} used in hospital catering, aged care food service, and major retail food supplier programmes.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Board Weights and Depths for Different Uses</h2>
<p>Low-profile display trays (15–30 mm depth) used for retail product presentation or café counter display use 350–400 gsm SBS board — sufficient for the load and handling typical of these applications. Deeper food service trays (40–80 mm) carrying heavier portion loads benefit from 400–450 gsm board and a lock-base construction where the base is mechanically secured rather than glued under load.</p>
<p>Corrugated board trays are specified for heavy-load logistics and warehouse applications — a single-wall corrugated tray can carry significantly greater weight than an SBS carton tray of equivalent dimensions, at a lower per-unit cost for high-volume orders.${rel0 ? ' Related format: ' + rel0 + '.' : ''}</p>

<h2>Who Orders Custom Cardboard Trays in Australia</h2>
<ul>
<li>Café and restaurant operators using branded display trays at the service counter for pastries, slices, and small baked goods</li>
<li>Hospital and aged care food service operations using plain food-safe trays for meal service portions</li>
<li>Fresh food producers presenting produce, cheese, and charcuterie in branded trays for specialty and farmers market retail</li>
<li>Retail food brands using windowed display trays for counter-level product presentation in deli and specialty food channels</li>
<li>Logistics and fulfilment operations using corrugated pick trays for organising and transporting products within a warehouse setting</li>
</ul>

<h2>Getting Your ${n} Quoted</h2>
<ol>
<li><strong>Tray type</strong> — open, lidded, or windowed lid; food service or retail display</li>
<li><strong>Dimensions</strong> — length, width, depth (internal preferred)</li>
<li><strong>Food-safe requirement</strong> — direct food contact or indirect; greaseproof coating if required</li>
<li><strong>Quantity</strong> — tiered pricing included in quote</li>
<li><strong>Quote within 24 hours</strong> — food contact certification available on request</li>
</ol>`;
}

function christmasContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Seasonal Production Lead Times — Why Early Orders Matter</h2>
<p>Christmas is the highest-demand production period for custom packaging in Australia, and late orders create compressing lead times that put quality and delivery at risk. The production and delivery timeline for ${n} is: brief and quote (1–2 days) + design and approval (3–5 days) + production (7–14 days) + delivery (1–3 days depending on location). For packaging needed by late November, orders should be placed no later than mid-October to ensure comfortable margins at every stage.</p>
<p>For corporate gifting programmes requiring hundreds to thousands of ${n}, earlier is always better — production capacity in November is constrained, and large orders placed in November may be pushed to post-Christmas delivery windows.</p>

<h2>Finishes That Work for Christmas Gift Packaging</h2>
<p>Gold hot foil stamping on a matte or soft-touch base is the single most impactful finish for seasonal gift packaging in Australia. The metallic warmth of gold foil on a navy, deep green, or midnight black matte surface communicates festive occasion and premium quality in a combination that is consistently effective across retail, corporate, and personal gifting contexts. Applied to a star, a brand mark, or typographic treatment, it does not need to be heavy-handed to read as festive and premium.</p>
<p>Gloss lamination with a full-bleed photographic Christmas design — imagery, pattern, or illustrated seasonal artwork — is the approach used by retail brands that want maximum visual impact at counter and shelf level. Soft-touch with minimal gold foil detailing is the preference of corporate gifting programmes that want premium quality without the explicitly festive visual noise that some professional contexts require a more restrained approach.${rel1 ? ' Related format: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Formats for Retail, Corporate, and Occasion Gifting</h2>
<p>Retail Christmas packaging typically uses folding carton formats in SBS board — tuck-end or reverse-tuck for individual products, two-piece tray-and-lid for gift sets and multi-product presentations. Corporate Christmas boxes range from mid-format folding cartons with tissue-lined interiors through to rigid greyboard boxes with magnetic closures and branded interior printing for the most premium end of the corporate gifting programme. Occasion-specific formats — bonbonniere boxes for event tables, favour boxes for corporate events, small gift boxes for seasonal retail promotions — use pillow box or small folding carton formats in festive printed versions.</p>
${rel0 ? '<p>Related: ' + rel0 + ' for complementary seasonal packaging formats.</p>' : ''}

<h2>Australian Christmas Packaging — Market Context</h2>
<ul>
<li>Retail brands producing limited-edition Christmas product ranges in seasonal packaging, typically ordered in August–September for October–November delivery</li>
<li>Corporate HR and events teams managing end-of-year client and staff gift programmes, typically 200–2,000 boxes for December delivery</li>
<li>Confectionery and food brands releasing Christmas-themed packaging for products sold through grocery and specialty retail in the December window</li>
<li>Wedding and event businesses producing Christmas-themed favour packaging for December celebration events</li>
<li>Hamper and gift businesses producing Christmas presentation boxes for their seasonal product range</li>
</ul>

<h2>Placing Your Seasonal Order</h2>
<ol>
<li><strong>Required delivery date</strong> — state this explicitly so we can confirm production feasibility immediately</li>
<li><strong>Format and dimensions</strong> — product measurements and preferred structural format</li>
<li><strong>Quantity</strong> — and whether repeat orders in future years are likely</li>
<li><strong>Finish direction</strong> — premium corporate, retail-bright, or occasion-elegant</li>
<li><strong>Quote within 24 hours</strong> — timeline confirmed in the quote response</li>
</ol>`;
}

function beverageContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Packaging for Australia's Specialty Coffee, Tea, and Beverage Brands</h2>
<p>Australia's specialty coffee and artisan tea markets are among the most developed in the world — driven by a consumer base that is unusually knowledgeable about origin, processing method, and flavour profile. Packaging in this category is expected to carry that story accurately and in enough detail to inform a purchasing decision at shelf. Generic carton packaging with minimal copy fails the product as much as poor brewing.</p>
<p>${n} need to accommodate the specific physical format of the product (loose-leaf tin, sachet, capsule, paper bag), print with sufficient quality to reproduce origin photography and flavour profile text at small sizes, and present a brand that reflects the craft and quality of the product inside.</p>

<h2>Format Options for Different Product Types</h2>
<p>Loose-leaf tea and ground coffee in retail-format tins or resealable bags are typically presented in a retail shelf carton — a tuck-end box that holds the primary packaging securely and carries the brand and product information on the four printable panels. Sachet collections and capsule packs use sleeve-and-tray or window-front carton formats that allow the individual sachets or capsules to be seen through a transparent panel while the exterior carries the brand design. Gift collections — a curated selection of varieties or a brewing accessory with a bag of coffee — use rigid lid-and-base or magnetic closure box formats that support the elevated price point of a considered gift purchase.</p>
<p>Subscription box formats for direct-to-consumer beverage programmes use a corrugated or heavy SBS carton format engineered to survive the postal network while presenting the brand cleanly at the moment of delivery.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Print Quality and Brand Story in Specialty Beverage Packaging</h2>
<p>Full-colour CMYK printing on SBS board delivers photographic-quality colour reproduction for origin photography, roast profile charts, and the detailed brand narrative that specialty beverage consumers engage with at shelf. Pantone spot colour matching is available for brands where specific brand colours need to be reproduced consistently across multiple print runs and across different packaging formats within the range.</p>
<p>The specialty food and drink consumer is more likely than the average retail shopper to read the full packaging copy, evaluate the typography and print quality, and form a quality impression based on the execution of the package as a whole. Print quality in this category is not a detail — it is a material brand signal.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Getting a Quote for Your ${n}</h2>
<ol>
<li><strong>Product format</strong> — tin, sachet, capsule, paper bag, or combination</li>
<li><strong>Packaging dimensions</strong> — internal measurements of the primary pack that goes inside</li>
<li><strong>Quantity</strong> — initial order and likely reorder frequency</li>
<li><strong>Brand assets or brief</strong> — for free design and 3D mockup</li>
<li><strong>Quote within 24 hours</strong> — substrate and print recommendation included</li>
</ol>`;
}

function candyContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>Confectionery Packaging That Earns the Price Point</h2>
<p>In the Australian confectionery market, the packaging communicates the quality tier of the product before any tasting occurs. A gummy or hard candy in a plain bag sits in the supermarket impulse aisle. The same product in a well-specified printed carton with a window panel sits in the specialty food or gift retail channel at twice the price. The product formulation may be identical. The packaging is doing the positioning work.</p>
<p>${n} are designed around this commercial reality — the substrate choice, finish, window configuration, and brand execution all contribute to the perceived quality tier the product sits in at retail.</p>

<h2>Food-Safe Materials and Direct-Contact Liner Options</h2>
<p>Confectionery in direct contact with the packaging interior requires food-safe liner paper — the board, adhesive, and any interior coating must all meet Australian food contact standards for confectionery applications. For ${n} where the candy is individually wrapped before boxing, the food-contact liner specification is not required and standard board is appropriate. When in doubt about the contact specification your product requires, advise us of the confectionery type and we confirm the correct material specification in the quote.</p>
<p>Interior liner paper is available in plain white and in metallic gold foil — the gold foil interior is a widely used upgrade for premium and gifting confectionery because it elevates the visual presentation at the moment of opening and communicates quality at the same time as protecting the product.${rel1 ? ' Related: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Window Panels and Display Options</h2>
<p>Window panels on ${n} use food-safe clear PET film die-cut into the face or lid of the box — allowing the confectionery inside to be seen from the shelf or counter without opening the packaging. This format is particularly effective for vividly coloured gummies, artisan hard candies, or confectionery where the product's visual character is a purchase trigger. Window shapes can be rectangular, circular, or custom die-cut to complement the brand design.</p>
<p>Display-format ${n} — counter PDQ trays with individual bags or boxes in a forward-facing arrangement — are available for brands supplying impulse-purchase channels in newsagencies, petrol stations, and convenience stores.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Who Orders Custom Candy Packaging in Australia</h2>
<ul>
<li>Artisan confectionery brands selling through specialty food stores, delis, and farmers markets who need packaging that matches a premium product price point</li>
<li>Corporate gifting companies sourcing branded sweets for seasonal client gifts and event giveaways</li>
<li>Wholesale confectionery suppliers producing private-label packaging for retailer own-brand sweet ranges</li>
<li>Wedding and event businesses packaging branded confectionery as table favour items for ceremonies and receptions</li>
<li>Health food brands producing better-for-you confectionery who need packaging that signals natural, clean ingredients rather than supermarket-aisle generic</li>
</ul>

<h2>Ordering Your Confectionery Packaging</h2>
<ol>
<li><strong>Confectionery type</strong> — gummies, hard candy, artisan sweets; individually wrapped or direct contact</li>
<li><strong>Box dimensions and window requirement</strong> — or product measurements for our team to recommend sizing</li>
<li><strong>Quantity and channel</strong> — retail shelf, gifting, or food service</li>
<li><strong>Quote within 24 hours</strong> — food contact certification included in order documentation</li>
<li><strong>Free design</strong> — 3D mockup for approval before production begins</li>
</ol>`;
}

function generalContent(n: string, catLink: string, rel0: string, rel1: string, specs: string): string {
  return `
<h2>What to Consider Before Choosing a Packaging Format for ${n}</h2>
<p>The most productive way to approach a packaging brief is to start with the product and work outward — product dimensions and weight determine the structural format and board grade; the retail or transit environment determines the finish and print specification; the brand positioning determines the aesthetic direction. Starting with an aesthetic preference and working backward to fit the product into it consistently produces packaging that underperforms in some dimension.</p>
<p>Our team reviews each brief and recommends the format, board grade, and finish that best suits the specific product and its distribution context — this recommendation is included in the quote at no cost.</p>

<h2>Material and Print Options for ${n}</h2>
<p>Standard product packaging uses SBS clay board in the 300–400 gsm range — a white, caliper-consistent material that prints accurately in full-colour CMYK and accepts all standard surface finishes. Kraft board (300–400 gsm) is the choice for brands where the natural, eco-conscious character of the material is part of the brand story. Rigid greyboard (1,200–2,400 gsm) is specified for premium applications where the weight of the box itself communicates product value. Corrugated board (single to triple wall) is used when structural transit protection is the primary brief.</p>
<p>Surface finish options include gloss lamination, matte lamination, soft-touch coating, spot UV varnish, hot foil stamping, embossing, and debossing. Finishes can be combined — matte lamination with spot UV on the logo is the most requested premium combination across our general product packaging client base.${rel1 ? ' Related options: ' + rel1 + '.' : ''}</p>

${specs}

<h2>Sizing and Structural Formats</h2>
<p>All ${n} are produced to custom dimensions — we do not use a standard size catalogue. Straight-tuck end cartons are the most common retail format; reverse-tuck end, lock-bottom, two-piece tray-and-lid, sleeve, and fully custom die-cut structures are all available. The structural format is selected based on the product shape, assembly method, and the opening experience the brief requires. Our structural engineering team designs the dieline to your product measurements and provides a 3D digital mockup before any production begins.${rel0 ? ' Related: ' + rel0 + '.' : ''}</p>

<h2>Getting a Quote</h2>
<ol>
<li><strong>Product dimensions and weight</strong> — determines format and board grade</li>
<li><strong>Quantity</strong> — tiered pricing included in response</li>
<li><strong>Finish preference</strong> — or a brief and we'll recommend</li>
<li><strong>Free artwork</strong> — 3D mockup for approval, no charge</li>
<li><strong>Production</strong> — 7–14 business days, tracked delivery Australia-wide</li>
</ol>`;
}

export function buildRichDescription(
  product: any,
  primaryCat: string,
  primaryCatSlug: string,
  related: any[]
): string {
  const rawName = product.name
    .replace(/^Order\s+/i, '')
    .replace(/\s+(?:Wholesale|Packaging)\s*$/i, '')
    .trim();

  const catUrl   = `/product-category/${primaryCatSlug}/`;
  const catLink  = `<a href="${catUrl}" class="desc-link">${primaryCat || 'Custom Packaging'}</a>`;
  const rel0     = related[0];
  const rel1     = related[1];
  const rel0Name = rel0 ? rel0.name.replace(/^Order\s+/i, '').trim() : '';
  const rel1Name = rel1 ? rel1.name.replace(/^Order\s+/i, '').trim() : '';
  const rel0Link = rel0 ? `<a href="/product/${rel0.slug}" class="desc-link">${rel0Name}</a>` : '';
  const rel1Link = rel1 ? `<a href="/product/${rel1.slug}" class="desc-link">${rel1Name}</a>` : '';

  const short = (product.shortDescription || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const sents = short.match(/[^.!?]+[.!?]+/g) || [short];
  const mid   = Math.ceil(sents.length / 2);
  const intro = [
    sents.slice(0, mid).join(' ').trim(),
    sents.slice(mid).join(' ').trim(),
  ].filter(Boolean).map(s => `<p>${s}</p>`).join('\n');

  const specs = specsTableHtml(product);
  const type  = detectType(product.name, product.categories || []);

  let body = '';
  switch (type) {
    case 'cosmetic':      body = cosmeticContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'kraft':         body = kraftContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'soap':          body = soapContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'pillow':        body = pillowContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'gift':          body = giftContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'rigid':         body = rigidContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'bakery':        body = bakeryContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'display':       body = displayContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'retail':        body = retailContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'food':          body = foodContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'candle':        body = candleContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'corrugated':    body = corrugatedContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'mailer':        body = mailerContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'cbd':           body = cbdContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'pharma':        body = pharmaContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'chocolate':     body = chocolateContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'popcorn':       body = popcornContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'match':         body = matchContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'cardboard':     body = cardboardContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'business_card': body = businessCardContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'sticker':       body = stickerContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'folder':        body = folderContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'pizza':         body = pizzaContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'tray':          body = trayContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'christmas':     body = christmasContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'beverage':      body = beverageContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    case 'candy':         body = candyContent(rawName, catLink, rel0Link, rel1Link, specs); break;
    default:              body = generalContent(rawName, catLink, rel0Link, rel1Link, specs); break;
  }

  return `${intro}\n${body}`;
}
