import React, { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company") || "",
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12" id="contact">
      <h1 className="text-3xl font-bold">Contact</h1>

      {!sent ? (
        <form className="mt-6 space-y-4 card p-6" onSubmit={onSubmit}>
          {err && <p className="text-sm text-red-600">{err}</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Name"
              className="input w-full"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="input w-full"
            />
          </div>

          <input
            name="company"
            placeholder="Company (optional)"
            className="input w-full"
          />

          <textarea
            name="message"
            required
            placeholder="Project details"
            className="input h-32 w-full"
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted">
              By sending, you agree to be contacted about this inquiry.
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 card p-6">
          <p className="font-medium">Thanks! Your message has been sent.</p>
          <p className="text-sm text-muted">
            We’ll reply within 1 business day.
          </p>
        </div>
      )}
    </section>
  );
}
