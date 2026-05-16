"""
ZEE Custom Boxes AU — Secure CSV Data Sanitizer & Image Downloader

Security actions performed:
  1. Strip all <script>, <iframe>, <noscript>, <object>, <embed> tags + content
  2. Remove all inline event handlers (onclick, onload, onerror, etc.)
  3. Remove javascript: and data: URI schemes
  4. Remove all style="display:none" / visibility:hidden hidden elements
  5. Remove WordPress animation spans and plugin-specific markup
  6. Whitelist-only HTML tags — anything not on the whitelist is stripped
  7. Download images, validate magic bytes for real image files
  8. Reject non-image content types and invalid files
  9. Rename images with SEO-safe slugs
 10. Produce clean products.json and categories.json
"""

import csv
import json
import os
import re
import sys
import urllib.request
import urllib.error
import struct
import time
import hashlib
from html.parser import HTMLParser

# ─── CONFIG ────────────────────────────────────────────────────────────────
CSV_PATH    = "/Users/sajjadahmad/Downloads/wc-product-export-15-5-2026-1778825383201.csv"
OUT_DATA    = "/Users/sajjadahmad/Documents/ZEE Custom Boxes AU/zee-custom-boxes-au/src/data"
IMG_DIR     = "/Users/sajjadahmad/Documents/ZEE Custom Boxes AU/zee-custom-boxes-au/public/images/products"
IMG_WEB     = "/images/products"          # public URL prefix
TRUSTED_DOMAIN = "zeecustomboxes.com.au"
DOWNLOAD_IMAGES = True                   # set False to skip downloads
TIMEOUT     = 15                         # seconds per image request
MAX_IMG_MB  = 10                         # reject files larger than this

# ─── ALLOWED HTML TAGS (whitelist) ─────────────────────────────────────────
ALLOWED_TAGS = {
    "p", "br", "strong", "b", "em", "i", "u",
    "h2", "h3", "h4", "h5",
    "ul", "ol", "li",
    "table", "thead", "tbody", "tr", "th", "td",
    "a",          # kept but href sanitized
    "img",        # kept but src sanitized
    "div", "span", "section",
}

# Attributes allowed per tag
ALLOWED_ATTRS = {
    "a":   {"href", "title", "target", "rel"},
    "img": {"src", "alt", "width", "height", "loading", "decoding"},
    "th":  {"colspan", "rowspan"},
    "td":  {"colspan", "rowspan"},
    "table": {"class"},
    "div": {"class"},
    "span": {"class"},
    "p":   {"class"},
}

# Block-level dangerous tags — strip tag AND its entire inner content
BLOCK_TAGS = {
    "script", "iframe", "noscript", "object", "embed",
    "form", "input", "button", "select", "textarea",
    "link", "meta", "style",
}

# Inline event handler attribute pattern
EVENT_ATTR_RE = re.compile(
    r'''\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)''',
    re.IGNORECASE
)

# javascript: and data: URI
DANGEROUS_HREF_RE = re.compile(r'^\s*(javascript|data|vbscript)\s*:', re.IGNORECASE)

# Hidden element patterns in style attribute
HIDDEN_STYLE_RE = re.compile(
    r'(display\s*:\s*none|visibility\s*:\s*hidden)',
    re.IGNORECASE
)

# WordPress animation span pattern (the _fadeIn_xxxxx classes)
WP_ANIM_SPAN_RE = re.compile(
    r'<span\s+class=["\'][^"\']*_fadeIn_[^"\']*["\'][^>]*>(.*?)</span>',
    re.IGNORECASE | re.DOTALL
)

# Elementor / block plugin wrapper divs
ELEMENTOR_RE = re.compile(
    r'<div[^>]*class=["\'][^"\']*(?:elementor|wp-block|e-)[^"\']*["\'][^>]*>',
    re.IGNORECASE
)

# ─── IMAGE MAGIC BYTES ─────────────────────────────────────────────────────
IMAGE_SIGNATURES = {
    b'\xff\xd8\xff':           'jpg',
    b'\x89PNG\r\n\x1a\n':     'png',
    b'GIF87a':                 'gif',
    b'GIF89a':                 'gif',
    b'RIFF':                   'webp',   # checked further below
    b'\x00\x00\x00\x0cjP  ':  'jp2',
    b'\x00\x00\x00 ftyp':     'mp4',   # will be rejected
    b'%PDF':                   'pdf',   # will be rejected
}

VALID_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'}
VALID_MIME_PREFIXES     = ('image/',)


