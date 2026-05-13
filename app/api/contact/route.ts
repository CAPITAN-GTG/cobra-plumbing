import { z } from "zod";
import { BUSINESS_NAME } from "@/lib/site";
import { getMailRecipients, getTransporter } from "@/lib/mailer";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).default(""),
  address: z.string().max(240).default(""),
  message: z.string().min(1).max(4000),
  // Honeypot — must stay empty. Not named "website" (browsers autofill that).
  fax: z.string().max(0).optional().or(z.literal("")),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success so bots don't retry.
  if (parsed.data.fax && parsed.data.fax.length > 0) {
    return Response.json({ ok: true });
  }

  const { name, email, phone, address, message } = parsed.data;

  try {
    const transporter = getTransporter();
    const { to, from } = getMailRecipients();

    const businessInquiry = transporter.sendMail({
      from: `"${BUSINESS_NAME} site" <${from}>`,
      to,
      replyTo: email,
      subject: `New business inquiry — ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone || "—"}`,
        `Address: ${address || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <table style="font-family:system-ui;font-size:14px">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "—")}</td></tr>
          <tr><td><strong>Address</strong></td><td>${escapeHtml(address || "—")}</td></tr>
        </table>
        <p style="white-space:pre-wrap;font-family:system-ui;font-size:14px">${escapeHtml(message)}</p>
      `,
    });

    const customerThanks = transporter.sendMail({
      from: `"${BUSINESS_NAME}" <${from}>`,
      to: email,
      replyTo: to,
      subject: `Thanks — we got your message`,
      text: [
        `Hi ${name},`,
        "",
        `Thanks for contacting ${BUSINESS_NAME}. We received your message and will get back to you as soon as possible.`,
        "",
        "For urgent issues, please call us.",
        "",
        `— ${BUSINESS_NAME}`,
      ].join("\n"),
      html: `
        <p style="font-family:system-ui;font-size:14px">Hi ${escapeHtml(name)},</p>
        <p style="font-family:system-ui;font-size:14px">
          Thanks for contacting ${escapeHtml(BUSINESS_NAME)}. We received your message and will get back to you as soon as possible.
        </p>
        <p style="font-family:system-ui;font-size:14px">For urgent issues, please call us.</p>
        <p style="font-family:system-ui;font-size:14px">— ${escapeHtml(
          BUSINESS_NAME,
        )}</p>
      `,
    });

    await Promise.all([businessInquiry, customerThanks]);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
