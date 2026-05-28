import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function EnglishPrivacyPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Privacy</span>
            <h1>Privacy policy (demo)</h1>
            <p className="lead-text">
              This demo uses form data for commercial contact and CRM flow validation.
            </p>
            <div className="card card-pad" style={{ marginTop: "1rem" }}>
              <p>
                Controller: Gavejo Maderas y Tableros. Purpose: answer inquiries and provide commercial
                follow-up. Retention: the period required to manage the request in demo context.
              </p>
            </div>
            <div className="hero-actions" style={{ marginTop: "1rem" }}>
              <Link href="/en/contacto" className="btn btn-primary">
                Go to contact
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Legal marker"
              caption="Replace with a trust and compliance visual resource"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="privacy" locale="en" />
      </main>
    </>
  );
}
