# GAVEJO MADERAS Y TABLEROS
## SPO DEMO V3 MAESTRO (SPO + ANEXOS)
**Fecha:** 12 de abril de 2026  
**Versión:** 3.0  
**Estado:** Listo para presentación comercial  
**Tipo de documento:** Scope técnico-comercial de demo (sin precios)  
**Alcance aprobado:** Demo + Roadmap

---

## Control de cambios
| Versión | Fecha | Cambios principales |
|---|---|---|
| 1.0 | 2026-04-12 | Estructura base de demo y stack principal |
| 2.0 | 2026-04-12 | Mejora visual, motion y criterios de aceptación |
| 3.0 | 2026-04-12 | One-page ejecutivo, guion comercial, KPIs, legal, analítica, riesgos, handoff y FAQ dirección |

---

## 1) One-page ejecutivo inicial
### 1.1 Problema actual
- La web actual comunica catálogo, pero no prioriza captación de contacto.
- La navegación y jerarquía dificultan lectura rápida para cliente final y prescriptor.
- No hay un flujo demostrable y simple para convertir visitas en oportunidades gestionables.

### 1.2 Propuesta
- Construir una demo funcional de nueva web corporativa basada en landings de solución.
- Incluir panel admin demo con CRM visible para demostrar operación comercial.
- Mantener diseño sobrio, técnico y arquitectónico, con interacciones modernas no invasivas.

### 1.3 Impacto esperado
- Mayor claridad comercial en menos de 60 segundos de navegación.
- Conversión más directa por CTA + WhatsApp + formulario.
- Validación rápida de visión antes de invertir en proyecto completo.

### 1.4 Por qué esta demo reduce riesgo
- Evita decisiones a ciegas: el cliente ve experiencia y flujo real, no solo pantallas estáticas.
- Permite ajustar copy, diseño y módulos antes de desarrollo productivo.
- Deja una base tecnológica escalable para fases siguientes.

---

## 2) Objetivo general y objetivos específicos
### 2.1 Objetivo general
Presentar una demo completa que refleje la visión de Gavejo y valide la propuesta digital para captación, posicionamiento técnico y gestión de leads.

### 2.2 Objetivos específicos
- Validar UX de landings orientadas a conversión.
- Validar narrativa visual y tono técnico-arquitectónico.
- Validar flujo comercial: `formulario -> CRM -> estado -> seguimiento`.
- Preparar transición ordenada a producción por fases.

---

## 3) Comparativa Antes vs Después
| Eje | Situación actual | Demo nueva |
|---|---|---|
| Estructura | Catálogo por marcas/productos | Landings por soluciones con estructura repetible |
| Conversión | CTA difuso | CTA inicial/final + WhatsApp flotante + formulario |
| Mensaje | Más informativo que comercial | Técnico-comercial enfocado a decisión |
| Gestión interna | Sin flujo demo de leads | CRM visual con estado y notas |
| Escalabilidad | Fragmentada | Sistema modular para replicar landings |

---

## 4) Stack y arquitectura de demo (cerrado)
### 4.1 Stack fijo
- Next.js 14 (App Router)
- React + TypeScript
- CSS propio con design tokens
- Tipografía Poppins (400/500/700)

### 4.2 Decisiones de arquitectura demo
- Estructura frontend modular por secciones reutilizables.
- Persistencia de demo para leads y ajustes en almacenamiento local.
- API Routes preparadas para evolución posterior sin activar backend productivo.

### 4.3 Integraciones preparadas
- EmailJS (notificación + autorespuesta) vía toggle.
- Mailchimp (alta de lead en lista) vía toggle.

### 4.4 Exclusiones técnicas de esta fase
- Sin multi-tenant.
- Sin auth productiva.
- Sin MySQL/Prisma en producción.

---

## 5) Alcance funcional de la demo
### 5.1 Landings incluidas
1. Landing: Fachadas y Revestimientos  
2. Landing: Madera Termo Tratada (Tantimber)

### 5.2 Estructura obligatoria por landing
- Hero 16:9 con H1, subtítulo y dos CTAs.
- Introducción (2 columnas).
- Aplicaciones (grid 4 cards, proporción 1:1).
- Sistemas (3 bloques numerados).
- Materiales (cards 4:3 con catálogo integrado).
- Galería (6 imágenes consistentes).
- Bloque técnico (argumentos de valor objetivo).
- Banner Mader Balear opcional.
- Contacto final + botón WhatsApp.

