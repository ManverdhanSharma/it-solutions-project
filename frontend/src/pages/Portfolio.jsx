import React from "react";
import jimmyImg from "../assets/jimmy.jpg";

export default function Portfolio() {
  const projects = [
    {
      title: "Jimmy's Juice Bar & Cafe",
      description: "Modern and vibrant website for a local juice bar and cafe featuring fresh fruit juices, healthy smoothies, and artisan coffee. Showcases menu items, location details, and online ordering system.",
      image: jimmyImg,
      technologies: ["React", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
      link: "#",
      status: "Completed",
      category: "Restaurant Website",
      features: [
        "Interactive Menu Display",
        "Online Ordering System", 
        "Location & Hours Info",
        "Mobile-First Design",
        "Fresh & Modern UI"
      ]
    },
    {
      title: "PicnicQuest Platform",
      description: "Comprehensive event management and outdoor activity booking platform with real-time availability, secure payment processing, user profiles, and interactive location mapping for seamless picnic experiences.",
      image: null,
      technologies: ["React", "Express.js", "PostgreSQL", "Stripe API", "Google Maps", "JWT Auth"],
      link: "https://picnicquest-v1.onrender.com/",
      status: "Live",
      category: "Event Management Platform",
      features: [
        "Real-time Booking System",
        "Payment Integration",
        "Location Mapping",
        "User Management",
        "Review & Rating System"
      ]
    },
    {
      title: "CHIKI AI Assistant",
      description: "Intelligent personal assistant with advanced task management, email automation, system integration, and GUI dashboard. Features voice commands, file organization, and productivity analytics.",
      image: null,
      technologies: ["Python", "Tkinter", "OpenAI API", "SQLite", "PyAutoGUI", "Speech Recognition"],
      link: "#",
      status: "Completed", 
      category: "AI Desktop Application",
      features: [
        "Voice Command Processing",
        "Email Automation",
        "Task Scheduling",
        "File Organization",
        "System Tray Integration"
      ]
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Live':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-green-200 dark:shadow-green-900';
      case 'In Development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shadow-blue-200 dark:shadow-blue-900';
      case 'Completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 shadow-purple-200 dark:shadow-purple-900';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getProjectIcon = (category) => {
    switch(category) {
      case 'Restaurant Website':
        return '🥤';
      case 'Event Management Platform':
        return '🎯';
      case 'AI Desktop Application':
        return '🤖';
      default:
        return '🚀';
    }
  };

  const getPlaceholderGradient = (index) => {
    const gradients = [
      'from-orange-400/20 via-red-500/20 to-pink-500/20',
      'from-green-400/20 via-blue-500/20 to-purple-500/20', 
      'from-orange-400/20 via-red-500/20 to-pink-500/20'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Showcasing our technical expertise through innovative solutions across web development, 
            AI integration, and desktop applications. Each project demonstrates our commitment to 
            quality and cutting-edge technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, i) => (
            <div key={i} className="card group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg">
              {/* Project Image/Placeholder */}
              <div className="relative overflow-hidden h-56">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderGradient(i)} flex items-center justify-center relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute top-1/2 right-0 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                      <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center text-primary relative z-10">
                      <div className="text-6xl mb-4 filter drop-shadow-lg">
                        {getProjectIcon(project.category)}
                      </div>
                      <p className="text-sm font-semibold opacity-90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {project.category}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold shadow-lg backdrop-blur-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Live Indicator for Live Projects */}
                {project.status === 'Live' && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6 space-y-4 bg-card">
                {/* Category Tag */}
                <div className="text-xs text-primary font-medium uppercase tracking-wider opacity-80">
                  {project.category}
                </div>

                <h3 className="card-title group-hover:text-primary transition-colors duration-300 text-xl font-bold">
                  {project.title}
                </h3>
                
                <p className="card-text text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-app">Key Features:</h4>
                  <ul className="text-xs text-muted space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-app">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-app/10">
                  {project.link !== "#" ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary-soft font-semibold group-hover:translate-x-1 transition-all duration-300"
                    >
                      <span>{project.status === 'Live' ? 'View Live Site' : 'View Project'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  ) : (
                    <span className="text-sm text-muted font-medium">
                      Private Repository
                    </span>
                  )}
                  
                  {/* Project Status Indicator */}
                  <div className="text-xs text-muted flex items-center space-x-1">
                    {project.status === 'Live' && <><span className="text-green-500">🟢</span><span>Live</span></>}
                    {project.status === 'In Development' && <><span className="text-blue-500">🔵</span><span>Active</span></>}
                    {project.status === 'Completed' && <><span className="text-purple-500">🟣</span><span>Done</span></>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats & CTA Section */}
        <div className="bg-surface rounded-2xl p-8 text-center shadow-lg">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold">More Projects Coming Soon</h3>
            <p className="text-muted leading-relaxed">
              We're constantly working on innovative solutions. From AI-powered applications to 
              enterprise web platforms, our portfolio continues to grow with cutting-edge technology.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted">Projects Completed</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">8+</div>
                <div className="text-sm text-muted">Technologies Mastered</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted">Client Satisfaction</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a href="/contact" className="btn btn-primary px-8 py-3 font-semibold">
                Start Your Project
              </a>
              <a 
                href="https://github.com/ManverdhanSharma" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn border border-app px-8 py-3 bg-card hover:bg-surface font-semibold"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
