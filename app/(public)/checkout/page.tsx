"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutStepper } from "@/components/public/checkout/CheckoutStepper";
import { OrderSummary } from "@/components/public/checkout/OrderSummary";

export default function CheckoutDetailsPage() {
  const router = useRouter();
  const { state } = useCart();
  const { contact, setContact, setStep } = useCheckout();
  if (!state.items.length) return <div className="tsln-container">Your cart is empty.</div>;
  const next = () => { setStep("payment"); router.push("/checkout/payment"); };
  return (
    <main className="tsln-container tsln-grid tsln-grid--checkout">
      <div>
        <CheckoutStepper />
        <h1 className="tsln-title tsln-mb">Your details</h1>
        <div className="tsln-form-grid">
          <input placeholder="First name" value={contact.firstName} onChange={(e) => setContact({ firstName: e.target.value })} className="tsln-field" />
          <input placeholder="Last name" value={contact.lastName} onChange={(e) => setContact({ lastName: e.target.value })} className="tsln-field" />
          <input placeholder="Email" value={contact.email} onChange={(e) => setContact({ email: e.target.value })} className="tsln-field tsln-field--full" />
          <input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ phone: e.target.value })} className="tsln-field tsln-field--full" />
        </div>
        <button onClick={next} disabled={!contact.email} className="tsln-btn tsln-btn--primary tsln-mt">Continue to payment</button>
      </div>
      <OrderSummary />
    </main>
  );
}