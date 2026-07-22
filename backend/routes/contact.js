import { Router } from "express";
import { createTransporter, buildCompanyEmail, buildAutoReplyEmail } from "../mailer.js";

export const contactRouter = Router();

// ─── POST /api/contact ────────────────────────────────────────────────────────
contactRouter.post("/", async (req, res) => {
  const { name, email, company, message } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────────
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (!message || message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0)
    return res.status(400).json({ success: false, errors });

  // ── Send emails ─────────────────────────────────────────────────────────────
  try {
    const transporter = createTransporter();

    // 1. Notify the company
    await transporter.sendMail(buildCompanyEmail({ name, email, company, message }));

    // 2. Auto-reply to the sender
    await transporter.sendMail(buildAutoReplyEmail({ name, email }));

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent. We'll be in touch shortly!",
    });
  } catch (err) {
    console.error("[Contact route error]", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again or email us directly.",
    });
  }
});
