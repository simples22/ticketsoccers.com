"use client";
import { useCart } from "@/context/CartContext";
import { formatPrice, withFees } from "@/lib/tevo/mapper";
export function OrderSummary() {
  const { state, subtotal } = useCart();
  const { fees, total } = withFees(subtotal);
  return (
    <aside className="tsln-summary">
      <h2 className="tsln-summary__title">{state.eventName || "Your order"}</h2>
      <ul className="tsln-summary__list">
        {state.items.map((i) => (
          <li key={i.ticketGroupId} className="tsln-summary__row">
            <span>{i.quantity}x Sec {i.section}, Row {i.row}</span>
            <span>{formatPrice(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>
      <hr />
      <dl className="tsln-summary__list">
        <div className="tsln-summary__row"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div className="tsln-summary__row tsln-summary__row--muted"><dt>Service fees</dt><dd>{formatPrice(fees)}</dd></div>
        <div className="tsln-summary__row tsln-summary__row--total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
    </aside>
  );
}