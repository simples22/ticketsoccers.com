import type { TevoEvent, TevoTicketGroup, UiEvent, UiTicket } from "./types";
import { slugifyEvent } from "./mapper";

export function normalizeEvent(e: TevoEvent, minPrice: number | null = null): UiEvent {
  const perf = e.performances?.[0]?.performer;
  return {
    id: e.id,
    slug: slugifyEvent(e),
    name: e.name,
    date: e.occurs_at,
    venueName: e.venue?.name ?? "",
    city: [e.venue?.city, e.venue?.state].filter(Boolean).join(", "),
    category: perf?.category?.name ?? "Event",
    minPrice,
    configurationId: e.configuration?.id ?? null,
    venueId: e.configuration?.venue_id ?? e.venue?.id ?? null,
  };
}

export function normalizeTicketGroups(groups: TevoTicketGroup[]): UiTicket[] {
  return groups
    .filter((g) => g.type === "event" && g.available_quantity > 0)
    .map((g) => ({
      id: g.id,
      section: g.section,
      row: g.row,
      price: g.retail_price,
      available: g.available_quantity,
      splits: g.splits ?? [1],
      format: g.format,
      eticket: g.eticket,
      signature: g.signature,
    }))
    .sort((a, b) => a.price - b.price);
}

export function minPriceOf(groups: TevoTicketGroup[]): number | null {
  const prices = groups.filter((g) => g.type === "event" && g.available_quantity > 0).map((g) => g.retail_price);
  return prices.length ? Math.min(...prices) : null;
}
export function normalizeParkingGroups(groups: TevoTicketGroup[]): UiTicket[] {
  return groups
    .filter((g) => g.type === "parking" && g.available_quantity > 0)
    .map((g) => ({
      id: g.id,
      section: g.section,
      row: g.row,
      price: g.retail_price,
      available: g.available_quantity,
      splits: g.splits ?? [1],
      format: g.format,
      eticket: g.eticket,
      signature: g.signature,
    }))
    .sort((a, b) => a.price - b.price);
}
