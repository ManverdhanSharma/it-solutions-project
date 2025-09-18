import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/background.jpg"; // Add your hero image here

export default function Home() {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks",
      icon: "🌐",
      features: ["React/Next.js", "Node.js/Express", "Database Design"]
    },
    {
      title: "AI Solutions",
      description: "Custom AI integrations and automation workflows",
      icon: "🤖",
      features: ["RAG Systems", "Chatbot Integration", "Process Automation"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design for digital experiences",
      icon: "🎨",
      features: ["Design Systems", "Prototyping", "User Research"]
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing strategies and campaigns",
      icon: "📈",
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
      {/* Hero Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                  Modern IT Solutions
                  <span className="block text-blue-500 dark:text-blue-400">Built to Scale</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Software development, UX/UI, digital marketing, and AI automation—built to scale with modern technologies and proven methodologies.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-lg transition-colors text-center">
                  Get Started
                </Link>
                <a href="#portfolio" className="border border-gray-300 dark:border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-base bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-center">
                  View Our Work
                </a>
              </div>

              {/* Key Points - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-6 lg:pt-8">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl lg:text-2xl">⚡</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Ship reliable software fast with thoughtful UX and measurable growth.</p>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl lg:text-2xl">🎯</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Modern Stack</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">React/Node/Python, cloud-native, RAG/agents for AI workflows.</p>
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
                <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="hidden lg:block absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mobile Optimized */}
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
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm">
              <div className="text-3xl lg:text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Innovation First</h3>
              <p className="text-gray-600 dark:text-gray-300">Lean discovery, rapid prototyping, automation-first delivery with cutting-edge technologies.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm">
              <div className="text-3xl lg:text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-300">Experienced developers, designers, and AI specialists working together to deliver excellence.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 text-center p-6 lg:p-8 rounded-lg shadow-sm">
              <div className="text-3xl lg:text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Results Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">Measurable outcomes, continuous improvement, and long-term partnership approach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Mobile Optimized */}
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
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl lg:text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm lg:text-base">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link to="/services" className="bg-blue-500 hover:bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors">
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
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group">
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
            <Link to="/portfolio" className="border border-gray-300 dark:border-gray-600 px-6 lg:px-8 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
            <Link to="/contact" className="bg-white text-blue-500 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 font-semibold rounded-lg transition-colors">
              Start Your Project
            </Link>
            <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-blue-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
