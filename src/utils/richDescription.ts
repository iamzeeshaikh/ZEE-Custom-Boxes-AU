type ProductType =
  | 'cosmetic' | 'kraft' | 'soap' | 'gift' | 'pillow'
  | 'rigid' | 'bakery' | 'display' | 'retail' | 'food'
  | 'candle' | 'corrugated' | 'mailer' | 'cbd' | 'pharma'
  | 'chocolate' | 'popcorn' | 'match' | 'cardboard'
  | 'business_card' | 'sticker' | 'folder' | 'pizza' | 'tray'
  | 'christmas' | 'beverage' | 'candy' | 'general';

function detectType(name: string, categories: string[]): ProductType {
  const n = name.toLowerCase();
  const c = categories.join(' ').toLowerCase();
  if (n.includes('christmas') || n.includes('xmas')) return 'christmas';
  if (n.includes('pizza')) return 'pizza';
  if (n.includes('popcorn')) return 'popcorn';
  if (n.includes('hot chocolate bomb') || (n.includes('chocolate') && !n.includes('kraft')) || n.includes('truffle')) return 'chocolate';
  if ((n.includes('match') && n.includes('box')) || c.includes('match box')) return 'match';
  if (n.includes('business card') || c.includes('business card')) return 'business_card';
  if (n.includes('sticker') || n.includes(' label') || c.includes('sticker') || c.includes('label')) return 'sticker';
  if (n.includes('folder') || c.includes('folder')) return 'folder';
  if (n.includes('candle')) return 'candle';
  if (n.includes('cbd') || n.includes('vape') || n.includes('tincture')) return 'cbd';
  if (n.includes('medicine') || n.includes('pill') || n.includes('lab box') || c.includes('pharmaceutical')) return 'pharma';
  if (n.includes('pillow box') || c.includes('pillow box')) return 'pillow';
  if (n.includes('corrugated')) return 'corrugated';
  if (n.includes('mailer') || (n.includes('shipping') && n.includes('box')) || n.includes('postal box')) return 'mailer';
  if (n.includes('display') && !n.includes('display box')) return 'display';
  if (n.includes('rigid')) return 'rigid';
  if (n.includes('tray') || c.includes('tray')) return 'tray';
  if (n.includes('candy') || c.includes('candy')) return 'candy';
  if (n.includes('coffee') || (n.includes('tea') && n.includes('box')) || c.includes('beverage')) return 'beverage';
  if (n.includes('kraft')) return 'kraft';
  if (n.includes('bakery') || n.includes('pastry') || n.includes('cake') || n.includes('biscotti') || n.includes('bagel') || n.includes('cookie') || c.includes('bakery')) return 'bakery';
  if (n.includes('burger') || n.includes('hot dog') || n.includes('french fry') || n.includes('macaron') || n.includes('pasta') || n.includes('gummy') || n.includes('frozen') || n.includes('fast food') || n.includes('fried chicken') || n.includes('cone sleeve') || (n.includes('food') && (n.includes('box') || n.includes('pack'))) || c.includes('food packaging')) return 'food';
  if (n.includes('soap')) return 'soap';
  if (n.includes('cream') || n.includes('perfume') || n.includes('lipstick') || n.includes('lip') || n.includes('eyelash') || n.includes('lotion') || n.includes('essential oil') || n.includes('beard oil') || n.includes('hair extension') || n.includes('cosmetic') || c.includes('cosmetic')) return 'cosmetic';
  if (n.includes('gift') || n.includes('scarf') || n.includes('ribbon') || n.includes('flower') || n.includes('necklace') || n.includes('earring') || n.includes('promotional') || n.includes('holiday') || c.includes('gift')) return 'gift';
  if (n.includes('retail') || c.includes('retail')) return 'retail';
  if (n.includes('cardboard') || c.includes('cardboard')) return 'cardboard';
  return 'general';
}

interface TypeContent {
  h2: (name: string) => string;
  brand: (name: string, cat: string, catLink: string, homeLink: string) => string;
  materials: (name: string, catLink: string) => string;
  applications: (name: string, rel1Link: string) => string;
  cta: (name: string, cat: string) => string;
}

