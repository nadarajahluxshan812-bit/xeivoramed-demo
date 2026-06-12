import { FlaskConical } from "lucide-react";

// Honest labelling for screens that represent not-yet-built integrations.
// Keeps the prototype from ever being mistaken for a live, connected system.

export function DemoBadge({ label = "Demo · not a live integration", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-selfr ${className}`}
    >
      <FlaskConical size={12} />
      {label}
    </span>
  );
}
