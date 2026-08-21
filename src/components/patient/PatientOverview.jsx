import React from 'react';

const PatientOverview = ({ overview }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Medical Records</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark-blue)' }}>{overview.totalRecords}</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Healthcare Providers</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark-blue)' }}>{overview.providers}</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Potential Contradictions</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#b45309' }}>{overview.potentialContradictions}</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid #10b981' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Professionally Reviewed</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#047857' }}>{overview.professionallyReviewed}</div>
      </div>
    </div>
  );
};

export default PatientOverview;
