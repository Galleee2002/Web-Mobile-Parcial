<script>
import { Lock, Mail, Users } from '@lucide/vue';
import PageTitle from '../components/PageTitle.vue';
import { register } from '../services/auth.js';

export default {
    name: 'Register',
    components: { Lock, Mail, PageTitle, Users },
    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
            loading: false,
            errorMessage: null,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;
                this.errorMessage = null;

                await register({
                    email: this.credentials.email,
                    password: this.credentials.password,
                });

                this.$router.push('/');
            } catch (error) {
                console.error('[Register.vue handleSubmit] No se pudo crear la cuenta: ', error);
                this.errorMessage =
                    'No se pudo crear la cuenta. Revisá el email y que la contraseña tenga al menos 6 caracteres.';
            }
            this.loading = false;
        },
    },
};
</script>

<template>
    <div class="max-w-md mx-auto my-8">
        <section class="p-8 bg-white rounded-2xl border border-iron-grey-100 shadow-lg">
            <div class="text-center">
                <Users class="size-14 mx-auto mb-2 text-steel-blue-700" aria-hidden="true" />
                <PageTitle>Registro</PageTitle>
            </div>

            <form action="#" @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="email" class="block mb-2 font-semibold text-steel-blue-900">
                        Email
                    </label>
                    <div class="relative">
                        <Mail
                            class="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-iron-grey-600"
                            aria-hidden="true"
                        />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            class="w-full py-3 pr-3 pl-11 border border-iron-grey-600 rounded-lg bg-iron-grey-50"
                            v-model="credentials.email"
                            autocomplete="email"
                            required
                        />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 font-semibold text-steel-blue-900">
                        Contraseña
                    </label>
                    <div class="relative">
                        <Lock
                            class="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-iron-grey-600"
                            aria-hidden="true"
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            class="w-full py-3 pr-3 pl-11 border border-iron-grey-600 rounded-lg bg-iron-grey-50"
                            v-model="credentials.password"
                            autocomplete="new-password"
                            required
                        />
                    </div>
                </div>
                <p
                    v-if="errorMessage !== null"
                    role="alert"
                    class="mb-4 p-2 rounded-lg bg-red-50 text-red-700"
                >
                    {{ errorMessage }}
                </p>
                <button
                    type="submit"
                    class="w-full py-3 rounded-lg bg-steel-blue-800 font-semibold text-white hover:bg-steel-blue-700 cursor-pointer"
                >
                    Registrarme
                </button>
            </form>

            <p class="mt-6 text-center">
                ¿Ya tenés cuenta?
                <RouterLink to="/acceso" class="font-semibold text-steel-blue-700 underline">
                    Ingresá
                </RouterLink>
            </p>
        </section>
    </div>
</template>
