"use client";

import Link from "next/link";
import { Locale, localizePath } from "@/lib/i18n";

type HomePrimaryRoutesProps = {
  locale?: Locale;
};

const PRIMARY_ROUTES: Record<
  Locale,
  Array<{
    href: string;
    buttonLabel: string;
    buttonClass: string;
    tourId: string;
  }>
> = {
  es: [
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
  ],
  en: [
    {
      href: "/soluciones/fachadas",
      buttonLabel: "View facades landing",
      buttonClass: "btn-primary",
      tourId: "cta-landing-1"
    },
    {
      href: "/materiales/termo-tratada",
      buttonLabel: "View thermowood landing",
      buttonClass: "btn-secondary",
      tourId: "cta-landing-2"
    },
    {
      href: "/admin",
      buttonLabel: "Open admin panel",
      buttonClass: "btn-ghost",
      tourId: "cta-admin"
    }
  ]
};

export function HomePrimaryRoutes({ locale = "es" }: HomePrimaryRoutesProps) {
  return (
    <div className="home-tour-wrap" data-tour-id="home-ctas">
      <div className="hero-actions home-primary-actions">
        {PRIMARY_ROUTES[locale].map((route) => (
          <Link
            key={route.href}
            href={localizePath(route.href, locale)}
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
