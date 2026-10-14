import { useState, useEffect } from 'react'; 
import { Header, ProjectSearch, Footer, Contact } from './components';
import { supabase, contactInfo } from './lib';
import './App.css';

function App() {
  const [myProjects, setProjects] = useState([]);

  useEffect(() => {
    // 🌟 Fallback to an empty array if data is missing or undefined
    supabase.getProjects().then(data => setProjects(data || []));
  }, []);

  return (
    <div className="app-layout">
      <Header />
      
      <main className="portfolio-main">
        <section className="projects-section">
          <h2 className="section-title">Showcase Projects</h2>
          
          {myProjects.length === 0 ? (
            <p>Loading projects from database...</p>
          ) : (
            <ProjectSearch projects={myProjects} />
          )}

        </section>
      </main>

      <Contact
        name={contactInfo.name}
        email={contactInfo.email}
        phone={contactInfo.phone}
      />

      <Footer 
        Github={contactInfo.github}
        LinkedIn={contactInfo.linkedin}
      />
    </div>
  );
}

export default App;
