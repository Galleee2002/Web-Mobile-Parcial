# AGENTS — DevChat

DevChat es una red social para programadores y desarrolladores web, donde comparten su trabajo y charlan entre ellos. Es el primer parcial de Clientes Web Mobile (Da Vinci, profesor Santiago Gallino).

- Consigna: `docs/Clientes Web Mobile - Primer Parcial.pdf`.
- Plan, modelo de datos y avance: `ROADMAP.md`. Leerlo antes de empezar una tarea y marcar lo que se termine.
- Referencia del docente: `proyecto-docente/` (ignorado por git). Solo se lee; no se edita ni se copia.

## Rules

- Del docente se toma **cómo** se escribe: sintaxis, patrones, formato y orden de carpetas. No se usa nada que no esté en `proyecto-docente/` (se ignora solo que él usa Supabase local con Docker).
- Lo **que** se construye es propio de DevChat: nombres de tablas, columnas, servicios, funciones, rutas, páginas, componentes, textos y diseño. No copiar nombres ni pantallas del docente, para que la entrega no parezca una copia.
- Si una funcionalidad de la consigna necesita algo que el docente no mostró, se consulta al usuario antes de escribirlo y se marca en el `ROADMAP.md` como "no visto en clase".
- Sintaxis básica y simple. Es un proyecto académico y estamos aprendiendo: nada de abstracciones, helpers genéricos, patrones avanzados ni trucos de JavaScript.
- Cada cambio tiene que poder explicarse en un oral: la consigna exige que el alumno entienda y justifique todo el código.
- El código no lleva comentarios (`//`, `/* */`, `<!-- -->`), solo JSDoc. El docente comenta mucho porque su proyecto es material de clase; las explicaciones de DevChat van en `ROADMAP.md` y `AGENTS.md`.
- No correr `pnpm dev` ni `pnpm build` de forma constante. Solo cuando haga falta verificar algo puntual, y avisando.
- Nunca hacer `git commit` ni `git push`. Eso lo hace únicamente el usuario.
- No correr comandos de Supabase (`link`, `db push`, etc.). El agente crea los archivos y le pasa al usuario los comandos para que los corra él.
- Sin Docker: no usar `supabase start` ni `supabase db reset`.
- No tocar `.env`, `.env.local` ni `proyecto-docente/`.
- Responder en español.

## Decisiones de DevChat

El docente y esta entrega no hacen lo mismo. Esto queda así a propósito:

- Nombres propios: tablas `profiles` y `posts`, rutas `/acceso`, `/registro`, `/publicar`, `/cuenta`, `/cuenta/editar` y `/usuarios/:id`, componentes `PageTitle`, `PostCard` y `ProfileCard`. El perfil tiene `display_name` y `bio`. No se agrega la columna `career` del docente.
- Supabase en la nube, con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`. No se copia la URL local de `supabase.js` ni `supabase/seed.sql`. Ese seed crea usuarios con una función plpgsql para el deploy local con Docker.
- Nav sin sesión: "Inicio", "Ingresar" y "Registrate". "Registrate" es un botón blanco (`.nav-register`). El docente muestra "Crear cuenta" como link común.
- Nav con diseño (no visto en clase, decidido con el usuario): icono `MessagesSquare` de `@lucide/vue` a la izquierda de "DevChat", registrado en `components`. Desde `md:` el nav es una grilla de tres columnas (`md:grid-cols-[1fr_auto_1fr]`): logo a la izquierda, iconos en el centro y botones a la derecha. Inicio, Publicar y Cuenta son iconos (`House`, `CircleFadingPlus`, `User`) con el nombre en un `<span class="sr-only">` y en `title`. Los iconos usan `.nav-icon` (hover en blanco) y `.nav-icon-active` (fondo `steel-blue-800`); no llevan raya. "Inicio" usa `exact-active-class`, "Publicar" `active-class`, y "Cuenta" usa `:class` con `$route.path.startsWith('/cuenta')`, porque `/cuenta/editar` es una ruta hermana y el router no la marca. "Ingresar" sigue como texto con la raya blanca (`.nav-link` y `.nav-link-active`).
- El nav va dentro de un `<header>` y en celular es un menú hamburguesa (no visto en clase, decidido con el usuario). El docente tiene un `<nav>` suelto de una sola fila, que con sesión no entra en un celular.
- El feed (`/`) y el perfil de otro usuario no piden sesión, porque la consigna pide ver las publicaciones de todos y entrar al perfil de cada uno. En el docente, el chat y `/usuario/:id` tienen `requiresAuth`.
- No se copian `delay()`, `BaseLoader` ni `LoadingContext`. `delay()` solo frena la carga para mostrar el loader en clase. La carga se escribe como en el chat: `v-if="!loading"` y un `v-else` con el texto "Cargando...".
- El `catch` de login, registro y del feed (`Home.vue`) hace `console.error`. El del docente está vacío (`// TODO...`). Login, registro, publicar y editar cuenta además muestran el error en la página (no visto en clase, decidido con el usuario): `errorMessage: null` en `data()`, un texto fijo en castellano en el `catch` y `<p v-if="errorMessage !== null" role="alert">`. Editar cuenta también muestra "Cambios guardados." con `successMessage`.
- Los servicios no llevan los `console.log` del docente (por ejemplo, el del payload en la suscripción realtime): solo `console.error` cuando hay error.
- En `onAuthStateChange`, si `getProfileById` no devuelve perfil, no se leen sus campos. Justo después del registro el perfil todavía no existe. El docente no tiene ese `if`.
- El formulario de publicar queda en `NewPost.vue`, como el formulario del chat queda en la página. `PostCard.vue` sí es un componente: el docente muestra el mensaje solo en el chat, y acá el mismo bloque va en el feed y en el perfil. La raíz de `PostCard` es un `<li>`, adentro de un `<ol>`.
- `ProfileCard.vue` también es un componente porque la misma tarjeta va en `/cuenta` y en `/usuarios/:id`. Recibe el prop `profile` y tiene un `<slot />` en la cabecera: `Account` le pasa el botón "Editar perfil" (icono `Pencil`) y `UserProfile` no le pasa nada. Diseño no visto en clase, decidido con el usuario: avatar gris con el icono `User`, nombre y email arriba, y un `<dl>` con una fila por dato (iconos `User`, `FileText` y `Mail`). Cada par `dt`/`dd` va dentro de un `<div>`. El título centrado con la raya `steel-blue-400` va solo en `/cuenta`; `.page-title` no cambia.
- `vite.config.js` todavía trae el scaffold de Vite (`defineConfig`, el alias `@`, `vite-plugin-vue-devtools`). No se usa `@` en los imports. El docente exporta solo `{ plugins: [vue(), tailwind()] }`.

