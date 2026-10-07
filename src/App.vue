<script>
export default {
    name: 'App',
};
</script>

<template>
    <nav class="flex gap-8 items-center h-15 p-4 bg-steel-blue-700 text-white">
        <RouterLink class="text-xl" to="/">DevChat</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Inicio</RouterLink>
            </li>
            <li>
                <RouterLink to="/sala">Sala</RouterLink>
            </li>
            <li>
                <RouterLink to="/acceso">Ingresar</RouterLink>
            </li>
        </ul>
    </nav>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-jet-black-900 text-white">
        <p>DevChat &copy; 2026</p>
    </footer>
</template>
