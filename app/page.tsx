import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="home-wrap">
        <section className="section home-hero-shell">
          <div className="container home-hero-grid">
            <Reveal>
              <span className="chip">Demo ejecutiva · Biomateriales avanzados</span>
              <h1>Gavejo: solucion comercial para fachadas y madera termo tratada</h1>
              <p className="lead-text home-lead">
                Esta home sintetiza la propuesta de valor: captacion de leads, lenguaje tecnico para arquitectos,
                y estructura repetible para desplegar nuevas landings sin rehacer el sistema.
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
            </Reveal>

            <Reveal delay={120}>
              <NeonPlaceholder
                label="Placeholder portada corporativa"
                caption="Cuadrado verde fosforescente para reemplazar por imagen real"
                minHeight={360}
              />
            </Reveal>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container kpi-strip">
            <article className="card card-pad">
              <p className="mini-kicker">ThermoWood</p>
              <h3>200 C+</h3>
              <p>Proceso termico de modificacion para estabilidad y durabilidad.</p>
            </article>
            <article className="card card-pad">
              <p className="mini-kicker">Certificacion</p>
              <h3>95%+ FSC</h3>
              <p>Volumen comercial con enfoque certificado y trazabilidad.</p>
            </article>
            <article className="card card-pad">
              <p className="mini-kicker">Vida util</p>
              <h3>15-25 anos</h3>
              <p>Objetivo de durabilidad biologica en exterior segun especie.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid-3">
            <Reveal>
              <article className="card card-pad">
                <NeonPlaceholder label="Prime Forest" caption="Silvicultura y frondosas europeas" minHeight={210} />
                <h3 style={{ marginTop: "1rem" }}>Origen forestal controlado</h3>
                <p>Base de abastecimiento responsable para proyectos con exigencia tecnica y legal.</p>
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article className="card card-pad">
                <NeonPlaceholder label="Treecraft Plywood" caption="Ingenieria de tablero y CE" minHeight={210} />
                <h3 style={{ marginTop: "1rem" }}>Paneles con trazabilidad transcontinental</h3>
                <p>Control de calidad en fabrica y cumplimiento de estandares europeos.</p>
              </article>
            </Reveal>
            <Reveal delay={180}>
              <article className="card card-pad">
                <NeonPlaceholder label="Tantimber / LDCwood" caption="Termo modificacion y cladding" minHeight={210} />
                <h3 style={{ marginTop: "1rem" }}>Material para envolvente y deck</h3>
                <p>Catalogo tecnico con aplicaciones reales para arquitectura y sector contract.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container two-col">
            <Reveal>
              <p className="section-kicker">Ruta comercial</p>
              <h2>De la landing al CRM en un flujo demostrable</h2>
              <p className="lead-text">
                El recorrido esta pensado para venta consultiva: CTA, formulario, alta de lead en CRM y gestion
                de estado desde admin.
              </p>
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
                label="Placeholder dashboard comercial"
                caption="Sustituir por captura real del flujo CRM"
                minHeight={300}
              />
            </Reveal>
          </div>
        </section>

        <FloatingWhatsApp sourcePage="home" />
      </main>
    </>
  );
}
