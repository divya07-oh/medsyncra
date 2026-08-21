import React, { useState } from 'react';
import Logo from '../Logo';

const PatientLoginForm = ({ onSubmit, error, isLoading }) => {
  const [mobile, setMobile] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!mobile) {
      setLocalError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setLocalError("Please enter a valid 10-digit mobile number.");
      return;
    }

    onSubmit(mobile);
  };

  return (
    <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Logo />
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--dark-blue)', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>Sign in to securely access your medical records.</p>
        
        <h2 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '16px', textAlign: 'center' }}>Patient Login</h2>

        {(error || localError) && (
          <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Mobile Number</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <span style={{ padding: '12px 16px', backgroundColor: '#f8fafc', color: 'var(--text-secondary)', borderRight: '1px solid var(--border)', fontWeight: '500' }}>+91</span>
              <input 
                type="text" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit number"
                style={{ flex: 1, padding: '12px 16px', border: 'none', outline: 'none', fontSize: '16px', color: 'var(--text-main)', opacity: isLoading ? 0.6 : 1 }}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className="btn btn-primary w-full" style={{ padding: '14px', fontSize: '16px', marginBottom: '16px', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
          
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Your mobile number is used only to verify your identity.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PatientLoginForm;
