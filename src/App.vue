<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    Header
  </header>
  <RouterView />
  <footer class="footer">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </footer>
</template>

<style scoped></style>
