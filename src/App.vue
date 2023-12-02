<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__app-name">Open Source Food</h1>
    </div>
  </header>
  <main class="main">
    <RouterView name="default" v-slot="{ Component }">
        <Component :is="Component" />
    </RouterView>
  </main>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="nav">
        <RouterLink class="nav__anchor" to="/">
          <svg width="26" height="26" class="nav__anchor-icon">
            <use xlink:href="@/assets/solar-icon-set/camera-linear.svg#icon"></use>
          </svg>
          Home
        </RouterLink>
        <RouterLink class="nav__anchor" to="/glossary">
          <svg width="26" height="26" class="nav__anchor-icon">
            <use xlink:href="@/assets/solar-icon-set/book-linear.svg#icon"></use>
          </svg>
          Glossary
        </RouterLink>
        <RouterLink class="nav__anchor" to="/about">
          <svg width="26" height="26" class="nav__anchor-icon">
            <use xlink:href="@/assets/solar-icon-set/info-circle-linear.svg#icon"></use>
          </svg>
          About
        </RouterLink>
        <RouterLink class="nav__anchor" to="/settings">
          <svg width="26" height="26" class="nav__anchor-icon">
            <use xlink:href="@/assets/solar-icon-set/settings-linear.svg#icon"></use>
          </svg>
          Settings
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useAppStore } from './stores/AppStore'

const route = useRoute();
const store = useAppStore();

watch(() => route.params.id, (paramValue: string | Array<string>) => {
  if (Array.isArray(paramValue)) {
    paramValue = paramValue[0];
  }

  store.setActiveIngredientId(paramValue);
});

watch(() => route.params.event, (paramValue: string | Array<string>) => {
  if (Array.isArray(paramValue)) {
    paramValue = paramValue[0];
  }

  store.setActiveIngredientEventIndex(parseInt(paramValue));
});
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  max-width: var(--app-max-width-small);
  width: 100%;
  justify-content: space-between;
}

.nav__anchor {
  width: 72px;
  margin: 0 4px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--teal);
  border-top: 2px solid #fff;
  padding-bottom: 2px;

  &:hover {
    background-color: #fff;
  }

  &.router-link-active {
    border-top: 2px solid var(--teal);
    background-color: #fff;
    font-weight: 800;
  }
}

.nav__anchor-icon {
  margin-bottom: 4px;
  fill: var(--teal);
}
</style>