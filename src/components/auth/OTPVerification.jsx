import React, { useState, useRef, useEffect } from 'react';
import Logo from '../Logo';

const OTPVerification = ({ mobile, onVerify, onReset, error, attemptsLeft, isLoading, onResend }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (cooldown > 0) {
      const timerId = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown === 0 && onResend) {
      onResend();
      setCooldown(60);
    }
  };

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
          OTP sent to {maskMobile(mobile)}
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
                  fontSize: '24px', 
                  textAlign: 'center', 
                  border: '1px solid var(--border)', 
                  borderRadius: '8px', 
                  outline: 'none',
                  color: 'var(--text-main)',
                  opacity: isLoading ? 0.6 : 1
                }}
              />
            ))}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || otp.join('').length !== 6} 
            className="btn btn-primary w-full" 
            style={{ 
              padding: '14px', 
              fontSize: '16px', 
              marginBottom: '16px',
              opacity: (isLoading || otp.join('').length !== 6) ? 0.7 : 1,
              cursor: (isLoading || otp.join('').length !== 6) ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button 
              type="button" 
              disabled={cooldown > 0 || isLoading} 
              onClick={handleResend}
              style={{ background: 'none', border: 'none', color: cooldown > 0 ? 'var(--text-secondary)' : 'var(--main-blue)', fontSize: '14px', cursor: cooldown > 0 || isLoading ? 'not-allowed' : 'pointer' }}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
            <button 
              type="button" 
              onClick={onReset}
              disabled={isLoading}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              Change mobile number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
