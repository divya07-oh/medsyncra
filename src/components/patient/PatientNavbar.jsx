import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { LogOut } from 'lucide-react';
import MedicationToast from './MedicationToast';

const PatientNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("patientAuthenticated");
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientProfile");
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo />
          <div style={{ display: 'none', gap: '24px' }} className="desktop-flex">
            <button 
              onClick={() => navigate('/patient/dashboard')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/patient/dashboard' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/patient/records')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/patient/records' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              My Records
            </button>
            <button 
              onClick={() => navigate('/patient/analysis-requests')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/patient/analysis-requests' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              Analysis Requests
            </button>
            <button 
              onClick={() => navigate('/patient/reminders')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/patient/reminders' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              Medication Reminders
            </button>
            <button 
              onClick={() => navigate('/patient/notifications')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/patient/notifications' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              Notifications
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', display: 'none' }} className="desktop-only">
            Patient Portal
          </span>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
          >
            <LogOut size={18} />
            <span className="desktop-only">Logout</span>
          </button>
        </div>
      </div>
      <MedicationToast />
    </nav>
  );
};

export default PatientNavbar;
