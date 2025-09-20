import React from "react";
import { Link } from "react-router-dom";

const services = [
  { 
    slug: "web-development", 
    title: "Web Development", 
    description: "Full-stack web applications with modern frameworks and responsive design",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ["React/Next.js Frontend", "Node.js Backend", "Database Integration", "API Development", "Responsive Design"],
    technologies: ["React", "Node.js", "MongoDB", "PostgreSQL", "JavaScript", "TypeScript"],
  },
  { 
    slug: "ai-solutions", 
    title: "AI Solutions & Automation", 
    description: "Intelligent automation and AI-powered solutions for business growth",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: ["RAG Systems", "Chatbot Development", "Process Automation", "Machine Learning Models", "Data Analysis"],
    technologies: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI", "Streamlit"],
  },
  { 
    slug: "ui-ux-design", 
    title: "UI/UX Design", 
    description: "User-centered design for exceptional digital experiences",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Mobile Design"],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"],
  },
  { 
    slug: "digital-marketing", 
    title: "Digital Marketing", 
    description: "Data-driven marketing strategies and campaign optimization",
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    features: ["SEO Optimization", "Content Strategy", "Social Media Marketing", "Analytics Setup", "Conversion Optimization"],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Facebook Ads", "Google Ads", "Mailchimp"],
  }
];

export default function Services() {
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We understand your business needs and create a detailed project roadmap.",
      duration: "1-2 weeks",
      icon: (
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      step: 2,
      title: "Design & Prototyping", 
      description: "Create wireframes, mockups, and interactive prototypes for your approval.",
      duration: "2-3 weeks",
      icon: (
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "Build your solution with regular updates and thorough quality testing.",
      duration: "4-8 weeks",
      icon: (
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      step: 4,
      title: "Launch & Support",
      description: "Deploy your solution and provide ongoing maintenance and support.",
      duration: "Ongoing",
      icon: (
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const whyChooseUs = [
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Agile development process with quick turnaround times"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Focused",
      description: "Rigorous testing and code reviews ensure high-quality deliverables"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Clear Communication",
      description: "Regular updates and transparent communication throughout the project"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Ongoing Support",
      description: "Comprehensive support and maintenance after project completion"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* No more local floating elements - they're now universal in App.jsx */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive IT solutions designed to help your business grow and succeed in the digital landscape. 
            From web development to AI integration, we've got you covered.
          </p>
        </div>

        {/* Services Grid - Enhanced with Magnetic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div 
              key={service.slug} 
              className="magnetic-card gradient-border bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              {/* Animated background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-green-400/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 icon-glow shadow-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 pulse-dot"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-200"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                  <Link 
                    to="/contact"
                    className="border border-gray-300 dark:border-gray-600 px-6 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-center rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section - Enhanced */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-900 dark:to-blue-900/20 rounded-3xl p-8 lg:p-12 mb-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Our <span className="text-purple-500">Process</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We follow a proven methodology to ensure your project is delivered on time, 
                within budget, and exceeds your expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <div key={i} className="text-center space-y-4 relative group">
                  {/* Step Number with Icon */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                      <span className="text-2xl font-bold text-white relative z-10">{step.step}</span>
                    </div>
                    {/* Small floating icon */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.duration}
                    </div>
                  </div>

                  {/* Connector Line */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 -translate-x-1/2 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us - Enhanced */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose <span className="text-green-500">Phenoxis?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We're committed to delivering exceptional results that drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="magnetic-card bg-white dark:bg-gray-900 p-6 rounded-xl text-center shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project requirements and create a custom solution that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Your Project
              </Link>
              <Link 
                to="/portfolio" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
