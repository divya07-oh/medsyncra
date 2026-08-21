import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLoginForm from '../../components/auth/PatientLoginForm';
import OTPVerification from '../../components/auth/OTPVerification';
import { supabase } from '../../lib/supabaseClient';

const PatientLogin = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (enteredMobile) => {
    setError('');
    setIsLoading(true);
    
    const formattedMobile = '+91' + enteredMobile;
    
    const { error: signInError } = await supabase.auth.signInWithOtp({
      phone: formattedMobile
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || "Failed to send OTP. Please try again.");
      return;
    }

    setMobile(enteredMobile);
    setStep(2);
  };

  const handleVerifyOTP = async (enteredOtp) => {
    setError('');
    setIsLoading(true);
    
    const formattedMobile = '+91' + mobile;

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      phone: formattedMobile,
      token: enteredOtp,
      type: 'sms'
    });

    if (verifyError) {
      setIsLoading(false);
      setAttemptsLeft(prev => prev - 1);
      setError("OTP verification failed. Please check the OTP and try again.");
      return;
    }

    if (data?.session) {
      setSuccess(true);
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();

      setTimeout(() => {
        setIsLoading(false);
        if (profile) {
          navigate('/patient/dashboard');
        } else {
          navigate('/patient/details');
        }
      }, 1500);
    } else {
      setIsLoading(false);
      setError("An unexpected error occurred.");
    }
  };

  const handleResendOTP = async () => {
    if (!mobile) return;
    setError('');
    setIsLoading(true);
    
    const formattedMobile = '+91' + mobile;
    
    const { error: signInError } = await supabase.auth.signInWithOtp({
      phone: formattedMobile
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || "Failed to resend OTP. Please try again.");
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
          <PatientLoginForm onSubmit={handleSendOTP} error={error} isLoading={isLoading} />
        ) : (
          <OTPVerification 
            mobile={mobile} 
            onVerify={handleVerifyOTP} 
            onReset={handleReset} 
            onResend={handleResendOTP}
            error={error} 
            attemptsLeft={attemptsLeft} 
            isLoading={isLoading}
          />
        )
      )}
    </div>
  );
};

export default PatientLogin;
