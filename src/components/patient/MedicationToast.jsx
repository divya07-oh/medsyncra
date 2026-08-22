import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMedications } from '../../data/mockDataStore';
import { Bell, X } from 'lucide-react';

const MedicationToast = () => {
  const navigate = useNavigate();
  const [upcomingMed, setUpcomingMed] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // We only show this to logged-in patients
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") return;

    const loadMeds = () => {
      const meds = getMedications();
      // Filter upcoming meds for the mock patient
      const upcoming = meds.find(m => m.patientId === "MS-DEMO-1001" && m.status === 'Upcoming');
      if (upcoming) {
        setUpcomingMed(upcoming);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    loadMeds();

    // Check periodically in a real app, here we just check once on mount
    const interval = setInterval(loadMeds, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !upcomingMed) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      width: '320px',
      zIndex: 100,
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ea580c' }}>
          <Bell size={18} />
          <strong style={{ fontSize: '14px' }}>Medication Reminder</strong>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: 'var(--dark-blue)' }}>
          {upcomingMed.name}
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
          Scheduled for: {upcomingMed.schedule}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setIsVisible(false);
            navigate('/patient/reminders');
          }}
          style={{ padding: '6px 12px', fontSize: '13px', flex: 1 }}
        >
          View Reminders
        </button>
      </div>
    </div>
  );
};

export default MedicationToast;
