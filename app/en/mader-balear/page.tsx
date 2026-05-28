import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function EnglishMaderBalearPage() {
  return (
    <>
      <PublicHeader />
      <main className="container section">
        <div className="two-col aux-page-grid">
          <Reveal>
            <span className="chip">Madera Balear</span>
            <h1>Editorial line and reclaimed material</h1>
            <p className="lead-text">
              Brand storytelling space for integrating reclaimed proposals into projects with identity.
            </p>
            <div className="card card-pad" style={{ marginTop: "1rem" }}>
              <p>Page prepared for the next phase of the evolution plan.</p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <NeonPlaceholder
              label="Madera Balear marker"
              caption="Replace with a real visual for the reclaimed line"
              minHeight={280}
            />
          </Reveal>
        </div>
        <FloatingWhatsApp sourcePage="mader-balear" locale="en" />
      </main>
    </>
  );
}
