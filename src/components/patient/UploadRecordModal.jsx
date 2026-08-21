import React, { useState, useRef } from 'react';
import { X, UploadCloud, File as FileIcon } from 'lucide-react';

const UploadRecordModal = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    type: 'Medical Report',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check extension
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only PDF, JPG, JPEG, and PNG files are allowed.');
      setFile(null);
      return;
    }

    // Check size (10 MB = 10 * 1024 * 1024 bytes)
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
    
    if (!formData.title || !formData.provider || !formData.type || !formData.date) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    const newRecord = {
      ...formData,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      id: Date.now().toString()
    };

    onUpload(newRecord);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
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
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--text-main)'
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: 'var(--white)', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'var(--white)', zIndex: 2 }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--dark-blue)' }}>Upload Record</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '13px' }}>
              {error}
            </div>
          )}

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
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Record Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>File Upload *</label>
            
            {!file ? (
              <div 
                onDragOver={(e) => e.preventDefault()} 
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                style={{ border: '2px dashed var(--border)', borderRadius: '8px', padding: '32px 20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  style={{ display: 'none' }} 
                />
                <UploadCloud size={32} color="var(--main-blue)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '14px', color: 'var(--dark-blue)', fontWeight: '500', marginBottom: '4px' }}>Click to upload or drag and drop</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PDF, JPG, PNG (Max. 10MB)</div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#f0f9ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                  <FileIcon size={24} color="var(--main-blue)" style={{ flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dark-blue)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button type="button" onClick={() => setFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1, padding: '12px', fontSize: '15px' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px', fontSize: '15px' }}>Upload Record</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default UploadRecordModal;
