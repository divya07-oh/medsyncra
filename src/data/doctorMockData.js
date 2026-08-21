// Mock data for doctor authentication prototype only.
export const mockDoctor = {
  hospitalId: "HOSP-001",
  doctorId: "DOC-001",
  medicalLicenceNumber: "LIC-001",
  password: "Doctor@123",
  
  profile: {
    name: "Dr. Arun Kumar",
    doctorId: "DOC-001",
    hospital: "City Care Hospital",
    hospitalId: "HOSP-001",
    medicalLicenceNumber: "LIC-001",
    specialization: "General Medicine",
    status: "Authorized for Demo"
  }
};

export const doctorDashboardStats = {
  authorizedPatients: 12,
  pendingReviews: 4,
  potentialContradictions: 3,
  completedReviews: 8
};

export const mockPatients = [
  { id: "PT-001", name: "Divya V", records: 4, contradictions: 1, lastUpdated: "18 Aug 2026" },
  { id: "PT-002", name: "Rahul S", records: 2, contradictions: 1, lastUpdated: "17 Aug 2026" },
  { id: "PT-003", name: "Priya M", records: 5, contradictions: 1, lastUpdated: "16 Aug 2026" }
];

export const mockPatientRecords = [
  { id: "REC-01", patientId: "PT-001", title: "Allergy Information", provider: "Hospital A", type: "Medical Report", date: "12 Aug 2026", fileName: "allergy_info_A.pdf" },
  { id: "REC-02", patientId: "PT-001", title: "Updated Allergy Assessment", provider: "Hospital B", type: "Medical Report", date: "18 Aug 2026", fileName: "allergy_info_B.pdf" }
];

export const mockReviews = [
  {
    id: "REV-01",
    patientId: "PT-001",
    patientName: "Divya V",
    field: "Allergy",
    priority: "High",
    date: "18 Aug 2026",
    status: "Needs Review",
    recordA: { provider: "Hospital A", date: "12 Aug 2026", value: "Penicillin" },
    recordB: { provider: "Hospital B", date: "18 Aug 2026", value: "No Known Allergy" }
  },
  {
    id: "REV-02",
    patientId: "PT-002",
    patientName: "Rahul S",
    field: "Medication Information",
    priority: "Medium",
    date: "17 Aug 2026",
    status: "Needs Review",
    recordA: { provider: "Clinic X", date: "Jan 2026", value: "Metformin 500mg" },
    recordB: { provider: "Clinic Y", date: "Aug 2026", value: "Metformin 1000mg" }
  },
  {
    id: "REV-03",
    patientId: "PT-003",
    patientName: "Priya M",
    field: "Blood Group",
    priority: "Medium",
    date: "16 Aug 2026",
    status: "Needs Review",
    recordA: { provider: "Hospital A", date: "2024", value: "O+" },
    recordB: { provider: "Hospital C", date: "2026", value: "A+" }
  }
];

export const mockVerificationHistory = [
  { id: "VH-01", patientId: "PT-001", issue: "Asthma Diagnosis", status: "Verified", verifiedBy: "Dr. Arun Kumar", date: "21 Aug 2026", icon: "✓" },
  { id: "VH-02", patientId: "PT-002", issue: "Surgical History", status: "Needs More Information", verifiedBy: "Dr. Arun Kumar", date: "20 Aug 2026", icon: "ℹ" },
  { id: "VH-03", patientId: "PT-004", issue: "Dietary Restrictions", status: "Not a Contradiction", verifiedBy: "Dr. Arun Kumar", date: "19 Aug 2026", icon: "○" }
];
