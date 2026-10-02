import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// ─── Mail transport ───────────────────────────────────────────────────────────
// Created once and reused. `pool` keeps the authenticated SMTP connection open,
// so the second email of a submission (the auto-reply) skips the slow
// connect + TLS + login steps. Timeouts stop a stuck mail server from leaving
// visitors waiting forever.

let transporter;

const getTransporter = () =>
  (transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, // 465 = TLS from the start; 587 upgrades via STARTTLS
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    pool: true,
    maxConnections: 3,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  }));

export const sendMail = ({ fromName, ...message }) =>
  getTransporter().sendMail({ from: { name: fromName, address: env.MAIL_FROM }, ...message });

// Logs in to the mail server without sending anything — used at startup.
export const verifyMailer = () => getTransporter().verify();
