import React, { useState } from "react";

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const jobCategories = ["All", "Development", "Design", "AI/ML", "Marketing"];

  const openPositions = [
    {
      title: "Full-Stack Developer",
      category: "Development",
      type: "Full-time",
      location: "Remote / Chennai",
      experience: "2-4 years",
      description: "We're looking for a talented full-stack developer to join our growing team and help build amazing web applications.",
      requirements: [
        "Strong experience with React and Node.js",
        "Experience with databases (MongoDB, PostgreSQL)",
        "Knowledge of REST API development",
        "Familiarity with version control (Git)",
        "Good understanding of responsive design"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with design and product teams",
        "Write clean, maintainable code",
        "Participate in code reviews",
        "Help mentor junior developers"
      ],
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "Git"],
      posted: "2 days ago"
    },
    {
      title: "AI/ML Engineer",
      category: "AI/ML", 
      type: "Full-time",
      location: "Remote / Chennai",
      experience: "1-3 years",
      description: "Join our AI team to develop cutting-edge machine learning solutions and intelligent automation systems.",
      requirements: [
        "Strong Python programming skills",
        "Experience with ML frameworks (TensorFlow, PyTorch)",
        "Knowledge of NLP and language models",
        "Understanding of RAG systems",
        "Experience with data preprocessing"
      ],
      responsibilities: [
        "Develop AI models and algorithms",
        "Implement chatbot solutions",
        "Work on automation workflows",
        "Optimize model performance",
        "Research new AI technologies"
      ],
      skills: ["Python", "Machine Learning", "NLP", "TensorFlow", "RAG"],
      posted: "1 week ago"
    },
    {
      title: "UI/UX Designer",
      category: "Design",
      type: "Full-time",
      location: "Remote / Chennai", 
      experience: "2-5 years",
      description: "Create beautiful and intuitive user experiences for our web applications and help shape our design language.",
      requirements: [
        "Proficiency in Figma and design tools",
        "Strong portfolio showcasing UI/UX work",
        "Understanding of user-centered design",
        "Knowledge of design systems",
        "Experience with prototyping"
      ],
      responsibilities: [
        "Design user interfaces and experiences",
        "Create design systems and components",
        "Conduct user research and testing",
        "Collaborate with development teams",
        "Maintain design consistency"
      ],
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
      posted: "3 days ago"
    },
    {
      title: "Frontend Developer (Intern)",
      category: "Development",
      type: "Internship",
      location: "Remote",
      experience: "0-1 years",
      description: "Perfect opportunity for students or recent graduates to gain hands-on experience in modern web development.",
      requirements: [
        "Basic knowledge of HTML, CSS, JavaScript",
        "Familiarity with React (preferred)",
        "Understanding of responsive design",
        "Eagerness to learn and grow",
        "Good communication skills"
      ],
      responsibilities: [
        "Assist in frontend development tasks",
        "Learn modern development practices",
        "Work on real client projects",
        "Participate in team meetings",
        "Document learning progress"
      ],
      skills: ["HTML", "CSS", "JavaScript", "React", "Learning"],
      posted: "1 day ago"
    },
    {
      title: "Digital Marketing Specialist",
      category: "Marketing",
      type: "Part-time",
      location: "Remote",
      experience: "1-3 years",
      description: "Help us grow our brand and reach more clients through strategic digital marketing campaigns.",
      requirements: [
        "Experience with SEO and content marketing",
        "Knowledge of social media platforms",
        "Understanding of analytics tools",
        "Strong writing and communication skills",
        "Creative thinking and problem-solving"
      ],
      responsibilities: [
        "Develop marketing strategies",
        "Manage social media presence",
        "Create content for marketing campaigns",
        "Analyze performance metrics",
        "Optimize marketing funnels"
      ],
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics", "Strategy"],
      posted: "5 days ago"
    }
  ];

  const companyBenefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Market-rate compensation with performance bonuses"
    },
    {
      icon: "🏠", 
      title: "Remote Work",
      description: "Work from anywhere with flexible hours"
    },
    {
      icon: "📚",
      title: "Learning & Development", 
      description: "Continuous learning opportunities and skill development"
    },
    {
      icon: "🎯",
      title: "Career Growth",
      description: "Clear career paths and promotion opportunities"
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description: "Work with passionate and talented team members"
    },
    {
      icon: "⚖️",
      title: "Work-Life Balance",
      description: "Healthy work environment with respect for personal time"
    }
  ];

  const filteredJobs = selectedCategory === "All" 
    ? openPositions 
    : openPositions.filter(job => job.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-app">Join Our Team</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            We're building the future of IT solutions. Join us and be part of a team that's 
            passionate about technology, innovation, and making a real impact.
          </p>
        </div>

        {/* Company Culture */}
        <div className="bg-surface border border-border rounded-2xl p-8 mb-16 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-app">Why Work With Us?</h2>
            <p className="text-muted">
              At Phenoxis, we believe in empowering our team members to do their best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyBenefits.map((benefit, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="font-semibold text-app">{benefit.title}</h3>
                <p className="text-sm text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {jobCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedCategory === category
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-surface text-muted border-border hover:bg-card hover:text-app hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-app">Open Positions</h2>
            <p className="text-muted">
              {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-surface border border-border rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-app">No positions found</h3>
              <p className="text-muted">
                No open positions in {selectedCategory} category right now. 
                Check back later or browse all positions.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="btn btn-primary mt-4 px-6 py-2"
              >
                View All Positions
              </button>
            </div>
          ) : (
            filteredJobs.map((job, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Job Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-app hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted mt-1">
                          <span className="flex items-center">
                            📍 {job.location}
                          </span>
                          <span className="flex items-center">
                            💼 {job.type}
                          </span>
                          <span className="flex items-center">
                            🎯 {job.experience}
                          </span>
                          <span className="flex items-center">
                            📅 {job.posted}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          job.type === 'Full-time' 
                            ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                            : job.type === 'Internship'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
                            : 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800'
                        }`}>
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Job Description */}
                    <p className="text-muted leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-app mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements Preview */}
                    <div>
                      <h4 className="text-sm font-semibold text-app mb-2">Key Requirements:</h4>
                      <ul className="text-sm text-muted space-y-1">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-xs text-muted italic">
                            +{job.requirements.length - 3} more requirements...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="lg:ml-6 flex-shrink-0">
                    <a
                      href={`mailto:careers.phenoxis@gmail.com?subject=${encodeURIComponent(`Application for ${job.title}`)}&body=${encodeURIComponent(`Hi Phenoxis Team,\n\nI'm interested in applying for the ${job.title} position. Please find my resume attached.\n\nThank you for your consideration.\n\nBest regards`)}`}
                      className="btn btn-primary px-8 py-3 w-full sm:w-auto inline-block text-center no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Application Process */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center mb-16">
          <h3 className="text-2xl font-bold mb-6 text-app">Application Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-app">Apply</h4>
              <p className="text-sm text-muted">Send us your resume and cover letter</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-app">Review</h4>
              <p className="text-sm text-muted">We'll review your application within 5 days</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-app">Interview</h4>
              <p className="text-sm text-muted">Technical and cultural fit interviews</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h4 className="font-semibold text-app">Welcome</h4>
              <p className="text-sm text-muted">Join the team and start your journey</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-app">Don't see a perfect fit?</h3>
          <p className="text-muted mb-6">
            We're always interested in hearing from talented individuals. 
            Send us your resume and let us know what you're passionate about.
          </p>
          <a 
            href={`mailto:careers.phenoxis@gmail.com?subject=${encodeURIComponent('General Application')}&body=${encodeURIComponent('Hi Phenoxis Team,\n\nI am interested in potential opportunities at Phenoxis. Please find my resume attached.\n\nThank you for your consideration.\n\nBest regards')}`}
            className="btn border border-border bg-surface hover:bg-card hover:border-primary/30 px-8 py-3 inline-block no-underline text-app transition-all"
            style={{ textDecoration: 'none' }}
          >
            Send Your Resume
          </a>
        </div>
      </div>
    </div>
  );
}
