import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function PrivacidadPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <h1>Politica de privacidad (demo)</h1>
        <p className="lead-text">
          Esta demo utiliza los datos del formulario unicamente para fines de contacto comercial y validacion del
          flujo CRM.
        </p>
        <div className="card card-pad">
          <p>
            Responsable: Gavejo Maderas y Tableros. Finalidad: responder consultas y dar seguimiento comercial.
            Conservacion: periodo necesario para la gestion de la solicitud en contexto demo.
          </p>
        </div>
        <div className="hero-actions" style={{ marginTop: "1rem" }}>
          <Link href="/contacto" className="btn btn-primary">
            Ir a contacto
          </Link>
        </div>
        <FloatingWhatsApp sourcePage="privacidad" />
      </main>
    </>
  );
}
