// Mock authentication data for hackathon prototype only.
// Do NOT expose this as a real authentication system.

export const mockPatient = {
  id: "MS-DEMO-1001",
  name: "Arun Kumar",
  password: "Password@123",
  phone: "+91 9876543210",
  email: "arun.kumar@example.com"
};

export const dashboardOverview = {
  totalRecords: 3,
  providers: 3,
  potentialContradictions: 1,
  professionallyReviewed: 0
};

export const medicalRecords = [
  {
    id: "REC-001",
    title: "Endocrinology Visit",
    provider: "City Care Hospital",
    date: "12 Aug 2026",
    fileSize: "1.2 MB",
    fileName: "city_care_12082026.pdf",
    extractedData: {
      allergy: "Penicillin",
      bloodGroup: "O+",
      medication: "Metformin",
      diagnosis: "Diabetes"
    }
  },
  {
    id: "REC-002",
    title: "General Checkup",
    provider: "Apollo Medical Center",
    date: "18 Aug 2026",
    fileSize: "2.4 MB",
    fileName: "apollo_18082026.pdf",
    extractedData: {
      allergy: "No known allergy",
      bloodGroup: "O+",
      medication: "Metformin",
      diagnosis: "Diabetes"
    }
  },
  {
    id: "REC-003",
    title: "Follow-up Consultation",
    provider: "Green Valley Hospital",
    date: "22 Aug 2026",
    fileSize: "1.8 MB",
    fileName: "green_valley_22082026.pdf",
    extractedData: {
      allergy: "Penicillin",
      bloodGroup: "O+",
      medication: "Glimepiride",
      diagnosis: "Diabetes"
    }
  }
];

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
