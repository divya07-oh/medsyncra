// mockDataStore.js
// A robust utility to handle role-aware shared mock state across simulated sessions

const ACCESS_REQUESTS_KEY = "mockAccessRequests";
const ANALYSIS_REQUESTS_KEY = "mockAnalysisRequests";
const MEDICATIONS_KEY = "mockMedications";
const NOTIFICATIONS_KEY = "mockNotifications";

const initialAccessRequests = [
  {
    id: "access-001",
    patientId: "MS-DEMO-1001",
    requestingDoctorId: "DOC-001",
    receivingDoctorId: "DOC-002", // Dr. Sarah Smith
    hospital: "Green Valley Hospital",
    reason: "Need access to review previous medical records",
    createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: "pending"
  }
];

const initialAnalysisRequests = [
  {
    id: "analysis-001",
    patientId: "MS-DEMO-1001",
    doctorId: "DOC-001",
    records: ["REC-001", "REC-002"],
    message: "Please review my recent test results for any contradictions.",
    createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: "pending"
  }
];

const initialMedications = [
  { id: "med-001", patientId: "MS-DEMO-1001", name: "Metformin 500 mg", schedule: "08:00 AM", status: "Upcoming", lastActionDate: null },
  { id: "med-002", patientId: "MS-DEMO-1001", name: "Atorvastatin 20 mg", schedule: "08:00 PM", status: "Upcoming", lastActionDate: null }
];

const initialNotifications = [
  { id: "notif-001", patientId: "MS-DEMO-1001", title: "Medication Reminder", message: "Metformin 500 mg is scheduled for 8:00 AM.", time: "08:00 AM", read: false }
];

export const initializeMockStore = () => {
  if (!localStorage.getItem(ACCESS_REQUESTS_KEY)) {
    localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify(initialAccessRequests));
  }
  if (!localStorage.getItem(ANALYSIS_REQUESTS_KEY)) {
    localStorage.setItem(ANALYSIS_REQUESTS_KEY, JSON.stringify(initialAnalysisRequests));
  }
  if (!localStorage.getItem(MEDICATIONS_KEY)) {
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(initialMedications));
  }
  if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(initialNotifications));
  }
};

// --- Access Requests ---
export const getAccessRequests = () => JSON.parse(localStorage.getItem(ACCESS_REQUESTS_KEY) || "[]");
export const saveAccessRequests = (reqs) => localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify(reqs));

export const addAccessRequest = (request) => {
  const reqs = getAccessRequests();
  reqs.unshift(request);
  saveAccessRequests(reqs);
};

export const updateAccessRequestStatus = (id, status) => {
  const reqs = getAccessRequests();
  const index = reqs.findIndex(r => r.id === id);
  if (index !== -1) {
    reqs[index].status = status;
    saveAccessRequests(reqs);
  }
};

// --- Analysis Requests ---
export const getAnalysisRequests = () => JSON.parse(localStorage.getItem(ANALYSIS_REQUESTS_KEY) || "[]");
export const saveAnalysisRequests = (reqs) => localStorage.setItem(ANALYSIS_REQUESTS_KEY, JSON.stringify(reqs));

export const addAnalysisRequest = (request) => {
  const reqs = getAnalysisRequests();
  reqs.unshift(request);
  saveAnalysisRequests(reqs);
};

export const updateAnalysisRequestStatus = (id, status) => {
  const reqs = getAnalysisRequests();
  const index = reqs.findIndex(r => r.id === id);
  if (index !== -1) {
    reqs[index].status = status;
    saveAnalysisRequests(reqs);
  }
};

// --- Medications ---
export const getMedications = () => JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || "[]");
export const saveMedications = (meds) => localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(meds));

export const updateMedicationStatus = (id, status) => {
  const meds = getMedications();
  const index = meds.findIndex(m => m.id === id);
  if (index !== -1) {
    meds[index].status = status;
    meds[index].lastActionDate = new Date().toISOString();
    saveMedications(meds);
  }
};

// --- Notifications ---
export const getNotifications = () => JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || "[]");
export const saveNotifications = (notifs) => localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));

export const markNotificationRead = (id) => {
  const notifs = getNotifications();
  const index = notifs.findIndex(n => n.id === id);
  if (index !== -1) {
    notifs[index].read = true;
    saveNotifications(notifs);
  }
};
