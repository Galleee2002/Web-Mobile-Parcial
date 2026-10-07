<script>
import PageTitle from '../components/PageTitle.vue';
import { login } from '../services/auth.js';

export default {
    name: 'Login',
    components: { PageTitle },
    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;

                await login({
                    email: this.credentials.email,
                    password: this.credentials.password,
                });

                this.$router.push('/');
            } catch (error) {
                console.error('[Login.vue handleSubmit] No se pudo ingresar: ', error);
            }
            this.loading = false;
        },
    },
};
</script>

<template>
    <PageTitle>Acceso</PageTitle>

    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="email" class="block mb-2">Email</label>
            <input
                type="email"
                id="email"
                class="w-full p-2 border border-iron-grey-400 rounded"
                v-model="credentials.email"
            />
        </div>
        <div class="mb-3">
            <label for="password" class="block mb-2">Contraseña</label>
            <input
                type="password"
                id="password"
                class="w-full p-2 border border-iron-grey-400 rounded"
                v-model="credentials.password"
            />
        </div>
        <button
            type="submit"
            class="transition px-4 py-2 rounded bg-steel-blue-700 text-white hover:bg-steel-blue-600 focus:bg-steel-blue-600 active:bg-steel-blue-800"
        >
            Entrar
        </button>
    </form>
</template>
