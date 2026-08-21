import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { LogOut } from 'lucide-react';

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("doctorAuthenticated");
    navigate('/doctor/login');
  };

  return (
    <nav style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo />
          <div style={{ display: 'none', gap: '24px' }} className="desktop-flex">
            <button 
              onClick={() => navigate('/doctor/dashboard')} 
              style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: location.pathname === '/doctor/dashboard' ? 'var(--main-blue)' : 'var(--text-secondary)' }}
            >
              Dashboard
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', display: 'none' }} className="desktop-only">
            Doctor Portal
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
    </nav>
  );
};

export default DoctorNavbar;
