<script>
import { logout, subscribeToAuthChanges } from './services/auth.js';

export default {
    name: 'App',
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            menuOpen: false,
        };
    },
    methods: {
        async handleLogout() {
            try {
                await logout();
                this.closeMenu();
                this.$router.push('/acceso');
            } catch (error) {
                throw error;
            }
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        closeMenu() {
            this.menuOpen = false;
        },
    },
    mounted() {
        subscribeToAuthChanges((newUserData) => (this.user = newUserData));
    },
};
</script>

<template>
    <header>
        <nav
            class="flex flex-wrap items-center justify-between gap-4 p-4 bg-steel-blue-700 text-white md:justify-start md:gap-8"
        >
            <RouterLink class="text-xl" to="/" @click="closeMenu">DevChat</RouterLink>
            <button
                type="button"
                class="md:hidden"
                aria-controls="main-menu"
                :aria-expanded="menuOpen"
                @click="toggleMenu"
            >
                Menú
            </button>
            <ul
                id="main-menu"
                :class="menuOpen ? 'flex' : 'hidden'"
                class="w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:gap-4 md:items-center"
            >
                <li>
                    <RouterLink to="/" @click="closeMenu">Inicio</RouterLink>
                </li>

                <template v-if="user.id === null">
                    <li>
                        <RouterLink to="/acceso" @click="closeMenu">Ingresar</RouterLink>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink to="/publicar" @click="closeMenu">Publicar</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/cuenta" @click="closeMenu">Cuenta</RouterLink>
                    </li>
                    <li>
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit">{{ user.email }} (Cerrar sesión)</button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-jet-black-900 text-white">
        <p>DevChat &copy; 2026</p>
    </footer>
</template>
