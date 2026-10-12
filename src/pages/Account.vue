<script>
import { Pencil } from '@lucide/vue';
import PageTitle from '../components/PageTitle.vue';
import ProfileCard from '../components/ProfileCard.vue';
import { subscribeToAuthChanges } from '../services/auth.js';

export default {
    name: 'Account',
    components: { PageTitle, Pencil, ProfileCard },
    data() {
        return {
            user: {
                id: null,
                email: null,
                display_name: null,
                bio: null,
            },
        };
    },
    mounted() {
        subscribeToAuthChanges((newUserData) => (this.user = newUserData));
    },
};
</script>

<template>
    <div class="mb-6 text-center">
        <PageTitle>Mi cuenta</PageTitle>
        <div class="w-20 h-1 mx-auto rounded-full bg-steel-blue-400" aria-hidden="true"></div>
    </div>

    <div class="max-w-2xl mx-auto">
        <ProfileCard :profile="user">
            <RouterLink
                to="/cuenta/editar"
                class="flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-steel-blue-700 font-semibold text-white hover:bg-steel-blue-800"
            >
                <Pencil class="size-5" aria-hidden="true" />
                Editar perfil
            </RouterLink>
        </ProfileCard>
    </div>
</template>
