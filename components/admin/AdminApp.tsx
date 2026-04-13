"use client";

import { useEffect, useMemo, useState } from "react";
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

const MODULES: Array<{ key: AdminModule; label: string }> = [
  { key: "dashboard", label: "Panel" },
  { key: "pages", label: "Páginas" },
  { key: "landings", label: "Landings" },
  { key: "blog", label: "Blog" },
  { key: "media", label: "Medios" },
  { key: "crm", label: "CRM de leads" },
  { key: "settings", label: "Ajustes" }
];

export function AdminApp() {
  const [active, setActive] = useState<AdminModule>("dashboard");
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

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h1>GAVEJO</h1>
          <p>Panel de demo</p>
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
              className={`nav-btn ${active === item.key ? "is-active" : ""}`}
              onClick={() => {
                setActive(item.key);
                setMenuOpenMobile(false);
              }}
            >
              <span className="nav-label">{item.label}</span>
              {item.key === "crm" && summary.fresh > 0 && <span className="badge-pulse">{summary.fresh}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-top">
          <div>
            <h2>Panel de administración</h2>
            <p>Demo funcional para validación comercial y operativa.</p>
          </div>
        </header>

        <p className="hint" style={{ marginBottom: "0.9rem" }}>
          Operativo en demo: CRM, Blog, Landings y Ajustes con persistencia MySQL. Preparado para fase
          productiva: autenticación avanzada y gestor de medios completo.
        </p>

        {active === "dashboard" && (
          <section className="admin-grid">
            <article className="admin-card metric">
              <p>Leads totales</p>
              <strong>{summary.total}</strong>
            </article>
            <article className="admin-card metric">
              <p>Nuevos</p>
              <strong>{summary.fresh}</strong>
            </article>
            <article className="admin-card metric">
              <p>En gestión</p>
              <strong>{summary.progress}</strong>
            </article>
            <article className="admin-card metric">
              <p>Cerrados</p>
              <strong>{summary.closed}</strong>
            </article>
            <article className="admin-card">
              <h3>Actividad analítica</h3>
              <p>Eventos totales: {eventsCount}</p>
              <ul className="mini-list">
                <li>
                  <strong>Clicks en CTA</strong>
                  <span>{eventBreakdown.cta_click ?? 0}</span>
                </li>
                <li>
                  <strong>Clicks en WhatsApp</strong>
                  <span>{eventBreakdown.whatsapp_click ?? 0}</span>
                </li>
                <li>
                  <strong>Envíos de formulario</strong>
                  <span>{eventBreakdown.form_submit ?? 0}</span>
                </li>
                <li>
                  <strong>Cambio de estado</strong>
                  <span>{eventBreakdown.lead_status_change ?? 0}</span>
                </li>
              </ul>
            </article>
            <article className="admin-card">
              <h3>Leads recientes</h3>
              <ul className="mini-list">
                {leads.slice(0, 5).map((lead) => (
                  <li key={lead.id}>
                    <strong>{lead.name}</strong>
                    <span>{lead.originLanding}</span>
                  </li>
                ))}
                {leads.length === 0 && <li>No hay leads aún. Envía un formulario desde una landing.</li>}
              </ul>
            </article>
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
                  {leads.map((lead) => (
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
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6}>Todavía no hay leads. Envía una consulta desde cualquiera de las landings.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mobile-only admin-mobile-list">
              {leads.map((lead) => (
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
              ))}
              {leads.length === 0 && (
                <article className="admin-mobile-item">
                  Todavía no hay leads. Envía una consulta desde cualquiera de las landings.
                </article>
              )}
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

