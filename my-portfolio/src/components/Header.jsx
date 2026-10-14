import { useState, useEffect } from 'react';
import './style/Header.css';

function Header() {
  // State 1: Tracks if the user has scrolled down the page
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State 2: Tracks if the mobile navigation menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor the browser's scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // User scrolled down past 50px
      } else {
        setIsScrolled(false); // User is at the absolute top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">Armwi.dev</div>

      {/* Desktop Menu */}
      <ul className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
        <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
        <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
      </ul>

      {/* Mobile Hamburger Button - Reacts to clicks */}
      <button 
        className="navbar-toggle" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Navigation"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}

export default Header;
