import React from 'react';
import SafetyCard from './SafetyCard';
import { Lock, UserCheck, Stethoscope } from 'lucide-react';

const SafetySection = () => {
  return (
    <section id="safety" className="section">
      <div className="container">
        <h2 className="section-heading text-center">Designed to Support Healthcare Professionals — Not Replace Them.</h2>
        <p className="section-subtitle text-center" style={{ margin: '0 auto 64px' }}>
          medsyncra identifies potential inconsistencies and presents them for professional review. It does not diagnose conditions, prescribe treatments, or automatically decide which record is correct.
        </p>

        <div className="safety-grid">
          <SafetyCard 
            title="Privacy-Conscious Design"
            description="Healthcare information should be handled with controlled access and responsible data practices."
            icon={<Lock size={32} />}
          />
          <SafetyCard 
            title="Authorized Access"
            description="Medical information should only be available to users who are authorized to access it."
            icon={<UserCheck size={32} />}
          />
          <SafetyCard 
            title="Human Verification"
            description="Potential contradictions are presented for professional review rather than automatically resolved."
            icon={<Stethoscope size={32} />}
          />
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
