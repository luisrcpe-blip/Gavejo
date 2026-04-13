"use client";

import Link from "next/link";

const PRIMARY_ROUTES = [
  {
    href: "/soluciones/fachadas",
    buttonLabel: "Ver landing principal",
    buttonClass: "btn-primary",
    tourId: "cta-landing-1"
  },
  {
    href: "/materiales/termo-tratada",
    buttonLabel: "Ver landing de madera termotratada",
    buttonClass: "btn-secondary",
    tourId: "cta-landing-2"
  },
  {
    href: "/admin",
    buttonLabel: "Abrir panel admin",
    buttonClass: "btn-ghost",
    tourId: "cta-admin"
  }
] as const;

export function HomePrimaryRoutes() {
  return (
    <div className="home-tour-wrap" data-tour-id="home-ctas">
      <div className="hero-actions home-primary-actions">
        {PRIMARY_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`btn ${route.buttonClass} tour-target`}
            data-tour-id={route.tourId}
          >
            {route.buttonLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}
