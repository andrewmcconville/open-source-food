<template>
  <main>
    <p5Canvas />
    <IngredientDetails v-if="store.activeColor != 'none'" />
  </main>
</template>

<script setup lang="ts">
import p5Canvas from '../components/p5Canvas.vue';
import IngredientDetails from '../components/IngredientDetails.vue';
import { useMegaStore } from '../stores/megaStore';

const store = useMegaStore();
</script>


<style scoped></style>