import { sendMail } from "./mailer.js";
import { autoReply } from "../templates/emails.js";
import { logger, errorInfo } from "../utils/logger.js";

// ─── Deliver an enquiry ───────────────────────────────────────────────────────
// 1. Email the company. This is the step that matters — if it fails, the
//    visitor is told so and the lead is written to the server log so it can
//    still be recovered.
// 2. Only then send the auto-reply, so a customer is never told "we received
//    it" when we didn't. A failed auto-reply is logged but doesn't fail the
//    request — the company already has the lead.
//
// The two sends run back to back, not in parallel, on purpose: correctness
// beats ~1s of speed here, and the pooled connection keeps the second fast.

export async function deliverEnquiry(kind, data, notification) {
  try {
    await sendMail(notification);
  } catch (err) {
    logger.error(`${kind} notification failed — lead recorded here`, { lead: data, ...errorInfo(err) });
    throw err;
  }

  try {
    await sendMail(autoReply(data, kind));
  } catch (err) {
    logger.warn(`${kind} auto-reply failed`, errorInfo(err));
  }

  logger.info(`${kind} delivered`);
}
