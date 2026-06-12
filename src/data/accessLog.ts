import type { AccessEntry } from "../types";

// ---------------------------------------------------------------------------
// MOCK DATA — access log timeline.
// TODO: replace with the real append-only audit log from the XeivoraMed backend.
// ---------------------------------------------------------------------------

export const accessLog: AccessEntry[] = [
  {
    id: "1",
    name: "National Hospital · A&E",
    description: "Emergency access — minimum data set shown",
    tag: "emergency",
    when: "Today · 02:14",
    initials: "NH",
  },
  {
    id: "2",
    name: "Asiri Health",
    description: "Uploaded discharge summary to your record",
    tag: "record update",
    when: "Yesterday · 16:40",
    initials: "AH",
  },
  {
    id: "3",
    name: "Dr. Silva · Family GP",
    description: "Routine record view during consultation",
    tag: "routine",
    when: "3 days ago",
    initials: "DS",
  },
  {
    id: "4",
    name: "Anika Karunaratne",
    description: "Consent given during clinic onboarding",
    tag: "consent",
    when: "12 Mar 2026",
    initials: "AK",
  },
];
