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
      const res = await fetch("https://phenoxis-backend.onrender.com/api/contact", {

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
    <div className="min-h-screen bg-background text-app">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20" id="contact">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-app">Get In Touch</h1>
          <p className="text-xl text-muted">
            Ready to start your project? Let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            {!sent ? (
              <form className="space-y-4 bg-surface border border-border rounded-2xl p-6 shadow-sm" onSubmit={onSubmit}>
                <h2 className="text-xl font-semibold mb-4 text-app">Send us a Message</h2>
                
                {err && (
                  <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                    {err}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="input w-full bg-card border-border text-app placeholder-muted focus:border-primary focus:ring-primary"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="your.email@example.com"
                    className="input w-full bg-card border-border text-app placeholder-muted focus:border-primary focus:ring-primary"
                  />
                </div>

                <input
                  name="company"
                  placeholder="Company (optional)"
                  className="input w-full bg-card border-border text-app placeholder-muted focus:border-primary focus:ring-primary"
                />

                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your project, timeline, and requirements..."
                  className="input h-32 w-full resize-none bg-card border-border text-app placeholder-muted focus:border-primary focus:ring-primary"
                />

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted">
                    By sending, you agree to be contacted about this inquiry.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h2 className="text-xl font-semibold mb-2 text-app">Message Sent Successfully!</h2>
                  <p className="text-muted mb-4">
                    Thanks for reaching out! We've received your message and will reply within 24 hours on business days.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="text-primary hover:text-primary-hover font-medium transition-colors"
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
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📧</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-app">Email Us Directly</h3>
                  <p className="text-muted mb-3">
                    Prefer email? Reach out to us directly and we'll respond promptly.
                  </p>
                  <a 
                    href="mailto:contact.phenoxis@gmail.com" 
                    className="text-primary hover:text-primary-hover font-medium text-lg transition-colors no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    contact.phenoxis@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">⏱️</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-app">Quick Response</h3>
                  <p className="text-muted">
                    We typically respond within <strong className="text-app">24 hours</strong> on business days. 
                    For urgent inquiries, email us directly.
                  </p>
                </div>
              </div>
            </div>

            {/* What to Include */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-app">What to Include</h3>
                  <ul className="text-muted space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Project requirements and goals
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Preferred timeline and budget range
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Technology preferences (if any)
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Any existing designs or references
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🚀</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-app">Our Services</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted">
                    <span className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Web Development
                    </span>
                    <span className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      AI Solutions
                    </span>
                    <span className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      UI/UX Design
                    </span>
                    <span className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      Digital Marketing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
