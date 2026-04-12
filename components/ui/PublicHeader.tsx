"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/materiales", label: "Materiales" },
  { href: "/mader-balear", label: "Mader Balear" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
];

export function PublicHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div>
          <div className="brand-title">Gavejo Maderas y Tableros</div>
          <div className="brand-sub">Demo corporativa</div>
        </div>
        <nav className="topnav">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className={isActive("/admin") ? "is-active" : ""}>
            Admin
          </Link>
        </nav>
      </div>
      <nav className="container mobile-topnav" aria-label="Navegacion movil">
        {NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
            {item.label}
          </Link>
        ))}
        <Link href="/admin" className={`mobile-more ${isActive("/admin") ? "is-active" : ""}`}>
          Admin
        </Link>
      </nav>
    </header>
  );
}
