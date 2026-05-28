import Link from "next/link";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { NeonPlaceholder } from "@/components/ui/NeonPlaceholder";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Reveal } from "@/components/ui/Reveal";
import { HomePrimaryRoutes } from "@/components/home/HomePrimaryRoutes";
import { localizePath } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const locale = "en" as const;

const kpiItems = [
  {
    kicker: "Thermo treated wood",
    value: "200 C+",
    description: "Thermal process for stability and durability without biocides."
  },
  {
    kicker: "Traceability",
    value: "95%+ FSC",
    description: "Certified volume for technical decisions with documented support."
  },
  {
    kicker: "Durability",
    value: "15-25 years",
    description: "Target service life outdoors depending on species and use."
  },
  {
    kicker: "Lead capture",
    value: "2 pages",
    description: "Complete demo funnel with contact, WhatsApp and CRM."
  }
];

const solutionCards = [
  {
    title: "Woods",
    href: "/materiales/termo-tratada",
    caption: "Thermo treated, burned and reclaimed wood for exterior, interior and identity-led projects.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Boards",
    href: "/soluciones/fachadas",
    caption: "Technical board solutions, traceability and supply for professional specification.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Contract",
    href: "/soluciones/fachadas",
    caption: "Systems for hotels, retail and professional projects with technical criteria and planned maintenance.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  }
];

const ecosystemCards = [
  {
    title: "Prime Forest",
    copy: "Controlled forest origin for supply with legal and technical criteria.",
    placeholder: "Forestry and European hardwoods"
  },
  {
    title: "Treecraft Plywood",
    copy: "Engineered panels with quality control and CE framework.",
    placeholder: "Plywood and traceability"
  },
  {
    title: "Tantimber / LDCwood",
    copy: "Thermo treated wood catalog for envelopes, terraces and professional projects.",
    placeholder: "Premium exterior cladding"
  }
];

export default function EnglishHomePage() {
  return (
    <>
      <PublicHeader />
      <main className="home-wrap">
        <section className="section home-hero-shell" id="inicio" data-tour-id="section-inicio">
          <div className="container home-hero-grid">
            <Reveal>
              <span className="chip">Executive demo · Advanced biomaterials</span>
              <h1>Gavejo: commercial platform for facades and thermo treated wood</h1>
              <p className="lead-text home-lead">
                A stronger home page for presenting the proposal to decision makers: two specialized pages,
                a demonstrable lead-capture flow and an admin panel ready to manage inquiries in real time.
              </p>
              <HomePrimaryRoutes locale={locale} />
              <div className="home-mini-points">
                <div className="home-mini-point">
                  <strong>Architecture</strong>
                  <span>Technical language and sober visuals for specifiers.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Conversion</strong>
                  <span>Calls to action, WhatsApp and forms ready for commercial demos.</span>
                </div>
                <div className="home-mini-point">
                  <strong>Scalability</strong>
                  <span>Repeatable structure for new solution pages.</span>
                </div>
              </div>
            </Reveal>

            <div className="home-visual-stack">
              <Reveal delay={120}>
                <NeonPlaceholder
                  label="Corporate cover"
                  caption="Green marker to replace with a real visual"
                  minHeight={360}
                  aspectRatio="16 / 10"
                />
              </Reveal>
              <Reveal delay={200}>
                <article className="home-highlight-card">
                  <p className="section-kicker">Visible functional proof</p>
                  <h3>Form -&gt; CRM -&gt; control panel in minutes</h3>
                  <ul className="home-highlight-list">
                    <li>The inquiry is created from the page with the correct source.</li>
                    <li>Editable CRM status: new / in progress / closed.</li>
                    <li>Counters and activity are reflected in the admin panel.</li>
                  </ul>
                  <Link href="/admin?tab=crm" className="btn btn-secondary">
                    View CRM inquiries
                  </Link>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container home-proof-band">
            {kpiItems.map((item) => (
              <article className="card card-pad" key={item.kicker}>
                <p className="mini-kicker">{item.kicker}</p>
                <h3>{item.value}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="soluciones" data-tour-id="section-soluciones">
          <div className="container">
            <Reveal>
              <div className="home-section-head" data-tour-id="section-soluciones-head">
                <p className="section-kicker">Primary pages</p>
                <h2>Two lead-capture pages ready to present and validate</h2>
                <p className="lead-text">
                  Each page responds to a specific business line and keeps the same commercial architecture
                  so new solutions can scale without losing consistency.
                </p>
              </div>
            </Reveal>

            <div className="home-solution-grid">
              {solutionCards.map((solution, idx) => (
                <Reveal key={solution.title} delay={idx * 90}>
                  <article className="solution-card" style={{ backgroundImage: `url(${solution.image})` }}>
                    <Link
                      href={localizePath(solution.href, locale)}
                      className="solution-panel-link"
                      aria-label={`Open ${solution.title}`}
                    >
                      <span className="solution-panel-title">{solution.title}</span>
                      <span className="solution-panel-description">{solution.caption}</span>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal>
              <div className="home-section-head">
                <p className="section-kicker">Technical ecosystem</p>
                <h2>Story foundation for architecture, professional projects and specialized supply</h2>
              </div>
            </Reveal>
            <div className="grid grid-3">
              {ecosystemCards.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 90}>
                  <article className="card card-pad">
                    <NeonPlaceholder
                      label={item.title}
                      caption={item.placeholder}
                      minHeight={210}
                      aspectRatio="4 / 3"
                    />
                    <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="contacto" data-tour-id="section-contacto">
          <div className="container two-col">
            <Reveal>
              <div data-tour-id="section-contacto-head">
                <p className="section-kicker">Commercial route</p>
                <h2>From website visit to commercial management in one environment</h2>
                <p className="lead-text">
                  The final client sees a clean experience and the commercial team receives actionable
                  information without relying on manual processes.
                </p>
              </div>
              <div className="home-workflow-panel">
                <ol className="workflow-list">
                  <li className="workflow-step">
                    <span>1</span>
                    <div>
                      <strong>Page interest</strong>
                      <p>Main call to action and final block oriented to real contact.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>2</span>
                    <div>
                      <strong>Form with consent</strong>
                      <p>Inquiry registered with page source and contact details.</p>
                    </div>
                  </li>
                  <li className="workflow-step">
                    <span>3</span>
                    <div>
                      <strong>CRM follow-up</strong>
                      <p>Editable status, notes and CSV export for commercial operations.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="hero-actions">
                <Link href={localizePath("/contacto", locale)} className="btn btn-primary">
                  Go to contact
                </Link>
                <Link href={localizePath("/blog", locale)} className="btn btn-secondary">
                  View technical blog
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <NeonPlaceholder
                label="Commercial panel"
                caption="Replace with a real CRM flow screenshot"
                minHeight={320}
                aspectRatio="16 / 10"
              />
            </Reveal>
          </div>
        </section>

        <section className="section home-final-cta">
          <div className="container">
            <Reveal>
              <div className="home-final-card">
                <p className="chip chip-light">Demo status</p>
                <h2>Client-ready presentation: elegant, clear and actionable</h2>
                <p className="lead-text">
                  The demo communicates commercial vision now and prepares the path toward production with
                  real backend, integrations and continuous operation.
                </p>
                <div className="hero-actions">
                  <Link href={localizePath("/soluciones/fachadas", locale)} className="btn btn-light">
                    Start walkthrough
                  </Link>
                  <Link href="/admin" className="btn btn-outline-light">
                    Open admin panel
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FloatingWhatsApp sourcePage="home" locale={locale} />
      </main>
    </>
  );
}
