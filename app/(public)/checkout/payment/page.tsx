"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutStepper } from "@/components/public/checkout/CheckoutStepper";
import { OrderSummary } from "@/components/public/checkout/OrderSummary";
import { PaymentFrame } from "@/components/public/checkout/PaymentFrame";
import { withFees } from "@/lib/tevo/mapper";

export default function PaymentPage() {
  const router = useRouter();
  const { state, subtotal } = useCart();
  const { contact, setStep, setOrderId } = useCheckout();
  const { total } = withFees(subtotal);
  const onResult = async (ok: boolean) => {
    if (!ok) return;
    const res = await fetch("/api/tevo/orders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: state.items }),
    });
    const data = await res.json();
    if (data.orderId) { setOrderId(data.orderId); setStep("confirmation"); router.push("/checkout/confirmation"); }
  };
  return (
    <main className="tsln-container tsln-grid tsln-grid--checkout">
      <div>
        <CheckoutStepper />
        <h1 className="tsln-title tsln-mb">Payment</h1>
        <PaymentFrame orderRef={`ts-${Date.now()}`} amount={total} email={contact.email} onResult={onResult} />
      </div>
      <OrderSummary />
    </main>
  );
}