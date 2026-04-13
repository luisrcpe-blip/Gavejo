"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderVariant = "solid" | "overlay" | "clean";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/materiales", label: "Materiales" },
  { href: "/mader-balear", label: "Madera Balear" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
  { href: "/admin", label: "Admin" }
];

export function PublicHeader() {
  const pathname = usePathname();
  const landingRoutes = ["/soluciones/fachadas", "/materiales/termo-tratada", "/mader-balear"];

  const variant: HeaderVariant =
    pathname === "/" ? "solid" : landingRoutes.some((route) => pathname.startsWith(route)) ? "overlay" : "clean";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`topbar topbar-${variant}`}>
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
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="container mobile-topnav" aria-label="Navegacion movil">
        {NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
