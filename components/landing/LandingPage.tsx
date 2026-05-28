"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics-store";
import { Locale, localizePath } from "@/lib/i18n";
import {
  getLandingOverride,
  subscribeLandingOverrides,
  syncLandingOverridesFromServer
} from "@/lib/landing-overrides-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";
import { LandingConfig } from "@/lib/types";

type LandingPageProps = {
  config: LandingConfig;
  locale?: Locale;
};

const EMPTY_OVERRIDE = {
  active: true,
  heroTitle: "",
  heroDescription: "",
  heroImage: "",
  ctaPrimaryLabel: ""
};

const LANDING_COPY: Record<
  Locale,
  {
    inactiveBadge: string;
    inactiveMessage: string;
    backHome: string;
    contactButton: string;
    contactKicker: string;
    heroCta: string;
    heroWhatsappMessage: string;
    intro: string;
    applications: string;
    applicationsTitle: string;
    systems: string;
    systemsTitle: string;
    systemNumber: string;
    materials: string;
    materialsTitle: string;
    specs: string;
    specsTitle: string;
    specsParam: string;
    specsDetail: string;
    gallery: string;
    galleryTitle: string;
    frame: string;
    technicalBlock: string;
    technicalTitle: string;
    technicalText: string;
    differentialBlock: string;
    contactTitle: string;
    contactText: string;
  }
