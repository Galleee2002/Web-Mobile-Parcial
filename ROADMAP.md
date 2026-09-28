# Roadmap — Forge

Red social general para el primer parcial de Clientes Web Mobile.
Consigna: `docs/Clientes Web Mobile - Primer Parcial.pdf`. Referencia: `proyecto-docente/`.

## Consigna (lo que se evalúa)

- SPA con Vite, Vue SFC, Tailwind y Supabase (Postgres, Realtime, Auth). Supabase local.
- Registro e ingreso de usuarios.
- Feed con las publicaciones de todos los usuarios.
- Crear publicaciones.
- Perfil de cada usuario con sus publicaciones.
- Perfil propio: editar nombre y contraseña.
- HTML semántico, accesibilidad, usabilidad, JSDoc, nombres coherentes, archivos prolijos.

## Cómo se escribe el código

Tomado del docente sin copiarlo:

- Options API: `name`, `components`, `data()`, `methods`, `mounted`, `unmounted`.
- Sin comentarios explicativos de clase. JSDoc solo en funciones exportadas de `services/`.
- Las páginas no importan Supabase: llaman funciones de `src/services/`.
- Servicios: `const { data, error } = await supabase...`, y si hay error `throw new Error(error.message)`.
- Formularios: `<form action="#" @submit.prevent="...">`, `label for` + `id`, `v-model` sobre un objeto de `data()`.
- Estado `loading` y mensaje de error visibles en cada pantalla (el docente los deja en TODO).
- Nav según sesión: `user.id === null` muestra acceso/registro; si no, publicar/cuenta/salir.
- Realtime como el chat del docente, aplicado a `posts`: canal, `postgres_changes` con `INSERT`, la función devuelve el unsubscribe y la página lo llama en `unmounted`.
- Auth con patrón observer: `subscribeToAuthChanges(callback)` notifica al suscribirse y en cada cambio.
- Estilo de este repo (Prettier): 2 espacios, comillas simples, sin punto y coma.

Lo propio de Forge: nombre, paleta de `src/style.css`, rutas, tablas y componentes.

## Carpetas

```
src/
  main.js
  App.vue              shell nav / main / footer + estado de sesión
  style.css            paleta @theme + clases en @layer components
  router/index.js      rutas + guard de sesión
  services/            supabase.js, auth.js, posts.js, profiles.js
  components/          piezas reutilizables (título, tarjeta de post, form de post)
  pages/               una vista por ruta
supabase/
  migrations/          tablas, RLS, trigger, realtime
  seed.sql             usuarios y posts de ejemplo
```

## Rutas

| Ruta | Página | Sesión |
|---|---|---|
| `/` | `Home.vue` feed | no |
| `/publicar` | `NewPost.vue` | sí |
| `/usuarios/:id` | `UserProfile.vue` | no |
| `/cuenta` | `Account.vue` | sí |
| `/acceso` | `Login.vue` | no |
| `/registro` | `Register.vue` | no |

Rutas con sesión: `meta: { requiresAuth: true }` y `beforeEach` redirige a `/acceso`.

## Datos

- `profiles`: `id uuid` (PK, FK a `auth.users`), `display_name text`, `created_at`, `updated_at`. Se crea con trigger al registrarse.
- `posts`: `id bigint identity`, `author_id uuid` (FK a `profiles.id`), `body text`, `created_at`. En `supabase_realtime`.
- RLS: lectura pública en ambas; insert de `posts` y update de `profiles` solo si `auth.uid()` es el dueño.
- El feed trae el nombre con `select('*, profiles(display_name)')`.

## Servicios

- `supabase.js`: `createClient` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` del `.env`.
- `auth.js`: `register({ email, password, displayName })`, `login({ email, password })`, `logout()`, `subscribeToAuthChanges(callback)` con `{ id, email, displayName }`.
- `posts.js`: `getPosts()`, `getPostsByAuthor(authorId)`, `createPost({ authorId, body })`, `subscribeToNewPosts(callback)`.
- `profiles.js`: `getProfile(id)`, `updateDisplayName(id, displayName)`, `updatePassword(password)` vía `supabase.auth.updateUser`.

## Hecho

- [x] Vue 3 + Vite + Vue Router + Tailwind v4 + Supabase JS
- [x] Paleta en `src/style.css` (steel-blue, frozen-water, jet-black, iron-grey, soft-cyan)
- [x] Shell en `App.vue` (nav + main + footer)
- [x] Placeholders `Home`, `Login`, `Register`
- [x] `.env` con las variables de Supabase

## Falta

- [ ] `supabase init` + migración (`profiles`, `posts`, RLS, trigger, realtime) + `seed.sql`
- [ ] Mover `src/lib/supabaseClient.js` a `src/services/supabase.js`
- [ ] `index.html`: `lang="es"`, título Forge, grilla de alto completo
- [ ] Componente de título con slot + clase en `@layer components`
- [ ] `auth.js` + `Login.vue` y `Register.vue` reales
- [ ] `App.vue` con nav según sesión y cerrar sesión
- [ ] Router: rutas de la tabla + guard; borrar `Chat.vue` y `/sala`
- [ ] `posts.js` + feed en `Home.vue` con realtime
- [ ] `NewPost.vue`
- [ ] `profiles.js` + `UserProfile.vue`
- [ ] `Account.vue` (nombre y contraseña)
- [ ] Pasada de accesibilidad, responsive y JSDoc

## Entrega

Zip/rar `apellido-nombre` con el proyecto completo, el deploy local de Supabase y `datos.txt` (carrera, materia, cuatrimestre, año, turno, comisión, apellido y nombre, docente, 1er parcial).
