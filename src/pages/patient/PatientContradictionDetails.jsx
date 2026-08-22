import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import { AlertTriangle, Calendar, ChevronLeft, Info } from 'lucide-react';
import { contradictions } from '../../data/patientMockData';

const PatientContradictionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contradiction, setContradiction] = useState(null);

  useEffect(() => {
    // Authentication check
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }

    // Find the specific contradiction
    const found = contradictions.find(c => c.id === parseInt(id));
    if (found) {
      setContradiction(found);
    }
  }, [id, navigate]);

  if (!contradiction) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <PatientNavbar />
        <main className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '16px' }}>Contradiction not found</h2>
          <button 
            className="btn btn-outline" 
            onClick={() => navigate('/patient/dashboard')}
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate('/patient/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          
          <div style={{ padding: '24px 32px', backgroundColor: '#fef3c7', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <AlertTriangle size={28} color="#b45309" />
            <div>
              <h1 style={{ margin: 0, color: '#92400e', fontSize: '20px' }}>Potential Contradiction</h1>
              <p style={{ margin: '4px 0 0', color: '#b45309', fontSize: '14px' }}>Field: {contradiction.field}</p>
            </div>
          </div>

          <div style={{ padding: '32px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Record A</h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hospital</div>
                  <div style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{contradiction.hospitalA}</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-main)' }}>
                    <Calendar size={14} color="var(--text-secondary)" /> {contradiction.dateA}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Extracted Information</div>
                  <div style={{ fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600', marginTop: '4px' }}>{contradiction.valueA}</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Record B</h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hospital</div>
                  <div style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{contradiction.hospitalB}</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-main)' }}>
                    <Calendar size={14} color="var(--text-secondary)" /> {contradiction.dateB}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Extracted Information</div>
                  <div style={{ fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600', marginTop: '4px' }}>{contradiction.valueB}</div>
                </div>
              </div>

            </div>

            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '15px' }}>Why was this flagged?</h4>
                  <p style={{ margin: 0, color: '#1e3a8a', fontSize: '14px', lineHeight: 1.5 }}>
                    The system detected differing information regarding your {contradiction.field.toLowerCase()} across these two records. This requires manual review by an authorized healthcare professional to ensure your active profile is accurate.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fca5a5' }}>
              <AlertTriangle size={20} color="#dc2626" />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b', marginBottom: '4px' }}>Status: {contradiction.status}</div>
                <div style={{ fontSize: '13px', color: '#b91c1c' }}>
                  Potential contradiction detected — requires verification by an authorized healthcare professional.
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientContradictionDetails;
