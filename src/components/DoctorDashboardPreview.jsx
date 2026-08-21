import React from 'react';

const DoctorDashboardPreview = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', height: '100%' }}>
      <div className="mockup-header" style={{ borderRadius: '8px 8px 0 0', margin: '-24px -24px 24px -24px' }}>
        <span className="mockup-title">Doctor Dashboard</span>
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Patients Requiring Review</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="mockup-card">
          <div className="mockup-card-header">
            <h4 style={{ color: 'var(--dark-blue)', margin: 0 }}>Patient A</h4>
            <span className="mockup-badge badge-warning">High Review Priority</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Allergy Information Conflict
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', width: '100%' }}>Review</button>
        </div>

        <div className="mockup-card">
          <div className="mockup-card-header">
            <h4 style={{ color: 'var(--dark-blue)', margin: 0 }}>Patient B</h4>
            <span className="mockup-badge badge-info">Medium Review Priority</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Medication Information Conflict
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', width: '100%' }}>Review</button>
        </div>

        <div className="mockup-card">
          <div className="mockup-card-header">
            <h4 style={{ color: 'var(--dark-blue)', margin: 0 }}>Patient C</h4>
            <span className="mockup-badge badge-success">Verified</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            No Potential Contradiction
          </div>
        </div>

        <div style={{ marginTop: '8px' }}>
          <h4 style={{ color: 'var(--dark-blue)', fontSize: '14px', marginBottom: '12px' }}>Recent Reviews</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="mockup-badge badge-success">Verified</span>
            <span className="mockup-badge badge-warning">Needs More Information</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPreview;
