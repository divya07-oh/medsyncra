import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { doctorDashboardStats, mockReviews, mockVerificationHistory } from '../../data/doctorMockData';
import { Users, AlertTriangle, FileCheck, Activity } from 'lucide-react';

const DoctorDashboard = () => {
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
          <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Doctor Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Welcome, Dr. Arun Kumar</p>
        </div>

        {/* STATS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f0f9ff', color: 'var(--main-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-blue)' }}>{doctorDashboardStats.authorizedPatients}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Authorized Patients</div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-blue)' }}>{doctorDashboardStats.pendingReviews}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Pending Reviews</div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-blue)' }}>{doctorDashboardStats.potentialContradictions}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Potential Contradictions</div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-blue)' }}>{doctorDashboardStats.completedReviews}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Completed Reviews</div>
            </div>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* PATIENTS REQUIRING REVIEW */}
          <section>
            <h2 style={{ fontSize: '20px', color: 'var(--dark-blue)', marginBottom: '16px' }}>Patients Requiring Review</h2>
            
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              
              <div className="desktop-flex" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1.5fr 1fr', gap: '16px', padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                <div>Patient</div>
                <div>Issue</div>
                <div>Priority</div>
                <div>Date</div>
                <div>Status</div>
                <div>Action</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {mockReviews.map((review, idx) => (
                  <div key={review.id} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', padding: '20px', borderBottom: idx !== mockReviews.length - 1 ? '1px solid var(--border)' : 'none' }} className="desktop-flex-row">
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Patient</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dark-blue)' }}>{review.patientId}</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Issue</span>
                      <span style={{ fontSize: '14px', color: 'var(--text-main)' }}>{review.field} Information</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Priority</span>
                      <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', width: 'fit-content',
                        backgroundColor: review.priority === 'High' ? '#fef2f2' : '#fff7ed',
                        color: review.priority === 'High' ? '#ef4444' : '#ea580c'
                      }}>
                        {review.priority}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Date</span>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{review.date}</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="desktop-hidden" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Status</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#ea580c', fontWeight: '500' }}>
                        <Activity size={14} /> {review.status}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button 
                        onClick={() => navigate(`/doctor/reviews/${review.id}`)}
                        className="btn btn-primary" 
                        style={{ padding: '8px 16px', fontSize: '13px', width: '100%' }}
                      >
                        Review
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 768px) {
                .desktop-flex-row {
                  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr 1fr !important;
                  padding: 16px 24px !important;
                }
              }
            `}} />
          </section>

          {/* RECENT ACTIVITY */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--dark-blue)' }}>Recent Verification Activity</h2>
              <button 
                onClick={() => navigate('/doctor/verification-history')}
                style={{ background: 'none', border: 'none', color: 'var(--main-blue)', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                View History
              </button>
            </div>
            
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {mockVerificationHistory.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: idx !== mockVerificationHistory.length - 1 ? '20px' : '0', borderBottom: idx !== mockVerificationHistory.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px',
                      backgroundColor: item.status === 'Verified' ? '#dcfce7' : item.status === 'Needs More Information' ? '#eff6ff' : '#f3f4f6',
                      color: item.status === 'Verified' ? '#15803d' : item.status === 'Needs More Information' ? '#2563eb' : '#4b5563'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: 'var(--dark-blue)', fontWeight: '500', marginBottom: '4px' }}>
                        {item.issue} <span style={{ fontWeight: '400', color: 'var(--text-main)' }}>{item.status === 'Verified' ? 'verified' : item.status === 'Needs More Information' ? 'requires more information' : 'marked as not a contradiction'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Patient {item.patientId} • {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
