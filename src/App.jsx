import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

import LandingPage from './pages/LandingPage';
import PatientLogin from './pages/patient/PatientLogin';
import PatientDetails from './pages/patient/PatientDetails';
import PatientDashboard from './pages/patient/PatientDashboard';
import MyRecords from './pages/patient/MyRecords';

import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDetails from './pages/doctor/DoctorDetails';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorPatientRecords from './pages/doctor/DoctorPatientRecords';
import DoctorAddRecord from './pages/doctor/DoctorAddRecord';
import DoctorReview from './pages/doctor/DoctorReview';
import DoctorVerificationHistory from './pages/doctor/DoctorVerificationHistory';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/patient/details" element={<PatientDetails />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/patient/records" element={<MyRecords />} />

      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/details" element={<DoctorDetails />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/patients" element={<DoctorPatients />} />
      <Route
        path="/doctor/patients/:patientId/records"
        element={<DoctorPatientRecords />}
      />
      <Route path="/doctor/records/add" element={<DoctorAddRecord />} />
      <Route path="/doctor/reviews/:reviewId" element={<DoctorReview />} />
      <Route
        path="/doctor/verification-history"
        element={<DoctorVerificationHistory />}
      />
    </Routes>
  );
}

export default App;