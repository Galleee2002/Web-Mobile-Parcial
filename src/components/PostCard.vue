<script>
import { Clock, User } from '@lucide/vue';

export default {
    name: 'PostCard',
    components: { Clock, User },
    props: {
        post: {
            type: Object,
            required: true,
            default: null,
        },
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleString('es-AR');
        },
    },
};
</script>

<template>
    <li class="flex gap-4 p-5 bg-white rounded-xl border border-iron-grey-100 shadow-sm">
        <div class="grid place-items-center size-10 shrink-0 rounded-full bg-steel-blue-100">
            <User class="size-5 text-steel-blue-600" aria-hidden="true" />
        </div>
        <div class="min-w-0">
            <div class="mb-1 wrap-break-word">
                <RouterLink
                    class="font-bold text-steel-blue-700 hover:underline"
                    :to="'/usuarios/' + post.user_id"
                >
                    {{ post.email }}
                </RouterLink>
                publicó:
            </div>
            <div class="mb-2 wrap-break-word">{{ post.body }}</div>
            <time
                class="flex items-center gap-2 text-sm text-iron-grey-600"
                :datetime="post.created_at"
            >
                <Clock class="size-4 shrink-0" aria-hidden="true" />
                {{ formatDate(post.created_at) }}
            </time>
        </div>
    </li>
</template>
