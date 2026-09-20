# Roadmap — parcial red social

Referencia del docente: `Clientes-Web-Mobile/` (gitignored).
Misma idea, otra identidad visual y otras rutas. Options API. `.env` más adelante.

## Hecho

- [x] Vue 3 + Vite + Vue Router + Tailwind v4 + Supabase JS
- [x] Cliente Supabase en `src/lib/supabaseClient.js`
- [x] Paleta en `src/style.css` (`@theme static`: steel-blue, frozen-water, jet-black, iron-grey, soft-cyan)
- [x] CSS importado en `src/main.js`
- [x] Layout en `App.vue` (shell propio + `<RouterView />`) — nav + main + footer
- [x] Páginas placeholder en `src/pages/` equivalentes a Home, Chat, Login, Register
- [x] Rutas en `src/router/index.js` (`/`, `/sala`, `/acceso`, `/registro`)

## Falta (alineado al docente)

- [ ] Componente de título reutilizable (el docente tiene `BaseH1`)
- [ ] Chat público: UI + servicio + realtime (`public_chat_messages`)
- [ ] Auth (login / registro reales)
- [ ] `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`)
