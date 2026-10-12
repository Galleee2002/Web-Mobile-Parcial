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
| `/cuenta` | `Account.vue` ver el perfil propio | sí |
| `/cuenta/editar` | `EditAccount.vue` | sí |
| `/usuarios/:id` | `UserProfile.vue` | no |

Rutas con sesión: `meta: { requiresAuth: true, }` y `beforeEach` hace `if (to.meta?.requiresAuth && user.id === null) return '/acceso'`.

`/acceso` y `/registro` siguen siendo dos páginas (una hace `login`, la otra `register`), pero el nav sin sesión muestra solo "Ingresar". Al registro se llega con el link "¿No tenés cuenta? Registrate" de `Login.vue`, y `Register.vue` tiene "¿Ya tenés cuenta? Ingresá". El docente, en el nav, muestra los dos links.

Después de ingresar o registrarse, `this.$router.push('/')`. El docente manda al chat.

`/usuarios/:id` usa `this.$route.params.id`. Eso ya está visto: el docente tiene `/usuario/:id`. En su proyecto esa ruta pide sesión, porque el listado (el chat) también pide sesión. Acá el feed es público, así que el perfil de otro usuario no lleva `requiresAuth`.

`/cuenta` y `/cuenta/editar` siguen el par `MyProfile` + `EditProfile`. La consigna pide administrar los datos del perfil propio (el ejemplo es "nombre o password"). El docente no cambia el password: edita bio, nombre y carrera. Acá se editan `display_name` y `bio`.

## Componentes

- `PageTitle.vue`: título de cada página (slot + clase `.page-title`). El docente lo llama `BaseH1` y la clase es `.h1`.
- `PostCard.vue`: una publicación (autor, texto, fecha). Se usa en el feed y en el perfil. La raíz es un `<li>`. El autor es un `RouterLink` con `:to="'/usuarios/' + post.user_id"` (concatenación, como en el chat del docente). El `v-for` no lleva `:key`. La fecha se muestra con un método `formatDate(date)` que hace `new Date(date).toLocaleString('es-AR')`, adentro de `<time :datetime="post.created_at">` (**no visto en clase**, decidido con el usuario: el docente imprime `created_at` crudo, en formato ISO y hora UTC). `toLocaleString` la pasa a la hora local del navegador.
- El formulario de publicar vive en `NewPost.vue`, igual que el del chat vive en la página. No hay `PostForm.vue`.
- No se arman `BaseLoader` ni `LoadingContext`. La carga es el texto "Cargando..." del chat.

## Datos

- `profiles`: `id uuid` (PK, FK a `auth.users`), `email text`, `display_name text`, `bio text`, `created_at`.
- `posts`: `id bigint identity`, `user_id uuid` (FK a `auth.users`), `email text`, `body text`, `created_at`. En `supabase_realtime`. Guarda el `email` del autor, así el feed lo muestra sin consultar otra tabla. Decisión: el feed y las publicaciones muestran el email; `display_name` y `bio` solo se ven en el perfil (`/usuarios/:id` y `/cuenta`).
- Sin RLS, policies ni triggers.
- Permisos: `20261011204000_grant_profiles_and_posts.sql` da `SELECT`, `INSERT` y `UPDATE` sobre `profiles`, y `SELECT` e `INSERT` sobre `posts`, a `anon` y `authenticated`. **No visto en clase**: desde mayo de 2026 Supabase en la nube no da esos permisos solo a las tablas nuevas. El deploy local del docente sí los da (`auto_expose_new_tables` en su `config.toml`), por eso sus migraciones no tienen `GRANT`. `posts` no lleva `UPDATE` ni `DELETE` porque las publicaciones no se editan ni se borran. `anon` va en las dos porque el feed y el perfil de otro usuario son públicos.

## Servicios

