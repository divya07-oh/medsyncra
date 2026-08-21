import React from 'react';
import WorkflowStep from './WorkflowStep';
import { FileText, GitCompare, AlertTriangle, UserCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <h2 className="section-heading text-center">How medsyncra Works</h2>
        <p className="section-subtitle text-center" style={{ margin: '0 auto 64px' }}>
          From fragmented records to professional review.
        </p>

        <div className="workflow-grid">
          <WorkflowStep 
            number="01"
            title="Collect Records"
            description="Bring together records from different healthcare providers."
            icon={<FileText size={28} />}
          />
          <WorkflowStep 
            number="02"
            title="Compare Information"
            description="Compare important information across available records."
            icon={<GitCompare size={28} />}
          />
          <WorkflowStep 
            number="03"
            title="Identify Potential Contradictions"
            description="Highlight conflicting information with its source and date."
            icon={<AlertTriangle size={28} />}
          />
          <WorkflowStep 
            number="04"
            title="Professional Review"
            description="An authorized healthcare professional reviews and verifies the information."
            icon={<UserCheck size={28} />}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
