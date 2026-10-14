import { useState, useEffect } from 'react';
import './style/Footer.css';

function Footer({Github, LinkedIn}) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Monitor scroll position to show/hide the back-to-top button
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  // Smooth scroll logic
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Dynamic calculation of the current year (2026) */}
        <p>&copy; {new Date().getFullYear()} Armwi. All rights reserved.</p>
        
        <div className="footer-socials">
          <a href={Github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LinkedIn} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      {/* Reactive Floating Back to Top Button */}
      <button 
        className={`scroll-top-btn ${showScrollBtn ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}

export default Footer;
