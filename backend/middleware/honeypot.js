import { logger } from "../utils/logger.js";

// ─── Honeypot ─────────────────────────────────────────────────────────────────
// The forms contain a hidden "website" field. People never see it, so it stays
// empty — but spam bots fill in every field they find. If it has a value, we
// pretend the submission worked (so the bot doesn't learn to adapt) and quietly
// drop it.
export const honeypot = (req, res, next) => {
  if (req.body?.website) {
    logger.warn("Honeypot triggered, submission dropped", { path: req.originalUrl, ip: req.ip });
    return res.status(200).json({ success: true, message: "Thank you — we'll be in touch shortly." });
  }
  next();
};
