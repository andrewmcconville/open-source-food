import type { TrackingEvent } from "./TrackingEvent";

export interface Ingredient {
  name: string;
  events: Array<TrackingEvent>;
}