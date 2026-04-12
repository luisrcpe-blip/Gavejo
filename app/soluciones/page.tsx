import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function SolucionesPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <h1>Soluciones Gavejo</h1>
        <p className="lead-text">Pagina indice de soluciones en demo beta.</p>
        <div className="hero-actions">
          <Link href="/soluciones/fachadas" className="btn btn-primary">
            Fachadas y Revestimientos
          </Link>
        </div>
        <FloatingWhatsApp sourcePage="soluciones-index" />
      </main>
    </>
  );
}
