import { defineStore } from 'pinia';
import p5 from 'p5';

const throttleClusterSearchDefault: number = 4;
const frameRateTargetDefault: number = 60;
const pixelScanRatioDefault: number = 8;
const cameraSizeDefault: number = 360;
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
    cameraSizeDefault: cameraSizeDefault as number,
    cameraSize: cameraSizeDefault as number,
    tomatoVector: new p5.Vector(0, 0) as p5.Vector,
    lettuceVector: new p5.Vector(0, 0) as p5.Vector,
    breadVector: new p5.Vector(0, 0) as p5.Vector,
    meatVector: new p5.Vector(0, 0) as p5.Vector,
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
      this.setCameraSize(cameraSizeDefault);
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
    setCameraSize(cameraSize: number) {
      this.cameraSize = cameraSize;
    },
    setShowCanvasBoudingBoxes(showCanvasBoudingBoxes: boolean) {
      this.showCanvasBoudingBoxes = showCanvasBoudingBoxes;
    }
  },
});