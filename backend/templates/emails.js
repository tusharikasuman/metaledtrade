import { env } from "../config/env.js";
import { escapeHtml, oneLine } from "../utils/sanitize.js";
import { COMPANY_NAME, RESPONSE_TIME, layout, fieldsTable, fieldsText } from "./layout.js";

// ─── Email builders ───────────────────────────────────────────────────────────
// Each builder returns a ready-to-send message: who it goes to, subject, HTML
// and plain text. `replyTo` on internal emails means hitting "Reply" in your
// inbox answers the customer directly.

const companyInbox = () => env.COMPANY_EMAIL[0];

const formatQuantity = ({ quantity, unit }) => `${quantity.toLocaleString("en-US")} ${unit}`;

// ── Contact form ──────────────────────────────────────────────────────────────

const contactRows = (d) => [
  ["Name", d.name],
  ["Email", d.email],
  ["Company", d.company],
  ["Message", d.message, { multiline: true }],
];

export const contactNotification = (d) => ({
  fromName: "Metaledtrade Website",
  to: env.COMPANY_EMAIL,
  replyTo: { name: oneLine(d.name), address: d.email },
  subject: oneLine(`[Inquiry] ${d.name}${d.company ? ` — ${d.company}` : ""}`),
  html: layout({
    heading: "New Contact Inquiry",
    subheading: "Received from the website contact form",
    bodyHtml: fieldsTable(contactRows(d)),
    footer: `Reply to this email to respond to ${d.name} directly.`,
  }),
  text: `New contact inquiry\n\n${fieldsText(contactRows(d))}`,
});

// ── Quote form ────────────────────────────────────────────────────────────────

const quoteRows = (d) => [
  ["Product", d.product],
  ["Quantity", formatQuantity(d)],
  ["Grade / Spec", d.grade],
  ["Requirements", d.message, { multiline: true }],
  ["Name", d.name],
  ["Company", d.company],
  ["Email", d.email],
  ["Phone", d.phone],
];

export const quoteNotification = (d) => ({
  fromName: "Metaledtrade Website",
  to: env.QUOTE_EMAIL,
  replyTo: { name: oneLine(d.name), address: d.email },
  subject: oneLine(`[Quote] ${d.product} — ${formatQuantity(d)} — ${d.company || d.name}`),
  html: layout({
    heading: "New Quote Request",
    subheading: "Received from the website product catalogue",
    bodyHtml: fieldsTable(quoteRows(d)),
    footer: `Reply to this email to respond to ${d.name} directly.`,
  }),
  text: `New quote request\n\n${fieldsText(quoteRows(d))}`,
});

// ── Auto-reply to the visitor ─────────────────────────────────────────────────
// Deliberately does NOT repeat the visitor's message. The auto-reply goes to
// whatever address was typed in, so echoing free text would let someone use
// our server to deliver their words to a stranger's inbox.

export const autoReply = (d, kind) => {
  const isQuote = kind === "quote";
  const summary = isQuote ? `${d.product} (${formatQuantity(d)})` : "";
  const intro = isQuote
    ? `Thank you for your quote request for <strong>${escapeHtml(summary)}</strong>.`
    : "Thank you for contacting Metaledtrade.";
  const introText = isQuote ? `Thank you for your quote request for ${summary}.` : "Thank you for contacting Metaledtrade.";

  return {
    fromName: COMPANY_NAME,
    to: d.email,
    replyTo: companyInbox(),
    subject: isQuote ? "We received your quote request — Metaledtrade" : "We received your inquiry — Metaledtrade",
    html: layout({
      heading: "Thank you for reaching out.",
      subheading: `${COMPANY_NAME} — Dubai, UAE`,
      bodyHtml: `
        <p>Dear ${escapeHtml(d.name)},</p>
        <p>${intro} Our team will get back to you within <strong>${RESPONSE_TIME}</strong>.</p>
        <p>If your matter is urgent, simply reply to this email or write to
          <a href="mailto:${escapeHtml(companyInbox())}" style="color:#131313;font-weight:600;">${escapeHtml(companyInbox())}</a>.</p>
        <p style="margin-top:28px;">Warm regards,<br /><strong>${COMPANY_NAME}</strong><br />Dubai, United Arab Emirates</p>`,
      footer: `© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`,
    }),
    text: `Dear ${d.name},\n\n${introText} Our team will get back to you within ${RESPONSE_TIME}.\n\nIf your matter is urgent, reply to this email or write to ${companyInbox()}.\n\nWarm regards,\n${COMPANY_NAME}\nDubai, United Arab Emirates`,
  };
};
