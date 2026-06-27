import type { TevoEvent, TevoTicketGroup } from "./types";

// RAW TEvo shape: flows through normalizeEvent() exactly like a real API response.
export const mockTevoEvents: TevoEvent[] = [
  {
    id: 1074357,
    name: "PSG vs Marseille",
    occurs_at: "2026-09-12T19:00:00Z",
    venue: { id: 332, name: "Parc des Princes", city: "Paris", state: "FR" },
    performances: [{ performer: { id: 9001, name: "Paris Saint-Germain", category: { name: "Soccer" } } }],
    configuration: { id: 4521, venue_id: 332 },
    url: "/events/1074357",
  },
  {
    id: 1099221,
    name: "Real Madrid vs Barcelona",
    occurs_at: "2026-10-03T20:00:00Z",
    venue: { id: 511, name: "Santiago Bernabeu", city: "Madrid", state: "ES" },
    performances: [{ performer: { id: 9002, name: "Real Madrid", category: { name: "Soccer" } } }],
    configuration: { id: 7781, venue_id: 511 },
    url: "/events/1099221",
  },
];

export const mockTicketGroups: TevoTicketGroup[] = [
  { id: 9001, type: "event", section: "104", row: "12", quantity: 4, available_quantity: 4, retail_price: 120, format: "Eticket", eticket: true, instant_delivery: true, splits: [1, 2, 4], signature: "mock-sig-1" },
  { id: 9002, type: "event", section: "210", row: "5", quantity: 2, available_quantity: 2, retail_price: 89, format: "Eticket", eticket: true, instant_delivery: true, splits: [1, 2], signature: "mock-sig-2" },
  { id: 9003, type: "event", section: "330", row: "20", quantity: 6, available_quantity: 6, retail_price: 65, format: "Eticket", eticket: true, instant_delivery: false, splits: [1, 2, 3], signature: "mock-sig-3" },
];