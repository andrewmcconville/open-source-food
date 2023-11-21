<template>
  <header class="header">
    Header
  </header>
  <main class="main">
    <RouterView name="main"/>
    <RouterView name="timeline"/>
    <RouterView name="details"/>
  </main>
  <footer class="footer">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/glossary">Glossary</RouterLink>
      Settings
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useAppStore } from './stores/AppStore';

const route = useRoute();
const store = useAppStore();

watch(() => route.params.id, (paramValue: string | Array<string>) => {
  if (Array.isArray(paramValue)) {
    paramValue = paramValue[0];
  }

  store.setActiveIngredient(paramValue);
});
</script>

<style scoped>
.header {
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}

.main {
  display: flex;
  justify-content: center;
  min-height: 0;
  flex-grow: 1;
}

.footer {
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}
</style>
