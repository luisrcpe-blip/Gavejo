import { DemoSettings } from "@/lib/types";

const SETTINGS_KEY = "gavejo_demo_settings_v1";
export const SETTINGS_CHANGED_EVENT = "gavejo:settings-changed";

const DEFAULT_SETTINGS: DemoSettings = {
  whatsappNumber: "+34629633668",
  notifyEmail: "info@maderasgavejo.com",
  emailJsEnabled: false,
  mailchimpEnabled: false,
  privacyUrl: "/privacidad",
  brandMode: "clean"
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getDemoSettings(): DemoSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;

  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<DemoSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(settings: DemoSettings) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent(SETTINGS_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

export async function saveDemoSettings(settings: DemoSettings) {
  if (!isBrowser()) return;

  const response = await fetch("/api/state/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: settings })
  });

  if (!response.ok) {
    throw new Error("Settings persistence failed");
  }

  writeSettings(settings);
}

export function subscribeSettings(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === SETTINGS_KEY) listener();
  };

  window.addEventListener(SETTINGS_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(SETTINGS_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getDefaultSettings() {
  return DEFAULT_SETTINGS;
}

export async function syncSettingsFromServer() {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  try {
    const response = await fetch("/api/state/settings", { cache: "no-store" });
    if (!response.ok) return getDemoSettings();
    const data = (await response.json()) as { value: DemoSettings | null };
    if (!data.value) return getDemoSettings();
    const merged = { ...DEFAULT_SETTINGS, ...data.value };
    writeSettings(merged);
    return merged;
  } catch {
    return getDemoSettings();
  }
}
