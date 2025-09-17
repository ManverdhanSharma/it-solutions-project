import React from "react";

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header>
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-2 text-muted">
          We build scalable products and automations.
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <h3 className="card-title text-lg">Mission</h3>
          <p className="card-text mt-1">
            Ship reliable software fast with thoughtful UX and measurable growth.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="card-title text-lg">Approach</h3>
          <p className="card-text mt-1">
            Lean discovery, rapid prototyping, automation-first delivery.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="card-title text-lg">Stack</h3>
          <p className="card-text mt-1">
            React/Node/Python, cloud-native, RAG/agents for AI workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
