# GAVEJO MADERAS Y TABLEROS
## SPO DEMO BETA V2 (Scope de Demo Integral)
**Fecha:** 12 de abril de 2026  
**Documento:** Versión mejorada para presentación comercial  
**Objetivo:** Mostrar una demo que cautive al cliente, refleje su idea con claridad y deje una base técnica lista para evolucionar al proyecto completo.

---

## 1) Resumen ejecutivo
Se desarrollará una **demo beta corporativa** con enfoque de captación, compuesta por:
- 2 landings completas de alto impacto visual.
- 1 panel admin estilo WordPress (UI sobria, limpia, profesional).
- 1 CRM interno de leads en tiempo real para demostrar flujo comercial.
- Integración preparada para EmailJS/Mailchimp (modo demo listo para activar).

La demo no será una maqueta estática: tendrá interacciones reales, microanimaciones y flujo funcional end-to-end visible para cliente.

---

## 2) Objetivo comercial de la demo
- Validar la dirección visual y de UX.
- Demostrar captación real de oportunidades (lead form -> CRM).
- Probar una estructura modular repetible para escalar más landings.
- Reducir incertidumbre antes del proyecto completo.

---

## 3) Stack tecnológico (alineado a la bitácora)
### Base obligatoria
- **Next.js 14 (App Router)**
- **React + TypeScript**
- **CSS propio con design tokens** (sin dependencia obligatoria de Tailwind)
- **Tipografía:** Poppins

### Para la demo (sin sobrecargar)
- API Routes de Next (`app/api`) para estructura preparada.
- Persistencia demo con estado local (mock/almacenamiento de demo) para visualizar CRM en tiempo real.
- **Sin** multi-tenant, **sin** Prisma/MySQL y **sin** auth productiva en esta etapa demo.

### Integraciones preparadas
- Toggle visual para **EmailJS** (notificación y autorespuesta).
- Toggle visual para **Mailchimp** (alta en lista, opcional).

---

## 4) Alcance funcional de la demo
## 4.1 Landings públicas (2)
1. **Landing: Fachadas y Revestimientos**
2. **Landing: Madera Termo Tratada (Tantimber)**

Ambas con estructura completa:
- Hero (imagen/video 16:9, H1, subtítulo, CTA primario, CTA WhatsApp).
- Intro (2 columnas).
- Aplicaciones (grid 4 cards, proporción 1:1).
- Sistemas (3 bloques numerados horizontales).
- Materiales (cards 4:3 + botón de catálogo PDF).
- Galería (6 referencias visuales).
- Bloque técnico (argumentos objetivos).
- Banner Mader Balear (editorial/emocional, opcional por landing).
- Contacto final (formulario + WhatsApp).

## 4.2 Panel admin demo
Sidebar fija izquierda + contenido en cards:
- Dashboard
- Páginas
- Landings
- Blog
- Medios
- CRM Leads
- Ajustes

## 4.3 CRM de leads (demo funcional)
Campos:
- Nombre
- Email/Teléfono
- Mensaje
- Origen de landing
- Fecha/hora
- Estado (Nuevo / En gestión / Cerrado)
- Notas internas

Funciones demo:
- Alta automática al enviar formulario.
- Visualización inmediata en CRM.
- Estado editable.
- Badge contador actualizado.
- Exportación CSV (demo).

---

## 5) Flujo estrella para presentación al cliente
1. Usuario entra a Landing Fachadas.
2. Interactúa con CTA o WhatsApp.
3. Completa y envía formulario.
4. Lead aparece en el panel admin, módulo CRM, en tiempo real.
5. Responsable cambia estado y añade nota.
6. Dashboard refleja el cambio de forma instantánea.

Este flujo es la pieza principal de venta de la demo.

---

## 6) Sistema visual (sobrio, premium, no estático)
## 6.1 Dirección de diseño
- Estética corporativa arquitectónica.
- Base clara: blanco y grises.
- Indigo solo como acento de acción/estado.
- Márgenes amplios, lectura limpia, jerarquía fuerte.

