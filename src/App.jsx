import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientLogin from './pages/patient/PatientLogin';
import PatientDetails from './pages/patient/PatientDetails';
import PatientDashboard from './pages/patient/PatientDashboard';
import MyRecords from './pages/patient/MyRecords';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/patient/details" element={<PatientDetails />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/patient/records" element={<MyRecords />} />
    </Routes>
  );
}

export default App;
