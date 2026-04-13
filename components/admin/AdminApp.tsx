"use client";

import { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  getAnalyticsEvents,
  subscribeEvents,
  syncEventsFromServer,
  trackEvent
} from "@/lib/analytics-store";
import { getBlogPosts, subscribeBlog, syncBlogFromServer, upsertBlogPost } from "@/lib/blog-store";
import {
  getLandingOverrides,
  saveLandingOverrides,
  subscribeLandingOverrides,
  syncLandingOverridesFromServer
} from "@/lib/landing-overrides-store";
import {
  getLeads,
  leadsToCsv,
  subscribeLeads,
  syncLeadsFromServer,
  updateLeadNotes,
  updateLeadStatus
} from "@/lib/leads-store";
import {
  getDemoSettings,
  saveDemoSettings,
  subscribeSettings,
  syncSettingsFromServer
} from "@/lib/settings-store";
import {
  getPageMeta,
  savePageMeta,
  subscribePageMeta,
  syncPageMetaFromServer
} from "@/lib/page-meta-store";
import {
  BlogPost,
  DemoSettings,
  LandingOverrideMap,
  Lead,
  LeadStatus,
  PageMeta
} from "@/lib/types";

type AdminModule = "dashboard" | "pages" | "landings" | "blog" | "media" | "crm" | "settings";
type DemoLeadPreview = {
  id: string;
  name: string;
  contact: string;
  originLanding: string;
  status: LeadStatus;
  createdLabel: string;
  notes: string;
};

const MODULES: Array<{
  key: AdminModule;
  label: string;
  mobileLabel?: string;
  enabled: boolean;
}> = [
  { key: "dashboard", label: "Panel", enabled: false },
  { key: "pages", label: "Páginas", enabled: false },
  { key: "landings", label: "Landings", enabled: false },
  { key: "blog", label: "Blog", enabled: false },
  { key: "media", label: "Medios", enabled: false },
  { key: "crm", label: "CRM de leads", mobileLabel: "CRM", enabled: true },
  { key: "settings", label: "Ajustes", enabled: false }
];

const CRM_DEMO_LEADS: DemoLeadPreview[] = [
  {
    id: "demo-1",
    name: "Lucia Ramos",
    contact: "lucia@estudioarco.es",
    originLanding: "Landing Fachadas",
    status: "new",
    createdLabel: "Hace un momento",
    notes: "Solicita reunión de especificación para hotel urbano."
  },
  {
    id: "demo-2",
    name: "Miguel Ortiz",
    contact: "+34 611 223 119",
    originLanding: "Landing Termotratada",
    status: "in_progress",
    createdLabel: "Hace 47 min",
    notes: "Comparando Fraké TMT vs Ayous para terraza técnica."
  },
  {
    id: "demo-3",
    name: "Nora Delgado",
    contact: "nora.delgado@constructa.eu",
    originLanding: "Landing Fachadas",
    status: "closed",
    createdLabel: "Hace 7 h",
    notes: "Lead cerrado. Envío de tarifa y catálogo confirmado."
  },
  {
    id: "demo-4",
    name: "Sergio Valls",
    contact: "sergio.valls@grupoatlas.com",
    originLanding: "Landing Termotratada",
    status: "in_progress",
    createdLabel: "Hace 13 h",
    notes: "Pendiente validación técnica con dirección facultativa."
  },
  {
    id: "demo-5",
    name: "Paula Mena",
    contact: "+34 654 882 743",
    originLanding: "Landing Fachadas",
    status: "new",
    createdLabel: "Ayer · 18:20",
    notes: "Interés en solución de revestimiento para vivienda premium."
  },
  {
    id: "demo-6",
    name: "Tomás Riu",
    contact: "tomas.riu@riuarq.com",
    originLanding: "Landing Termotratada",
    status: "closed",
    createdLabel: "12/04/2026",
    notes: "Proyecto adjudicado. Se define calendario de suministro."
  },
  {
    id: "demo-7",
    name: "Irene Costa",
    contact: "irene.costa@designlab.es",
    originLanding: "Landing Fachadas",
    status: "in_progress",
    createdLabel: "10/04/2026",
    notes: "Solicita muestra física y ficha técnica EN 350."
  }
];

