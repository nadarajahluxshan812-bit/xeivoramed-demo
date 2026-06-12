// Shared domain types for the XeivoraMed prototype.

/**
 * Provenance is the heart of XeivoraMed: every medical field declares where it
 * came from and how trustworthy it is.
 *  - "pulled"        → fetched live from a connected source (blue)
 *  - "verified"      → confirmed/attested by a clinical source (green)
 *  - "self-reported" → entered by the patient, unverified (amber)
 */
export type Provenance = "pulled" | "verified" | "self-reported";

/** A single medical fact shown on a card, with its provenance + source. */
export interface PassportField {
  id: string;
  label: string;
  value: string;
  /** Optional emphasis line, e.g. "Severe" or "Husband". */
  detail?: string;
  /** Key into the icon map in FieldCard. */
  icon: string;
  provenance: Provenance;
  /** Human-readable origin, e.g. "Nawaloka Labs · LIS". */
  source: string;
}

export interface DataSource {
  id: string;
  name: string;
  provides: string;
  /** Short chip label, e.g. "NIC", "AH". */
  initials: string;
  status: "connected" | "planned";
  /** Optional note shown under planned sources. */
  note?: string;
}

export type AccessTag = "emergency" | "record update" | "routine" | "consent";

export interface AccessEntry {
  id: string;
  name: string;
  description: string;
  tag: AccessTag;
  when: string;
  initials: string;
}
