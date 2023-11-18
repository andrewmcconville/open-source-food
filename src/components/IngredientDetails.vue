<template>
    <aside class="ingredient-details">
        <h1>{{ store.activeColorObject?.name }}</h1>
        <p>{{ store.activeColorObject?.origin }}</p>
    </aside>
</template>

<script setup lang="ts">
//import { watch } from 'vue';
import { useMegaStore } from '../stores/megaStore';

const store = useMegaStore();
</script>


<style scoped>
.ingredient-details {
    background-color: #eee;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 320px;
}
</style>