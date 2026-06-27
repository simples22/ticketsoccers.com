import { formatPrice, withFees } from "@/lib/tevo/mapper";

export default function PriceTag({ price, showFees = false, currency = "USD" }: { price: number; showFees?: boolean; currency?: string }) {
  if (!showFees) return <span className="tsln-price">{formatPrice(price, currency)}</span>;
  const { fees, total } = withFees(price);
  return (
    <span className="tsln-price tsln-price--stacked">
      <span className="tsln-price__total">{formatPrice(total, currency)}</span>
      <span className="tsln-price__breakdown">{formatPrice(price, currency)} + {formatPrice(fees, currency)} fees</span>
    </span>
  );
}