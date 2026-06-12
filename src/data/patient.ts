import type { PassportField } from "../types";

// ---------------------------------------------------------------------------
// MOCK DATA — patient identity + passport fields.
// TODO: replace with a real patient record fetched from the XeivoraMed backend
//       (resolved from the Health ID after provider verification).
// ---------------------------------------------------------------------------

export const patient = {
  healthId: "XVM-LK-4F8A-7LQ9",
  name: "Anika Karunaratne",
  age: 34,
  city: "Colombo",
  identityVerified: true,
  /** Verified provider currently viewing in the emergency demo. */
  emergencyProvider: "Dr. Nimal Fernando",
  emergencyFacility: "National Hospital · A&E",
};

/**
 * The six critical fields shown on the patient passport. Each carries a
 * provenance tag — the most important concept in the product.
 */
export const passportFields: PassportField[] = [
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
    label: "Allergies",
    value: "Penicillin",
    detail: "Severe",
    icon: "alert-triangle",
    provenance: "verified",
    source: "Asiri Health · EHR",
  },
  {
    id: "medications",
    label: "Current medications",
    value: "Amlodipine 5mg",
    detail: "Once daily",
    icon: "pill",
    provenance: "pulled",
    source: "e-Prescription network",
  },
  {
    id: "conditions",
    label: "Active conditions",
    value: "Hypertension",
    icon: "heart-pulse",
    provenance: "pulled",
    source: "Asiri Health · EHR",
  },
  {
    id: "contact",
    label: "Emergency contact",
    value: "Roshan K.",
    detail: "Husband",
    icon: "phone",
    provenance: "self-reported",
    source: "Patient self-reported",
  },
  {
    id: "donor",
    label: "Organ donor",
    value: "Registered",
    icon: "heart-handshake",
    provenance: "self-reported",
    source: "Patient self-reported",
  },
];

/** Fields surfaced in the emergency view — critical-first, allergy flagged. */
export const emergencyFields: PassportField[] = passportFields.filter((f) =>
  ["blood", "allergies", "medications", "conditions", "contact"].includes(f.id),
);
