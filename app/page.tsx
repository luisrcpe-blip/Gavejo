import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

const kpiItems = [
  {
    kicker: "ThermoWood",
    value: "200 C+",
    description: "Proceso termico para estabilidad y durabilidad sin biocidas."
  },
  {
    kicker: "Trazabilidad",
    value: "95%+ FSC",
    description: "Volumen certificado para decisiones tecnicas con respaldo."
  },
  {
    kicker: "Durabilidad",
    value: "15-25 anos",
    description: "Vida util objetivo en exterior segun especie y uso."
  },
  {
    kicker: "Captacion",
    value: "2 landings",
    description: "Embudo demo completo con contacto, WhatsApp y CRM."
  }
];

const solutionCards = [
  {
    title: "Landing Fachadas",
    href: "/soluciones/fachadas",
    caption: "Sistema de fachada ventilada, aplicaciones y bloque tecnico.",
    placeholderLabel: "Fachadas Arquitectonicas",
    placeholderCaption: "Mock verde: reemplazar por proyecto ejecutado",
    points: [
      "Hero oscuro con foco comercial",
      "Sistemas numerados y materiales",
      "CTA directo a contacto y WhatsApp"
    ]
  },
  {
    title: "Landing Madera Termo Tratada",
    href: "/materiales/termo-tratada",
    caption: "ThermoWood explicado para arquitectos y prescriptores.",
    placeholderLabel: "Termo Modificacion",
    placeholderCaption: "Mock verde: reemplazar por imagen real de material",
    points: [
      "Proceso y ventajas tecnicas",
      "Comparativa para decision de compra",
      "Formulario conectado al flujo CRM"
    ]
  }
];

const ecosystemCards = [
  {
    title: "Prime Forest",
    copy: "Origen forestal controlado para abastecimiento con criterio legal y tecnico.",
    placeholder: "Silvicultura y frondosas europeas"
  },
  {
    title: "Treecraft Plywood",
    copy: "Tableros de ingenieria con control de calidad y marco CE.",
    placeholder: "Contrachapado y trazabilidad"
  },
  {
    title: "Tantimber / LDCwood",
    copy: "Catalogo de madera termotratada para envolventes, decking y contract.",
    placeholder: "Cladding y exterior premium"
  }
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="home-wrap">
        <section className="section home-hero-shell" id="inicio">
          <div className="container home-hero-grid">
            <Reveal>
              <span className="chip">Demo ejecutiva · Biomateriales avanzados</span>
              <h1>Gavejo: plataforma comercial para fachadas y madera termo tratada</h1>
              <p className="lead-text home-lead">
                Un home mas potente para presentar la propuesta al director: dos landings especializadas,
                flujo de captacion demostrable y panel admin listo para gestionar leads en tiempo real.
              </p>
              <div className="hero-actions">
                <Link href="/soluciones/fachadas" className="btn btn-primary">
                  Ver Landing Fachadas
                </Link>
                <Link href="/materiales/termo-tratada" className="btn btn-secondary">
                  Ver Landing Termo Tratada
                </Link>
                <Link href="/admin" className="btn btn-ghost">
                  Abrir Panel Admin
                </Link>
              </div>
              <div className="home-mini-points">
                <div className="home-mini-point">
                  <strong>Arquitectura</strong>
                  <span>Lenguaje tecnico y visual sobrio para prescriptores.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Conversion</strong>
                  <span>CTA, WhatsApp y formulario listos para demos comerciales.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Escalabilidad</strong>
                  <span>Estructura repetible para nuevas landings por solucion.</span>
                </div>
              </div>
            </Reveal>

            <div className="home-visual-stack">
              <Reveal delay={120}>
                <NeonPlaceholder
                  label="Portada corporativa"
                  caption="Cuadrado verde fosforescente para reemplazar por visual real"
                  minHeight={360}
                  aspectRatio="16 / 10"
                />
              </Reveal>
              <Reveal delay={200}>
                <article className="home-highlight-card">
                  <p className="section-kicker">Prueba funcional visible</p>
                  <h3>Formulario -&gt; CRM -&gt; Dashboard en minutos</h3>
                  <ul className="home-highlight-list">
                    <li>Lead se crea desde landing con origen correcto.</li>
                    <li>Estado editable en CRM: new / in_progress / closed.</li>
                    <li>Contadores y actividad reflejados en admin.</li>
                  </ul>
                  <Link href="/admin?tab=crm" className="btn btn-secondary">
                    Ver CRM Leads
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

        <section className="section" id="soluciones">
          <div className="container">
            <Reveal>
              <div className="home-section-head">
                <p className="section-kicker">Landings protagonistas</p>
                <h2>Dos paginas de captacion listas para presentar y validar</h2>
                <p className="lead-text">
                  Cada landing responde a una linea de negocio concreta y mantiene la misma arquitectura comercial
                  para escalar nuevas soluciones sin perder consistencia.
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
                <p className="section-kicker">Ecosistema tecnico</p>
                <h2>Base narrativa para arquitectura, contract y suministro especializado</h2>
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

        <section className="section section-soft" id="contacto">
          <div className="container two-col">
            <Reveal>
              <p className="section-kicker">Ruta comercial</p>
              <h2>De la visita web a la gestion comercial en un mismo entorno</h2>
              <p className="lead-text">
                El cliente final ve una experiencia limpia y el equipo comercial recibe informacion accionable
                sin depender de procesos manuales.
              </p>
              <div className="home-workflow-panel">
                <ol className="workflow-list">
                  <li className="workflow-step">
                    <span>1</span>
                    <div>
                      <strong>Interes en landing</strong>
                      <p>CTA principal y bloque final orientados a contacto real.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>2</span>
                    <div>
                      <strong>Formulario con consentimiento</strong>
                      <p>Lead registrado con origen de landing y datos de contacto.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>3</span>
                    <div>
                      <strong>Seguimiento en CRM</strong>
                      <p>Estado editable, notas y export CSV para operativa comercial.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="hero-actions">
                <Link href="/contacto" className="btn btn-primary">
                  Ir a Contacto
                </Link>
                <Link href="/blog" className="btn btn-secondary">
                  Ver Blog Tecnico
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <NeonPlaceholder
                label="Dashboard comercial"
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
                <h2>Presentacion lista para cliente: elegante, clara y accionable</h2>
                <p className="lead-text">
                  La demo comunica vision comercial hoy y deja preparado el camino a fase productiva
                  con backend real, integraciones y operacion continua.
                </p>
                <div className="hero-actions">
                  <Link href="/soluciones/fachadas" className="btn btn-light">
                    Iniciar recorrido
                  </Link>
                  <Link href="/admin" className="btn btn-outline-light">
                    Abrir admin demo
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
