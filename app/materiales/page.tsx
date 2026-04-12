import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function MaterialesPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Materiales</span>
            <h1>Catalogo tecnico de biomateriales</h1>
            <p className="lead-text">
              Seleccion de lineas para fachada, deck e interior con enfoque en rendimiento y trazabilidad.
            </p>
            <div className="hero-actions">
              <Link href="/materiales/termo-tratada" className="btn btn-primary">
                Madera Termo Tratada (Tantimber)
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Placeholder materiales"
              caption="Sustituir por visual real de muestra de material"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="materiales-index" />
      </main>
    </>
  );
}
