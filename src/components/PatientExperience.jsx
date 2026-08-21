import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PatientDashboardPreview from './PatientDashboardPreview';

const PatientExperience = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container experience-layout">
        <div className="experience-text">
          <h2 className="section-heading">Healthcare Records, Organized for You.</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Keep your medical records organized and understand potential inconsistencies across records from different healthcare providers.
          </p>
          
          <ul className="feature-list">
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Organize medical records</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>View medical history</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>See potential contradictions</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Understand why information was flagged</span>
            </li>
            <li className="feature-item">
              <Check size={20} className="feature-check" />
              <span>Track verification status</span>
            </li>
          </ul>
          
          <button className="btn btn-primary" onClick={() => navigate('/patient/login')}>Patient Login</button>
        </div>
        
        <div className="experience-visual">
          <PatientDashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default PatientExperience;
