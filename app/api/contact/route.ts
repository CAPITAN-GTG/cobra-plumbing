import { z } from "zod";
import { BUSINESS_NAME } from "@/lib/site";
import { getMailRecipients, getTransporter } from "@/lib/mailer";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  address: z.string().max(240).optional().or(z.literal("")),
  message: z.string().min(5).max(4000),
  // Honeypot — bots fill this; real users don't.
  website: z.string().max(0).optional().or(z.literal("")),
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
  if (parsed.data.website && parsed.data.website.length > 0) {
    return Response.json({ ok: true });
  }

  const { name, email, phone, address, message } = parsed.data;

  try {
    const transporter = getTransporter();
    const { to, from } = getMailRecipients();

    await transporter.sendMail({
      from: `"${BUSINESS_NAME} site" <${from}>`,
      to,
      replyTo: email,
      subject: `New contact form — ${name}`,
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
