import { rateLimit } from "express-rate-limit";

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Limits how often one visitor (IP address) can submit forms. Both forms share
// the same counters, so a bot can't double its allowance by switching forms.
// Every request counts, including invalid ones, so probing isn't free either.
//
// Note: counts are kept in this server's memory. That's exact on a single
// server; on serverless hosting (several short-lived instances) it's looser.
// If spam ever gets through, plug in a shared store (e.g. Upstash Redis) here.

const tooMany = {
  success: false,
  message: "Too many submissions. Please try again later or email us directly.",
};

// Short burst: 5 per 15 minutes — plenty for a real person fixing a typo.
const burstLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: tooMany,
});

// Daily cap: 20 per 24 hours — catches slow bots that stay under the burst limit.
const dailyLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 20,
  standardHeaders: false,
  legacyHeaders: false,
  message: tooMany,
});

export const submissionLimiter = [dailyLimit, burstLimit];
