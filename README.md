# Web-Mobile-Parcial

This template should help get you started developing with Vue 3 in Vite.

## Supabase — pendiente

Ya listo: Vue + Vite, `@supabase/supabase-js`, `src/lib/supabaseClient.js`.

Falta:

1. Crear proyecto en [database.new](https://database.new) y ejecutar el SQL de la tabla `instruments` (con RLS y policy de lectura para `anon`).
2. Rellenar `.env.local` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Actualizar `src/App.vue` para fetch + listar `instruments` con `onMounted`.
4. Correr `pnpm dev` y abrir http://localhost:5173.

Ref: [Quickstart Vue](https://supabase.com/docs/guides/getting-started/quickstarts/vue.md)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
