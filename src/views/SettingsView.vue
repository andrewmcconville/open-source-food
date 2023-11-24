<template>
    <article class="settings-view">
        <h1>Settings</h1>
        <div class="settings-view__group">
          <p class="settings-view__title">Camera size</p>
          <p class="settings-view__help-text">
            <span>{{ p5CanvasStore.cameraSize }}px</span>
            <span v-once>{{ p5CanvasStore.cameraSizeDefault }} is default</span>
          </p>
          <input class="settings-view__slider" type="range" min="360" max="720" step="360" v-model.number="p5CanvasStore.cameraSize" />
          <p class="settings-view__help-text">
            <span>360</span>
            <span>{{formattedNumber(Math.pow(p5CanvasStore.cameraSize, 2))}}px per frame</span>
            <span>720</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Scan size</p>
          <p class="settings-view__help-text">
            <span>Every {{ pixelScanRatioDisplay }} row and column</span>
            <span v-once>{{ p5CanvasStore.pixelScanRatioDefault }} is default</span>
          </p>
          <input class="settings-view__slider" type="range" min="0.1" max="1" step="0.1" v-model.number="pixelScanRatio" />
          <p class="settings-view__help-text">
            <span>10th</span>
            <span>{{formattedNumber(Math.pow(p5CanvasStore.cameraSize, 2) / Math.pow(p5CanvasStore.pixelScanRatio, 2))}}px scanned per frame</span>
            <span>1 (all)</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Frame rate</p>
          <p class="settings-view__help-text">
            <span>{{ p5CanvasStore.frameRateTarget }} fps</span>
            <span v-once>{{ p5CanvasStore.frameRateTargetDefault }} is default</span>
          </p>
          <input class="settings-view__slider" type="range" min="2" max="120" step="2" v-model.number="p5CanvasStore.frameRateTarget" />
          <p class="settings-view__help-text">
            <span>2</span>
            <span>120</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Scan rate</p>
          <p class="settings-view__help-text">
            <span>Every {{ throttleClusterSearchDisplay }} frame.</span>
            <span v-once>{{ p5CanvasStore.throttleClusterSearchDefault }} is default</span>
          </p>
          <input class="settings-view__slider" type="range" min="0.1" max="1" step="0.1" v-model.number="throttleClusterSearch" />
          <p class="settings-view__help-text">
            <span>min</span>
            <span>{{formattedNumber(p5CanvasStore.frameRateTarget / p5CanvasStore.throttleClusterSearch)}} scans per second</span>
            <span>max</span>
          </p>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useP5CanvasStore } from '@/stores/P5CanvasStore';
import { useFormattedNumber, useOrdinalNumber } from '../utilities/NumberFormats'

const p5CanvasStore = useP5CanvasStore();
const { formattedNumber } = useFormattedNumber();
const { ordinalNumber } = useOrdinalNumber();

const pixelScanRatio = computed({
  get: (): number => +((1 - ((p5CanvasStore.pixelScanRatio - 1) * (1 - 0.1) / (10 - 1))).toFixed(2)),
  set: (value: number) => p5CanvasStore.setPixelScanRatio(10 - Math.round((value - 0.1) * (10 - 1) / (1 - 0.1))),
});
const pixelScanRatioDisplay = computed(() => ordinalNumber(10 - Math.round((pixelScanRatio.value - 0.05) * (10 - 1) / (1 - 0.05))));

const throttleClusterSearch = computed({
  get: (): number => +((1 - ((p5CanvasStore.throttleClusterSearch - 1) * (1 - 0.1) / (10 - 1))).toFixed(2)),
  set: (value: number) => p5CanvasStore.setThrottleClusterSearch(10 - Math.round((value - 0.1) * (10 - 1) / (1 - 0.1))),
});
const throttleClusterSearchDisplay = computed(() => ordinalNumber(10 - Math.round((throttleClusterSearch.value - 0.1) * (10 - 1) / (1 - 0.1))));

</script>

<style scoped lang="scss">
.settings-view {
    flex: 1;
    max-width: 360px;
}
.settings-view__group {
    margin-bottom: 64px;
}

.settings-view__title {
    display: flex;
    justify-content: space-between;
}

.settings-view__slider {
    width: 100%;
}

.settings-view__help-text {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #888;
}
</style>
