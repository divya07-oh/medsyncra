import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import { addVerificationRecord, hasVerificationRecord } from '../../data/doctorMockData';
import { AlertTriangle, Info, CheckCircle, ChevronLeft, Calendar, Building, User, FileText, Check } from 'lucide-react';

const DoctorReview = () => {
  const { reviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract patientId and index from reviewId (format: patientId-index)
  const patientId = reviewId ? reviewId.split('-').slice(0, 2).join('-') : 'Unknown';

  const contradiction = location.state?.contradiction;

  // State
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 'record_a', 'record_b', 'needs_more_information'
  const [doctorNote, setDoctorNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedVerification, setSavedVerification] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Authentication & duplicate check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("doctorAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/doctor/login');
    }
    
    // Check for duplicate verification
    if (reviewId && hasVerificationRecord(reviewId)) {
      setIsDuplicate(true);
    }
  }, [navigate, reviewId]);

  // Modal accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  if (!contradiction) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <DoctorNavbar />
        <main className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fca5a5', padding: '32px 24px', textAlign: 'center' }}>
            <AlertTriangle size={32} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '8px' }}>Review Information Unavailable</h3>
            <p style={{ color: '#b91c1c', fontSize: '15px', marginBottom: '24px' }}>Review information is unavailable. Please return to the patient records page and open the review again.</p>
            <button 
              onClick={() => navigate(`/doctor/patients/${patientId}/records`)}
              className="btn"
              style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
            >
              Back to Patient Records
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isDuplicate) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <DoctorNavbar />
        <main className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fca5a5', padding: '32px 24px', textAlign: 'center' }}>
            <CheckCircle size={32} color="#16a34a" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Already Reviewed</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>This contradiction has already been reviewed.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate(`/doctor/patients/${patientId}/records`)}
                style={{ backgroundColor: 'var(--white)', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                Back to Patient Records
              </button>
              <button 
                onClick={() => navigate('/doctor/verification-history')}
                style={{ backgroundColor: 'var(--main-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                View Verification History
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setDoctorNote('');
    setShowModal(true);
  };

  const handleConfirm = () => {
    const decisionText = 
      selectedAction === 'record_a' ? "Record A Verified" :
      selectedAction === 'record_b' ? "Record B Verified" :
      "Needs More Information";

    const record = {
      reviewId,
      patientId,
      doctorId: "Dr. Arun Kumar",
      decision: selectedAction,
      status: selectedAction === 'needs_more_information' ? "needs_more_information" : "verified",
      field: contradiction.field,
      note: doctorNote,
      verifiedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    addVerificationRecord(record);
    setSavedVerification(record);
    setShowModal(false);
    setIsSuccess(true);
  };

  if (isSuccess && savedVerification) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <DoctorNavbar />
        <main className="container" style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: savedVerification.decision === 'needs_more_information' ? '#eff6ff' : '#dcfce7', marginBottom: '24px' }}>
              {savedVerification.decision === 'needs_more_information' ? (
                <Info size={32} color="#2563eb" />
              ) : (
                <Check size={32} color="#16a34a" />
              )}
            </div>
            
            <h1 style={{ fontSize: '24px', color: 'var(--dark-blue)', marginBottom: '32px' }}>
              {savedVerification.decision === 'needs_more_information' 
                ? 'More information is required before verification.' 
                : '✓ Verification recorded successfully'
              }
            </h1>
            
            <div style={{ textAlign: 'left', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Patient:</span>
                <span style={{ color: 'var(--dark-blue)', fontSize: '14px', fontWeight: '600' }}>{savedVerification.patientId}</span>
                
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Decision:</span>
                <span style={{ color: 'var(--main-blue)', fontSize: '14px', fontWeight: '600' }}>
                  {savedVerification.decision === 'record_a' ? 'Record A verified' : 
                   savedVerification.decision === 'record_b' ? 'Record B verified' : 
                   'Needs More Information'}
                </span>
                
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Verified by:</span>
                <span style={{ color: 'var(--dark-blue)', fontSize: '14px', fontWeight: '500' }}>{savedVerification.doctorId}</span>
                
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Verified on:</span>
                <span style={{ color: 'var(--dark-blue)', fontSize: '14px', fontWeight: '500' }}>{savedVerification.verifiedAt}</span>
                
                {savedVerification.note && (
                  <>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Doctor note:</span>
                    <span style={{ color: 'var(--dark-blue)', fontSize: '14px', fontStyle: 'italic' }}>"{savedVerification.note}"</span>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate(`/doctor/patients/${patientId}/records`)}
                style={{ backgroundColor: 'var(--white)', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                Back to Patient Records
              </button>
              <button 
                onClick={() => navigate('/doctor/verification-history')}
                style={{ backgroundColor: 'var(--main-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                View Verification History
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <DoctorNavbar />
      
      <main className="container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}>
            <ChevronLeft size={20} /> Back
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#fef2f2', padding: '24px', borderBottom: '1px solid #fca5a5', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#dc2626" />
            <h1 style={{ margin: 0, fontSize: '22px', color: '#b91c1c' }}>Review Potential Contradiction</h1>
          </div>
          
          <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Patient ID</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> {patientId}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Field</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} /> {contradiction.field}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Severity</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: contradiction.severity === 'high' ? '#dc2626' : 'var(--text-main)', backgroundColor: contradiction.severity === 'high' ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                {contradiction.severity}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Status</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#ea580c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Info size={14} /> {contradiction.status === 'needs_verification' ? 'Needs Verification' : contradiction.status}
              </span>
            </div>
          </div>

          <div style={{ padding: '32px 24px' }}>
            <div className="review-grid" style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
              <style dangerouslySetInnerHTML={{__html: `
                .review-grid { grid-template-columns: 1fr; }
                @media (min-width: 768px) { .review-grid { grid-template-columns: 1fr 1fr; } }
              `}} />
              
              {/* Record A */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600' }}>RECORD A</h3>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Hospital</span>
                    <span style={{ fontSize: '15px', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={16} /> {contradiction.recordA?.hospital}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Date</span>
                    <span style={{ fontSize: '15px', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {contradiction.recordA?.date}</span>
                  </div>
                  <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Information</span>
                    <span style={{ fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600' }}>{contradiction.recordA?.value}</span>
                  </div>
                </div>
              </div>

              {/* Record B */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600' }}>RECORD B</h3>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Hospital</span>
                    <span style={{ fontSize: '15px', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={16} /> {contradiction.recordB?.hospital}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Date</span>
                    <span style={{ fontSize: '15px', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {contradiction.recordB?.date}</span>
                  </div>
                  <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Information</span>
                    <span style={{ fontSize: '16px', color: '#dc2626', fontWeight: '600' }}>{contradiction.recordB?.value}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why was this flagged */}
            <div style={{ backgroundColor: '#eff6ff', padding: '24px', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} /> Why was this flagged?
              </h3>
              <p style={{ margin: 0, fontSize: '15px', color: '#1e3a8a', lineHeight: '1.6' }}>{contradiction.reason}</p>
            </div>

            {/* Safety Message */}
            <div style={{ backgroundColor: '#fff7ed', padding: '20px', borderRadius: '8px', border: '1px solid #ffedd5', marginBottom: '32px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#9a3412', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <AlertTriangle size={16} /> Potential contradiction detected — requires verification by an authorized healthcare professional.
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: '#c2410c' }}>Medsyncra does not make the final medical decision.</p>
            </div>

            {/* Actions */}
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--dark-blue)', fontWeight: '600' }}>Doctor Actions</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <button 
                  onClick={() => handleActionClick('record_a')}
                  style={{ flex: '1 1 200px', backgroundColor: 'var(--white)', color: 'var(--main-blue)', border: '2px solid var(--main-blue)', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Verify Record A
                </button>
                <button 
                  onClick={() => handleActionClick('record_b')}
                  style={{ flex: '1 1 200px', backgroundColor: 'var(--white)', color: '#dc2626', border: '2px solid #dc2626', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Verify Record B
                </button>
                <button 
                  onClick={() => handleActionClick('needs_more_information')}
                  style={{ flex: '1 1 200px', backgroundColor: '#f1f5f9', color: 'var(--text-main)', border: '2px solid #cbd5e1', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Needs More Information
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', width: '100%', maxWidth: '500px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--dark-blue)', fontWeight: '600' }}>Confirm Verification</h2>
            </div>
            
            <div style={{ padding: '24px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: 'var(--text-main)' }}>
                You are about to mark <strong>{
                  selectedAction === 'record_a' ? 'Record A' : 
                  selectedAction === 'record_b' ? 'Record B' : 
                  'Needs More Information'
                }</strong> as the verified information.
              </p>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                This action will be recorded in the verification history.
              </p>

              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>Doctor's Note (Optional)</label>
                <textarea 
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                  placeholder="Add an optional note..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '100px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{ padding: '10px 16px', backgroundColor: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-main)', fontWeight: '500', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                style={{ padding: '10px 20px', backgroundColor: 'var(--main-blue)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '500', cursor: 'pointer' }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DoctorReview;
