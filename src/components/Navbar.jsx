import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Logo />
        
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#safety" className="nav-link">Safety</a>
        </div>

        <div className="nav-actions">
          <button className="btn btn-secondary">Patient Login</button>
          <button className="btn btn-primary">Doctor Login</button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link" onClick={closeMenu}>Home</a>
          <a href="#how-it-works" className="nav-link" onClick={closeMenu}>How It Works</a>
          <a href="#features" className="nav-link" onClick={closeMenu}>Features</a>
          <a href="#safety" className="nav-link" onClick={closeMenu}>Safety</a>
          <button className="btn btn-secondary w-full" onClick={closeMenu}>Patient Login</button>
          <button className="btn btn-primary w-full" onClick={closeMenu}>Doctor Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
