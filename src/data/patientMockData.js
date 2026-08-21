// Mock authentication data for hackathon prototype only.
// Do NOT expose this as a real authentication system.

export const mockPatient = {
  mobile: "9876543210",
  otp: "123456",
  patientId: "PT-001" // Removed predefined profile fields
};

export const dashboardOverview = {
  totalRecords: 1,
  providers: 1,
  potentialContradictions: 1,
  professionallyReviewed: 0
};

export const medicalRecords = [];

export const contradictions = [
  {
    id: 1,
    field: "Allergy",
    hospitalA: "Hospital A",
    valueA: "Penicillin",
    dateA: "12 Aug 2026",
    hospitalB: "Hospital B",
    valueB: "No Known Allergy",
    dateB: "18 Aug 2026",
    status: "Needs Professional Verification"
  }
];

export const medicalTimeline = [];

export const reviewedItems = [];
