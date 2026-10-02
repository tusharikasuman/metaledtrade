import { Router } from "express";
import { honeypot } from "../middleware/honeypot.js";
import { validateBody } from "../middleware/validate.js";
import { quoteSchema } from "../validation/schemas.js";
import { quoteNotification } from "../templates/emails.js";
import { deliverEnquiry } from "../services/enquiries.js";
import { env } from "../config/env.js";

export const quoteRouter = Router();

// ─── POST /api/quote ──────────────────────────────────────────────────────────
quoteRouter.post("/", honeypot, validateBody(quoteSchema), async (req, res) => {
  try {
    await deliverEnquiry("quote", req.data, quoteNotification(req.data));
    res.json({ success: true, message: "Your quote request has been sent. We'll be in touch shortly!" });
  } catch {
    res.status(502).json({
      success: false,
      message: `We couldn't send your request right now. Please try again or email us at ${env.QUOTE_EMAIL[0]}.`,
    });
  }
});
