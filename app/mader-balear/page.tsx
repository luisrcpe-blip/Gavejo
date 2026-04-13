import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function MaderBalearPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Madera Balear</span>
            <h1>Linea editorial y material recuperado</h1>
            <p className="lead-text">
              Espacio de narrativa de marca para integrar propuestas recuperadas en proyectos con identidad.
            </p>
            <div className="card card-pad" style={{ marginTop: "1rem" }}>
              <p>Pagina preparada para la siguiente fase del plan de evolucion.</p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Marcador de Madera Balear"
              caption="Sustituir por visual real de linea recuperada"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="mader-balear" />
      </main>
    </>
  );
}