function getLeadStatusLabel(status: LeadStatus) {
  if (status === "new") return "Nuevo";
  if (status === "in_progress") return "En gestión";
  return "Cerrado";
}

function ModuleIcon({ module }: { module: AdminModule }) {
  if (module === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (module === "pages") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14 3v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (module === "landings") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 9h16M9 16v4M15 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (module === "blog") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 19h14M7 16l9.6-9.6a1.8 1.8 0 0 1 2.5 0l.5.5a1.8 1.8 0 0 1 0 2.5L10 19H7v-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (module === "media") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5 17 4-4 3 3 2-2 5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (module === "crm") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 7h5M18.5 4.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminApp() {
  const [active, setActive] = useState<AdminModule>("crm");
  const [menuOpenMobile, setMenuOpenMobile] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<DemoSettings>(getDemoSettings());
  const [eventsCount, setEventsCount] = useState(0);
  const [eventBreakdown, setEventBreakdown] = useState<Record<string, number>>({});
  const [pageMeta, setPageMeta] = useState<PageMeta[]>(getPageMeta());
  const [landingOverrides, setLandingOverrides] = useState<LandingOverrideMap>(getLandingOverrides());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [pageSaveState, setPageSaveState] = useState<"idle" | "saved">("idle");
  const [landingSaveState, setLandingSaveState] = useState<"idle" | "saved">("idle");
  const [blogSaveState, setBlogSaveState] = useState<"idle" | "saved">("idle");
  const [crmError, setCrmError] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [pagesError, setPagesError] = useState<string | null>(null);
  const [landingsError, setLandingsError] = useState<string | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [comingSoonToast, setComingSoonToast] = useState<{
    visible: boolean;
    top: number;
    left: number;
    above: boolean;
  }>({
    visible: false,
    top: 0,
    left: 0,
    above: false
  });
  const [blogEditor, setBlogEditor] = useState<{
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    status: BlogPost["status"];
  }>({ title: "", excerpt: "", content: "", status: "draft" });

  useEffect(() => {
    setLeads(getLeads());
    setSettings(getDemoSettings());
    setPageMeta(getPageMeta());
    setLandingOverrides(getLandingOverrides());
    setBlogPosts(getBlogPosts());

    const events = getAnalyticsEvents();
    setEventsCount(events.length);
    setEventBreakdown(
      events.reduce<Record<string, number>>((acc, event) => {
        acc[event.eventName] = (acc[event.eventName] ?? 0) + 1;
        return acc;
      }, {})
    );

    void Promise.all([
      syncLeadsFromServer(),
      syncSettingsFromServer(),
      syncLandingOverridesFromServer(),
      syncBlogFromServer(),
      syncEventsFromServer(),
      syncPageMetaFromServer()
    ]).then(() => {
      setLeads(getLeads());
      setSettings(getDemoSettings());
      setPageMeta(getPageMeta());
      setLandingOverrides(getLandingOverrides());
      setBlogPosts(getBlogPosts());
      const synced = getAnalyticsEvents();
      setEventsCount(synced.length);
      setEventBreakdown(
        synced.reduce<Record<string, number>>((acc, event) => {
          acc[event.eventName] = (acc[event.eventName] ?? 0) + 1;
          return acc;
        }, {})
      );
    });

    const unsubLeads = subscribeLeads(() => setLeads(getLeads()));
    const unsubSettings = subscribeSettings(() => setSettings(getDemoSettings()));
    const unsubLandings = subscribeLandingOverrides(() => setLandingOverrides(getLandingOverrides()));
    const unsubBlog = subscribeBlog(() => setBlogPosts(getBlogPosts()));
    const unsubEvents = subscribeEvents(() => {
      const synced = getAnalyticsEvents();
      setEventsCount(synced.length);
      setEventBreakdown(
        synced.reduce<Record<string, number>>((acc, event) => {
          acc[event.eventName] = (acc[event.eventName] ?? 0) + 1;
          return acc;
        }, {})
      );
    });
    const unsubPages = subscribePageMeta(() => setPageMeta(getPageMeta()));

    return () => {
      unsubLeads();
      unsubSettings();
      unsubLandings();
      unsubBlog();
      unsubEvents();
      unsubPages();
    };
  }, []);

  const summary = useMemo(() => {
    const total = leads.length;
    const fresh = leads.filter((lead) => lead.status === "new").length;
    const progress = leads.filter((lead) => lead.status === "in_progress").length;
    const closed = leads.filter((lead) => lead.status === "closed").length;
    return { total, fresh, progress, closed };
  }, [leads]);

  const hasRealLeads = leads.length > 0;

  const closeRate = useMemo(() => {
    if (summary.total === 0) return 0;
    return Math.round((summary.closed / summary.total) * 100);
  }, [summary.closed, summary.total]);

  const latestLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [leads]);

  const frequentEvents = useMemo(() => {
    return Object.entries(eventBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [eventBreakdown]);

  useEffect(() => {
    setNoteDrafts((prev) => {
      const next = { ...prev };
      leads.forEach((lead) => {
        if (next[lead.id] === undefined) {
          next[lead.id] = lead.notes ?? "";
        }
      });
      return next;
    });
  }, [leads]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 840) setMenuOpenMobile(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!comingSoonToast.visible) return;
    const timeout = window.setTimeout(
      () => setComingSoonToast((prev) => ({ ...prev, visible: false })),
      2200
    );
    return () => window.clearTimeout(timeout);
  }, [comingSoonToast.visible]);

  const exportCsv = () => {
    const csv = leadsToCsv(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gavejo-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const setDraftNote = (id: string, value: string) => {
    setNoteDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const getDraftNote = (lead: Lead) => noteDrafts[lead.id] ?? lead.notes ?? "";

  const saveSettingsAction = async () => {
    try {
      setSettingsError(null);
      await saveDemoSettings(settings);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1600);
    } catch {
      setSettingsError("No se pudieron guardar los ajustes en MySQL. Revisa la conexión DB_*.");
    }
  };

  const savePagesAction = async () => {
    try {
      setPagesError(null);
      await savePageMeta(pageMeta);
      setPageSaveState("saved");
      setTimeout(() => setPageSaveState("idle"), 1600);
    } catch {
      setPagesError("No se pudieron guardar las páginas y el SEO en MySQL.");
    }
  };

  const saveLandingsAction = async () => {
    try {
      setLandingsError(null);
      await saveLandingOverrides(landingOverrides);
      setLandingSaveState("saved");
      setTimeout(() => setLandingSaveState("idle"), 1600);
    } catch {
      setLandingsError("No se pudieron guardar landings en MySQL.");
    }
  };

  const saveBlogAction = async () => {
    if (!blogEditor.title.trim() || !blogEditor.excerpt.trim() || !blogEditor.content.trim()) return;
    try {
      setBlogError(null);
      await upsertBlogPost({
        id: blogEditor.id,
        title: blogEditor.title.trim(),
        excerpt: blogEditor.excerpt.trim(),
        content: blogEditor.content.trim(),
        status: blogEditor.status
      });
      setBlogSaveState("saved");
      setTimeout(() => setBlogSaveState("idle"), 1600);
      setBlogEditor({ title: "", excerpt: "", content: "", status: "draft" });
    } catch {
      setBlogError("No se pudo guardar el blog en MySQL.");
    }
  };

  const editBlogPost = (post: BlogPost) => {
    setBlogEditor({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      status: post.status
    });
  };

  const updateLead = async (lead: Lead, nextStatus: LeadStatus) => {
    try {
      setCrmError(null);
      await updateLeadStatus(lead.id, nextStatus);
      trackEvent("lead_status_change", "admin/crm", {
        leadId: lead.id,
        fromStatus: lead.status,
        toStatus: nextStatus
      });
    } catch {
      setCrmError("No se pudo guardar el cambio en MySQL. Revisa conexion DB_* en Hostinger.");
    }
  };

  const saveLeadNote = async (leadId: string) => {
    try {
      setCrmError(null);
      await updateLeadNotes(leadId, noteDrafts[leadId] ?? "");
    } catch {
      setCrmError("No se pudieron guardar notas en MySQL. Revisa conexion DB_* en Hostinger.");
    }
  };

  const handleModuleClick = (
    event: MouseEvent<HTMLButtonElement>,
    item: (typeof MODULES)[number]
  ) => {
    if (!item.enabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      const verticalGap = 10;
      const preferAbove = rect.top > window.innerHeight * 0.68;

      setComingSoonToast({
        visible: true,
        left: rect.left + rect.width / 2,
        top: preferAbove ? rect.top - verticalGap : rect.bottom + verticalGap,
        above: preferAbove
      });
      return;
    }

    setActive(item.key);
    setMenuOpenMobile(false);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">GV</div>
          <div className="admin-brand-copy">
            <h1>GAVEJO</h1>
            <p>Panel administrativo</p>
          </div>
        </div>
        <button
          type="button"
          className={`admin-menu-toggle ${menuOpenMobile ? "is-open" : ""}`}
          onClick={() => setMenuOpenMobile((prev) => !prev)}
          aria-label={menuOpenMobile ? "Cerrar menu del panel" : "Abrir menu del panel"}
          aria-expanded={menuOpenMobile}
          aria-controls="admin-module-nav"
        >
          <span className="admin-menu-toggle-label">Modulos</span>
          <span className="mobile-menu-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav id="admin-module-nav" className={`admin-module-nav ${menuOpenMobile ? "is-open" : ""}`}>
          {MODULES.map((item) => (
            <button
              key={item.key}
              className={`nav-btn ${active === item.key ? "is-active" : ""} ${
                item.enabled ? "" : "is-disabled"
              }`}
              onClick={(event) => handleModuleClick(event, item)}
              aria-disabled={!item.enabled}
            >
              <span className="nav-icon" aria-hidden="true">
                <ModuleIcon module={item.key} />
              </span>
              <span className="nav-label nav-label-desktop">{item.label}</span>
              <span className="nav-label nav-label-mobile">{item.mobileLabel ?? item.label}</span>
              {item.key === "crm" && summary.fresh > 0 && <span className="badge-pulse">{summary.fresh}</span>}
            </button>
          ))}
        </nav>
        <button type="button" className="admin-profile-btn" aria-label="Perfil administrador">
          <span className="admin-profile-avatar">A</span>
          <span className="admin-profile-copy">
            <strong>Admin</strong>
            <small>Cuenta principal</small>
          </span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="admin-profile-arrow">
            <path d="m7 5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div
          className={`coming-soon-toast ${comingSoonToast.visible ? "is-visible" : ""} ${
            comingSoonToast.above ? "is-above" : ""
          }`}
          style={{ left: `${comingSoonToast.left}px`, top: `${comingSoonToast.top}px` }}
          role="status"
          aria-live="polite"
        >
          <span className="coming-soon-dot" />
          <span>{"\u00a1Pr\u00f3ximamente!"}</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-top">
          <div className="admin-top-copy">
            <h2>Panel de administración</h2>
            <p>Demo funcional para validación comercial y operativa.</p>
            <div className="admin-top-pills">
              <span className="admin-pill">Leads: {summary.total}</span>
              <span className="admin-pill">Nuevos: {summary.fresh}</span>
              <span className="admin-pill admin-pill-accent">Estado: Demo activa</span>
            </div>
          </div>
          <div className="admin-top-cta">Centro de control</div>
        </header>

        <p className="hint admin-intro-hint">
          Operativo en demo: CRM de leads con persistencia MySQL. Los módulos Panel, Páginas, Landings,
          Blog, Medios y Ajustes están en modo Próximamente.
        </p>

        {active === "dashboard" && (
          <section className="admin-dashboard-v2">
            <div className="admin-dashboard-head">
              <div>
                <p className="mini-kicker">Vista ejecutiva</p>
                <h3>Tablero comercial y operativo</h3>
              </div>
              <div className="admin-dashboard-search">
                <span aria-hidden="true">⌕</span>
                <input value="Seguimiento de leads y conversiones" readOnly />
              </div>
            </div>

            <div className="admin-dashboard-layout">
              <div className="admin-dashboard-main-col">
                <div className="admin-dashboard-cards">
                  <article className="admin-insight-card admin-insight-card-indigo">
                    <p>Pipeline total</p>
                    <strong>{summary.total}</strong>
                    <span>Consultas acumuladas en la demo</span>
                  </article>
                  <article className="admin-insight-card admin-insight-card-cyan">
                    <p>Leads en gestión</p>
                    <strong>{summary.progress}</strong>
                    <span>Seguimientos activos del equipo</span>
                  </article>
                  <article className="admin-insight-card admin-insight-card-violet">
                    <p>Conversión cerrada</p>
                    <strong>{closeRate}%</strong>
                    <span>Porcentaje de leads cerrados</span>
                  </article>
                </div>

                <div className="admin-kpi-row-v2">
                  <article className="admin-kpi-chip">
                    <p>Nuevos</p>
                    <strong>{summary.fresh}</strong>
                  </article>
                  <article className="admin-kpi-chip">
                    <p>Cerrados</p>
                    <strong>{summary.closed}</strong>
                  </article>
                  <article className="admin-kpi-chip">
                    <p>Eventos</p>
                    <strong>{eventsCount}</strong>
                  </article>
                  <article className="admin-kpi-chip">
                    <p>Blog publicado</p>
                    <strong>{blogPosts.filter((post) => post.status === "published").length}</strong>
                  </article>
                </div>

                <article className="admin-card admin-activity-card">
                  <div className="row-between">
                    <h3>Actividad reciente</h3>
                    <span className="mini-kicker">Últimos registros</span>
                  </div>
                  <ul className="admin-activity-list">
                    {latestLeads.map((lead) => (
                      <li key={lead.id}>
                        <span className={`admin-status-dot status-${lead.status}`} />
                        <div>
                          <strong>{lead.name}</strong>
                          <p>
                            {lead.originLanding} · {new Date(lead.createdAt).toLocaleString("es-ES")}
                          </p>
                        </div>
                        <span className="admin-amount-tag">{lead.contact}</span>
                      </li>
                    ))}
                    {latestLeads.length === 0 && (
                      <li className="admin-empty-row">
                        Aún no hay actividad. Envía un formulario desde cualquier landing.
                      </li>
                    )}
                  </ul>
                </article>
              </div>

              <aside className="admin-dashboard-side-col">
                <article className="admin-card admin-contacts-card">
                  <h3>Equipo de atención</h3>
                  <p className="hint">Responsables sugeridos para seguimiento de consultas prioritarias.</p>
                  <ul className="admin-avatar-list">
                    {["Carlos", "Valeria", "Irene", "Marco"].map((name) => (
                      <li key={name}>
                        <span>{name.slice(0, 1)}</span>
                        <small>{name}</small>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="admin-card admin-events-card">
                  <h3>Señales de conversión</h3>
                  <ul className="mini-list">
                    {frequentEvents.length > 0 ? (
                      frequentEvents.map(([eventName, total]) => (
                        <li key={eventName}>
                          <strong>{eventName.replaceAll("_", " ")}</strong>
                          <span>{total}</span>
                        </li>
                      ))
                    ) : (
                      <li>Sin eventos todavía. Interactúa con la home o las landings para generarlos.</li>
                    )}
                  </ul>
                </article>
              </aside>
            </div>
          </section>
        )}

        {active === "pages" && (
          <section className="admin-card">
            <div className="row-between">
              <h3>Páginas y SEO base</h3>
              <button className="btn btn-primary" onClick={() => void savePagesAction()}>
                Guardar cambios
              </button>
            </div>
            <div className="table-wrap desktop-only">
              <table className="table">
                <thead>
                  <tr>
                    <th>Página</th>
                    <th>Ruta</th>
                    <th>H1</th>
                    <th>Título SEO</th>
                  </tr>
                </thead>
                <tbody>
                  {pageMeta.map((page) => (
                    <tr key={page.key}>
                      <td>{page.title}</td>
                      <td>{page.route}</td>
                      <td>
                        <input
                          className="input-field"
                          value={page.h1}
                          onChange={(event) =>
                            setPageMeta((prev) =>
                              prev.map((item) =>
                                item.key === page.key ? { ...item, h1: event.target.value } : item
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="input-field"
                          value={page.seoTitle}
                          onChange={(event) =>
                            setPageMeta((prev) =>
                              prev.map((item) =>
                                item.key === page.key ? { ...item, seoTitle: event.target.value } : item
                              )
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only admin-mobile-list">
              {pageMeta.map((page) => (
                <article key={page.key} className="admin-mobile-item">
                  <p className="mini-kicker">{page.route}</p>
                  <h4>{page.title}</h4>
                  <label>
                    H1
                    <input
                      className="input-field"
                      value={page.h1}
                      onChange={(event) =>
                        setPageMeta((prev) =>
                          prev.map((item) => (item.key === page.key ? { ...item, h1: event.target.value } : item))
                        )
                      }
                    />
                  </label>
                  <label>
                    Título SEO
                    <input
                      className="input-field"
                      value={page.seoTitle}
                      onChange={(event) =>
                        setPageMeta((prev) =>
                          prev.map((item) =>
                            item.key === page.key ? { ...item, seoTitle: event.target.value } : item
                          )
                        )
                      }
                    />
                  </label>
                </article>
              ))}
            </div>
            {pageSaveState === "saved" && <p className="saved-pill">Páginas guardadas.</p>}
            {pagesError && <p className="form-feedback error">{pagesError}</p>}
          </section>
        )}

        {active === "landings" && (
          <section className="admin-card">
            <div className="row-between">
              <h3>Landings (estado + hero editable)</h3>
              <button className="btn btn-primary" onClick={() => void saveLandingsAction()}>
                Guardar landings
              </button>
            </div>
            <div className="settings-grid">
              {(["fachadas", "termo-tratada"] as const).map((slug) => (
                <article key={slug} className="card card-pad">
                  <h3 style={{ marginBottom: "0.5rem" }}>{slug === "fachadas" ? "Fachadas" : "Termo tratada"}</h3>
                  <label>
                    <input
                      type="checkbox"
                      checked={landingOverrides[slug]?.active ?? true}
                      onChange={(event) =>
                        setLandingOverrides((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], active: event.target.checked }
                        }))
                      }
                    />{" "}
                    Landing activa
                  </label>
                  <label>
                    Título del hero
                    <input
                      className="input-field"
                      value={landingOverrides[slug]?.heroTitle ?? ""}
                      onChange={(event) =>
                        setLandingOverrides((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], heroTitle: event.target.value }
                        }))
                      }
                    />
                  </label>
                  <label>
                    Descripción del hero
                    <textarea
                      className="input-field textarea"
                      value={landingOverrides[slug]?.heroDescription ?? ""}
                      onChange={(event) =>
                        setLandingOverrides((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], heroDescription: event.target.value }
                        }))
                      }
                    />
                  </label>
                  <label>
                    Referencia de media del hero
                    <input
                      className="input-field"
                      value={landingOverrides[slug]?.heroImage ?? ""}
                      onChange={(event) =>
                        setLandingOverrides((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], heroImage: event.target.value }
                        }))
                      }
                    />
                  </label>
                  <label>
                    CTA principal
                    <input
                      className="input-field"
                      value={landingOverrides[slug]?.ctaPrimaryLabel ?? ""}
                      onChange={(event) =>
                        setLandingOverrides((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], ctaPrimaryLabel: event.target.value }
                        }))
                      }
                    />
                  </label>
                </article>
              ))}
            </div>
            {landingSaveState === "saved" && <p className="saved-pill">Landings guardadas.</p>}
            {landingsError && <p className="form-feedback error">{landingsError}</p>}
          </section>
        )}

        {active === "blog" && (
          <section className="admin-card">
            <div className="row-between">
              <h3>Blog / Editor sencillo</h3>
              <button
                className="btn btn-ghost"
                onClick={() => setBlogEditor({ title: "", excerpt: "", content: "", status: "draft" })}
              >
                Nueva entrada
              </button>
            </div>
            <div className="two-col">
              <div>
                <label>
                  Título
                  <input
                    className="input-field"
                    value={blogEditor.title}
                    onChange={(event) => setBlogEditor((prev) => ({ ...prev, title: event.target.value }))}
                  />
                </label>
                <label>
                  Extracto
                  <textarea
                    className="input-field textarea"
                    value={blogEditor.excerpt}
                    onChange={(event) => setBlogEditor((prev) => ({ ...prev, excerpt: event.target.value }))}
                  />
                </label>
                <label>
                  Contenido
                  <textarea
                    className="input-field textarea"
                    value={blogEditor.content}
                    onChange={(event) => setBlogEditor((prev) => ({ ...prev, content: event.target.value }))}
                  />
                </label>
                <label>
                  Estado
                  <select
                    className="input-field"
                    value={blogEditor.status}
                    onChange={(event) =>
                      setBlogEditor((prev) => ({
                        ...prev,
                        status: event.target.value as BlogPost["status"]
                      }))
                    }
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </label>
                <div className="row-between" style={{ marginTop: "0.8rem" }}>
                  <button className="btn btn-primary" onClick={() => void saveBlogAction()}>
                    Guardar entrada
                  </button>
                  {blogSaveState === "saved" && <span className="saved-pill">Guardado</span>}
                </div>
                {blogError && <p className="form-feedback error">{blogError}</p>}
              </div>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Estado</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.status === "published" ? "Publicado" : "Borrador"}</td>
                        <td>
                          <button className="btn btn-ghost" onClick={() => editBlogPost(post)}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="hint" style={{ marginTop: "0.8rem" }}>
              Las entradas publicadas aparecen automáticamente en la ruta <strong>/blog</strong>.
            </p>
          </section>
        )}

        {active === "media" && (
          <section className="admin-card">
            <h3>Biblioteca de medios</h3>
            <p className="hint">Subida y gestión visual preparada para demo. Soporta imágenes y video.</p>
            <div className="media-grid">
              <div className="media-placeholder">Hero Fachadas (16:9)</div>
              <div className="media-placeholder">Aplicaciones (1:1)</div>
              <div className="media-placeholder">Materiales (4:3)</div>
              <div className="media-placeholder">Galería (4:3)</div>
            </div>
          </section>
        )}

        {active === "crm" && (
          <section className="admin-card">
            <div className="row-between">
              <h3>CRM de leads</h3>
              <button className="btn btn-primary" onClick={exportCsv} disabled={leads.length === 0}>
                Exportar CSV
              </button>
            </div>
            <div className="crm-demo-capabilities">
              <p className="mini-kicker">Estado actual del CRM demo</p>
              <ul className="mini-list">
                <li>
                  <strong>Leads reales</strong>
                  <span>{hasRealLeads ? "Activos" : "Sin entradas aún"}</span>
                </li>
                <li>
                  <strong>Edición de estado y notas</strong>
                  <span>{hasRealLeads ? "Disponible" : "Visible al llegar leads reales"}</span>
                </li>
                <li>
                  <strong>Exportación CSV</strong>
                  <span>{hasRealLeads ? "Disponible" : "Deshabilitada sin datos reales"}</span>
                </li>
                <li>
                  <strong>Vista de ejemplo</strong>
                  <span>{hasRealLeads ? "Oculta" : "7 leads estáticos de demostración"}</span>
                </li>
              </ul>
            </div>
            {crmError && <p className="form-feedback error">{crmError}</p>}
            <div className="table-wrap desktop-only">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Origen</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {hasRealLeads
                    ? leads.map((lead) => (
                        <tr key={lead.id}>
                          <td>{lead.name}</td>
                          <td>{lead.contact}</td>
                          <td>{lead.originLanding}</td>
                          <td>{new Date(lead.createdAt).toLocaleString("es-ES")}</td>
                          <td>
                            <select
                              className={`status-select status-${lead.status}`}
                              value={lead.status}
                              onChange={(event) => void updateLead(lead, event.target.value as LeadStatus)}
                            >
                              <option value="new">Nuevo</option>
                              <option value="in_progress">En gestión</option>
                              <option value="closed">Cerrado</option>
                            </select>
                          </td>
                          <td>
                            <textarea
                              className="note-input"
                              value={getDraftNote(lead)}
                              placeholder="Notas internas"
                              onChange={(event) => setDraftNote(lead.id, event.target.value)}
                            />
                            <button
                              className="btn btn-ghost"
                              style={{ marginTop: "0.45rem" }}
                              onClick={() => void saveLeadNote(lead.id)}
                            >
                              Guardar nota
                            </button>
                          </td>
                        </tr>
                      ))
                    : CRM_DEMO_LEADS.map((lead) => (
                        <tr key={lead.id} className="crm-demo-row">
                          <td>{lead.name}</td>
                          <td>{lead.contact}</td>
                          <td>{lead.originLanding}</td>
                          <td>{lead.createdLabel}</td>
                          <td>
                            <span className={`crm-status-chip status-${lead.status}`}>
                              {getLeadStatusLabel(lead.status)}
                            </span>
                          </td>
                          <td>{lead.notes}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only admin-mobile-list">
              {hasRealLeads
                ? leads.map((lead) => (
                    <article key={lead.id} className="admin-mobile-item">
                      <div className="admin-mobile-head">
                        <h4>{lead.name}</h4>
                        <span className="mini-kicker">{new Date(lead.createdAt).toLocaleDateString("es-ES")}</span>
                      </div>
                      <p className="hint" style={{ marginBottom: "0.5rem" }}>
                        {lead.contact} · {lead.originLanding}
                      </p>
                      <label>
                        Estado
                        <select
                          className={`status-select status-${lead.status}`}
                          value={lead.status}
                          onChange={(event) => void updateLead(lead, event.target.value as LeadStatus)}
                        >
                          <option value="new">Nuevo</option>
                          <option value="in_progress">En gestión</option>
                          <option value="closed">Cerrado</option>
                        </select>
                      </label>
                      <label>
                        Notas
                        <textarea
                          className="note-input"
                          value={getDraftNote(lead)}
                          placeholder="Notas internas"
                          onChange={(event) => setDraftNote(lead.id, event.target.value)}
                        />
                      </label>
                      <button className="btn btn-ghost" onClick={() => void saveLeadNote(lead.id)}>
                        Guardar nota
                      </button>
                    </article>
                  ))
                : CRM_DEMO_LEADS.map((lead) => (
                    <article key={lead.id} className="admin-mobile-item crm-demo-row">
                      <div className="admin-mobile-head">
                        <h4>{lead.name}</h4>
                        <span className="mini-kicker">{lead.createdLabel}</span>
                      </div>
                      <p className="hint" style={{ marginBottom: "0.35rem" }}>
                        {lead.contact} · {lead.originLanding}
                      </p>
                      <p>
                        <span className={`crm-status-chip status-${lead.status}`}>
                          {getLeadStatusLabel(lead.status)}
                        </span>
                      </p>
                      <p className="hint">{lead.notes}</p>
                    </article>
                  ))}
            </div>
          </section>
        )}

        {active === "settings" && (
          <section className="admin-card">
            <h3>Ajustes globales</h3>
            <div className="settings-grid">
              <label>
                Número de WhatsApp
                <input
                  className="input-field"
                  value={settings.whatsappNumber}
                  onChange={(event) => setSettings((prev) => ({ ...prev, whatsappNumber: event.target.value }))}
                />
              </label>
              <label>
                Email de notificación
                <input
                  className="input-field"
                  value={settings.notifyEmail}
                  onChange={(event) => setSettings((prev) => ({ ...prev, notifyEmail: event.target.value }))}
                />
              </label>
              <label>
                URL de privacidad
                <input
                  className="input-field"
                  value={settings.privacyUrl}
                  onChange={(event) => setSettings((prev) => ({ ...prev, privacyUrl: event.target.value }))}
                />
              </label>
              <label>
                Modo de marca
                <select
                  className="input-field"
                  value={settings.brandMode}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      brandMode: event.target.value as DemoSettings["brandMode"]
                    }))
                  }
                >
                  <option value="default">Predeterminado</option>
                  <option value="clean">Limpio</option>
                  <option value="editorial">Editorial</option>
                </select>
              </label>
            </div>
            <div className="toggle-row">
              <label>
                <input
                  type="checkbox"
                  checked={settings.emailJsEnabled}
                  onChange={(event) => setSettings((prev) => ({ ...prev, emailJsEnabled: event.target.checked }))}
                />
                EmailJS preparado
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.mailchimpEnabled}
                  onChange={(event) => setSettings((prev) => ({ ...prev, mailchimpEnabled: event.target.checked }))}
                />
                Mailchimp preparado
              </label>
            </div>
            <div className="row-between">
              <button className="btn btn-primary" onClick={() => void saveSettingsAction()}>
                Guardar ajustes
              </button>
              {saveState === "saved" && <span className="saved-pill">Ajustes guardados</span>}
            </div>
            {settingsError && <p className="form-feedback error">{settingsError}</p>}
          </section>
        )}
      </main>
    </div>
  );
}

