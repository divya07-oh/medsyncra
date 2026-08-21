import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { Eye, EyeOff } from 'lucide-react';
import { mockDoctor } from '../../data/doctorMockData';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    hospitalId: '',
    doctorId: '',
    medicalLicenceNumber: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if fields are empty
    if (!formData.hospitalId || !formData.doctorId || !formData.medicalLicenceNumber || !formData.password) {
      setError('Please enter all required details.');
      setSuccess('');
      return;
    }

    // Validate credentials
    if (
      formData.hospitalId === mockDoctor.hospitalId &&
      formData.doctorId === mockDoctor.doctorId &&
      formData.medicalLicenceNumber === mockDoctor.medicalLicenceNumber &&
      formData.password === mockDoctor.password
    ) {
      setSuccess('Login successful.');
      setError('');
      
      localStorage.setItem("doctorAuthenticated", "true");
      
      setTimeout(() => {
        navigate('/doctor/details');
      }, 1000);
    } else {
      setError('Login unsuccessful. Please check your credentials.');
      setSuccess('');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '16px',
    color: 'var(--text-main)',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      
      <header style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <Logo />
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--white)', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#eff6ff', color: 'var(--main-blue)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }}>
              Demo Login
            </div>
            <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Doctor Portal</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Secure access for authorized healthcare professionals.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                {success}
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>Hospital ID</label>
              <input type="text" name="hospitalId" value={formData.hospitalId} onChange={handleChange} placeholder="e.g. HOSP-001" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>Doctor ID</label>
              <input type="text" name="doctorId" value={formData.doctorId} onChange={handleChange} placeholder="e.g. DOC-001" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>Medical Licence Number</label>
              <input type="text" name="medicalLicenceNumber" value={formData.medicalLicenceNumber} onChange={handleChange} placeholder="e.g. LIC-001" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Enter password" 
                  style={{ ...inputStyle, paddingRight: '48px' }} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '16px', fontWeight: '600', marginTop: '8px' }}>
              Login
            </button>
            
          </form>

        </div>
      </main>
    </div>
  );
};

export default DoctorLogin;
