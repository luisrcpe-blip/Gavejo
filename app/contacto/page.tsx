import { ContactForm } from "@/components/ui/ContactForm";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function ContactoPage() {
  return (
    <>
      <PublicHeader />
      <main className="section section-dark">
        <div className="container two-col contact-wrap">
          <div>
            <p className="section-kicker section-kicker-light">Contacto</p>
            <h1>Solicite informacion para su proyecto</h1>
            <p className="lead-text">
              Esta pagina centraliza la captacion para clientes, arquitectos y prescriptores.
            </p>
          </div>
          <ContactForm originLanding="Contacto General" />
        </div>
        <FloatingWhatsApp sourcePage="contacto" />
      </main>
    </>
  );
}
