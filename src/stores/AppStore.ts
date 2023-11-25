import { defineStore } from 'pinia';
import type { Ingredient } from '../models/Ingredient';
import type { TrackingEvent } from '../models/TrackingEvent';
import IngredientJSON from '../assets/IngredientCollection.json';

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    activeIngredientId: 'none' as string,
    activeIngredientEventIndex: 0 as number,
    Ingredients: IngredientJSON as Ingredient[],
  }),
  getters: {
    getActiveIngredient(): Ingredient {
      const indredient: Ingredient | undefined = this.Ingredients.find(ingredient => ingredient.name === this.activeIngredientId);
      
      if (indredient) {
        return indredient;
      } else {
        return {
          name: 'none',
          events: [],
        };
      }
    },
    getActiveIngredientTrackingEvent(): TrackingEvent {
      return this.getActiveIngredient.events[this.activeIngredientEventIndex];
    },
  },
  actions: {
    setActiveIngredientId(ingredient: string) {
      this.activeIngredientId = ingredient;
    },
    setActiveIngredientEventIndex(index: number) {
      this.activeIngredientEventIndex = index;
    },
  },
});