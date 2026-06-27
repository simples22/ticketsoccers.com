"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/tevo/mapper";
import type { UiTicket } from "@/lib/tevo/types";
import TslnOverlay from "@/components/ui/TslnOverlay";
import UiFilterUniversel, { type SeatFilters } from "@/components/ui/UiFilterUniversel";

export default function SeatSelection({
  slug, ticket, tickets, initialQty,
}: { slug: string; ticket: UiTicket; tickets: UiTicket[]; initialQty: number }) {
  const router = useRouter();
  const allowed = ticket.splits?.length ? [...ticket.splits].sort((a, b) => a - b) : [1];
  const safe = allowed.includes(initialQty) ? initialQty : allowed[0];
  const [qty, setQty] = useState(safe);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [filters, setFilters] = useState<SeatFilters>({ minPrice: "", maxPrice: "", qty: null, sections: [], perks: [] });
  const total = ticket.price * qty;

  useEffect(() => { setOpen(true); }, []);

  function handleClose() { setOpen(false); if (!confirmed) router.push(`/events/${slug}`); }
  function confirm() { setConfirmed(true); setOpen(false); }

  const qtyBlock = (
    <>
      <p className="tslnSeatQtyLabel">How many?</p>
      <div className="tslnQtyGrid">
        {allowed.map((n) => (
          <button key={n} type="button" className={`tslnQtyChip${qty === n ? " active" : ""}`} onClick={() => setQty(n)}>{n}</button>
        ))}
      </div>
      <div className="tslnQtyTotal"><span>Total for {qty}</span><strong>{formatPrice(total)}</strong></div>
    </>
  );

  return (
    <div className="tslnSeatSelect">
      <div className="tslnSeatFilterZone">
        <div className="tslnSeatFilterRow1">
          <div className="tslnSeatInfo">
            <h4>{ticket.section || "General"}{ticket.row ? ` · Row ${ticket.row}` : ""}</h4>
            <p>{formatPrice(ticket.price)} each · {ticket.available} available</p>
          </div>
          <UiFilterUniversel
            tickets={tickets}
            value={{ ...filters, qty }}
            onChange={(f) => { setFilters(f); if (f.qty != null) setQty(f.qty); }}
          />
        </div>
        <div className="tslnSeatFilterRow2">
          <button type="button" className="tslnFilterClear" onClick={() => router.push(`/events/${slug}`)}>Back</button>
          <a className="tslnFilterApply" href={`/checkout?tg=${ticket.id}&qty=${qty}`}>Continue </a>
        </div>
      </div>

      <div className="tslnSeatRowScroll">
        <div className="tslnSeatQtyInline">{qtyBlock}</div>
      </div>

      <TslnOverlay open={open} title="Select your seats" onClose={handleClose}>
        {qtyBlock}
        <div className="tslnFilterActions">
          <button type="button" className="tslnFilterClear" onClick={handleClose}>Cancel</button>
          <button type="button" className="tslnFilterApply" onClick={confirm}>Confirm seats</button>
        </div>
      </TslnOverlay>
    </div>
  );
}


