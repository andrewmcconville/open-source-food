<template>
  <article class="home-view">
    <p5Canvas />

    <RouterView name="timeline">
      <template v-slot:default="{ Component }">
        <Component :is="Component" v-if="Component" class="ingredient-details--active" />
        <aside v-else class="home-view__column home-view__timeline">Timeline</aside>
      </template>
    </RouterView>

    <RouterView name="details">
      <template v-slot:default="{ Component }">
        <Component :is="Component" v-if="Component" class="event-details--active" />
        <aside v-else class="home-view__column home-view__event-details">Details</aside>
      </template>
    </RouterView>
  </article>
</template>

<script setup lang="ts">
import p5Canvas from '../components/p5Canvas.vue';
</script>

<style scoped lang="scss">
.home-view {
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
    flex-grow: 1;
    max-width: 1080px;
}

.home-view__column {  
  background: linear-gradient(145deg, #f0f0f0, #e8e8e8);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  flex: 1;
  min-height: 0;
}

.home-view__timeline {
  @media(max-width: 640px) {
    display: none;
  }
}

.home-view__event-details {
  @media(max-width: 960px) {
    display: none;
  }
}
</style>