> = {
  es: {
    inactiveBadge: "Pagina temporalmente inactiva",
    inactiveMessage:
      "Esta pagina esta en actualizacion desde el panel de administracion. Puedes volver al inicio o contactar por WhatsApp.",
    backHome: "Volver al inicio",
    contactButton: "Ir a contacto",
    contactKicker: "Contacto",
    heroCta: "Solicitar informacion",
    heroWhatsappMessage: "Hola Gavejo, quiero mas informacion tecnica para mi proyecto.",
    intro: "Introduccion",
    applications: "Aplicaciones",
    applicationsTitle: "Escenarios de uso para arquitectura y proyectos profesionales",
    systems: "Sistemas",
    systemsTitle: "Metodologia tecnica y operativa",
    systemNumber: "Sistema",
    materials: "Materiales",
    materialsTitle: "Catalogo tecnico con descargas directas",
    specs: "Especificaciones",
    specsTitle: "Ficha tecnica sintetica",
    specsParam: "Parametro",
    specsDetail: "Detalle",
    gallery: "Galeria de referencia",
    galleryTitle: "Bloques visuales para sustituir por contenido final",
    frame: "Frame",
    technicalBlock: "Bloque tecnico",
    technicalTitle: "Mensajes para arquitectos y direccion de proyecto",
    technicalText:
      "Argumentos de durabilidad, normativa, trazabilidad y operacion para soportar decisiones de especificacion.",
    differentialBlock: "Universo complementario",
    contactTitle: "Solicita evaluacion tecnica para tu proyecto",
    contactText:
      "Cierre comercial directo con formulario y WhatsApp para acelerar respuesta a cliente final, arquitectura y prescripcion."
  },
  en: {
    inactiveBadge: "Page temporarily inactive",
    inactiveMessage:
      "This page is being updated from the admin panel. You can go back home or contact us on WhatsApp.",
    backHome: "Back to home",
    contactButton: "Go to contact",
    contactKicker: "Contact",
    heroCta: "Request information",
    heroWhatsappMessage: "Hello Gavejo, I would like technical information for my project.",
    intro: "Introduction",
    applications: "Applications",
    applicationsTitle: "Use cases for architecture and professional projects",
    systems: "Systems",
    systemsTitle: "Technical and operational methodology",
    systemNumber: "System",
    materials: "Materials",
    materialsTitle: "Technical catalog with direct downloads",
    specs: "Specifications",
    specsTitle: "Summary technical sheet",
    specsParam: "Parameter",
    specsDetail: "Detail",
    gallery: "Reference gallery",
    galleryTitle: "Visual blocks ready to be replaced with final content",
    frame: "Frame",
    technicalBlock: "Technical block",
    technicalTitle: "Messages for architects and project managers",
    technicalText:
      "Durability, compliance, traceability and operation arguments to support specification decisions.",
    differentialBlock: "Complementary universe",
    contactTitle: "Request a technical assessment for your project",
    contactText:
      "A direct commercial close with form and WhatsApp to speed up response for clients, architects and specifiers."
  }
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

function toVisibleText(value: string, locale: Locale) {
  return locale === "es" ? toSpanishVisibleText(value) : value;
}

export function LandingPage({ config, locale = "es" }: LandingPageProps) {
  const copy = LANDING_COPY[locale];
  const [override, setOverride] = useState(() => (locale === "es" ? getLandingOverride(config.slug) : EMPTY_OVERRIDE));
  const [whatsappNumber, setWhatsappNumber] = useState(() => getDemoSettings().whatsappNumber);

  useEffect(() => {
    if (locale !== "es") {
      setOverride(EMPTY_OVERRIDE);
      return;
    }

    void syncLandingOverridesFromServer().then(() => setOverride(getLandingOverride(config.slug)));
    setOverride(getLandingOverride(config.slug));
    return subscribeLandingOverrides(() => setOverride(getLandingOverride(config.slug)));
  }, [config.slug, locale]);

  useEffect(() => {
    void syncSettingsFromServer().then(() => setWhatsappNumber(getDemoSettings().whatsappNumber));
    setWhatsappNumber(getDemoSettings().whatsappNumber);
    return subscribeSettings(() => setWhatsappNumber(getDemoSettings().whatsappNumber));
  }, []);

  const heroTitle = override.heroTitle || config.heroTitle;
  const heroDescription = toVisibleText(override.heroDescription || config.heroDescription, locale);
  const heroAssetRef = override.heroImage || config.heroImage;
  const heroCta = override.ctaPrimaryLabel || copy.heroCta;
  const heroWhatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    copy.heroWhatsappMessage
  )}`;
  const isLandingActive = useMemo(() => override.active, [override.active]);

  if (!isLandingActive) {
    return (
      <>
        <PublicHeader />
        <main className="container section">
          <span className="chip">{copy.inactiveBadge}</span>
          <h1>{config.navName}</h1>
          <p className="lead-text">{copy.inactiveMessage}</p>
          <div className="hero-actions">
            <Link href={localizePath("/", locale)} className="btn btn-primary">
              {copy.backHome}
            </Link>
            <Link href={localizePath("/contacto", locale)} className="btn btn-secondary">
              {copy.contactButton}
            </Link>
          </div>
          <FloatingWhatsApp sourcePage={config.slug} locale={locale} />
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
              <h1>{toVisibleText(heroTitle, locale)}</h1>
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
              <p className="section-kicker">{copy.intro}</p>
              <h2>{toVisibleText(config.introTitle, locale)}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="lead-text">{toVisibleText(config.introDescription, locale)}</p>
            </Reveal>
          </div>
        </section>

        <section id="applications" className="section section-soft">
          <div className="container">
            <Reveal>
              <p className="section-kicker">{copy.applications}</p>
              <h2>{copy.applicationsTitle}</h2>
            </Reveal>
            <div className="grid grid-4">
              {config.applications.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={toVisibleText(item.title, locale)}
                      caption={item.image}
                      minHeight={220}
                      aspectRatio="4 / 3"
                    />
                    <div className="card-body" style={{ paddingInline: 0, paddingBottom: 0 }}>
                      <h3>{toVisibleText(item.title, locale)}</h3>
                      <p>{toVisibleText(item.text, locale)}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="systems" className="section container">
          <Reveal>
            <p className="section-kicker">{copy.systems}</p>
            <h2>{copy.systemsTitle}</h2>
          </Reveal>
          <div className="stack">
            {config.systems.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="system-card">
                  <NeonPlaceholder
                    label={`${item.number} ${toVisibleText(item.title, locale)}`}
                    caption={item.image}
                    minHeight={260}
                    aspectRatio="4 / 3"
                  />
                  <div className="system-copy">
                    <p className="system-number">
                      {copy.systemNumber} {item.number}
                    </p>
                    <h3>{toVisibleText(item.title, locale)}</h3>
                    <p>{toVisibleText(item.text, locale)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="materials" className="section section-soft">
          <div className="container">
            <Reveal>
              <p className="section-kicker">{copy.materials}</p>
              <h2>{copy.materialsTitle}</h2>
            </Reveal>
            <div className="grid grid-3">
              {config.materials.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={toVisibleText(item.subtitle, locale)}
                      caption={item.image}
                      minHeight={220}
                      aspectRatio="4 / 3"
                    />
                    <div className="card-body" style={{ paddingInline: 0, paddingBottom: 0 }}>
                      <p className="mini-kicker">{toVisibleText(item.subtitle, locale)}</p>
                      <h3>{toVisibleText(item.title, locale)}</h3>
                      <p>{toVisibleText(item.text, locale)}</p>
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
              <p className="section-kicker">{copy.specs}</p>
              <h2>{copy.specsTitle}</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="card card-pad">
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>{copy.specsParam}</th>
                        <th>{copy.specsDetail}</th>
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
              <p className="section-kicker">{copy.gallery}</p>
              <h2>{copy.galleryTitle}</h2>
          </Reveal>
          <div className="grid grid-3">
            {config.gallery.map((item, index) => (
              <Reveal key={`${item.alt}-${index}`} delay={index * 70}>
                <article className="card card-pad gallery-card">
                  <NeonPlaceholder
                    label={`${copy.frame} ${index + 1}`}
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
              <p className="section-kicker">{copy.technicalBlock}</p>
              <h2>{copy.technicalTitle}</h2>
              <p className="lead-text">{copy.technicalText}</p>
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
                <p className="section-kicker">{copy.differentialBlock}</p>
                <h2>{config.maderBalear.title}</h2>
                <p className="lead-text" style={{ marginBottom: "1rem" }}>
                  {toVisibleText(config.maderBalear.text, locale)}
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
              <p className="section-kicker section-kicker-light">{copy.contactKicker}</p>
              <h2>{copy.contactTitle}</h2>
              <p className="lead-text">{copy.contactText}</p>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm originLanding={config.navName} locale={locale} />
            </Reveal>
          </div>
        </section>
      </main>

      <FloatingWhatsApp sourcePage={config.slug} locale={locale} />
    </div>
  );
}
