export interface Ingredient {
  name: string;
  events: Array<{
    name: string;
    date: string;
    location: string;
  }>;
}