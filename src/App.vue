<script>
import { CircleFadingPlus, House, MessagesSquare, User } from '@lucide/vue';
import { logout, subscribeToAuthChanges } from './services/auth.js';

export default {
    name: 'App',
    components: { CircleFadingPlus, House, MessagesSquare, User },
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
            class="flex flex-wrap items-center justify-between gap-4 p-4 bg-steel-blue-700 text-white md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8"
        >
            <RouterLink
                class="flex items-center gap-2 w-fit text-xl font-bold"
                to="/"
                @click="closeMenu"
            >
                <MessagesSquare class="size-7" aria-hidden="true" />
                DevChat
            </RouterLink>
            <button
                type="button"
                class="md:hidden"
                aria-controls="main-menu"
                :aria-expanded="menuOpen"
                @click="toggleMenu"
            >
                Menú
            </button>
            <div
                id="main-menu"
                :class="menuOpen ? 'flex' : 'hidden'"
                class="w-full flex-col gap-4 md:contents"
            >
                <ul class="flex items-center gap-2">
                    <li>
                        <RouterLink
                            class="nav-icon"
                            exact-active-class="nav-icon-active"
                            to="/"
                            title="Inicio"
                            @click="closeMenu"
                        >
                            <House class="size-6" aria-hidden="true" />
                            <span class="sr-only">Inicio</span>
                        </RouterLink>
                    </li>
                    <template v-if="user.id !== null">
                        <li>
                            <RouterLink
                                class="nav-icon"
                                active-class="nav-icon-active"
                                to="/publicar"
                                title="Publicar"
                                @click="closeMenu"
                            >
                                <CircleFadingPlus class="size-6" aria-hidden="true" />
                                <span class="sr-only">Publicar</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="nav-icon"
                                :class="$route.path.startsWith('/cuenta') ? 'nav-icon-active' : ''"
                                to="/cuenta"
                                title="Cuenta"
                                @click="closeMenu"
                            >
                                <User class="size-6" aria-hidden="true" />
                                <span class="sr-only">Cuenta</span>
                            </RouterLink>
                        </li>
                    </template>
                </ul>

                <ul
                    class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 md:justify-self-end"
                >
                    <template v-if="user.id === null">
                        <li>
                            <RouterLink
                                class="nav-link"
                                active-class="nav-link-active"
                                to="/acceso"
                                @click="closeMenu"
                            >
                                Ingresar
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink class="nav-register" to="/registro" @click="closeMenu">
                                Registrate
                            </RouterLink>
                        </li>
                    </template>
                    <li v-else>
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit" class="nav-register cursor-pointer">
                                Cerrar sesión
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-jet-black-900 text-white">
        <p>DevChat &copy; 2026</p>
    </footer>
</template>
