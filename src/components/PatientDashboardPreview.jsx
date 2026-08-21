import React from 'react';

const PatientDashboardPreview = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', height: '100%' }}>
      <div className="mockup-header" style={{ borderRadius: '8px 8px 0 0', margin: '-24px -24px 24px -24px' }}>
        <span className="mockup-title">Patient Dashboard</span>
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Welcome back</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="mockup-card">
          <div className="mockup-card-header">
            <h4 style={{ color: 'var(--dark-blue)', margin: 0 }}>Potential Contradictions</h4>
            <span className="mockup-badge badge-warning">2 potential issues found</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <strong>Allergy Conflict:</strong> Penicillin allergy differs between Hospital A and Clinic B.
            </div>
            <div style={{ padding: '12px 0' }}>
              <strong>Medication Dosage:</strong> Lisinopril dosage differs between recent records.
            </div>
          </div>
        </div>

        <div className="mockup-card">
          <h4 style={{ color: 'var(--dark-blue)', marginBottom: '12px' }}>Medical Records</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 12px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '16px', fontSize: '12px', fontWeight: '500' }}>Hospital A</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '16px', fontSize: '12px', fontWeight: '500' }}>Hospital B</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '16px', fontSize: '12px', fontWeight: '500' }}>Hospital C</span>
          </div>
        </div>

        <div className="mockup-card">
          <h4 style={{ color: 'var(--dark-blue)', marginBottom: '12px' }}>Medical Timeline</h4>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Recent record updates from Hospital A (Oct 12)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardPreview;
