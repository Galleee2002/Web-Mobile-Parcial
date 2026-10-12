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
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;

                await createPost({
                    user_id: this.user.id,
                    email: this.user.email,
                    body: this.newPost.body,
                });

                this.$router.push('/');
            } catch (error) {
                console.error('[NewPost.vue handleSubmit] No se pudo publicar: ', error);
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
    <PageTitle>Publicar</PageTitle>

    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="body" class="block mb-2">¿En qué estás trabajando?</label>
            <textarea
                id="body"
                class="w-full p-2 border border-iron-grey-400 rounded"
                v-model="newPost.body"
                required
            ></textarea>
        </div>
        <button
            type="submit"
            class="transition px-4 py-2 rounded bg-steel-blue-700 text-white hover:bg-steel-blue-600 focus:bg-steel-blue-600 active:bg-steel-blue-800"
        >
            Publicar
        </button>
    </form>
</template>