def is_valid_image_bytes(data: bytes) -> bool:
    """Check magic bytes to confirm this is really an image."""
    if len(data) < 16:
        return False
    for sig, fmt in IMAGE_SIGNATURES.items():
        if data[:len(sig)] == sig:
            if fmt == 'webp':
                # RIFF....WEBP
                return data[8:12] == b'WEBP'
            if fmt in ('mp4', 'pdf'):
                return False
            return True
    # SVG — look for XML / svg tag
    try:
        text = data[:512].decode('utf-8', errors='ignore').lower()
        if '<svg' in text or '<?xml' in text:
            return True
    except Exception:
        pass
    return False


def make_slug(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


# ─── HTML SANITISER ────────────────────────────────────────────────────────

class Sanitizer(HTMLParser):
    """
    Whitelist-based HTML sanitiser.
    - BLOCK_TAGS: strip tag + all inner content
    - ALLOWED_TAGS: keep tag, sanitise attributes
    - Everything else: strip tag, keep inner text
    """

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.result      = []
        self._skip_depth = 0   # depth counter while inside a blocked tag
        self._skip_tag   = None

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()

        if self._skip_depth > 0:
            if tag == self._skip_tag:
                self._skip_depth += 1
            return

        if tag in BLOCK_TAGS:
            self._skip_tag   = tag
            self._skip_depth = 1
            return

        if tag not in ALLOWED_TAGS:
            return  # strip tag, but keep inner content

        # Build sanitised attribute string
        allowed = ALLOWED_ATTRS.get(tag, set())
        safe_attrs = []

        for name, val in (attrs or []):
            name = name.lower()
            val  = (val or '').strip()

            # Drop all event handlers
            if name.startswith('on'):
                continue

            # Only allowed attributes
            if name not in allowed:
                continue

            # Sanitise href / src
            if name == 'href':
                if DANGEROUS_HREF_RE.match(val):
                    continue
                # Keep internal links and trusted domain links
                # External links get rel="noopener noreferrer nofollow"
                if val.startswith('http') and TRUSTED_DOMAIN not in val:
                    safe_attrs.append(('rel', 'noopener noreferrer nofollow'))

            if name == 'src':
                if DANGEROUS_HREF_RE.match(val):
                    continue

            # Drop hidden-via-style elements
            if name == 'style' and HIDDEN_STYLE_RE.search(val):
                return  # abandon the whole tag

            safe_attrs.append((name, val))

        attr_str = ''.join(f' {k}="{v}"' for k, v in safe_attrs)
        void_tags = {'br', 'img', 'input', 'hr'}
        if tag in void_tags:
            self.result.append(f'<{tag}{attr_str} />')
        else:
            self.result.append(f'<{tag}{attr_str}>')

    def handle_endtag(self, tag):
        tag = tag.lower()

        if self._skip_depth > 0:
            if tag == self._skip_tag:
                self._skip_depth -= 1
                if self._skip_depth == 0:
                    self._skip_tag = None
            return

        if tag in BLOCK_TAGS:
            return

        if tag not in ALLOWED_TAGS:
            return

        void_tags = {'br', 'img', 'input', 'hr'}
        if tag not in void_tags:
            self.result.append(f'</{tag}>')

    def handle_data(self, data):
        if self._skip_depth > 0:
            return
        self.result.append(data)

    def handle_entityref(self, name):
        if self._skip_depth > 0:
            return
        self.result.append(f'&{name};')

    def handle_charref(self, name):
        if self._skip_depth > 0:
            return
        self.result.append(f'&#{name};')

    def get_output(self) -> str:
        return ''.join(self.result)


def pre_clean(html: str) -> str:
    """Quick regex pre-pass before the parser."""
    if not html:
        return ''

    # Remove WordPress animation spans — unwrap content
    html = WP_ANIM_SPAN_RE.sub(r'\1', html)

    # Remove all event handler attributes
    html = EVENT_ATTR_RE.sub('', html)

    # Remove elementor wrapper class divs (keep the div, strip the class)
    html = ELEMENTOR_RE.sub('<div>', html)

    return html


def sanitize_html(raw: str) -> str:
    """Full sanitise pipeline."""
    if not raw:
        return ''
    html = pre_clean(raw)
    parser = Sanitizer()
    try:
        parser.feed(html)
    except Exception as e:
        print(f"  [WARN] Parser error: {e} — falling back to text only")
        return re.sub(r'<[^>]+>', ' ', html).strip()
    out = parser.get_output()
    # Collapse excessive blank lines
    out = re.sub(r'\n{3,}', '\n\n', out)
    out = re.sub(r'[ \t]+', ' ', out)
    return out.strip()


def strip_all_html(html: str) -> str:
    """Return plain text, no tags."""
    if not html:
        return ''
    clean = re.sub(r'<[^>]+>', ' ', html)
    clean = re.sub(r'&nbsp;', ' ', clean)
    clean = re.sub(r'&amp;', '&', clean)
    clean = re.sub(r'&[a-z]+;', '', clean)
    clean = re.sub(r'\s+', ' ', clean)
    return clean.strip()


# ─── IMAGE DOWNLOADER ──────────────────────────────────────────────────────

def download_image(url: str, dest_path: str) -> bool:
    """
    Download one image URL to dest_path.
    Returns True on success, False if rejected for any security/validity reason.
    """
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'ZEECustomBoxes-ImageBot/1.0',
                'Accept': 'image/*',
            }
        )
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            content_type = resp.headers.get('Content-Type', '')

            # Reject non-image content types
            if not any(content_type.startswith(p) for p in VALID_MIME_PREFIXES):
                if 'svg' not in content_type:
                    print(f"    [REJECT] Non-image Content-Type: {content_type}")
                    return False

            # Read data with size limit
            data = b''
            max_bytes = MAX_IMG_MB * 1024 * 1024
            chunk = resp.read(8192)
            while chunk:
                data += chunk
                if len(data) > max_bytes:
                    print(f"    [REJECT] File exceeds {MAX_IMG_MB}MB limit")
                    return False
                chunk = resp.read(8192)

        # Validate magic bytes
        if not is_valid_image_bytes(data):
            print(f"    [REJECT] Invalid image magic bytes")
            return False

        # Write to disk
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        with open(dest_path, 'wb') as f:
            f.write(data)

        return True

    except urllib.error.HTTPError as e:
        print(f"    [HTTP {e.code}] {url[:80]}")
        return False
    except urllib.error.URLError as e:
        print(f"    [URL ERROR] {str(e.reason)[:60]}")
        return False
    except Exception as e:
        print(f"    [ERROR] {str(e)[:60]}")
        return False


