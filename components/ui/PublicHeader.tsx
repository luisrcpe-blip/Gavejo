"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import {
  getLocaleFromPathname,
  getLocalizedEquivalent,
  Locale,
  localizePath,
  stripLocalePrefix,
  SUPPORTED_LOCALES
} from "@/lib/i18n";

type HeaderVariant = "solid" | "overlay" | "clean";

type NavLink = {
  href: string;
  label: string;
  comingSoon: boolean;
};

type MegaMenuLink = NavLink & {
  preview: string;
  sublinks?: MegaMenuLink[];
};

type MegaMenuColumn = {
  title: string;
  links: MegaMenuLink[];
};

type MegaMenuConfig = {
  primary: MegaMenuLink[];
  columns: MegaMenuColumn[];
  socials: string[];
};

const NAV_LINKS: Record<Locale, NavLink[]> = {
  es: [
    { href: "/", label: "Inicio", comingSoon: false },
    { href: "/soluciones/fachadas", label: "Landing Fachadas", comingSoon: false },
    { href: "/materiales/termo-tratada", label: "Landing Termotratada", comingSoon: false },
    { href: "/mader-balear", label: "Madera Balear", comingSoon: true },
    { href: "/blog", label: "Blog", comingSoon: true },
    { href: "/contacto", label: "Contacto", comingSoon: true },
    { href: "/admin", label: "Admin", comingSoon: false }
  ],
  en: [
    { href: "/", label: "Home", comingSoon: false },
    { href: "/soluciones/fachadas", label: "Facades Landing", comingSoon: false },
    { href: "/materiales/termo-tratada", label: "Thermowood Landing", comingSoon: false },
    { href: "/mader-balear", label: "Madera Balear", comingSoon: true },
    { href: "/blog", label: "Blog", comingSoon: true },
    { href: "/contacto", label: "Contact", comingSoon: true },
    { href: "/admin", label: "Admin", comingSoon: false }
  ]
};

const HEADER_COPY: Record<
  Locale,
  {
    homeLabel: string;
    languageLabel: string;
    mobileNavLabel: string;
    openMenu: string;
    closeMenu: string;
    comingSoon: string;
  }
> = {
  es: {
    homeLabel: "Volver al inicio",
    languageLabel: "Cambiar idioma",
    mobileNavLabel: "Navegacion movil",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
    comingSoon: "\u00a1Pr\u00f3ximamente!"
  },
  en: {
    homeLabel: "Back to home",
    languageLabel: "Change language",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    comingSoon: "Coming soon"
  }
};

const PREVIEW_IMAGES: Record<string, string> = {
  home:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  facades:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  thermo:
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80",
  mader:
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
  blog:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  contact:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  admin:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
};

