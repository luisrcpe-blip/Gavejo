import { LandingConfig } from "@/lib/types";

const COMMON_TECH_POINTS = [
  "Durabilidad y estabilidad dimensional para proyectos exigentes.",
  "Compatibilidad para exterior e interior según sistema y acabado.",
  "Adaptación técnica al clima mediterráneo y balear.",
  "Selección de material por uso, mantenimiento y ciclo de vida.",
  "Acompañamiento técnico y comercial durante el proyecto.",
  "Catálogos integrados por material para acelerar especificación."
];

export const fachadasLanding: LandingConfig = {
  slug: "fachadas",
  route: "/soluciones/fachadas",
  navName: "Fachadas",
  heroBadge: "Arquitectura Mediterránea · Soluciones de Envolvente",
  heroTitle: "Fachadas y revestimientos de madera con criterio técnico",
  heroDescription:
    "Soluciones para proyectos residenciales y contract con lectura arquitectónica, desempeño exterior y soporte comercial especializado.",
  heroImage:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
  introTitle: "Una landing pensada para captar, posicionar y convertir.",
  introDescription:
    "Esta página combina presencia visual, narrativa técnica y un recorrido comercial claro para facilitar la decisión de arquitectos, interioristas y cliente final.",
  applications: [
    {
      title: "Fachadas ventiladas",
      text: "Soluciones para envolventes exteriores con modulación limpia y comportamiento estable.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      alt: "Fachada ventilada de madera en proyecto residencial"
    },
    {
      title: "Revestimientos interiores",
      text: "Superficies cálidas y técnicas para retail, hospitality y vivienda premium.",
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
      alt: "Revestimiento interior de madera"
    },
    {
      title: "Residencial",
      text: "Aplicaciones adaptadas a villas y reformas de alto nivel.",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80",
      alt: "Proyecto residencial con madera"
    },
    {
      title: "Hoteles y contract",
      text: "Materiales con durabilidad y estética para espacios de alto uso.",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
      alt: "Hotel con soluciones de madera"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Sistema de subestructura",
      text: "Configuración técnica adaptada al soporte, ventilación y modulación del proyecto.",
      image:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80",
      alt: "Detalle de subestructura técnica"
    },
    {
      number: "02",
      title: "Instalación vertical u horizontal",
      text: "Flexibilidad compositiva para reforzar ritmo, proporción y lectura de fachada.",
      image:
        "https://images.unsplash.com/photo-1529421306624-54a9f3d7b5fa?auto=format&fit=crop&w=900&q=80",
      alt: "Instalación horizontal de lamas"
    },
    {
      number: "03",
      title: "Soluciones a medida",
      text: "Estudio de encuentros, secciones y acabados según contexto técnico y estético.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
      alt: "Solución arquitectónica personalizada"
    }
  ],
  materials: [
    {
      title: "Madera termo tratada",
      subtitle: "Tantimber",
      text: "Estabilidad y durabilidad para exterior e interior con lenguaje contemporáneo.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
      alt: "Madera termo tratada",
      cta: "Descargar catálogo",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "Madera quemada",
      subtitle: "Burned Wood",
      text: "Identidad visual profunda y protección superficial para proyectos singulares.",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80",
      alt: "Madera quemada",
      cta: "Descargar catálogo",
      ctaHref: "/catalogos/burned-wood.pdf"
    },
    {
      title: "Reclaimed",
      subtitle: "Mader Balear",
      text: "Material con carácter e historia para proyectos con narrativa editorial.",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      alt: "Madera reclaimed",
      cta: "Ver colección",
      ctaHref: "/catalogos/mader-balear.pdf"
    }
  ],
  gallery: [
    {
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
      alt: "Detalle de fachada"
    },
    {
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      alt: "Volumen arquitectónico revestido"
    },
    {
      image:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=900&q=80",
      alt: "Textura de madera exterior"
    },
    {
      image:
        "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80",
      alt: "Esquina de fachada ventilada"
    },
    {
      image:
        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80",
      alt: "Proyecto mediterráneo"
    },
    {
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      alt: "Aplicación interior"
    }
  ],
  technicalPoints: COMMON_TECH_POINTS,
  maderBalear: {
    title: "Mader Balear como capa editorial y emocional",
    text: "Cuando el proyecto requiere material recuperado y lectura artesanal, la línea Mader Balear aporta textura, historia y diferenciación sin romper la lógica principal de solución.",
    image:
      "https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1600&q=80",
    ctaLabel: "Consultar esta línea"
  },
  technicalSpecs: undefined
};

