import { defineStore } from 'pinia';

export const useP5CanvasStore = defineStore('P5CanvasStore', {
  state: () => ({
    isLooping: true as boolean,
    throttleClusterSearch: 4 as number,
  }),
  getters: {
    getIsLooping(): boolean {
        return this.isLooping;
    },
    getThrottleClusterSearch(): number {
        return this.throttleClusterSearch;
    },
  },
  actions: {
    setIsLooping(isLooping: boolean) {
      this.isLooping = isLooping;
    },
    setThrottleClusterSearch(throttleClusterSearch: number) {
      this.throttleClusterSearch = throttleClusterSearch;
    },
  },
});