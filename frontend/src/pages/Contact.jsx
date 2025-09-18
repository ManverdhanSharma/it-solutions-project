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
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12" id="contact">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Ready to start your project? Let's discuss how we can help bring your vision to life.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          {!sent ? (
            <form className="space-y-4 card p-6" onSubmit={onSubmit}>
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              
              {err && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded">{err}</p>}

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className="input w-full"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="your.email@example.com"
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
                placeholder="Tell us about your project, timeline, and requirements..."
                className="input h-32 w-full resize-none"
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By sending, you agree to be contacted about this inquiry.
                </p>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          ) : (
            <div className="card p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-xl font-semibold mb-2">Message Sent Successfully!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Thanks for reaching out! We've received your message and will reply within 24 hours on business days.
                </p>
                <button 
                  onClick={() => setSent(false)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Direct Email */}
          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">📧</div>
              <div>
                <h3 className="font-semibold mb-2">Email Us Directly</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Prefer email? Reach out to us directly and we'll respond promptly.
                </p>
                <a 
                  href="mailto:contact.phenoxis@gmail.com" 
                  className="text-blue-500 hover:text-blue-600 font-medium text-lg transition-colors"
                >
                  contact.phenoxis@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">⏱️</div>
              <div>
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We typically respond within <strong>24 hours</strong> on business days. For urgent inquiries, email us directly.
                </p>
              </div>
            </div>
          </div>

          {/* What to Include */}
          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-semibold mb-2">What to Include</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Project requirements and goals</li>
                  <li>• Preferred timeline and budget range</li>
                  <li>• Technology preferences (if any)</li>
                  <li>• Any existing designs or references</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="card p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="font-semibold mb-2">Our Services</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>• Web Development</span>
                  <span>• AI Solutions</span>
                  <span>• UI/UX Design</span>
                  <span>• Digital Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
