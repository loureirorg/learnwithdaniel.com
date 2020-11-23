<template>
    <footer class="py-4 bg-gray-800">
        <p class="text-center text-gray-600 text-xs">Copyright {{year()}} - Daniel Loureiro</p>
    </footer>
</template>

<script>
export default {
    methods: {
        year() {
            const today = new Date();
            return today.getFullYear();
        },
    },
}
</script>
