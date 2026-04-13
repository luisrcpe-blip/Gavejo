"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { getBlogPosts, subscribeBlog, syncBlogFromServer } from "@/lib/blog-store";
import { BlogPost } from "@/lib/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    void syncBlogFromServer().then(() => setPosts(getBlogPosts()));
    setPosts(getBlogPosts());
    return subscribeBlog(() => setPosts(getBlogPosts()));
  }, []);

  const published = posts.filter((post) => post.status === "published");

  return (
    <>
      <PublicHeader />
      <main className="container section">
        <span className="chip">Blog técnico</span>
        <h1>Conocimiento aplicado en madera y sistemas</h1>
        <p className="lead-text home-lead">
          Este bloque se alimenta desde el panel de administración. Toda publicación aparece automáticamente aquí.
        </p>

        <div className="grid grid-3">
          {published.map((post) => (
            <article key={post.id} className="card card-pad">
              <p className="mini-kicker">Publicado - {new Date(post.updatedAt).toLocaleDateString("es-ES")}</p>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="lead-text blog-post-content">{post.content}</p>
              <Link href="/contacto" className="btn btn-ghost" style={{ marginTop: "0.7rem" }}>
                Solicitar información
              </Link>
            </article>
          ))}
          {published.length === 0 && (
            <article className="card card-pad">
              <h3>Sin publicaciones activas</h3>
              <p className="lead-text">Publica una entrada desde el panel de administración para mostrarla aquí.</p>
              <Link href="/admin" className="btn btn-primary" style={{ marginTop: "0.8rem" }}>
                Ir al panel de administración
              </Link>
            </article>
          )}
        </div>
        <FloatingWhatsApp sourcePage="blog" />
      </main>
    </>
  );
}
