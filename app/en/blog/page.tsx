"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { getBlogPosts, subscribeBlog, syncBlogFromServer } from "@/lib/blog-store";
import { BlogPost } from "@/lib/types";

export default function EnglishBlogPage() {
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
        <span className="chip">Technical blog</span>
        <h1>Applied knowledge for wood and systems</h1>
        <p className="lead-text home-lead">
          This block is fed from the admin panel. Every published post appears here automatically.
        </p>

        <div className="grid grid-3">
          {published.map((post) => (
            <article key={post.id} className="card card-pad">
              <p className="mini-kicker">Published - {new Date(post.updatedAt).toLocaleDateString("en-US")}</p>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="lead-text blog-post-content">{post.content}</p>
              <Link href="/en/contacto" className="btn btn-ghost" style={{ marginTop: "0.7rem" }}>
                Request information
              </Link>
            </article>
          ))}
          {published.length === 0 && (
            <article className="card card-pad">
              <h3>No active posts</h3>
              <p className="lead-text">Publish a post from the admin panel to show it here.</p>
              <Link href="/admin" className="btn btn-primary" style={{ marginTop: "0.8rem" }}>
                Go to admin panel
              </Link>
            </article>
          )}
        </div>
        <FloatingWhatsApp sourcePage="blog" locale="en" />
      </main>
    </>
  );
}
