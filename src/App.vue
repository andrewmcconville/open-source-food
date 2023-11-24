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
          <span class="nav__typcn typcn typcn-home-outline"></span>
          Home
        </RouterLink>
        <RouterLink class="nav__anchor" to="/glossary">
          <span class="nav__typcn typcn typcn-book"></span>
          Glossary
        </RouterLink>
        <RouterLink class="nav__anchor" to="/about">
          <span class="nav__typcn typcn typcn-info-large-outline"></span>
          About
        </RouterLink>
        <RouterLink class="nav__anchor" to="/settings">
          <span class="nav__typcn typcn typcn-spanner-outline"></span>
          Settings
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useAppStore } from './stores/AppStore';
import 'typicons.font/src/font/typicons.css'

const route = useRoute();
const store = useAppStore();

watch(() => route.params.id, (paramValue: string | Array<string>) => {
  if (Array.isArray(paramValue)) {
    paramValue = paramValue[0];
  }

  store.setActiveIngredient(paramValue);
});
</script>

<style scoped lang="scss">
.header__app-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  letter-spacing: -1px;
  font-weight: 700;
  color: var(--font-color);
  line-height: 1;
  margin: -6px 0 0 0;
}

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

.nav__typcn {
  font-size: 28px;
  margin-top: -4px;
}
</style>

<style lang="scss">
.back__anchor {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;

  &:hover {
    background-color: #fff;
  }
}

.back__typcn {
  font-size: 28px;
  margin-top: -6px;
}
</style>