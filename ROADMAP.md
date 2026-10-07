# Roadmap — DevChat

Plan y avance del parcial. Contexto, reglas y convenciones de código: `AGENTS.md`.

## Temática

Red social para programadores y desarrolladores web: comparten su trabajo, charlan y se conocen entre ellos. La consigna pide tema libre (excepto política o religión).

## Consigna (lo que se evalúa)

- SPA con Vite, Vue SFC, Tailwind y Supabase (Postgres, Realtime, Auth). Supabase en la nube.
- Registro e ingreso de usuarios.
- Feed con las publicaciones de todos los usuarios.
- Crear publicaciones.
- Perfil de cada usuario con sus publicaciones.
- Perfil propio: administrar sus datos (la consigna dice "ej: nombre o password"; se edita nombre y bio).
- HTML semántico, accesibilidad, usabilidad, JSDoc, nombres coherentes, archivos prolijos.

## Rutas

| Ruta | Página | Sesión |
|---|---|---|
| `/` | `Home.vue` feed | no |
| `/acceso` | `Login.vue` | no |
| `/registro` | `Register.vue` | no |
| `/publicar` | `NewPost.vue` | sí |
| `/cuenta` | `Account.vue` | sí |
| `/usuarios/:id` | `UserProfile.vue` | no |

Rutas con sesión: `meta: { requiresAuth: true, }` y `beforeEach` devuelve `'/acceso'`.

`/usuarios/:id` es una ruta con parámetro (`this.$route.params.id`): **no visto en clase**, pero la consigna lo necesita para ver el perfil de cada usuario.

## Componentes

- `PageTitle.vue`: título de cada página (slot + clase `.page-title`).
- `PostCard.vue`: una publicación (autor, texto, fecha). Se usa en el feed y en el perfil. El autor es un `RouterLink` a `/usuarios/:id` con el `user_id` del post: es la forma de llegar al perfil de cada usuario que pide la consigna.
- `PostForm.vue`: formulario para publicar.

## Datos

- `profiles`: `id uuid` (PK, FK a `auth.users`), `email text`, `display_name text`, `bio text`, `created_at`.
- `posts`: `id bigint identity`, `user_id uuid` (FK a `auth.users`), `email text`, `body text`, `created_at`. En `supabase_realtime`. Guarda el `email` del autor, así el feed lo muestra sin consultar otra tabla. Decisión: el feed y las publicaciones muestran el email; `display_name` y `bio` solo se ven en el perfil (`/usuarios/:id` y `/cuenta`).
- Sin RLS, policies ni triggers.

## Servicios

- `supabase.js`: `createClient` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` del `.env`.
- `profiles.js`: `getProfileById(id)`, `createProfile({ id, email })`, `updateProfile(id, { display_name, bio })`.
- `auth.js`: `register({ email, password })` (después del `signUp` llama a `createProfile`), `login({ email, password })`, `logout()`, `updateAuthProfile({ display_name, bio })` (actualiza, cambia `userData` y llama a `notifyAll()`), `subscribeToAuthChanges(callback)` con `{ id, email, display_name, bio }`.
- `posts.js`: `getAllPosts()`, `getPostsByUser(userId)`, `createPost({ user_id, email, body })`, `subscribeToNewPosts(callback)`.

## Hecho

- [x] Vue 3 + Vite + Vue Router + Tailwind v4 + Supabase JS
- [x] Paleta en `src/style.css` (steel-blue, frozen-water, jet-black, iron-grey, soft-cyan)
- [x] Shell en `App.vue` (nav + main + footer)
- [x] Placeholders `Home`, `Login`, `Register`
- [x] `.env` con las variables de Supabase (proyecto en la nube)
- [x] CLI de Supabase como devDependency y proyecto vinculado
- [x] "Confirm email" desactivado en el dashboard
- [x] Migraciones `profiles` y `posts` con la sintaxis del docente
- [x] Prettier y `.editorconfig` con el formato del docente (4 espacios, punto y coma), `src/` formateado
- [x] Migraciones aplicadas en la nube con `db push`
- [x] Cliente en `src/services/supabase.js` (se borró `src/lib/`)
- [x] Router en `src/router/router.js` (importado así en `main.js`)
- [x] `index.html`: `lang="es"`, título DevChat, `h-full` y grilla en `#app`
- [x] Nombre DevChat (antes Forge) en `index.html`, `App.vue`, `AGENTS.md` y `ROADMAP.md`
- [x] Temática definida: red social para programadores y desarrolladores web
- [x] `PageTitle.vue` + clase `.page-title` en `@layer components`, usado en `Home`, `Login` y `Register`

## Falta

- [ ] `profiles.js` + `auth.js` + `Login.vue` y `Register.vue` reales
- [ ] `App.vue` con nav según sesión y cerrar sesión
- [ ] Router: rutas de la tabla + guard; borrar `Chat.vue` y `/sala`
- [ ] `posts.js` + `PostCard.vue` + feed en `Home.vue` con realtime
- [ ] `PostForm.vue` + `NewPost.vue`
- [ ] `UserProfile.vue` (ruta con parámetro, no visto en clase)
- [ ] `Account.vue` (ver y editar nombre y bio)
- [ ] Pasada de accesibilidad, responsive y JSDoc

## Entrega

Zip/rar `apellido-nombre` con el proyecto completo (incluida `supabase/migrations/`) y `datos.txt` (carrera, materia, cuatrimestre, año, turno, comisión, apellido y nombre, docente, 1er parcial). Como se usa la nube no va el deploy local, pero el proyecto de Supabase no puede estar pausado al momento de la corrección.
