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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--teal);

  &:hover {
    background-color: #fff;
  }
}

.nav__anchor-icon {
  margin-bottom: 4px;
  fill: var(--teal);
  //filter: invert(65%) sepia(26%) saturate(1133%) hue-rotate(131deg) brightness(84%) contrast(84%);
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

.view-header__anchor-icon {
  fill: var(--teal);
}
</style>