export interface TrackingEvent {
  CTE: string | null;
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
  TLCBefore?: string;
  quantity: number;
  UOM: string;
  TLC?: string;
  FYI?: string;
}