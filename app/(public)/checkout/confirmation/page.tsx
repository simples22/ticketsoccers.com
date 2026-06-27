"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

export default function ConfirmationPage() {
  const { clear } = useCart();
  const { orderId } = useCheckout();
  useEffect(() => { clear(); }, [clear]);
  return (
    <main className="tsln-container--narrow">
      <div className="tsln-confirm__check">&#10003;</div>
      <h1 className="tsln-title">Order confirmed</h1>
      {orderId && <p className="tsln-subtitle">Order #{orderId}. Your e-tickets are in your account.</p>}
      <Link href="/account/tickets" className="tsln-btn tsln-btn--dark tsln-mt">View my tickets</Link>
    </main>
  );
}