### 5.3 Panel admin demo (UI tipo WordPress sobria)
- Dashboard
- Páginas
- Landings
- Blog
- Medios
- CRM Leads
- Ajustes

### 5.4 Flujo comercial demostrable
1. Usuario envía formulario en landing.
2. Lead entra automáticamente al CRM.
3. Lead aparece en Dashboard y CRM.
4. Estado del lead se actualiza (`new`, `in_progress`, `closed`).
5. Nota interna se guarda y se refleja en detalle.

---

## 6) Sistema visual y motion profesional
### 6.1 Dirección visual
- Sobria, técnica, arquitectónica, premium.
- Base de blancos/grises.
- Índigo reservado para acciones, foco y estados.

### 6.2 Tokens núcleo
- `--font-primary: "Poppins", sans-serif`
- `--color-bg: #FFFFFF`
- `--color-surface: #F9FAFB`
- `--color-border: #E5E7EB`
- `--color-text: #111827`
- `--color-muted: #6B7280`
- `--color-accent: #4F46E5`
- `--radius-card: 20px`
- `--shadow-soft: 0 8px 30px rgba(17,24,39,.08)`

### 6.3 Animaciones y microinteracciones (no estático)
- Hero reveal: fade + translateY (500-700ms).
- Scroll reveal por secciones con opacidad/desplazamiento suave.
- Stagger en grids de cards (60-90ms entre items).
- Hover de cards: escala sutil 1.01-1.03 + sombra leve.
- CTA: micro-elevación en hover/focus.
- Sidebar admin: transición suave entre módulos.
- Badge CRM: pulse breve al registrar nuevo lead.
- Toasts de feedback con entrada/salida limpia.
- Respeto de accesibilidad: `prefers-reduced-motion`.

---

## 7) KPI de éxito de demo (medición de decisión)
| KPI | Definición | Objetivo demo |
|---|---|---|
| Conversión a contacto | % visitas demo que completan formulario o clic WhatsApp | >= 3% en test de tráfico controlado |
| Tiempo a primer contacto | Tiempo entre envío de lead y primera respuesta comercial | <= 2 horas hábiles (meta operativa) |
| Calidad de lead | % leads con datos útiles y mensaje claro | >= 70% |
| Adopción del panel | % de uso de CRM por responsable en sesión de validación | 100% en prueba guiada |

Nota: KPI orientativos para validación de demo; métricas productivas finales se ajustan en fase de operación real.

---

## 8) Mapa de eventos de analítica
| Evento | Dónde se dispara | Momento | Datos mínimos (`metadata`) |
|---|---|---|---|
| `cta_click` | Hero y CTA final de cada landing | Al clicar CTA | `landing`, `section`, `ctaLabel` |
| `whatsapp_click` | Botón flotante y CTA WhatsApp | Al clicar enlace WhatsApp | `landing`, `placement`, `phone` |
| `form_submit` | Formulario de contacto | En envío válido | `landing`, `formId`, `hasConsent` |
| `lead_status_change` | CRM admin | Al cambiar estado | `leadId`, `fromStatus`, `toStatus` |

---

## 9) Bloque legal mínimo (España/UE)
### 9.1 Requisitos mínimos en formulario
- Checkbox obligatorio de consentimiento para tratamiento de datos.
- Enlace visible a política de privacidad.
- Texto de finalidad: atención de consulta comercial.

### 9.2 Datos tratados en demo
- Nombre, contacto, mensaje, origen, fecha/hora, estado y notas internas.

### 9.3 Reglas operativas mínimas
- Mostrar aviso de consentimiento antes del envío.
- Registrar bandera de consentimiento en el lead.
- Evitar usos de datos fuera de contacto comercial.

Nota: este SPO define mínimos funcionales para demo. La revisión legal final de textos corresponde al responsable legal de la empresa.

---

## 10) Interfaces y tipos explícitos
### 10.1 `Lead`
```ts
type LeadStatus = "new" | "in_progress" | "closed";

type Lead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  originLanding: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  consent: boolean;
  utmSource?: string;
  utmCampaign?: string;
};
```

