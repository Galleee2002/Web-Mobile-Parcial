<script>
import PageTitle from '../components/PageTitle.vue';
import PostCard from '../components/PostCard.vue';
import { getProfileById } from '../services/profiles.js';
import { getPostsByUser } from '../services/posts.js';

export default {
    name: 'UserProfile',
    components: { PageTitle, PostCard },
    data() {
        return {
            profile: {
                id: null,
                email: null,
                display_name: null,
                bio: null,
            },
            posts: [],
            loading: true,
        };
    },
    async mounted() {
        try {
            this.profile = await getProfileById(this.$route.params.id);
            this.posts = await getPostsByUser(this.$route.params.id);
        } catch (error) {
            console.error('[UserProfile.vue mounted] No se pudo traer el perfil: ', error);
        } finally {
            this.loading = false;
        }
    },
};
</script>

<template>
    <template v-if="!loading">
        <PageTitle>Perfil de {{ profile.email }}</PageTitle>

        <div class="p-4 mb-4 italic">{{ profile.bio || 'Sin especificar...' }}</div>

        <dl class="mb-4">
            <dt class="m-0.5 font-bold">Email</dt>
            <dd class="ms-4 mb-2">{{ profile.email }}</dd>
            <dt class="m-0.5 font-bold">Nombre</dt>
            <dd class="ms-4 mb-2">{{ profile.display_name || 'Sin especificar...' }}</dd>
        </dl>

        <section>
            <h2 class="mb-3 text-xl">Publicaciones</h2>

            <ol class="flex flex-col gap-4">
                <PostCard v-for="post in posts" :post="post" />
            </ol>
        </section>
    </template>
    <div v-else>Cargando...</div>
</template>
