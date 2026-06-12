import type { PassportField } from "../types";

// ---------------------------------------------------------------------------
// MOCK DATA — clinic onboarding "pull verified record" flow.
// Each message below maps to a real integration we would call in production.
// ---------------------------------------------------------------------------

export const pullSteps: { source: string; message: string }[] = [
  // TODO: replace with real Sri Lanka NIC registry identity-verification API.
  { source: "NIC registry", message: "Verifying identity · NIC registry" },
  // TODO: replace with real Nawaloka LIS (lab information system) integration.
  { source: "Nawaloka LIS", message: "Nawaloka LIS · pulling labs" },
  // TODO: replace with real Asiri EHR integration.
  { source: "Asiri EHR", message: "Asiri EHR · pulling history" },
  // TODO: replace with real e-Prescription network integration.
  { source: "e-Prescription", message: "e-prescription · pulling meds" },
];

/** The fields returned once the (mocked) pull completes. */
export const pulledFields: PassportField[] = [
  {
    id: "blood",
    label: "Blood group",
    value: "O Negative",
    icon: "droplet",
    provenance: "pulled",
    source: "Nawaloka Labs · LIS",
  },
  {
    id: "allergies",
    label: "Allergy",
    value: "Penicillin",
    detail: "Severe",
    icon: "alert-triangle",
    provenance: "verified",
    source: "Asiri Health · EHR",
  },
  {
    id: "medications",
    label: "Medication",
    value: "Amlodipine 5mg",
    icon: "pill",
    provenance: "pulled",
    source: "e-Prescription network",
  },
  {
    id: "conditions",
    label: "Condition",
    value: "Hypertension",
    icon: "heart-pulse",
    provenance: "pulled",
    source: "Asiri Health · EHR",
  },
];
