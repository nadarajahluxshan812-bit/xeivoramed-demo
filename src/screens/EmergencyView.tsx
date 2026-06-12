import { ShieldCheck, Lock } from "lucide-react";
import { FieldCard } from "../components/FieldCard";
import { LiveBadge } from "../components/LiveBadge";
import { useApi } from "../lib/useApi";
import { emergencyAccess } from "../lib/api";
import { DEMO_XVM_ID } from "../config";
import { patient, emergencyFields } from "../data/patient";

export function EmergencyView() {
  // Live from GET /emergency/:xvmId — the backend returns ONLY the six critical
  // fields (data minimisation). Falls back to demo data if the API is down.
  const { data, source } = useApi(() => emergencyAccess(DEMO_XVM_ID), {
    patient: { xvmId: patient.healthId, name: patient.name },
    fields: emergencyFields,
  });

  const allergy = data.fields.find((f) => f.id === "allergies");
  const rest = data.fields.filter((f) => f.id !== "allergies");

  return (
    <div className="min-h-full bg-emergency px-5 pb-8 pt-10 text-white">
      {/* Emergency banner */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-coral">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-coral animate-pulsering" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
          </span>
          Emergency access
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
          <ShieldCheck size={13} /> Verified provider
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-xs text-blue-200/70">
          {patient.emergencyProvider} · {patient.emergencyFacility}
        </p>
        <LiveBadge source={source} />
      </div>

      {/* Patient identity */}
      <div className="mt-5 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold">{data.patient.name}</h1>
        <p className="font-mono text-xs tracking-wide text-blue-200">{data.patient.xvmId}</p>
        <p className="mt-0.5 text-sm text-blue-100/80">
          {patient.age} · {patient.city}
        </p>
      </div>

      {/* Severe allergy — flagged prominently */}
      {allergy && (
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-coral">⚠ Severe allergy</p>
          <FieldCard field={allergy} variant="dark" alert />
        </div>
      )}

      {/* Other critical fields */}
      <div className="mt-3 grid grid-cols-1 gap-2.5">
        {rest.map((f) => (
          <FieldCard key={f.id} field={f} variant="dark" />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-3.5">
        <Lock size={15} className="mt-0.5 shrink-0 text-blue-200/70" />
        <p className="text-[12px] leading-relaxed text-blue-100/80">
          This access is logged and the patient is notified. Minimum data shown under emergency consent.
        </p>
      </div>
    </div>
  );
}
