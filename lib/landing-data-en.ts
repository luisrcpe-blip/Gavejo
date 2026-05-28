import { LandingConfig } from "@/lib/types";

const COMMON_TECH_POINTS_EN = [
  "Audited supply chain from forest origin to final installation.",
  "EUTR compliance and use of FSC, PEFC and OLB certifications when applicable.",
  "Architecture-led specification, not a conventional shop catalog format.",
  "Technical catalogs integrated into each material block.",
  "Commercial support for studios, contractors and developers.",
  "Scalable model for residential, hospitality and contract projects."
];

export const fachadasLandingEn: LandingConfig = {
  slug: "fachadas",
  route: "/en/soluciones/fachadas",
  navName: "Facades",
  heroBadge: "Architectural envelope strategy",
  heroTitle: "Facades and cladding with advanced biomaterials",
  heroDescription:
    "A lead-generation landing page for ventilated facades, continuous cladding and premium refurbishment projects with traceability and a technical approach.",
  heroImage: "PH-HERO-FACHADAS-001",
  introTitle: "Facade architecture with technical control and commercial clarity",
  introDescription:
    "The approach combines image, performance arguments and supply clarity. It brings together Prime Forest, Treecraft and thermally modified solutions to reduce specification risk.",
  applications: [
    {
      title: "High-stability ventilated facade",
      text: "Systems designed to reduce hygrothermal movement and maintain flatness in severe exposure.",
      image: "PH-FACHADAS-APP-01",
      alt: "Ventilated facade application"
    },
    {
      title: "Continuous cladding for hospitality",
      text: "Solutions for contract projects with a sober appearance and planned maintenance.",
      image: "PH-FACHADAS-APP-02",
      alt: "Hospitality application"
    },
    {
      title: "Mediterranean refurbishment",
      text: "Materials suitable for coastal renovation, prioritizing biological durability and finish quality.",
      image: "PH-FACHADAS-APP-03",
      alt: "Refurbishment application"
    },
    {
      title: "Connected technical interiors",
      text: "Visual continuity between exterior envelope and interior surfaces for premium projects.",
      image: "PH-FACHADAS-APP-04",
      alt: "Technical interior application"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Forest supply and legality",
      text: "Selection of controlled European and tropical hardwoods with regulatory compliance and documented traceability.",
      image: "PH-FACHADAS-SYS-01",
      alt: "Forest supply system"
    },
    {
      number: "02",
      title: "Panel engineering and substructure",
      text: "Integration of high-performance panels, facade modulation and fixing details for real construction work.",
      image: "PH-FACHADAS-SYS-02",
      alt: "Panel and substructure system"
    },
    {
      number: "03",
      title: "Maintenance and life cycle",
      text: "Preventive maintenance plans to preserve appearance, reduce replacements and improve total system cost.",
      image: "PH-FACHADAS-SYS-03",
      alt: "Maintenance system"
    }
  ],
  materials: [
    {
      title: "Thermo Treated Ayous",
      subtitle: "TMT Ayous Cladding",
      text: "Low density, high stability and durability class suitable for specified exterior applications.",
      image: "PH-FACHADAS-MAT-01",
      alt: "Thermo treated ayous material",
      cta: "Download catalog",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "Thermo Modified Frake and Iroko",
      subtitle: "LDCwood / Tantimber",
      text: "Alternatives for facade and decking with strong visual identity and consistent technical response.",
      image: "PH-FACHADAS-MAT-02",
      alt: "Frake and iroko material",
      cta: "Technical sheet",
      ctaHref: "/catalogos/tantimber-ficha.pdf"
    },
    {
      title: "Burned Wood",
      subtitle: "Burned Wood Radiata",
      text: "High-impact visual finish for premium envelopes and material storytelling.",
      image: "PH-FACHADAS-MAT-03",
      alt: "Burned wood material",
      cta: "Download catalog",
      ctaHref: "/catalogos/burned-wood.pdf"
    }
  ],
  gallery: [
    { image: "PH-FACHADAS-GAL-01", alt: "Facades gallery 1" },
    { image: "PH-FACHADAS-GAL-02", alt: "Facades gallery 2" },
    { image: "PH-FACHADAS-GAL-03", alt: "Facades gallery 3" },
    { image: "PH-FACHADAS-GAL-04", alt: "Facades gallery 4" },
    { image: "PH-FACHADAS-GAL-05", alt: "Facades gallery 5" },
    { image: "PH-FACHADAS-GAL-06", alt: "Facades gallery 6" }
  ],
  technicalPoints: [
    ...COMMON_TECH_POINTS_EN,
    "System adaptation to Mediterranean climate and project conditions.",
    "A real alternative to high-carbon materials for building envelopes."
  ],
  maderBalear: {
    title: "Differentiated layer for signature projects",
    text: "Madera Balear is included as an editorial block for proposals with a crafted identity while keeping the technical logic of the main system.",
    image: "PH-FACHADAS-BANNER-01",
    ctaLabel: "Ask about complementary lines"
  },
  technicalSpecs: [
    { label: "Regulatory framework", value: "EUTR framework and audited origin documentation" },
    { label: "Target durability", value: "Class 1 to Class 2 depending on species and process" },
    { label: "Main use", value: "Ventilated facades and exterior cladding" },
    { label: "Maintenance", value: "Preventive plan according to exposure and finish" },
    { label: "Commercial focus", value: "Project capture + WhatsApp + direct contact" }
  ]
};

