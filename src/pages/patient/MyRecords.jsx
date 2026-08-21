import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import RecordCard from '../../components/patient/RecordCard';
import UploadRecordModal from '../../components/patient/UploadRecordModal';
import { Search, Plus } from 'lucide-react';

const MyRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }

    const savedProfileStr = localStorage.getItem("patientProfile");
    if (!savedProfileStr) {
      navigate('/patient/details');
      return;
    }

    const savedRecordsStr = localStorage.getItem("patientRecords");
    if (savedRecordsStr) {
      setRecords(JSON.parse(savedRecordsStr));
    }
  }, [navigate]);

  const handleUpload = (newRecord) => {
    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    localStorage.setItem("patientRecords", JSON.stringify(updatedRecords));
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this medical record?")) {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      localStorage.setItem("patientRecords", JSON.stringify(updatedRecords));
    }
  };

  const filteredRecords = records.filter(record => {
    const query = searchQuery.toLowerCase();
    return (
      record.title.toLowerCase().includes(query) ||
      record.provider.toLowerCase().includes(query) ||
      record.fileName.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '48px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', color: 'var(--dark-blue)', marginBottom: '8px' }}>My Medical Records</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Upload and manage your medical records in one place.</p>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={() => setIsUploadModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
          >
            <Plus size={18} /> Upload Record
          </button>
        </div>

        {records.length > 0 && (
          <div style={{ marginBottom: '32px', maxWidth: '500px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'flex' }}>
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search records..." 
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
        )}

        {records.length === 0 ? (
          <div style={{ backgroundColor: 'var(--white)', padding: '64px 20px', textAlign: 'center', borderRadius: '16px', border: '1px dashed var(--border)' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(86, 215, 222, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--teal)' }}>
              <FileText size={32} />
            </div>
            <h3 style={{ fontSize: '20px', color: 'var(--dark-blue)', marginBottom: '12px' }}>No medical records yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              Upload your medical records to keep them organized in one place.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={() => setIsUploadModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', margin: '0 auto' }}
            >
              <Plus size={18} /> Upload Record
            </button>
          </div>
        ) : (
          <>
            {filteredRecords.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No records match your search.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredRecords.map(record => (
                  <RecordCard key={record.id} record={record} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {isUploadModalOpen && (
        <UploadRecordModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUpload} 
        />
      )}
    </div>
  );
};

import { FileText } from 'lucide-react';

export default MyRecords;