- `supabase.js`: `createClient` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` del `.env`.
- `profiles.js`: `getProfileById(id)`, `createProfile({ id, email })`, `updateProfile(id, { display_name, bio })`. `getProfileById` ya está. `updateProfile` es el `.update(data).eq('id', id)` que el docente usa en `updateUserProfile`.
- `auth.js`: `register({ email, password })` (después del `signUp` llama a `createProfile`), `login({ email, password })`, `logout()`, `updateAuthProfile({ display_name, bio })` (actualiza, cambia `userData` y llama a `notifyAll()`), `subscribeToAuthChanges(callback)` con `{ id, email, display_name, bio }`. El docente llama a la de editar `updateAuthUserProfile`.
- `posts.js`: `getAllPosts()`, `getPostsByUser(userId)`, `createPost({ user_id, email, body })`, `subscribeToNewPosts(callback)`. `getPostsByUser` filtra con `.eq('user_id', userId)`. Las dos consultas hacen `.select().order('created_at', { ascending: false })`, para que se vea primero la publicación más nueva. `.order()` es **no visto en clase**: el docente usa `.select()` solo.

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
- [x] `profiles.js` (`getProfileById`, `createProfile`) + `auth.js` (observer, `register`, `login`, `logout`) + `Login.vue` y `Register.vue` reales. `register` crea el perfil después del `signUp` (el docente ahora también lo hace). En `onAuthStateChange` se agrega `if (profile !== undefined)` porque justo después del registro el perfil todavía no existe
- [x] Nav sin sesión con un solo link "Ingresar"; `Login.vue` y `Register.vue` enlazados entre sí con `RouterLink`
- [x] Auditoría contra `proyecto-docente/` después de la clase de perfiles. Servicios, formularios, observer, migraciones y `PageTitle` siguen la sintaxis de clase. Las diferencias a propósito quedaron en `AGENTS.md`. Ruta con `:id`, `.update()`, perfil en dos páginas y el `let` de la desuscripción pasan a estar vistos
- [x] `App.vue` con nav según sesión y cerrar sesión (`logout()` y `this.$router.push('/acceso')`)
- [x] Router: rutas de la tabla + guard; se borraron `Chat.vue` y `/sala`. `NewPost`, `Account`, `EditAccount` y `UserProfile` existen como páginas vacías (`PageTitle` + un párrafo)

## Falta

- [x] Migración `20261011204000_grant_profiles_and_posts.sql` creada (ver Datos)
- [x] Aplicar la migración de permisos con `pnpm exec supabase db push` y volver a correr la consulta de `information_schema.role_table_grants`: tienen que aparecer `SELECT`, `INSERT` y `UPDATE`. Después, probar un registro nuevo y ver que se guarda la fila en `profiles`. Va antes del feed
- [x] `posts.js` + `PostCard.vue` + feed en `Home.vue` con realtime. El `let` de `unsubscribe` va afuera del componente. El feed usa `getAllPosts` y `subscribeToNewPosts`; el prop de `PostCard` lleva `type`, `required` y `default: null`, como `LoadingContext`
- [x] `NewPost.vue` con el formulario en la página. Ahí se crea `createPost` en `posts.js`. Al publicar, `this.$router.push('/')`. El `textarea` lleva el atributo `required` (**no visto en clase**: el docente no valida formularios). El botón no se deshabilita mientras guarda, como en el docente
- [x] `UserProfile.vue`: `this.$route.params.id`, `getProfileById` y `getPostsByUser`. Sin `requiresAuth` ni realtime
- [x] `Account.vue` (ver) y `EditAccount.vue` (editar `display_name` y `bio`). Ahí se crean `updateProfile` y `updateAuthProfile`. `.update()` ya está visto
- [x] Mostrar errores en `Login.vue` y `Register.vue` (**no visto en clase**: el docente deja el `catch` vacío). Se guarda `errorMessage` en `data()`, el `catch` le pone un texto fijo en castellano (no el `error.message` de Supabase, que viene en inglés) y el template lo muestra con `<p v-if="errorMessage !== null" role="alert">`. `EditAccount.vue` hace lo mismo y además muestra "Cambios guardados." con `successMessage`. `role="alert"` es para que el lector de pantalla lea el mensaje apenas aparece
- [ ] Pasada de accesibilidad y responsive (el JSDoc ya está, ver "Recordatorio: JSDoc"). El nav con sesión (email + "Cerrar sesión") ya ocupa todo el ancho cerca de 545px: en celular hay que acomodarlo

Notas de la prueba en el navegador:

- `permission denied` es un error de permisos de Postgres (GRANT): los roles `anon` y `authenticated` no podían leer ni escribir `profiles`. No es RLS, que da otro mensaje. El `signUp` creó el usuario en Auth, pero el perfil no se guardó. La consulta a `information_schema.role_table_grants` mostró solo `TRUNCATE`, `TRIGGER` y `REFERENCES` en las dos tablas. Lo resuelve la migración de permisos.
- Quedó la cuenta de prueba `prueba.agente@devchat.dev` en Auth, sin fila en `profiles`. Se borra desde el dashboard: `UserProfile.vue` no contempla un perfil que no existe (el docente tampoco).
- Si recargás el navegador en una ruta con sesión (por ejemplo `/cuenta`), te lleva a `/acceso`: el guard corre antes de que Supabase avise que hay sesión. El proyecto del docente hace lo mismo.
- ESLint marca `vue/multi-word-component-names` en `Home`, `Login`, `Register` y `Account`. Son los nombres de una palabra que usa el docente. También marca `vue/valid-v-for` en `Home.vue` y `UserProfile.vue`, porque el `v-for` con `PostCard` no lleva `:key` (como el docente). oxlint marca `no-useless-catch` en `App.vue` y en `updateAuthProfile` de `auth.js`: el `catch` solo relanza el error, como en `updateAuthUserProfile` del docente.

## Consigna, página por página

| Pide la consigna | Dónde queda |
|---|---|
| SPA con Vite, Vue SFC, Tailwind y Supabase (Postgres, Realtime, Auth) en la nube | Hecho. Realtime entra con el feed |
| Registro e ingreso | `Register.vue`, `Login.vue` |
| Listado de las publicaciones de todos | `Home.vue` |
| Crear publicaciones | `NewPost.vue`, con sesión |
| Perfil de cada usuario, con sus publicaciones | `UserProfile.vue`, link desde `PostCard` |
| El perfil propio administra sus datos | `Account.vue` y `EditAccount.vue` |
| HTML semántico, accesibilidad, usabilidad, JSDoc, nombres, archivos | Pasada final. El listado usa `section`, `ol` y `li`; el perfil usa `dl`, `dt` y `dd` |

## Entrega

Zip/rar `apellido-nombre` con el proyecto completo (incluida `supabase/migrations/`) y `datos.txt` (carrera, materia, cuatrimestre, año, turno, comisión, apellido y nombre, docente, 1er parcial). Como se usa la nube no va el deploy local, pero el proyecto de Supabase no puede estar pausado al momento de la corrección.

## Recordatorio: JSDoc

- [x] JSDoc de vuelta en `posts.js`, `profiles.js` y `auth.js`, como el docente: primera línea vacía (` *`), `@param {tipo} nombre` y `@returns {tipo}` solo cuando la función devuelve algo. Si la función desestructura (`{ email, password }`), el parámetro se documenta igual como `data` con el tipo del objeto entero. `subscribeToNewPosts` lleva `@returns {() => void} Función para cancelar la suscripción.`. `logout` y `notifyAll` no llevan JSDoc, igual que en el docente. `supabase.js` tampoco, porque no tiene funciones.
