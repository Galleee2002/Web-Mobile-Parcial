<script>
import PageTitle from '../components/PageTitle.vue';
import { subscribeToAuthChanges } from '../services/auth.js';
import { createPost } from '../services/posts.js';

export default {
    name: 'NewPost',
    components: { PageTitle },
    data() {
        return {
            newPost: {
                body: '',
            },
            user: {
                id: null,
                email: null,
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

                await createPost({
                    user_id: this.user.id,
                    email: this.user.email,
                    body: this.newPost.body,
                });

                this.$router.push('/');
            } catch (error) {
                console.error('[NewPost.vue handleSubmit] No se pudo publicar: ', error);
                this.errorMessage = 'No se pudo publicar. Probá de nuevo.';
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        subscribeToAuthChanges((newUserData) => (this.user = newUserData));
    },
};
</script>

<template>
    <div class="max-w-2xl mx-auto">
        <section class="p-6 bg-white rounded-xl border border-iron-grey-100 shadow-sm">
            <PageTitle>Publicar</PageTitle>
            <p class="mb-6 text-iron-grey-600">
                Compartí una actualización, una idea o un avance de tu proyecto.
            </p>

            <form action="#" @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="body" class="block mb-2 font-semibold text-steel-blue-900">
                        ¿En qué estás trabajando?
                    </label>
                    <textarea
                        id="body"
                        rows="5"
                        placeholder="Escribí tu publicación acá..."
                        class="w-full p-3 border border-iron-grey-600 rounded-lg resize-y"
                        v-model="newPost.body"
                        required
                    ></textarea>
                </div>
                <p
                    v-if="errorMessage !== null"
                    role="alert"
                    class="mb-4 p-2 rounded-lg bg-red-50 text-red-700"
                >
                    {{ errorMessage }}
                </p>
                <div class="flex items-center justify-between gap-4">
                    <RouterLink
                        to="/"
                        class="px-4 py-2 rounded-lg font-semibold text-iron-grey-600 hover:bg-iron-grey-50 hover:text-steel-blue-900"
                    >
                        Cancelar
                    </RouterLink>
                    <button
                        type="submit"
                        class="px-6 py-2 rounded-lg bg-steel-blue-700 font-semibold text-white hover:bg-steel-blue-800"
                    >
                        Publicar
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>
