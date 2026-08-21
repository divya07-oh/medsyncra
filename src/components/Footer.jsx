import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div>
            <div style={{ filter: 'brightness(0) invert(1)', marginBottom: '16px' }}>
              <Logo />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '300px' }}>
              Medical record reconciliation and contradiction detection for clearer healthcare information.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <a href="#" className="footer-link">Home</a>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#safety" className="footer-link">Safety</a>
          </div>

          <div>
            <h4 className="footer-col-title">Portal</h4>
            <a href="#" className="footer-link">Patient Login</a>
            <a href="#" className="footer-link">Doctor Login</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>Prototype for hackathon demonstration.</span>
          <span>&copy; {new Date().getFullYear()} medsyncra. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
