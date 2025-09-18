import React, { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      category: "General Services",
      items: [
        {
          question: "What services does Phenoxis offer?",
          answer: "We specialize in full-stack web development, AI solutions, UI/UX design, and digital marketing. Our expertise includes React, Node.js, Python, AI/ML frameworks, and modern cloud platforms to deliver scalable business solutions."
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex enterprise applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
        },
        {
          question: "Do you work with startups or only established businesses?",
          answer: "We work with businesses of all sizes, from early-stage startups to established enterprises. We understand the unique challenges each faces and tailor our approach accordingly, offering flexible pricing and scalable solutions."
        }
      ]
    },
    {
      category: "Technology & Development",
      items: [
        {
          question: "What technologies do you use?",
          answer: "Our tech stack includes React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AI/ML frameworks, and cloud platforms like AWS and Azure. We choose technologies based on your specific needs and project requirements."
        },
        {
          question: "Can you integrate AI into my existing website?",
          answer: "Absolutely! We specialize in AI integration including chatbots, automation workflows, RAG systems, and machine learning solutions. We can enhance your existing platform or build new AI-powered features from scratch."
        },
        {
          question: "Do you provide mobile app development?",
          answer: "Yes, we develop responsive web applications that work seamlessly on mobile devices, as well as native mobile apps using React Native and modern development frameworks."
        }
      ]
    },
    {
      category: "Pricing & Process",
      items: [
        {
          question: "How do you price your projects?",
          answer: "We offer both fixed-price projects and hourly rates depending on your needs. After understanding your requirements, we provide detailed quotes with transparent pricing. We also offer maintenance packages for ongoing support."
        },
        {
          question: "Do you provide ongoing support after launch?",
          answer: "Yes, we offer comprehensive support packages including bug fixes, updates, security monitoring, and feature enhancements. We believe in long-term partnerships and ensure your solution continues to perform optimally."
        },
        {
          question: "What is your development process?",
          answer: "We follow agile methodology with regular check-ins and updates. Our process includes discovery, planning, design, development, testing, and deployment. We keep you involved at every stage and provide regular demos."
        }
      ]
    },
    {
      category: "Getting Started",
      items: [
        {
          question: "How do I get started with my project?",
          answer: "Simply contact us through our website or email. We'll schedule a free consultation to discuss your needs, provide recommendations, and create a detailed project proposal. No commitment required for the initial consultation."
        },
        {
          question: "Do you sign NDAs for confidential projects?",
          answer: "Yes, we're happy to sign NDAs and maintain strict confidentiality for all projects. We understand the importance of protecting your business ideas and proprietary information."
        },
        {
          question: "Can you work with our existing development team?",
          answer: "Absolutely! We're experienced in collaborating with internal teams, providing specific expertise, code reviews, or taking on particular aspects of larger projects. We adapt to your existing workflows and processes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, process, and how we can help your business succeed.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-surface rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-semibold mb-3">Can't find what you're looking for?</h3>
          <p className="text-muted mb-6">We're here to help! Reach out to us directly and we'll get back to you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="btn btn-primary px-6 py-3"
            >
              Contact Us
            </a>
            <a 
              href="mailto:hello@phenoxis.com" 
              className="btn border border-app px-6 py-3 bg-card hover:bg-surface"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* FAQ Categories */}
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
              <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 text-sm">
                {categoryIndex + 1}
              </span>
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => {
                const globalIndex = categoryIndex * 10 + itemIndex; // Unique index across categories
                const isOpen = openItems.has(globalIndex);
                
                return (
                  <div 
                    key={itemIndex} 
                    className="card overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-app group-hover:text-primary transition-colors pr-8">
                          {item.question}
                        </h3>
                        <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="border-l-4 border-primary/20 pl-6">
                          <p className="text-muted leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-soft/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-muted mb-6">
            Our team is always ready to help you understand how we can best serve your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">📞</span>
              </div>
              <h4 className="font-semibold">Schedule a Call</h4>
              <p className="text-sm text-muted">Free 30-minute consultation</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">💬</span>
              </div>
              <h4 className="font-semibold">Live Chat</h4>
              <p className="text-sm text-muted">Instant support via chat</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">📧</span>
              </div>
              <h4 className="font-semibold">Email Support</h4>
              <p className="text-sm text-muted">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
