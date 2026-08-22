import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { mockPatients, mockPatientRecords } from '../../data/doctorMockData';
import { ArrowLeft, FileText, Calendar, User, Eye, Layers } from 'lucide-react';
import MedicalRecordAnalysis from '../../components/doctor/MedicalRecordAnalysis';
import { analyzeMedicalRecords } from '../../services/medicalRecordAnalysis';
import { updateAnalysisRequestStatus } from '../../data/mockDataStore';

const DoctorPatientRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  const requestId = location.state?.requestId;
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  const patient = mockPatients.find(p => p.id === patientId);
  // Simulating fetching records by patientId
  const records = mockPatientRecords.filter(r => r.patientId === patientId);

  const handleAnalyzeRecords = async () => {
    if (!records || records.length === 0) {
      setAnalysisError("No medical records available for analysis.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult(null);

    try {
      if (requestId) {
        updateAnalysisRequestStatus(requestId, 'analyzing');
      }
      const result = await analyzeMedicalRecords(patientId, records);
      setAnalysisResult(result);
      if (requestId) {
        updateAnalysisRequestStatus(requestId, 'completed');
      }
    } catch (err) {
      setAnalysisError(err.message || 'Unable to analyze records. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!patient) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <DoctorNavbar />
        <main className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>Patient Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/doctor/patients')}>Back to Patients</button>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px' }}>
        
        <button 
          onClick={() => navigate('/doctor/patients')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--main-blue)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back to Patients
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', margin: '0 0 8px 0' }}>{patient.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{patient.id} • Medical Records</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleAnalyzeRecords}
              disabled={isAnalyzing}
              style={{ backgroundColor: '#f8fafc', color: 'var(--main-blue)', border: '1px solid var(--border)', fontWeight: '600', opacity: isAnalyzing ? 0.7 : 1, cursor: isAnalyzing ? 'not-allowed' : 'pointer' }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Records'}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/doctor/records/add')}
            >
              + Add Medical Record
            </button>
          </div>
        </div>

        {records.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <FileText size={48} color="var(--border)" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>No medical records found for this patient.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {records.map(record => (
              <div key={record.id} style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-blue)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{record.title}</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '4px' }}>
                      {record.type}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <User size={14} style={{ flexShrink: 0 }} /> <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{record.provider}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <Calendar size={14} style={{ flexShrink: 0 }} /> {record.date}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '4px', marginTop: '4px', wordBreak: 'break-all' }}>
                    {record.fileName}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button 
                    onClick={() => alert(`Viewing document: ${record.fileName}`)}
                    className="btn btn-outline" 
                    style={{ flex: 1, padding: '8px', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={16} /> View
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* GLM Analysis Section */}
        {(isAnalyzing || analysisError || analysisResult) && (
          <MedicalRecordAnalysis 
            analysisResult={analysisResult} 
            isLoading={isAnalyzing} 
            error={analysisError} 
            onRetry={handleAnalyzeRecords}
            patientId={patientId}
          />
        )}

      </main>
    </div>
  );
};

export default DoctorPatientRecords;
