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
  organization: {
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
  weight: number;
  UOM: string;
  TLC?: string;
  FYI?: string;
}