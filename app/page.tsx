import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="home-wrap">
        <section className="container section">
          <span className="chip">Demo Beta V3 - Gavejo</span>
          <h1>Web corporativa orientada a captacion y posicionamiento tecnico</h1>
          <p className="lead-text home-lead">
            Esta demo incluye 2 landings completas, panel admin tipo WordPress y CRM de leads funcional para
            presentacion comercial.
          </p>
          <div className="hero-actions">
            <Link href="/soluciones/fachadas" className="btn btn-primary">
              Ver Landing Fachadas
            </Link>
            <Link href="/materiales/termo-tratada" className="btn btn-secondary">
              Ver Landing Termo Tratada
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Ver Blog tecnico
            </Link>
            <Link href="/admin" className="btn btn-ghost">
              Abrir Panel Admin
            </Link>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container grid grid-3">
            <article className="card card-pad">
              <h3>Flujo comercial real</h3>
              <p>Formulario -&gt; CRM -&gt; cambio de estado -&gt; seguimiento interno.</p>
            </article>
            <article className="card card-pad">
              <h3>Diseno sobrio premium</h3>
              <p>Tipografia Poppins, tokens de diseno y motion profesional no invasivo.</p>
            </article>
            <article className="card card-pad">
              <h3>Base escalable</h3>
              <p>Preparado para evolucionar a backend real, auth y base de datos productiva.</p>
            </article>
          </div>
        </section>

        <FloatingWhatsApp sourcePage="home" />
      </main>
    </>
  );
}