### 10.2 `DemoSettings`
```ts
type DemoSettings = {
  whatsappNumber: string;
  notifyEmail: string;
  emailJsEnabled: boolean;
  mailchimpEnabled: boolean;
  privacyUrl: string;
  brandMode: "default" | "clean" | "editorial";
};
```

### 10.3 `AnalyticsEvent`
```ts
type AnalyticsEvent = {
  eventName: "cta_click" | "whatsapp_click" | "form_submit" | "lead_status_change";
  sourcePage: string;
  timestamp: string;
  metadata: Record<string, string | number | boolean>;
};
```

### 10.4 Regla de demo cerrada
Sin backend productivo en esta fase; sí hay flujo funcional visible y persistencia demo para validar la operación comercial.

---

## 11) Guion de demo comercial (7-10 minutos)
### Min 0-1: Apertura
- Mostrar portada del proyecto y objetivo.
- Mensaje: “Esto ya replica la experiencia final de captación”.

### Min 1-3: Landing Fachadas
- Mostrar hero, jerarquía y CTA.
- Scroll por secciones clave (aplicaciones/sistemas/materiales).
- Clic en catálogo de material.

### Min 3-5: Conversión
- Clic en WhatsApp.
- Completar formulario y enviar.
- Mostrar feedback de envío.

### Min 5-7: Admin y CRM
- Abrir Dashboard.
- Entrar a CRM y ubicar lead recién creado.
- Cambiar estado y añadir nota.

### Min 7-9: Ajustes y escalabilidad
- Mostrar toggles EmailJS/Mailchimp.
- Explicar que la base está preparada para producción.

### Min 9-10: Cierre de decisión
- Resumir valor: claridad comercial + flujo operativo + base escalable.
- Presentar roadmap por fases.

### Objeciones frecuentes y respuesta corta
| Objeción | Respuesta recomendada |
|---|---|
| “¿Esto ya es final?” | Es demo funcional avanzada; la base se reutiliza para producción sin rehacer todo. |
| “¿Dónde está la base de datos real?” | Se activa en fase siguiente para evitar complejidad prematura y decidir con menos riesgo. |
| “¿Se puede escalar a todas las landings?” | Sí, la estructura es modular y repetible por solución/material. |

---

## 12) Checklist de activos del cliente
### 12.1 Contenido
- Titulares y subtítulos finales por landing.
- Texto técnico validado por negocio.
- Copy de CTA final.

### 12.2 Media
- Imágenes hero 16:9 (calidad alta).
- Imágenes aplicaciones 1:1.
- Imágenes materiales/galería 4:3.
- Video hero opcional por landing.

### 12.3 Comercial/operativo
- Número oficial de WhatsApp.
- Correo de notificación de leads.
- PDFs de catálogos finales.
- Tono de marca (sobrio/técnico/comercial).

---

## 13) Matriz de riesgos y mitigación
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Activos incompletos del cliente | Medio | Uso de placeholders curados y reemplazo por lotes |
| Cambios de alcance en mitad de demo | Alto | Congelar alcance V3 y mover extras a roadmap |
| Calidad irregular de imágenes/video | Medio | Estándar mínimo de resolución y recorte por proporción |
| Dependencia de integraciones externas | Medio | Toggles preparados y fallback demo sin bloqueo |
| Confusión demo vs producción | Alto | Sección explícita de límites y siguientes fases |

---

## 14) Criterios de aceptación con semáforo
| Área | Verde (aprobado) | Amarillo (ajustar) | Rojo (bloquea entrega) |
|---|---|---|---|
| Visual | Jerarquía clara y coherente en 3 breakpoints | Detalles menores de espaciado | Inconsistencia severa o lectura deficiente |
| Funcional | Flujo lead->CRM completo operativo | Fallo puntual no crítico | Flujo roto o sin persistencia demo |
| Comercial | Mensaje y CTA comprensibles en <1 min | Copy mejorable | Propuesta de valor confusa |
| Performance | Navegación fluida y sin bloqueos graves | Carga mejorable en media pesada | Bloqueos visibles o UX inestable |
| Mobile | Uso cómodo, botones táctiles correctos | Ajustes menores de layout | Interacción difícil o recortes críticos |

---

