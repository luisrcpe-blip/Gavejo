import { LandingOverride, LandingOverrideMap } from "@/lib/types";

const LANDING_OVERRIDES_KEY = "gavejo_demo_landing_overrides_v1";
export const LANDING_OVERRIDES_CHANGED_EVENT = "gavejo:landing-overrides-changed";

const DEFAULT_OVERRIDES: LandingOverrideMap = {
  fachadas: {
    active: true,
    heroTitle: "Fachadas y revestimientos de biomateriales avanzados",
    heroDescription:
      "Landing orientada a captacion para proyectos de fachada ventilada, revestimiento continuo y rehabilitacion premium con trazabilidad y enfoque tecnico.",
    heroImage: "PH-HERO-FACHADAS-001",
    ctaPrimaryLabel: "Solicitar informacion"
  },
  "termo-tratada": {
    active: true,
    heroTitle: "Madera termo tratada para fachadas, deck y sistemas exteriores",
    heroDescription:
      "Landing centrada en el material: fundamentos termodinamicos, rendimiento biologico y especificaciones para arquitectura y paisajismo.",
    heroImage: "PH-HERO-TERMO-001",
    ctaPrimaryLabel: "Solicitar informacion"
  }
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readOverrides(): LandingOverrideMap {
  if (!isBrowser()) return DEFAULT_OVERRIDES;

  try {
    const raw = window.localStorage.getItem(LANDING_OVERRIDES_KEY);
    if (!raw) return DEFAULT_OVERRIDES;
    const parsed = JSON.parse(raw) as Partial<LandingOverrideMap>;
    return {
      fachadas: { ...DEFAULT_OVERRIDES.fachadas, ...(parsed.fachadas ?? {}) },
      "termo-tratada": {
        ...DEFAULT_OVERRIDES["termo-tratada"],
        ...(parsed["termo-tratada"] ?? {})
      }
    };
  } catch {
    return DEFAULT_OVERRIDES;
  }
}

function writeOverrides(overrides: LandingOverrideMap) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(LANDING_OVERRIDES_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent(LANDING_OVERRIDES_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

export function getLandingOverrides() {
  return readOverrides();
}

export function getLandingOverride(slug: string): LandingOverride {
  const overrides = readOverrides();
  return overrides[slug] ?? {
    active: true,
    heroTitle: "",
    heroDescription: "",
    heroImage: "",
    ctaPrimaryLabel: "Solicitar informacion"
  };
}

export async function saveLandingOverrides(overrides: LandingOverrideMap) {
  const response = await fetch("/api/state/landing-overrides", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: overrides })
  });

  if (!response.ok) {
    throw new Error("Landing overrides persistence failed");
  }

  writeOverrides(overrides);
}

export async function saveLandingOverride(slug: string, patch: Partial<LandingOverride>) {
  const current = readOverrides();
  const base = current[slug] ?? {
    active: true,
    heroTitle: "",
    heroDescription: "",
    heroImage: "",
    ctaPrimaryLabel: "Solicitar informacion"
  };
  const next = { ...current, [slug]: { ...base, ...patch } };
  await saveLandingOverrides(next);
}

export function subscribeLandingOverrides(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === LANDING_OVERRIDES_KEY) listener();
  };

  window.addEventListener(LANDING_OVERRIDES_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(LANDING_OVERRIDES_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export async function syncLandingOverridesFromServer() {
  if (!isBrowser()) return DEFAULT_OVERRIDES;
  try {
    const response = await fetch("/api/state/landing-overrides", { cache: "no-store" });
    if (!response.ok) return getLandingOverrides();
    const data = (await response.json()) as { value: LandingOverrideMap | null };
    if (!data.value) return getLandingOverrides();
    const next: LandingOverrideMap = {
      fachadas: { ...DEFAULT_OVERRIDES.fachadas, ...(data.value.fachadas ?? {}) },
      "termo-tratada": {
        ...DEFAULT_OVERRIDES["termo-tratada"],
        ...(data.value["termo-tratada"] ?? {})
      }
    };
    writeOverrides(next);
    return next;
  } catch {
    return getLandingOverrides();
  }
}
