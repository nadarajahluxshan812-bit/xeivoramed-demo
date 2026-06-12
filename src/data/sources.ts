import type { DataSource } from "../types";

// ---------------------------------------------------------------------------
// MOCK DATA — connected & planned data sources.
// TODO: each "connected" source maps to a real OAuth-style consent + data API.
// ---------------------------------------------------------------------------

export const connectedSources: DataSource[] = [
  {
    id: "nic",
    name: "Sri Lanka NIC registry",
    provides: "Identity verification",
    initials: "NIC",
    status: "connected",
  },
  {
    id: "nawaloka",
    name: "Nawaloka Labs (LIS)",
    provides: "Lab results · blood group",
    initials: "NL",
    status: "connected",
  },
  {
    id: "asiri",
    name: "Asiri Health (EHR)",
    provides: "Medical history · conditions",
    initials: "AH",
    status: "connected",
  },
  {
    id: "erx",
    name: "e-Prescription network",
    provides: "Active medications",
    initials: "Rx",
    status: "connected",
  },
];

export const plannedSources: DataSource[] = [
  {
    id: "nhr",
    name: "National Health Registry",
    provides: "Nationwide records",
    initials: "NHR",
    status: "planned",
    note: "via ICTA interoperability layer",
  },
  {
    id: "nhs",
    name: "NHS UK",
    provides: "Cross-border records",
    initials: "NHS",
    status: "planned",
    note: "for diaspora & travelling patients",
  },
];
