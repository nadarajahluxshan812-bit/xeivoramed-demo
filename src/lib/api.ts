import { API_URL, API_ENABLED, DEMO_PROVIDER, DEMO_PATIENT } from "../config";
import type { PassportField, Provenance } from "../types";

// ── Typed client for the XeivoraMed backend ────────────────────────────────
// Uses bearer access tokens (no cookies) to keep cross-origin calls simple.
// Auto-logs-in the seeded demo accounts on first use.

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const tokens: { patient?: string; provider?: string } = {};

async function request<T>(path: string, opts: RequestInit & { token?: string } = {}): Promise<T> {
  // No backend configured → fail fast WITHOUT a network request, so callers
  // fall back to bundled demo data and the live site stays error-free.
  if (!API_ENABLED) throw new Error("API not configured — using demo data");

  const headers: Record<string, string> = { "content-type": "application/json", ...(opts.headers as Record<string, string>) };
  if (opts.token) headers.authorization = `Bearer ${opts.token}`;

  const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) throw new ApiError(res.status, body?.message ?? res.statusText);
  return body as T;
}

async function loginPatient(): Promise<string> {
  if (tokens.patient) return tokens.patient;
  const { accessToken } = await request<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ role: "patient", ...DEMO_PATIENT }),
  });
  tokens.patient = accessToken;
  return accessToken;
}

async function loginProvider(): Promise<string> {
  if (tokens.provider) return tokens.provider;
  const { accessToken } = await request<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ role: "provider", ...DEMO_PROVIDER }),
  });
  tokens.provider = accessToken;
  return accessToken;
}

// ── Backend DTOs ────────────────────────────────────────────────────────────
interface ApiField {
  type: string;
  value: string;
  provenance: "PULLED" | "VERIFIED" | "SELF_REPORTED";
  sourceName?: string;
  source?: string;
}

const PROVENANCE_MAP: Record<ApiField["provenance"], Provenance> = {
  PULLED: "pulled",
  VERIFIED: "verified",
  SELF_REPORTED: "self-reported",
};

const FIELD_META: Record<string, { label: string; icon: string }> = {
  bloodGroup: { label: "Blood group", icon: "droplet" },
  allergy: { label: "Allergies", icon: "alert-triangle" },
  medication: { label: "Current medications", icon: "pill" },
  condition: { label: "Active conditions", icon: "heart-pulse" },
  emergencyContact: { label: "Emergency contact", icon: "phone" },
  organDonor: { label: "Organ donor", icon: "heart-handshake" },
};

/** Maps a backend field DTO onto the frontend's PassportField shape. */
export function mapField(f: ApiField): PassportField {
  const meta = FIELD_META[f.type] ?? { label: f.type, icon: "droplet" };
  // Pull a parenthetical detail (e.g. "Penicillin (Severe)") into `detail`.
  const match = f.value.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return {
    id: f.type === "allergy" ? "allergies" : f.type,
    label: meta.label,
    value: match ? match[1].trim() : f.value,
    detail: match ? match[2].trim() : undefined,
    icon: meta.icon,
    provenance: PROVENANCE_MAP[f.provenance],
    source: f.sourceName ?? f.source ?? "—",
  };
}

export interface PatientSummary {
  xvmId: string;
  name: string;
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
  try {
    await request("/health");
    return true;
  } catch {
    return false;
  }
}

/** Hero flow: provider pulls a verified record. */
export async function pullRecord(xvmId: string, reason: string): Promise<{ patient: PatientSummary; fields: PassportField[] }> {
  const token = await loginProvider();
  const data = await request<{ patient: PatientSummary; fields: ApiField[] }>("/providers/pull-record", {
    method: "POST",
    token,
    body: JSON.stringify({ xvmId, reason }),
  });
  return { patient: data.patient, fields: data.fields.map(mapField) };
}

/** Emergency access — backend returns ONLY the six critical fields. */
export async function emergencyAccess(xvmId: string): Promise<{ patient: PatientSummary; fields: PassportField[] }> {
  const token = await loginProvider();
  const data = await request<{ patient: PatientSummary; fields: ApiField[] }>(`/emergency/${encodeURIComponent(xvmId)}`, { token });
  return { patient: data.patient, fields: data.fields.map(mapField) };
}

/** Patient's own passport. */
export async function getPassport(): Promise<{ patient: PatientSummary & { identityVerified: boolean }; fields: PassportField[] }> {
  const token = await loginPatient();
  const data = await request<{ patient: PatientSummary & { identityVerified: boolean }; fields: ApiField[] }>("/me/passport", { token });
  return { patient: data.patient, fields: data.fields.map(mapField) };
}

export interface AccessLogEntry {
  id: string;
  action: string;
  reason: string | null;
  actorType: string;
  ipAddress: string | null;
  timestamp: string;
}

/** Patient's audit trail. */
export async function getAccessLog(): Promise<AccessLogEntry[]> {
  const token = await loginPatient();
  const data = await request<{ entries: AccessLogEntry[] }>("/me/access-log", { token });
  return data.entries;
}
