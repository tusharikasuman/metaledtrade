import { escapeHtml } from "../utils/sanitize.js";

// ─── Shared email building blocks ─────────────────────────────────────────────
// Every value coming from a visitor passes through escapeHtml() before it
// touches HTML. Styles are inline because many email apps (Outlook, Gmail on
// mobile) ignore <style> blocks.

export const COMPANY_NAME = "Metaledtrade Trade FZCO";
export const RESPONSE_TIME = "1–2 business days";

const C = { ink: "#131313", gold: "#ffe088", muted: "#8e9192", line: "#eeeeee", bg: "#f5f5f5" };

// rows: [[label, value], ...] — empty values are skipped.
export const fieldsHtml = (rows) =>
  rows
    .filter(([, value]) => value !== "" && value != null)
    .map(
      ([label, value, { multiline } = {}]) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid ${C.line};vertical-align:top;width:34%;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};">${escapeHtml(label)}</td>
        <td style="padding:14px 0;border-bottom:1px solid ${C.line};font-size:15px;color:${C.ink};line-height:1.6;${multiline ? "white-space:pre-wrap;" : ""}">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

// Plain-text version of the same rows. Sending text alongside HTML improves
// deliverability (spam filters distrust HTML-only mail) and helps screen readers.
export const fieldsText = (rows) =>
  rows
    .filter(([, value]) => value !== "" && value != null)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

// `bodyHtml` must already be safe HTML — build it from escaped values only.
export const layout = ({ heading, subheading, bodyHtml, footer }) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="height:3px;background:${C.gold};"></td></tr>
        <tr><td style="background:${C.ink};padding:28px 36px;">
          <h1 style="margin:0;color:${C.gold};font-size:21px;letter-spacing:0.5px;">${escapeHtml(heading)}</h1>
          <p style="margin:6px 0 0;color:${C.muted};font-size:13px;">${escapeHtml(subheading)}</p>
        </td></tr>
        <tr><td style="padding:28px 36px;color:#333333;font-size:15px;line-height:1.7;">${bodyHtml}</td></tr>
        <tr><td style="background:${C.bg};padding:18px 36px;text-align:center;font-size:12px;color:#aaaaaa;">${escapeHtml(footer)}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const fieldsTable = (rows) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fieldsHtml(rows)}</table>`;