## Stack

- Vue 3 (SFC) + Vite + Vue Router + Tailwind v4 + Supabase JS. Iconos con `@lucide/vue` (no visto en clase; `lucide-vue-next` está deprecado).
- Supabase en la nube (Postgres, Realtime, Auth), opción 2 de la consigna.
- Gestor de paquetes: `pnpm`. Scripts útiles: `pnpm lint`, `pnpm format`.
- Variables de entorno: `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en `.env`, apuntando al proyecto en la nube.

## Supabase (nube + CLI)

El esquema vive en `supabase/migrations/` y se aplica al proyecto en la nube con la CLI (devDependency `supabase`). Ninguno de estos comandos usa Docker.

- Nueva migración: crear el `.sql` a mano con el formato `AAAAMMDDHHMMSS_create_<tabla>_table.sql`. Si no crea una tabla, el nombre dice lo que hace (`AAAAMMDDHHMMSS_grant_profiles_and_posts.sql`).
- Supabase en la nube no da permisos a las tablas nuevas de `public` (cambio de 2026). Cada tabla nueva necesita su `GRANT` a `anon` y `authenticated`, solo con las operaciones que usa la app.
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
  App.vue              header (nav) / main / footer + estado de sesión y del menú
  style.css            @import tailwindcss + paleta @theme + clases en @layer components
  router/router.js     rutas + guard de sesión
  services/            supabase.js, auth.js, profiles.js, posts.js
  components/          PageTitle.vue, PostCard.vue, ProfileCard.vue
  pages/               una vista por ruta (ver ROADMAP.md)
supabase/
  migrations/          una tabla por archivo
  .temp/               datos del `supabase link` (ignorado por git)
```

## Cómo se escribe el código

Patrones del docente, aplicados a lo de DevChat:

