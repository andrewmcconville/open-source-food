<template>
  <article class="home-view">
    <p5Canvas />
    <RouterView name="timeline"/>
    <RouterView name="details"/>
  </article>
</template>

<script setup lang="ts">
import p5Canvas from '../components/p5Canvas.vue';
</script>

<style scoped>
.home-view{
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
    flex-grow: 1;
}
</style>