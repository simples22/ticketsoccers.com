"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/tevo/mapper";
import type { UiTicket } from "@/lib/tevo/types";
import TslnOverlay from "@/components/ui/TslnOverlay";

export default function QuantityOverlay({
  ticket, slug, open, onClose, isParking,
}: { ticket: UiTicket | null; slug: string; open: boolean; onClose: () => void; isParking?: boolean }) {
  const router = useRouter();
  const allowed = ticket?.splits?.length ? [...ticket.splits].sort((a, b) => a - b) : [1];
  const [qty, setQty] = useState(allowed[0]);

  useEffect(() => { setQty(allowed[0]); }, [ticket]); // reset when ticket changes

  if (!ticket) return null;
  const total = ticket.price * qty;

  function cont() {
    router.push(`/events/${slug}/seats?tg=${ticket!.id}&qty=${qty}`);
  }

  return (
    <TslnOverlay open={open} title={isParking ? "Choose parking quantity" : "Choose how many"} onClose={onClose}>
      <div className="tslnQtyHead">
        <strong>{ticket.section || (isParking ? "Parking" : "General")}{ticket.row ? ` · Row ${ticket.row}` : ""}</strong>
        <span>{formatPrice(ticket.price)} each · {ticket.available} available</span>
      </div>

      <div className="tslnQtyGrid">
        {allowed.map((n) => (
          <button key={n} type="button"
            className={`tslnQtyChip${qty === n ? " active" : ""}`}
            onClick={() => setQty(n)}>
            {n}
          </button>
        ))}
      </div>

      <div className="tslnQtyTotal">
        <span>Total for {qty}</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <div className="tslnFilterActions">
        <button type="button" className="tslnFilterClear" onClick={onClose}>Cancel</button>
        <button type="button" className="tslnFilterApply" onClick={cont}>Continue</button>
      </div>
    </TslnOverlay>
  );
}
