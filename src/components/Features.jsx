import React from 'react';
import FeatureCard from './FeatureCard';
import { Database, AlertTriangle, MessageSquare, Clock, Users, ShieldCheck } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="section features-bg">
      <div className="container">
        <h2 className="section-heading text-center">Built for Clearer Medical Records.</h2>
        <p className="section-subtitle text-center" style={{ margin: '0 auto 64px' }}>
          Designed to make fragmented healthcare information easier to understand and review.
        </p>

        <div className="features-grid">
          <FeatureCard 
            title="Unified Medical Records"
            description="Organize records from multiple healthcare providers in one place."
            icon={<Database size={24} />}
          />
          <FeatureCard 
            title="Potential Contradiction Detection"
            description="Identify potential conflicts across allergies, medications, diagnoses, and other important information."
            icon={<AlertTriangle size={24} />}
          />
          <FeatureCard 
            title="Explainable Alerts"
            description="See what information differs, where it came from, and when it was recorded."
            icon={<MessageSquare size={24} />}
          />
          <FeatureCard 
            title="Medical Timeline"
            description="View records chronologically to understand how information changes over time."
            icon={<Clock size={24} />}
          />
          <FeatureCard 
            title="Patient & Doctor Views"
            description="Provide separate experiences for patients and authorized healthcare professionals."
            icon={<Users size={24} />}
          />
          <FeatureCard 
            title="Verification Workflow"
            description="Allow authorized healthcare professionals to review and verify potential contradictions."
            icon={<ShieldCheck size={24} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
