import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import './style/ProjectCard.css';

function ProjectSearch({ projects }) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  // Every unique tag across all projects, for the filter bar
  const allTags = useMemo(
    () => [...new Set(projects.flatMap(p => p.tags))].sort(),
    [projects]
  );

  const toggleTag = tag =>
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      // Must have ALL selected tags (use .some() instead for "any")
      const tagMatch = activeTags.every(t => p.tags.includes(t));
      // Text matches title, description, or any tag
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return tagMatch && textMatch;
    });
  }, [projects, query, activeTags]);

  return (
    <div>
      <input
        type="search"
        className="search-input"
        placeholder="Search projects or tags..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="card-tags filter-bar">
        {allTags.map(tag => (
          <button
            key={tag}
            type="button"
            className={`tag-pill ${activeTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
        {activeTags.length > 0 && (
          <button type="button" className="clear-btn" onClick={() => setActiveTags([])}>
            Clear
          </button>
        )}
      </div>

      <p className="result-count">{results.length} project{results.length !== 1 && 's'}</p>

      <div className="projects-grid">
        {results.map(p => (
          <ProjectCard key={p.id} {...p} activeTags={activeTags} onTagClick={toggleTag} />
        ))}
        {results.length === 0 && <p>No projects match.</p>}
      </div>
    </div>
  );
}

export default ProjectSearch;