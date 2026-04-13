"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const PRIMARY_ROUTES = [
  {
    href: "/soluciones/fachadas",
    buttonLabel: "Ver landing principal",
    title: "Paso 1 - Landing de soluciones",
    description:
      "Presenta fachadas y revestimientos con enfoque comercial para captar interes tecnico desde el primer bloque.",
    buttonClass: "btn-primary"
  },
  {
    href: "/materiales/termo-tratada",
    buttonLabel: "Ver landing de madera termotratada",
    title: "Paso 2 - Landing de materiales",
    description:
      "Explica proceso, ventajas y aplicaciones de la madera termotratada con lenguaje claro para arquitectos y prescriptores.",
    buttonClass: "btn-secondary"
  },
  {
    href: "/admin",
    buttonLabel: "Abrir panel admin",
    title: "Paso 3 - Panel de administracion",
    description:
      "Muestra el flujo completo de consultas: entrada desde formulario, gestion de estado y seguimiento comercial en CRM.",
    buttonClass: "btn-ghost"
  }
] as const;

export function HomePrimaryRoutes() {
  const [activeStep, setActiveStep] = useState(0);
  const activeRoute = useMemo(() => PRIMARY_ROUTES[activeStep], [activeStep]);

  const goNext = () => {
    setActiveStep((prev) => (prev + 1) % PRIMARY_ROUTES.length);
  };

  return (
    <div className="home-tour-wrap">
      <div className="hero-actions home-primary-actions">
        {PRIMARY_ROUTES.map((route, index) => (
          <Link
            key={route.href}
            href={route.href}
            className={`btn ${route.buttonClass} tour-target ${activeStep === index ? "is-tour-active" : ""}`}
            onMouseEnter={() => setActiveStep(index)}
            onFocus={() => setActiveStep(index)}
          >
            {route.buttonLabel}
          </Link>
        ))}
      </div>

      <article className="home-tour-card" aria-live="polite">
        <div className="home-tour-head">
          <p className="section-kicker">Recorrido rapido</p>
          <span className="home-tour-step">
            Paso {activeStep + 1} de {PRIMARY_ROUTES.length}
          </span>
        </div>
        <h3>{activeRoute.title}</h3>
        <p>{activeRoute.description}</p>
        <div className="home-tour-actions">
          <div className="home-tour-dots" role="tablist" aria-label="Pasos del recorrido">
            {PRIMARY_ROUTES.map((route, index) => (
              <button
                type="button"
                role="tab"
                key={route.href}
                className={`home-tour-dot ${activeStep === index ? "is-active" : ""}`}
                onClick={() => setActiveStep(index)}
                aria-selected={activeStep === index}
                aria-label={`Ir al paso ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-secondary home-tour-next" onClick={goNext}>
            Siguiente paso
          </button>
        </div>
      </article>
    </div>
  );
}
