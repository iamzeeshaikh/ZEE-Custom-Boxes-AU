import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatFieldName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

function buildEmailHtml(formName, fields) {
  const rows = Object.entries(fields)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => `
      <tr>
        <td style="padding:10px 14px;font-weight:600;color:#1a3a5c;background:#f8f9fa;border:1px solid #e5e7eb;width:35%;vertical-align:top;">${formatFieldName(key)}</td>
        <td style="padding:10px 14px;color:#374151;border:1px solid #e5e7eb;vertical-align:top;">${value || '—'}</td>
      </tr>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f3f4f6;">
      <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#0d2035,#1a3a5c);padding:32px 36px;">
          <div style="font-size:22px;font-weight:700;color:#c9a84c;letter-spacing:0.02em;">ZEE Custom Boxes AU</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.65);margin-top:4px;">New Form Submission</div>
        </div>
        <div style="padding:28px 36px;">
          <h2 style="margin:0 0 6px;font-size:18px;color:#1a3a5c;">${formName}</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#6b7280;">Submitted on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney', dateStyle: 'long', timeStyle: 'short' })} AEST</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        </div>
        <div style="background:#f8f9fa;border-top:1px solid #e5e7eb;padding:18px 36px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">This email was sent automatically from zeecustomboxes.com.au</p>
        </div>
      </div>
    </body>
    </html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const formName = data._formName || 'Website Enquiry';
  const replyTo = data.email || data.Email || process.env.SMTP_FROM_EMAIL;

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO,
      replyTo,
      subject: `New ${formName} — ZEE Custom Boxes AU`,
      html: buildEmailHtml(formName, data),
    });

    // Send auto-reply to customer if they provided an email
    if (replyTo && replyTo !== process.env.SMTP_FROM_EMAIL) {
      const customerName = data.firstName || data.name || 'there';
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: replyTo,
        subject: `We received your enquiry — ZEE Custom Boxes AU`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f3f4f6;">
            <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#0d2035,#1a3a5c);padding:32px 36px;">
                <div style="font-size:22px;font-weight:700;color:#c9a84c;">ZEE Custom Boxes AU</div>
                <div style="font-size:14px;color:rgba(255,255,255,0.65);margin-top:4px;">Premium Custom Packaging Australia</div>
              </div>
              <div style="padding:32px 36px;">
                <h2 style="margin:0 0 16px;color:#1a3a5c;font-size:20px;">Thanks, ${customerName}!</h2>
                <p style="color:#374151;line-height:1.7;margin:0 0 16px;">We've received your enquiry and our team will get back to you within <strong>24 business hours</strong>.</p>
                <p style="color:#374151;line-height:1.7;margin:0 0 24px;">In the meantime, feel free to browse our full range of custom packaging at <a href="https://zeecustomboxes.com.au" style="color:#1a3a5c;font-weight:600;">zeecustomboxes.com.au</a>.</p>
                <div style="background:#f8f9fa;border-radius:8px;padding:20px 24px;border-left:4px solid #c9a84c;">
                  <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1a3a5c;text-transform:uppercase;letter-spacing:0.08em;">Contact Us Directly</p>
                  <p style="margin:0 0 4px;font-size:14px;color:#374151;">📞 <a href="tel:+61290995643" style="color:#1a3a5c;">+61 2 9099 5643</a></p>
                  <p style="margin:0;font-size:14px;color:#374151;">✉️ <a href="mailto:info@zeecustomboxes.com.au" style="color:#1a3a5c;">info@zeecustomboxes.com.au</a></p>
                </div>
              </div>
              <div style="background:#f8f9fa;border-top:1px solid #e5e7eb;padding:18px 36px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">903/50 Clarence St, Sydney NSW 2000, Australia</p>
              </div>
            </div>
          </body>
          </html>`,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
