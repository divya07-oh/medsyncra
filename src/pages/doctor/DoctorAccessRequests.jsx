import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { Shield, Clock, Check, X, User } from 'lucide-react';
import { getAccessRequests, updateAccessRequestStatus } from '../../data/mockDataStore';
import { mockDoctor, mockDoctorsList } from '../../data/doctorMockData';

const DoctorAccessRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' or 'outgoing'
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const allReqs = getAccessRequests();
    setRequests(allReqs);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
      return;
    }
    loadRequests();
  }, [navigate]);

  const handleStatusUpdate = (id, newStatus) => {
    updateAccessRequestStatus(id, newStatus);
    loadRequests();
  };

  const incomingRequests = requests.filter(r => r.receivingDoctorId === mockDoctor.doctorId);
  const outgoingRequests = requests.filter(r => r.requestingDoctorId === mockDoctor.doctorId);

  const displayRequests = activeTab === 'incoming' ? incomingRequests : outgoingRequests;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Access Requests</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Manage patient record access requests between healthcare providers.</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <button 
            onClick={() => setActiveTab('incoming')}
            style={{ 
              padding: '12px 24px', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'incoming' ? '2px solid var(--main-blue)' : '2px solid transparent',
              color: activeTab === 'incoming' ? 'var(--main-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'incoming' ? '600' : '500',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Incoming Requests ({incomingRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('outgoing')}
            style={{ 
              padding: '12px 24px', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'outgoing' ? '2px solid var(--main-blue)' : '2px solid transparent',
              color: activeTab === 'outgoing' ? 'var(--main-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'outgoing' ? '600' : '500',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Outgoing Requests ({outgoingRequests.length})
          </button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {displayRequests.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No {activeTab} access requests found.</p>
            </div>
          ) : (
            displayRequests.map(req => {
              const otherDoctorId = activeTab === 'incoming' ? req.requestingDoctorId : req.receivingDoctorId;
              const otherDoctor = mockDoctorsList.find(d => d.id === otherDoctorId) || { name: 'Unknown Doctor', specialization: '', hospital: req.hospital };
              
              return (
                <div key={req.id} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
                        <Shield size={14} /> 
                        {activeTab === 'incoming' ? 'Requested by' : 'Sent to'}:
                      </div>
                      <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: 0 }}>{otherDoctor.name}</h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{otherDoctor.specialization} • {otherDoctor.hospital}</p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        padding: '6px 16px', 
                        borderRadius: '16px', 
                        fontSize: '13px', 
                        fontWeight: '600',
                        display: 'inline-block',
                        backgroundColor: req.status === 'approved' ? '#dcfce7' : req.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                        color: req.status === 'approved' ? '#166534' : req.status === 'rejected' ? '#991b1b' : '#92400e'
                      }}>
                        {req.status === 'pending' && 'Pending'}
                        {req.status === 'approved' && 'Approved'}
                        {req.status === 'rejected' && 'Rejected'}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Patient ID</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>
                        <User size={14} /> {req.patientId}
                      </div>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Reason for Access</strong>
                      <div style={{ fontSize: '14px', color: 'var(--text-main)' }}>{req.reason}</div>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Date Requested</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-main)' }}>
                        <Clock size={14} /> {req.createdAt}
                      </div>
                    </div>
                  </div>

                  {activeTab === 'incoming' && req.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <button 
                        onClick={() => handleStatusUpdate(req.id, 'rejected')}
                        className="btn btn-outline" 
                        style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', borderColor: '#fca5a5' }}
                      >
                        <X size={16} /> Reject
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(req.id, 'approved')}
                        className="btn" 
                        style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Check size={16} /> Approve Access
                      </button>
                    </div>
                  )}
                  
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorAccessRequests;
