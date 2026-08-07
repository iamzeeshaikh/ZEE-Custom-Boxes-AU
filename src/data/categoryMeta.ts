// Hand-written meta titles & descriptions for category pages.
// Titles exclude the brand — Layout appends " | ZEE Custom Boxes AU".
// Kept within SERP display limits: title ≤ 40 chars pre-brand, description ≤ 158.
// These feed ONLY the <title>/<meta description> tags — never JSON-LD schema.

export interface CategoryMeta {
  metaTitle: string;
  metaDescription: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  'custom-cosmetic-boxes-packaging': {
    metaTitle: 'Custom Cosmetic Boxes & Packaging AU',
    metaDescription: 'Order custom cosmetic boxes wholesale across Australia. Soft-touch, foil & spot UV finishes, free design and fast turnaround. Get a free quote today.',
  },
  'custom-kraft-boxes-packaging': {
    metaTitle: 'Custom Kraft Boxes Wholesale Australia',
    metaDescription: 'Eco-friendly custom kraft boxes made to your exact size. FSC board, low minimums, free design service and Australia-wide delivery. Request a quote.',
  },
  'custom-soap-boxes-packaging': {
    metaTitle: 'Custom Soap Boxes & Packaging Wholesale',
    metaDescription: 'Custom soap boxes with window, kraft and printed options for Australian makers. Free dieline design, fast turnaround and true wholesale pricing.',
  },
  'custom-gift-packaging-boxes': {
    metaTitle: 'Custom Gift Boxes & Packaging Australia',
    metaDescription: 'Premium custom gift boxes with magnetic lids, ribbon and foil options. Free design, wholesale prices and fast delivery across Australia.',
  },
  'custom-pillow-boxes-packaging': {
    metaTitle: 'Custom Pillow Boxes Wholesale Australia',
    metaDescription: 'Order custom pillow boxes in kraft, white or full-colour print. Perfect for favours and retail. Free design and quick Australia-wide turnaround.',
  },
  'custom-rigid-boxes-packaging': {
    metaTitle: 'Luxury Custom Rigid Boxes Australia',
    metaDescription: 'Rigid setup boxes for luxury brands — magnetic closure, lid and base, foil and soft-touch finishes. Free design with wholesale pricing in Australia.',
  },
  'custom-bakery-boxes-packaging': {
    metaTitle: 'Custom Bakery Boxes & Packaging AU',
    metaDescription: 'Food-safe custom bakery boxes for cakes, pastries and desserts. Window cutouts, full-colour print, free design and fast delivery across Australia.',
  },
  'custom-display-packaging-boxes': {
    metaTitle: 'Custom Display Boxes & Counter Packs AU',
    metaDescription: 'Custom counter display boxes that sell — sturdy board, vivid print and retail-ready formats. Free design service and wholesale prices in Australia.',
  },
  'custom-retail-boxes-packaging': {
    metaTitle: 'Custom Retail Boxes & Packaging AU',
    metaDescription: "Retail-ready custom boxes with premium print and finishes. Made to your product's exact size with free design and Australia-wide delivery.",
  },
  'custom-beverage-packaging-boxes': {
    metaTitle: 'Custom Beverage Boxes & Carriers AU',
    metaDescription: 'Custom beverage packaging — bottle boxes, can sleeves and carriers in food-grade board. Free design, wholesale pricing and fast AU turnaround.',
  },
  'custom-food-packaging-boxes': {
    metaTitle: 'Custom Food Packaging Boxes Australia',
    metaDescription: 'Food-grade custom packaging boxes for takeaway, retail and delivery. Grease-resistant options, free design and wholesale prices across Australia.',
  },
  'custom-match-boxes': {
    metaTitle: 'Custom Match Boxes Wholesale Australia',
    metaDescription: 'Custom printed match boxes in slide and tray styles. Small-run friendly with free design, quality board and fast delivery across Australia.',
  },
  'pharmaceutical-packaging': {
    metaTitle: 'Pharmaceutical Packaging Boxes AU',
    metaDescription: 'Compliant pharmaceutical packaging with crisp print, tamper-friendly formats and exact sizing. Free design and wholesale pricing in Australia.',
  },
  'custom-product-boxes-packaging': {
    metaTitle: 'Custom Product Boxes & Packaging AU',
    metaDescription: 'Custom product boxes made to your exact dimensions. Any style, premium finishes, free design service and wholesale prices across Australia.',
  },
  'brown-boxes-packaging': {
    metaTitle: 'Brown Kraft Boxes Wholesale Australia',
    metaDescription: 'Durable brown kraft boxes for shipping, retail and food. Eco-friendly board, custom sizes and print, free design and Australia-wide delivery.',
  },
  'custom-business-cards-design-and-printing-services': {
    metaTitle: 'Business Card Design & Printing AU',
    metaDescription: 'Professional business card design and printing — premium stocks, foil and spot UV options, free design service and fast delivery across Australia.',
  },
  'custom-candy-boxes-packaging': {
    metaTitle: 'Custom Candy Boxes & Packaging AU',
    metaDescription: 'Sweet custom candy boxes with windows, inserts and vivid print. Food-safe board, free design and wholesale prices with fast AU turnaround.',
  },
  'custom-cardboard-boxes': {
    metaTitle: 'Custom Cardboard Boxes Australia',
    metaDescription: 'Custom cardboard boxes cut to your exact size and printed your way. Low minimums, free design service and fast delivery across Australia.',
  },
  'custom-candle-boxes': {
    metaTitle: 'Custom Candle Boxes Wholesale AU',
    metaDescription: 'Custom candle boxes with inserts, windows and luxury finishes. Protect jars and tins in style — free design and wholesale pricing in Australia.',
  },
  'custom-corrugated-boxes': {
    metaTitle: 'Custom Corrugated Boxes Australia',
    metaDescription: 'Strong corrugated boxes for shipping and subscription brands. Custom sizes, printed inside and out, free design and Australia-wide delivery.',
  },
  'custom-cbd-boxes-packaging': {
    metaTitle: 'Custom CBD Boxes & Packaging AU',
    metaDescription: 'Custom CBD packaging boxes with compliant labelling space and premium finishes. Free design, low minimums and wholesale prices in Australia.',
  },
  'custom-christmas-boxes': {
    metaTitle: 'Custom Christmas Boxes Australia',
    metaDescription: 'Festive custom Christmas boxes for gifts, hampers and retail. Seasonal prints, foil accents, free design and fast Australia-wide delivery.',
  },
  'custom-cardboard-trays': {
    metaTitle: 'Custom Cardboard Trays Wholesale AU',
    metaDescription: 'Custom cardboard trays for food, retail and display. Food-safe board, exact sizing, free design service and wholesale prices across Australia.',
  },
  'custom-stickers-and-lablels': {
    metaTitle: 'Custom Stickers & Labels Australia',
    metaDescription: 'Custom stickers and labels in any shape — die-cut, roll and sheet formats. Vivid print, durable stocks, free design and fast AU delivery.',
  },
  'custom-presentation-folders': {
    metaTitle: 'Custom Presentation Folders AU',
    metaDescription: 'Custom presentation folders with pockets, business card slits and premium finishes. Free design and wholesale printing across Australia.',
  },
  'chocolate-boxes-packaging': {
    metaTitle: 'Chocolate Boxes & Packaging Wholesale',
    metaDescription: 'Custom chocolate boxes with inserts, windows and luxury finishes. Food-grade board, free design and wholesale pricing across Australia.',
  },
  'popcorn-boxes-packaging': {
    metaTitle: 'Custom Popcorn Boxes Wholesale AU',
    metaDescription: 'Custom printed popcorn boxes for cinemas, events and retail. Food-safe board, vivid colours, free design and fast delivery across Australia.',
  },
  'custom-pizza-boxes-packaging': {
    metaTitle: 'Custom Pizza Boxes Wholesale Australia',
    metaDescription: 'Custom pizza boxes printed with your brand. Grease-resistant corrugated board, any size, free design and wholesale prices across Australia.',
  },
};