const MEGA_MENU: Record<Locale, MegaMenuConfig> = {
  es: {
    primary: [
      { href: "/", label: "Inicio", comingSoon: false, preview: "home" },
      {
        href: "/soluciones/fachadas",
        label: "Soluciones",
        comingSoon: false,
        preview: "facades",
        sublinks: [
          { href: "/soluciones/fachadas", label: "Fachadas", comingSoon: false, preview: "facades" },
          { href: "/soluciones/fachadas", label: "Decking", comingSoon: false, preview: "thermo" },
          { href: "/soluciones/fachadas", label: "Interiores", comingSoon: false, preview: "mader" }
        ]
      },
      {
        href: "/materiales/termo-tratada",
        label: "Materiales",
        comingSoon: false,
        preview: "thermo",
        sublinks: [
          { href: "/materiales/termo-tratada", label: "Termotratada", comingSoon: false, preview: "thermo" },
          { href: "/materiales/termo-tratada", label: "Madera quemada", comingSoon: false, preview: "facades" },
          { href: "/materiales/termo-tratada", label: "Vigueria", comingSoon: false, preview: "mader" }
        ]
      },
      { href: "/mader-balear", label: "Mader Balear", comingSoon: false, preview: "mader" },
      { href: "/blog", label: "Inspiracion", comingSoon: false, preview: "blog" },
      { href: "/contacto", label: "Contacto", comingSoon: false, preview: "contact" }
    ],
    columns: [
      {
        title: "Empresa",
        links: [
          { href: "/", label: "Historia", comingSoon: true, preview: "home" },
          { href: "/", label: "Compromisos", comingSoon: true, preview: "facades" },
          { href: "/mader-balear", label: "Mader Balear", comingSoon: false, preview: "mader" },
          { href: "/blog", label: "Blog tecnico", comingSoon: false, preview: "blog" }
        ]
      },
      {
        title: "Contacto",
        links: [
          { href: "/contacto", label: "Formulario de proyecto", comingSoon: false, preview: "contact" },
          { href: "/contacto", label: "WhatsApp directo", comingSoon: false, preview: "contact" },
          { href: "/privacidad", label: "Privacidad", comingSoon: false, preview: "admin" }
        ]
      }
    ],
    socials: ["Instagram", "LinkedIn", "Facebook", "YouTube"]
  },
  en: {
    primary: [
      { href: "/", label: "Home", comingSoon: false, preview: "home" },
      {
        href: "/soluciones/fachadas",
        label: "Solutions",
        comingSoon: false,
        preview: "facades",
        sublinks: [
          { href: "/soluciones/fachadas", label: "Facades", comingSoon: false, preview: "facades" },
          { href: "/soluciones/fachadas", label: "Decking", comingSoon: false, preview: "thermo" },
          { href: "/soluciones/fachadas", label: "Interiors", comingSoon: false, preview: "mader" }
        ]
      },
      {
        href: "/materiales/termo-tratada",
        label: "Materials",
        comingSoon: false,
        preview: "thermo",
        sublinks: [
          { href: "/materiales/termo-tratada", label: "Thermowood", comingSoon: false, preview: "thermo" },
          { href: "/materiales/termo-tratada", label: "Burned wood", comingSoon: false, preview: "facades" },
          { href: "/materiales/termo-tratada", label: "Beams", comingSoon: false, preview: "mader" }
        ]
      },
      { href: "/mader-balear", label: "Mader Balear", comingSoon: false, preview: "mader" },
      { href: "/blog", label: "Inspiration", comingSoon: false, preview: "blog" },
      { href: "/contacto", label: "Contact", comingSoon: false, preview: "contact" }
    ],
    columns: [
      {
        title: "Company",
        links: [
          { href: "/", label: "History", comingSoon: true, preview: "home" },
          { href: "/", label: "Commitments", comingSoon: true, preview: "facades" },
          { href: "/mader-balear", label: "Mader Balear", comingSoon: false, preview: "mader" },
          { href: "/blog", label: "Technical blog", comingSoon: false, preview: "blog" }
        ]
      },
      {
        title: "Contact",
        links: [
          { href: "/contacto", label: "Project form", comingSoon: false, preview: "contact" },
          { href: "/contacto", label: "Direct WhatsApp", comingSoon: false, preview: "contact" },
          { href: "/privacidad", label: "Privacy", comingSoon: false, preview: "admin" }
        ]
      }
    ],
    socials: ["Instagram", "LinkedIn", "Facebook", "YouTube"]
  }
};

function getPreviewFromPath(pathname: string) {
  if (pathname.startsWith("/soluciones")) return "facades";
  if (pathname.startsWith("/materiales")) return "thermo";
  if (pathname.startsWith("/mader-balear")) return "mader";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/contacto")) return "contact";
  if (pathname.startsWith("/admin") || pathname.startsWith("/privacidad")) return "admin";
  return "home";
}

