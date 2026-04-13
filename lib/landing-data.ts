import { LandingConfig } from "@/lib/types";

const COMMON_TECH_POINTS = [
  "Cadena de suministro auditada desde bosque hasta instalacion final.",
  "Cumplimiento EUTR y uso de certificaciones FSC, PEFC y OLB cuando aplica.",
  "Diseno orientado a especificacion arquitectonica, no a formato tienda.",
  "Integracion de catalogos tecnicos dentro de cada bloque de material.",
  "Soporte comercial para estudios, constructoras y promotores.",
  "Modelo escalable para proyectos residenciales, hoteleros y contract."
];

export const fachadasLanding: LandingConfig = {
  slug: "fachadas",
  route: "/soluciones/fachadas",
  navName: "Fachadas",
  heroBadge: "Estrategia de envolvente arquitectonica",
  heroTitle: "Fachadas y revestimientos de biomateriales avanzados",
  heroDescription:
    "Landing orientada a captacion para proyectos de fachada ventilada, revestimiento continuo y rehabilitacion premium con trazabilidad y enfoque tecnico.",
  heroImage: "PH-HERO-FACHADAS-001",
  introTitle: "Arquitectura de fachada con control tecnico y narrativa comercial",
  introDescription:
    "El enfoque combina imagen, argumento de desempeno y claridad de suministro. Se integra conocimiento de Prime Forest, Treecraft y soluciones termo modificadas para reducir riesgo de especificacion.",
  applications: [
    {
      title: "Fachada ventilada de alta estabilidad",
      text: "Sistemas para minimizar movimientos higrotermicos y mantener planimetria en exposicion severa.",
      image: "PH-FACHADAS-APP-01",
      alt: "Aplicacion en fachada ventilada"
    },
    {
      title: "Revestimiento continuo en hoteleria",
      text: "Soluciones para proyectos contract con lectura sobria y mantenimiento planificado.",
      image: "PH-FACHADAS-APP-02",
      alt: "Aplicacion hotelera"
    },
    {
      title: "Rehabilitacion mediterranea",
      text: "Materiales aptos para reforma costera con prioridad en durabilidad biologica y acabado.",
      image: "PH-FACHADAS-APP-03",
      alt: "Aplicacion en rehabilitacion"
    },
    {
      title: "Interiores tecnicos conectados",
      text: "Continuidad visual entre envolvente exterior e interior para proyectos premium.",
      image: "PH-FACHADAS-APP-04",
      alt: "Aplicacion en interior tecnico"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Abastecimiento forestal y legalidad",
      text: "Seleccion de frondosas europeas y tropicales controladas con cumplimiento normativo y trazabilidad documental.",
      image: "PH-FACHADAS-SYS-01",
      alt: "Sistema de abastecimiento forestal"
    },
    {
      number: "02",
      title: "Ingenieria de panel y subestructura",
      text: "Integracion de tableros de alto rendimiento, modulado de fachada y detalle de fijaciones para obra real.",
      image: "PH-FACHADAS-SYS-02",
      alt: "Sistema de panel y subestructura"
    },
    {
      number: "03",
      title: "Mantenimiento y ciclo de vida",
      text: "Plan de mantenimiento preventivo para conservar apariencia, reducir reemplazos y mejorar costo total del sistema.",
      image: "PH-FACHADAS-SYS-03",
      alt: "Sistema de mantenimiento"
    }
  ],
  materials: [
    {
      title: "Ayous Termo Tratado",
      subtitle: "TMT Ayous Cladding",
      text: "Baja densidad, alta estabilidad y clase de durabilidad apta para aplicaciones exteriores especificadas.",
      image: "PH-FACHADAS-MAT-01",
      alt: "Material ayous termo tratado",
      cta: "Descargar catalogo",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "Frake e Iroko Termo Modificados",
      subtitle: "LDCwood / Tantimber",
      text: "Alternativas para fachada y deck con identidad visual marcada y respuesta tecnica consistente.",
      image: "PH-FACHADAS-MAT-02",
      alt: "Material frake e iroko",
      cta: "Ficha tecnica",
      ctaHref: "/catalogos/tantimber-ficha.pdf"
    },
    {
      title: "Madera Quemada",
      subtitle: "Burned Wood Radiata",
      text: "Acabado de alto impacto visual con enfoque en envolvente premium y narrativa material.",
      image: "PH-FACHADAS-MAT-03",
      alt: "Material burned wood",
      cta: "Descargar catalogo",
      ctaHref: "/catalogos/burned-wood.pdf"
    }
  ],
  gallery: [
    { image: "PH-FACHADAS-GAL-01", alt: "Galeria fachadas 1" },
    { image: "PH-FACHADAS-GAL-02", alt: "Galeria fachadas 2" },
    { image: "PH-FACHADAS-GAL-03", alt: "Galeria fachadas 3" },
    { image: "PH-FACHADAS-GAL-04", alt: "Galeria fachadas 4" },
    { image: "PH-FACHADAS-GAL-05", alt: "Galeria fachadas 5" },
    { image: "PH-FACHADAS-GAL-06", alt: "Galeria fachadas 6" }
  ],
  technicalPoints: [
    ...COMMON_TECH_POINTS,
    "Adaptacion de sistema a clima mediterraneo y condicion de proyecto.",
    "Alternativa real a materiales de alta huella de carbono en envolventes."
  ],
  maderBalear: {
    title: "Capa diferencial para proyectos de autor",
    text: "Madera Balear se incorpora como bloque editorial para propuestas con caracter artesanal, sin perder la logica tecnica del sistema principal.",
    image: "PH-FACHADAS-BANNER-01",
    ctaLabel: "Consultar linea complementaria"
  },
  technicalSpecs: [
    { label: "Normativa", value: "Marco EUTR y documentacion de origen auditada" },
    { label: "Durabilidad objetivo", value: "Clase 1 a Clase 2 segun especie y proceso" },
    { label: "Uso principal", value: "Fachadas ventiladas y revestimientos exteriores" },
    { label: "Mantenimiento", value: "Plan preventivo segun exposicion y acabado" },
    { label: "Enfoque comercial", value: "Captacion de proyecto + WhatsApp + contacto directo" }
  ]
};

