<script>
import PageTitle from '../components/PageTitle.vue';
import PostCard from '../components/PostCard.vue';
import { getAllPosts, subscribeToNewPosts } from '../services/posts.js';

let unsubscribeFromPosts = () => {};

export default {
    name: 'Home',
    components: { PageTitle, PostCard },
    data() {
        return {
            posts: [],
            loading: true,
        };
    },
    async mounted() {
        try {
            this.posts = await getAllPosts();
        } catch (error) {
            console.error('[Home.vue mounted] No se pudieron traer las publicaciones: ', error);
        } finally {
            this.loading = false;
        }

        unsubscribeFromPosts = subscribeToNewPosts((newPost) => this.posts.unshift(newPost));
    },
    unmounted() {
        unsubscribeFromPosts();
    },
};
</script>

<template>
    <PageTitle>Inicio</PageTitle>

    <section>
        <h2 class="sr-only">Publicaciones</h2>

        <ol v-if="!loading" class="flex flex-col gap-4">
            <PostCard v-for="post in posts" :post="post" />
        </ol>
        <div v-else>Cargando...</div>
    </section>
</template>
