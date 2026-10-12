<script>
import PageTitle from '../components/PageTitle.vue';
import PostCard from '../components/PostCard.vue';
import ProfileCard from '../components/ProfileCard.vue';
import { getProfileById } from '../services/profiles.js';
import { getPostsByUser } from '../services/posts.js';

export default {
    name: 'UserProfile',
    components: { PageTitle, PostCard, ProfileCard },
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
        <PageTitle class="pt-4 mb-6">Perfil de {{ profile.email }}</PageTitle>

        <ProfileCard :profile="profile" class="mb-8" />

        <section>
            <h2 class="mb-3 text-xl">Publicaciones</h2>

            <p v-if="posts.length === 0">Este usuario todavía no publicó nada.</p>
            <ol v-else class="flex flex-col gap-4">
                <PostCard v-for="post in posts" :post="post" />
            </ol>
        </section>
    </template>
    <div v-else>Cargando...</div>
</template>
