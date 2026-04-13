"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics-store";
import {
  getLandingOverride,
  subscribeLandingOverrides,
  syncLandingOverridesFromServer
} from "@/lib/landing-overrides-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";
import { LandingConfig } from "@/lib/types";

type LandingPageProps = {
  config: LandingConfig;
};

function toSpanishVisibleText(value: string) {
  return value
    .replace(/\bcontract\b/gi, "proyectos profesionales")
    .replace(/\bContract\b/g, "Proyectos profesionales")
    .replace(/\bdeck\b/gi, "terrazas")
    .replace(/\bDeck\b/g, "Terrazas")
    .replace(/\bDecking\b/g, "Terrazas")
    .replace(/\bcladding\b/gi, "revestimiento")
    .replace(/\bCladding\b/g, "Revestimiento")
    .replace(/\bPlywood\b/g, "contrachapado")
    .replace(/\bThermoWood\b/g, "madera termotratada")
    .replace(/\bBurned Wood\b/g, "madera quemada")
    .replace(/\bPine\b/g, "pino")
    .replace(/\bAsh\b/g, "fresno")
    .replace(/\bOak\b/g, "roble")
    .replace(/\bhero\b/gi, "portada")
    .replace(/\bHero\b/g, "Portada")
    .replace(/\bVisual hero\b/g, "Imagen principal")
    .replace(/\bDashboard\b/g, "Panel")
    .replace(/\bLead\b/g, "Consulta");
}

