<template>
    <article class="settings-view">
        <h1>Settings</h1>
        <div class="settings-view__setting-group">
          <p>Camera capture size: {{ p5CanvasStore.cameraSize }}px ({{formattedNumber(Math.pow(p5CanvasStore.cameraSize, 2))}}px in total)</p>
        </div>

        <div class="settings-view__setting-group">
          <p>Scan every {{ pixelScanRatio }} pixels. <span v-once>{{ p5CanvasStore.pixelScanRatioDefault }} is default</span></p>
          <input class="settings-view__slider" type="range" min="1" max="10" step="1" v-model.number="pixelScanRatio" />
        </div>

        <div class="settings-view__setting-group">
          <p>Run detection every {{ throttleClusterSearch }} frames. <span v-once>{{ p5CanvasStore.throttleClusterSearchDefault }} is default</span></p>
          <input class="settings-view__slider" type="range" min="1" max="15" step="1" v-model.number="throttleClusterSearch" />
        </div>

        <div class="settings-view__setting-group">
          <p>Target frame rate: {{ frameRateTarget }} fps. <span v-once>{{ p5CanvasStore.frameRateTargetDefault }} is default</span></p>
          <input class="settings-view__slider" type="range" min="1" max="120" step="1" v-model.number="frameRateTarget" />
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useP5CanvasStore } from '@/stores/P5CanvasStore';
import { useFormattedNumber } from '../utilities/NumberFormats'

const p5CanvasStore = useP5CanvasStore();
const { formattedNumber } = useFormattedNumber();

const throttleClusterSearch = computed({
  get: (): number => p5CanvasStore.throttleClusterSearch,
  set: (value: number) => p5CanvasStore.setThrottleClusterSearch(value),
});

const frameRateTarget = computed({
  get: (): number => p5CanvasStore.frameRateTarget,
  set: (value: number) => p5CanvasStore.setFrameRateTarget(value),
});

const pixelScanRatio = computed({
  get: (): number => p5CanvasStore.pixelScanRatio,
  set: (value: number) => p5CanvasStore.setPixelScanRatio(value),
});

</script>

<style scoped lang="scss">
.settings-view__setting-group {
    margin-bottom: 32px;
}
.settings-view__slider {
    width: 100%;
}
</style>
