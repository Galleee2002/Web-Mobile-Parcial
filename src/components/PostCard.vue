<script>
export default {
    name: 'PostCard',
    props: {
        post: {
            type: Object,
            required: true,
            default: null,
        },
    },
};
</script>

<template>
    <li class="p-4 rounded bg-frozen-water-100">
        <div class="font-bold mb-1">
            <RouterLink class="text-steel-blue-700 underline" :to="'/usuarios/' + post.user_id">
                {{ post.email }}
            </RouterLink>
            publicó:
        </div>
        <div class="mb-1">{{ post.body }}</div>
        <div class="text-sm text-iron-grey-700">{{ post.created_at }}</div>
    </li>
</template>
