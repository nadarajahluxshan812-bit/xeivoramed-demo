// Backend wiring. The data layer talks to the XeivoraMed API when it is
// reachable, and falls back to bundled demo data otherwise (so the prototype
// still runs standalone for investor demos).
//
// Point this at your running backend (see ../xeivoramed-backend). The backend's
// CORS_ORIGIN must include this frontend's origin (default http://localhost:5173).

// API base URL. Defaults to EMPTY → the app runs in pure demo mode and makes
// NO network calls (so a public deployment with no backend throws no errors and
// shows bundled demo data everywhere). Set VITE_API_URL to a deployed backend
// (e.g. https://api.xeivora.com) to wire the live flows.
export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").trim();

/** Whether a backend is configured. When false, the data layer skips fetches. */
export const API_ENABLED = API_URL.length > 0;

// Demo credentials created by the backend seed script. In a real product these
// would come from an actual login screen — here we auto-login so the wired demo
// "just works" against the seeded database.
export const DEMO_PROVIDER = { email: "nimal@demo.xeivora", password: "Passw0rd!demo" };
export const DEMO_PATIENT = { email: "anika@demo.xeivora", password: "Passw0rd!demo" };

export const DEMO_XVM_ID = "XVM-LK-4F8A-7LQ9";
