import React from "react";
import jimmyImg from "../assets/jimmy.jpg";
import project2Img from "../assets/project2.jpg";
import project3Img from "../assets/project3.jpg";

export default function Portfolio() {
  const projects = [
    {
      title: "Project 1",
      description: "Short description of project 1.",
      image: jimmyImg,
    },
    {
      title: "Project 2", 
      description: "Short description of project 2.",
      image: project2Img,
    },
    {
      title: "Project 3",
      description: "Short description of project 3.", 
      image: project3Img,
    },
  ];

  return (
    <div className="portfolio-container">
      <h1>Portfolio</h1>
      <p>A few recent projects and experiments.</p>
      
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div key={i} className="project-card">
            <img 
              src={project.image} 
              alt={project.title}
              className="project-image"
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
