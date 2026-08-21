import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLoginForm from '../../components/auth/PatientLoginForm';
import OTPVerification from '../../components/auth/OTPVerification';
import { mockPatient } from '../../data/patientMockData';

const PatientLogin = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = (enteredMobile) => {
    setError('');
    if (enteredMobile !== mockPatient.mobile) {
      setError("Patient account not found.");
      return;
    }
    setMobile(enteredMobile);
    setStep(2);
  };

  const handleVerifyOTP = (enteredOtp) => {
    if (enteredOtp === mockPatient.otp && mobile === mockPatient.mobile) {
      // Success
      setSuccess(true);
      setError('');
      localStorage.setItem("patientAuthenticated", "true");
      localStorage.setItem("patientId", mockPatient.patientId);
      
      setTimeout(() => {
        const hasProfile = localStorage.getItem("patientProfile");
        if (hasProfile) {
          navigate('/patient/dashboard');
        } else {
          navigate('/patient/details');
        }
      }, 1500);
    } else {
      // Failed
      setAttemptsLeft(prev => prev - 1);
      setError("Incorrect OTP. Please check the OTP and try again.");
    }
  };

  const handleReset = () => {
    setStep(1);
    setMobile('');
    setError('');
    setAttemptsLeft(3);
    setSuccess(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {success ? (
        <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'var(--white)', padding: '48px 32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px' }}>
            ✓
          </div>
          <h2 style={{ fontSize: '24px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Login Successful</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back!</p>
        </div>
      ) : (
        step === 1 ? (
          <PatientLoginForm onSubmit={handleSendOTP} error={error} />
        ) : (
          <OTPVerification 
            mobile={mobile} 
            onVerify={handleVerifyOTP} 
            onReset={handleReset} 
            error={error} 
            attemptsLeft={attemptsLeft} 
          />
        )
      )}
    </div>
  );
};

export default PatientLogin;
