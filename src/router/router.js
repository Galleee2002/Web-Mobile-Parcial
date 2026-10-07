import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/sala', component: Chat },
    { path: '/acceso', component: Login },
    { path: '/registro', component: Register },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
