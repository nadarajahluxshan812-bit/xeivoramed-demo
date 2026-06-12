import {
  Droplet,
  AlertTriangle,
  Pill,
  HeartPulse,
  Phone,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import type { PassportField } from "../types";
import { ProvenanceTag } from "./ProvenanceTag";

// Maps the icon key stored in mock data to a Lucide icon component, so the data
// files stay plain (no React imports).
const ICONS: Record<string, LucideIcon> = {
  droplet: Droplet,
  "alert-triangle": AlertTriangle,
  pill: Pill,
  "heart-pulse": HeartPulse,
  phone: Phone,
  "heart-handshake": HeartHandshake,
};

interface FieldCardProps {
  field: PassportField;
  /** Dark variant for the emergency provider view. */
  variant?: "light" | "dark";
  /** Coral severe-alert treatment (used for the Penicillin allergy). */
  alert?: boolean;
}

export function FieldCard({ field, variant = "light", alert = false }: FieldCardProps) {
  const Icon = ICONS[field.icon] ?? Droplet;
  const dark = variant === "dark";

  return (
    <div
      className={[
        "rounded-2xl border p-4 transition",
        dark
          ? "border-white/10 bg-emergency-card"
          : "border-slate-200/80 bg-white shadow-card",
        alert ? (dark ? "!border-coral/60 !bg-coral/10" : "!border-coral/40 !bg-coral/5") : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            alert
              ? "bg-coral/15 text-coral"
              : dark
                ? "bg-white/10 text-blue-200"
                : "bg-pulledsoft text-brand",
          ].join(" ")}
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <p className={`text-[11px] font-medium uppercase tracking-wide ${dark ? "text-blue-200/70" : "text-slate-400"}`}>
            {field.label}
          </p>
          <p className={`mt-0.5 font-semibold leading-snug ${dark ? "text-white" : "text-slate-900"}`}>
            {field.value}
            {field.detail && (
              <span className={`ml-1.5 text-sm font-medium ${alert ? "text-coral" : dark ? "text-blue-200/80" : "text-slate-500"}`}>
                · {field.detail}
              </span>
            )}
          </p>
          <div className="mt-2">
            <ProvenanceTag state={field.provenance} source={field.source} variant={variant} />
          </div>
        </div>
      </div>
    </div>
  );
}
