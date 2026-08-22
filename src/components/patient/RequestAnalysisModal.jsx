import React, { useState } from 'react';
import { Stethoscope, CheckCircle } from 'lucide-react';
import { mockDoctorsList } from '../../data/doctorMockData';
import { addAnalysisRequest } from '../../data/mockDataStore';

const RequestAnalysisModal = ({ onClose, availableRecords }) => {
  const [doctorId, setDoctorId] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [message, setMessage] = useState('Please review my medical records for possible contradictions.');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecordToggle = (id) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter(r => r !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  const handleSend = () => {
    if (!doctorId || selectedRecords.length === 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      addAnalysisRequest({
        id: `analysis-${Math.floor(Math.random() * 1000)}`,
        patientId: "MS-DEMO-1001",
        doctorId: doctorId,
        records: selectedRecords,
        message: message,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "pending"
      });
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', width: '100%', maxWidth: '500px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Stethoscope size={20} color="var(--main-blue)" /> Request Doctor Analysis
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-secondary)', cursor: 'pointer' }}>&times;</button>
        </div>

        <div style={{ padding: '24px' }}>
          
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>Select Doctor</label>
                <select 
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '15px' }}
                >
                  <option value="">-- Choose a Doctor --</option>
                  {mockDoctorsList.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization} ({doc.hospital})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>Select Records</label>
                <div style={{ border: '1px solid var(--border)', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto', padding: '8px' }}>
                  {availableRecords.map(rec => (
                    <label key={rec.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedRecords.includes(rec.id)}
                        onChange={() => handleRecordToggle(rec.id)}
                      />
                      <span style={{ fontSize: '14px' }}>{rec.title} ({rec.date})</span>
                    </label>
                  ))}
                  {availableRecords.length === 0 && (
                    <p style={{ margin: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>No records available.</p>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>Reason / Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '15px', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button className="btn btn-outline" onClick={onClose} style={{ flex: 1, padding: '12px' }}>Cancel</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSend}
                  disabled={!doctorId || selectedRecords.length === 0 || isLoading}
                  style={{ flex: 1, padding: '12px' }}
                >
                  {isLoading ? 'Sending...' : 'Send Analysis Request'}
                </button>
              </div>

            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Analysis request sent successfully.</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Your request is currently <strong>Pending Doctor Review</strong>.
              </p>
              <button className="btn btn-primary" onClick={onClose} style={{ padding: '10px 24px' }}>Close</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RequestAnalysisModal;
