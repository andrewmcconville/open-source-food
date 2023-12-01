<template>
  <article class="home-view">
    <RouterView name="camera" v-slot="{ Component }">
        <Component :is="Component" v-if="Component" />
        <aside v-else class="home-view__column">p5 canvas</aside>
    </RouterView>

    <RouterView name="timeline" v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" v-if="Component" class="ingredient-details--active" />
        <aside v-else class="home-view__column home-view__timeline">Timeline</aside>
      </KeepAlive>
    </RouterView>

    <RouterView name="details" v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" v-if="Component" class="event-details--active" />
        <aside v-else class="home-view__column home-view__event-details">Details</aside>
      </KeepAlive>
    </RouterView>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home-view {
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
    flex-grow: 1;
    max-width: var(--app-max-width-large);
    height: calc(100dvh - (var(--header-height) + var(--footer-height)));
    overflow: hidden;
}

.home-view__column {  
  background: var(--view-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
}

.home-view__timeline {
  @media(max-width: 720px) {
    display: none;
  }
}

.home-view__event-details {
  @media(max-width: 1080px) {
    display: none;
  }
}
</style>