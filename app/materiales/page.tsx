import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function MaterialesPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <h1>Materiales Gavejo</h1>
        <p className="lead-text">Pagina indice de materiales en demo beta.</p>
        <div className="hero-actions">
          <Link href="/materiales/termo-tratada" className="btn btn-primary">
            Madera Termo Tratada (Tantimber)
          </Link>
        </div>
        <FloatingWhatsApp sourcePage="materiales-index" />
      </main>
    </>
  );
}
