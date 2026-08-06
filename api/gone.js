export default function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(410).send(
    '<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="robots" content="noindex"><title>410 Gone | ZEE Custom Boxes AU</title></head><body><h1>410 &mdash; This page is gone</h1><p>This page has been permanently removed. Visit <a href="https://zeecustomboxes.com.au/">zeecustomboxes.com.au</a> for custom packaging in Australia.</p></body></html>'
  );
}
