import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientLogin from './pages/patient/PatientLogin';
import PatientDetails from './pages/patient/PatientDetails';
import PatientDashboard from './pages/patient/PatientDashboard';
import MyRecords from './pages/patient/MyRecords';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDetails from './pages/doctor/DoctorDetails';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

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
    </Routes>
  );
}

export default App;
