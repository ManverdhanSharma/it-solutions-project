import React from "react";
import { Link } from "react-router-dom";

/* Reusable section with optional visible title */
const Section = ({ id, title, children, showTitle = true }) => (
  <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    {showTitle ? (
      <h2 className="text-2xl font-semibold">{title}</h2>
    ) : (
      <h2 className="sr-only">{title}</h2>
    )}
    <div className="mt-4">{children}</div>
  </section>
);

export default function Home() {
  const svc = [
    { slug: "software-development", title: "Software Development" },
    { slug: "ux-ui-design", title: "UX/UI Design" },
    { slug: "digital-marketing", title: "Digital Marketing" },
    { slug: "ai-automation", title: "AI Automation & Chatbots" }
  ];

  const faqs = [
    { q: "How fast can a project start?", a: "Discovery within 48 hours; build starts in 5–7 days." },
    { q: "Which tech stack?", a: "React/Node/Python, cloud-native, RAG/agents for AI workflows." },
    { q: "Do you offer maintenance?", a: "Yes—SLA options with 24–48h turnaround." },
    { q: "Pricing model?", a: "Fixed scope for small projects; retainers for ongoing work." }
  ];

  // ✅ Only 3 featured projects
  const featuredProjects = [
    { title: "Project 1", description: "Short description for project 1.", image: "/gallery/p1.jpg" },
    { title: "Project 2", description: "Short description for project 2.", image: "/gallery/p2.jpg" },
    { title: "Project 3", description: "Short description for project 3.", image: "/gallery/p3.jpg" }
  ];

  return (
    <>
      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Modern IT Solutions
            </h1>
            <p className="mt-3 text-muted">
              Software development, UX/UI, digital marketing, and AI automation—built to scale.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#services" className="btn btn-primary">Explore Services</a>
              <a href="#contact" className="btn btn-ghost border border-app">Get a Quote</a>
            </div>
          </div>
          <div className="h-56 rounded-2xl bg-gradient-to-tr from-[rgb(var(--primary))/0.12] to-[rgb(var(--primary))/0.3]" />
        </div>
      </section>

      {/* About on Home */}
      <Section id="about" title="About Us">
        <div className="card p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="card-title text-lg">Mission</h3>
              <p className="card-text mt-1">
                Ship reliable software fast with thoughtful UX and measurable growth.
              </p>
            </div>
            <div>
              <h3 className="card-title text-lg">Approach</h3>
              <p className="card-text mt-1">
                Lean discovery, rapid prototyping, automation-first delivery.
              </p>
            </div>
            <div>
              <h3 className="card-title text-lg">Stack</h3>
              <p className="card-text mt-1">
                React/Node/Python, cloud-native, RAG/agents for AI workflows.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" title="Services">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {svc.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="card group p-6 hover:shadow-md"
            >
              <h3 className="card-title">{s.title}</h3>
              <p className="mt-1 text-sm text-[rgb(var(--link))] group-hover:underline underline-offset-4">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured work */}
      <Section id="portfolio" title="Featured work">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <article key={i} className="card overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Testimonials (title hidden) */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="sr-only">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-4 bg-[rgb(var(--primary))/0.08] border-0">
            “Great results and fast delivery.”
          </div>
          <div className="card p-4 bg-[rgb(var(--primary))/0.08] border-0">
            “Excellent communication and quality.”
          </div>
        </div>
      </section>

      {/* FAQs */}
      <Section id="faq" title="FAQs">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <details key={f.q} className="card p-4">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact teaser */}
      <Section id="contact" title="Contact">
        <div className="card p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Ready to start?</h3>
            <p className="text-sm text-muted">Tell us about the project and preferred timeline.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Open Contact Form</Link>
        </div>
      </Section>
    </>
  );
}
