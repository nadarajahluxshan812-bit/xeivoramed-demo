import { Siren, FileUp, Eye, ShieldCheck, type LucideIcon } from "lucide-react";
import { LiveBadge } from "../components/LiveBadge";
import { useApi } from "../lib/useApi";
import { getAccessLog, type AccessLogEntry } from "../lib/api";
import { accessLog } from "../data/accessLog";
import type { AccessEntry, AccessTag } from "../types";

const TAG_STYLE: Record<AccessTag, { chip: string; Icon: LucideIcon; avatar: string }> = {
  emergency: { chip: "bg-coral/10 text-coral", Icon: Siren, avatar: "bg-coral/15 text-coral" },
  "record update": { chip: "bg-pulledsoft text-brand", Icon: FileUp, avatar: "bg-pulledsoft text-brand" },
  routine: { chip: "bg-slate-100 text-slate-500", Icon: Eye, avatar: "bg-slate-100 text-slate-500" },
  consent: { chip: "bg-verifiedsoft text-verified", Icon: ShieldCheck, avatar: "bg-verifiedsoft text-verified" },
};

const TAG_INITIALS: Record<AccessTag, string> = { emergency: "ER", "record update": "RX", routine: "GP", consent: "OK" };

// Maps a backend audit row onto the timeline entry the UI renders.
function tagFor(action: string): AccessTag {
  if (/EMERGENCY/.test(action)) return "emergency";
  if (/PULL|UPSERT|UPDATE|RECORD/.test(action)) return "record update";
  if (/VIEW/.test(action)) return "routine";
  return "consent";
}
function humanize(action: string): string {
  return action.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
function toEntry(e: AccessLogEntry): AccessEntry {
  const tag = tagFor(e.action);
  return {
    id: e.id,
    name: humanize(e.action),
    description: e.reason ?? `${e.actorType.toLowerCase()} · ${e.ipAddress ?? "—"}`,
    tag,
    when: new Date(e.timestamp).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
    initials: TAG_INITIALS[tag],
  };
}

export function AccessLog() {
  const { data: entries, source } = useApi<AccessEntry[]>(() => getAccessLog().then((es) => es.map(toEntry)), accessLog);

  return (
    <div className="px-5 pb-8 pt-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-coral">Transparency</p>
          <h1 className="mt-0.5 text-2xl font-bold text-slate-900">Access log</h1>
        </div>
        <LiveBadge source={source} />
      </div>
      <p className="mt-1.5 text-sm text-slate-500">
        Every view, update and consent on your passport — append-only and visible to you.
      </p>

      <ol className="mt-5 space-y-1">
        {entries.map((entry, i) => {
          const { chip, Icon, avatar } = TAG_STYLE[entry.tag];
          const last = i === entries.length - 1;
          return (
            <li key={entry.id} className="relative flex gap-3 pb-4">
              {!last && <span className="absolute left-[19px] top-11 h-[calc(100%-1.75rem)] w-px bg-slate-200" />}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${avatar}`}>
                <Icon size={17} />
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold leading-snug text-slate-900">{entry.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${chip}`}>{entry.tag}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-slate-500">{entry.description}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">{entry.when}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
