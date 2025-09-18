import React from "react";

export default function Team() {
  const teamMembers = [
    {
      name: "Sharma",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer specializing in AI/ML and modern web technologies. Computer Science student at VIT Chennai with expertise in React, Node.js, and Python.",
      skills: ["React", "Node.js", "Python", "AI/ML", "Cloud Computing"],
      image: null, // Can add team member photos later
      social: {
        github: "",
        linkedin: "#",
        email: "sharma@phenoxis.com"
      }
    },
    {
      name: "AI Development Team", 
      role: "Artificial Intelligence Specialists",
      bio: "Our AI team focuses on developing intelligent solutions including chatbots, automation workflows, and machine learning applications for business growth.",
      skills: ["Machine Learning", "RAG Systems", "Process Automation", "Data Analysis"],
      image: null,
      social: {
        email: "ai@phenoxis.com"
      }
    },
    {
      name: "Design & UX Team",
      role: "Creative Design Specialists", 
      bio: "Dedicated to creating exceptional user experiences through thoughtful design, user research, and modern UI/UX principles.",
      skills: ["UI/UX Design", "User Research", "Prototyping", "Design Systems"],
      image: null,
      social: {
        email: "design@phenoxis.com"
      }
    }
  ];

  const companyValues = [
    {
      icon: "🚀",
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and modern development practices to deliver exceptional solutions."
    },
    {
      icon: "🤝", 
      title: "Collaboration",
      description: "We work closely with our clients as partners, ensuring transparent communication throughout every project."
    },
    {
      icon: "🎯",
      title: "Results Focused",
      description: "Every solution we build is designed to deliver measurable value and drive real business growth."
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      description: "We stay updated with the latest technologies and industry best practices to serve our clients better."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Our Team</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Meet the passionate team behind Phenoxis. We're a group of dedicated professionals 
            committed to delivering exceptional technology solutions for your business.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, i) => (
            <div key={i} className="card p-6 text-center hover:shadow-lg transition-all duration-300 group">
              {/* Profile Image */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-soft/30 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-app group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>

                <p className="text-muted text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-app">Expertise:</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 pt-2">
                  {member.social.email && (
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="p-2 rounded-lg hover:bg-surface transition-colors"
                      title="Email"
                    >
                      <svg className="w-5 h-5 text-muted hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-surface transition-colors"
                      title="GitHub"
                    >
                      <svg className="w-5 h-5 text-muted hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && member.social.linkedin !== "#" && (
                    <a 
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-surface transition-colors"
                      title="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-muted hover:text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Values */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-app">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary/5 to-primary-soft/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
          <p className="text-muted mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for technology and innovation. 
            Check out our open positions and become part of the Phenoxis family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/careers" 
              className="btn btn-primary px-8 py-3"
            >
              View Open Positions
            </a>
            <a 
              href="mailto:careers@phenoxis.com" 
              className="btn border border-app px-8 py-3 bg-card hover:bg-surface"
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
