# AGENTS — Forge

Forge es una red social general para el primer parcial de Clientes Web Mobile (Da Vinci, profesor Santiago Gallino).

- Consigna: `docs/Clientes Web Mobile - Primer Parcial.pdf`.
- Plan, modelo de datos y avance: `ROADMAP.md`. Leerlo antes de empezar una tarea y marcar lo que se termine.
- Referencia del docente: `proyecto-docente/` (ignorado por git). Solo se lee; no se edita ni se copia.

## Rules

- Del docente se toma **cómo** se escribe: sintaxis, patrones, formato y orden de carpetas. No se usa nada que no esté en `proyecto-docente/` (se ignora solo que él usa Supabase local con Docker).
- Lo **que** se construye es propio de Forge: nombres de tablas, columnas, servicios, funciones, rutas, páginas, componentes, textos y diseño. No copiar nombres ni pantallas del docente, para que la entrega no parezca una copia.
- Si una funcionalidad de la consigna necesita algo que el docente no mostró, se consulta al usuario antes de escribirlo y se marca en el `ROADMAP.md` como "no visto en clase".
- Sintaxis básica y simple. Es un proyecto académico y estamos aprendiendo: nada de abstracciones, helpers genéricos, patrones avanzados ni trucos de JavaScript.
- Cada cambio tiene que poder explicarse en un oral: la consigna exige que el alumno entienda y justifique todo el código.
- No correr `pnpm dev` ni `pnpm build` de forma constante. Solo cuando haga falta verificar algo puntual, y avisando.
- Nunca hacer `git commit` ni `git push`. Eso lo hace únicamente el usuario.
- No correr comandos de Supabase (`link`, `db push`, etc.). El agente crea los archivos y le pasa al usuario los comandos para que los corra él.
- Sin Docker: no usar `supabase start` ni `supabase db reset`.
- No tocar `.env`, `.env.local` ni `proyecto-docente/`.
- Responder en español.

## Stack

- Vue 3 (SFC) + Vite + Vue Router + Tailwind v4 + Supabase JS.
- Supabase en la nube (Postgres, Realtime, Auth), opción 2 de la consigna.
- Gestor de paquetes: `pnpm`. Scripts útiles: `pnpm lint`, `pnpm format`.
- Variables de entorno: `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en `.env`, apuntando al proyecto en la nube.

## Supabase (nube + CLI)

El esquema vive en `supabase/migrations/` y se aplica al proyecto en la nube con la CLI (devDependency `supabase`). Ninguno de estos comandos usa Docker.

- Nueva migración: crear el `.sql` a mano con el formato `AAAAMMDDHHMMSS_create_<tabla>_table.sql`.
- Aplicar migraciones pendientes: `pnpm exec supabase db push`.
- Una migración ya aplicada no se edita: los cambios van en una migración nueva.
- Datos de ejemplo: se cargan registrando usuarios y publicando desde la app (no hay `seed.sql`, porque en la nube no se corre `db reset`).
- En el dashboard, "Confirm email" está desactivado.
- El plan gratuito pausa el proyecto tras una semana sin uso: entrar al menos una vez por semana hasta que se corrija.

## Carpetas

Mismo orden que `proyecto-docente/`, con archivos propios:

```
index.html             lang="es", h-full y grilla en #app
src/
  main.js
  App.vue              nav / main / footer + estado de sesión
  style.css            @import tailwindcss + paleta @theme + clases en @layer components
  router/router.js     rutas + guard de sesión
  services/            supabase.js, auth.js, profiles.js, posts.js
  components/          PageTitle.vue, PostCard.vue, PostForm.vue
  pages/               una vista por ruta (ver ROADMAP.md)
supabase/
  migrations/          una tabla por archivo
  .temp/               datos del `supabase link` (ignorado por git)
```

## Cómo se escribe el código

Patrones del docente, aplicados a lo de Forge:

- Formato: 4 espacios, punto y coma, comillas simples (Prettier ya está configurado así). Imports relativos con extensión: `'../services/auth.js'` (no usar el alias `@`).
- Options API: `name`, `components`, `data()`, `methods`, `mounted`, `unmounted`.
- Títulos de página con `<PageTitle>` (slot + clase `.page-title` en `@layer components` con `@apply`).
- Las páginas no importan Supabase: llaman funciones de `src/services/`.
- Servicios: `const { data, error } = await supabase.from('tabla')...`. Si hay error: `console.error('[archivo.js función] Mensaje: ', error)` y `throw new Error(error.message)`. JSDoc con `@param` y `@returns` en cada función exportada.
- Formularios: `<form action="#" @submit.prevent="handleSubmit">`, `label for` + `id`, `v-model` sobre un objeto de `data()`, estado `loading`.
- Nombres de columnas y de datos en snake_case como en la base (`display_name`, `user_id`, `created_at`).
- Auth con patrón observer: `userData` + `observers`, `onAuthStateChange` carga el perfil y llama a `notifyAll()`. Los componentes usan `subscribeToAuthChanges(callback)`.
- Guard del router: el router se suscribe a `subscribeToAuthChanges`, guarda el `user` y en `beforeEach` devuelve `'/acceso'` si la ruta tiene `meta.requiresAuth` y `user.id === null`.
- Nav según sesión: `<template v-if="user.id === null">` con acceso y registro; `v-else` con publicar, cuenta y el form de cerrar sesión.
- Realtime con canal: `supabase.channel()`, `.on('postgres_changes', { event: 'INSERT', ... })`, `.subscribe()`, y la función devuelve otra que hace `unsubscribe()`. La página la guarda y la llama en `unmounted`.
- Migraciones SQL: `CREATE TABLE` y `ALTER PUBLICATION ... ADD TABLE` en mayúscula, columnas en minúscula, 4 espacios, `id bigint primary key generated always as identity`, `references auth.users (id)`, `created_at timestamptz default now()`. Sin RLS, policies, triggers ni funciones.
