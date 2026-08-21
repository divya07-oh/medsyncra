import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { LogOut, Menu, X } from 'lucide-react';

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("doctorAuthenticated");
    navigate('/doctor/login');
  };
  
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinkStyle = (path) => ({
    background: 'none', 
    border: 'none', 
    fontSize: '14px', 
    fontWeight: '500', 
    cursor: 'pointer', 
    padding: '8px 12px',
    borderRadius: '8px',
    color: location.pathname === path || location.pathname.startsWith(path + '/') ? 'var(--main-blue)' : 'var(--text-secondary)',
    backgroundColor: location.pathname === path || location.pathname.startsWith(path + '/') ? '#eff6ff' : 'transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo />
          <div style={{ display: 'none', gap: '8px' }} className="desktop-flex">
            <button onClick={() => navigate('/doctor/dashboard')} style={navLinkStyle('/doctor/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/doctor/patients')} style={navLinkStyle('/doctor/patients')}>Patients</button>
            <button onClick={() => navigate('/doctor/verification-history')} style={navLinkStyle('/doctor/verification-history')}>Verification History</button>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-main)', padding: '6px 12px', backgroundColor: '#f8fafc', borderRadius: '16px', display: 'none' }} className="desktop-only">
            Dr. Arun Kumar
          </span>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', padding: '8px' }}
            className="desktop-flex"
          >
            <LogOut size={18} />
            <span className="desktop-only">Logout</span>
          </button>

          <button 
            className="mobile-menu-btn desktop-hidden"
            onClick={toggleMenu}
            style={{ background: 'none', border: 'none', color: 'var(--dark-blue)', padding: '8px', cursor: 'pointer', display: 'block' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} style={{ 
        display: isMobileMenuOpen ? 'flex' : 'none', 
        flexDirection: 'column', 
        padding: '24px', 
        backgroundColor: 'var(--white)', 
        position: 'absolute', 
        top: '70px', 
        left: 0, 
        right: 0, 
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        gap: '16px'
      }}>
        <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', display: 'block' }}>Dr. Arun Kumar</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>DOC-001</span>
        </div>
        
        <button onClick={() => { closeMenu(); navigate('/doctor/dashboard'); }} style={{ ...navLinkStyle('/doctor/dashboard'), textAlign: 'left', padding: '12px' }}>Dashboard</button>
        <button onClick={() => { closeMenu(); navigate('/doctor/patients'); }} style={{ ...navLinkStyle('/doctor/patients'), textAlign: 'left', padding: '12px' }}>Patients</button>
        <button onClick={() => { closeMenu(); navigate('/doctor/verification-history'); }} style={{ ...navLinkStyle('/doctor/verification-history'), textAlign: 'left', padding: '12px' }}>Verification History</button>
        
        <button onClick={() => { closeMenu(); handleLogout(); }} style={{ textAlign: 'left', padding: '12px', background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
