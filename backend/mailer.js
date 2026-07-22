import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ─── Transporter ──────────────────────────────────────────────────────────────
// Uses Gmail with an App Password (see .env setup below).
// For other providers (Outlook, SMTP, etc.) just change host/port/auth.
export const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // your Gmail address
      pass: process.env.EMAIL_PASS,   // 16-char Gmail App Password
    },
  });

// ─── Email to company: new inquiry notification ───────────────────────────────
export const buildCompanyEmail = ({ name, email, company, message }) => ({
  from: `"Metaledtrade Contact Form" <${process.env.EMAIL_USER}>`,
  to: process.env.COMPANY_EMAIL,          // inbox that receives enquiries
  replyTo: email,                          // clicking Reply goes straight to the sender
  subject: `[New Inquiry] ${name}${company ? ` — ${company}` : ""}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: #131313; padding: 32px 40px; }
        .header h1 { color: #ffe088; font-size: 22px; margin: 0; letter-spacing: 1px; }
        .header p { color: #8e9192; font-size: 13px; margin: 6px 0 0; }
        .body { padding: 36px 40px; }
        .field { margin-bottom: 24px; }
        .label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #8e9192; margin-bottom: 6px; }
        .value { font-size: 16px; color: #131313; }
        .message-box { background: #f9f9f9; border-left: 3px solid #ffe088; padding: 16px 20px; border-radius: 4px; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap; }
        .footer { background: #f5f5f5; padding: 20px 40px; text-align: center; font-size: 12px; color: #aaa; }
        .divider { border: none; border-top: 1px solid #eee; margin: 8px 0 24px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>New Contact Inquiry</h1>
          <p>Received from the Metaledtrade website contact form</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">From</div>
            <div class="value">${name}</div>
          </div>
          <hr class="divider" />
          <div class="field">
            <div class="label">Reply-to Email</div>
            <div class="value"><a href="mailto:${email}" style="color:#131313;">${email}</a></div>
          </div>
          ${company ? `
          <hr class="divider" />
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${company}</div>
          </div>` : ""}
          <hr class="divider" />
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
        <div class="footer">
          This email was sent via the Metaledtrade website contact form. Reply directly to respond to ${name}.
        </div>
      </div>
    </body>
    </html>
  `,
});

// ─── Auto-reply to the sender ─────────────────────────────────────────────────
export const buildAutoReplyEmail = ({ name, email }) => ({
  from: `"Metaledtrade Trade FZCO" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "We received your inquiry — Metaledtrade Trade FZCO",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: #131313; padding: 32px 40px; }
        .header h1 { color: #ffe088; font-size: 22px; margin: 0; }
        .header p { color: #8e9192; font-size: 13px; margin: 8px 0 0; }
        .body { padding: 36px 40px; color: #333; font-size: 15px; line-height: 1.7; }
        .highlight { color: #131313; font-weight: 600; }
        .footer { background: #f5f5f5; padding: 20px 40px; text-align: center; font-size: 12px; color: #aaa; }
        .gold-bar { height: 3px; background: linear-gradient(90deg, #ffe088, #f5c518); }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="gold-bar"></div>
        <div class="header">
          <h1>Thank you for reaching out.</h1>
          <p>Metaledtrade Trade FZCO — Dubai, UAE</p>
        </div>
        <div class="body">
          <p>Dear <span class="highlight">${name}</span>,</p>
          <p>
            Thank you for contacting Metaledtrade. We have received your inquiry and a member of our team
            will get back to you within <strong>1–2 business days</strong>.
          </p>
          <p>
            In the meantime, if your matter is urgent, please feel free to reach us directly at
            <a href="mailto:${process.env.COMPANY_EMAIL}" style="color:#131313; font-weight:600;">${process.env.COMPANY_EMAIL}</a>.
          </p>
          <p>We appreciate your interest and look forward to connecting with you.</p>
          <p style="margin-top:32px;">Warm regards,<br/><strong>Metaledtrade Trade FZCO</strong><br/>Dubai, United Arab Emirates</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Metaledtrade Trade FZCO. All rights reserved. Dubai, UAE.
        </div>
      </div>
    </body>
    </html>
  `,
});
