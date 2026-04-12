import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function SolucionesPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Soluciones</span>
            <h1>Linea de soluciones arquitectonicas</h1>
            <p className="lead-text">
              Punto de entrada para navegar landings orientadas a captacion y especificacion tecnica.
            </p>
            <div className="hero-actions">
              <Link href="/soluciones/fachadas" className="btn btn-primary">
                Fachadas y Revestimientos
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Placeholder soluciones"
              caption="Sustituir por visual real de sistema de fachada"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="soluciones-index" />
      </main>
    </>
  );
}
