import nodemailer from "nodemailer";

let cached: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter {
  if (cached) return cached;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Gmail credentials missing. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.",
    );
  }

  cached = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return cached;
}

export function getMailRecipients(): { to: string; from: string } {
  const user = process.env.GMAIL_USER;
  if (!user) {
    throw new Error(
      "Gmail user missing. Set GMAIL_USER in .env.local.",
    );
  }
  return { to: user, from: user };
}
