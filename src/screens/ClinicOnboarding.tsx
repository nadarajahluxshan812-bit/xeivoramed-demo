import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, CheckCircle2, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { Logo } from "../components/Logo";
import { DemoBadge } from "../components/DemoBadge";
import { LiveBadge } from "../components/LiveBadge";
import { FieldCard } from "../components/FieldCard";
import { pullSteps, pulledFields } from "../data/clinicPull";
import { patient } from "../data/patient";
import { pullRecord } from "../lib/api";
import type { PassportField } from "../types";

type Status = "idle" | "loading" | "result";

const STEP_MS = 750; // 4 steps ≈ 3 seconds

export function ClinicOnboarding() {
  const [healthId, setHealthId] = useState(patient.healthId);
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);

  // Result of the REAL pull-record call (or the demo fallback).
  const [fields, setFields] = useState<PassportField[]>(pulledFields);
  const [patientName, setPatientName] = useState(patient.name);
  const [live, setLive] = useState(false);

  // Cycles the source messages, then reveals the result. The animation runs in
  // parallel with the network call started in startPull().
  useEffect(() => {
    if (status !== "loading") return;
    if (step >= pullSteps.length) {
      const done = setTimeout(() => setStatus("result"), 400);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(next);
  }, [status, step]);

  function startPull() {
    setStep(0);
    setStatus("loading");
    // Real call to POST /providers/pull-record (auto-logs-in the demo provider).
    // Falls back to bundled demo data if the API is unreachable.
    pullRecord(healthId, "Clinic onboarding intake")
      .then((r) => {
        setFields(r.fields);
        setPatientName(r.patient.name);
        setLive(true);
      })
      .catch(() => {
        setFields(pulledFields);
        setPatientName(patient.name);
        setLive(false);
      });
  }

  function reset() {
    setStatus("idle");
    setStep(0);
  }

  return (
    <div className="px-5 pb-8 pt-10">
      <div className="flex items-center justify-between">
        <Logo size={32} showWordmark />
        <DemoBadge label="Demo pull" />
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-coral">Clinic onboarding</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-slate-900">Pull a verified record in seconds</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter a patient's XeivoraMed ID to pull their verified record from connected sources — with consent.
        </p>
      </div>

      {/* Input + action */}
      <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400" htmlFor="xvm-id">
          Patient XeivoraMed ID
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 focus-within:border-brand">
          <Search size={16} className="text-slate-400" />
          <input
            id="xvm-id"
            value={healthId}
            onChange={(e) => setHealthId(e.target.value)}
            disabled={status !== "idle"}
            className="w-full bg-transparent py-2.5 font-mono text-sm tracking-wide text-slate-900 outline-none disabled:opacity-60"
            placeholder="XVM-LK-0000-0000"
          />
        </div>

        {status === "idle" && (
          <button
            onClick={startPull}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-3 text-sm font-semibold text-white transition hover:brightness-105 active:translate-y-px"
          >
            <ShieldCheck size={17} /> Pull verified record
          </button>
        )}

        {status === "loading" && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-brand">
              <Loader2 size={16} className="animate-spin" />
              {pullSteps[Math.min(step, pullSteps.length - 1)].message}
            </div>
            <ul className="mt-3 space-y-2">
              {pullSteps.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <li key={s.source} className="flex items-center gap-2 text-sm">
                    {done ? (
                      <CheckCircle2 size={16} className="text-verified" />
                    ) : active ? (
                      <Loader2 size={16} className="animate-spin text-brand" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-slate-200" />
                    )}
                    <span className={done ? "text-slate-700" : active ? "text-slate-900" : "text-slate-400"}>{s.source}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Result */}
      {status === "result" && (
        <div className="mt-5">
          <div className="rounded-2xl border border-verified/30 bg-verifiedsoft/60 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-verified">
                <CheckCircle2 size={18} />
                <span className="text-sm font-semibold">Record pulled & consent logged</span>
              </div>
              <LiveBadge source={live ? "live" : "fallback"} />
            </div>
            <p className="mt-1 text-[13px] text-slate-600">Consent logged · valid 24h. The patient is notified of this access.</p>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">AK</div>
            <div>
              <p className="font-semibold text-slate-900">{patientName}</p>
              <p className="font-mono text-xs text-slate-500">{healthId}</p>
            </div>
          </div>

          <div className="mt-3 space-y-2.5">
            {fields.map((f) => (
              <FieldCard key={f.id} field={f} />
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-brand p-4 text-white">
            <Clock size={18} className="shrink-0 text-coral" />
            <p className="text-sm font-medium">
              ~14 min saved <span className="font-normal text-blue-100">vs manual intake</span>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button onClick={reset} className="text-sm font-medium text-slate-500 hover:text-slate-800">
              Pull another record
            </button>
            <Link to="/passport" className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
              View full passport <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
