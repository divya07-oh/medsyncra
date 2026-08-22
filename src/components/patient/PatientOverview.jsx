import React from 'react';

const PatientOverview = ({ overview }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Medical Records</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark-blue)' }}>{overview.totalRecords}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Records</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Analysis Requests</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--main-blue)' }}>{overview.analysisRequests}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Pending</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Potential Contradictions</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#b45309' }}>{overview.potentialContradictions}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Need Review</div>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Medication Reminders</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#047857' }}>{overview.medicationReminders}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Today</div>
      </div>

      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Notifications</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark-blue)' }}>{overview.notifications}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>Unread</div>
      </div>
    </div>
  );
};

export default PatientOverview;
