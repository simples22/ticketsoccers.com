export interface TevoEvent {
  id: number;
  name: string;
  occurs_at: string;
  venue?: { id: number; name: string; city?: string; state?: string };
  performances?: Array<{ performer?: { id: number; name: string; category?: { name: string } } }>;
  configuration?: { id: number; venue_id?: number };
  url?: string;
}
export interface TevoTicketGroup {
  id: number;
  type: string;
  section: string;
  row: string;
  quantity: number;
  available_quantity: number;
  retail_price: number;
  format: string;
  eticket: boolean;
  instant_delivery: boolean;
  splits: number[];
  signature: string;
}
export interface UiEvent {
  id: number;
  slug: string;
  name: string;
  date: string;
  venueName: string;
  city: string;
  category: string;
  minPrice: number | null;
  configurationId: number | null;
  venueId: number | null;
}
export interface UiTicket {
  id: number;
  section: string;
  row: string;
  price: number;
  available: number;
  splits: number[];
  format: string;
  eticket: boolean;
  signature: string;
}