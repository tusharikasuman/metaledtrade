import { Router } from "express";
import { honeypot } from "../middleware/honeypot.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema } from "../validation/schemas.js";
import { contactNotification } from "../templates/emails.js";
import { deliverEnquiry } from "../services/enquiries.js";
import { env } from "../config/env.js";

export const contactRouter = Router();

// ─── POST /api/contact ────────────────────────────────────────────────────────
// By the time the handler runs, the request has passed: rate limit → size
// limit → honeypot → validation. req.data holds only clean, checked fields.
contactRouter.post("/", honeypot, validateBody(contactSchema), async (req, res) => {
  try {
    await deliverEnquiry("contact", req.data, contactNotification(req.data));
    res.json({ success: true, message: "Your inquiry has been sent. We'll be in touch shortly!" });
  } catch {
    res.status(502).json({
      success: false,
      message: `We couldn't send your message right now. Please try again or email us at ${env.COMPANY_EMAIL[0]}.`,
    });
  }
});
