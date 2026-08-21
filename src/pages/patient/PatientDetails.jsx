import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetailsForm from '../../components/patient/PersonalDetailsForm';
import ProfilePreview from '../../components/patient/ProfilePreview';
import { mockPatient } from '../../data/patientMockData';

const PatientDetails = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({});

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }

    const savedProfile = localStorage.getItem("patientProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setInitialData(parsed);
      setCurrentProfile(parsed);
    }
  }, [navigate]);

  const handleSave = (formData) => {
    const profileToSave = {
      ...formData,
      patientId: mockPatient.patientId || "PT-001"
    };
    
    localStorage.setItem("patientProfile", JSON.stringify(profileToSave));
    navigate('/patient/dashboard');
  };

  const handleFormChange = (data) => {
    setCurrentProfile(data);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '48px 20px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', color: 'var(--dark-blue)', marginBottom: '12px' }}>Tell Us About Yourself</h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Complete your basic details to personalize your medsyncra experience.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'start' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <PersonalDetailsForm 
              initialData={initialData} 
              onSubmit={handleSave} 
              onFormChange={handleFormChange}
            />
          </div>

          <div style={{ flex: '1 1 300px' }}>
             <ProfilePreview profile={currentProfile} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientDetails;
