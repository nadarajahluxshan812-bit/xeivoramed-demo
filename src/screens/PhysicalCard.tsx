import { QRCodeSVG } from "qrcode.react";
import { BatteryWarning, ShieldOff, RotateCcw, type LucideIcon } from "lucide-react";
import { Logo } from "../components/Logo";
import { DemoBadge } from "../components/DemoBadge";
import { patient } from "../data/patient";

// The QR encodes only a secure pointer — never medical data. A verified
// provider's device resolves it server-side.
// TODO: replace with a signed, rotating pointer issued by the backend.
const POINTER_URL = `https://xeivora.med/p/${patient.healthId}`;

const HIGHLIGHTS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: BatteryWarning, title: "Works when the phone is locked or dead", body: "A physical fallback for the worst moment." },
  { Icon: ShieldOff, title: "No medical data on the card", body: "Only a secure pointer — useless if found." },
  { Icon: RotateCcw, title: "Revocable if lost", body: "Deactivate the pointer; issue a new card." },
];

export function PhysicalCard() {
  return (
    <div className="px-5 pb-8 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-coral">Concept</p>
          <h1 className="mt-0.5 text-2xl font-bold text-slate-900">Physical card</h1>
        </div>
        <DemoBadge label="Concept" />
      </div>

      {/* The card visual */}
      <div className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-5 text-white shadow-frame">
        <div className="flex items-start justify-between">
          <Logo size={30} showWordmark light />
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-blue-100">
            HEALTH ID
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-blue-200">Cardholder</p>
            <p className="truncate text-lg font-bold">{patient.name}</p>
            <p className="mt-1 font-mono text-sm tracking-wider text-blue-100">{patient.healthId}</p>
          </div>
          <div className="shrink-0 rounded-xl bg-white p-2">
            <QRCodeSVG value={POINTER_URL} size={68} fgColor="#142C6E" bgColor="#FFFFFF" level="M" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[13px] leading-relaxed text-slate-500">
        The card holds <span className="font-semibold text-slate-700">no medical data</span> — only a secure
        pointer, resolved by a verified provider's device.
      </p>

      {/* Highlights */}
      <div className="mt-5 space-y-2.5">
        {HIGHLIGHTS.map(({ Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-card">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pulledsoft text-brand">
              <Icon size={18} />
            </span>
            <div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="text-[13px] text-slate-500">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
