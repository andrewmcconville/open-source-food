<template>
    <aside class="ingredient-details">
        <RouterLink to="/">Back</RouterLink>
        <h1>{{ store.activeIngredient?.name }}</h1>
        <p>{{ store.activeIngredient?.origin }}</p>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppStore } from '../stores/AppStore';

const store = useAppStore();
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