const TYPE_CONTENT: Record<ProductType, TypeContent> = {

  cosmetic: {
    h2: n => `Why ${n} Matter for Australian Beauty Brand Shelf Performance`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>The Australian cosmetics and personal care sector rewards brands that invest in presentation — shoppers in this category make purchasing decisions largely based on what a product looks like before they interact with it. ${homeLink} produces ${n} from premium SBS clay board with full-colour CMYK printing, delivering colour fidelity that matches your brand guidelines with precision. Pantone spot colour matching is available for brands that require absolute consistency across multiple print runs and product formats.</p>
<p>Our ${n} are produced for cosmetic brands at every scale — from independent artisan skincare labels filling their first 200 units to established beauty companies managing multi-SKU retail programmes. The structural specifications, print accuracy, and finishing standards remain consistent regardless of order volume. We work in ${catLink} across cream, serum, fragrance, lip, hair, and nail product categories, with structural formats covering straight-tuck cartons, sleeve boxes, rigid shoulder boxes, and fully custom die-cut configurations.</p>`,
    materials: (n, catLink) =>
      `<h3>Substrates and Print Specifications for ${n}</h3>
<p>Standard cosmetic cartons are produced from 300–400 gsm SBS (Solid Bleached Sulphate) clay board — a white, caliper-consistent material that delivers excellent ink adhesion and outstanding print colour vibrancy. For brands in the natural or eco-aligned beauty sector, FSC-certified white and natural kraft variants are available, producing a distinct aesthetic that resonates with sustainability-conscious consumers. Rigid greyboard (1,200–2,400 gsm) is specified for luxury applications where structural weight and premium tactile quality are required.</p>
<h3>Surface Finish Options for Cosmetic Packaging</h3>
<p>Soft-touch matte lamination is the most requested finish in the Australian cosmetics category — its velvet-like texture creates a tactile premium signal that aligns strongly with the positioning of skincare, fragrance, and beauty products. Gloss lamination is preferred for brands seeking vivid, high-impact colour on competitive retail shelves. Spot UV varnish applied over a matte base creates a contrast between the sheen of your brand mark and the matte surrounding surface — a technique widely used in premium cosmetic packaging to direct customer attention to specific design elements. Gold and silver hot foil stamping remain popular for fragrance and luxury skincare brands.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian businesses across the full breadth of the cosmetics and personal care sector. Skincare brands use them for moisturisers, serums, toners, and SPF products. Haircare brands specify them for shampoo, conditioner, and treatment cartons. Fragrance companies rely on them to create the premium first impression a perfume purchase demands. Colour cosmetics brands — lipstick, foundation, eyeshadow, and blush — depend on colour-accurate printing that faithfully reproduces their shade range on-pack.</p>
<p>We also supply cosmetic packaging to subscription box brands curating beauty discovery sets, to pharmaceutical-adjacent personal care companies requiring clean, clinical aesthetics, and to retailers developing own-label cosmetic ranges.${rel1Link ? ' For complementary product packaging, consider also our ' + rel1Link + '.' : ''} Our full cosmetic packaging range covers every format in this category.</p>`,
    cta: (n, cat) =>
      `<p>To receive accurate pricing for your ${n}, use the quote form on this page to share your product dimensions, quantity requirement, material preference, and finish selections. Our team reviews all cosmetic packaging briefs with the understanding that colour accuracy and structural precision are non-negotiable in this category — your quote will reflect that standard.</p>
<p>Explore the full ${cat} range to review related formats and find options that complement your current product range. Our team is available by phone or email to discuss any aspect of your packaging brief.</p>`,
  },

  kraft: {
    h2: n => `${n} — Natural Packaging That Communicates Authenticity to Australian Consumers`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Kraft packaging has become a deliberate brand signal in the Australian market — not a budget compromise, but a conscious choice by brands that want to communicate natural ingredients, sustainable credentials, and artisan production values. ${homeLink} produces ${n} from FSC-certified unbleached and bleached kraft board, with printing capabilities that deliver surprisingly vivid results on the textured natural surface. The finished product carries a tactile honesty that premium synthetic laminates cannot replicate.</p>
<p>The structural performance of our ${n} is engineered for real-world use — reliable gluing, consistent sheet thickness, and base panels appropriate for the weight of your product. Brands in the artisan food, natural beauty, wellness, and eco-lifestyle sectors across Australia consistently select kraft packaging because it aligns what the package says with what the product inside actually is. Browse our full ${catLink} range for related formats and specifications.</p>`,
    materials: (n, catLink) =>
      `<h3>Kraft Board Specifications for ${n}</h3>
<p>Our ${n} are produced in natural unbleached kraft (the familiar brown board) and bleached kraft (white or light cream surface with kraft liner), in board weights from 300 to 400 gsm. Unbleached kraft delivers the warmest, most organic visual character; bleached kraft offers a cleaner surface for brands that need full-colour CMYK printing to read more accurately while retaining the structural and eco credentials of kraft stock. Both variants are available in FSC-certified grades.</p>
<h3>Printing and Finishing on Kraft Board</h3>
<p>Printing on kraft board requires adjusted ink profiles compared to standard SBS clay board — the naturally warm, textured surface absorbs ink differently, producing a slightly softer, more organic print character. This characteristic is often a deliberate aesthetic goal for brands in this space. Matte aqueous coating is the most common surface treatment for ${n}, providing minimal sheen and a natural hand feel. Spot UV varnish is achievable on bleached kraft variants. Hot foil stamping in gold, silver, or copper produces a striking contrast against the natural brown surface that many artisan brands use as a signature design element.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian businesses in sectors where the kraft aesthetic aligns directly with their product positioning — artisan soap makers, natural skincare brands, wholefood and health food producers, specialty coffee roasters, independent candle companies, and wellness supplement brands. The packaging material itself carries part of the brand story in these categories, removing the need to print it explicitly.</p>
<p>Corporate gifting companies also specify kraft packaging for its premium-sustainable positioning. E-commerce brands in the eco-conscious segment use it for mailer and outer carton formats.${rel1Link ? ' See also our ' + rel1Link + ' for related options.' : ''} Our kraft range covers every structural format this application requires.</p>`,
    cta: (n, cat) =>
      `<p>Request a free quote for your ${n} using the form on this page. Include your product dimensions, approximate quantity, and any design files or brand references you have available. We will respond with a detailed, itemised quote within 24 business hours — and if you have no existing artwork, our design team will create it from scratch at no charge.</p>
<p>Our full ${cat} range covers a wide variety of kraft packaging formats. Browse related products or contact us directly to discuss specifications that are not immediately visible in our catalogue.</p>`,
  },

  soap: {
    h2: n => `${n} — Packaging That Reflects the Quality of Australian Artisan Soap`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Soap packaging occupies a market position where the packaging material and finish directly reinforces the product proposition. Natural, handmade, and cold-process soaps deserve packaging that communicates those values honestly — not synthetic laminates on a product marketed as pure. ${homeLink} produces ${n} in both unbleached kraft board for an artisan, eco-conscious aesthetic, and premium SBS cardboard for brands seeking a polished, retail-ready presentation. Both substrates are available with windowed panels that allow the soap's colour, texture, and shape to serve as a visual merchandising asset within the box itself.</p>
<p>Structural integrity is central to soap box design — the packaging must hold its form at ambient temperature and through the humidity of a bathroom retail environment. Our ${n} are engineered with this in mind, with glue bonds and board weights specified for the conditions your product will encounter in-store, during transit, and in the customer's home. View related formats in our ${catLink} range.</p>`,
    materials: (n, catLink) =>
      `<h3>Material Selection for ${n}</h3>
<p>We produce ${n} in natural unbleached kraft (300–400 gsm) for artisan and eco-aligned brands, and in SBS clay board (300–400 gsm) for brands seeking vibrant colour printing and a more polished finish. Rigid greyboard options are also available for soap brands positioned at the luxury gifting end of the market. All materials are available in FSC-certified grades, and soy-based inks are used as standard on kraft variants.</p>
<h3>Window Options and Closure Formats</h3>
<p>Windowed ${n} use a clear PET panel die-cut into the face panel of the box, allowing the product inside to be seen without opening the packaging. This is highly effective for artisan soaps where the colour, texture, and embedded botanicals are part of the product's appeal. Window shapes can be rectangular, oval, or custom die-cut to complement your brand's design language. Closure options include the standard tuck-end, lock-bottom construction for heavier bars, and a wrap-around belly band format for brands that prefer a more minimal packaging approach.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian soap brands selling through farmers markets, boutique gift stores, wellness retailers, beauty subscription boxes, and direct-to-consumer e-commerce channels. Cold-process soap makers frequently specify windowed kraft boxes to show off their hand-poured bars; luxury soap brands use rigid or SBS cartons with soft-touch lamination and gold foil to communicate premium gift positioning.</p>
<p>We also supply soap packaging to cosmetic manufacturers producing private-label soap ranges for major retailers, to hotel amenity programmes, and to corporate gifting companies sourcing branded soap as a premium gift inclusion.${rel1Link ? ' You may also be interested in our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Start your ${n} order by completing the quote form on this page. Share your bar dimensions (length, width, height), approximate order quantity, and your preferred material and finish. If you sell multiple soap varieties in different sizes, mention that — we can quote a range of formats in a single submission. Our team responds within 24 business hours.</p>`,
  },

  gift: {
    h2: n => `${n} — Creating Memorable Australian Gift Presentations Across Every Price Point`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Gift packaging exists to create a moment of anticipation before the product is revealed — and the quality of that moment communicates something about the giver's judgment, care, and taste. ${homeLink} produces ${n} with structural options that span tuck-end cartons with tissue inserts through to rigid magnetic boxes with ribbon pulls and custom-printed interiors. Every format is available in any dimension, with any combination of print and surface finish from our full range.</p>
<p>The Australian gift market encompasses personal gifting, corporate gifting, seasonal retail, wedding and event favours, and luxury retail unboxing — and we serve all of them from a single production facility with consistent quality standards. Our ${catLink} range is designed around the core requirement that the packaging must communicate value before the product inside is ever seen. The weight of the board, the precision of the construction, and the richness of the finish are all part of that communication.</p>`,
    materials: (n, catLink) =>
      `<h3>Structural Options for ${n}</h3>
<p>Gift packaging is produced across three primary structural formats: folding cartons (tuck-end, lock-bottom, or reverse-tuck), rigid boxes (lid-base, shoulder-neck, or clamshell), and combination formats such as sleeve-over-tray or magnetic-closure flat-pack boxes. Folding carton formats are produced from 300–450 gsm SBS or kraft board; rigid formats use greyboard from 1,200 to 2,400 gsm wrapped in specialty print paper. Each format has different implications for the unboxing experience, and our team will recommend the most appropriate structure for your product weight, dimensions, and price positioning.</p>
<h3>Finishing Options That Elevate Gift Presentation</h3>
<p>The most impactful finishing combinations for ${n} in the Australian market are soft-touch matte lamination for a velvet-like premium feel; matte lamination paired with spot UV to highlight logos and design elements; hot gold or silver foil stamping for brands with a clear luxury or occasion positioning; and embossing or debossing for brand marks that need tactile dimensionality. Ribbon pull inserts, magnetic closures, and silk or satin interior lining are available as structural upgrades on rigid box configurations.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian businesses across retail, corporate, and event categories. Luxury retail brands use them for jewellery, accessories, skincare, and lifestyle product presentation. Corporate gifting companies specify them for end-of-year gifts, client appreciation programmes, and event giveaways. Wedding and event businesses use them for bonbonnieres, bridesmaid gifts, and styled table favour presentations.</p>
<p>Online gift retailers and subscription box brands also rely on premium gift packaging to deliver a branded unboxing experience that reduces return rates and drives repeat purchase.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote request using the form on this page. Specify the product dimensions, your preferred structural format (folding carton vs. rigid box), the quantity you require, and any finish preferences. If you have a brand brief, colour guide, or existing design file, include it — our design team will work from whatever starting point you have. Response within 24 business hours.</p>`,
  },

  pillow: {
    h2: n => `${n} — A Distinctive Packaging Format for Jewellery, Gifts, and Boutique Retail`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Pillow boxes occupy a specific and well-recognised position in the Australian retail and gift packaging landscape — their curved die-cut profile and simple push-in closure create an impression of quality and care that a standard rectangular box rarely achieves at the same price point. ${homeLink} produces ${n} from premium SBS cardboard and kraft board, with full-colour branding on the exterior and a range of finishes suited to both boutique retail and premium gift applications. Sizes range from compact jewellery formats through to larger gift configurations appropriate for scarves, accessories, and lifestyle products.</p>
<p>The pillow box format is particularly well-suited to products that benefit from tactile presentation — the curved sides naturally invite handling, and the simple open-and-close mechanism creates a pleasant unpacking experience without the complexity of a lid-and-base or tuck-end format. Our full ${catLink} range covers all sizes and substrate options for this format.</p>`,
    materials: (n, catLink) =>
      `<h3>Substrate and Print Options for ${n}</h3>
<p>Our ${n} are available in 300–400 gsm SBS clay board for vivid full-colour printing, and in unbleached or bleached kraft board for brands that prefer a natural, eco-conscious aesthetic. SBS board delivers the cleanest and most colour-accurate print results; kraft board introduces a warm, textured surface character that works particularly well for artisan product ranges, natural beauty, and handmade gift applications.</p>
<h3>Finish and Embellishment Options</h3>
<p>Popular finishing treatments for ${n} include gloss lamination for intense colour vibrancy, matte lamination for a sophisticated and fingerprint-resistant surface, and spot UV to add selective high-gloss detail over a matte base. Hot foil stamping in gold or silver is a widely requested embellishment for jewellery and luxury gift applications, adding a metallic accent that communicates premium positioning without increasing the structural cost significantly.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used across jewellery retail (rings, earrings, bracelets, pendants), boutique fashion accessories (hair accessories, small leather goods), artisan gift brands (handmade soaps, candles, bath products), and event favour applications (wedding bonbonnieres, corporate events, celebration packs). The ease of assembly and the visual appeal of the format make it a practical choice for businesses that pack products in-house at volume.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Get a quote for your ${n} using the form on this page. Share the internal dimensions your product requires, your preferred substrate, and approximate order quantity. If you are unsure of the right size, our team can advise based on your product specifications — just describe the product you are packaging and we will recommend a suitable pillow box format.</p>`,
  },

  rigid: {
    h2: n => `${n} — Rigid Box Packaging That Signals Premium Quality Before the Product Is Touched`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Rigid boxes occupy a distinct position in Australian packaging — the weight of the board, the precision of the lid-to-base fit, and the texture of the exterior communicate premium quality before a customer opens the box or reads a word of copy. ${homeLink} produces ${n} from greyboard ranging from 1,200 to 2,400 gsm, wrapped in specialty print paper with full-colour artwork, and finished to the exact specification your brand positioning requires. Structural upgrades including magnetic closures, ribbon pull inserts, and custom interior lining are available on all standard rigid box configurations.</p>
<p>Rigid packaging is most effective when the engineering matches the promise — a lid that fits precisely, an exterior that wraps cleanly without bulge or gap, and an interior that holds your product secure during transit. Our ${n} are produced with detailed structural specification for each order and a final inspection that confirms every unit meets the approved standard before dispatch. Explore our ${catLink} range for full format options.</p>`,
    materials: (n, catLink) =>
      `<h3>Greyboard and Wrapping Paper Specifications</h3>
<p>The structural core of our ${n} uses greyboard (chipboard) in thicknesses of 1 mm, 1.5 mm, 2 mm, and 3 mm, selected based on your product weight, box dimensions, and required structural rigidity. The exterior is wrapped in specialty print paper — gloss art paper, matte art paper, or textured uncoated stock — with your full-colour artwork printed and then laminated or varnished to the chosen surface specification. Interior options include plain white board, colour-printed interior, or luxury velvet-like paper liner.</p>
<h3>Closure and Interior Upgrade Options</h3>
<p>Standard rigid boxes use a two-piece lid-and-base configuration. Magnetic closure strips embedded in the lid and base panel are available for brands that want a self-contained presentation without a separate enclosure. Ribbon pull inserts, foam cavity inserts, vacuum-formed plastic trays, and corrugated card dividers are all available as interior configurations to hold your product secure and present it in the correct orientation when the box is opened.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used across luxury retail, corporate gifting, premium e-commerce, jewellery and watch presentation, cosmetics and fragrance gift sets, electronics accessories, and high-end food and confectionery presentation. They are a preferred format for brands that need the packaging to communicate product value accurately — and for brands where the unboxing moment is shared online and needs to photograph well.${rel1Link ? ' Related formats include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include your product dimensions (length, width, height), the approximate weight of the product, your preferred greyboard thickness, quantity, and any finish or interior requirements. Rigid box production involves a slightly longer lead time for the structural specification step — we recommend contacting us as early in your timeline as possible.</p>`,
  },

  bakery: {
    h2: n => `Food-Safe ${n} for Australian Patisseries, Bakeries, and Artisan Food Producers`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Bakery packaging must fulfil two simultaneous demands — it must protect food during handling and transit while presenting it in a way that justifies the price point and encourages purchase. ${homeLink} produces ${n} from food-safe SBS clay board and kraft board alternatives, with interior coatings that provide grease resistance appropriate for pastries, cakes, slices, and high-fat baked goods. Windowed configurations are available for products where the visual appearance of the baked goods is the primary selling point at point of purchase.</p>
<p>Our production process for ${n} includes full food safety material certification, adhesive formulations that comply with Australian food contact standards, and printing inks specified for food packaging applications. We supply to independent patisseries, commercial bakeries, café operators, specialty food producers, and wholesale food manufacturers. See our full ${catLink} range for all available formats.</p>`,
    materials: (n, catLink) =>
      `<h3>Food-Safe Material Specifications for ${n}</h3>
<p>We produce ${n} from 300–400 gsm SBS clay board with food-safe interior lining where direct product contact occurs, and from natural unbleached kraft board for artisan brands that prefer the warmth of a natural material alongside their baked goods. Greaseproof interior coating is available as a functional upgrade for products with high fat or moisture content — pastries, croissants, butter-rich cakes, and slices all benefit from this specification to prevent saturation and structural failure during display or transit.</p>
<h3>Windowed Panels and Structural Formats</h3>
<p>Windowed bakery packaging uses a clear PET film panel die-cut into the box face or lid, allowing product to be seen without opening. Window shapes can be rectangular, circular, or custom die-cut to complement your brand design. Structural formats for ${n} include straight-tuck cartons for portion-sized items, lock-bottom boxes with secure base construction for heavier cakes and slices, flip-top lids for display pastry cases, and handled tote formats for gift and hamper applications.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian food businesses serving bakery cafés and patisseries, wedding cake suppliers, corporate catering businesses, specialty biscuit and slice producers, health food bakeries, and wholesale bakery suppliers to supermarket and deli accounts. The format and specification selected typically reflects the specific baked product, its weight, its fragility, and whether it is sold for immediate consumption or as a gift.${rel1Link ? ' See also our ' + rel1Link + ' for related packaging options.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote for your ${n} using the form on this page. Provide the internal dimensions your baked goods require, the approximate weight range of the products being packed, your preferred substrate (SBS or kraft), and the quantity. If greaseproof lining or a windowed panel is required, note that in your brief. Our team responds within 24 business hours with a detailed, itemised quote.</p>`,
  },

  display: {
    h2: n => `${n} — Retail Display Packaging Engineered for Point-of-Sale Conversion`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Counter display and floor display packaging has a single commercial objective — to move product at the point of purchase, at a rate that justifies the shelf space it occupies. ${homeLink} engineers ${n} with that objective as the primary brief: clear product visibility from the display face, a printed header card that communicates the product offer at a distance, and a structure designed for rapid replenishment between restocking cycles. We produce display packaging for FMCG brands, health and beauty companies, food businesses, and consumer goods manufacturers supplying independent retailers, pharmacy chains, and supermarkets across Australia.</p>
<p>The structural engineering of ${n} determines how effectively they perform on the shop floor — and we treat that engineering with the same precision as the print specification. Our ${catLink} range covers counter PDQ trays, floor display stands, shelf-ready packaging, and combination display-and-shipper formats.</p>`,
    materials: (n, catLink) =>
      `<h3>Structural and Material Specifications for ${n}</h3>
<p>Display packaging is produced in SBS cardboard (350–450 gsm) for counter display formats and in corrugated board (single or double wall) for floor display and shipper formats. The choice of substrate is determined by the load-bearing requirement, the display duration (temporary promotional vs. semi-permanent fixture), and the print quality specification. Full-colour litho laminate printing on corrugated board allows for highly detailed, photographic-quality graphics on floor display formats that previously required printed card laminated to a corrugated substrate.</p>
<h3>Header Card and Product Panel Options</h3>
<p>Header cards are the primary brand communication surface on a ${n} — they must communicate the product name, key benefit, and call to action at a distance of 3–5 metres in a typical retail environment. We print header cards in full colour with optional spot UV highlighting and gloss lamination for maximum visual impact. Product panels (the faces that hold or frame the individual units) can incorporate die-cut windows, printed product information, and promotional copy.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian FMCG brands in health and beauty, food and confectionery, toys, stationery, and personal care categories. Brands launching new products use display packaging to secure prominent fixture placement during the launch period. Seasonal promotional campaigns use them to highlight limited-edition offers without permanent shelf fixture changes.${rel1Link ? ' See related options including our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the retail environment (counter, floor, or shelf), the product dimensions and individual unit weight, the number of units per display, the total quantity of displays required, and any existing brand assets or retail buyer specifications. Our team will respond with a structural recommendation and pricing within 24 business hours.</p>`,
  },

  retail: {
    h2: n => `${n} — Custom Retail Packaging That Competes on Australian Shelves`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>In Australian retail, the packaging surrounding a product communicates brand values, price positioning, and quality before a customer reads a word of copy or interacts with the product. ${homeLink} produces ${n} from premium SBS cardboard and specialty substrates, printed in full colour with precision CMYK or Pantone spot colour matching, and finished with the exact surface treatment your brand requires. Whether your product sits in a supermarket gondola, a pharmacy planogram, a boutique gift store, or ships direct to consumer from an e-commerce warehouse, the packaging must perform consistently across all of those environments.</p>
<p>Our ${n} are available across the full range of structural formats — straight-tuck cartons, reverse-tuck end, auto-bottom lock, two-piece trays with lids, sleeve boxes, and custom die-cut structures. Every format is available in any dimension. See our complete ${catLink} range for all specifications.</p>`,
    materials: (n, catLink) =>
      `<h3>Cardboard Grades for ${n}</h3>
<p>Standard retail cartons are produced from 300–450 gsm SBS clay board — a bright white, caliper-consistent material that delivers vibrant full-colour printing and a clean, professional finish. For products with heavier contents or longer retail dwell times, we can specify higher caliper grades that provide additional compressive strength. Specialty stocks including textured papers, linen-finish board, and metallic substrates are available for brands seeking a distinctive material character on shelf.</p>
<h3>Printing Accuracy and Colour Management</h3>
<p>Retail packaging printing is managed to tight colour tolerances — particularly for brands where exact brand colour reproduction matters for shelf recognition and brand consistency across product lines. We offer Pantone spot colour matching for all ${n} orders where the CMYK gamut cannot achieve sufficient accuracy for your specific brand colours. Colour-managed digital proofs are provided for every order before production, and matched to the approved proof at the time of printing.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian brands across consumer electronics, stationery, toys, apparel accessories, health supplements, personal care, and general merchandise categories. Brands expanding into retail distribution after direct-to-consumer success often use this as the point where they invest in professionally specified retail packaging for the first time.${rel1Link ? ' See related options including our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Get a quote for your ${n} using the form on this page. Include your product dimensions, the quantity you require, any shelf or retail buyer specifications you are working to, and your preferred substrate and finish. We will respond with pricing and a production timeline within 24 business hours.</p>`,
  },

  food: {
    h2: n => `${n} — Food-Safe Custom Packaging for Australian Food Businesses`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Food packaging must meet a standard that most other packaging categories do not — food safety compliance, structural integrity under heat, cold, moisture, and grease, and brand presentation must all be achieved within a single solution. ${homeLink} produces ${n} from food-grade materials including SBS paperboard, kraft board, and corrugated board, with oil-resistant coatings and food-safe adhesive formulations specified where required by the product application. Full-colour CMYK printing on food packaging allows your branding to be as visually prominent as it would be on any retail carton.</p>
<p>We supply ${n} to quick-service restaurants, food delivery brands, specialty food producers, café operators, food hall vendors, and wholesale food manufacturers across Australia. All food packaging materials used in our ${catLink} range carry the relevant food contact certifications for the Australian market.</p>`,
    materials: (n, catLink) =>
      `<h3>Food-Safe Material Options for ${n}</h3>
<p>The primary substrate for most ${n} applications is food-grade SBS paperboard (300–400 gsm) with a food-safe interior coating. For products with high oil or moisture content — fried foods, sauces, creamy fillings — we apply a greaseproof or moisture-resistant interior barrier coating. Kraft board is specified for brands seeking a natural aesthetic alongside food-safe performance. Corrugated board is used for larger format food packaging where structural rigidity and insulation are priorities alongside branding.</p>
<h3>Printing on Food Packaging</h3>
<p>All printing inks used on ${n} are food-safe formulations that comply with Australian and international food contact regulations. Full-colour CMYK printing is standard, with Pantone spot colour matching available for brands requiring precise colour consistency. For corrugated and kraft variants, flexographic printing is an option for high-volume runs that require fast production with consistent results across large quantities.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian food businesses in quick-service restaurant chains, independent eateries, food delivery brands, food hall operators, hospital and institutional catering, gourmet food retail, and corporate catering services. The specific structural format — open tray, tuck-end carton, clamshell, or handled bag box — is selected based on the food product's shape, serving temperature, transit time, and consumption context.${rel1Link ? ' See also our ' + rel1Link + ' for related formats.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} by completing the form on this page. Share the food product type, the serving or retail dimensions you require, whether grease or moisture resistance is needed, approximate quantity, and any brand or design files you have. Our team will confirm material suitability and food contact compliance for your specific application in the quote response.</p>`,
  },

  candle: {
    h2: n => `${n} — Packaging Engineered for Australian Candle Brands and Home Fragrance Producers`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Candle packaging presents structural requirements that generic box templates rarely address effectively — the weight distribution of a glass vessel, the fragility of a pillar candle, and the need to protect fragrance integrity through storage and transit all require packaging that has been designed specifically for candles. ${homeLink} produces ${n} with base panels reinforced for the weight range of your specific candle format, interior heights adjustable to your jar or pillar dimensions, and exterior finishes that reflect the premium positioning that handcrafted home fragrance products typically carry in the Australian market.</p>
<p>We produce candle packaging for brands selling through boutique retailers, online direct-to-consumer, corporate gifting programmes, and wholesale to homewares and gift trade. See our full ${catLink} range for structural and finish options available for this format.</p>`,
    materials: (n, catLink) =>
      `<h3>Material and Construction for ${n}</h3>
<p>Our ${n} are produced from 350–450 gsm SBS clay board for folding carton formats, and from kraft board for brands that prefer the natural-organic character that the material communicates. Rigid greyboard (1,200–2,000 gsm) is specified for brands producing premium gift-tier candle sets where the structural weight of the box needs to match the product's price positioning. SBS board delivers the most vibrant colour reproduction; kraft delivers the warmest and most artisan visual character.</p>
<h3>Structural Features for Candle Packaging</h3>
<p>The base panel configuration is the most structurally important element of ${n} — it must support the combined weight of the wax, wick, vessel (if glass or ceramic), and any interior fill without deflecting or deforming during storage or transit. We specify base construction based on your confirmed product weights. Inserts — cardboard or foam — can be included to stabilise the candle within the box and prevent the vessel from shifting during transport.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} serve Australian candle businesses across the full market spectrum — boutique artisan brands selling 50-unit runs through a single retail account, growing wholesale candle labels with national distribution, and established home fragrance companies running 5,000+ unit seasonal production orders. The format and finish selected typically reflects the retail context: kraft board for artisan market and eco-conscious positioning, gloss or matte SBS for retail shelf, and rigid with soft-touch lamination for corporate gifting or luxury retail.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Get a quote for your ${n} using the form on this page. Share the candle format (pillar, jar, vessel — with the vessel dimensions), the quantity you need, your preferred substrate, and any branding or design files. If you are ordering candle packaging for the first time, our team will walk you through the structural specification process at no cost as part of the quoting step.</p>`,
  },

  corrugated: {
    h2: n => `${n} — Structural Packaging Built for Transit Performance and Brand Presence`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Corrugated packaging serves a fundamentally different brief to retail cartons — it must protect its contents through the demands of commercial shipping, sorting, handling, and storage, while still representing your brand clearly and consistently when it arrives at its destination. ${homeLink} produces ${n} in single, double, and triple wall configurations, with board grades selected for the fragility, weight, and transit distance of your specific product. Full-colour litho laminate printing is available for applications where the exterior of the box must serve as a brand communication surface alongside its structural function.</p>
<p>Our ${catLink} range covers all corrugated formats used in the Australian market — RSC (Regular Slotted Carton), die-cut shipper boxes, full-overlap cartons, self-locking mailer configurations, and custom structural designs for products that do not fit standard formats.</p>`,
    materials: (n, catLink) =>
      `<h3>Wall Configuration and Board Grade for ${n}</h3>
<p>Single wall corrugated (approx. 3–4 mm total thickness) is appropriate for products up to approximately 5 kg with standard fragility levels. Double wall (approx. 6–7 mm) provides significantly higher compressive and burst strength for heavier products or stacking requirements. Triple wall (approx. 10–12 mm) is used for industrial, export, and palletised shipping applications where maximum BCT (Box Compression Test) strength is required. Board liner grades range from standard Kraft liner through to premium white-top liner for applications where print quality on the outer surface is a priority.</p>
<h3>Printing Options for Corrugated ${n}</h3>
<p>Standard corrugated printing uses flexographic (flexo) inks directly on the liner — this produces clear, readable brand graphics and essential product information at competitive cost for high-volume runs. For applications requiring photographic print quality, we offer litho laminate printing — full-colour offset or digital printing on a smooth paper that is then laminated to the corrugated substrate. Litho laminate is the standard for e-commerce brands that use the outer box as a premium brand experience.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used across Australian e-commerce brands (where the outer box is the unboxing experience), food and beverage distribution, pharmaceutical and medical device distribution, hardware and industrial supply, and fragile goods shipping across all categories. Any product that ships through a courier network or pallet freight system and where transit damage would create a business cost benefits from a correctly specified corrugated outer carton.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Share the product dimensions and weight, the fragility level, the quantity you need, whether inside printing or branded exterior printing is required, and any stacking or pallet configuration requirements. Corrugated specification is more technical than retail carton work — our team will guide you through each decision as part of the quoting process.</p>`,
  },

  mailer: {
    h2: n => `${n} — Branded E-Commerce Packaging That Delivers Your Brand at the Customer's Door`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>For e-commerce businesses, the delivery box is the first physical brand interaction a customer has — and research consistently shows that premium branded mailer packaging increases repeat purchase rates, positive review submissions, and the likelihood of the unboxing being shared on social media. ${homeLink} produces ${n} with self-locking tabs for easy assembly without tape, full-colour exterior printing that keeps your brand visible throughout the delivery process, and board weights appropriate for the fragility and weight of the products you are shipping.</p>
<p>Our mailer packaging is designed for the realities of the Australian courier network — the boards we specify resist the compressive forces and handling involved in transit from production facility to customer door. Explore the full ${catLink} range for all mailer and shipping box configurations.</p>`,
    materials: (n, catLink) =>
      `<h3>Board Options for ${n}</h3>
<p>Standard mailer packaging uses single wall corrugated board (B or E flute) for products up to approximately 3–5 kg. For lighter products or brands prioritising a sleeker, less bulky unboxing experience, rigid board mailers (350–450 gsm) with self-adhesive closure strips are available. Kraft liner is the standard outer surface for corrugated mailers; white-top kraft or full-colour litho laminate are specified for brands where the exterior printing must be sharp and photographic. Interior surface options include natural brown, white, or full-colour printed interior for brands that want the inside of the box to reinforce their brand story.</p>
<h3>Closure and Assembly Features</h3>
<p>Self-locking mailer tabs allow the box to be assembled and closed securely without tape — critical for fulfilment operations where pack speed determines cost. Tear-strip openings are available for brands that want to make the unboxing experience easier for customers. Double-sided tape closure strips (peel-and-seal) are used on some rigid board mailer formats. Return address windows, QR code panels, and promotional copy are all printable elements that can be incorporated into the design of the exterior panels.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian e-commerce brands across clothing, accessories, cosmetics, food, health supplements, homewares, books and media, and technology accessories. Subscription box businesses use branded mailer packaging as a core part of their recurring brand experience. Gift-to-consumer brands use it to elevate the receiving moment for gifts sent directly from brand to recipient.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include your product dimensions and weight, the quantity you need, whether you require corrugated or rigid board, and any specific interior or exterior print requirements. If you are currently using unbranded or generic mailers and want to understand the cost difference of switching to a branded format, our team can provide a direct comparison in your quote.</p>`,
  },

  cbd: {
    h2: n => `${n} — Compliant, Professional Packaging for the Australian Wellness Market`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>CBD and plant-based wellness packaging in Australia operates within a regulatory environment that places specific demands on structural format, panel configuration, and printed content — requirements that generic retail packaging does not address. ${homeLink} produces ${n} with panel geometry that accommodates the required regulatory information without compromising brand design, in substrates that support the clean, credible aesthetic that wellness consumers expect from this product category. Child-resistant structural configurations are available where required by product classification.</p>
<p>We produce ${n} for brands selling CBD oil, hemp wellness products, tinctures, and related consumables through direct-to-consumer and dispensary channels across Australia. Our ${catLink} range is designed around the specific format and compliance requirements of this category.</p>`,
    materials: (n, catLink) =>
      `<h3>Substrate and Panel Configuration for ${n}</h3>
<p>CBD and wellness product packaging is typically produced from 300–400 gsm SBS clay board with clean white printing surfaces that support the precise legibility of required compliance text. The panel layout is structured to accommodate regulatory information fields without visual compromise to the primary brand design areas. Matte lamination is the most common surface finish in this category — its clean, understated aesthetic aligns with the health-adjacent positioning of wellness brands, and it provides good legibility for small-format compliance text.</p>
<h3>Child-Resistant Options</h3>
<p>Where product classification requires child-resistant packaging, we offer structural configurations with push-and-turn or squeeze-and-slide closure mechanisms that meet relevant Australian packaging standards. These structural requirements are factored into the box design from the dieline stage — they cannot be retrofitted to a standard tuck-end carton. If you are uncertain whether your product requires CR packaging, our team can advise based on the product classification and intended distribution channel.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian brands in the CBD oil, hemp extract, and botanical wellness supplement sectors. Typical customers are direct-to-consumer e-commerce brands, pharmacy-channel wellness labels, and practitioner-dispensed product lines. The specification requirements vary significantly by product type, concentration, and distribution channel — our team will help you identify the correct configuration for your specific application.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include your product dimensions, the quantity you need, whether child-resistant closure is required, and a brief description of your regulatory requirements. Our team will confirm material and structural suitability as part of the quoting response.</p>`,
  },

  pharma: {
    h2: n => `${n} — Medical-Grade Packaging for Australian Pharmaceutical and Health Product Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Pharmaceutical and health product packaging in Australia must meet requirements that standard retail cartons are not designed to address — tamper evidence, product legibility, regulatory compliance text placement, material safety certifications, and serialisation fields all impose constraints that must be resolved at the structural and print design stage. ${homeLink} produces ${n} from pharmaceutical-grade SBS board with printing specifications that deliver legibility across all required text elements, including small-format regulatory copy. Our team has experience working with compounding pharmacies, nutraceutical brands, and medical product companies across all Australian states.</p>
<p>Explore our full ${catLink} range for all pharmaceutical and health product packaging configurations.</p>`,
    materials: (n, catLink) =>
      `<h3>Material and Print Specifications for ${n}</h3>
<p>Pharmaceutical cartons are produced from 300–400 gsm SBS clay board — a consistent, white, food-contact-safe substrate that provides the clean printing surface necessary for legible regulatory text and accurate brand colour reproduction. Board caliper is specified to provide structural integrity appropriate for the product's shelf life and distribution conditions. All materials carry relevant Australian food and pharmaceutical contact certifications.</p>
<h3>Regulatory and Compliance Panel Configuration</h3>
<p>The panel layout of ${n} must accommodate all mandatory regulatory content — product name, active ingredient listing, dosage information, regulatory approval numbers, and batch/expiry fields — without compromising brand design quality. We work with your regulatory or compliance brief from the dieline stage to ensure all required information fields are correctly sized and positioned before design artwork is applied. Serialisation windows, QR code panels, and tamper-evident seal positions can all be incorporated into the structural design.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian compounding pharmacies, nutraceutical and supplement brands, veterinary pharmaceutical producers, and medical device manufacturers requiring secondary packaging. The specific requirements vary by regulatory classification — our team will work through the compliance specification with you as part of the quoting and design process.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote request for your ${n} using the form on this page. Include your product dimensions, the regulatory classification (if known), any specific compliance or serialisation requirements, and the quantity you need. Our team treats pharmaceutical packaging briefs with the precision and discretion that sensitive health product documentation requires.</p>`,
  },

  chocolate: {
    h2: n => `${n} — Premium Chocolate Packaging for Australian Confectionery Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Chocolate packaging must work at the intersection of food safety, product protection, luxury presentation, and thermal sensitivity — a combination of requirements that demands packaging specifically engineered for confectionery, not adapted from another category. ${homeLink} produces ${n} with food-safe interior liners where direct product contact occurs, precise compartment configurations for single-piece and assortment presentations, and exterior finishes ranging from gloss lamination through to hot foil stamping and embossing for brands positioned at the luxury end of the Australian confectionery market.</p>
<p>Our ${catLink} range covers all chocolate packaging formats used by Australian producers — from small bite-sized single-chocolate presentations through to large assorted gift boxes with custom insert trays. We supply artisan chocolatiers, corporate gifting confectionery brands, hotel and hospitality amenity producers, and retail confectionery labels.</p>`,
    materials: (n, catLink) =>
      `<h3>Food-Safe Materials for ${n}</h3>
<p>Our ${n} are produced from food-grade SBS paperboard or rigid greyboard, with food-safe interior liner paper in white or gold foil variants. Direct chocolate contact requires liner paper rated for food contact — this is standard in all our chocolate packaging configurations. Rigid greyboard is specified for luxury assortment boxes where structural weight and premium feel are integral to the product's price positioning; folding SBS cartons are used for individual bars, portion packs, and mid-tier assortment formats.</p>
<h3>Insert and Compartment Options</h3>
<p>Custom insert trays — in cardboard, vacuum-formed PET, or flocked velvet-like material — are available to hold individual chocolates in precise positions within the box. Compartment configurations from 2 to 36 pieces are standard; bespoke layouts for unusual assortment formats are designed on a per-order basis. The insert material and configuration significantly affect the perceived premium quality of the finished presentation and should be selected alongside the outer box specification.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian artisan chocolatiers producing hand-crafted truffle collections, by corporate gifting companies sourcing premium confectionery for seasonal campaigns, by hotel groups curating in-room amenity chocolate presentations, and by retail confectionery brands competing on shelf in the premium segment of the category.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the box external dimensions (or the compartment configuration you require), the quantity, your preferred exterior substrate and finish, and whether a custom insert tray is needed. Our team will confirm food-contact compliance and food-safe material certification for your specific configuration in the quote.</p>`,
  },

  popcorn: {
    h2: n => `${n} — Branded Popcorn Packaging for Australian Food and Entertainment Businesses`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>The visual impact of a popcorn box directly affects the perceived quality of the product inside — a vibrant, professionally printed popcorn box elevates a snack into a premium consumer experience. ${homeLink} produces ${n} from food-safe coated paperboard with grease-resistant interior coatings, full-colour CMYK exterior printing, and structural configurations from traditional open-top bucket formats through to flat-pack retail cartons and windowed display formats. We supply to cinema operators, event caterers, specialty food retailers, and gifting brands across Australia.</p>
<p>Our ${catLink} range includes all available popcorn packaging configurations in a wide range of sizes suitable for single serve, sharing, and retail retail formats.</p>`,
    materials: (n, catLink) =>
      `<h3>Food-Safe and Grease-Resistant Materials for ${n}</h3>
<p>Our ${n} are produced from food-grade SBS paperboard with a grease-resistant interior coating that prevents oil migration from butter or flavouring to the outer printed surface. The exterior is printed in full-colour CMYK — typically the most visually impactful printing specification for the fun, high-energy aesthetic that most popcorn brands use. Board weight is selected based on the format — open-top bucket formats require higher board rigidity to maintain shape when held; flat-pack retail cartons use lighter board appropriate for their structural configuration.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} serve Australian cinema chains, event catering businesses, specialty popcorn brands, gourmet food gift companies, and food hall operators. The open-top bucket format is the standard for food service; retail flat-pack cartons with a fold-top closure are specified for brands selling popcorn through retail channels.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote for your ${n} using the form on this page. Include your format preference (bucket, retail carton, or windowed display), the serving size or volume you need to accommodate, the quantity, and any brand or design files. Our team responds within 24 business hours.</p>`,
  },

  match: {
    h2: n => `${n} — Precision-Dimensioned Custom Match Box Packaging in Australia`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Match box packaging requires a level of dimensional precision that most other box formats do not — the internal sliding tray must move smoothly within the external sleeve, and both components must maintain consistent tolerances across the full production run. ${homeLink} produces ${n} with tightly controlled tray-to-sleeve dimensions, full-colour CMYK printing on the exterior sleeve, and optional strike-strip panels where functional match box applications require them. We produce match boxes for promotional, decorative, hospitality, gifting, and functional applications across Australia.</p>
<p>Our ${catLink} range includes standard and custom-dimensioned match box formats.</p>`,
    materials: (n, catLink) =>
      `<h3>Materials and Tolerances for ${n}</h3>
<p>Our ${n} are produced from 300–350 gsm SBS clay board for the external sleeve and 250–300 gsm board for the internal tray. The dimensional relationship between tray and sleeve is the critical specification — a tray that is too loose rattles and feels cheap; a tray that is too tight is difficult to operate. Our production process maintains a ±0.5 mm tolerance on both components to ensure a consistent sliding action across all units in the run.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by hotel and restaurant groups for branded table or fireplace match presentations, by luxury lifestyle brands for promotional gifting, by artisan candle companies producing branded matchboxes to accompany their candle products, and by event companies creating custom match box favours.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the external dimensions you require (or the internal dimensions if you are filling the boxes with specific match lengths), the quantity, and any finish or print requirements. Our team will confirm the production tolerances and timeline in your quote response.</p>`,
  },

  cardboard: {
    h2: n => `${n} — Versatile Custom Cardboard Packaging for Australian Businesses`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Cardboard packaging remains the most versatile substrate category in Australian custom packaging — adaptable across product types, printing methods, structural formats, and finish specifications. ${homeLink} produces ${n} from SBS clay board ranging from 250 to 450 gsm, selected for your product weight, retail application, and print specification. Whether you need a standard straight-tuck carton, a two-piece tray with lid, a sleeve box with insert, or a fully bespoke die-cut structure, our team engineers the solution around your dimensions and brand requirements.</p>
<p>Our ${catLink} range covers every cardboard packaging format used in the Australian market, from compact retail cartons through to large product presentation boxes.</p>`,
    materials: (n, catLink) =>
      `<h3>Cardboard Grades and Structural Options for ${n}</h3>
<p>Standard retail and product packaging uses 300–400 gsm SBS clay board, which provides an excellent balance of structural rigidity, print fidelity, and cost efficiency. Higher caliper grades (up to 450 gsm) are specified for heavier products or applications requiring additional stacking strength. The structure of your ${n} — tuck-end, lock-bottom, sleeve, or custom — is determined by the product shape, the opening experience you want to deliver, and the assembly method used in your packing operation.</p>
<h3>Finishing Options for Cardboard Packaging</h3>
<p>All standard surface finishes are available on ${n} — gloss lamination for vivid shelf presence, matte lamination for a refined and fingerprint-resistant surface, soft-touch coating for a premium velvet-like texture, spot UV for selective high-gloss accent detail, hot foil stamping in gold, silver, or custom colours, and embossing or debossing for dimensional brand marks that communicate quality by touch as well as sight.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian businesses across retail, e-commerce, gifting, food, cosmetics, health, and industrial categories. Cardboard is the universal packaging material — suitable for almost any product that does not have specific requirements that push it toward corrugated board or a rigid box format.${rel1Link ? ' Related formats include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Get a quote for your ${n} using the form on this page. Include your product dimensions, the quantity required, your preferred board weight and finish, and any structural requirements. Our team will confirm the most appropriate configuration and provide pricing within 24 business hours.</p>`,
  },

  business_card: {
    h2: n => `${n} — Custom Business Cards and Card Design Printed and Supplied Across Australia`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>A business card remains one of the most powerful personal brand tools in the Australian professional market — it is the only brand touchpoint you physically place into another person's hands, and the quality of the card communicates as much as the information printed on it. ${homeLink} produces ${n} from ultra-thick stocks including 400–700 gsm laminated boards, with finish options from standard gloss through to matte soft-touch, spot UV highlighting, hot foil stamping, rounded corners, and custom die cuts. We print to Australian business card standard dimensions as well as custom formats for brands that want to stand out.</p>
<p>Explore the full ${catLink} range for all card specifications and format options.</p>`,
    materials: (n, catLink) =>
      `<h3>Stock and Finish Options for ${n}</h3>
<p>Our ${n} are produced from premium 350–600 gsm laminated board in gloss, matte, and soft-touch variants. Soft-touch matte lamination is the most requested finish in the Australian professional market — its velvet-like texture creates a first-impression quality that standard laminated cards cannot match. Spot UV applied to a name, logo, or specific design element over a matte base creates a contrast effect that draws the eye and makes the card memorable. Gold and silver foil stamping are used to elevate brand marks and professional designation text.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian professionals across every sector — from real estate agents and financial advisers to graphic designers, photographers, healthcare practitioners, and corporate sales teams. We also print cards for event vendors, market stallholders, and businesses replacing old cards with a rebrand.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote using the form on this page. Share the quantity you need, the finish preference, and any existing design files you have. If you need a new design, our team will create it as part of the quote process. We print standard 90 × 55 mm and all custom dimensions.</p>`,
  },

  sticker: {
    h2: n => `${n} — Custom Labels and Stickers for Australian Businesses and Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Custom stickers and labels serve a wide range of commercial functions in the Australian market — from product identification on retail shelving and packaging compliance labelling through to vehicle graphics, promotional campaigns, and branded seal stickers for e-commerce parcels. ${homeLink} produces ${n} on substrates matched to the specific application: vinyl for outdoor, vehicle, and durable applications; white or clear polypropylene for product and packaging labels; paper for general retail labelling; and kraft paper for brands seeking a natural, artisan aesthetic on their product labels.</p>
<p>Our ${catLink} range covers all sticker and label formats used by Australian businesses, in sizes from small round product seals through to large format vehicle graphics.</p>`,
    materials: (n, catLink) =>
      `<h3>Substrate Options for ${n}</h3>
<p>Vinyl stickers offer the best durability for outdoor, vehicle, and product surface applications where UV exposure, moisture, and abrasion are factors. Paper-based labels are the standard choice for food and beverage product labelling, packaging seals, and general product identification where a short shelf life and removal without damage are acceptable. Clear polypropylene produces a no-label look on transparent packaging and glass bottles. Kraft paper labels align visually with sustainable brand packaging and are used extensively by artisan food, soap, and candle producers.</p>
<h3>Adhesive and Finish Specifications</h3>
<p>Adhesive specification is as important as substrate selection for ${n} — permanent adhesive for product labelling, removable for promotional applications, high-tack for textured or low-energy surfaces such as corrugated board or matte-laminated cartons. Gloss, matte, and clear laminate finishes are available over the printed surface for additional durability and protection.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian product brands for packaging, by vehicle wrap installers for fleet graphics, by event businesses for branded promotional material, by e-commerce brands for parcel sealing stickers, and by hospitality businesses for menu inserts, product labels, and branded collateral.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Get a quote for your ${n} using the form on this page. Include the application type, the intended surface it will adhere to, the dimensions, the quantity, and any design files. Our team will recommend the correct substrate and adhesive specification for your use case and provide pricing within 24 hours.</p>`,
  },

  folder: {
    h2: n => `${n} — Professional Presentation Folders for Australian Businesses`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Presentation folders are one of the most practical and durable corporate communications tools in the Australian professional market — they organise and present sales proposals, client onboarding packs, and company information in a format that projects systematic professionalism and careful preparation. ${homeLink} produces ${n} from premium 350–400 gsm board with full-colour exterior branding, in configurations including single pocket, double pocket, business card slots, document spine, and tri-fold formats. All configurations are available in any size from standard A4 through to custom presentation dimensions.</p>
<p>Our ${catLink} range covers all folder formats used by Australian professional services, government, and corporate sectors.</p>`,
    materials: (n, catLink) =>
      `<h3>Stock and Finish Options for ${n}</h3>
<p>Our ${n} are produced from 350–400 gsm SBS clay board with gloss or matte lamination on the cover. Matte lamination with spot UV on the logo and key brand elements is the most requested finish combination in the Australian professional sector — it creates a premium, refined appearance that communicates the quality of the business inside. Gloss lamination delivers high colour vibrancy and is preferred for industries where visual impact is the primary goal. Embossing on the logo or brand name is available for firms that want a tactile brand mark on the folder cover.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by law firms, accounting and advisory practices, architectural and design firms, real estate agencies, financial planning groups, government departments, educational institutions, and any professional services business that regularly presents proposals or onboarding documentation to clients.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote using the form on this page. Share the folder format (single or double pocket, with or without business card slot), the document size, the quantity, and your preferred finish. Provide any existing brand files or guidelines and our design team will create the folder artwork at no cost.</p>`,
  },

  pizza: {
    h2: n => `${n} — Custom Pizza Box Packaging for Australian Restaurants and Pizzerias`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Pizza box packaging must balance three simultaneous requirements — heat retention through delivery or counter wait time, grease and moisture resistance through the base and walls, and a printed top face that presents your brand clearly when the box arrives at a customer's door or table. ${homeLink} produces ${n} from food-safe corrugated board with a grease-resistant inner base surface and full-colour printing on the exterior lid — delivering functional performance and brand presence in the highly competitive Australian takeaway food market.</p>
<p>Our ${catLink} range covers all pizza box sizes and configurations used by Australian pizzerias, restaurants, and food delivery businesses.</p>`,
    materials: (n, catLink) =>
      `<h3>Material and Construction Specifications for ${n}</h3>
<p>Our ${n} are produced from single wall corrugated board with a food-safe inner liner. The corrugated flute provides structural rigidity for stacking multiple boxes during delivery preparation while the hollow air channels provide passive insulation that helps retain pizza temperature. The inner base surface is coated for grease resistance — preventing the oil from a pizza base or cheese from saturating the board and compromising structural integrity during transit.</p>
<h3>Printing Options for Pizza Box Packaging</h3>
<p>Standard pizza box printing uses flexographic inks on the outer kraft liner — producing clear, legible brand graphics and essential information (brand name, contact details, web address) at a competitive cost for the high volumes typical of pizza box ordering. For premium positioning or brands where graphic quality on the lid is a priority, we offer litho laminate printing that delivers photographic-quality colour reproduction on the full-colour lid panel.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian independent pizzerias, restaurant chain operators, food delivery brands, caterers, event food vendors, and food hall pizza operators. Size is typically the primary specification variable — most pizzeria operators order a range of sizes (8", 10", 12", 14", 16") to accommodate their menu offerings.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the sizes you need, the quantity per size, and your brand name and contact details for the print panel. If you have existing artwork, include it — if not, our design team will create a print-ready design for the lid panel at no charge.</p>`,
  },

  tray: {
    h2: n => `${n} — Custom Cardboard Trays for Australian Food Service and Retail`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Cardboard tray packaging serves a brief that differs from enclosed box formats — it must hold its form under product load while keeping contents visible, accessible, and attractively presented from above. ${homeLink} produces ${n} in food-safe board configurations from low-profile open display trays through to deep food service formats with divider options, with full-colour printing for branded applications and plain kraft or white board for functional display and service use.</p>
<p>Our ${catLink} range covers all tray formats, sizes, and substrates used in the Australian food service and retail sectors.</p>`,
    materials: (n, catLink) =>
      `<h3>Materials and Construction for ${n}</h3>
<p>Our ${n} are produced from 350–450 gsm SBS clay board for retail display and food service applications where cleanliness and print quality are priorities. Corrugated board (single wall) is used for larger, heavier-load tray formats. All food service tray variants use food-safe board and adhesive formulations compliant with Australian food contact standards. Grease-resistant interior coatings are available for high-fat food applications.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used in Australian café and restaurant operations (condiment trays, cake display trays, breakfast service trays), in retail food settings (deli counter trays, bakery display trays, market produce trays), and in industrial and logistics contexts where open tray formats are required for efficient pick-and-pack operations.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote for your ${n} using the form on this page. Include the tray dimensions (length, width, and depth), the quantity, the intended use, and whether printing or grease-resistant coating is required. We will confirm the correct board specification and provide pricing within 24 hours.</p>`,
  },

  christmas: {
    h2: n => `${n} — Seasonal Christmas Packaging for Australian Retail and Gift Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Christmas packaging occupies a commercially critical window in the Australian retail calendar — it must create excitement, signal celebration, and communicate generosity during the highest-spending gifting period of the year. ${homeLink} produces ${n} with festive graphic design, premium surface finishes appropriate to gift presentation, and structural configurations suited to everything from small stocking-filler formats through to large family gift boxes and corporate Christmas hamper packaging.</p>
<p>Our ${catLink} range covers all seasonal Christmas packaging formats, from individual gift boxes through to display packaging and gift bag options.</p>`,
    materials: (n, catLink) =>
      `<h3>Substrate and Finish Options for ${n}</h3>
<p>Our ${n} are produced from 300–400 gsm SBS clay board with full-colour seasonal artwork. Gloss lamination is popular for vibrant, high-impact Christmas graphics; matte lamination with spot UV on gold or metallic design elements is preferred for brands with a more sophisticated, premium Christmas aesthetic. Hot gold or silver foil stamping on key design elements — stars, ribbons, typography — adds a festive premium quality that resonates strongly in the Christmas gifting context.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian retail brands producing limited-edition Christmas product ranges, by corporate gifting companies managing seasonal client and staff gift programmes, by confectionery and food brands releasing Christmas-themed packaging for the holiday period, and by event and hospitality businesses creating branded Christmas presentation for guest gifts and corporate entertainment.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Christmas packaging orders require adequate lead time to accommodate production and delivery before the holiday period. Request a quote as early as possible using the form on this page — include your required delivery date, product dimensions, quantity, and any design files or seasonal theme references. Our team will confirm availability and provide pricing within 24 hours.</p>`,
  },

  beverage: {
    h2: n => `${n} — Custom Beverage Packaging for Australian Coffee, Tea, and Drink Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Beverage packaging competes in a market where brand differentiation is both intense and deeply personal — a customer's choice of specialty coffee or premium tea carries meaning about their values, their taste, and their identity. ${homeLink} produces ${n} to accommodate tin, sachet, bag, capsule, and carton formats, with full-colour printing that communicates origin, flavour profile, and brand story with the precision this category demands. The structural format must also address the practical requirements of the product — moisture resistance for tea and coffee, barrier properties for freshness, and structural integrity through retail handling.</p>
<p>Our ${catLink} range covers all beverage packaging formats used in the Australian specialty food and drink market.</p>`,
    materials: (n, catLink) =>
      `<h3>Material Specifications for ${n}</h3>
<p>Our ${n} are produced from 300–400 gsm SBS clay board for carton formats, with food-safe interior coatings where moisture resistance is required. For retail shelf cartons containing tea sachets, coffee bags, or capsule packs, the board grade is selected for the product weight and the shelf dwell time the packaging must endure without dimensional distortion. Printing quality is typically the primary specification for beverage packaging in the specialty sector — complex label designs, origin photography, and brand story text all require high print fidelity.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are used by Australian specialty coffee roasters packaging retail bags and capsule sleeves, by premium tea brands packaging sachet collections and loose-leaf retail cartons, by functional beverage companies packaging powder blends and supplement drinks, and by gifting brands curating beverage discovery packs and hamper inclusions.${rel1Link ? ' See also our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the format (carton, sleeve, outer box), the product dimensions, the quantity, and your preferred finish. If you have existing brand files, include them — our design team will adapt them to the required structural format at no cost.</p>`,
  },

  candy: {
    h2: n => `${n} — Food-Safe Candy and Confectionery Packaging for Australian Brands`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Confectionery packaging must entice the eye while protecting a product that is often fragile, temperature-sensitive, and susceptible to moisture — a combination of demands that requires genuine food-safe engineering alongside effective brand design. ${homeLink} produces ${n} from food-safe SBS or kraft board with food-safe interior liner options for direct product contact, windowed panel configurations for product visibility where relevant, and exterior finishes from gloss lamination for maximum colour impact to uncoated kraft for an artisan aesthetic that resonates with specialty confectionery brands.</p>
<p>Our ${catLink} range covers all candy and confectionery packaging formats used by Australian producers.</p>`,
    materials: (n, catLink) =>
      `<h3>Food-Safe Materials for ${n}</h3>
<p>Our ${n} use food-grade board and adhesive formulations that comply with Australian food contact standards. Interior liner paper in white or gold foil is available for configurations where the candy is in direct contact with the packaging surface. For windowed variants, the clear PET window panel is food-safe and tested for contact with confectionery products. All materials carry relevant Australian food contact certifications.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} are ordered by Australian artisan candy makers, chocolate and confectionery brands, wholesale confectionery suppliers to retail, corporate gifting companies sourcing premium sweet gifts, and event businesses producing branded candy presentations for weddings, events, and celebrations.${rel1Link ? ' Related options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Submit a quote for your ${n} using the form on this page. Include the confectionery type (gummies, chocolate-coated nuts, hard candies, etc.), the weight or volume to be packaged, the quantity, and your preferred format and finish. Our team will confirm food-contact suitability and provide pricing within 24 hours.</p>`,
  },

  general: {
    h2: n => `${n} — Premium Custom Packaging for Australian Businesses`,
    brand: (n, cat, catLink, homeLink) =>
      `<p>Custom packaging plays a critical commercial role for Australian businesses at every stage of growth — it protects the product, communicates the brand, and creates the first physical impression that determines whether a customer returns. ${homeLink} produces ${n} to your exact specifications, with a choice of premium substrates, full-colour printing, and a comprehensive range of surface finishes that allow your packaging to reflect the quality of your brand and the character of your product.</p>
<p>We produce ${n} for Australian businesses across retail, e-commerce, food, cosmetics, gifts, health, and industrial categories. Our ${catLink} range covers all structural formats and material options available for this product type.</p>`,
    materials: (n, catLink) =>
      `<h3>Materials Available for ${n}</h3>
<p>Our ${n} are produced from 300–450 gsm SBS clay board for folding carton formats, kraft board in 300–400 gsm for eco-aligned brands, rigid greyboard from 1,200–2,400 gsm for premium box formats, and single or double wall corrugated board for products requiring additional transit protection. The most appropriate substrate for your application depends on the product weight, the retail or dispatch environment, and the surface finish requirements of your brand.</p>
<h3>Print and Finish Options</h3>
<p>Full-colour CMYK printing with optional Pantone spot colour matching is available on all ${n} formats. Surface finishes include gloss lamination for vivid colour intensity, matte lamination for a refined and fingerprint-resistant surface, soft-touch coating for a premium tactile experience, spot UV varnish for selective high-gloss contrast, and hot foil stamping in gold, silver, and custom colours. Embossing and debossing are available for brand marks that benefit from dimensional relief.</p>`,
    applications: (n, rel1Link) =>
      `<p>Our ${n} serve Australian businesses across all product categories and all order volumes. Whether you are launching a new product with a short-run prototype order, scaling an existing product into retail distribution, or managing high-volume replenishment for an established brand, our production process and account management approach is the same.${rel1Link ? ' Related packaging options include our ' + rel1Link + '.' : ''}</p>`,
    cta: (n, cat) =>
      `<p>Request a quote for your ${n} using the form on this page. Include the product dimensions, the quantity you require, your preferred material, and any finish or structural requirements. Our team will respond with a detailed, itemised quote within 24 business hours — no obligation at any stage of the process.</p>`,
  },

};

export function buildRichDescription(
  product: any,
  primaryCat: string,
  primaryCatSlug: string,
  related: any[]
): string {
  const rawName   = product.name.replace(/^Order\s+/i, '').replace(/\s+(?:Wholesale|Packaging)\s*$/i, '').trim();
  const cat       = primaryCat || 'Custom Packaging';
  const catUrl    = `/product-category/${primaryCatSlug}/`;

  const rel0    = related[0] || null;
  const rel1    = related[1] || null;
  const rel0Name = rel0 ? rel0.name.replace(/^Order\s+/i, '').trim() : '';
  const rel1Name = rel1 ? rel1.name.replace(/^Order\s+/i, '').trim() : '';
  const rel0Link = rel0 ? `<a href="/product/${rel0.slug}" class="desc-link">${rel0Name}</a>` : '';
  const rel1Link = rel1 ? `<a href="/product/${rel1.slug}" class="desc-link">${rel1Name}</a>` : '';

  const homeLink = '<a href="/" class="desc-link">ZEE Custom Boxes AU</a>';
  const catLink  = `<a href="${catUrl}" class="desc-link">${cat}</a>`;

  const short = (product.shortDescription || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const sents = short.match(/[^.!?]+[.!?]+/g) || [short];
  const mid   = Math.ceil(sents.length / 2);
  const intro1 = sents.slice(0, mid).join(' ').trim();
  const intro2 = sents.slice(mid).join(' ').trim();

  const type = detectType(product.name, product.categories || []);
  const tc   = TYPE_CONTENT[type];

  const specsTable = product.specifications
    ? `<div class="rich-table-wrap">${product.specifications}</div>`
    : `<div class="rich-table-wrap"><table class="rich-specs-table"><tbody>
<tr><th>Material</th><td>300–400 GSM Cardboard, Kraft, Rigid Board, or Corrugated</td></tr>
<tr><th>Printing</th><td>CMYK Offset, Digital, Pantone Spot Colour Matching</td></tr>
<tr><th>Finishes</th><td>Gloss, Matte, Soft-Touch, Spot UV, Foil Stamping, Embossing</td></tr>
<tr><th>Sizes</th><td>Fully custom — any dimension specified to your product</td></tr>
<tr><th>Minimum Order</th><td>No minimum order quantity</td></tr>
<tr><th>Turnaround</th><td>7–14 business days from artwork approval</td></tr>
<tr><th>Delivery</th><td>Australia-wide — all states and territories</td></tr>
<tr><th>Eco Options</th><td>Recycled board, FSC-certified kraft, soy-based inks</td></tr>
</tbody></table></div>`;

  const parts: string[] = [];

  if (intro1) parts.push(`<p>${intro1}</p>`);
  if (intro2) parts.push(`<p>${intro2}</p>`);

  parts.push(
    `<h2>${tc.h2(rawName)}</h2>` +
    tc.brand(rawName, cat, catLink, homeLink)
  );

  parts.push(
    `<h2>Materials, Printing, and Finish Options</h2>` +
    tc.materials(rawName, catLink)
  );

  parts.push(
    `<h2>${rawName} — Technical Specifications</h2>` +
    specsTable
  );

  parts.push(
    `<h2>How to Order ${rawName}</h2>` +
    `<ol>
<li><strong>Submit your brief</strong> — Complete the quote form on this page with your product dimensions, quantity, material preference, and any design notes or references. A response with full pricing arrives within 24 business hours.</li>
<li><strong>Review your quote</strong> — Your quote includes pricing across multiple quantity tiers, substrate options, and a recommended production timeline. We welcome adjustments to match your budget or schedule.</li>
<li><strong>Free artwork creation</strong> — Once you confirm the order, our in-house designers produce your artwork at no cost. You receive a 3D digital mockup and a flat dieline for approval before any printing begins.</li>
<li><strong>Approve and produce</strong> — After written approval of your artwork, ${rawName} enter production. Standard turnaround is 7–14 business days. Express options are available for urgent timelines.</li>
<li><strong>Quality inspection</strong> — Every completed order is checked for colour accuracy, structural consistency, and finish quality before packing.</li>
<li><strong>Delivery across Australia</strong> — Your ${rawName} are shipped directly to your nominated address, anywhere in Australia, with full tracking from dispatch to delivery.</li>
</ol>`
  );

  parts.push(
    `<h2>What You Get With Every ${rawName} Order</h2>` +
    `<ul>
<li><strong>Free professional design</strong> — Expert artwork creation with unlimited revisions at no additional cost</li>
<li><strong>No minimum order quantity</strong> — Order any volume, from a single prototype to large wholesale runs</li>
<li><strong>Custom dimensions</strong> — Every order is produced to your exact product measurements, no standard size catalogue</li>
<li><strong>7–14 business day production</strong> — Reliable turnaround without compromising print or structural quality</li>
<li><strong>Nationwide delivery</strong> — Tracked shipping to all Australian states and territories</li>
<li><strong>Transparent wholesale pricing</strong> — Itemised quotes with volume tier breakdown and no hidden fees</li>
<li><strong>Eco-friendly options</strong> — Recycled board, FSC-certified kraft, and plant-based ink alternatives available</li>
<li><strong>Quality guarantee</strong> — If your order contains a defect or does not match approved artwork, we reprint or refund</li>
</ul>`
  );

  parts.push(
    `<h2>Industries and Applications for ${rawName}</h2>` +
    tc.applications(rawName, rel1Link)
  );

  parts.push(
    `<h2>Request a Quote for ${rawName}</h2>` +
    tc.cta(rawName, cat) +
    (rel0Link ? `<p>If you are sourcing packaging across multiple product types, you may also find our ${rel0Link} worth reviewing alongside this order.</p>` : '')
  );

  return parts.join('\n');
}
