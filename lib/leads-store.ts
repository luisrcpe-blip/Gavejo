import { Lead, LeadStatus } from "@/lib/types";

const LEADS_KEY = "gavejo_demo_leads_v1";
export const LEADS_CHANGED_EVENT = "gavejo:leads-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

function readLeads(): Lead[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent(LEADS_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

export function getLeads() {
  return readLeads().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addLead(input: {
  name: string;
  contact: string;
  message: string;
  originLanding: string;
  consent: boolean;
  utmSource?: string;
  utmCampaign?: string;
}) {
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `lead-${Date.now()}`;

  const lead: Lead = {
    id,
    name: input.name,
    contact: input.contact,
    message: input.message,
    originLanding: input.originLanding,
    status: "new",
    notes: "",
    createdAt: new Date().toISOString(),
    consent: input.consent,
    utmSource: input.utmSource,
    utmCampaign: input.utmCampaign
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    throw new Error("Lead persistence failed");
  }

  const leads = getLeads();
  writeLeads([lead, ...leads]);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const previous = getLeads();
  const next = previous.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  writeLeads(next);
  const response = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!response.ok) {
    writeLeads(previous);
    throw new Error("Lead status persistence failed");
  }
}

export async function updateLeadNotes(id: string, notes: string) {
  const previous = getLeads();
  const next = previous.map((lead) => (lead.id === id ? { ...lead, notes } : lead));
  writeLeads(next);
  const response = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notes })
  });
  if (!response.ok) {
    writeLeads(previous);
    throw new Error("Lead notes persistence failed");
  }
}

export function subscribeLeads(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === LEADS_KEY) listener();
  };

  window.addEventListener(LEADS_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(LEADS_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function leadsToCsv(leads: Lead[]) {
  const headers = [
    "id",
    "name",
    "contact",
    "message",
    "originLanding",
    "status",
    "createdAt",
    "consent",
    "utmSource",
    "utmCampaign",
    "notes"
  ];

  const escape = (value: unknown) =>
    `"${String(value ?? "").replaceAll('"', '""').replaceAll("\n", " ")}"`;

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.name,
      lead.contact,
      lead.message,
      lead.originLanding,
      lead.status,
      lead.createdAt,
      lead.consent,
      lead.utmSource ?? "",
      lead.utmCampaign ?? "",
      lead.notes
    ]
      .map(escape)
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export async function syncLeadsFromServer() {
  if (!isBrowser()) return [];
  try {
    const response = await fetch("/api/leads", { cache: "no-store" });
    if (!response.ok) return getLeads();
    const data = (await response.json()) as { leads: Lead[] };
    if (!Array.isArray(data.leads)) return getLeads();
    writeLeads(data.leads);
    return data.leads;
  } catch {
    return getLeads();
  }
}