export const termoLandingEn: LandingConfig = {
  slug: "termo-tratada",
  route: "/en/materiales/termo-tratada",
  navName: "Tantimber",
  heroBadge: "Applied ThermoWood science",
  heroTitle: "Thermo treated wood for facades, decking and exterior systems",
  heroDescription:
    "A material-focused landing page covering thermodynamic fundamentals, biological performance and specifications for architecture and landscape projects.",
  heroImage: "PH-HERO-TERMO-001",
  introTitle: "From thermal process to on-site performance",
  introDescription:
    "The material is modified with heat and steam to reduce hygroscopicity, improve dimensional stability and extend service life without heavy biocides.",
  applications: [
    {
      title: "High-exposure decking",
      text: "26 and 42 mm profiles for intensive use on residential and hospitality terraces.",
      image: "PH-TERMO-APP-01",
      alt: "Thermo treated decking"
    },
    {
      title: "Architectural cladding",
      text: "Facade systems with a minimal appearance and stable response to climate cycles.",
      image: "PH-TERMO-APP-02",
      alt: "Thermo treated cladding"
    },
    {
      title: "Premium technical interiors",
      text: "Interior cladding stable against humidity variation from HVAC systems.",
      image: "PH-TERMO-APP-03",
      alt: "Thermo treated interior"
    },
    {
      title: "Enclosures and balustrades",
      text: "Exterior applications requiring mechanical resistance and low deformation.",
      image: "PH-TERMO-APP-04",
      alt: "Thermo treated enclosure"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Initial thermal drying",
      text: "A 38 to 76 hour stage to reduce moisture and prepare the cell matrix for peak treatment.",
      image: "PH-TERMO-SYS-01",
      alt: "Process phase 1"
    },
    {
      number: "02",
      title: "Modification at 200-212 C",
      text: "Selective degradation of hemicelluloses to reduce absorbency and improve dimensional stability.",
      image: "PH-TERMO-SYS-02",
      alt: "Process phase 2"
    },
    {
      number: "03",
      title: "Final conditioning",
      text: "Steam cooling and stabilization at 4-7% operating moisture to avoid structural collapse.",
      image: "PH-TERMO-SYS-03",
      alt: "Process phase 3"
    }
  ],
  materials: [
    {
      title: "TMT Pine (Pinus Sylvestris)",
      subtitle: "Decking and light structure",
      text: "Exterior-optimized line with reference durability and strong industrial availability.",
      image: "PH-TERMO-MAT-01",
      alt: "Pine material",
      cta: "Download Tantimber catalog",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "TMT Ash",
      subtitle: "High-value aesthetic cladding",
      text: "Recommended profile for detail-led projects where grain, stability and finish precision matter.",
      image: "PH-TERMO-MAT-02",
      alt: "Ash material",
      cta: "Technical sheet",
      ctaHref: "/catalogos/tantimber-ficha.pdf"
    },
    {
      title: "TMT Ayous",
      subtitle: "Low-density cladding",
      text: "A facade favorite for easy machining, clean texture and exterior performance.",
      image: "PH-TERMO-MAT-03",
      alt: "Ayous material",
      cta: "View specifications",
      ctaHref: "/catalogos/tantimber-specs.pdf"
    }
  ],
  gallery: [
    { image: "PH-TERMO-GAL-01", alt: "Thermowood gallery 1" },
    { image: "PH-TERMO-GAL-02", alt: "Thermowood gallery 2" },
    { image: "PH-TERMO-GAL-03", alt: "Thermowood gallery 3" },
    { image: "PH-TERMO-GAL-04", alt: "Thermowood gallery 4" },
    { image: "PH-TERMO-GAL-05", alt: "Thermowood gallery 5" },
    { image: "PH-TERMO-GAL-06", alt: "Thermowood gallery 6" }
  ],
  technicalPoints: [
    "Metal-biocide-free process for safe architectural applications.",
    "Reduced hygroscopicity and deformation control through humidity cycles.",
    "Biological durability comparable to traditionally exotic species.",
    "Compatible with bioclimatic architecture and low-carbon strategies.",
    "Industrial dimensional ranges for decking, cladding and special applications.",
    "Direct integration with technical sheets and project catalogs."
  ],
  maderBalear: {
    title: "Material storytelling complement",
    text: "When a project needs an extra emotional layer, Madera Balear adds identity without losing the technical axis of the main material.",
    image: "PH-TERMO-BANNER-01",
    ctaLabel: "Request a line combination"
  },
  technicalSpecs: [
    { label: "Process temperature", value: "Approximate operating range 200-212 C" },
    { label: "Final moisture", value: "Stabilization between 4% and 7%" },
    { label: "Durability", value: "Class 1 or Class 2 depending on species and configuration" },
    { label: "Reference deck dimension", value: "26 mm and 42 mm in structural lines" },
    { label: "Use environment", value: "Facade, decking, enclosures and technical interiors" }
  ]
};
