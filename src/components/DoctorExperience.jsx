import React from 'react';
import { Check } from 'lucide-react';
import DoctorDashboardPreview from './DoctorDashboardPreview';

const DoctorExperience = () => {
  return (
    <section className="section doctor-section" style={{ backgroundColor: 'rgba(217, 232, 239, 0.3)' }}>
      <div className="container experience-layout">
        <div className="experience-text">
          <h2 className="section-heading">Give Healthcare Professionals the Context They Need.</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Review potential contradictions across authorized patient records and examine the source, date, and context behind each alert.
          </p>
          
          <ul className="feature-list">
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>View authorized patients</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Compare medical records</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Review potential contradictions</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Examine record context</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Verify information</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>View verification history</span>
            </li>
          </ul>
          
          <button className="btn btn-primary">Doctor Login</button>
        </div>
        
        <div className="experience-visual">
          <DoctorDashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default DoctorExperience;
