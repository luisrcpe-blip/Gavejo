# Gavejo Demo V3

Demo corporativa desarrollada con:
- Next.js 14 (App Router)
- React + TypeScript
- CSS propio con design tokens
- Tipografia Poppins

## Incluye
- Landing `Fachadas y Revestimientos`
- Landing `Madera Termo Tratada (Tantimber)`
- Panel Admin tipo WordPress con modulos:
  - Dashboard
  - Paginas
  - Landings
  - Blog
  - Medios
  - CRM Leads
  - Ajustes
- Flujo funcional demo:
  - Formulario landing -> API Next -> MySQL (phpMyAdmin) -> CRM en tiempo real
  - Cambio de estado del lead
  - Exportacion CSV
- Mejoras V3:
  - Editor de blog funcional con publicacion automatica en `/blog`
  - Editor de hero y estado de landings desde Admin -> Landings
  - Dashboard con desglose de eventos de analitica por tipo
  - Pagina legal de privacidad conectada al consentimiento del formulario
- Toggles preparados:
  - EmailJS
  - Mailchimp
- Persistencia MySQL (phpMyAdmin) para:
  - Leads CRM
  - Eventos de analitica
  - Estado admin (settings, blog, landing overrides, page meta)

## Rutas
- `/` Home demo
- `/soluciones/fachadas`
- `/materiales/termo-tratada`
- `/blog`
- `/soluciones`
- `/materiales`
- `/mader-balear`
- `/contacto`
- `/privacidad`
- `/admin`
- `/api/health`
- `/api/leads` (GET, POST)
- `/api/leads/[id]` (PATCH)
- `/api/events` (GET, POST)
- `/api/state/[key]` (GET, PUT)

## Ejecutar local
```bash
npm install
npm run dev
```

## Validacion tecnica
```bash
npm run lint
npm run build
```

## Subir a GitHub
```bash
git init
git add .
git commit -m "Implement SPO Demo Gavejo V3"
git branch -M main
git remote add origin <TU_REPO_URL>
git push -u origin main
```

## Conectar a Hostinger (Node 20)
1. Crear app Node/Next en Hostinger.
2. Conectar repositorio GitHub.
3. Configurar build command: `npm run build`.
4. Configurar start command: `npm run start`.
5. Definir version Node `20.x`.
6. Publicar.

## Configuracion MySQL en Hostinger
1. Crear base de datos MySQL desde hPanel.
2. Abrir phpMyAdmin e importar:
   - `sql/001_gavejo_demo_mysql.sql`
3. Configurar variables de entorno en Hostinger:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_SSL` (`false` o `true` segun tu servidor)
4. Redeploy.
5. Validar que:
   - Formulario crea registros en tabla `leads`
   - Dashboard/CRM reflejan datos
   - Eventos aparecen en `analytics_events`
   - Cambios de Ajustes/Blog/Landings quedan en `app_state`
   - `GET /api/health` responde `db.configured: true` y `db.connected: true`

## Checklist pre-demo (5 minutos antes)
1. Verificar rutas: Home, 2 landings, Blog y Admin.
2. Enviar 1 lead de prueba desde cada landing.
3. Confirmar aparicion en CRM + cambio de estado.
4. Exportar CSV una vez para validar descarga.
5. Revisar numero de WhatsApp en Ajustes.
6. Confirmar que `/privacidad` carga correctamente.

## Checklist post-demo (handoff)
1. Guardar ajustes finales de WhatsApp, email y toggles.
2. Exportar y entregar CSV de leads de demo si aplica.
3. Documentar feedback del cliente por modulo.
4. Definir backlog de fase productiva (backend, auth, DB).
5. Confirmar decision de despliegue en Hostinger.

## Limites de esta fase
- Persistencia principal en MySQL (phpMyAdmin) para CRM y modulo admin.
- Eventos de analitica se registran con envio best-effort (sin bloquear navegacion).
- Integraciones EmailJS/Mailchimp preparadas, no conectadas con credenciales reales.
- Media manager avanzado y auth robusta quedan para fase productiva.
