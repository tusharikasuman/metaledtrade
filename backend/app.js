import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { submissionLimiter } from "./middleware/rateLimit.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.js";
import { quoteRouter } from "./routes/quote.js";

// ─── App ──────────────────────────────────────────────────────────────────────
// Kept separate from server.js (which only starts listening) so the same app
// can run on a normal server locally or as a serverless function on Vercel.

const app = express();

// Behind a hosting proxy, read the visitor's real IP from X-Forwarded-For.
app.set("trust proxy", env.TRUST_PROXY);

// Security headers: stop the API being framed, sniffed or cached oddly, and
// hide the "X-Powered-By: Express" fingerprint.
app.use(helmet());

// Only the listed site origins may call the API from a browser. Preflight
// results are cached for a day, saving a round trip on every submission.
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86_400,
  })
);

// JSON bodies only, max 10kb (a long enquiry is ~5kb). Not accepting classic
// HTML form posts also means other websites can't silently submit to us.
// Parsing runs after the rate limiter, so blocked requests cost nothing.
const jsonBody = express.json({ limit: "10kb" });

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/contact", submissionLimiter, jsonBody, contactRouter);
app.use("/api/quote", submissionLimiter, jsonBody, quoteRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
