<template>
    <article class="settings-view article">
      <div class="article__inner">
        <h1>Settings</h1>
        <div class="settings-view__group">
          <p class="settings-view__title">Camera resolution</p>
          <p>canvasSize</p>
          <p class="settings-view__help-text">
            <span>{{ p5CanvasStore.canvasSize }}px</span>
            <span v-once @click="p5CanvasStore.setCanvasSize(p5CanvasStore.canvasSizeDefault)">Default: {{ p5CanvasStore.canvasSizeDefault }}</span>
          </p>
          <input class="settings-view__slider" type="range" min="240" max="480" step="240" v-model.number="p5CanvasStore.canvasSize" />
          <p class="settings-view__help-text">
            <span>240</span>
            <span>{{formattedNumber(Math.pow(p5CanvasStore.canvasSize, 2))}}px per frame</span>
            <span>480</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Scan resolution</p>
          <p>pixelScanRatio</p>
          <p class="settings-view__help-text">
            <span>Every <template v-if="pixelScanRatio < 1">{{ pixelScanRatioDisplay }}</template> row and column</span>
            <span v-once @click="p5CanvasStore.setPixelScanRatio(p5CanvasStore.pixelScanRatioDefault)">Default: {{ p5CanvasStore.pixelScanRatioDefault }}</span>
          </p>
          <input class="settings-view__slider" type="range" min="0.05" max="1" step="0.05" v-model.number="pixelScanRatio" />
          <p class="settings-view__help-text">
            <span>20</span>
            <span>{{formattedNumber(Math.pow(p5CanvasStore.canvasSize, 2) / Math.pow(p5CanvasStore.pixelScanRatio, 2))}}px scanned per frame</span>
            <span>All pixels: 1</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Frame rate</p>
          <p>frameRateTarget</p>
          <p class="settings-view__help-text">
            <span>{{ p5CanvasStore.frameRateTarget }}fps</span>
            <span v-once @click="p5CanvasStore.setFrameRateTarget(p5CanvasStore.frameRateTargetDefault)">Default: {{ p5CanvasStore.frameRateTargetDefault }}</span>
          </p>
          <input class="settings-view__slider" type="range" min="2" max="120" step="2" v-model.number="p5CanvasStore.frameRateTarget" />
          <p class="settings-view__help-text">
            <span>2</span>
            <span>120</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Scan rate</p>
          <p>throttleClusterSearch</p>
          <p class="settings-view__help-text">
            <span>Every <template v-if="throttleClusterSearch < 1">{{ throttleClusterSearchDisplay }}</template> frame.</span>
            <span v-once @click="p5CanvasStore.setThrottleClusterSearch(p5CanvasStore.throttleClusterSearchDefault)">Default: {{ p5CanvasStore.throttleClusterSearchDefault }}</span>
          </p>
          <input class="settings-view__slider" type="range" min="0.1" max="1" step="0.1" v-model.number="throttleClusterSearch" />
          <p class="settings-view__help-text">
            <span>10</span>
            <span>{{formattedNumber(p5CanvasStore.frameRateTarget / p5CanvasStore.throttleClusterSearch)}} scans per second</span>
            <span>All frames: 1</span>
          </p>
        </div>

        <div class="settings-view__group">
          <p class="settings-view__title">Show p5 canvas</p>
          <p>showCanvasBoudingBoxes</p>
          <p class="settings-view__help-text">
            <span>{{ p5CanvasStore.showCanvasBoudingBoxes }}</span>
            <span v-once @click="p5CanvasStore.setShowCanvasBoudingBoxes(p5CanvasStore.showCanvasBoudingBoxesDefault)">Default: {{ p5CanvasStore.showCanvasBoudingBoxesDefault.toString() }}</span>
          </p>
          <input type="checkbox" v-model.number="p5CanvasStore.showCanvasBoudingBoxes" />
          <p class="settings-view__help-text">       
            <span>Off</span>     
            <span></span>
            <span>On</span>
          </p>
        </div>

        <div class="settings-view__group">
          <button @click="p5CanvasStore.setrestoreDefaults">Restore defaults</button>
        </div>
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
  get: (): number => +((1 - ((p5CanvasStore.pixelScanRatio - 1) * (1 - 0.1) / (20 - 1))).toFixed(2)),
  set: (value: number) => p5CanvasStore.setPixelScanRatio(20 - Math.round((value - 0.1) * (20 - 1) / (1 - 0.1))),
});
const pixelScanRatioDisplay = computed(() => ordinalNumber(20 - Math.round((pixelScanRatio.value - 0.05) * (20 - 1) / (1 - 0.05))));

const throttleClusterSearch = computed({
  get: (): number => +((1 - ((p5CanvasStore.throttleClusterSearch - 1) * (1 - 0.1) / (10 - 1))).toFixed(2)),
  set: (value: number) => p5CanvasStore.setThrottleClusterSearch(10 - Math.round((value - 0.1) * (10 - 1) / (1 - 0.1))),
});
const throttleClusterSearchDisplay = computed(() => ordinalNumber(10 - Math.round((throttleClusterSearch.value - 0.1) * (10 - 1) / (1 - 0.1))));

</script>

<style scoped lang="scss">

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
