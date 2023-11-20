export interface Ingredient {
  name: string;
  events: Array<{
    CTE: string;
    organization: string;
    date: string;
    location: {
      city: string;
      state: string;
      field?: string;
      building?: string;
    };
    quantityBefore?: number;
    UOMBefore?: string;
    quantity: number;
    UOM: string;
    TLC?: string;
  }>;
}