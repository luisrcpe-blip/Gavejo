import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";
import { HomeGuidedTour } from "@/components/home/HomeGuidedTour";
import { HomePrimaryRoutes } from "@/components/home/HomePrimaryRoutes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const kpiItems = [
  {
    kicker: "Madera termo tratada",
    value: "200 C+",
    description: "Proceso térmico para estabilidad y durabilidad sin biocidas."
  },
  {
    kicker: "Trazabilidad",
    value: "95%+ FSC",
    description: "Volumen certificado para decisiones técnicas con respaldo."
  },
  {
    kicker: "Durabilidad",
    value: "15-25 años",
    description: "Vida útil objetivo en exterior según especie y uso."
  },
  {
    kicker: "Captación",
    value: "2 páginas",
    description: "Embudo demo completo con contacto, WhatsApp y CRM."
  }
];

const solutionCards = [
  {
    title: "Fachadas y revestimientos",
    href: "/soluciones/fachadas",
    caption: "Sistema de fachada ventilada, aplicaciones y bloque técnico.",
    placeholderLabel: "Fachadas arquitectónicas",
    placeholderCaption: "Marcador verde: reemplazar por proyecto ejecutado",
    points: [
      "Hero oscuro con foco comercial",
      "Sistemas numerados y materiales",
      "Llamado a la acción directo a contacto y WhatsApp"
    ]
  },
  {
    title: "Madera termotratada",
    href: "/materiales/termo-tratada",
    caption: "Madera termo tratada explicada para arquitectos y prescriptores.",
    placeholderLabel: "Termo modificación",
    placeholderCaption: "Marcador verde: reemplazar por imagen real del material",
    points: [
      "Proceso y ventajas técnicas",
      "Comparativa para decision de compra",
      "Formulario conectado al flujo CRM"
    ]
  }
];

