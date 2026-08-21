import React from 'react';

const WorkflowStep = ({ number, title, description, icon }) => {
  return (
    <div className="workflow-step">
      <div className="step-icon-container">
        {icon}
      </div>
      <div className="step-number">{number}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-desc">{description}</p>
    </div>
  );
};

export default WorkflowStep;
