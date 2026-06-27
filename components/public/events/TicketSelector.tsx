"use client";
import { useState } from "react";
import type { UiTicket } from "@/lib/tevo/types";
import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/ui/PriceTag";

export function TicketSelector({ ticket, eventId, eventName }: { ticket: UiTicket; eventId: number; eventName: string }) {
  const { add, setEvent } = useCart();
  const [qty, setQty] = useState(ticket.splits[0] ?? 1);
  const addToCart = () => {
    setEvent(eventId, eventName);
    add({ ticketGroupId: ticket.id, signature: ticket.signature, price: ticket.price, quantity: qty, section: ticket.section, row: ticket.row });
  };
  return (
    <div className="tsln-selector">
      <div className="tsln-selector__main">
        <div className="tsln-ticket__title">Section {ticket.section} &middot; Row {ticket.row}</div>
        <PriceTag price={ticket.price} showFees />
      </div>
      <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="tsln-selector__qty">
        {ticket.splits.filter((s) => s <= ticket.available).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <button onClick={addToCart} className="tsln-btn tsln-btn--primary">Select</button>
    </div>
  );
}