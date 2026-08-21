import React, { useState, useEffect } from 'react';

const PersonalDetailsForm = ({ onSubmit, initialData, onFormChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    emergencyContact: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
      if (onFormChange) onFormChange(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    if (onFormChange) onFormChange(newFormData);
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Please select your date of birth.";
    if (!formData.gender) newErrors.gender = "Please select your gender.";
    
    if (formData.emergencyContact && !/^[\d+\-\s()]{7,15}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact = "Please enter a valid phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '16px',
    color: 'var(--text-main)',
    backgroundColor: 'var(--white)',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-main)'
  };

  const errorStyle = {
    color: '#b91c1c',
    fontSize: '12px',
    marginTop: '6px',
    fontWeight: '500'
  };

  return (
    <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <label style={labelStyle}>Full Name <span style={{ color: '#b91c1c' }}>*</span></label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName} 
            onChange={handleChange} 
            placeholder="Enter your full name"
            style={{ ...inputStyle, borderColor: errors.fullName ? '#fca5a5' : 'var(--border)' }}
          />
          {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
        </div>

        <div>
          <label style={labelStyle}>Date of Birth <span style={{ color: '#b91c1c' }}>*</span></label>
          <input 
            type="date" 
            name="dateOfBirth"
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            style={{ ...inputStyle, borderColor: errors.dateOfBirth ? '#fca5a5' : 'var(--border)' }}
          />
          {errors.dateOfBirth && <div style={errorStyle}>{errors.dateOfBirth}</div>}
        </div>

        <div>
          <label style={labelStyle}>Gender <span style={{ color: '#b91c1c' }}>*</span></label>
          <select 
            name="gender"
            value={formData.gender} 
            onChange={handleChange} 
            style={{ ...inputStyle, borderColor: errors.gender ? '#fca5a5' : 'var(--border)' }}
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
        </div>

        <div>
          <label style={labelStyle}>Blood Group <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: '12px', marginLeft: '4px' }}>(Optional)</span></label>
          <select 
            name="bloodGroup"
            value={formData.bloodGroup} 
            onChange={handleChange} 
            style={inputStyle}
          >
            <option value="">Select if desired</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Emergency Contact <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: '12px', marginLeft: '4px' }}>(Optional)</span></label>
          <input 
            type="tel" 
            name="emergencyContact"
            value={formData.emergencyContact} 
            onChange={handleChange} 
            placeholder="e.g. +91 9876543211"
            style={{ ...inputStyle, borderColor: errors.emergencyContact ? '#fca5a5' : 'var(--border)' }}
          />
          {errors.emergencyContact && <div style={errorStyle}>{errors.emergencyContact}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-full" style={{ padding: '16px', fontSize: '16px', marginTop: '8px' }}>
          Continue to Dashboard
        </button>

      </form>
    </div>
  );
};

export default PersonalDetailsForm;
