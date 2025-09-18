import React from "react";
import { Link } from "react-router-dom";

const services = [
  { 
    slug: "web-development", 
    title: "Web Development", 
    description: "Full-stack web applications with modern frameworks and responsive design",
    icon: "🌐",
    features: ["React/Next.js Frontend", "Node.js Backend", "Database Integration", "API Development", "Responsive Design"],
    technologies: ["React", "Node.js", "MongoDB", "PostgreSQL", "JavaScript", "TypeScript"],
    startingPrice: "₹25,000"
  },
  { 
    slug: "ai-solutions", 
    title: "AI Solutions & Automation", 
    description: "Intelligent automation and AI-powered solutions for business growth",
    icon: "🤖",
    features: ["RAG Systems", "Chatbot Development", "Process Automation", "Machine Learning Models", "Data Analysis"],
    technologies: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI", "Streamlit"],
    startingPrice: "₹35,000"
  },
  { 
    slug: "ui-ux-design", 
    title: "UI/UX Design", 
    description: "User-centered design for exceptional digital experiences",
    icon: "🎨",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Mobile Design"],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"],
    startingPrice: "₹15,000"
  },
  { 
    slug: "digital-marketing", 
    title: "Digital Marketing", 
    description: "Data-driven marketing strategies and campaign optimization",
    icon: "📈",
    features: ["SEO Optimization", "Content Strategy", "Social Media Marketing", "Analytics Setup", "Conversion Optimization"],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Facebook Ads", "Google Ads", "Mailchimp"],
    startingPrice: "₹20,000"
  }
];

export default function Services() {
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We understand your business needs and create a detailed project roadmap.",
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Design & Prototyping", 
      description: "Create wireframes, mockups, and interactive prototypes for your approval.",
      duration: "2-3 weeks"
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "Build your solution with regular updates and thorough quality testing.",
      duration: "4-8 weeks"
    },
    {
      step: 4,
      title: "Launch & Support",
      description: "Deploy your solution and provide ongoing maintenance and support.",
      duration: "Ongoing"
    }
  ];

  const whyChooseUs = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Agile development process with quick turnaround times"
    },
    {
      icon: "🎯",
      title: "Quality Focused",
      description: "Rigorous testing and code reviews ensure high-quality deliverables"
    },
    {
      icon: "💬",
      title: "Clear Communication",
      description: "Regular updates and transparent communication throughout the project"
    },
    {
      icon: "🔧",
      title: "Ongoing Support",
      description: "Comprehensive support and maintenance after project completion"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Comprehensive IT solutions designed to help your business grow and succeed in the digital landscape. 
            From web development to AI integration, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div key={service.slug} className="card p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="relative z-10">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-app group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-primary font-semibold text-lg">
                        Starting from {service.startingPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-app mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-app mb-3 uppercase tracking-wider">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to={`/services/${service.slug}`}
                    className="btn btn-primary px-6 py-3 text-center group-hover:shadow-lg transition-all"
                  >
                    Learn More
                  </Link>
                  <Link 
                    to="/contact"
                    className="btn border border-app px-6 py-3 bg-surface hover:bg-card text-center transition-all"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time, 
              within budget, and exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center space-y-4 relative">
                {/* Step Number */}
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                
                {/* Step Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-app">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  <p className="text-primary text-xs font-semibold">{step.duration}</p>
                </div>

                {/* Connector Line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Why Choose Phenoxis?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We're committed to delivering exceptional results that drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="card p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-semibold text-app mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-soft/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted mb-6 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="btn btn-primary px-8 py-3"
            >
              Start Your Project
            </Link>
            <Link 
              to="/portfolio" 
              className="btn border border-app px-8 py-3 bg-card hover:bg-surface"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
