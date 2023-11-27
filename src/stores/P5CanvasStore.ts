import { defineStore } from 'pinia';
import p5 from 'p5';

const throttleClusterSearchDefault: number = 4;
const frameRateTargetDefault: number = 60;
const pixelScanRatioDefault: number = 8;
const canvasSizeDefault: number = 640;
const showCanvasBoudingBoxesDefault: boolean = false;

export const useP5CanvasStore = defineStore('P5CanvasStore', {
  state: () => ({
    isLooping: true as boolean,
    throttleClusterSearchDefault: throttleClusterSearchDefault as number,
    throttleClusterSearch: throttleClusterSearchDefault as number,
    frameRateTargetDefault: frameRateTargetDefault as number,
    frameRateTarget: frameRateTargetDefault as number,
    pixelScanRatioDefault: pixelScanRatioDefault as number,
    pixelScanRatio: pixelScanRatioDefault as number,
    canvasSizeDefault: canvasSizeDefault as number,
    canvasSize: canvasSizeDefault as number,
    tomatoVector: null as p5.Vector | null,
    lettuceVector: null as p5.Vector | null,
    breadVector: null as p5.Vector | null,
    meatVector: null as p5.Vector | null,
    showCanvasBoudingBoxesDefault: showCanvasBoudingBoxesDefault as boolean,
    showCanvasBoudingBoxes: showCanvasBoudingBoxesDefault as boolean,
  }),
  getters: {
    
  },
  actions: {
    setrestoreDefaults() {
      this.setThrottleClusterSearch(throttleClusterSearchDefault);
      this.setFrameRateTarget(frameRateTargetDefault);
      this.setPixelScanRatio(pixelScanRatioDefault);
      this.setCanvasSize(canvasSizeDefault);
      this.setShowCanvasBoudingBoxes(showCanvasBoudingBoxesDefault);
    },
    setIsLooping(isLooping: boolean) {
      this.isLooping = isLooping;
    },
    setThrottleClusterSearch(throttleClusterSearch: number) {
      this.throttleClusterSearch = throttleClusterSearch;
    },
    setFrameRateTarget(frameRateTarget: number) {
      this.frameRateTarget = frameRateTarget;
    },
    setPixelScanRatio(pixelScanRatio: number) {
      this.pixelScanRatio = pixelScanRatio;
    },
    setCanvasSize(canvasSize: number) {
      this.canvasSize = canvasSize;
    },
    setShowCanvasBoudingBoxes(showCanvasBoudingBoxes: boolean) {
      this.showCanvasBoudingBoxes = showCanvasBoudingBoxes;
    }
  },
});