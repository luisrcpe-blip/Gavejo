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
  { href: "/contacto", label: "Contacto", comingSoon: true }
];

export function PublicHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
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
    if (!showComingSoon) return;
    const timeout = window.setTimeout(() => setShowComingSoon(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [showComingSoon]);

  const onMenuClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_LINKS)[number]
  ) => {
    if (!item.comingSoon) return;
    event.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <header className={`topbar topbar-${variant} ${scrolled ? "is-scrolled" : ""}`}>
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
      </div>
      <nav className="container mobile-topnav" aria-label="Navegacion movil">
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
      <div className={`coming-soon-toast ${showComingSoon ? "is-visible" : ""}`} role="status" aria-live="polite">
        <span className="coming-soon-dot" />
        <span>¡Próximamente!</span>
      </div>
    </header>
  );
}