## 15) Plan de pruebas (obligatorio)
1. Flujo comercial completo: formulario -> CRM -> estado -> dashboard.
2. Conversión visible: CTA inicial/final + WhatsApp en ambas landings.
3. Calidad visual premium: jerarquía, espaciado, motion sobrio.
4. Accesibilidad mínima: focus visible, contraste, navegación usable.
5. Robustez demo: recarga y mantiene leads; export CSV correcto.
6. Guion comercial validado: demo entendible sin explicación técnica extensa.

---

## 16) Plan de handoff (cierre demo)
### Entregables de cierre
- Demo funcional navegable.
- Documento SPO V3 aprobado.
- Guía rápida de uso (navegación demo + CRM).
- Backlog priorizado para fase productiva.

### Transferencia
- Acceso a repositorio/entorno de demo.
- Checklist de activación de producción por fases.
- Lista de pendientes bloqueantes (si existieran).

### Próximos pasos inmediatos
1. Confirmación de alcance fase productiva.
2. Definición de backend real y modelo de datos persistente.
3. Calendario de implementación de fases 2-5.

---

## 17) Roadmap de evolución en fases
| Fase | Objetivo | Resultado |
|---|---|---|
| Fase 1 | Demo funcional comercial | Validación de diseño, UX y flujo de leads |
| Fase 2 | Backend real + API persistente | Leads y settings en servicio estable |
| Fase 3 | Auth/roles admin | Gestión segura por perfiles |
| Fase 4 | DB productiva (MySQL/Prisma) | Operación robusta y escalable |
| Fase 5 | Operación continua | Analítica avanzada, SEO técnico, mejora de conversión |

---

## 18) FAQ de decisión para dirección
### ¿Qué incluye esta demo?
Incluye 2 landings completas, panel admin demo, CRM de leads y estructura visual/técnica lista para escalar.

### ¿Qué no incluye?
No incluye backend productivo, auth avanzada ni despliegue completo de todas las landings finales.

### ¿Qué se activa después?
Persistencia real, seguridad/roles, base de datos productiva, integraciones completas y operación continua.

### ¿Qué valor tiene ya esta versión?
Permite decidir con evidencia real: mensaje, conversión, experiencia y flujo comercial visibles en una sola presentación.

---

## 19) Supuestos y defaults del documento
- Documento en español profesional, sin precios.
- Alcance oficial: Demo + Roadmap.
- Estilo: sobrio, elegante, técnico, no recargado.
- Integraciones EmailJS/Mailchimp quedan preparadas para activación.
- Se pueden usar placeholders curados si faltan activos finales.

---

# ANEXOS

## Anexo A — Especificación funcional por secciones
| Sección | Objetivo | Comportamiento esperado |
|---|---|---|
| Hero | Captar atención y explicar valor inmediato | CTA visible, lectura rápida, visual dominante |
| Aplicaciones | Mostrar casos de uso | Grid claro, cards homogéneas |
| Sistemas | Dar confianza técnica | Bloques numerados con narrativa lógica |
| Materiales | Conectar solución y catálogo | CTA de PDF por material |
| Galería | Validación visual | Consistencia de formato e imagen |
| Bloque técnico | Argumento racional | Lista clara, concreta, sin ruido |
| Contacto | Convertir | Form sencillo + WhatsApp persistente |

## Anexo B — Componentes de diseño
- `page-shell`, `admin-main`, `card`, `input-field`, `segmented`, `seg-btn`, `cta-primary`, `cta-secondary`, `status-badge`, `toast`.

## Anexo C — Parámetros de motion
- Duración rápida: `180ms`
- Duración base: `260ms`
- Duración lenta: `420ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Anexo D — Campos mínimos de CSV de leads
- `id`, `name`, `contact`, `message`, `originLanding`, `status`, `createdAt`, `consent`, `utmSource`, `utmCampaign`, `notes`.

## Anexo E — Criterios QA rápidos de revisión visual
- Coherencia de paddings.
- Legibilidad de tipografía.
- Contraste suficiente.
- Estados hover/focus visibles.
- Comportamiento correcto en móvil.

## Anexo F — Regla de gobernanza de cambios
- Todo cambio nuevo fuera de V3 pasa a backlog fase productiva.
- No se amplía alcance demo sin aprobación explícita.
