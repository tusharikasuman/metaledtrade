import { z } from "zod";

// ─── Validation rules ─────────────────────────────────────────────────────────
// The browser checks the form too, but that is only for convenience — anyone
// can skip the website and send requests straight to the API. These rules are
// the real gatekeeper: every field has a type, a maximum length and, where it
// makes sense, an allowed format. Fields not listed here are dropped.

// `required` is the message shown when the field is missing or not text.
const text = (required = "Invalid value.") => z.string({ error: required }).trim();

// Single-line text: trimmed, length-capped, no line breaks or control characters.
const line = (max, required) =>
  text(required)
    .max(max, `Must be ${max} characters or fewer.`)
    .regex(/^[^\x00-\x1f\x7f]*$/, "Contains invalid characters.");

// Multi-line text (messages): line breaks allowed, other control characters not.
const paragraph = (max, required) =>
  text(required)
    .max(max, `Must be ${max} characters or fewer.`)
    .regex(/^[^\x00-\x08\x0b\x0c\x0e-\x1f\x7f]*$/, "Contains invalid characters.");

const NAME_MSG = "Please enter your full name.";
const EMAIL_MSG = "Please enter a valid email address.";
const name = line(100, NAME_MSG).min(2, NAME_MSG);
const email = text(EMAIL_MSG).pipe(z.email(EMAIL_MSG).max(254));
const company = line(150).default("");

export const UNITS = ["MT", "KG", "Pieces", "Coils"];

export const contactSchema = z.object({
  name,
  email,
  company,
  message: paragraph(5000, "Please enter a message.").min(10, "Message must be at least 10 characters."),
});

export const quoteSchema = z.object({
  name,
  email,
  company,
  phone: line(30)
    .regex(/^[+\d\s().-]*$/, "Please enter a valid phone number.")
    .default(""),
  product: line(150, "Please choose a product.").min(1, "Please choose a product."),
  quantity: z.coerce
    .number({ error: "Please enter a valid quantity." })
    .positive("Quantity must be greater than 0.")
    .max(1_000_000, "For quantities this large, please contact us directly."),
  unit: z.enum(UNITS, { error: "Please choose a unit." }),
  grade: line(200).default(""),
  message: paragraph(5000).default(""),
});

// Turns Zod's detailed error list into { field: "first message" } for the form.
export const fieldErrors = (zodError) => {
  const errors = {};
  for (const issue of zodError.issues) {
    const field = issue.path[0] ?? "form";
    errors[field] ??= issue.message;
  }
  return errors;
};
