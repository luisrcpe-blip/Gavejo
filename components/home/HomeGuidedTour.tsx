"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TourStep = {
  title: string;
  description: string;
  targets?: string[];
};

const TOUR_STEPS: TourStep[] = [
  {
    title: "Hola, esta es una pagina demo",
    description:
      "Te indico las secciones disponibles y como navegar rapido por la demo comercial de Gavejo."
  },
  {
    title: "Cabecera principal",
    description:
      "Desde aqui tienes el menu principal con acceso a Inicio, secciones comerciales y Admin.",
    targets: ['[data-tour-id="header-nav-desktop"]', '[data-tour-id="mobile-menu-toggle"]']
  },
  {
    title: "Landing principal",
    description:
      "Este boton abre la landing principal de soluciones para mostrar fachadas y aplicaciones.",
    targets: ['[data-tour-id="cta-landing-1"]']
  },
  {
    title: "Landing de materiales",
    description:
      "Este boton abre la landing de madera termotratada con foco tecnico y comercial.",
    targets: ['[data-tour-id="cta-landing-2"]']
  },
  {
    title: "Panel Admin",
    description:
      "Este boton te lleva al panel de administracion para ver CRM, leads y estado operativo.",
    targets: ['[data-tour-id="cta-admin"]']
  },
  {
    title: "Seccion de soluciones",
    description:
      "Aqui se muestran las dos landings protagonistas con estructura repetible para nuevas soluciones.",
    targets: ['[data-tour-id="section-soluciones"]']
  },
  {
    title: "Bloque comercial de contacto",
    description:
      "En esta seccion se explica el flujo visita > formulario > CRM para cerrar la narrativa comercial.",
    targets: ['[data-tour-id="section-contacto"]']
  },
  {
    title: "Recorrido finalizado",
    description:
      "Listo. Ya conoces las secciones clave. Puedes empezar por una landing o abrir Admin para mostrar el flujo completo."
  }
];

function isElementVisible(element: Element): element is HTMLElement {
  if (!(element instanceof HTMLElement)) return false;
  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function findTarget(selectors?: string[]) {
  if (!selectors || selectors.length === 0) return null;
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && isElementVisible(element)) return element;
  }
  return null;
}

export function HomeGuidedTour() {
  const [isOpen, setIsOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const highlightedRef = useRef<HTMLElement | null>(null);

  const activeStep = useMemo(() => TOUR_STEPS[stepIndex], [stepIndex]);
  const isLastStep = stepIndex === TOUR_STEPS.length - 1;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (highlightedRef.current) {
      highlightedRef.current.classList.remove("tour-highlight-target");
      highlightedRef.current = null;
    }

    const target = findTarget(activeStep.targets);
    if (!target) return;

    const htmlTarget = target as HTMLElement;
    highlightedRef.current = htmlTarget;
    htmlTarget.classList.add("tour-highlight-target");
    htmlTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    return () => {
      if (highlightedRef.current) {
        highlightedRef.current.classList.remove("tour-highlight-target");
        highlightedRef.current = null;
      }
    };
  }, [activeStep, isOpen]);

  useEffect(() => {
    return () => {
      if (highlightedRef.current) {
        highlightedRef.current.classList.remove("tour-highlight-target");
        highlightedRef.current = null;
      }
    };
  }, []);

  const closeTour = () => {
    if (highlightedRef.current) {
      highlightedRef.current.classList.remove("tour-highlight-target");
      highlightedRef.current = null;
    }
    setIsOpen(false);
  };

  const goNext = () => {
    if (isLastStep) {
      closeTour();
      return;
    }
    setStepIndex((prev) => Math.min(prev + 1, TOUR_STEPS.length - 1));
  };

  const goBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  if (!isOpen) return null;

  return (
    <div className="guided-tour-overlay" role="dialog" aria-modal="true" aria-labelledby="guided-tour-title">
      <div className="guided-tour-backdrop" />
      <article className="guided-tour-card">
        <p className="section-kicker">Recorrido guiado</p>
        <h3 id="guided-tour-title">{activeStep.title}</h3>
        <p>{activeStep.description}</p>
        <p className="guided-tour-progress">
          Paso {stepIndex + 1} de {TOUR_STEPS.length}
        </p>
        <div className="guided-tour-actions">
          <button type="button" className="btn btn-ghost" onClick={closeTour}>
            Omitir
          </button>
          <div className="guided-tour-nav">
            <button type="button" className="btn btn-secondary" onClick={goBack} disabled={stepIndex === 0}>
              Atras
            </button>
            <button type="button" className="btn btn-primary" onClick={goNext}>
              {isLastStep ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
