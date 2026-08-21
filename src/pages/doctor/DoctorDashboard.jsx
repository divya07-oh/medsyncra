import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';

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
      
      <main className="container" style={{ padding: '48px 20px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Doctor Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Dashboard functionality coming soon.</p>
      </main>
    </div>
  );
};

export default DoctorDashboard;
