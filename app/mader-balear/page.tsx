import Image from "next/image";
import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function MaderBalearPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="hero">
          <Image
            src="https://maderasgavejo.com/wp-content/uploads/2024/07/foto-grande-web-prime-forest.webp"
            alt="Bosque y troncos en ruta forestal"
            fill
            priority
            className="hero-media"
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <Reveal>
              <span className="chip chip-light">Madera Balear</span>
              <h1>Bienvenidos a Madera Balear</h1>
              <p>Soluciones con caracter natural para arquitectura, interiorismo y proyectos profesionales.</p>
              <div className="hero-actions">
                <Link href="/contacto" className="btn btn-light">
                  Contactanos
                </Link>
                <Link href="/materiales" className="btn btn-outline-light">
                  Ver materiales
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section container">
          <Reveal>
            <span className="chip">Editorial</span>
            <h2>Linea de identidad material para propuestas diferenciadas</h2>
            <p className="lead-text">
              Madera Balear integra narrativa, textura y origen en una propuesta sobria. Esta pagina actua como
              muestra de un tercer estilo de cabecera con fondo fotografico y transicion visual elegante.
            </p>
          </Reveal>
        </section>

        <FloatingWhatsApp sourcePage="mader-balear" />
      </main>
    </>
  );
}