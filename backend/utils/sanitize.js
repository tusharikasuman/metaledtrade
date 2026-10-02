// ─── Output sanitising ────────────────────────────────────────────────────────
// User input is placed inside email HTML. Without escaping, someone could type
// `<a href="https://evil.example">Click here</a>` as their "name" and it would
// render as a real link in your inbox (or in the auto-reply sent to a stranger).
// Escaping turns those characters into harmless text.

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);

// Email headers (like Subject) must be a single line. A line break inside one
// could let an attacker inject extra headers, e.g. a hidden Bcc.
export const oneLine = (value, max = 150) =>
  String(value ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
