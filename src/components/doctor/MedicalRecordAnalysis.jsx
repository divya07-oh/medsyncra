import React from 'react';
import { AlertTriangle, Info, RefreshCw, FileText, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MedicalRecordAnalysis = ({ analysisResult, isLoading, error, onRetry, patientId }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center', marginTop: '32px' }}>
        <div style={{ animation: 'spin 2s linear infinite', display: 'inline-block', marginBottom: '16px', color: 'var(--main-blue)' }}>
          <RefreshCw size={32} />
        </div>
        <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Analyzing medical records...</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>AI-assisted record reconciliation in progress</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fca5a5', padding: '32px 24px', textAlign: 'center', marginTop: '32px' }}>
        <AlertTriangle size={32} color="#dc2626" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '8px' }}>Unable to analyze records. Please try again.</h3>
        <p style={{ color: '#b91c1c', fontSize: '15px', marginBottom: '24px' }}>{error}</p>
        <button 
          onClick={onRetry}
          className="btn"
          style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!analysisResult || analysisResult.analysisStatus !== 'completed') {
    return null; 
  }

  const { potentialContradictions = [], informationUnavailable = [], summary } = analysisResult;

  return (
    <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '32px', marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <div style={{ backgroundColor: '#f0f9ff', color: 'var(--main-blue)', padding: '10px', borderRadius: '8px' }}>
          <FileText size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '22px', color: 'var(--dark-blue)', margin: 0 }}>AI-Assisted Medical Record Analysis</h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <span>Analysis Summary: {summary}</span>
            <span>Potential Contradictions Found: <strong style={{ color: potentialContradictions.length > 0 ? '#dc2626' : 'var(--text-main)' }}>{potentialContradictions.length}</strong></span>
          </div>
        </div>
      </div>

      {(!potentialContradictions || potentialContradictions.length === 0) ? (
        <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border)', marginBottom: '24px' }}>
          <CheckCircle size={32} color="#16a34a" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '18px', margin: '0 0 8px 0' }}>No potential contradictions detected.</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>No contradiction was identified by the current analysis. This does not guarantee that the records are complete or clinically correct.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
          {potentialContradictions.map((contradiction, index) => (
            <div key={index} style={{ border: '1px solid #fca5a5', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#fef2f2', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #fca5a5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={20} color="#dc2626" />
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#b91c1c' }}>Potential contradiction detected — requires verification</h3>
                </div>
                {contradiction.severity === 'high' && (
                  <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600', textTransform: 'uppercase' }}>High Severity</span>
                )}
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Field</span>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dark-blue)', marginTop: '4px' }}>{contradiction.field}</div>
                </div>

                <div className="contradiction-grid" style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
                  <style dangerouslySetInnerHTML={{__html: `
                    .contradiction-grid { grid-template-columns: 1fr; }
                    @media (min-width: 768px) { .contradiction-grid { grid-template-columns: 1fr 1fr; } }
                  `}} />
                  
                  {/* Record A */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Record A</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark-blue)', marginBottom: '12px' }}>{contradiction.recordA?.value}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Hospital: <span style={{ color: 'var(--text-main)' }}>{contradiction.recordA?.hospital}</span></div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Date: <span style={{ color: 'var(--text-main)' }}>{contradiction.recordA?.date}</span></div>
                  </div>

                  {/* Record B */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Record B</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#dc2626', marginBottom: '12px' }}>{contradiction.recordB?.value}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Hospital: <span style={{ color: 'var(--text-main)' }}>{contradiction.recordB?.hospital}</span></div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Date: <span style={{ color: 'var(--text-main)' }}>{contradiction.recordB?.date}</span></div>
                  </div>

                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Reason</span>
                  <p style={{ margin: 0, fontSize: '14px', color: '#1e3a8a', lineHeight: '1.5' }}>{contradiction.reason}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#ea580c', backgroundColor: '#fff7ed', padding: '6px 12px', borderRadius: '6px' }}>
                    <Info size={16} /> Status: {contradiction.status === 'needs_verification' ? 'Needs Verification' : contradiction.status}
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/doctor/reviews/${patientId || 'unknown'}-${index}`, { state: { contradiction } })}
                    style={{ backgroundColor: 'var(--main-blue)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500' }}
                  >
                    Review Contradiction <ChevronRight size={16} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {informationUnavailable && informationUnavailable.length > 0 && (
        <div style={{ marginTop: '24px', backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <HelpCircle size={20} color="var(--text-secondary)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-blue)' }}>Information Unavailable</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            {informationUnavailable.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                {typeof item === 'string' ? item : (
                  <span>
                    <strong>{item.field}:</strong> {item.message}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={14} /> AI-assisted analysis only. Potential contradictions require verification by an authorized healthcare professional.
          </p>
          <p style={{ margin: 0 }}>Medsyncra does not make medical decisions or replace professional clinical judgment.</p>
        </div>
      </div>

    </div>
  );
};

export default MedicalRecordAnalysis;
