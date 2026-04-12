import { AnalyticsEvent, AnalyticsEventName } from "@/lib/types";

const EVENTS_KEY = "gavejo_demo_events_v1";
export const EVENTS_CHANGED_EVENT = "gavejo:events-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAnalyticsEvents() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

function writeEvents(events: AnalyticsEvent[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-200)));
    window.dispatchEvent(new CustomEvent(EVENTS_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  sourcePage: string,
  metadata: AnalyticsEvent["metadata"] = {}
) {
  if (!isBrowser()) return;
  const event: AnalyticsEvent = {
    eventName,
    sourcePage,
    timestamp: new Date().toISOString(),
    metadata
  };
  const events = getAnalyticsEvents();
  writeEvents([...events, event]);
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  }).catch(() => {
    // Keep local event trail if server persistence is unavailable.
  });
}

export function subscribeEvents(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === EVENTS_KEY) listener();
  };

  window.addEventListener(EVENTS_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(EVENTS_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export async function syncEventsFromServer() {
  if (!isBrowser()) return getAnalyticsEvents();
  try {
    const response = await fetch("/api/events", { cache: "no-store" });
    if (!response.ok) return getAnalyticsEvents();
    const data = (await response.json()) as { events: AnalyticsEvent[] };
    if (!Array.isArray(data.events)) return getAnalyticsEvents();
    writeEvents(data.events);
    return data.events;
  } catch {
    return getAnalyticsEvents();
  }
}
