<script>
import { logout, subscribeToAuthChanges } from './services/auth.js';

export default {
    name: 'App',
    data() {
        return {
            // Datos del usuario autenticado.
            user: {
                id: null,
                email: null,
            },
        };
    },
    methods: {
        async handleLogout() {
            try {
                await logout();
                this.$router.push('/acceso');
            } catch (error) {
                throw error;
            }
        },
    },
    mounted() {
        subscribeToAuthChanges((newUserData) => (this.user = newUserData));
    },
};
</script>

<template>
    <nav class="flex gap-8 items-center h-15 p-4 bg-steel-blue-700 text-white">
        <RouterLink class="text-xl" to="/">DevChat</RouterLink>
        <ul class="flex gap-4 items-center">
            <li>
                <RouterLink to="/">Inicio</RouterLink>
            </li>

            <template v-if="user.id === null">
                <li>
                    <RouterLink to="/acceso">Ingresar</RouterLink>
                </li>
            </template>
            <template v-else>
                <li>
                    <RouterLink to="/publicar">Publicar</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cuenta">Cuenta</RouterLink>
                </li>
                <li>
                    <form action="#" @submit.prevent="handleLogout">
                        <button type="submit">{{ user.email }} (Cerrar sesión)</button>
                    </form>
                </li>
            </template>
        </ul>
    </nav>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-jet-black-900 text-white">
        <p>DevChat &copy; 2026</p>
    </footer>
</template>
