import nodemailer from "nodemailer";

let cached: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter {
  if (cached) return cached;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP credentials missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local.",
    );
  }

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cached;
}

export function getMailRecipients(): { to: string; from: string } {
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER;
  if (!to || !from) {
    throw new Error(
      "Mail recipients missing. Set CONTACT_TO and CONTACT_FROM (or SMTP_USER) in .env.local.",
    );
  }
  return { to, from };
}
