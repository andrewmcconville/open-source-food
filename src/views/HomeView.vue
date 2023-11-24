<template>
  <article class="home-view">
    <RouterView name="camera" v-slot="{ Component }">
      <aside class="home-view__column">
        <Component :is="Component" v-if="Component" />
        <span v-else>p5 canvas</span>
      </aside>
    </RouterView>

    <RouterView name="timeline" v-slot="{ Component }">
      <KeepAlive>
        <aside class="home-view__column">
          <Component :is="Component" v-if="Component" />
          <span v-else>Timeline</span>
        </aside>
      </KeepAlive>
    </RouterView>

    <RouterView name="details" v-slot="{ Component }">
      <KeepAlive>
        <aside class="home-view__column">
          <Component :is="Component" v-if="Component" />
          <span v-else>Details</span>
        </aside>
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
    max-width: 1080px;
    height: calc(100dvh - (var(--header-height) + var(--footer-height)));
    overflow: hidden;
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