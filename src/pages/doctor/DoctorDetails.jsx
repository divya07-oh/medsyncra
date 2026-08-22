import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { mockDoctor } from '../../data/doctorMockData';

const DoctorDetails = () => {
  const navigate = useNavigate();
  const profile = mockDoctor.profile;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', color: 'var(--dark-blue)', marginBottom: '12px' }}>Doctor Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Review your professional information before accessing the doctor portal.</p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Doctor Name</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.name}</span>
            </div>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Doctor ID</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.doctorId}</span>
            </div>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Hospital</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.hospital}</span>
            </div>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Hospital ID</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.hospitalId}</span>
            </div>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Medical Licence Number</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.medicalLicenceNumber}</span>
            </div>
            
            <div>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Specialization</span>
              <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{localStorage.getItem('doctorSpecialization') || profile.specialization}</span>
            </div>
            
            <div style={{ gridColumn: '1 / -1', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ display: 'block', fontSize: '13px', color: '#166534', fontWeight: '500', marginBottom: '2px' }}>Authorization Status</span>
                <span style={{ fontSize: '15px', color: '#15803d', fontWeight: '600' }}>{profile.status}</span>
              </div>
            </div>

          </div>

        </div>

        <button 
          onClick={() => navigate('/doctor/dashboard')}
          className="btn btn-primary w-full" 
          style={{ padding: '16px', fontSize: '16px', fontWeight: '600' }}
        >
          Continue to Dashboard
        </button>

      </main>
    </div>
  );
};

export default DoctorDetails;
