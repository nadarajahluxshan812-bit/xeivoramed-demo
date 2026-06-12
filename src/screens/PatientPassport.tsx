import { Link } from "react-router-dom";
import { ShieldCheck, Siren } from "lucide-react";
import { Logo } from "../components/Logo";
import { FieldCard } from "../components/FieldCard";
import { LiveBadge } from "../components/LiveBadge";
import { useApi } from "../lib/useApi";
import { getPassport } from "../lib/api";
import { patient, passportFields } from "../data/patient";

export function PatientPassport() {
  // Live from GET /me/passport; falls back to bundled demo data if the API is down.
  const { data, source } = useApi(getPassport, {
    patient: { xvmId: patient.healthId, name: patient.name, identityVerified: patient.identityVerified },
    fields: passportFields,
  });

  return (
    <div className="pb-8">
      {/* Deep-blue gradient header */}
      <header className="bg-gradient-to-br from-brand to-brand-dark px-5 pb-6 pt-10 text-white">
        <div className="flex items-center justify-between">
          <Logo size={30} showWordmark light />
          {data.patient.identityVerified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
              <ShieldCheck size={13} /> Identity verified
            </span>
          )}
        </div>

        <div className="mt-5">
          <p className="font-mono text-xs tracking-wide text-blue-200">{data.patient.xvmId}</p>
          <h1 className="mt-1 text-2xl font-bold">{data.patient.name}</h1>
          <p className="text-sm text-blue-100">
            {patient.age} · {patient.city}
          </p>
        </div>
      </header>

      <div className="px-5">
        {/* Emergency CTA */}
        <Link
          to="/emergency"
          className="-mt-4 flex items-center justify-center gap-2 rounded-2xl bg-coral py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:brightness-105 active:translate-y-px"
        >
          <Siren size={18} /> Emergency Passport
        </Link>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Critical fields</p>
          <LiveBadge source={source} />
        </div>

        <div className="mt-2 space-y-2.5">
          {data.fields.map((f) => (
            <FieldCard key={f.id} field={f} alert={f.id === "allergies"} />
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">
          Every field shows its source and verification state. Patient-owned · revocable at any time.
        </p>
      </div>
    </div>
  );
}
