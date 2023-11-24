<template>
    <article class="about-view">
        <h1>About</h1>
        <ul>
            <li>GitHub</li>
            <li>Figma</li>
        </ul>
    </article>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    console.log('AboutView mounted');
});
</script>

<style scoped lang="scss">
</style>
