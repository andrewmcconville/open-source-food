import type { TrackingEvent } from "./TrackingEvent";

export interface Ingredient {
  name: string | null;
  events: Array<TrackingEvent>;
}