export const termoLanding: LandingConfig = {
  slug: "termo-tratada",
  route: "/materiales/termo-tratada",
  navName: "Tantimber",
  heroBadge: "Ciencia ThermoWood aplicada",
  heroTitle: "Madera termo tratada para fachadas, deck y sistemas exteriores",
  heroDescription:
    "Landing centrada en el material: fundamentos termodinamicos, rendimiento biologico y especificaciones para arquitectura y paisajismo.",
  heroImage: "PH-HERO-TERMO-001",
  introTitle: "Del proceso termico al rendimiento en obra",
  introDescription:
    "El material se modifica con calor y vapor para reducir higroscopicidad, mejorar estabilidad dimensional y extender vida util sin biocidas pesados.",
  applications: [
    {
      title: "Decking de alta exposicion",
      text: "Perfiles de 26 y 42 mm para uso intensivo en terrazas residenciales y hospitality.",
      image: "PH-TERMO-APP-01",
      alt: "Decking termo tratado"
    },
    {
      title: "Cladding arquitectonico",
      text: "Sistemas para fachada con lectura minimalista y respuesta estable ante ciclos climaticos.",
      image: "PH-TERMO-APP-02",
      alt: "Cladding termo tratado"
    },
    {
      title: "Interior tecnico premium",
      text: "Revestimientos internos estables frente a variaciones de humedad por HVAC.",
      image: "PH-TERMO-APP-03",
      alt: "Interior termo tratado"
    },
    {
      title: "Cerramientos y balustradas",
      text: "Aplicaciones exteriores donde se requiere resistencia mecanica y baja deformacion.",
      image: "PH-TERMO-APP-04",
      alt: "Cerramiento termo tratado"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Secado termico inicial",
      text: "Fase de 38 a 76 horas para reducir humedad y preparar la matriz celular para el tratamiento de pico.",
      image: "PH-TERMO-SYS-01",
      alt: "Fase 1 del proceso"
    },
    {
      number: "02",
      title: "Modificacion a 200-212 C",
      text: "Degradacion selectiva de hemicelulosas para disminuir absorbencia y mejorar estabilidad dimensional.",
      image: "PH-TERMO-SYS-02",
      alt: "Fase 2 del proceso"
    },
    {
      number: "03",
      title: "Acondicionamiento final",
      text: "Enfriamiento con vapor y estabilizacion a 4-7% de humedad operativa para evitar colapso estructural.",
      image: "PH-TERMO-SYS-03",
      alt: "Fase 3 del proceso"
    }
  ],
  materials: [
    {
      title: "TMT Pine (Pinus Sylvestris)",
      subtitle: "Decking y estructura ligera",
      text: "Linea optimizada para exterior con durabilidad de referencia y buena disponibilidad industrial.",
      image: "PH-TERMO-MAT-01",
      alt: "Material pine",
      cta: "Descargar catalogo Tantimber",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "TMT Ash",
      subtitle: "Revestimiento de alto valor estetico",
      text: "Perfil recomendado para proyectos de detalle donde importan veta, estabilidad y precision de acabado.",
      image: "PH-TERMO-MAT-02",
      alt: "Material ash",
      cta: "Ficha tecnica",
      ctaHref: "/catalogos/tantimber-ficha.pdf"
    },
    {
      title: "TMT Ayous",
      subtitle: "Cladding de baja densidad",
      text: "Opcion favorita en fachada por facilidad de mecanizado, textura limpia y rendimiento exterior.",
      image: "PH-TERMO-MAT-03",
      alt: "Material ayous",
      cta: "Ver especificaciones",
      ctaHref: "/catalogos/tantimber-specs.pdf"
    }
  ],
  gallery: [
    { image: "PH-TERMO-GAL-01", alt: "Galeria termo 1" },
    { image: "PH-TERMO-GAL-02", alt: "Galeria termo 2" },
    { image: "PH-TERMO-GAL-03", alt: "Galeria termo 3" },
    { image: "PH-TERMO-GAL-04", alt: "Galeria termo 4" },
    { image: "PH-TERMO-GAL-05", alt: "Galeria termo 5" },
    { image: "PH-TERMO-GAL-06", alt: "Galeria termo 6" }
  ],
  technicalPoints: [
    "Proceso libre de biocidas metalicos para aplicaciones arquitectonicas seguras.",
    "Reduccion de higroscopicidad y control de deformacion por ciclos de humedad.",
    "Durabilidad biologica equiparable a especies tradicionalmente exoticas.",
    "Compatibilidad con estrategias de arquitectura bioclimatica y baja huella de carbono.",
    "Rangos dimensionales industriales para deck, cladding y aplicaciones especiales.",
    "Integracion directa con fichas tecnicas y catalogos de proyecto."
  ],
  maderBalear: {
    title: "Complemento de narrativa material",
    text: "Cuando el proyecto pide una capa emocional adicional, Madera Balear se suma como recurso de identidad sin perder el eje tecnico del material principal.",
    image: "PH-TERMO-BANNER-01",
    ctaLabel: "Solicitar combinacion de lineas"
  },
  technicalSpecs: [
    { label: "Temperatura de proceso", value: "Rango operativo aproximado 200-212 C" },
    { label: "Humedad final", value: "Estabilizacion entre 4% y 7%" },
    { label: "Durabilidad", value: "Clase 1 o Clase 2 segun especie y configuracion" },
    { label: "Dimension deck referencia", value: "26 mm y 42 mm en lineas estructurales" },
    { label: "Entorno de uso", value: "Fachada, deck, cerramientos e interior tecnico" }
  ]
};
