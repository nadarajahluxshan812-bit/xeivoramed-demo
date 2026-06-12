import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { DemoBadge } from "../components/DemoBadge";
import { connectedSources, plannedSources } from "../data/sources";
import type { DataSource } from "../types";

function SourceRow({ source }: { source: DataSource }) {
  const planned = source.status === "planned";
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-card">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
          planned ? "bg-slate-100 text-slate-400" : "bg-pulledsoft text-brand"
        }`}
      >
        {source.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-tight text-slate-900">{source.name}</p>
        <p className="truncate text-xs text-slate-500">{source.note ?? source.provides}</p>
      </div>
      {planned ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          <Clock3 size={12} /> Planned
        </span>
      ) : (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-verifiedsoft px-2.5 py-1 text-[11px] font-semibold text-verified">
          <CheckCircle2 size={12} /> Connected
        </span>
      )}
    </div>
  );
}

export function ConnectedSources() {
  return (
    <div className="px-5 pb-8 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-coral">Data sources</p>
          <h1 className="mt-0.5 text-2xl font-bold text-slate-900">Connected sources</h1>
        </div>
        <DemoBadge label="Demo data" />
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Each connection is a one-time patient consent — and is revocable at any time.
      </p>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Connected</p>
      <div className="mt-2 space-y-2.5">
        {connectedSources.map((s) => (
          <SourceRow key={s.id} source={s} />
        ))}
      </div>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Planned</p>
      <div className="mt-2 space-y-2.5">
        {plannedSources.map((s) => (
          <SourceRow key={s.id} source={s} />
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-pulledsoft/70 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand" />
        <p className="text-[13px] leading-relaxed text-slate-600">
          XeivoraMed never stores source passwords. Connecting grants read-only, scoped access that the
          patient can revoke from this screen — instantly cutting off future pulls.
        </p>
      </div>
    </div>
  );
}
