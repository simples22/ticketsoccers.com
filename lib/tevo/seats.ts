import { tevo } from "./client";
import { normalizeTicketGroups } from "./normalize";
import type { UiTicket } from "./types";

export interface SeatMapConfig {
  venueId: number;
  configurationId: number;
  availableTicketGroups: UiTicket[];
}

export async function getSeatMapConfig(eventId: number): Promise<SeatMapConfig | null> {
  const [event, groups] = await Promise.all([tevo.getEvent(eventId), tevo.listTicketGroups(eventId)]);
  const venueId = event.configuration?.venue_id ?? event.venue?.id ?? null;
  const configurationId = event.configuration?.id ?? null;
  if (!venueId || !configurationId) return null;
  return { venueId, configurationId, availableTicketGroups: normalizeTicketGroups(groups.ticket_groups) };
}