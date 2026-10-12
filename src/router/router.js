import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuthChanges } from '../services/auth.js';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import NewPost from '../pages/NewPost.vue';
import Account from '../pages/Account.vue';
import EditAccount from '../pages/EditAccount.vue';
import UserProfile from '../pages/UserProfile.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/acceso', component: Login },
    { path: '/registro', component: Register },
    { path: '/publicar', component: NewPost, meta: { requiresAuth: true } },
    { path: '/cuenta', component: Account, meta: { requiresAuth: true } },
    { path: '/cuenta/editar', component: EditAccount, meta: { requiresAuth: true } },
    { path: '/usuarios/:id', component: UserProfile },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null,
};
subscribeToAuthChanges((newUserData) => (user = newUserData));

router.beforeEach((to, from) => {
    if (to.meta?.requiresAuth && user.id === null) {
        return '/acceso';
    }
});

export default router;
