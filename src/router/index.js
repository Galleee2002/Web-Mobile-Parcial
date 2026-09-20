import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Chat from '../pages/Chat.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/sala', component: Chat },
    { path: '/acceso', component: Login },
    { path: '/registro', component: Register },
  ],
})

export default router
