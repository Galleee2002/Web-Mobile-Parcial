<script>
import PageTitle from '../components/PageTitle.vue';
import { subscribeToAuthChanges } from '../services/auth.js';

export default {
    name: 'Account',
    components: { PageTitle },
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
    <div class="flex items-end gap-4">
        <PageTitle>Mi cuenta</PageTitle>
        <RouterLink to="/cuenta/editar" class="mb-4 text-steel-blue-700 underline">
            Editar
        </RouterLink>
    </div>

    <dl class="mb-4">
        <dt class="m-0.5 font-bold">Nombre</dt>
        <dd class="ms-4 mb-2">{{ user.display_name || 'Sin especificar...' }}</dd>
        <dt class="m-0.5 font-bold">Biografía</dt>
        <dd class="ms-4 mb-2 italic">{{ user.bio || 'Sin especificar...' }}</dd>
        <dt class="m-0.5 font-bold">Email</dt>
        <dd class="ms-4 mb-2">{{ user.email }}</dd>
    </dl>
</template>