export function PublicHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const basePathname = stripLocalePrefix(pathname || "/");
  const navLinks = NAV_LINKS[locale];
  const megaMenu = MEGA_MENU[locale];
  const copy = HEADER_COPY[locale];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(() => getPreviewFromPath(basePathname));
  const [comingSoonToast, setComingSoonToast] = useState<{
    visible: boolean;
    top: number;
    left: number;
    above: boolean;
  }>({
    visible: false,
    top: 0,
    left: 0,
    above: false
  });

  const landingRoutes = ["/soluciones/fachadas", "/materiales/termo-tratada", "/mader-balear"];

  const variant: HeaderVariant =
    basePathname === "/"
      ? "solid"
      : landingRoutes.some((route) => basePathname.startsWith(route))
        ? "overlay"
        : "clean";

  const isActive = (href: string) => {
    if (href === "/") return basePathname === "/";
    return basePathname === href || basePathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (variant !== "overlay") {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    if (!comingSoonToast.visible) return;
    const timeout = window.setTimeout(
      () => setComingSoonToast((prev) => ({ ...prev, visible: false })),
      2200
    );
    return () => window.clearTimeout(timeout);
  }, [comingSoonToast.visible]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setActivePreview(getPreviewFromPath(basePathname));
  }, [basePathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("is-mega-menu-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.classList.remove("is-mega-menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const onMenuClick = (event: MouseEvent<HTMLAnchorElement>, item: NavLink) => {
    if (!item.comingSoon) {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const verticalGap = 10;
    const preferAbove = rect.top > window.innerHeight * 0.68;

    setComingSoonToast({
      visible: true,
      left: rect.left + rect.width / 2,
      top: preferAbove ? rect.top - verticalGap : rect.bottom + verticalGap,
      above: preferAbove
    });
  };

  return (
    <header
      className={`topbar topbar-${variant} ${scrolled ? "is-scrolled" : ""} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
    >
      <div className="container topbar-inner">
        <Link href={localizePath("/", locale)} className="brand-link" aria-label={copy.homeLabel}>
          <span className="brand-logo-shell">
            <Image
              src="https://maderasgavejo.com/wp-content/uploads/2023/09/gavejo-logo4.png"
              alt="Gavejo Maderas y Tableros"
              width={180}
              height={64}
              priority
              className="brand-logo"
            />
          </span>
        </Link>

        <nav className="topnav" data-tour-id="header-nav-desktop">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href, locale)}
              className={isActive(item.href) ? "is-active" : ""}
              onClick={(event) => onMenuClick(event, item)}
              aria-disabled={item.comingSoon ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="topbar-actions">
          <details className="language-switcher">
            <summary aria-label={copy.languageLabel}>
              <span>{locale.toUpperCase()}</span>
            </summary>
            <div className="language-options">
              {SUPPORTED_LOCALES.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={getLocalizedEquivalent(pathname, targetLocale)}
                  className={targetLocale === locale ? "is-active" : ""}
                  hrefLang={targetLocale}
                  lang={targetLocale}
                >
                  {targetLocale.toUpperCase()}
                </Link>
              ))}
            </div>
          </details>

          <button
            type="button"
            className={`mobile-menu-toggle ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
            data-tour-id="mobile-menu-toggle"
          >
            <span className="sr-only">{mobileOpen ? copy.closeMenu : copy.openMenu}</span>
            <span className="mobile-menu-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu-panel" className={`mobile-menu-panel ${mobileOpen ? "is-open" : ""}`}>
        <div className="container mega-menu">
          <div
            className="mega-menu-preview"
            aria-hidden="true"
            style={{ backgroundImage: `url(${PREVIEW_IMAGES[activePreview] ?? PREVIEW_IMAGES.home})` }}
          />

          <nav className="mega-menu-primary" aria-label={copy.mobileNavLabel}>
            {megaMenu.primary.map((item) => (
              <div className="mega-menu-row" key={item.label}>
                <Link
                  href={localizePath(item.href, locale)}
                  className={`mega-menu-link ${isActive(item.href) ? "is-active" : ""}`}
                  onClick={(event) => onMenuClick(event, item)}
                  onFocus={() => setActivePreview(item.preview)}
                  onMouseEnter={() => setActivePreview(item.preview)}
                  aria-disabled={item.comingSoon ? "true" : undefined}
                >
                  {item.label}
                </Link>
                {item.sublinks && (
                  <div className="mega-menu-sublinks">
                    {item.sublinks.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={localizePath(subitem.href, locale)}
                        onClick={(event) => onMenuClick(event, subitem)}
                        onFocus={() => setActivePreview(subitem.preview)}
                        onMouseEnter={() => setActivePreview(subitem.preview)}
                        aria-disabled={subitem.comingSoon ? "true" : undefined}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mega-menu-side">
            <div className="mega-menu-columns">
              {megaMenu.columns.map((column) => (
                <section className="mega-menu-column" key={column.title}>
                  <h2>{column.title}</h2>
                  <div>
                    {column.links.map((item) => (
                      <Link
                        key={item.label}
                        href={localizePath(item.href, locale)}
                        onClick={(event) => onMenuClick(event, item)}
                        onFocus={() => setActivePreview(item.preview)}
                        onMouseEnter={() => setActivePreview(item.preview)}
                        aria-disabled={item.comingSoon ? "true" : undefined}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="mega-menu-socials" aria-label="Social links">
              {megaMenu.socials.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`coming-soon-toast ${comingSoonToast.visible ? "is-visible" : ""} ${
          comingSoonToast.above ? "is-above" : ""
        }`}
        style={{ left: `${comingSoonToast.left}px`, top: `${comingSoonToast.top}px` }}
        role="status"
        aria-live="polite"
      >
        <span className="coming-soon-dot" />
        <span>{copy.comingSoon}</span>
      </div>
    </header>
  );
}