- Formato: 4 espacios, punto y coma, comillas simples (Prettier ya está configurado así). Imports relativos con extensión: `'../services/auth.js'` (no usar el alias `@`). Entre servicios, el docente a veces omite el `.js` (`./supabase`); acá se deja siempre.
- Options API: `name`, `components`, `data()`, `methods`, `mounted`, `unmounted`. Si hace falta un prop, se escribe como en `LoadingContext`: `props: { loading: { type: Boolean, required: true, default: false } }` y el padre lo pasa con `:loading="loading"`. DevChat no usa ese componente.
- Títulos de página con `<PageTitle>` (slot + clase `.page-title` en `@layer components` con `@apply`). El docente lo llama `BaseH1` y la clase es `.h1`.
- Las páginas no importan Supabase: llaman funciones de `src/services/`.
- Servicios: `const { data, error } = await supabase.from('tabla')...`. Si hay error: `console.error('[archivo.js función] Mensaje: ', error)` y `throw new Error(error.message)`. El `.select()` del docente no usa `.order()` ni `.limit()`. En DevChat, las publicaciones se traen con `.select().order('created_at', { ascending: false })` (no visto en clase, decidido con el usuario). No se usa `.limit()`.
- Un perfil por id: `.select().eq('id', id)` y `return data[0]`. Editar: `.update(data).eq('id', id)`. Las publicaciones de un usuario: el mismo `.eq()`, con la columna `user_id`. El perfil del docente no lista los mensajes de esa persona; la consigna sí pide las publicaciones, y `.eq()` ya está visto.
- Formularios: `<form action="#" @submit.prevent="handleSubmit">`, `label for` + `id`, `v-model` sobre un objeto de `data()`, estado `loading`. En login y registro, `this.loading = false` va después del try/catch. Al editar el perfil, va en el `finally`.
- El perfil propio son dos páginas, como `MyProfile` y `EditProfile`. `/cuenta` muestra los datos con `ProfileCard` (`<dl>`, `<dt>`, `<dd>`, y `valor || 'Sin especificar...'`) y un `RouterLink` a `/cuenta/editar`. Esa segunda página tiene el formulario y llama a `updateAuthProfile`.
- `updateAuthProfile(data)` actualiza la tabla, hace `userData = { ...userData, ...data }`, llama a `notifyAll()` y en el `catch` relanza el error. No redirige al guardar.
- Nombres de columnas y de datos en snake_case como en la base (`display_name`, `user_id`, `created_at`).
- Auth con patrón observer: `userData` + `observers`, `onAuthStateChange` carga el perfil y llama a `notifyAll()`. Los componentes usan `subscribeToAuthChanges(callback)`.
- Ruta con parámetro: `{ path: '/usuarios/:id', component: UserProfile }`. En la página, `this.$route.params.id`. El link al autor es concatenación: `:to="'/usuarios/' + post.user_id"`. El docente deja el template string comentado.
- El `v-for` del listado no lleva `:key`. Va en un `<li>` adentro de un `<ol>`.
- Guard del router: el router se suscribe a `subscribeToAuthChanges`, guarda el `user` y en `beforeEach` hace `if (to.meta?.requiresAuth && user.id === null) return '/acceso'`.
- Nav según sesión: `<template v-if="user.id === null">` con "Ingresar" (`/acceso`) y el botón "Registrate" (`/registro`); `v-else` con publicar, cuenta y el form de cerrar sesión (botón blanco `.nav-register` con el texto "Cerrar sesión", sin el email). Cerrar sesión llama a `logout()` y después `this.$router.push('/acceso')`. Al registro también se llega desde el link "¿No tenés cuenta? Registrate" de `Login.vue`, y `Register.vue` tiene el link inverso a `/acceso`. Editar la cuenta no va en el nav: se entra desde `/cuenta`.
- Menú en celular: `menuOpen: false` en `data()` de `App.vue`, `toggleMenu()` y `closeMenu()` en `methods`. Botón `type="button"` con texto "Menú", `class="md:hidden"`, `aria-controls="main-menu"`, `:aria-expanded="menuOpen"` y `@click="toggleMenu"`. El `div id="main-menu"` (adentro van la `ul` de iconos y la `ul` de botones) lleva `:class="menuOpen ? 'flex' : 'hidden'"` y `md:contents`, para que desde `md:` sus dos listas entren directo en la grilla del nav. Cada `RouterLink` del nav lleva `@click="closeMenu"`, y `handleLogout` también lo llama. La grilla de `index.html` es `grid-rows-[auto_1fr_100px]` para que el nav crezca al abrir el menú.
- Listados: si no hay publicaciones, `<p v-if="posts.length === 0">` con un texto, y el `<ol v-else>`.
- Inputs: borde `border-iron-grey-600` (el 400 no llega al contraste 3:1). `Login` y `Register` llevan `required` y `autocomplete` (`email`, `current-password`, `new-password`). Textos largos sin espacios (emails, URLs): `wrap-break-word`.
- Realtime con canal: `supabase.channel()`, `.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' })`, `.subscribe()`, y la función devuelve otra que hace `unsubscribe()`. La página la guarda en un `let` afuera del `export default` (`let unsubscribeFromPosts = () => {}`), lo asigna en `mounted` y lo llama en `unmounted`. No va en `data()`.
- Carga de un listado: `loading: true` en `data()`, el fetch en `try`, `this.loading = false` en el `finally`, y la suscripción realtime después del try/catch, como en el chat. Como el listado va del más nuevo al más viejo, la publicación que llega por realtime se agrega adelante con `unshift`. El docente usa `push` porque su chat va del más viejo al más nuevo.
- Migraciones SQL: `CREATE TABLE` y `ALTER PUBLICATION ... ADD TABLE` en mayúscula, columnas en minúscula, 4 espacios, `id bigint primary key generated always as identity`, `references auth.users (id)`, `created_at timestamptz default now()`. Sin RLS, policies, triggers ni funciones. El docente escribe `create table` en minúscula en el chat; las de DevChat siguen en mayúscula, como su tabla de perfiles.
