import type { ReactNode } from "react";

// A phone-sized device frame so the mobile-first screens present well on a
// desktop during investor/partner demos. The screen area scrolls; the bottom
// nav is rendered by App inside the frame.

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 p-4 sm:p-6">
      <div className="relative h-[844px] max-h-[94vh] w-[390px] max-w-full rounded-[2.75rem] border border-black/5 bg-black p-2.5 shadow-frame">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.25rem] bg-white">
          {/* Notch */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}
