import { useState } from 'react';
import './style/ProjectCard.css';

function ProjectCard({ title, description, tags = [], githubLink, liveLink, activeTags = [], onTagClick }) {
  // Local state to keep track of a user "Liking" or starring a project on your site
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className={`project-card ${isStarred ? 'starred' : ''}`}>
      
      {/* Top action bar on the card */}
      <div className="card-header">
        <span className="folder-icon">📁</span>
        <button
        className="star-button"
        onClick={() => setIsStarred(prev => !prev)}
        aria-pressed={isStarred}
        aria-label={isStarred ? 'Unstar project' : 'Star project'}
      >
          {isStarred ? '⭐' : '☆'}
        </button>
      </div>

      {/* Main content body */}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>

      {/* Dynamic pill tags list (Feels like a Python list mapping) */}
      <div className="card-tags">
        {tags.map(tag => (
          <button
            key={tag}
            type="button"
            className={`tag-pill ${activeTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagClick?.(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* External action paths */}
      <div className="card-links">
        {githubLink && <a href={githubLink} target="_blank" rel="noreferrer" className="link-icon">Code ↗</a>}
        {liveLink && <a href={liveLink} target="_blank" rel="noreferrer" className="link-btn">Live Demo</a>}
      </div>

    </div>
  );
}

export default ProjectCard;
