import { ContactForm } from "@/components/ui/ContactForm";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";

export default function EnglishContactPage() {
  return (
    <>
      <PublicHeader />
      <main className="section section-dark">
        <div className="container two-col contact-wrap">
          <div>
            <p className="section-kicker section-kicker-light">Contact</p>
            <h1>Request information for your project</h1>
            <p className="lead-text">
              This page centralizes lead capture for clients, architects and specifiers.
            </p>
          </div>
          <ContactForm originLanding="General Contact" locale="en" />
        </div>
        <FloatingWhatsApp sourcePage="contact" locale="en" />
      </main>
    </>
  );
}
