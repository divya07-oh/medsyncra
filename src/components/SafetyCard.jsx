import React from 'react';

const SafetyCard = ({ title, description, icon }) => {
  return (
    <div className="safety-card">
      <div className="safety-icon">
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', color: 'var(--dark-blue)', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </div>
  );
};

export default SafetyCard;
