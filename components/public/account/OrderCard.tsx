import Link from "next/link";
import { formatPrice } from "@/lib/tevo/mapper";
export function OrderCard({ id, eventName, date, total, state }: {
  id: number; eventName: string; date: string; total: number; state: string;
}) {
  return (
    <Link href={`/account/orders/${id}`} className="tsln-order">
      <div className="tsln-order__head"><span className="tsln-ticket__title">{eventName}</span><span className="tsln-muted">{state}</span></div>
      <div className="tsln-order__meta"><span>{new Date(date).toLocaleDateString()}</span><span>{formatPrice(total)}</span></div>
    </Link>
  );
}