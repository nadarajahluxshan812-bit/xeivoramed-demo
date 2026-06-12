import { NavLink } from "react-router-dom";
import { ClipboardPlus, IdCard, Cable, Siren, History, CreditCard, type LucideIcon } from "lucide-react";

// Bottom tab bar to move between all six screens. Stays fixed at the foot of
// the phone frame.

const TABS: { to: string; label: string; Icon: LucideIcon }[] = [
  { to: "/clinic", label: "Clinic", Icon: ClipboardPlus },
  { to: "/passport", label: "Passport", Icon: IdCard },
  { to: "/sources", label: "Sources", Icon: Cable },
  { to: "/emergency", label: "Emergency", Icon: Siren },
  { to: "/log", label: "Log", Icon: History },
  { to: "/card", label: "Card", Icon: CreditCard },
];

export function BottomNav() {
  return (
    <nav className="z-20 flex shrink-0 items-stretch justify-between border-t border-slate-200 bg-white/95 px-1.5 pb-5 pt-2 backdrop-blur">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-medium transition",
              isActive ? "text-brand" : "text-slate-400 hover:text-slate-600",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  isActive ? "bg-pulledsoft" : "bg-transparent"
                }`}
              >
                <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
