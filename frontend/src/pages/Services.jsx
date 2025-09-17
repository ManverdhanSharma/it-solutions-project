import React from "react";
import { Link } from "react-router-dom";

const items = [
  { slug: "software-development", title: "Software Development", desc: "Web, mobile, APIs." },
  { slug: "ux-ui-design", title: "UX/UI Design", desc: "Product design and prototyping." },
  { slug: "digital-marketing", title: "Digital Marketing", desc: "SEO, ads, content." },
  { slug: "ai-automation", title: "AI Automation & Chatbots", desc: "Agents, RPA, chatbots." }
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-muted">End‑to‑end delivery across product, growth, and AI automation.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="card group p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="card-title text-xl group-hover:underline underline-offset-4">{s.title}</h3>
            <p className="card-text mt-2">{s.desc}</p>
            <div className="mt-4 text-sm text-[rgb(var(--link))]">Learn more →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
