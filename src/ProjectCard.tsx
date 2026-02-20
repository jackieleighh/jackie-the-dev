import React from 'react';

interface ProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  link: string;
}

function ProjectCard({ name, description, tags, link }: ProjectCardProps) {
  return (
    <div className="project-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        check it out &rarr;
      </a>
    </div>
  );
}

export default ProjectCard;
