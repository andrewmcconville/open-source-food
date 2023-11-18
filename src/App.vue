<template>
  <header class="header">
    Header
  </header>
  <RouterView name="main"/>
  <RouterView name="details"/>
  <footer class="footer">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useMegaStore } from './stores/megaStore';

const route = useRoute();
const store = useMegaStore();

watch(() => route.params.id, (paramValue: string | Array<string>) => {
  if (Array.isArray(paramValue)) {
    paramValue = paramValue[0];
  }
  
  store.setActiveColor(paramValue);
});
</script>

<style scoped></style>
