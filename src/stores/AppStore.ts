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
    getActiveIngredient(): Ingredient | undefined {
      const indredient: Ingredient | undefined = this.Ingredients.find(ingredient => ingredient.name === this.activeIngredientId);
      
      if (indredient) {
        return indredient;
      } else {
        return
      }
    },
    getActiveIngredientEventCount(): number {
      const indredient: Ingredient | undefined = this.getActiveIngredient;
      const events: TrackingEvent[] | undefined = indredient ? indredient.events : undefined;
      
      if (events) {
        return events.length;
      } else {
        return 0;
      }
    },
    getActiveIngredientTrackingEvent(): TrackingEvent | undefined {
      const indredient: Ingredient | undefined = this.getActiveIngredient;
      const events: TrackingEvent[] | undefined = indredient ? indredient.events : undefined;
      
      if (events) {
        return events[this.activeIngredientEventIndex];
      } else {
        return
      }
    },
    getActiveIngredientTrackingEventIndex(): number {
      return this.activeIngredientEventIndex + 1;
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