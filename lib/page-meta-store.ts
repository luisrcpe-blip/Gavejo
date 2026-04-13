import { PageMeta } from "@/lib/types";

const PAGE_META_KEY = "gavejo_demo_page_meta_v1";
export const PAGE_META_CHANGED_EVENT = "gavejo:page-meta-changed";

const DEFAULT_PAGE_META: PageMeta[] = [
  {
    key: "home",
    title: "Inicio",
    route: "/",
    h1: "Web corporativa orientada a captación y posicionamiento técnico",
    seoTitle: "Gavejo Demo V3 | Inicio",
    seoDescription: "Demo corporativa con enfoque comercial y técnico."
  },
  {
    key: "fachadas",
    title: "Solución Fachadas",
    route: "/soluciones/fachadas",
    h1: "Fachadas y revestimientos de madera con criterio técnico",
    seoTitle: "Fachadas y Revestimientos | Gavejo",
    seoDescription: "Landing de solución para envolventes y revestimientos."
  },
  {
    key: "tantimber",
    title: "Material Termo tratada",
    route: "/materiales/termo-tratada",
    h1: "Madera termo tratada para fachadas, deck y envolventes",
    seoTitle: "Tantimber | Gavejo",
    seoDescription: "Landing de material técnico para exterior e interior."
  },
  {
    key: "contacto",
    title: "Contacto",
    route: "/contacto",
    h1: "Solicite información para su proyecto",
    seoTitle: "Contacto | Gavejo",
    seoDescription: "Formulario y WhatsApp para contacto directo."
  }
];

function isBrowser() {
  return typeof window !== "undefined";
}

function readPageMeta() {
  if (!isBrowser()) return DEFAULT_PAGE_META;
  try {
    const raw = window.localStorage.getItem(PAGE_META_KEY);
    if (!raw) return DEFAULT_PAGE_META;
    return JSON.parse(raw) as PageMeta[];
  } catch {
    return DEFAULT_PAGE_META;
  }
}

function writePageMeta(value: PageMeta[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(PAGE_META_KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(PAGE_META_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

export function getPageMeta() {
  return readPageMeta();
}

export async function savePageMeta(value: PageMeta[]) {
  const response = await fetch("/api/state/page-meta", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value })
  });

  if (!response.ok) {
    throw new Error("Error al guardar los metadatos de página");
  }

  writePageMeta(value);
}

export async function syncPageMetaFromServer() {
  if (!isBrowser()) return DEFAULT_PAGE_META;
  try {
    const response = await fetch("/api/state/page-meta", { cache: "no-store" });
    if (!response.ok) return getPageMeta();
    const data = (await response.json()) as { value: PageMeta[] | null };
    if (!data.value || !Array.isArray(data.value)) return getPageMeta();
    writePageMeta(data.value);
    return data.value;
  } catch {
    return getPageMeta();
  }
}

export function subscribePageMeta(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === PAGE_META_KEY) listener();
  };

  window.addEventListener(PAGE_META_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(PAGE_META_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}
