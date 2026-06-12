# XeivoraMed — Prototype

A polished, mobile-first **demo** of XeivoraMed, a verified patient health-identity
platform. Built for investor & partner meetings. **All data is mocked** — there are
no real backend or registry integrations yet.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Use the bottom tab bar to move between the six screens.

## The core idea: provenance

Every medical field carries a **provenance tag** showing where it came from and how
trustworthy it is:

| State | Meaning | Colour |
|-------|---------|--------|
| **Pulled** | Fetched live from a connected source | Blue |
| **Verified** | Confirmed/attested by a clinical source | Green |
| **Self-reported** | Entered by the patient, unverified | Amber |

`ProvenanceTag` is the central reusable component.

## Screens

1. **Clinic onboarding** — provider enters a Health ID and pulls a verified record (animated mock).
2. **Patient passport** — six critical fields, each provenance-tagged.
3. **Connected sources** — connected & planned data sources; consent is one-time and revocable.
4. **Emergency view** — dark, high-contrast, critical-first; severe allergy flagged.
5. **Access log** — append-only timeline of who accessed the passport and why.
6. **Physical card** — a card holding only a secure pointer (QR), never medical data.

## Connecting to the live backend

The data layer ([`src/lib/api.ts`](src/lib/api.ts)) talks to the XeivoraMed
backend when it is reachable, and **falls back to the bundled demo data**
otherwise — so this prototype always runs standalone. Each wired screen shows a
**Live API** / **Demo data** badge so it is never ambiguous which is in play.

Wired screens → endpoints:
- **Clinic onboarding** → `POST /providers/pull-record` (auto-logs-in the demo provider)
- **Patient passport** → `GET /me/passport`
- **Emergency view** → `GET /emergency/:xvmId`
- **Access log** → `GET /me/access-log`

(Connected sources & physical card stay on demo data — labelled accordingly.)

To run against the real API:

```bash
# 1. Start the backend (../xeivoramed-backend)
cd ../xeivoramed-backend && docker compose up --build

# 2. Point this app at it (default is http://localhost:4000)
cp .env.example .env      # edit VITE_API_URL if needed
npm run dev               # run on http://localhost:5173 (in the backend's CORS list)
```

Demo logins come from the backend seed (`anika@demo.xeivora` / `nimal@demo.xeivora`,
both `Passw0rd!demo`); the app auto-authenticates so the wired flows just work.

## Tech

React + Vite + TypeScript · Tailwind CSS · React Router · Poppins.

## Extending into a real app

- Mock data lives in [`src/data`](src/data) — swap these for API responses.
- Every integration point is marked with a `// TODO: replace with real …` comment.
- Reusable components: `ProvenanceTag`, `FieldCard`, `PhoneFrame`, `Logo`, `DemoBadge`, `BottomNav`.
- Screens labelled with a **Demo / Concept** badge are the not-yet-built integrations
  (clinic pull, connected sources, physical card) — never present them as live.
