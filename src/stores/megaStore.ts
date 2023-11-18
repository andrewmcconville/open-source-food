import { defineStore } from 'pinia';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
    setActiveColor(color: string) {
      this.activeColor = color;
    },
  },
});

const store = useMegaStore();
const route = useRoute();

onMounted(() => {
    watch(() => route.params.id, (newColor) => {
        store.setActiveColor(newColor);
    });
});