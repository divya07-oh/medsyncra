import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { mockReviews } from '../../data/doctorMockData';
import { AlertTriangle, ArrowLeft, CheckCircle, Info, XCircle } from 'lucide-react';

const DoctorReview = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [verificationNote, setVerificationNote] = useState('');
  const [actionSelected, setActionSelected] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
  }, [navigate]);

  const review = mockReviews.find(r => r.id === reviewId);

  if (!review) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <DoctorNavbar />
        <main className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>Review Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/doctor/dashboard')}>Back to Dashboard</button>
        </main>
      </div>
    );
  }

  const handleVerifyClick = () => {
    setActionSelected('verify');
    setShowNoteForm(true);
  };

  const handleNeedsInfoClick = () => {
    setActionSelected('needs_info');
    setShowNoteForm(true);
  };

  const handleNotContradictionClick = () => {
    setActionSelected('not_contradiction');
    setShowNoteForm(true);
  };

  const handleSubmitVerification = () => {
    // Navigate to history to show resolution
    navigate('/doctor/verification-history');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        
        <button 
          onClick={() => navigate('/doctor/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--main-blue)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '8px', borderRadius: '8px' }}>
            <AlertTriangle size={24} />
          </div>
          <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', margin: 0 }}>Potential Contradiction</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Patient</span>
            <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '600' }}>{review.patientId} - {review.patientName}</span>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Field</span>
            <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '600' }}>{review.field}</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid #fca5a5', marginBottom: '32px' }}>
          <p style={{ color: '#b91c1c', fontSize: '15px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong>Potential contradiction detected.</strong> The available records contain different information. Review the source, date, and context before making a verification decision.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px', marginBottom: 0 }}>
            Different {review.field.toLowerCase()} records may represent a treatment change or update and require professional review. Do not assume either record is strictly incorrect without verification.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Record A */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Record 1</span>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Source</span>
                <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{review.recordA.provider}</span>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Record Date</span>
                <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{review.recordA.date}</span>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>{review.field} Value</span>
                <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', color: 'var(--main-blue)', fontWeight: '600', fontSize: '16px' }}>
                  {review.recordA.value}
                </div>
              </div>
            </div>
          </div>

          {/* Record B */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Record 2</span>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Source</span>
                <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{review.recordB.provider}</span>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Record Date</span>
                <span style={{ fontSize: '15px', color: 'var(--dark-blue)', fontWeight: '500' }}>{review.recordB.date}</span>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>{review.field} Value</span>
                <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', color: '#dc2626', fontWeight: '600', fontSize: '16px' }}>
                  {review.recordB.value}
                </div>
              </div>
            </div>
          </div>

        </div>

        {!showNoteForm ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: '0 0 8px 0' }}>Doctor Review Actions</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleVerifyClick}
                className="btn btn-primary" 
                style={{ flex: 1, minWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px', backgroundColor: '#16a34a', borderColor: '#16a34a' }}
              >
                <CheckCircle size={18} /> Verify Information
              </button>
              
              <button 
                onClick={handleNeedsInfoClick}
                className="btn btn-outline" 
                style={{ flex: 1, minWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
              >
                <Info size={18} /> Needs More Information
              </button>
              
              <button 
                onClick={handleNotContradictionClick}
                className="btn btn-outline" 
                style={{ flex: 1, minWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
              >
                <XCircle size={18} /> Not a Contradiction
              </button>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', margin: '0 0 16px 0' }}>Verification Note</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: '500',
              color: actionSelected === 'verify' ? '#16a34a' : actionSelected === 'needs_info' ? '#2563eb' : '#4b5563'
            }}>
              Selected Action: {
                actionSelected === 'verify' ? 'Verify Information' : 
                actionSelected === 'needs_info' ? 'Needs More Information' : 
                'Not a Contradiction'
              }
            </div>
            
            <textarea 
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              placeholder="Add your professional verification note here... What is the correct information or why is more info needed?"
              style={{ width: '100%', minHeight: '120px', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '15px', color: 'var(--text-main)', fontFamily: 'inherit', marginBottom: '24px', resize: 'vertical' }}
            />
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowNoteForm(false)}
                className="btn btn-outline" 
                style={{ padding: '12px 24px' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitVerification}
                className="btn btn-primary" 
                style={{ padding: '12px 24px' }}
              >
                Confirm Verification
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DoctorReview;
