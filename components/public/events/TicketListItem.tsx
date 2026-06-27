"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/tevo/mapper";
import type { UiTicket } from "@/lib/tevo/types";

export default function TicketListItem({
  ticket, slug, eventName, venue, when,
}: { ticket: UiTicket; slug: string; eventName: string; venue: string; when: { day: string; mon: string; line: string } }) {
  const router = useRouter();
  const go = () => router.push(`/events/${slug}/seats?tg=${ticket.id}`);

  return (
    <button type="button" className="tslnListCard" onClick={go} aria-label={`Select ${eventName}`}>
      <span className="tslnListBadge">
        <small>{ticket.available < 10 ? `0${ticket.available}`.slice(-2) : ticket.available}</small>
        <strong>{when.mon}</strong>
      </span>
      <span className="tslnListBody">
        <span className="tslnListTitle">{eventName}</span>
        <span className="tslnListMeta">{when.line}</span>
        <span className="tslnListVenue">{venue}</span>
      </span>
      <span className="tslnListPrice">
        <small>from</small>
        <strong>{formatPrice(ticket.price)}</strong>
      </span>
    </button>
  );
}
