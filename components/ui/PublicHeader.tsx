import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div>
          <div className="brand-title">Gavejo Maderas y Tableros</div>
          <div className="brand-sub">Demo corporativa</div>
        </div>
        <nav className="topnav">
          <Link href="/">Home</Link>
          <Link href="/soluciones">Soluciones</Link>
          <Link href="/materiales">Materiales</Link>
          <Link href="/mader-balear">Mader Balear</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
