import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

// ─── Environment config ───────────────────────────────────────────────────────
// Every setting the server needs is declared and checked here, once, at startup.
// If something is missing or malformed the server refuses to start and says
// exactly which variable is wrong — instead of failing later on a live request.

const list = (s) => s.split(",").map((x) => x.trim()).filter(Boolean);
const emailList = z.string().transform(list).pipe(z.array(z.email()).min(1));

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),

  // Comma-separated list of site origins allowed to call the API (CORS).
  FRONTEND_URL: z.string().default("http://localhost:5173").transform(list),

  // Number of proxies in front of the app (0 locally, 1 on Vercel/Render).
  // Needed so rate limiting sees the visitor's real IP, not the proxy's.
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),

  // Outgoing mail (SMTP). Gmail today, Resend later — only these values change.
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  MAIL_FROM: z.email(),

  // Inboxes that receive enquiries (comma-separated for several).
  COMPANY_EMAIL: emailList,
  QUOTE_EMAIL: emailList.optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  // Only variable names are printed — never their values.
  throw new Error(`Invalid environment configuration:\n${problems}\nSee backend/.env.example.`);
}

export const env = {
  ...parsed.data,
  QUOTE_EMAIL: parsed.data.QUOTE_EMAIL ?? parsed.data.COMPANY_EMAIL,
};
