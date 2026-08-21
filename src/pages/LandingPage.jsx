import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import PatientExperience from '../components/PatientExperience';
import DoctorExperience from '../components/DoctorExperience';
import SafetySection from '../components/SafetySection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <PatientExperience />
        <DoctorExperience />
        <SafetySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
