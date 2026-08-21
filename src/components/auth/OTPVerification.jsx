import React, { useState, useRef } from 'react';
import Logo from '../Logo';

const OTPVerification = ({ mobile, onVerify, onReset, error, attemptsLeft }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6).replace(/[^0-9]/g, '');
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
      inputRefs.current[nextEmptyIndex].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(''));
    if (error) {
       setOtp(['', '', '', '', '', '']);
       inputRefs.current[0].focus();
    }
  };

  const maskMobile = (number) => {
    return '+91 XXXXXXX' + number.slice(-3);
  };

  if (attemptsLeft <= 0) {
    return (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', color: '#b91c1c', marginBottom: '16px' }}>Too many unsuccessful attempts.</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Please request a new OTP and try again.</p>
          <button className="btn btn-primary w-full" onClick={onReset}>Request New OTP</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Logo />
      </div>

      <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--dark-blue)', marginBottom: '8px', textAlign: 'center' }}>Verify Your Mobile Number</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '16px', fontSize: '14px' }}>
          Enter the 6-digit OTP sent to your registered mobile number.
        </p>

        <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px', textAlign: 'center' }}>
          OTP sent to {maskMobile(mobile)}<br/>
          <strong>Demo OTP: 123456</strong>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            ✕ Login Unsuccessful<br/>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '24px' }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                style={{ 
                  width: '45px', 
                  height: '56px', 
                  textAlign: 'center', 
                  fontSize: '24px', 
                  fontWeight: '600',
                  border: `2px solid ${digit ? 'var(--main-blue)' : 'var(--border)'}`, 
                  borderRadius: '8px', 
                  outline: 'none',
                  color: 'var(--text-main)',
                  transition: 'border-color 0.2s'
                }}
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '14px', fontSize: '16px', marginBottom: '24px' }}>
            {error ? 'Try Again' : 'Verify OTP'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Didn't receive the OTP? <button type="button" onClick={onReset} style={{ background: 'none', border: 'none', color: 'var(--main-blue)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Resend OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
