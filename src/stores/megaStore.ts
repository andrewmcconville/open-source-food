import { defineStore } from 'pinia';
import type { Color } from './../models/Colors';

export const useMegaStore = defineStore('megaStore', {
  state: () => ({
    activeColor: 'none' as string,
    colorCollection: [
        {
            name: 'none',
            origin: 'none',
        },
        {
            name: 'red',
            origin: 'Wisconsin',
        },
        {
            name: 'green',
            origin: 'Virginia',
        },
    ] as Color[],
  }),
  getters: {
    activeColorObject(): Color | undefined {
      return this.colorCollection.find(color => color.name === this.activeColor);
    },
  },
  actions: {
    setActiveClicked(color: string) {
      this.activeColor = color;
    },
  },
});