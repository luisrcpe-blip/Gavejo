"use client";

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TourStep = {
  title: string;
  description: string;
  targets?: string[];
};

type FocusRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
};

const TOUR_STEPS: TourStep[] = [
  {
    title: "Hola, esta es una pagina demo",
    description:
      "Te indico las secciones disponibles. Por ahora la optimizacion del proyecto esta enfocada en modo computador, asi que idealmente revisala desde desktop."
  },
  {
    title: "Cabecera principal",
    description: "Desde aqui tienes el menu principal con acceso a Inicio, secciones comerciales y Admin.",
    targets: ['[data-tour-id="header-nav-desktop"]', '[data-tour-id="mobile-menu-toggle"]']
  },
  {
    title: "Landing principal",
    description: "Este boton abre la landing principal de soluciones para mostrar fachadas y aplicaciones.",
    targets: ['[data-tour-id="cta-landing-1"]']
  },
  {
    title: "Landing de materiales",
    description: "Este boton abre la landing de madera termotratada con foco tecnico y comercial.",
    targets: ['[data-tour-id="cta-landing-2"]']
  },
  {
    title: "Panel Admin",
    description: "Este boton te lleva al panel de administracion para ver CRM, leads y estado operativo.",
    targets: ['[data-tour-id="cta-admin"]']
  },
  {
    title: "Seccion de soluciones",
    description: "Aqui se muestran las dos landings protagonistas con estructura repetible para nuevas soluciones.",
    targets: ['[data-tour-id="section-soluciones-head"]']
  },
  {
    title: "Bloque comercial de contacto",
    description: "En esta seccion se explica el flujo visita > formulario > CRM para cerrar la narrativa comercial.",
    targets: ['[data-tour-id="section-contacto-head"]']
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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function HomeGuidedTour() {
  const [isOpen, setIsOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [focusRect, setFocusRect] = useState<FocusRect | null>(null);
  const [cardStyle, setCardStyle] = useState<CSSProperties>({});
  const highlightedRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const mobileAdjustedStepRef = useRef<number | null>(null);

  const activeStep = useMemo(() => TOUR_STEPS[stepIndex], [stepIndex]);
  const isLastStep = stepIndex === TOUR_STEPS.length - 1;

  const clearHighlights = useCallback(() => {
    if (highlightedRef.current) {
      highlightedRef.current.classList.remove("tour-highlight-target");
      highlightedRef.current = null;
    }
    document.querySelectorAll(".tour-highlight-target").forEach((node) => {
      node.classList.remove("tour-highlight-target");
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const preventKeys = (event: KeyboardEvent) => {
      const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventDefault as EventListener);
      window.removeEventListener("touchmove", preventDefault as EventListener);
      window.removeEventListener("keydown", preventKeys as EventListener);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    mobileAdjustedStepRef.current = null;
    clearHighlights();

    const target = findTarget(activeStep.targets) as HTMLElement | null;
    if (target) {
      highlightedRef.current = target;
      target.classList.add("tour-highlight-target");

      // Keep the target inside a safe viewport zone so the sticky header never covers it.
      const alignTargetToSafeViewport = () => {
        const header = document.querySelector(".topbar") as HTMLElement | null;
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const topGuard = headerHeight + 14;
        const bottomGuard = window.innerWidth <= 840 ? 16 : 24;
        const viewportBottom = window.innerHeight - bottomGuard;
        const rect = target.getBoundingClientRect();
        const isOutOfView = rect.top < topGuard || rect.bottom > viewportBottom;

        if (!isOutOfView) return;

        const delta = rect.top < topGuard ? rect.top - topGuard : rect.bottom - viewportBottom;
        window.scrollTo({
          top: Math.max(0, Math.round(window.scrollY + delta)),
          behavior: "auto"
        });
      };

      alignTargetToSafeViewport();
    }

    const computeLayout = () => {
      const isMobile = window.innerWidth <= 840;
      const margin = isMobile ? 10 : 16;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const cardEl = cardRef.current;
      const cardWidth = isMobile
        ? Math.max(260, vw - margin * 2)
        : Math.min(Math.max(cardEl?.offsetWidth ?? 520, 320), vw - margin * 2);
      const cardHeight = cardEl?.offsetHeight ?? 260;

      if (!target) {
        setFocusRect(null);
        if (isMobile) {
          const mobileTop = Math.round(Math.max(margin, vh - cardHeight - margin));
          setCardStyle({
            left: `${margin}px`,
            top: `${mobileTop}px`,
            width: `${Math.round(cardWidth)}px`
          });
          return;
        }
        setCardStyle({
          left: `${Math.round((vw - cardWidth) / 2)}px`,
          top: `${Math.round((vh - cardHeight) / 2)}px`
        });
        return;
      }

      const rect = target.getBoundingClientRect();

      if (isMobile && mobileAdjustedStepRef.current !== stepIndex) {
        const header = document.querySelector(".topbar") as HTMLElement | null;
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const mobileHeaderGuard = headerHeight + 10;
        const cardTop = Math.max(margin, vh - cardHeight - margin);
        const mobileBottomGuard = cardTop - 14;
        const isOutOfView = rect.top < mobileHeaderGuard || rect.bottom > mobileBottomGuard;

        if (isOutOfView) {
          const delta =
            rect.top < mobileHeaderGuard ? rect.top - mobileHeaderGuard : rect.bottom - mobileBottomGuard;
          window.scrollTo({
            top: Math.max(0, Math.round(window.scrollY + delta)),
            behavior: "auto"
          });
          mobileAdjustedStepRef.current = stepIndex;
          return;
        }
      }

      const pad = 10;
      const left = clamp(rect.left - pad, margin, vw - margin);
      const top = clamp(rect.top - pad, margin, vh - margin);
      const right = clamp(rect.right + pad, margin, vw - margin);
      const bottom = clamp(rect.bottom + pad, margin, vh - margin);
      const width = Math.max(44, right - left);
      const height = Math.max(36, bottom - top);
      const isLargeTarget = width > vw * 0.82 || height > vh * 0.68;

      setFocusRect({
        left: Math.round(left),
        top: Math.round(top),
        width: Math.round(width),
        height: Math.round(height),
        radius: 14
      });

      if (isMobile) {
        const mobileTop = Math.round(Math.max(margin, vh - cardHeight - margin));
        setCardStyle({
          left: `${margin}px`,
          top: `${mobileTop}px`,
          width: `${Math.round(cardWidth)}px`
        });
        return;
      }

      if (isLargeTarget) {
        setCardStyle({
          left: `${margin}px`,
          top: `${margin}px`
        });
        return;
      }

      const gap = 16;
      const candidates = [
        {
          x: right + gap,
          y: top + height / 2 - cardHeight / 2
        },
        {
          x: left - cardWidth - gap,
          y: top + height / 2 - cardHeight / 2
        },
        {
          x: left + width / 2 - cardWidth / 2,
          y: bottom + gap
        },
        {
          x: left + width / 2 - cardWidth / 2,
          y: top - cardHeight - gap
        }
      ];

      const fit = candidates.find(
        (candidate) =>
          candidate.x >= margin &&
          candidate.y >= margin &&
          candidate.x + cardWidth <= vw - margin &&
          candidate.y + cardHeight <= vh - margin
      );

      const fallback = fit ?? candidates[2] ?? { x: margin, y: margin };

      setCardStyle({
        left: `${Math.round(clamp(fallback.x, margin, vw - cardWidth - margin))}px`,
        top: `${Math.round(clamp(fallback.y, margin, vh - cardHeight - margin))}px`
      });
    };

    const raf = window.requestAnimationFrame(computeLayout);
    window.addEventListener("resize", computeLayout);
    window.addEventListener("scroll", computeLayout, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", computeLayout);
      window.removeEventListener("scroll", computeLayout);
      clearHighlights();
    };
  }, [activeStep, clearHighlights, isOpen, stepIndex]);

  useEffect(() => {
    return () => {
      clearHighlights();
    };
  }, [clearHighlights]);

  const closeTour = () => {
    clearHighlights();
    setIsOpen(false);
    setFocusRect(null);

    const scrollToHomeStart = () => {
      const header = document.querySelector(".topbar") as HTMLElement | null;
      const introSection = document.querySelector('[data-tour-id="section-inicio"]') as HTMLElement | null;
      const heroGrid = document.querySelector(".home-hero-grid") as HTMLElement | null;
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const headerSafeGap = Math.max(18, Math.round(headerHeight * 0.22));

      const scrollWithHeaderOffset = (target: HTMLElement) => {
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - headerSafeGap;
        window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "auto" });
      };

      if (introSection) {
        scrollWithHeaderOffset(introSection);
        return;
      }

      if (heroGrid) {
        scrollWithHeaderOffset(heroGrid);
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHomeStart);
    });
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
      <div className={`guided-tour-backdrop ${focusRect ? "is-soft" : ""}`} />
      {focusRect && (
        <div
          className="guided-tour-focus"
          style={{
            left: `${focusRect.left}px`,
            top: `${focusRect.top}px`,
            width: `${focusRect.width}px`,
            height: `${focusRect.height}px`,
            borderRadius: `${focusRect.radius}px`
          }}
        />
      )}
      <article ref={cardRef} className="guided-tour-card" style={cardStyle}>
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
