"use client";

import { useState } from "react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";

type Labels = {
  heading: string;
  lead: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  errorGeneric: string;
  errorRequired: string;
  errorEmail: string;
  honeypot: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg(labels.errorRequired);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      setStatus("error");
      setErrorMsg(labels.errorEmail);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(labels.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/15 bg-surface-card p-8 text-center">
        <p className="text-lg font-bold text-accent-deep">{labels.success}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-accent/20 bg-surface-card px-4 py-3 text-ink outline-none transition focus:border-accent-warm focus:ring-2 focus:ring-warm-tint";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-8"
      noValidate
    >
      <div>
        <h2 className="text-xl font-bold text-ink-deep">{labels.heading}</h2>
        <p className="mt-1 text-sm text-ink-muted">{labels.lead}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-ink">{labels.name} *</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-ink">{labels.email} *</span>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-ink">{labels.phone}</span>
          <input
            type="tel"
            name="phone"
            className={inputClass}
            autoComplete="tel"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-ink">{labels.address}</span>
          <input name="address" className={inputClass} autoComplete="street-address" />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-semibold text-ink">{labels.message} *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
        />
      </label>

      {/* Honeypot — visually hidden, screen-reader hidden, bot-visible */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label>
          {labels.honeypot}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {status === "error" && errorMsg ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-warm self-start disabled:opacity-60"
      >
        <PiPaperPlaneTiltFill aria-hidden size={18} />
        <span>{status === "sending" ? labels.sending : labels.submit}</span>
      </button>
    </form>
  );
}
