import app from "./app.js";
import { env } from "./config/env.js";
import { verifyMailer } from "./services/mailer.js";
import { logger, errorInfo } from "./utils/logger.js";

// ─── Start (local / traditional server) ────────────────────────────────────────
app.listen(env.PORT, () => {
  logger.info(`Metaledtrade API running on http://localhost:${env.PORT}`);

  // Check the mail login at startup, so a wrong password shows up now
  // rather than on a customer's first enquiry. Nothing is sent.
  verifyMailer()
    .then(() => logger.info("Mail server connection OK"))
    .catch((err) => logger.error("Mail server connection FAILED — check SMTP_* in .env", errorInfo(err)));
});
