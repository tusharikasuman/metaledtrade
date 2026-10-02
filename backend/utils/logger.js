// ─── Logger ───────────────────────────────────────────────────────────────────
// One line per event, as JSON, so logs are searchable on any hosting dashboard.

const write = (level, message, meta) => {
  const line = JSON.stringify({ time: new Date().toISOString(), level, message, ...meta });
  (level === "error" ? console.error : console.log)(line);
};

export const logger = {
  info: (message, meta) => write("info", message, meta),
  warn: (message, meta) => write("warn", message, meta),
  error: (message, meta) => write("error", message, meta),
};

// Error objects don't serialise to JSON on their own.
export const errorInfo = (err) => ({ error: err?.message, code: err?.code });
