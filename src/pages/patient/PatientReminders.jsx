import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import { Clock, Check, X, Bell } from 'lucide-react';
import { getMedications, updateMedicationStatus } from '../../data/mockDataStore';

const PatientReminders = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);

  const loadMeds = () => {
    const allMeds = getMedications();
    // In a real app we'd filter by logged in user, here we just filter by the mock ID
    setMedications(allMeds.filter(m => m.patientId === "MS-DEMO-1001"));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }
    loadMeds();
  }, [navigate]);

  const handleAction = (id, action) => {
    updateMedicationStatus(id, action);
    loadMeds();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Medication Reminders</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Track and manage your prescribed medications.</p>

        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <Bell size={20} color="#2563eb" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', lineHeight: 1.5 }}>
            <strong>Disclaimer:</strong> This is a reminder system only. It is based on information already present in your medical records. Medsyncra does not generate new medical instructions or prescribe medications.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {medications.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No medications currently scheduled.</p>
            </div>
          ) : (
            medications.map(med => (
              <div key={med.id} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: '0 0 8px 0' }}>{med.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <Clock size={16} /> <span>Scheduled: {med.schedule}</span>
                  </div>
                  <div style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '500', 
                    backgroundColor: med.status === 'Taken' ? '#dcfce7' : med.status === 'Missed' || med.status === 'Skipped' ? '#fee2e2' : '#fef3c7',
                    color: med.status === 'Taken' ? '#166534' : med.status === 'Missed' || med.status === 'Skipped' ? '#991b1b' : '#92400e'
                  }}>
                    {med.status}
                  </div>
                </div>
                
                {med.status === 'Upcoming' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleAction(med.id, 'Taken')}
                      className="btn" 
                      style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Check size={16} /> Mark as Taken
                    </button>
                    <button 
                      onClick={() => handleAction(med.id, 'Snoozed')}
                      className="btn" 
                      style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}
                    >
                      Snooze
                    </button>
                    <button 
                      onClick={() => handleAction(med.id, 'Skipped')}
                      className="btn btn-outline" 
                      style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', borderColor: '#fca5a5' }}
                    >
                      <X size={16} /> Skip
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
};

export default PatientReminders;