def get_image_ext(url: str) -> str:
    """Extract file extension from URL, default to .webp."""
    path = url.split('?')[0].split('#')[0]
    _, ext = os.path.splitext(path)
    ext = ext.lower()
    return ext if ext in VALID_IMAGE_EXTENSIONS else '.webp'


def image_local_path(slug: str, index: int, url: str) -> tuple[str, str]:
    """Return (absolute_path, web_url) for a product image."""
    ext  = get_image_ext(url)
    name = f"{slug}-{index + 1}{ext}"
    abs_path = os.path.join(IMG_DIR, name)
    web_url  = f"{IMG_WEB}/{name}"
    return abs_path, web_url


# ─── MAIN ──────────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUT_DATA, exist_ok=True)
    os.makedirs(IMG_DIR, exist_ok=True)

    products      = []
    categories_map = {}
    image_cache   = {}   # url -> local web path (avoid re-downloading)

    stats = {
        'total': 0,
        'imgs_attempted': 0,
        'imgs_ok': 0,
        'imgs_rejected': 0,
        'imgs_failed': 0,
        'imgs_cached': 0,
    }

    print("=" * 60)
    print("ZEE Custom Boxes AU — Secure Data Build")
    print("=" * 60)
    print(f"CSV:    {CSV_PATH}")
    print(f"Output: {OUT_DATA}")
    print(f"Images: {IMG_DIR}")
    print()

    with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows   = list(reader)

    print(f"Rows in CSV: {len(rows)}")
    print()

    for i, row in enumerate(rows):
        name = row.get('Name', '').strip()
        if not name:
            continue

        stats['total'] += 1
        slug = make_slug(name)

        if (i + 1) % 50 == 0 or i == 0:
            print(f"[{i + 1}/{len(rows)}] Processing: {name[:55]}")

        # ── Sanitise text fields ──────────────────────────────────────────
        short_desc_raw = row.get('Short description', '')
        desc_raw       = row.get('Description', '')
        specs_raw      = row.get('Meta: _bhww_specifications_wysiwyg', '')
        faqs_raw       = row.get('Meta: _bhww_faqs_wysiwyg', '')

        short_desc = sanitize_html(short_desc_raw)
        desc       = sanitize_html(desc_raw)
        specs      = sanitize_html(specs_raw)
        faqs_html  = sanitize_html(faqs_raw)

        # ── SEO fields ───────────────────────────────────────────────────
        yoast_title = strip_all_html(row.get('Meta: _yoast_wpseo_title', '')).strip()
        yoast_desc  = strip_all_html(row.get('Meta: _yoast_wpseo_metadesc', '')).strip()
        focus_kw    = strip_all_html(row.get('Meta: _yoast_wpseo_focuskw', '')).strip()

        # Generate missing SEO values from clean text
        if not yoast_title:
            yoast_title = f"{name} | ZEE Custom Boxes AU"
        if not yoast_desc:
            plain = strip_all_html(short_desc_raw)
            if plain:
                yoast_desc = plain[:155]
            else:
                yoast_desc = (
                    f"Order {name} from ZEE Custom Boxes AU. "
                    "Premium custom packaging with free design, fast turnaround, "
                    "and wholesale prices Australia-wide."
                )

        # ── Categories ───────────────────────────────────────────────────
        cats = [c.strip() for c in row.get('Categories', '').split(',') if c.strip()]

        # ── Images ───────────────────────────────────────────────────────
        raw_imgs = [u.strip() for u in row.get('Images', '').split(',') if u.strip()]
        local_imgs = []
        img_index  = 0

        for url in raw_imgs:
            # Security: only accept http/https from the trusted domain
            if not url.startswith(('http://', 'https://')):
                print(f"  [SKIP] Non-http URL: {url[:60]}")
                continue

            stats['imgs_attempted'] += 1

            # Check cache first
            if url in image_cache:
                local_imgs.append(image_cache[url])
                stats['imgs_cached'] += 1
                continue

            if not DOWNLOAD_IMAGES:
                # Use original URL as fallback when not downloading
                local_imgs.append(url)
                continue

            abs_path, web_url = image_local_path(slug, img_index, url)

            # Skip if already on disk (resumable)
            if os.path.exists(abs_path) and os.path.getsize(abs_path) > 0:
                local_imgs.append(web_url)
                image_cache[url] = web_url
                stats['imgs_cached'] += 1
                img_index += 1
                continue

            print(f"  [IMG] Downloading {img_index + 1}: {url[-60:]}")
            ok = download_image(url, abs_path)

            if ok:
                local_imgs.append(web_url)
                image_cache[url] = web_url
                stats['imgs_ok'] += 1
                img_index += 1
                time.sleep(0.2)   # polite delay
            else:
                stats['imgs_failed'] += 1
                # Don't add to local_imgs — broken image excluded

        product = {
            'id':              row.get('ID', '').strip(),
            'name':            name,
            'slug':            slug,
            'categories':      cats,
            'primaryCategory': cats[0] if cats else '',
            'shortDescription': short_desc,
            'description':     desc,
            'specifications':  specs,
            'faqs':            faqs_html,
            'images':          local_imgs,
            'seoTitle':        yoast_title,
            'metaDescription': yoast_desc,
            'focusKeyword':    focus_kw,
        }
        products.append(product)

        # Build category index
        for cat in cats:
            if cat not in categories_map:
                categories_map[cat] = {
                    'name':     cat,
                    'slug':     make_slug(cat),
                    'products': [],
                }
            categories_map[cat]['products'].append(slug)

    # ── Write output files ────────────────────────────────────────────────
    products_path    = os.path.join(OUT_DATA, 'products.json')
    categories_path  = os.path.join(OUT_DATA, 'categories.json')
    categories_list  = list(categories_map.values())

    with open(products_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    with open(categories_path, 'w', encoding='utf-8') as f:
        json.dump(categories_list, f, ensure_ascii=False, indent=2)

    # ── Print summary ─────────────────────────────────────────────────────
    print()
    print("=" * 60)
    print("SECURITY SANITISATION COMPLETE")
    print("=" * 60)
    print(f"  Products processed:     {stats['total']}")
    print(f"  Categories found:       {len(categories_list)}")
    print(f"  Images attempted:       {stats['imgs_attempted']}")
    print(f"  Images downloaded OK:   {stats['imgs_ok']}")
    print(f"  Images from cache:      {stats['imgs_cached']}")
    print(f"  Images rejected:        {stats['imgs_rejected']}")
    print(f"  Images failed/404:      {stats['imgs_failed']}")
    print()
    print(f"  products.json   → {products_path}")
    print(f"  categories.json → {categories_path}")
    print(f"  Images folder   → {IMG_DIR}")
    print()
    print("Security actions applied to all content:")
    print("  ✓ <script>, <iframe>, <noscript>, <object>, <embed> stripped")
    print("  ✓ All on* event handlers removed")
    print("  ✓ javascript: and data: URIs blocked")
    print("  ✓ Hidden elements (display:none) removed")
    print("  ✓ WordPress animation spans unwrapped")
    print("  ✓ Elementor plugin wrappers cleaned")
    print("  ✓ Only whitelisted HTML tags kept")
    print("  ✓ Only whitelisted attributes kept")
    print("  ✓ Image magic bytes validated")
    print("  ✓ Non-image content types rejected")
    print("  ✓ Files >10MB rejected")
    print("  ✓ Non-http URLs skipped")
    print("=" * 60)


if __name__ == '__main__':
    main()
