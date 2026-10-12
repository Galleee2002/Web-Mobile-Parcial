<script>
import PageTitle from '../components/PageTitle.vue';
import { subscribeToAuthChanges, updateAuthProfile } from '../services/auth.js';

export default {
    name: 'EditAccount',
    components: { PageTitle },
    data() {
        return {
            profile: {
                display_name: '',
                bio: '',
            },
            loading: false,
            successMessage: null,
            errorMessage: null,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;
                this.successMessage = null;
                this.errorMessage = null;

                await updateAuthProfile({ ...this.profile });

                this.successMessage = 'Cambios guardados.';
            } catch (error) {
                console.error(
                    '[EditAccount.vue handleSubmit] No se pudieron guardar los cambios: ',
                    error,
                );
                this.errorMessage = 'No se pudieron guardar los cambios.';
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        subscribeToAuthChanges((newUserData) => {
            this.profile = {
                display_name: newUserData.display_name,
                bio: newUserData.bio,
            };
        });
    },
};
</script>

<template>
    <PageTitle>Editar cuenta</PageTitle>

    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="display_name" class="block mb-2">Nombre</label>
            <input
                type="text"
                id="display_name"
                class="w-full p-2 border border-iron-grey-600 rounded"
                v-model="profile.display_name"
            />
        </div>
        <div class="mb-3">
            <label for="bio" class="block mb-2">Bio</label>
            <textarea
                id="bio"
                class="w-full p-2 border border-iron-grey-600 rounded"
                v-model="profile.bio"
            ></textarea>
        </div>
        <p
            v-if="successMessage !== null"
            role="alert"
            class="mb-3 p-2 rounded bg-green-50 text-green-700"
        >
            {{ successMessage }}
        </p>
        <p
            v-if="errorMessage !== null"
            role="alert"
            class="mb-3 p-2 rounded bg-red-50 text-red-700"
        >
            {{ errorMessage }}
        </p>
        <button
            type="submit"
            class="transition px-4 py-2 rounded bg-steel-blue-700 text-white hover:bg-steel-blue-600 focus:bg-steel-blue-600 active:bg-steel-blue-800"
        >
            Guardar cambios
        </button>
    </form>
</template>
