"use client";
import type { UiTicket } from "@/lib/tevo/types";
import PriceTag from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";

export function TicketCard({ ticket, selected, onSelect }: { ticket: UiTicket; selected?: boolean; onSelect: (t: UiTicket) => void }) {
  return (
    <button onClick={() => onSelect(ticket)} className={`tsln-ticket${selected ? " tsln-ticket--selected" : ""}`}>
      <span>
        <span className="tsln-ticket__title">Section {ticket.section} &middot; Row {ticket.row}</span>
        <span className="tsln-ticket__meta">
          {ticket.eticket && <Badge variant="featured">E-ticket</Badge>}
          <span>{ticket.available} available</span>
        </span>
      </span>
      <PriceTag price={ticket.price} showFees />
    </button>
  );
}