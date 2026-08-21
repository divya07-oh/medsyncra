import React from 'react';
import { Database, FileText, FileHeart, Stethoscope, AlertTriangle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        
        <div className="hero-text">
          <div className="hero-badge">
            MEDICAL RECORD RECONCILIATION
          </div>
          <h1 className="hero-heading">
            One Clearer View of Every Medical Record.
          </h1>
          <p className="hero-desc">
            medsyncra brings fragmented healthcare records together, helping identify potential contradictions and making them easier for authorized healthcare professionals to review.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
          </div>
        </div>

        <div className="hero-visual-wrapper">
          <div className="hero-visual">
            <div className="connecting-line" style={{ top: '25%', left: '25%', width: '30%', height: '30%', transform: 'rotate(-45deg)' }}></div>
            <div className="connecting-line" style={{ top: '25%', right: '25%', width: '30%', height: '30%', transform: 'rotate(45deg)' }}></div>
            <div className="connecting-line" style={{ bottom: '35%', left: '20%', width: '35%', height: '20%', transform: 'rotate(30deg)' }}></div>
            <div className="connecting-line" style={{ bottom: '30%', right: '25%', width: '30%', height: '20%', transform: 'rotate(-30deg)' }}></div>

            <div className="visual-card vc-1">
              <FileText size={18} color="var(--teal)" />
              <span>Medical Records</span>
            </div>
            <div className="visual-card vc-2">
              <FileHeart size={18} color="var(--teal)" />
              <span>Allergies</span>
            </div>
            <div className="visual-card vc-3">
              <Database size={18} color="var(--teal)" />
              <span>Diagnoses</span>
            </div>
            <div className="visual-card vc-4">
              <Stethoscope size={18} color="var(--teal)" />
              <span>Patient History</span>
            </div>

            <div className="central-node">
              <Database size={32} color="var(--main-blue)" />
              <h3>MEDSYNCRA</h3>
            </div>

            <div className="alert-popup">
              <AlertTriangle size={24} className="alert-popup-icon" />
              <div>
                <div className="alert-popup-title">Potential contradiction</div>
                <div className="alert-popup-desc">Requires professional verification</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
