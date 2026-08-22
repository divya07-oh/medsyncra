import React, { useState } from 'react';
import { UserPlus, Search, ShieldAlert, CheckCircle } from 'lucide-react';
import { addAccessRequest } from '../../data/mockDataStore';
import { mockDoctor, mockDoctorsList } from '../../data/doctorMockData';

const RequestAccessModal = ({ onClose }) => {
  const [patientId, setPatientId] = useState('');
  const [step, setStep] = useState(1); // 1: Search, 2: Confirm, 3: Success
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data for the request flow
  const mockExternalPatient = {
    id: patientId || "PT-009",
    name: "Arjun T",
    primaryDoctorId: "DOC-002",
    primaryDoctor: mockDoctorsList.find(d => d.id === "DOC-002")?.name || "Dr. Sarah Smith",
    hospital: "Care General Hospital"
  };

  const handleSearch = () => {
    if (!patientId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // In a real app we'd check if patient exists, we just proceed for demo
    }, 1000);
  };

  const handleRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      addAccessRequest({
        id: `access-${Math.floor(Math.random() * 1000)}`,
        patientId: mockExternalPatient.id,
        requestingDoctorId: mockDoctor.doctorId,
        receivingDoctorId: mockExternalPatient.primaryDoctorId,
        hospital: mockExternalPatient.hospital,
        reason: "Need access to review previous medical records",
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "pending"
      });
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={20} color="var(--main-blue)" /> Request Patient Access
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-secondary)', cursor: 'pointer' }}>&times;</button>
        </div>

        <div style={{ padding: '24px' }}>
          
          {step === 1 && (
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>Enter the Patient ID to request access to their medical records from their primary physician.</p>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>Patient ID</label>
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    placeholder="e.g. PT-009"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '15px' }}
                  />
                </div>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={handleSearch}
                disabled={!patientId.trim() || isLoading}
                style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center' }}
              >
                {isLoading ? 'Searching...' : 'Find Patient'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--dark-blue)', marginBottom: '4px' }}>{mockExternalPatient.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>ID: {patientId}</p>
                
                <div style={{ fontSize: '13px', color: 'var(--text-main)', display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Primary Doctor:</span>
                    <span style={{ fontWeight: '500' }}>{mockExternalPatient.primaryDoctor}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Hospital:</span>
                    <span style={{ fontWeight: '500' }}>{mockExternalPatient.hospital}</span>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <ShieldAlert size={20} color="#b45309" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: '#92400e', margin: 0, lineHeight: 1.5 }}>
                  You are requesting access to this patient's medical history. {mockExternalPatient.primaryDoctor} will need to approve this request before you can view their records.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1, padding: '10px' }}>Back</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleRequest}
                  disabled={isLoading}
                  style={{ flex: 1, padding: '10px' }}
                >
                  {isLoading ? 'Sending Request...' : 'Request to Another Doctor'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Request Sent</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                An access request has been successfully sent to <strong>{mockExternalPatient.primaryDoctor}</strong>. You will be notified once access is granted.
              </p>
              <button className="btn btn-primary" onClick={onClose} style={{ padding: '10px 24px' }}>Close</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RequestAccessModal;
