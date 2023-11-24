<template>
    <article class="settings-view">
        <h1>Settings</h1>
        <input type="range" min="1" max="15" step="1" v-model="throttleClusterSearch" />
        <p>Run detection every {{ throttleClusterSearch }} frames. <span v-once>{{ throttleClusterSearch }} is default</span></p>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useP5CanvasStore } from '@/stores/P5CanvasStore';
const p5CanvasStore = useP5CanvasStore();

const throttleClusterSearch = computed({
  get: (): number => p5CanvasStore.throttleClusterSearch,
  set: (value: number) => p5CanvasStore.setThrottleClusterSearch(value),
});

</script>

<style scoped lang="scss">
</style>
