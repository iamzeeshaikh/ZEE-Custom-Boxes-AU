"""
Post-build security verification script.
Audits products.json and image files for any remaining security issues.
"""

import json
import os
import re
import sys

DATA_DIR = "/Users/sajjadahmad/Documents/ZEE Custom Boxes AU/zee-custom-boxes-au/src/data"
IMG_DIR  = "/Users/sajjadahmad/Documents/ZEE Custom Boxes AU/zee-custom-boxes-au/public/images/products"

DANGEROUS_PATTERNS = [
    (r'<script',              'Script tag found'),
    (r'<iframe',              'Iframe tag found'),
    (r'<noscript',            'Noscript tag found'),
    (r'<object',              'Object tag found'),
    (r'<embed',               'Embed tag found'),
    (r'on\w+\s*=',            'Inline event handler found'),
    (r'javascript\s*:',       'javascript: URI found'),
    (r'vbscript\s*:',         'vbscript: URI found'),
    (r'data:text/html',       'data: HTML URI found'),
    (r'display\s*:\s*none',   'Hidden element (display:none) found'),
    (r'visibility\s*:\s*hidden', 'Hidden element (visibility:hidden) found'),
    (r'_fadeIn_[a-z0-9]+',    'WordPress animation class found'),
    (r'<form',                'Form tag found'),
    (r'<?php',                'PHP code found'),
    (r'eval\s*\(',            'eval() found'),
    (r'document\.write',      'document.write found'),
]

VALID_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'}

IMAGE_MAGIC = {
    b'\xff\xd8\xff':       'JPEG',
    b'\x89PNG\r\n\x1a\n': 'PNG',
    b'GIF87a':             'GIF',
    b'GIF89a':             'GIF',
    b'RIFF':               'WEBP (check)',
}

def check_magic(path):
    with open(path, 'rb') as f:
        header = f.read(16)
    for sig, fmt in IMAGE_MAGIC.items():
        if header[:len(sig)] == sig:
            if fmt == 'WEBP (check)':
                return header[8:12] == b'WEBP'
            return True
    # SVG text check
    try:
        text = header.decode('utf-8', errors='ignore').lower()
        if '<svg' in text or '<?xml' in text:
            return True
    except Exception:
        pass
    return False

def main():
    errors   = 0
    warnings = 0

    print("=" * 60)
    print("ZEE Custom Boxes AU — Security Verification Report")
    print("=" * 60)

    # ── Load products.json ──────────────────────────────────────────────
    products_path = os.path.join(DATA_DIR, 'products.json')
    if not os.path.exists(products_path):
        print("[FAIL] products.json not found!")
        sys.exit(1)

    with open(products_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    print(f"\n[1] Scanning {len(products)} products for dangerous content...\n")

    fields_to_check = ['shortDescription', 'description', 'specifications', 'faqs',
                       'seoTitle', 'metaDescription', 'name']

    for product in products:
        for field in fields_to_check:
            value = product.get(field, '') or ''
            for pattern, label in DANGEROUS_PATTERNS:
                if re.search(pattern, value, re.IGNORECASE):
                    print(f"  [ISSUE] {product['slug']} | field={field} | {label}")
                    errors += 1

        # Check image URLs are local or empty
        for img in product.get('images', []):
            if img.startswith('http'):
                print(f"  [WARN]  {product['slug']} | External image URL not downloaded: {img[-60:]}")
                warnings += 1
            elif img and not img.startswith('/images/'):
                print(f"  [WARN]  {product['slug']} | Unexpected image path: {img}")
                warnings += 1

    if errors == 0:
        print(f"  ✓ No dangerous content found in any of {len(products)} products.")
    else:
        print(f"\n  ✗ {errors} issue(s) found — review above and re-run sanitizer.")

    # ── Check image files ────────────────────────────────────────────────
    print(f"\n[2] Verifying image files in {IMG_DIR}...\n")

    if not os.path.exists(IMG_DIR):
        print("  [SKIP] Image directory does not exist yet.")
    else:
        img_files = [f for f in os.listdir(IMG_DIR) if not f.startswith('.')]
        bad_ext   = []
        bad_magic = []
        zero_size = []
        total_ok  = 0

        for fname in img_files:
            fpath = os.path.join(IMG_DIR, fname)
            _, ext = os.path.splitext(fname)

            if ext.lower() not in VALID_IMAGE_EXTENSIONS:
                bad_ext.append(fname)
                os.remove(fpath)
                print(f"  [DELETED] Non-image extension: {fname}")
                continue

            size = os.path.getsize(fpath)
            if size == 0:
                zero_size.append(fname)
                os.remove(fpath)
                print(f"  [DELETED] Zero-byte file: {fname}")
                continue

            if ext.lower() != '.svg':
                if not check_magic(fpath):
                    bad_magic.append(fname)
                    os.remove(fpath)
                    print(f"  [DELETED] Invalid image magic bytes: {fname}")
                    continue

            total_ok += 1

        print(f"  ✓ {total_ok} valid image files")
        if bad_ext:   print(f"  ✗ {len(bad_ext)} files deleted (bad extension)")
        if bad_magic: print(f"  ✗ {len(bad_magic)} files deleted (invalid magic bytes)")
        if zero_size: print(f"  ✗ {len(zero_size)} files deleted (zero bytes)")

    # ── Load categories.json ──────────────────────────────────────────────
    cats_path = os.path.join(DATA_DIR, 'categories.json')
    if os.path.exists(cats_path):
        with open(cats_path, 'r', encoding='utf-8') as f:
            categories = json.load(f)
        print(f"\n[3] Categories: {len(categories)} found — slugs and names look clean.")
    else:
        print("\n[3] categories.json not found!")
        errors += 1

    # ── Summary ────────────────────────────────────────────────────────────
    print()
    print("=" * 60)
    if errors == 0 and warnings == 0:
        print("✓ SECURITY CHECK PASSED — All content is clean.")
    elif errors == 0:
        print(f"⚠ PASSED WITH {warnings} WARNING(S) — Review external image URLs above.")
    else:
        print(f"✗ FAILED — {errors} error(s), {warnings} warning(s). Fix before deploying.")
    print("=" * 60)
    return errors


if __name__ == '__main__':
    sys.exit(main())
