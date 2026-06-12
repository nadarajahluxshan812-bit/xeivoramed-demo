import { Wifi, WifiOff, Loader2 } from "lucide-react";
import type { DataSource } from "../lib/useApi";

// Honest indicator of where the on-screen data came from: the live backend API
// or the bundled demo fallback.
export function LiveBadge({ source, className = "" }: { source: DataSource; className?: string }) {
  if (source === "loading") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 ${className}`}>
        <Loader2 size={12} className="animate-spin" /> Connecting…
      </span>
    );
  }
  if (source === "live") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-verifiedsoft px-2.5 py-1 text-[11px] font-semibold text-verified ${className}`}>
        <Wifi size={12} /> Live API
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-selfr ${className}`}>
      <WifiOff size={12} /> Demo data
    </span>
  );
}
