import { useEffect, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PhoneFrame } from "./components/PhoneFrame";
import { BottomNav } from "./components/BottomNav";
import { ClinicOnboarding } from "./screens/ClinicOnboarding";
import { PatientPassport } from "./screens/PatientPassport";
import { ConnectedSources } from "./screens/ConnectedSources";
import { EmergencyView } from "./screens/EmergencyView";
import { AccessLog } from "./screens/AccessLog";
import { PhysicalCard } from "./screens/PhysicalCard";

function RedirectToMarketingHome() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return null;
}

// The phone-framed demo shell, used for every in-app screen.
function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="/"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition hover:text-brand"
      >
        <ArrowLeft size={15} /> Home
      </a>
      <PhoneFrame>
        <main className="no-scrollbar flex-1 overflow-y-auto">{children}</main>
        <BottomNav />
      </PhoneFrame>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* The product demo — phone-framed. */}
      <Route path="/clinic" element={<AppShell><ClinicOnboarding /></AppShell>} />
      <Route path="/passport" element={<AppShell><PatientPassport /></AppShell>} />
      <Route path="/sources" element={<AppShell><ConnectedSources /></AppShell>} />
      <Route path="/emergency" element={<AppShell><EmergencyView /></AppShell>} />
      <Route path="/log" element={<AppShell><AccessLog /></AppShell>} />
      <Route path="/card" element={<AppShell><PhysicalCard /></AppShell>} />

      <Route path="/" element={<RedirectToMarketingHome />} />
      <Route path="*" element={<RedirectToMarketingHome />} />
    </Routes>
  );
}
