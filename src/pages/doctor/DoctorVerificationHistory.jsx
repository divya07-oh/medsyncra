import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { mockVerificationHistory } from '../../data/doctorMockData';

const DoctorVerificationHistory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Verification History</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Audit trail of professionally verified records and contradiction resolutions.</p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          
          <div className="desktop-flex" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr 1.5fr 1fr', gap: '16px', padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            <div>Patient</div>
            <div>Decision</div>
            <div>Status</div>
            <div>Verified By</div>
            <div>Date</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mockVerificationHistory.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No verification history found.
              </div>
            ) : (
              mockVerificationHistory.map((item, idx) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', padding: '20px', borderBottom: idx !== mockVerificationHistory.length - 1 ? '1px solid var(--border)' : 'none' }} className="desktop-flex-row">
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Patient</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dark-blue)' }}>{item.patientId}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Decision</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: '500' }}>{item.decision}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Status</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500', 
                      color: item.status === 'Verified' ? '#15803d' : item.status === 'Needs More Information' ? '#2563eb' : '#4b5563' 
                    }}>
                      {item.icon} {item.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Verified By</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.verifiedBy}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Date</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.date}</span>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .desktop-flex-row {
              grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 1fr !important;
              padding: 16px 24px !important;
            }
          }
        `}} />
      </main>
    </div>
  );
};

export default DoctorVerificationHistory;
