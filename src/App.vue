<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__app-name">Open Source Food</h1>
    </div>
  </header>
  <main class="main">
    <RouterView name="default" v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="nav">
        <RouterLink class="nav__anchor" to="/">
          <img class="nav__anchor-icon" src="@/assets/solar-icon-set/Camera.svg" alt="Camera" width="26" height="26" />
          Home
        </RouterLink>
        <RouterLink class="nav__anchor" to="/glossary">
          <img class="nav__anchor-icon" src="@/assets/solar-icon-set/Book.svg" alt="Book" width="26" height="26" />
          Glossary
        </RouterLink>
        <RouterLink class="nav__anchor" to="/about">
          <img class="nav__anchor-icon" src="@/assets/solar-icon-set/InfoCircle.svg" alt="InfoCircle" width="26" height="26" />
          About
        </RouterLink>
        <RouterLink class="nav__anchor" to="/settings">
          <img class="nav__anchor-icon" src="@/assets/solar-icon-set/Settings.svg" alt="Settings" width="26" height="26" />
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &:hover {
    background-color: #fff;
  }
}

.nav__anchor-icon {
  margin-bottom: 4px;
}
</style>

<style lang="scss">
.view-header__header {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    border-bottom: 1px solid #ddd;
}

.view-header__heading {
    font-size: 22px;
    font-weight: 400;
    line-height: 1;
    flex-grow: 1;
    margin: 6px 0px 8px 0;
}

.view-header__back-anchor {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;

  &:hover {
    background-color: #fff;
  }
}

.view-header__back-typcn {
  font-size: 32px;
  margin-top: -4px;
}
</style>