import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function MaderBalearPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <h1>Mader Balear</h1>
        <p className="lead-text">
          Espacio editorial de referencia para lineas reclaimed, texturas y soluciones con caracter material.
        </p>
        <div className="card card-pad">
          <p>Esta pagina queda preparada como fase siguiente dentro del roadmap productivo.</p>
        </div>
        <FloatingWhatsApp sourcePage="mader-balear" />
      </main>
    </>
  );
}
