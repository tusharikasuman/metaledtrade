// ─── API client ───────────────────────────────────────────────────────────────
// VITE_API_URL points at the backend. In development it defaults to the local
// Express server; in production it defaults to the same domain as the site
// (e.g. /api/quote), which is how it runs when deployed together on Vercel.
const API_URL = (
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "")
).replace(/\/$/, "");

const TIMEOUT_MS = 20_000;

// Posts a form and always resolves to { ok, message, errors } — never throws —
// so components only need to handle one shape.
export async function submitForm(path, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));

    return {
      ok: res.ok && data.success === true,
      message: data.message || "Something went wrong. Please try again.",
      errors: data.errors ?? {},
    };
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Please check your connection and try again.",
      errors: {},
    };
  } finally {
    clearTimeout(timer);
  }
}