export function LandingPage({ config }: LandingPageProps) {
  const [override, setOverride] = useState(() => getLandingOverride(config.slug));
  const [whatsappNumber, setWhatsappNumber] = useState(() => getDemoSettings().whatsappNumber);

  useEffect(() => {
    void syncLandingOverridesFromServer().then(() => setOverride(getLandingOverride(config.slug)));
    setOverride(getLandingOverride(config.slug));
    return subscribeLandingOverrides(() => setOverride(getLandingOverride(config.slug)));
  }, [config.slug]);

  useEffect(() => {
    void syncSettingsFromServer().then(() => setWhatsappNumber(getDemoSettings().whatsappNumber));
    setWhatsappNumber(getDemoSettings().whatsappNumber);
    return subscribeSettings(() => setWhatsappNumber(getDemoSettings().whatsappNumber));
  }, []);

  const heroTitle = override.heroTitle || config.heroTitle;
  const heroDescription = toSpanishVisibleText(override.heroDescription || config.heroDescription);
  const heroAssetRef = override.heroImage || config.heroImage;
  const heroCta = override.ctaPrimaryLabel || "Solicitar información";
  const heroWhatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola Gavejo, quiero mas informacion tecnica para mi proyecto."
  )}`;
  const isLandingActive = useMemo(() => override.active, [override.active]);

  if (!isLandingActive) {
    return (
      <>
        <PublicHeader />
        <main className="container section">
          <span className="chip">Página temporalmente inactiva</span>
          <h1>{config.navName}</h1>
          <p className="lead-text">
            Esta página está en actualización desde el panel de administración. Puedes volver al inicio o
            contactar por WhatsApp.
          </p>
          <div className="hero-actions">
            <Link href="/" className="btn btn-primary">
              Volver al inicio
            </Link>
            <Link href="/contacto" className="btn btn-secondary">
              Ir a contacto
            </Link>
          </div>
          <FloatingWhatsApp sourcePage={config.slug} />
        </main>
      </>
    );
  }

  return (
    <div className="landing-page">
      <PublicHeader />

      <main>
        <section className="hero hero-architectural">
          <div className="container hero-content hero-content-grid">
            <Reveal>
              <span className="chip chip-light">{config.heroBadge}</span>
              <h1>{toSpanishVisibleText(heroTitle)}</h1>
              <p>{heroDescription}</p>
              <div className="hero-actions">
                <a
                  className="btn btn-light"
                  href="#contact"
                  onClick={() =>
                    trackEvent("cta_click", config.slug, { section: "hero", ctaLabel: heroCta })
                  }
                >
                  {heroCta}
                </a>
                <a
                  className="btn btn-outline-light"
                  href={heroWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("whatsapp_click", config.slug, { placement: "hero" })}
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
                <NeonPlaceholder
                label="Imagen principal"
                caption={`Referencia actual: ${heroAssetRef}`}
                minHeight={340}
                aspectRatio="16 / 10"
              />
            </Reveal>
          </div>
        </section>

        <section id="intro" className="section container">
          <div className="two-col">
            <Reveal>
              <p className="section-kicker">Introduccion</p>
              <h2>{toSpanishVisibleText(config.introTitle)}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="lead-text">{toSpanishVisibleText(config.introDescription)}</p>
            </Reveal>
          </div>
        </section>

        <section id="applications" className="section section-soft">
          <div className="container">
            <Reveal>
              <p className="section-kicker">Aplicaciones</p>
              <h2>Escenarios de uso para arquitectura y proyectos profesionales</h2>
            </Reveal>
            <div className="grid grid-4">
              {config.applications.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={toSpanishVisibleText(item.title)}
                      caption={item.image}
                      minHeight={220}
                      aspectRatio="4 / 3"
                    />
                    <div className="card-body" style={{ paddingInline: 0, paddingBottom: 0 }}>
                      <h3>{toSpanishVisibleText(item.title)}</h3>
                      <p>{toSpanishVisibleText(item.text)}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="systems" className="section container">
          <Reveal>
            <p className="section-kicker">Sistemas</p>
            <h2>Metodología técnica y operativa</h2>
          </Reveal>
          <div className="stack">
            {config.systems.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="system-card">
                  <NeonPlaceholder
                    label={`${item.number} ${toSpanishVisibleText(item.title)}`}
                    caption={item.image}
                    minHeight={260}
                    aspectRatio="4 / 3"
                  />
                  <div className="system-copy">
                    <p className="system-number">Sistema {item.number}</p>
                    <h3>{toSpanishVisibleText(item.title)}</h3>
                    <p>{toSpanishVisibleText(item.text)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="materials" className="section section-soft">
          <div className="container">
            <Reveal>
              <p className="section-kicker">Materiales</p>
              <h2>Catálogo técnico con descargas directas</h2>
            </Reveal>
            <div className="grid grid-3">
              {config.materials.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={toSpanishVisibleText(item.subtitle)}
                      caption={item.image}
                      minHeight={220}
                      aspectRatio="4 / 3"
                    />
                    <div className="card-body" style={{ paddingInline: 0, paddingBottom: 0 }}>
                      <p className="mini-kicker">{toSpanishVisibleText(item.subtitle)}</p>
                      <h3>{toSpanishVisibleText(item.title)}</h3>
                      <p>{toSpanishVisibleText(item.text)}</p>
                      <a
                        className="btn btn-ghost"
                        href={item.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackEvent("cta_click", config.slug, {
                            section: "materials",
                            ctaLabel: item.cta
                          })
                        }
                      >
                        {item.cta}
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {config.technicalSpecs && config.technicalSpecs.length > 0 && (
          <section className="section container">
            <Reveal>
              <p className="section-kicker">Especificaciones</p>
              <h2>Ficha tecnica sintetica</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="card card-pad">
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Parametro</th>
                        <th>Detalle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.technicalSpecs.map((item) => (
                        <tr key={item.label}>
                          <td>{item.label}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        <section className="section container">
          <Reveal>
              <p className="section-kicker">Galería de referencia</p>
              <h2>Bloques visuales para sustituir por contenido final</h2>
          </Reveal>
          <div className="grid grid-3">
            {config.gallery.map((item, index) => (
              <Reveal key={`${item.alt}-${index}`} delay={index * 70}>
                <article className="card card-pad gallery-card">
                  <NeonPlaceholder
                    label={`Frame ${index + 1}`}
                    caption={item.image}
                    minHeight={230}
                    aspectRatio="4 / 3"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section section-soft">
          <div className="container two-col">
            <Reveal>
              <p className="section-kicker">Bloque técnico</p>
              <h2>Mensajes para arquitectos y dirección de proyecto</h2>
              <p className="lead-text">
                Argumentos de durabilidad, normativa, trazabilidad y operación para soportar decisiones de
                especificación.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="card card-pad">
                <ul className="dot-list">
                  {config.technicalPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section container">
          <div className="two-col">
            <Reveal>
              <NeonPlaceholder
                label="Bloque diferencial"
                caption={config.maderBalear.image}
                minHeight={300}
                aspectRatio="16 / 10"
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="card card-pad">
                <p className="section-kicker">Universo complementario</p>
                <h2>{config.maderBalear.title}</h2>
                <p className="lead-text" style={{ marginBottom: "1rem" }}>
                  {toSpanishVisibleText(config.maderBalear.text)}
                </p>
                <a className="btn btn-primary" href="#contact">
                  {config.maderBalear.ctaLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section section-dark">
          <div className="container two-col contact-wrap">
            <Reveal>
              <p className="section-kicker section-kicker-light">Contacto</p>
              <h2>Solicita evaluación técnica para tu proyecto</h2>
              <p className="lead-text">
                Cierre comercial directo con formulario y WhatsApp para acelerar respuesta a cliente final,
                arquitectura y prescripción.
              </p>
              <div className="hero-actions" style={{ marginTop: "1rem" }}>
                <a
                  className="btn btn-light"
                  href="#contact"
                  onClick={() =>
                    trackEvent("cta_click", config.slug, {
                      section: "final",
                      ctaLabel: "llamado final de contacto"
                    })
                  }
                >
                  Hablar con asesor técnico
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm originLanding={config.navName} />
            </Reveal>
          </div>
        </section>
      </main>

      <FloatingWhatsApp sourcePage={config.slug} />
    </div>
  );
}
