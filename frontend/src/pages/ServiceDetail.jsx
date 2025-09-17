import React from "react";
import { useParams, Link } from "react-router-dom";

const content = {
  "software-development": {
    title: "Software Development",
    bullets: ["MERN/Node/Python", "REST/GraphQL APIs", "Cloud & DevOps"]
  },
  "ux-ui-design": {
    title: "UX/UI Design",
    bullets: ["Product discovery", "Wireframes & prototypes", "Design systems"]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    bullets: ["SEO & content", "Paid ads & funnels", "Analytics & CRO"]
  },
  "ai-automation": {
    title: "AI Automation & Chatbots",
    bullets: ["Chatbots & agents", "Workflow automation", "Data pipelines"]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = content[slug];

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <Link className="mt-4 inline-block text-[rgb(var(--link))]" to="/services">← Back to Services</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="card p-6 md:p-8">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <ul className="mt-5 space-y-2">
          {data.bullets.map((b) => (
            <li key={b} className="card-text flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link to="/contact" className="btn btn-primary">Request Proposal</Link>
        </div>
      </div>
    </section>
  );
}
