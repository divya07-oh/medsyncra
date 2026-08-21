import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { UploadCloud, X, File as FileIcon, ArrowLeft } from 'lucide-react';

const DoctorAddRecord = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    provider: '',
    type: 'Medical Report',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only PDF, JPG, JPEG, and PNG files are allowed.');
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10 MB.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.title || !formData.provider || !formData.type || !formData.date) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    // Simulating save to frontend state
    setSuccess('Medical record added successfully.');
    
    setTimeout(() => {
      navigate('/doctor/patients');
    }, 1500);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '15px',
    color: 'var(--text-main)',
    backgroundColor: 'var(--white)',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-main)'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
        
        <button 
          onClick={() => navigate('/doctor/patients')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--main-blue)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Add Medical Record</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Upload a new record for a patient into the medsyncra system.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
              {success}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Patient ID *</label>
              <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="e.g. PT-001" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Record Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Blood Test Results" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Healthcare Provider *</label>
              <input type="text" name="provider" value={formData.provider} onChange={handleChange} placeholder="e.g. City Hospital" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Record Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                <option value="Medical Report">Medical Report</option>
                <option value="Prescription">Prescription</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Diagnosis Report">Diagnosis Report</option>
                <option value="Discharge Summary">Discharge Summary</option>
                <option value="Imaging Report">Imaging Report</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Record Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Notes (Optional)</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Add any relevant notes..." 
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
            />
          </div>

          <div>
            <label style={labelStyle}>File Upload *</label>
            
            {!file ? (
              <div 
                onDragOver={(e) => e.preventDefault()} 
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '40px 20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  style={{ display: 'none' }} 
                />
                <UploadCloud size={36} color="var(--main-blue)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500', marginBottom: '6px' }}>Click to upload or drag and drop</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>PDF, JPG, PNG (Max. 10MB)</div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: '#f0f9ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--white)', padding: '8px', borderRadius: '8px', color: 'var(--main-blue)' }}>
                    <FileIcon size={24} style={{ flexShrink: 0 }} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dark-blue)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button type="button" onClick={() => setFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px' }}>
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="button" onClick={() => navigate('/doctor/patients')} className="btn btn-outline" style={{ flex: 1, padding: '14px', fontSize: '15px' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px', fontSize: '15px' }}>Add Medical Record</button>
          </div>
          
        </form>

      </main>
    </div>
  );
};

export default DoctorAddRecord;
