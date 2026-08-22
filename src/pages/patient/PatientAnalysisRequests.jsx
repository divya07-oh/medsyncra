import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import { FileSearch, Clock, Stethoscope } from 'lucide-react';
import { getAnalysisRequests } from '../../data/mockDataStore';
import { mockDoctorsList } from '../../data/doctorMockData';

const PatientAnalysisRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }
    const allReqs = getAnalysisRequests();
    setRequests(allReqs.filter(r => r.patientId === "MS-DEMO-1001"));
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Analysis Requests</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Track the status of your medical record analysis requests.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {requests.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>You have no active analysis requests.</p>
              <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/patient/records')}>Request Analysis from Records</button>
            </div>
          ) : (
            requests.map(req => {
              const doc = mockDoctorsList.find(d => d.id === req.doctorId) || { name: 'Unknown Doctor', specialization: '', hospital: '' };
              return (
                <div key={req.id} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f9ff', color: 'var(--main-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Stethoscope size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', color: 'var(--dark-blue)', margin: 0 }}>{doc.name}</h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{doc.specialization} • {doc.hospital}</p>
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '13px', color: 'var(--text-main)', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                      <strong>Message:</strong> {req.message}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {req.createdAt}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileSearch size={14} /> {req.records.length} records attached</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                    <div style={{ 
                      padding: '6px 16px', 
                      borderRadius: '16px', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      backgroundColor: req.status === 'completed' ? '#dcfce7' : req.status === 'analyzing' ? '#fef3c7' : '#eff6ff',
                      color: req.status === 'completed' ? '#166534' : req.status === 'analyzing' ? '#b45309' : '#1e40af'
                    }}>
                      {req.status === 'pending' && 'Pending Review'}
                      {req.status === 'analyzing' && 'Analyzing...'}
                      {req.status === 'completed' && 'Analysis Completed'}
                    </div>
                  </div>

                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientAnalysisRequests;
