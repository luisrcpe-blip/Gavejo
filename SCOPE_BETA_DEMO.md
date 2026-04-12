# SCOPE COMPLETO - DEMO BETA LANDING (BASE PROYECTO)

## 1) Objetivo de la demo
Construir una landing moderna, rápida y visualmente profesional que valide la idea del negocio y convenza al dueño de avanzar al desarrollo completo.

## 2) Resultado esperado (beta)
- Una landing funcional en Next.js 14 + TypeScript.
- Identidad visual clara y coherente (estilo premium limpio).
- Contenido orientado a conversión (CTA + propuesta de valor).
- Base técnica escalable para agregar leads, analytics y panel después.

## 3) Alcance funcional (incluido en beta)
- Home/Landing de una sola página con secciones:
  - Hero principal (promesa, CTA primario, CTA secundario).
  - Beneficios clave.
  - Servicios o módulos resumidos.
  - Proceso de trabajo (pasos).
  - Prueba social (testimonios/casos/respaldo).
  - FAQ breve.
  - Footer con datos de contacto y enlaces.
- Navegación superior simple con scroll a secciones.
- CTA visibles en puntos estratégicos.
- Diseño responsive (mobile, tablet, desktop).

## 4) Alcance visual/UI (lineamiento solicitado)
- Tipografía: Poppins (fallback sans-serif).
- Base de diseño con tokens:
  - Colores neutrales (blancos/grises) + indigo para acciones.
  - Espaciado modular consistente.
  - Bordes/radios/sombras suaves.
- Jerarquía:
  - Título principal fuerte.
  - Subtítulos claros.
  - Bloques tipo card para lectura rápida.
- Componentes base:
  - `page-shell`, `admin-main`, `card`, `segmented`, `seg-btn`, `input-field`.
- Look & feel:
  - Profesional, sobrio, atractivo, sin ruido visual.

## 5) Alcance técnico (beta)
- Framework: Next.js 14 (App Router) + React + TypeScript.
- Estilos: CSS global con design tokens.
- Estructura preparada para crecimiento:
  - `app/` para rutas.
  - `components/` para UI reutilizable.
  - `styles/` o tokens globales.
- Sin incluir en beta inicial:
  - Multi-tenant.
  - Autenticación (NextAuth).
  - Prisma/MySQL (solo se activa cuando se requiera guardar datos).

## 6) Alcance opcional inmediato (fase 1.1)
- Formulario de leads (sin panel aún):
  - Frontend validado.
  - API route (`app/api/leads/route.ts`).
  - Envío a email o persistencia simple.
- Analytics:
  - GA4 o alternativa ligera.
  - Eventos: `cta_click`, `form_submit`, `section_view`.

## 7) Requisitos no funcionales
- Performance:
  - LCP < 2.5s en móvil (objetivo).
  - Imágenes optimizadas y lazy loading.
- SEO básico:
  - Metadata por página.
  - Open Graph.
  - Estructura semántica.
- Accesibilidad:
  - Contraste AA.
  - Navegación con teclado en elementos clave.
- Mantenibilidad:
  - Nombres de clases/componentes consistentes.
  - Estructura de carpetas limpia.

## 8) Criterios de aceptación (demo lista para mostrar)
- La landing comunica propuesta de valor en menos de 5 segundos.
- El diseño se ve profesional en desktop y móvil.
- Todos los CTA son visibles y funcionales.
- No hay errores críticos de layout ni contenido placeholder roto.
- Lighthouse sin alertas graves de performance/accesibilidad.

## 9) Riesgos de beta y mitigación
- Riesgo: copy débil no convierte.
  - Mitigación: versión A/B de titulares y CTA.
- Riesgo: diseño muy genérico.
  - Mitigación: dirección visual definida y coherente desde tokens.
- Riesgo: alcance crece sin control.
  - Mitigación: separar claramente beta vs fase 2.

## 10) Roadmap sugerido
1. Fase Beta (actual): landing convincente + base técnica sólida.
2. Fase 1.1: formulario + eventos analytics.
3. Fase 2: panel privado (auth) + gestión de leads.
4. Fase 3: persistencia robusta con Prisma/MySQL + reportes.

## 11) Entregables
- Landing demo funcional.
- Sistema visual base (tokens + componentes).
- Checklist QA beta.
- Documento de próximos pasos para producción.

## 12) Fuera de alcance por ahora
- Sistema completo de administración.
- Roles/permisos de usuarios.
- Automatizaciones complejas de CRM.
- Integraciones empresariales avanzadas.