const ecosystemCards = [
  {
    title: "Prime Forest",
    copy: "Origen forestal controlado para abastecimiento con criterio legal y técnico.",
    placeholder: "Silvicultura y frondosas europeas"
  },
  {
    title: "Treecraft Plywood",
    copy: "Tableros de ingeniería con control de calidad y marco CE.",
    placeholder: "Contrachapado y trazabilidad"
  },
  {
    title: "Tantimber / LDCwood",
    copy: "Catálogo de madera termotratada para envolventes, terrazas y proyectos profesionales.",
    placeholder: "Revestimiento exterior premium"
  }
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="home-wrap">
        <HomeGuidedTour />
        <section className="section home-hero-shell" id="inicio" data-tour-id="section-inicio">
          <div className="container home-hero-grid">
            <Reveal>
              <span className="chip">Demo ejecutiva · Biomateriales avanzados</span>
              <h1>Gavejo: plataforma comercial para fachadas y madera termotratada</h1>
              <p className="lead-text home-lead">
                Una página de inicio más potente para presentar la propuesta al director: dos páginas
                especializadas, flujo de captación demostrable y panel de administración listo para
                gestionar consultas en tiempo real.
              </p>
              <HomePrimaryRoutes />
              <div className="home-mini-points">
                <div className="home-mini-point">
                  <strong>Arquitectura</strong>
                  <span>Lenguaje técnico y visual sobrio para prescriptores.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Conversión</strong>
                  <span>Llamados a la acción, WhatsApp y formulario listos para demos comerciales.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Escalabilidad</strong>
                  <span>Estructura repetible para nuevas páginas por solución.</span>
                </div>
              </div>
            </Reveal>

            <div className="home-visual-stack">
              <Reveal delay={120}>
                <NeonPlaceholder
                  label="Portada corporativa"
                  caption="Marcador verde para reemplazar por visual real"
                  minHeight={360}
                  aspectRatio="16 / 10"
                />
              </Reveal>
              <Reveal delay={200}>
                <article className="home-highlight-card">
                  <p className="section-kicker">Prueba funcional visible</p>
                  <h3>Formulario -&gt; CRM -&gt; panel de control en minutos</h3>
                  <ul className="home-highlight-list">
                    <li>La consulta se crea desde la página con origen correcto.</li>
                    <li>Estado editable en CRM: nuevo / en gestión / cerrado.</li>
                    <li>Contadores y actividad reflejados en el panel de administración.</li>
                  </ul>
                  <Link href="/admin?tab=crm" className="btn btn-secondary">
                    Ver consultas en CRM
                  </Link>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container home-proof-band">
            {kpiItems.map((item) => (
              <article className="card card-pad" key={item.kicker}>
                <p className="mini-kicker">{item.kicker}</p>
                <h3>{item.value}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="soluciones" data-tour-id="section-soluciones">
          <div className="container">
            <Reveal>
              <div className="home-section-head" data-tour-id="section-soluciones-head">
                <p className="section-kicker">Páginas protagonistas</p>
                <h2>Dos páginas de captación listas para presentar y validar</h2>
                <p className="lead-text">
                  Cada página responde a una línea de negocio concreta y mantiene la misma arquitectura
                  comercial para escalar nuevas soluciones sin perder consistencia.
                </p>
              </div>
            </Reveal>

            <div className="home-solution-grid">
              {solutionCards.map((solution, idx) => (
                <Reveal key={solution.title} delay={idx * 90}>
                  <article className="solution-card">
                    <NeonPlaceholder
                      label={solution.placeholderLabel}
                      caption={solution.placeholderCaption}
                      minHeight={250}
                      aspectRatio="16 / 9"
                    />
                    <div className="solution-body">
                      <h3>{solution.title}</h3>
                      <p>{solution.caption}</p>
                      <ul className="dot-list">
                        {solution.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <Link href={solution.href} className="btn btn-primary">
                        Abrir {solution.title}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal>
              <div className="home-section-head">
                <p className="section-kicker">Ecosistema técnico</p>
                <h2>Base narrativa para arquitectura, proyectos profesionales y suministro especializado</h2>
              </div>
            </Reveal>
            <div className="grid grid-3">
              {ecosystemCards.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 90}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={item.title}
                      caption={item.placeholder}
                      minHeight={210}
                      aspectRatio="4 / 3"
                    />
                    <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="contacto" data-tour-id="section-contacto">
          <div className="container two-col">
            <Reveal>
              <div data-tour-id="section-contacto-head">
                <p className="section-kicker">Ruta comercial</p>
                <h2>De la visita web a la gestión comercial en un mismo entorno</h2>
                <p className="lead-text">
                  El cliente final ve una experiencia limpia y el equipo comercial recibe información accionable
                  sin depender de procesos manuales.
                </p>
              </div>
              <div className="home-workflow-panel">
                <ol className="workflow-list">
                  <li className="workflow-step">
                    <span>1</span>
                    <div>
                      <strong>Interés en la página</strong>
                      <p>Llamado principal a la acción y bloque final orientados a contacto real.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>2</span>
                    <div>
                      <strong>Formulario con consentimiento</strong>
                      <p>Consulta registrada con origen de la página y datos de contacto.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>3</span>
                    <div>
                      <strong>Seguimiento en CRM</strong>
                      <p>Estado editable, notas y exportación CSV para la operativa comercial.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="hero-actions">
                <Link href="/contacto" className="btn btn-primary">
                  Ir a Contacto
                </Link>
                <Link href="/blog" className="btn btn-secondary">
                  Ver blog técnico
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <NeonPlaceholder
                label="Panel comercial"
                caption="Sustituir por captura real del flujo CRM"
                minHeight={320}
                aspectRatio="16 / 10"
              />
            </Reveal>
          </div>
        </section>

        <section className="section home-final-cta">
          <div className="container">
            <Reveal>
              <div className="home-final-card">
                <p className="chip chip-light">Estado de la demo</p>
                <h2>Presentación lista para cliente: elegante, clara y accionable</h2>
                <p className="lead-text">
                  La demo comunica visión comercial hoy y deja preparado el camino a la fase productiva
                  con backend real, integraciones y operación continua.
                </p>
                <div className="hero-actions">
                  <Link href="/soluciones/fachadas" className="btn btn-light">
                    Iniciar recorrido
                  </Link>
                  <Link href="/admin" className="btn btn-outline-light">
                    Abrir panel de administración
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FloatingWhatsApp sourcePage="home" />
      </main>
    </>
  );
}
