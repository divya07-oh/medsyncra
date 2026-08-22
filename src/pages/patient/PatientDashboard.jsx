import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import PatientOverview from '../../components/patient/PatientOverview';
import MedicalRecordCard from '../../components/patient/MedicalRecordCard';
import ContradictionCard from '../../components/patient/ContradictionCard';
import MedicalTimeline from '../../components/patient/MedicalTimeline';
import VerificationStatus from '../../components/patient/VerificationStatus';
import { mockPatient, dashboardOverview, contradictions, medicalTimeline as timelineData, reviewedItems } from '../../data/patientMockData';
import { Edit, ChevronRight } from 'lucide-react';
import { getAnalysisRequests, getMedications, getNotifications } from '../../data/mockDataStore';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalRecords: 0,
    analysisRequests: 0,
    potentialContradictions: 2, // Hardcoded for demo
    medicationReminders: 0,
    notifications: 0
  });

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
    
    setProfile(JSON.parse(savedProfileStr));

    const savedRecordsStr = localStorage.getItem("patientRecords");
    let currentRecords = [];
    if (savedRecordsStr) {
      currentRecords = JSON.parse(savedRecordsStr);
      setRecords(currentRecords);
    } else {
      // Use mock default records if none in localStorage
      import('../../data/patientMockData').then(({ medicalRecords }) => {
        if (medicalRecords && medicalRecords.length > 0) {
          setRecords(medicalRecords);
          currentRecords = medicalRecords;
          localStorage.setItem("patientRecords", JSON.stringify(medicalRecords));
        }
      });
    }

    // Load data from mockDataStore
    const patientId = "MS-DEMO-1001";
    const userAnalysisReqs = getAnalysisRequests().filter(r => r.patientId === patientId && r.status === 'pending');
    const userMeds = getMedications().filter(m => m.patientId === patientId && m.status === 'Upcoming');
    const userNotifs = getNotifications().filter(n => n.patientId === patientId && !n.read);
    
    setStats({
      totalRecords: currentRecords.length || 3,
      analysisRequests: userAnalysisReqs.length,
      potentialContradictions: 2,
      medicationReminders: userMeds.length,
      notifications: userNotifs.length
    });

  }, [navigate]);

  if (!profile) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '48px 20px' }}>
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Welcome back, {profile.fullName}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Patient ID: <span style={{ fontWeight: '600' }}>{profile.patientId}</span></p>
          </div>
          <button 
            className="btn btn-outline" 
            onClick={() => navigate('/patient/details')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
          >
            <Edit size={16} /> Edit Profile
          </button>
        </div>

        {/* Profile Details Snippet */}
        <section style={{ marginBottom: '64px', backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--dark-blue)', marginBottom: '16px' }}>Profile Information</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <div><strong style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '13px' }}>Name</strong> {profile.fullName}</div>
            <div><strong style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '13px' }}>Date of Birth</strong> {profile.dateOfBirth}</div>
            <div><strong style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '13px' }}>Gender</strong> {profile.gender}</div>
            <div><strong style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '13px' }}>Blood Group</strong> {profile.bloodGroup || 'Not provided'}</div>
          </div>
        </section>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>OVERVIEW</h2>
          <PatientOverview overview={stats} />
        </section>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>POTENTIAL CONTRADICTIONS</h2>
          {contradictions.length > 0 ? (
            <>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '800px' }}>
                The following information differs across your medical records. These have been flagged for professional verification. medsyncra does not automatically overwrite records.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {contradictions.map(item => (
                  <ContradictionCard key={item.id} contradiction={item} />
                ))}
              </div>
            </>
          ) : (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No potential contradictions to review.</p>
            </div>
          )}
        </section>

        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--text-main)', margin: 0 }}>MY MEDICAL RECORDS</h2>
            {records.length > 0 && (
              <button 
                onClick={() => navigate('/patient/records')}
                style={{ background: 'none', border: 'none', color: 'var(--main-blue)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                View All Records <ChevronRight size={16} />
              </button>
            )}
          </div>
          
          {records.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {records.slice(0, 2).map(record => (
                <MedicalRecordCard key={record.id} record={record} />
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No records uploaded yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/patient/records')}>+ Upload Record</button>
            </div>
          )}
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          <section>
            <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>MEDICAL TIMELINE</h2>
            {timelineData.length > 0 ? (
              <MedicalTimeline timeline={timelineData} />
            ) : (
              <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Your medical timeline will appear as records are added.</p>
              </div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>PROFESSIONALLY REVIEWED</h2>
            {reviewedItems.length > 0 ? (
              <>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Potential contradictions that have been reviewed and verified by an authorized healthcare professional.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {reviewedItems.map(item => (
                    <VerificationStatus key={item.id} item={item} />
                  ))}
                </div>
              </>
            ) : (
              <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No professional reviews yet.</p>
              </div>
            )}
          </section>
        </div>

      </main>
    </div>
  );
};

export default PatientDashboard;
