import { BlogPost } from "@/lib/types";

const BLOG_KEY = "gavejo_demo_blog_v1";
export const BLOG_CHANGED_EVENT = "gavejo:blog-changed";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "como-elegir-madera-para-fachada",
    title: "Como elegir madera para fachada en clima mediterraneo",
    excerpt: "Criterios tecnicos y de mantenimiento para una seleccion segura y durable.",
    content:
      "Seleccionar madera para fachada requiere evaluar estabilidad dimensional, exposicion ambiental, sistema de subestructura y estrategia de mantenimiento desde el inicio del proyecto.",
    status: "published",
    updatedAt: new Date().toISOString()
  },
  {
    id: "post-2",
    slug: "tendencias-revestimientos-arquitectonicos",
    title: "Tendencias en revestimientos arquitectonicos de madera",
    excerpt: "Materialidad sobria, lectura tecnica y continuidad visual en proyectos premium.",
    content:
      "Las soluciones actuales priorizan modulacion limpia, proporciones controladas y superficies calidas con comportamiento tecnico predecible en exterior e interior.",
    status: "draft",
    updatedAt: new Date().toISOString()
  }
];

function isBrowser() {
  return typeof window !== "undefined";
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function readBlog(): BlogPost[] {
  if (!isBrowser()) return DEFAULT_POSTS;
  try {
    const raw = window.localStorage.getItem(BLOG_KEY);
    if (!raw) return DEFAULT_POSTS;
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return DEFAULT_POSTS;
  }
}

function writeBlog(posts: BlogPost[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent(BLOG_CHANGED_EVENT));
  } catch {
    // Ignore storage exceptions in restricted browser modes.
  }
}

async function persistBlog(posts: BlogPost[]) {
  const response = await fetch("/api/state/blog-posts", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: posts })
  });

  if (!response.ok) {
    throw new Error("Blog persistence failed");
  }

  writeBlog(posts);
}

export function getBlogPosts() {
  return readBlog().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function upsertBlogPost(input: {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPost["status"];
}) {
  const posts = getBlogPosts();
  const now = new Date().toISOString();
  const slug = slugify(input.title);

  if (input.id) {
    const updated = posts.map((post) =>
      post.id === input.id
        ? {
            ...post,
            title: input.title,
            slug,
            excerpt: input.excerpt,
            content: input.content,
            status: input.status,
            updatedAt: now
          }
        : post
    );

    await persistBlog(updated);
    return;
  }

  const next: BlogPost = {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `post-${Date.now()}`,
    slug,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    status: input.status,
    updatedAt: now
  };
  const updated = [next, ...posts];
  await persistBlog(updated);
}

export function subscribeBlog(listener: () => void) {
  if (!isBrowser()) return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === BLOG_KEY) listener();
  };

  window.addEventListener(BLOG_CHANGED_EVENT, listener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(BLOG_CHANGED_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export async function syncBlogFromServer() {
  if (!isBrowser()) return DEFAULT_POSTS;
  try {
    const response = await fetch("/api/state/blog-posts", { cache: "no-store" });
    if (!response.ok) return getBlogPosts();
    const data = (await response.json()) as { value: BlogPost[] | null };
    if (!data.value || !Array.isArray(data.value)) return getBlogPosts();
    writeBlog(data.value);
    return getBlogPosts();
  } catch {
    return getBlogPosts();
  }
}