## 6.2 Tokens base
- `--font-primary: "Poppins", sans-serif`
- `--color-bg: #FFFFFF`
- `--color-surface: #F9FAFB`
- `--color-border: #E5E7EB`
- `--color-text: #111827`
- `--color-muted: #6B7280`
- `--color-accent: #4F46E5`
- `--radius-card: 20px`
- `--shadow-soft: 0 8px 30px rgba(17, 24, 39, 0.08)`

## 6.3 Componentes visuales clave
- `page-shell`
- `admin-main`
- `card`
- `segmented` + `seg-btn`
- `input-field`
- `cta-primary`
- `cta-secondary`

---

## 7) Motion & animaciones (profesional y sobrio)
Objetivo: evitar sensación estática sin caer en efectos exagerados.

## 7.1 Principios
- Movimiento útil, no decorativo.
- Duraciones cortas y suaves.
- Consistencia entre landings y admin.
- Respeto a `prefers-reduced-motion`.

## 7.2 Efectos propuestos
- **Entrada de hero:** fade + translateY suave (500–700ms).
- **Reveal por scroll:** bloques aparecen con opacidad + desplazamiento sutil.
- **Stagger en grids:** cards entran escalonadas (60–90ms entre items).
- **Hover en cards:** scale 1.01–1.03 + sombra leve.
- **Botones CTA:** micro elevación en hover/focus.
- **Sidebar admin:** transición suave al cambiar módulo.
- **Badge CRM:** pulse breve al entrar lead nuevo.
- **Toast/feedback:** aparición y salida elegante (sin saltos bruscos).

## 7.3 Parámetros recomendados
- `duration-fast`: 180ms
- `duration-base`: 260ms
- `duration-slow`: 420ms
- easing principal: `cubic-bezier(0.22, 1, 0.36, 1)`

---

## 8) UX y conversión
- CTA visible en primer pantallazo.
- CTA de cierre al final de cada landing.
- WhatsApp flotante persistente.
- Formulario simple (3 campos + validación clara).
- Navegación limpia y comprensible.
- Copy técnico/comercial sin relleno.

---

## 9) SEO y estructura semántica (demo)
- 1 H1 por página.
- H2 por sección.
- Texto real orientado a intención de búsqueda.
- Metadata base por landing (title/description/OG listos para fase productiva).

---

## 10) Responsive y calidad
- Mobile-first.
- Adaptación completa a móvil, tablet y desktop.
- Revisiones visuales de:
  - espaciado
  - legibilidad
  - tamaños táctiles
  - consistencia de cards y botones

---

## 11) Cronograma estimado de demo
1. Setup proyecto + design system + layout base: 2 días
2. Landing Fachadas completa: 2 días
3. Landing Tantimber completa: 1 día
4. Panel admin + CRM demo: 3 días
5. Integraciones demo (toggles EmailJS/Mailchimp) + QA visual: 1 día
6. Pulido final + preparación de presentación: 1 día

**Total estimado:** 10 días hábiles

---

## 12) Entregables
- Demo funcional navegable.
- 2 landings completas.
- Panel admin demo con CRM operativo.
- Flujo lead -> CRM demostrable.
- Base de diseño reusable (tokens + componentes).
- Documento de siguiente fase (paso a producción).

---

## 13) Fuera de alcance en esta demo
- Proyecto completo con todas las landings finales.
- Auth productiva y roles avanzados.
- MySQL/Prisma en producción.
- CMS completo de nivel enterprise.
- Integraciones CRM externas avanzadas.
- Infraestructura final de producción.

---

## 14) Criterios de aceptación (demo aprobada)
- El cliente entiende la propuesta en menos de 1 minuto.
- Se percibe calidad visual profesional y coherente.
- El flujo de captación se demuestra en vivo sin fricción.
- No hay errores críticos de navegación o UX.
- La base queda lista para escalar al proyecto completo.

---

## 15) Nota final de posicionamiento
Esta demo está diseñada para vender la visión completa:  
**marca técnica + experiencia visual premium + flujo comercial real**.  
No se plantea como maqueta, sino como **primer bloque real del proyecto final**.
