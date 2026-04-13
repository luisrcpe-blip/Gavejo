import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function PrivacidadPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Privacidad</span>
            <h1>Política de privacidad (demo)</h1>
            <p className="lead-text">
              Esta demo utiliza datos del formulario para contacto comercial y validación del flujo CRM.
            </p>
            <div className="card card-pad" style={{ marginTop: "1rem" }}>
              <p>
                Responsable: Gavejo Maderas y Tableros. Finalidad: responder consultas y dar seguimiento comercial.
                Conservación: período necesario para la gestión de la solicitud en contexto demo.
              </p>
            </div>
            <div className="hero-actions" style={{ marginTop: "1rem" }}>
              <Link href="/contacto" className="btn btn-primary">
                Ir a contacto
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Marcador legal"
              caption="Sustituir por recurso visual de cumplimiento y confianza"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="privacidad" />
      </main>
    </>
  );
}

