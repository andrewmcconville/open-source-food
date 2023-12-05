export interface TrackingEvent {
  CTE: string | null;
  date: string;
  location: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    field?: string;
    building?: string;
  };
  serviceProvider: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  quantityBefore?: number;
  UOMBefore?: string;
  TLCBefore?: string;
  quantity: number;
  UOM: string;
  weight: number;
  TLC?: string;
  FYI?: string;
  notes?: string;
  link?: string;
  linkDomain?: string;
  map?: number;
}