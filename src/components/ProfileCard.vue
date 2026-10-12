<script>
import { FileText, Mail, User } from '@lucide/vue';

export default {
    name: 'ProfileCard',
    components: { FileText, Mail, User },
    props: {
        profile: {
            type: Object,
            required: true,
            default: null,
        },
    },
};
</script>

<template>
    <article class="p-6 bg-white rounded-xl border border-iron-grey-100 shadow-sm">
        <div
            class="flex flex-col gap-4 pb-6 border-b border-iron-grey-100 sm:flex-row sm:items-center"
        >
            <div class="grid place-items-center size-24 shrink-0 rounded-full bg-iron-grey-100">
                <User class="size-12 text-iron-grey-500" aria-hidden="true" />
            </div>
            <div class="min-w-0">
                <h2 class="text-2xl font-bold text-steel-blue-900 wrap-break-word">
                    {{ profile.display_name || profile.email }}
                </h2>
                <p class="text-iron-grey-600 wrap-break-word">{{ profile.email }}</p>
            </div>
            <div class="sm:ms-auto">
                <slot />
            </div>
        </div>

        <dl class="divide-y divide-iron-grey-100">
            <div class="flex gap-4 py-4">
                <div class="grid place-items-center size-10 shrink-0 rounded-lg bg-steel-blue-50">
                    <User class="size-5 text-steel-blue-700" aria-hidden="true" />
                </div>
                <div class="min-w-0 grow">
                    <dt class="text-sm font-semibold text-iron-grey-600">Nombre</dt>
                    <dd class="wrap-break-word">
                        {{ profile.display_name || 'Sin especificar...' }}
                    </dd>
                </div>
            </div>
            <div class="flex gap-4 py-4">
                <div class="grid place-items-center size-10 shrink-0 rounded-lg bg-steel-blue-50">
                    <FileText class="size-5 text-steel-blue-700" aria-hidden="true" />
                </div>
                <div class="min-w-0 grow">
                    <dt class="text-sm font-semibold text-iron-grey-600">Biografía</dt>
                    <dd class="mt-1 p-3 rounded-lg bg-iron-grey-50 italic wrap-break-word">
                        {{ profile.bio || 'Sin especificar...' }}
                    </dd>
                </div>
            </div>
            <div class="flex gap-4 pt-4">
                <div class="grid place-items-center size-10 shrink-0 rounded-lg bg-steel-blue-50">
                    <Mail class="size-5 text-steel-blue-700" aria-hidden="true" />
                </div>
                <div class="min-w-0 grow">
                    <dt class="text-sm font-semibold text-iron-grey-600">Email</dt>
                    <dd class="wrap-break-word">{{ profile.email }}</dd>
                </div>
            </div>
        </dl>
    </article>
</template>