export const termoLanding: LandingConfig = {
  slug: "termo-tratada",
  route: "/materiales/termo-tratada",
  navName: "Tantimber",
  heroBadge: "Material Técnico · Tantimber",
  heroTitle: "Madera termo tratada para fachadas, deck y envolventes",
  heroDescription:
    "Material de alto desempeño con estabilidad dimensional y estética cálida para arquitectura contemporánea.",
  heroImage:
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  introTitle: "Posicionamiento técnico del material",
  introDescription:
    "Tantimber combina desempeño y diseño: ofrece respuesta estable para exterior y una lectura material sofisticada para interior.",
  applications: [
    {
      title: "Fachada técnica",
      text: "Revestimiento exterior con alta estabilidad y ritmo arquitectónico.",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80",
      alt: "Fachada con termo tratada"
    },
    {
      title: "Cubierta y aleros",
      text: "Acabados cálidos en zonas expuestas con bajo mantenimiento.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      alt: "Cubierta con madera técnica"
    },
    {
      title: "Deck exterior",
      text: "Solución para tránsito con equilibrio entre durabilidad y presencia.",
      image:
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=900&q=80",
      alt: "Deck exterior"
    },
    {
      title: "Interior premium",
      text: "Aplicación en revestimientos de alta calidad estética.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
      alt: "Interior con termo tratada"
    }
  ],
  systems: [
    {
      number: "01",
      title: "Proceso de termo tratamiento",
      text: "Tratamiento térmico controlado para mejorar estabilidad y comportamiento del material.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
      alt: "Proceso técnico del material"
    },
    {
      number: "02",
      title: "Instalación por sistema",
      text: "Montaje definido según uso, soporte y exigencia de mantenimiento.",
      image:
        "https://images.unsplash.com/photo-1529421306624-54a9f3d7b5fa?auto=format&fit=crop&w=900&q=80",
      alt: "Instalación de material"
    },
    {
      number: "03",
      title: "Mantenimiento programado",
      text: "Guía de cuidado para sostener apariencia y rendimiento en el tiempo.",
      image:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80",
      alt: "Mantenimiento técnico"
    }
  ],
  materials: [
    {
      title: "Tantimber Exterior",
      subtitle: "Clase de uso exterior",
      text: "Recomendado para fachadas y decks con alto estándar de desempeño.",
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
      alt: "Tantimber exterior",
      cta: "Descargar catálogo Tantimber",
      ctaHref: "/catalogos/tantimber.pdf"
    },
    {
      title: "Tantimber Interior",
      subtitle: "Acabado premium",
      text: "Solución para interiores con continuidad visual y estabilidad.",
      image:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=900&q=80",
      alt: "Tantimber interior",
      cta: "Ficha técnica",
      ctaHref: "/catalogos/tantimber-ficha.pdf"
    },
    {
      title: "Especificaciones",
      subtitle: "Tabla técnica",
      text: "Clase de uso, dimensiones, acabados y recomendaciones de instalación.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      alt: "Especificaciones de madera termo tratada",
      cta: "Ver especificaciones",
      ctaHref: "/catalogos/tantimber-specs.pdf"
    }
  ],
  gallery: fachadasLanding.gallery,
  technicalPoints: [
    "Clase de uso apta para aplicaciones exteriores exigentes.",
    "Estabilidad dimensional superior frente a variaciones ambientales.",
    "Acabados compatibles para lenguaje arquitectónico contemporáneo.",
    "Rendimiento predecible para especificación en proyecto.",
    "Disponibilidad de documentación técnica para prescriptores.",
    "Integración comercial y soporte durante definición de sistema."
  ],
  maderBalear: {
    title: "Complemento editorial: Mader Balear",
    text: "Para propuestas con acento artesanal o material recuperado, se incorpora una capa emocional compatible con la solución principal.",
    image:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80",
    ctaLabel: "Explorar universo Mader Balear"
  },
  technicalSpecs: [
    { label: "Clase de uso", value: "Exterior e interior (según sistema)" },
    { label: "Tratamiento", value: "Termo tratamiento controlado de alta estabilidad" },
    { label: "Dimensiones", value: "Largos y secciones según disponibilidad técnica" },
    { label: "Acabados", value: "Natural, aceitado o pigmentado por proyecto" },
    { label: "Mantenimiento", value: "Plan preventivo recomendado por exposición" }
  ]
};
