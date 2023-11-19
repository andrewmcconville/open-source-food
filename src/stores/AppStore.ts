import { defineStore } from 'pinia';
import type { Ingredient } from '../models/Ingredient';
import IngredientJSON from '../assets/IngredientCollection.json';

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    activeIngredientId: 'none' as string,
    Ingredients: IngredientJSON as Ingredient[],
  }),
  getters: {
    activeIngredient(): Ingredient {
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
  },
  actions: {
    setActiveIngredient(ingredient: string) {
      this.activeIngredientId = ingredient;
    },
  },
});