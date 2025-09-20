import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/background.jpg"; // Add your hero image here
import HeroBackground from "../components/HeroBackground.jsx"; // Add this import

export default function Home() {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ["React/Next.js", "Node.js/Express", "Database Design"]
    },
    {
      title: "AI Solutions",
      description: "Custom AI integrations and automation workflows",
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ["RAG Systems", "Chatbot Integration", "Process Automation"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design for digital experiences",
      icon: (
        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ["Design Systems", "Prototyping", "User Research"]
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing strategies and campaigns",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: ["SEO Optimization", "Content Strategy", "Analytics"]
    }
  ];

  const portfolioProjects = [
    {
      title: "Phenoxis Platform", // Updated from GenHelps
      description: "Full-stack IT solutions platform with AI chatbot integration",
      tech: "React • Node.js • AI"
    },
    {
      title: "AI Dashboard Maker",  
      description: "Data visualization tool with AI-powered insights",
      tech: "Python • Streamlit • ML"
    },
    {
      title: "CHIKI Assistant",
      description: "Personal AI assistant with task management",
      tech: "Python • GUI • Automation"
    }
  ];

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "We work with React, Node.js, Python, AI/ML frameworks, and modern cloud platforms to deliver scalable solutions."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary from 2-4 weeks for simple applications to 3-6 months for complex enterprise solutions."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer maintenance packages and ongoing support to ensure your solutions continue to perform optimally."
    },
    {
      question: "Can you help with AI integration?",
      answer: "Absolutely! We specialize in AI chatbots, automation workflows, and custom AI solutions for businesses."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - With Animated Background + Floating Icons */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        {/* Animated Background - Only in Hero */}
        <HeroBackground />
        
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white">
                  Modern IT Solutions
                  <span className="block text-blue-400">Built to Scale</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Software development, UX/UI, digital marketing, and AI automation—built to scale with modern technologies and proven methodologies.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
                  Get Started
                </Link>
                <a href="#portfolio" className="border border-gray-400 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base rounded-lg transition-all duration-300 hover:scale-105 text-center">
                  View Our Work
                </a>
              </div>

              {/* Key Points - Updated Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-6 lg:pt-8">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h4 className="font-semibold text-white">Fast Delivery</h4>
                  </div>
                  <p className="text-sm text-gray-300">Ship reliable software fast with thoughtful UX and measurable growth.</p>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806-.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h4 className="font-semibold text-white">Modern Stack</h4>
                  </div>
                  <p className="text-sm text-gray-300">React/Node/Python, cloud-native, RAG/agents for AI workflows.</p>
                </div>
              </div>
            </div>

            {/* Right Image - Mobile Optimized */}
            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={heroImage} 
                    alt="Modern IT Solutions - Phenoxis"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-auto object-cover"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  {/* Fallback gradient */}
                  <div 
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center"
                    style={{display: 'none'}}
                  >
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">Phenoxis</h3>
                      <p className="text-white/80">Modern IT Solutions</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements - Hidden on small screens */}
                <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
                <div className="hidden lg:block absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Updated Icons */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">About Phenoxis</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're a modern IT solutions company focused on delivering scalable, 
              innovative technology solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm magnetic-card">
              <div className="flex justify-center mb-4 icon-glow">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Innovation First</h3>
              <p className="text-gray-600 dark:text-gray-300">Lean discovery, rapid prototyping, automation-first delivery with cutting-edge technologies.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm magnetic-card">
              <div className="flex justify-center mb-4 icon-glow">
                <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-300">Experienced developers, designers, and AI specialists working together to deliver excellence.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm magnetic-card">
              <div className="flex justify-center mb-4 icon-glow">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Results Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">Measurable outcomes, continuous improvement, and long-term partnership approach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Interactive Cards with Magnetic Effect */}
      <section id="services" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="magnetic-card gradient-border bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm group cursor-pointer"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white text-center group-hover:text-blue-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm lg:text-base text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 pulse-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Hover Effect Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-xs text-blue-500 font-medium text-center">
                    Learn More →
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link to="/services" className="bg-blue-500 hover:bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Mobile Optimized */}
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Portfolio</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A few recent projects and experiments showcasing our technical expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group magnetic-card">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold group-hover:text-blue-500 transition-colors text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                    {project.description}
                  </p>
                  <div className="text-sm text-blue-500 font-mono">
                    {project.tech}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link to="/portfolio" className="border border-gray-300 dark:border-gray-600 px-6 lg:px-8 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Mobile Optimized */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Common questions about our services and process
            </p>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-gray-900 p-4 lg:p-6 rounded-lg shadow-sm group">
                <summary className="cursor-pointer font-semibold text-base lg:text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {faq.question}
                </summary>
                <p className="mt-3 lg:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Tell us about your project and preferred timeline. Let's discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-500 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 font-semibold rounded-lg transition-all duration-300 hover:scale-105">
              Start Your Project
            </Link>
            <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-blue-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-all duration-300 hover:scale-105">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
