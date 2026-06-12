import { DownloadCloud, BadgeCheck, UserRound } from "lucide-react";
import type { Provenance } from "../types";

// The reusable provenance chip — the single most important UI primitive in
// XeivoraMed. It tells a clinician at a glance how much to trust a value and
// where it came from.

const CONFIG: Record<
  Provenance,
  { label: string; Icon: typeof DownloadCloud; light: string; dark: string }
> = {
  pulled: {
    label: "Pulled",
    Icon: DownloadCloud,
    light: "bg-pulledsoft text-brand",
    dark: "bg-brand/30 text-blue-200",
  },
  verified: {
    label: "Verified",
    Icon: BadgeCheck,
    light: "bg-verifiedsoft text-verified",
    dark: "bg-verified/25 text-emerald-300",
  },
  "self-reported": {
    label: "Self-reported",
    Icon: UserRound,
    light: "bg-selfsoft text-selfr",
    dark: "bg-selfr/25 text-amber-200",
  },
};

interface ProvenanceTagProps {
  state: Provenance;
  /** Origin string appended after the state, e.g. "Nawaloka LIS". */
  source?: string;
  /** Use the dark-theme palette (emergency view). */
  variant?: "light" | "dark";
  className?: string;
}

export function ProvenanceTag({ state, source, variant = "light", className = "" }: ProvenanceTagProps) {
  const { label, Icon, light, dark } = CONFIG[state];
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight ${
        variant === "dark" ? dark : light
      } ${className}`}
    >
      <Icon size={12} className="shrink-0" />
      <span className="truncate">
        {label}
        {source ? <span className="font-medium opacity-80"> · {source}</span> : null}
      </span>
    </span>
  );
}
