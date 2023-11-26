import { defineStore } from 'pinia';

const throttleClusterSearchDefault: number = 4;
const frameRateTargetDefault: number = 60;
const pixelScanRatioDefault: number = 4;
const cameraSizeDefault: number = 360;

export const useP5CanvasStore = defineStore('P5CanvasStore', {
  state: () => ({
    isLooping: true as boolean,
    throttleClusterSearchDefault: throttleClusterSearchDefault as number,
    throttleClusterSearch: throttleClusterSearchDefault as number,
    frameRateTargetDefault: frameRateTargetDefault as number,
    frameRateTarget: frameRateTargetDefault as number,
    pixelScanRatioDefault: pixelScanRatioDefault as number,
    pixelScanRatio: pixelScanRatioDefault as number,
    cameraSizeDefault: cameraSizeDefault as number,
    cameraSize: cameraSizeDefault as number,
  }),
  getters: {
    getIsLooping(): boolean {
        return this.isLooping;
    },
    getThrottleClusterSearch(): number {
        return this.throttleClusterSearch;
    },
    getFrameRateTarget(): number {
        return this.frameRateTarget;
    },
    getPixelScanRatio(): number {
        return this.pixelScanRatio;
    },
    getCameraSize(): number {
        return this.cameraSize;
    },
  },
  actions: {
    setrestoreDefaults() {
      this.setThrottleClusterSearch(throttleClusterSearchDefault);
      this.setFrameRateTarget(frameRateTargetDefault);
      this.setPixelScanRatio(pixelScanRatioDefault);
      this.setCameraSize(cameraSizeDefault);
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
    setCameraSize(cameraSize: number) {
      this.cameraSize = cameraSize;
    },
  },
});