import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { FileSearch, Clock, User, ArrowRight } from 'lucide-react';
import { getAnalysisRequests } from '../../data/mockDataStore';
import { mockDoctor } from '../../data/doctorMockData';

const DoctorAnalysisRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
      return;
    }
    const allReqs = getAnalysisRequests();
    // Filter for the simulated logged in doctor
    setRequests(allReqs.filter(r => r.doctorId === mockDoctor.doctorId));
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Patient Analysis Requests</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Review and analyze medical records requested by your patients.</p>

        <div style={{ display: 'grid', gap: '16px' }}>
          {requests.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>You have no pending analysis requests.</p>
            </div>
          ) : (
            requests.map(req => (
              <div key={req.id} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#f0f9ff', color: 'var(--main-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: 0 }}>Arun Kumar</h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>ID: {req.patientId}</p>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '6px 16px', 
                    borderRadius: '16px', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    backgroundColor: req.status === 'completed' ? '#dcfce7' : req.status === 'analyzing' ? '#fef3c7' : '#eff6ff',
                    color: req.status === 'completed' ? '#166534' : req.status === 'analyzing' ? '#b45309' : '#1e40af'
                  }}>
                    {req.status === 'pending' && 'Pending Review'}
                    {req.status === 'analyzing' && 'Analyzing...'}
                    {req.status === 'completed' && 'Completed'}
                  </div>
                </div>
                
                <div style={{ fontSize: '14px', color: 'var(--text-main)', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--dark-blue)', display: 'block', marginBottom: '4px' }}>Patient Message:</strong>
                  {req.message}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Requested: {req.createdAt}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileSearch size={16} /> Records: {req.records.length}</span>
                  </div>

                  <button 
                    onClick={() => {
                      // Navigate to Patient Records with state indicating we came from an analysis request
                      navigate(`/doctor/patients/${req.patientId}/records`, { state: { requestId: req.id } });
                    }}
                    className="btn btn-primary" 
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Review & Analyze <ArrowRight size={16} />
                  </button>
                </div>
                
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorAnalysisRequests;
