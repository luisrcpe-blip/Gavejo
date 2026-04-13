"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

type HeaderVariant = "solid" | "overlay" | "clean";

const NAV_LINKS = [
  { href: "/", label: "Inicio", comingSoon: false },
  { href: "/soluciones", label: "Soluciones", comingSoon: true },
  { href: "/materiales", label: "Materiales", comingSoon: true },
  { href: "/mader-balear", label: "Madera Balear", comingSoon: true },
  { href: "/blog", label: "Blog", comingSoon: true },
  { href: "/contacto", label: "Contacto", comingSoon: true },
  { href: "/admin", label: "Admin", comingSoon: false }
];

export function PublicHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    pathname === "/" ? "solid" : landingRoutes.some((route) => pathname.startsWith(route)) ? "overlay" : "clean";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
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
    const onResize = () => {
      if (window.innerWidth > 840) setMobileOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMenuClick = (event: MouseEvent<HTMLAnchorElement>, item: (typeof NAV_LINKS)[number]) => {
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
        <Link href="/" className="brand-link" aria-label="Volver al inicio">
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

        <nav className="topnav">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : ""}
              onClick={(event) => onMenuClick(event, item)}
              aria-disabled={item.comingSoon ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`mobile-menu-toggle ${mobileOpen ? "is-open" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-panel"
        >
          <span className="sr-only">{mobileOpen ? "Cerrar menu" : "Abrir menu"}</span>
          <span className="mobile-menu-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu-panel" className={`mobile-menu-panel ${mobileOpen ? "is-open" : ""}`}>
        <nav className="container mobile-menu-nav" aria-label="Navegacion movil">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : ""}
              onClick={(event) => onMenuClick(event, item)}
              aria-disabled={item.comingSoon ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
        <span>{"\u00a1Pr\u00f3ximamente!"}</span>
      </div>
    </header>
  );
}
