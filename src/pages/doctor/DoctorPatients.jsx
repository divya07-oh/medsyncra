import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { mockPatients } from '../../data/doctorMockData';
import { Search, User, FileText, AlertCircle } from 'lucide-react';

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  const filteredPatients = mockPatients.filter(patient => {
    const query = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Patients</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Manage authorized patients and access medical records.</p>
          </div>
        </div>

        <div style={{ marginBottom: '32px', maxWidth: '500px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'flex' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search by patient name or patient ID" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px 14px 44px', 
              borderRadius: '8px', 
              border: '1px solid var(--border)',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text-main)',
              backgroundColor: 'var(--white)'
            }}
          />
        </div>

        {filteredPatients.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <User size={48} color="var(--border)" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>No patients match your search criteria.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredPatients.map(patient => (
              <div key={patient.id} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0f9ff', color: 'var(--main-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600' }}>
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: 0 }}>{patient.name}</h3>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{patient.id}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} /> Records
                    </span>
                    <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{patient.records}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} color={patient.contradictions > 0 ? '#dc2626' : 'var(--text-secondary)'} /> Contradictions
                    </span>
                    <span style={{ fontWeight: '500', color: patient.contradictions > 0 ? '#dc2626' : 'var(--text-main)' }}>{patient.contradictions}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Last Updated</span>
                    <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{patient.lastUpdated}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/doctor/patients/${patient.id}/records`)}
                  className="btn btn-outline" 
                  style={{ width: '100%', padding: '10px' }}
                >
                  View Patient
                </button>
                
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default DoctorPatients;
